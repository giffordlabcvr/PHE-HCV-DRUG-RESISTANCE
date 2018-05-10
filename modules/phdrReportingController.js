
var nextPubIndex = 1;

function reportFastaAsHtml(fastaFilePath, htmlFilePath) {
	var reportDoc = reportFasta(fastaFilePath);
	glue.inMode("module/phdrRasReportTransformer", function() {
		glue.command({"transform-to-file" : {
			commandDocument: reportDoc,
			outputFile: htmlFilePath
		}});
	});
}


function reportBamAsHtml(bamFilePath, htmlFilePath) {
	var reportDoc = reportBam(bamFilePath);
	glue.inMode("module/phdrRasReportTransformer", function() {
		glue.command({"transform-to-file" : {
			commandDocument: reportDoc,
			outputFile: htmlFilePath
		}});
	});
}


function reportFasta(fastaFilePath) {
	glue.log("FINE", "phdrReportingController.reportFasta invoked, input file:"+fastaFilePath);
	// Load fasta and put in a fastaMap
	var fastaDocument;
	glue.inMode("module/phdrFastaUtility", function() {
		fastaDocument = glue.command(["load-nucleotide-fasta", fastaFilePath]);
	});
	glue.log("FINE", "phdrReportingController.reportFasta fastaDocument:", fastaDocument);
	var numSequencesInFile = 0;
	var fastaMap = {};
	_.each(fastaDocument.nucleotideFasta.sequences, function(sequenceObj) {
		fastaMap[sequenceObj.id] = sequenceObj;
		numSequencesInFile++;
	});
	if(numSequencesInFile == 0) {
		throw new Error("No sequences found in FASTA file");
	}
	if(numSequencesInFile > 1) {
		throw new Error("Please use only one sequence per FASTA file");
	}
	// initialise result map.
	var resultMap = {};
	var sequenceObjs = _.values(fastaMap);
	_.each(sequenceObjs, function(sequenceObj) {
		resultMap[sequenceObj.id] = { id: sequenceObj.id };
	});
	// apply recogniser to fastaMap
	recogniseFasta(fastaMap, resultMap);

	glue.log("FINE", "phdrReportingController.reportFasta, result map after recogniser", resultMap);

	
	var genotypingFastaMap = filterFastaMapForGenotyping(fastaMap, resultMap);
	// apply genotyping
	genotypeFasta(genotypingFastaMap, resultMap);

	glue.log("FINE", "phdrReportingController.reportFasta, result map after genotyping", resultMap);

	var publicationIdToObj = {};
	nextPubIndex = 1;
	
	// apply variation scanning
	_.each(_.values(resultMap), function(sequenceResult) {
		var genotypingResult = sequenceResult.genotypingResult;
		if(genotypingResult != null) {
			if(genotypingResult.genotypeCladeCategoryResult.finalClade != null) {
				var variationWhereClause = getVariationWhereClause(genotypingResult);
				var targetRefName = genotypingResultToTargetRefName(genotypingResult);
				sequenceResult.targetRefName = targetRefName;
				var scanResults;
				glue.inMode("module/phdrFastaSequenceReporter", function() {
					scanResults = glue.command({
						"string" :{
							"variation":{
								"scan":{
									"fastaString":genotypingFastaMap[sequenceResult.id].sequence,
									"whereClause": variationWhereClause,
									"targetRefName":targetRefName,
									"acRefName":"REF_MASTER_NC_004102",
									"featureName":"precursor_polyprotein",
									"descendentFeatures":"true",
									"multiReference":"false",
									"excludeAbsent":"true",
									"excludeInsufficientCoverage":"true",
									"showMatchesAsDocument":"true",
									"showMatchesAsTable":"false"
								}
							}
						}
					}).variationScanMatchCommandResult.variations;
				});
				sequenceResult.rasScanResults = scanResults;
				glue.log("FINE", "phdrReportingController.reportFasta rasScanResults:", sequenceResult.rasScanResults);
				_.each(scanResults, function(scanResult) {
					var rasFinding = getRasFinding(genotypingResult, scanResult.referenceName, 
							scanResult.featureName, scanResult.variationName);
					scanResult.rasDetails = rasFinding.phdrRasVariation;
					addRasPublications(rasFinding, publicationIdToObj);
				});
				sequenceResult.drugScores = assessResistance(scanResults);
			}
		}
	});
	glue.log("FINE", "phdrReportingController.reportFasta publicationIdToObj:", publicationIdToObj);
	
	var results = _.values(resultMap);
	var publications = _.values(publicationIdToObj);
	publications = _.sortBy(publications, "index");

	
	var phdrReport = { 
		phdrReport: {
			sequenceDataFormat: "FASTA",
			filePath: fastaFilePath,
			sequenceResult: results[0], 
			publications: publications
		}
	};
	addOverview(phdrReport);

	glue.log("FINE", "phdrReportingController.reportFasta phdrReport:", phdrReport);
	return phdrReport;
}

function getVariationWhereClause(genotypingResult) {
	var variationWhereClause = "phdr_ras != null";
	var genotypeAlmtName = genotypingResult.genotypeCladeCategoryResult.finalClade;
	var subtypeAlmtName = genotypingResult.subtypeCladeCategoryResult.finalClade;
	if(genotypeAlmtName != null && subtypeAlmtName == null) {
		// genotype known, subtype unknown, include RASs for any subtype of genotype.
		variationWhereClause = variationWhereClause + 
		" and (phdr_ras.phdr_resistance_finding.alignment.name ='"+genotypeAlmtName+"' or "+
		"phdr_ras.phdr_resistance_finding.alignment.parent.name ='"+genotypeAlmtName+"')"
	}
	if(genotypeAlmtName != null && subtypeAlmtName != null) {
		// genotype known, subtype known, include RASs for specific subtype or genotype.
		variationWhereClause = variationWhereClause + 
		" and (phdr_ras.phdr_resistance_finding.alignment.name ='"+subtypeAlmtName+"' or "+
		"phdr_ras.phdr_resistance_finding.alignment.name ='"+genotypeAlmtName+"')"
	}
	glue.log("FINEST", "variationWhereClause", variationWhereClause);
	return variationWhereClause;
}

function addRasPublications(rasFinding, publicationIdToObj) {
	_.each(rasFinding.phdrRasVariation.resistanceFinding, function(resistanceFinding) {
		var publicationId = resistanceFinding.publication.id;
		var publicationObj = publicationIdToObj[publicationId];
		if(publicationObj == null) {
			glue.inMode("/custom-table-row/phdr_publication/"+publicationId, function() {
				publicationObj = glue.command(["render-object", "phdrPublicationRenderer"]).publication;
				publicationObj.index = nextPubIndex;
				nextPubIndex++;
				publicationIdToObj[publicationId] = publicationObj;
			});							
		}
		resistanceFinding.publication.index = publicationObj.index;
	});
}

function reportBam(bamFilePath) {
	glue.log("FINE", "phdrReportingController.reportBam invoked, input file:"+bamFilePath);
	
	var samReferences;
	glue.inMode("module/phdrSamReporter", function() {
		samReferences = glue.tableToObjects(glue.command(["list", "sam-reference", "--fileName", bamFilePath]));
	});
	
	var resultMap = {};

	var numSamReferencesInFile = 0;
	_.each(samReferences, function(samReference) {
		resultMap[samReference.name] = {
			id: samReference.name,
			samReference: samReference
		};
		numSamReferencesInFile++;
	});
	if(numSamReferencesInFile == 0) {
		throw new Error("No SAM reference sequences found in SAM/BAM file");
	}
	if(numSamReferencesInFile > 1) {
		throw new Error("Multiple reference sequences found in SAM/BAM file");
	}

	
	
	var consensusFastaMap = {};
	_.each(samReferences, function(samReference) {
		glue.inMode("module/phdrSamReporter", function() {
			consensusDocument = glue.command(["nucleotide-consensus", 
			                                  "--fileName", bamFilePath, 
			                                  "--samRefName", samReference.name, 
			                                  "--consensusID", samReference.name,
			                                  "--preview"]);
		});
		consensusFastaMap[samReference.name] = consensusDocument.nucleotideFasta.sequences[0];
	});
	
	recogniseFasta(consensusFastaMap, resultMap);
	var genotypingFastaMap = filterFastaMapForGenotyping(consensusFastaMap, resultMap);
	// apply genotyping
	genotypeFasta(genotypingFastaMap, resultMap);
	
	var publicationIdToObj = {};
	nextPubIndex = 1;

	// scan variations for each sam reference
	_.each(_.values(resultMap), function(samRefResult) {
		var genotypingResult = samRefResult.genotypingResult;
		if(genotypingResult != null) {
			var targetRefName = genotypingResultToTargetRefName(genotypingResult);
			var variationWhereClause = getVariationWhereClause(genotypingResult);
			samRefResult.targetRefName = targetRefName;
			var samRefSense = "FORWARD";
			if(samRefResult.isReverseHcv) {
				var samRefSense = "REVERSE_COMPLEMENT";
			}
			var scanResults;
			glue.inMode("module/phdrSamReporter", function() {
				scanResults = glue.tableToObjects(glue.command(["variation", "scan",
				   				              "--fileName", bamFilePath, 
				   				              "--samRefSense", samRefSense, 
				   				              "--samRefName", samRefResult.samReference.name,
				   				              "--acRefName", "REF_MASTER_NC_004102",
				   				              "--featureName", "precursor_polyprotein",
				   				              "--descendentFeatures",
				   				              "--autoAlign",
				   				              "--targetRefName", targetRefName,
				   				              "--whereClause", variationWhereClause,
				   				              "--minPresentPct", 15]));					
			});
			samRefResult.rasScanResults = scanResults;
			glue.log("FINE", "phdrReportingController.reportBam rasScanResults:", samRefResult.rasScanResults);
			_.each(scanResults, function(scanResult) {
				var rasFinding = getRasFinding(genotypingResult, scanResult.referenceName, 
						scanResult.featureName, scanResult.variationName);
				scanResult.rasDetails = rasFinding.phdrRasVariation;
				addRasPublications(rasFinding, publicationIdToObj);
				
			});
			samRefResult.drugScores = assessResistance(scanResults);
		}
	});
	glue.log("FINE", "phdrReportingController.reportBam publicationIdToObj:", publicationIdToObj);

	var publications = _.values(publicationIdToObj);
	publications = _.sortBy(publications, "index");
	
	var phdrReport = { 
			phdrReport: {
				sequenceDataFormat: "SAM/BAM",
				filePath: bamFilePath,
				samReferenceResult: _.values(resultMap)[0],
				publications: publications
			}
	};
	addOverview(phdrReport);
	glue.log("FINE", "phdrReportingController.reportBam phdrReport:", phdrReport);
	
	return phdrReport;
}


function assessResistance(scanResults) {
	var drugIDs = 
		glue.getTableColumn(
				glue.command(["list", "custom-table-row", "phdr_drug"]), "id");
	return _.map(drugIDs, function(drug) { 
		return assessResistanceForDrug(scanResults, drug); 
	});
}

function assessResistanceForDrug(scanResults, drug) {
	
	var rasScores = [];
	
	_.each(scanResults, function(scanResult) {
		// individual RAS score.
		var lowInVitro = false; // EC50 [2, 20) observed:		add 1 points.
		var medInVitro = false; // EC50 [20, 100) observed:		add 3 points.
		var highInVitro = false;// EC50 >= 100 observed:		add 10 points.
		var inVivo = false; // any in vivo evidence. 			add 7 points.

		_.each(scanResult.rasDetails.resistanceFinding, function(finding) {
			if(finding.drug != drug) {
				return;
			}
			if(finding.inVitroResult != null) {
				var ec50Value;
				var minEC50 = finding.inVitroResult.minEC50FoldChange;
				var maxEC50 = finding.inVitroResult.maxEC50FoldChange;
				
				if(minEC50 != null && maxEC50 != null) {
					ec50Value = (minEC50 + maxEC50) / 2;
				} else if(minEC50 == null && maxEC50 != null) {
					ec50Value = maxEC50 / 2;
				} else if(minEC50 != null && maxEC50 == null) {
					ec50Value = minEC50;
				}
				
				if(ec50Value < 20.0) {
					lowInVitro = true;
				} else if(ec50Value < 100.0) {
					medInVitro = true;
				} else if(ec50Value >= 100.0) {
					highInVitro = true;
				} 
			}
			if(finding.inVivoResult != null) {
				inVivo = true;
			}
		});
		var rasScore = 0;
		if(highInVitro) {
			rasScore += 10;
		} else if(medInVitro) {
			rasScore += 3;
		} else if(lowInVitro) {
			rasScore += 1;
		}
		if(inVivo) {
			rasScore += 7;
		}
		if(rasScore > 0) {
			rasScores.push({
				gene: scanResult.rasDetails.gene,
				structure: scanResult.rasDetails.structure,
				score: rasScore
			}); 
		}

	});
	
	// drug score: 4 levels:
	// resistant:				Any RAS score of 15 or a combined RAS score of 20.
	// probably_resistant:		Any RAS score of 10 or a combined RAS score of 15.
	// possibly_resistant:		Any RAS score of 5 or a combined RAS score of 10.
	// susceptible:				None of the above.
	
	var maxRasScore = 0;
	var combinedRasScore = 0;
	_.each(rasScores, function(rasScore) {
		maxRasScore = Math.max(maxRasScore, rasScore.score);
		combinedRasScore += rasScore.score;
	});

	var drugScore;
	var drugScoreDisplay;
	if(maxRasScore >= 15 || combinedRasScore >= 20) {
		drugScore = 'resistant';
		drugScoreDisplay = 'Resistant';
	} else if(maxRasScore >= 10 || combinedRasScore >= 15) {
		drugScore = 'probably_resistant';
		drugScoreDisplay = 'Probably resistant';
	} else if(maxRasScore >= 5 || combinedRasScore >= 10) {
		drugScore = 'possibly_resistant';
		drugScoreDisplay = 'Possibly resistant';
	} else {
		drugScore = 'susceptible';
		drugScoreDisplay = 'Susceptible';
	}
	
	return {
		drug: drug,
		drugScore: drugScore, 
		drugScoreDisplay: drugScoreDisplay,
		rasScores: rasScores
	};
	
}

function getRasFinding(genotypingResult, referenceName, featureName, variationName) {
	var rasFinding;
	glue.inMode("/reference/"+referenceName+
			"/feature-location/"+featureName+
			"/variation/"+variationName, function() {
		rasFinding = glue.command(["render-object", "phdrRasVariationRenderer"]);
		var genotypeAlmtName = genotypingResult.genotypeCladeCategoryResult.finalClade;
		var subtypeAlmtName = genotypingResult.subtypeCladeCategoryResult.finalClade;
		rasFinding.phdrRasVariation.resistanceFinding = 
			_.filter(rasFinding.phdrRasVariation.resistanceFinding, function(finding) {
				if(genotypeAlmtName != null && subtypeAlmtName == null) {
					return finding.clade.alignmentName == genotypeAlmtName ||
					finding.parentClade.alignmentName == genotypeAlmtName;
				}
				if(genotypeAlmtName != null && subtypeAlmtName != null) {
					return finding.clade.alignmentName == genotypeAlmtName ||
						finding.clade.alignmentName == subtypeAlmtName;
				}
				return true;
			});
		rasFinding.phdrRasVariation.resistanceFinding.sort(function (f1, f2) {
			var dComp = f1.drug.localeCompare(f2.drug);
			if(dComp != 0) { return dComp; }
			return f1.clade.alignmentName.localeCompare(f2.clade.alignmentName);
		});
		_.each(rasFinding.phdrRasVariation.resistanceFinding, function(resistanceFinding) {
			if(resistanceFinding.inVitroResult != null) {
				var ec50Min = resistanceFinding.inVitroResult.minEC50FoldChange;
				var ec50Max = resistanceFinding.inVitroResult.maxEC50FoldChange;
				var ec50RangeString = null;
				if(ec50Min != null && ec50Max != null) {
					if(ec50Min == ec50Max) {
						ec50RangeString = ec50Min.toString();
					} else {
						ec50RangeString = ec50Min.toString()+" - "+ec50Max.toString();
					}
				} else if(ec50Min != null && ec50Max == null) {
					ec50RangeString = "> "+ec50Min.toString();
				} else if(ec50Min == null && ec50Max != null) {
					ec50RangeString = "< "+ec50Max.toString();
				}
				resistanceFinding.inVitroResult.ec50RangeString = ec50RangeString; 
			}
		});
	});
	return rasFinding;
}

/*
 * construct genotypingFastaMap from fastaMap:
 * if HCV forward, copy from fastaMap
 * if HCV reverse, add reverse complement
 */
function filterFastaMapForGenotyping(fastaMap, resultMap) {	
	var genotypingFastaMap = {};
	_.each(_.values(resultMap), function(resultObj) {
		if(resultObj.isForwardHcv && !resultObj.isReverseHcv) {
			genotypingFastaMap[resultObj.id] = fastaMap[resultObj.id];
		} else if(resultObj.isReverseHcv && !resultObj.isForwardHcv) {
			genotypingFastaMap[resultObj.id] = {
					id: resultObj.id,
					sequence:reverseComplement(fastaMap[resultObj.id].sequence)
			}
		}
	});
	return genotypingFastaMap;
}

/*
 * Given a genotypingResult with a non-null genotypeFinalClade, return the name of the "target" reference
 */
function genotypingResultToTargetRefName(genotypingResult) {
	var targetRefSourceName;
	var targetRefSequenceID;
	var subtypeFinalClade = genotypingResult.subtypeCladeCategoryResult.finalClade;
	if(subtypeFinalClade != null) {
		targetRefSourceName = genotypingResult.subtypeCladeCategoryResult.closestMemberSourceName;
		targetRefSequenceID = genotypingResult.subtypeCladeCategoryResult.closestMemberSequenceID;
	} else {
		targetRefSourceName = genotypingResult.genotypeCladeCategoryResult.closestMemberSourceName;
		targetRefSequenceID = genotypingResult.genotypeCladeCategoryResult.closestMemberSequenceID;
	}
	var targetRefOptions = glue.tableToObjects(glue.command([
         "list", "reference", 
         "--whereClause", "sequence.source.name = '"+targetRefSourceName+"' and sequence.sequenceID = '"+targetRefSequenceID+"'"]));
	return targetRefOptions[0].name;
}

/*
 * This function takes a fastaMap of id -> { id, nucleotideFasta }, and a result map of id -> ? 
 * and runs max likelihood genotyping on each sequence.
 * The the genotyping result object is recorded in the result map for each sequence.
 */
function genotypeFasta(fastaMap, resultMap) {
	if(!_.isEmpty(fastaMap)) {
		var genotypingResults;
		glue.inMode("module/maxLikelihoodGenotyper", function() {
			genotypingResults = glue.command({
				"genotype": {
					"fasta-document":
					{
						"fastaCommandDocument": {
							"nucleotideFasta" : {
								"sequences": _.values(fastaMap)
							}
						}, 
						"documentResult" : true
					}
				}
			}).genotypingDocumentResult.queryGenotypingResults;
		});
		glue.log("FINE", "phdrReportingController.reportFasta genotypingResults:", genotypingResults);
		_.each(genotypingResults, function(genotypingResult) {
			genotypingResult.genotypeCladeCategoryResult = _.find(genotypingResult.queryCladeCategoryResult, 
					function(cladeCategoryResult) { return cladeCategoryResult.categoryName == "genotype"; });
			genotypingResult.subtypeCladeCategoryResult = _.find(genotypingResult.queryCladeCategoryResult, 
					function(cladeCategoryResult) { return cladeCategoryResult.categoryName == "subtype"; });
			if(genotypingResult.genotypeCladeCategoryResult.finalCladeRenderedName == null) {
				genotypingResult.genotypeCladeCategoryResult.shortRenderedName = "unknown";
			} else {
				genotypingResult.genotypeCladeCategoryResult.shortRenderedName = 
					genotypingResult.genotypeCladeCategoryResult.finalCladeRenderedName.replace("HCV Genotype ", "");
			}
			if(genotypingResult.subtypeCladeCategoryResult.finalCladeRenderedName == null) {
				genotypingResult.subtypeCladeCategoryResult.shortRenderedName = "unknown";
			} else {
				genotypingResult.subtypeCladeCategoryResult.shortRenderedName = 
					genotypingResult.subtypeCladeCategoryResult.finalCladeRenderedName.replace("HCV Subtype ", "");
			}
				
				
			glue.log("FINE", "phdrReportingController, genotypeCladeCategoryResult", genotypingResult.genotypeCladeCategoryResult);
			glue.log("FINE", "phdrReportingController, subtypeCladeCategoryResult", genotypingResult.subtypeCladeCategoryResult);
			
			
			resultMap[genotypingResult.queryName].genotypingResult = genotypingResult;
		});
	}
}

/*
 * Use the fastaUtility module to reverse complement a FASTA string
 */
function reverseComplement(fastaString) {
	var reverseComplement;
	glue.inMode("module/phdrFastaUtility", function() {
		var reverseComplementResult = 
			glue.command(["reverse-complement", "string", 
			              "--fastaString", fastaString]);
		reverseComplement = reverseComplementResult.reverseComplementFastaResult.reverseComplement;
	});
	return reverseComplement;
}

/*
 * This function takes a fastaMap of id -> { id, nucleotideFasta }, and a result map of id -> ? 
 * and runs BLAST recogniser, to determine whether the sequence is HCV, and if so, whether 
 * it is in the forward direction or reverse complement.
 * The result map will have isForwardHcv set to true if a forward hit was found, false otherwise
 * It will have isReverseHcv set to true if a reverse hit was found, false otherwise
 */
function recogniseFasta(fastaMap, resultMap) {
	var sequenceObjs = _.values(fastaMap);
	_.each(_.values(resultMap), function(resultObj) {
		resultObj.isForwardHcv = false;
		resultObj.isReverseHcv = false;
	});
	var fastaDocument = {
		"nucleotideFasta" : {
			"sequences" : sequenceObjs
		}
	};
	var recogniserResults;
	glue.inMode("module/hcvSequenceRecogniser", function() {
		recogniserResults = glue.tableToObjects(glue.command({
				"recognise": {
					"fasta-document": {
						"fastaCommandDocument": fastaDocument
					}
				}
		}));
	});
	glue.log("FINE", "phdrReportingController.reportFasta recogniserResults:", recogniserResults);
	_.each(recogniserResults, function(recogniserResult) {
		if(recogniserResult.direction == 'FORWARD') {
			resultMap[recogniserResult.querySequenceId].isForwardHcv = true;
		} else if(recogniserResult.direction == 'REVERSE') {
			resultMap[recogniserResult.querySequenceId].isReverseHcv = true;
		} 
	});
}

function addOverview(phdrReport) {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; // January is 0!
	var yyyy = today.getFullYear();
	if(dd < 10) {
	    dd = '0'+dd
	} 
	if(mm < 10) {
	    mm = '0'+mm
	} 
	phdrReport.phdrReport.reportGenerationDate = dd + '/' + mm + '/' + yyyy;
	phdrReport.phdrReport.engineVersion = 
		glue.command(["glue-engine","show-version"]).glueEngineShowVersionResult.glueEngineVersion;
	phdrReport.phdrReport.projectVersion = 
		glue.command(["show","setting","project-version"]).projectShowSettingResult.settingValue;
	phdrReport.phdrReport.extensionVersion = 
		glue.command(["show","extension-setting","phdr","extension-version"]).projectShowExtensionSettingResult.extSettingValue;
}

