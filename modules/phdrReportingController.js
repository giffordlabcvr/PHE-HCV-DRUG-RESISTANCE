
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

function reportFastaWeb(base64, filePath) {
	glue.log("FINE", "phdrReportingController.reportFastaWeb invoked");
	var fastaDocument;
	glue.inMode("module/phdrFastaUtility", function() {
		fastaDocument = glue.command(["base64-to-nucleotide-fasta", base64]);
	});
	return reportFastaDocument(fastaDocument, filePath);
}

function reportFasta(fastaFilePath) {
	glue.log("FINE", "phdrReportingController.reportFasta invoked, input file:"+fastaFilePath);
	// Load fasta and put in a fastaMap
	var fastaDocument;
	glue.inMode("module/phdrFastaUtility", function() {
		fastaDocument = glue.command(["load-nucleotide-fasta", fastaFilePath]);
	});
	return reportFastaDocument(fastaDocument, fastaFilePath);
}

function reportFastaDocument(fastaDocument, fastaFilePath) {
	glue.log("FINE", "phdrReportingController.reportFastaDocument fastaDocument:", fastaDocument);
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

	glue.log("FINE", "phdrReportingController.reportFastaDocument, result map after recogniser", resultMap);

	
	var genotypingFastaMap = filterFastaMapForGenotyping(fastaMap, resultMap);
	// apply genotyping
	genotypeFasta(genotypingFastaMap, resultMap);

	glue.log("FINE", "phdrReportingController.reportFastaDocument, result map after genotyping", resultMap);

	var publicationIdToObj = {};
	nextPubIndex = 1;
	
	var alignerModule;
	glue.inMode("module/phdrFastaSequenceReporter", function() {
		alignerModule = glue.command(["show", "property", "alignerModuleName"]).moduleShowPropertyResult.propertyValue;
	});
	
	// apply variation scanning
	_.each(_.values(resultMap), function(sequenceResult) {
		var genotypingResult = sequenceResult.genotypingResult;
		if(genotypingResult != null) {
			if(genotypingResult.genotypeCladeCategoryResult.finalClade != null) {
				var targetRefName = genotypingResultToTargetRefName(genotypingResult);

				// TODO -- these could all be done together.
				var alignResult;
				glue.inMode("module/"+alignerModule, function() {
					alignResult = glue.command({align: {
							referenceName: targetRefName,
							sequence: [
							    { 
							    	queryId: sequenceResult.id, 
							    	nucleotides: genotypingFastaMap[sequenceResult.id].sequence
							    }
							]
						}
					});
					glue.log("FINE", "phdrReportingController.reportFastaDocument, alignResult", alignResult);
				});
				var queryToTargetRefSegs = alignResult.compoundAlignerResult.sequence[0].alignedSegment;
				
				var variationWhereClause = getVariationWhereClause(genotypingResult);
				sequenceResult.targetRefName = targetRefName;
				var queryNucleotides = genotypingFastaMap[sequenceResult.id].sequence;
				var scanResults;
				glue.inMode("module/phdrFastaSequenceReporter", function() {
					scanResults = glue.command({
						"string-plus-alignment" :{
							"variation":{
								"scan":{
									"fastaString":queryNucleotides,
									"queryToTargetSegs": {
										queryToTargetSegs: {
											alignedSegment: queryToTargetRefSegs
										}
									},
									"whereClause": variationWhereClause,
									"targetRefName":targetRefName,
									"relRefName":"REF_MASTER_NC_004102",
									"linkingAlmtName":"AL_UNCONSTRAINED",
									"featureName":"precursor_polyprotein",
									"descendentFeatures":"true",
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
				glue.log("FINE", "phdrReportingController.reportFastaDocument rasScanResults:", sequenceResult.rasScanResults);
				_.each(scanResults, function(scanResult) {
					var rasFinding = getRasFinding(genotypingResult, scanResult.referenceName, 
							scanResult.featureName, scanResult.variationName);
					glue.log("FINE", "phdrReportingController.reportFastaDocument rasFinding:", rasFinding);
					scanResult.rasDetails = rasFinding.phdrRasVariation;
					addRasPublications(rasFinding, publicationIdToObj);
					
				});
				sequenceResult.drugScores = assessResistance(scanResults);
				glue.log("FINE", "phdrReportingController.reportFastaDocument sequenceResult.drugScores:", sequenceResult.drugScores);
				sequenceResult.visualisationdHints = visualisationHints(queryNucleotides, targetRefName, genotypingResult, queryToTargetRefSegs);
			}
		}
	});
	glue.log("FINE", "phdrReportingController.reportFastaDocument publicationIdToObj:", publicationIdToObj);
	
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

	glue.log("FINE", "phdrReportingController.reportFastaDocument phdrReport:", phdrReport);
	return phdrReport;
}

function visualisationHints(queryNucleotides, targetRefName, genotypingResult, queryToTargetRefSegs) {
	// consider the target ref, subtype ref, genotype ref and master ref as comparison refs.
	var comparisonReferenceNames = ["REF_MASTER_NC_004102"];
	var genotypeAlmtName = genotypingResult.genotypeCladeCategoryResult.finalClade;
	if(genotypeAlmtName != null) {
		glue.inMode("alignment/"+genotypeAlmtName, function() {
			comparisonReferenceNames.push(glue.command(["show", "reference"]).showReferenceResult.referenceName);
		});
	}
	var subtypeAlmtName = genotypingResult.subtypeCladeCategoryResult.finalClade;
	if(subtypeAlmtName != null) {
		glue.inMode("alignment/"+subtypeAlmtName, function() {
			comparisonReferenceNames.push(glue.command(["show", "reference"]).showReferenceResult.referenceName);
		});
	}
	comparisonReferenceNames.push(targetRefName);
	var seqs = [];
	var comparisonRefs = [];
	
	// eliminate duplicates and enhance with display names.
	_.each(comparisonReferenceNames, function(refName) {
		glue.inMode("reference/"+refName, function() {
			var seqID = glue.command(["show", "sequence"]).showSequenceResult["sequence.sequenceID"];
			if(seqs.indexOf(seqID) < 0) {
				seqs.push(seqID);
				comparisonRefs.push({
					"refName": refName,
					"refDisplayName": glue.command(["show", "property", "displayName"]).propertyValueResult.value
				});
			}
		});
	});
	
	return {
		"features": ["precursor_polyprotein", "Core", "E1", "E2", "p7", "NS2", "NS3", "NS4A", "NS4B", "NS5A", "NS5B"],
		"comparisonRefs": comparisonRefs,
		"visualisationUtilityModule": "phdrVisualisationUtility",
		"targetReferenceName":targetRefName,
		"queryNucleotides":queryNucleotides,
		"queryToTargetRefSegments": queryToTargetRefSegs
	};
}


function getVariationWhereClause(genotypingResult) {
	var variationWhereClause = "phdr_ras != null";
	var genotypeAlmtName = genotypingResult.genotypeCladeCategoryResult.finalClade;
	var subtypeAlmtName = genotypingResult.subtypeCladeCategoryResult.finalClade;
	if(genotypeAlmtName != null && subtypeAlmtName == null) {
		// genotype known, subtype unknown, include RASs for genotype only.
		variationWhereClause = variationWhereClause + 
		" and phdr_ras.phdr_alignment_ras.alignment.name ='"+genotypeAlmtName+"'"
	}
	if(genotypeAlmtName != null && subtypeAlmtName != null) {
		// genotype known, subtype known, include RASs for specific subtype or genotype.
		variationWhereClause = variationWhereClause + 
		" and (phdr_ras.phdr_alignment_ras.alignment.name ='"+subtypeAlmtName+"' or "+
		"phdr_ras.phdr_alignment_ras.alignment.name ='"+genotypeAlmtName+"')"
	}
	glue.log("FINEST", "variationWhereClause", variationWhereClause);
	return variationWhereClause;
}

function addRasPublications(rasFinding, publicationIdToObj) {
	_.each(rasFinding.phdrRasVariation.alignmentRas, function(alignmentRas) {
		_.each(alignmentRas.alignmentRasDrug, function(alignmentRasDrug) {
			_.each(alignmentRasDrug.resistanceFinding, function(resistanceFinding) {
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
		});
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
			                                  "--preview",
				   				              "--minQScore", phdrSamThresholds.minQScore,
				   				              "--minMapQ", phdrSamThresholds.minMapQ,
				   				              "--minDepth", phdrSamThresholds.minDepth]);
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
				   				              "--relRefName", "REF_MASTER_NC_004102",
				   				              "--featureName", "precursor_polyprotein",
				   				              "--descendentFeatures",
				   				              "--autoAlign",
				   				              "--targetRefName", targetRefName,
				   				              "--linkingAlmtName", "AL_UNCONSTRAINED",
				   				              "--whereClause", variationWhereClause,
				   				              "--minQScore", phdrSamThresholds.minQScore,
				   				              "--minMapQ", phdrSamThresholds.minMapQ,
				   				              "--minDepth", phdrSamThresholds.minDepth,
				   				              "--minPresentPct", phdrSamThresholds.minReadProportionPct]));					
			});
			samRefResult.rasScanResults = scanResults;
			glue.log("FINE", "phdrReportingController.reportBam rasScanResults:", samRefResult.rasScanResults);
			_.each(scanResults, function(scanResult) {
				var rasFinding = getRasFinding(genotypingResult, scanResult.referenceName, 
						scanResult.featureName, scanResult.variationName);
				glue.log("FINE", "phdrReportingController.reportBam rasFinding:", rasFinding);
				scanResult.rasDetails = rasFinding.phdrRasVariation;
				addRasPublications(rasFinding, publicationIdToObj);
				
			});
			samRefResult.drugScores = assessResistance(scanResults);
			glue.log("FINE", "phdrReportingController.reportBam samRefResult.drugScores:", samRefResult.drugScores);

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
	var drugs = 
		glue.tableToObjects(
				glue.command(["list", "custom-table-row", "phdr_drug", "id", "category"]));
	var assessmentList = _.map(drugs, function(drug) { 
		return assessResistanceForDrug(scanResults, drug); 
	});
	var categoryToDrugs = _.groupBy(assessmentList, function(assessment) { return assessment.drug.category; });
	return _.map(_.pairs(categoryToDrugs), function(pair) {return { category:pair[0], drugAssessments:pair[1]};});
}

function assessResistanceForDrug(scanResults, drug) {
	
	var rasScores_category_I = [];
	var rasScores_category_II = [];
	var rasScores_category_III = [];
	
	_.each(scanResults, function(scanResult) {
		_.each(scanResult.rasDetails.alignmentRas, function(alignmentRas) {
			_.each(alignmentRas.alignmentRasDrug, function(alignmentRasDrug) {
				if(alignmentRasDrug.drug == drug.id) {
					if(alignmentRasDrug.resistanceCategory != "insignificant") {
						var rasScoreDetails = {
							gene: scanResult.rasDetails.gene,
							structure: scanResult.rasDetails.structure,
							displayStructure: alignmentRas.displayStructure,
							category: alignmentRasDrug.resistanceCategory,
							displayCategory: alignmentRasDrug.displayCategory
						};
						if(scanResult.pctPresent != null) {
							rasScoreDetails.readsPctPresent = scanResult.pctPresent;
						}
						if(alignmentRasDrug.resistanceCategory == "category_I") {
							rasScores_category_I.push(rasScoreDetails); 
						} else if(alignmentRasDrug.resistanceCategory == "category_II") {
							rasScores_category_II.push(rasScoreDetails); 
						} else if(alignmentRasDrug.resistanceCategory == "category_III") {
							rasScores_category_III.push(rasScoreDetails); 
						}
					}
				}
			});
		});
	});
	
	// drug score: 4 levels:
	// strong_resistance:		Any category I RAS or multiple category II RASs.
	// moderate_resistance:		Any category II RAS or multiple category III RAS.
	// weak_resistance:			Any category III RAS.
	// susceptible:				None of the above.
	
	var numCategoryI = rasScores_category_I.length;
	var numCategoryII = rasScores_category_II.length;
	var numCategoryIII = rasScores_category_III.length;

	var drugScore;
	var drugScoreDisplay;
	if(numCategoryI > 0 || numCategoryII > 1) {
		drugScore = 'strong_resistance';
		drugScoreDisplay = 'Strong resistance';
	} else if(numCategoryII > 0 || numCategoryIII > 1) {
		drugScore = 'moderate_resistance';
		drugScoreDisplay = 'Moderate resistance';
	} else if(numCategoryIII > 0) {
		drugScore = 'weak_resistance';
		drugScoreDisplay = 'Weak resistance';
	} else {
		drugScore = 'susceptible';
		drugScoreDisplay = 'Susceptible';
	}
	
	return {
		drug: drug,
		drugScore: drugScore, 
		drugScoreDisplay: drugScoreDisplay,
		rasScores_category_I: rasScores_category_I,
		rasScores_category_II: rasScores_category_II,
		rasScores_category_III: rasScores_category_III
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
		if(subtypeAlmtName != null && genotypeAlmtName != null) {
			rasFinding.phdrRasVariation.alignmentRas = _.filter(rasFinding.phdrRasVariation.alignmentRas, function(alignmentRas) {
				if(alignmentRas.clade.alignmentName == subtypeAlmtName || alignmentRas.clade.alignmentName == genotypeAlmtName ) {
					return true;
				}
			});
		} else if(genotypeAlmtName != null) {
			rasFinding.phdrRasVariation.alignmentRas = _.filter(rasFinding.phdrRasVariation.alignmentRas, function(alignmentRas) {
				if(alignmentRas.clade.alignmentName == genotypeAlmtName ) {
					return true;
				}
			});
		} else {
			rasFinding.phdrRasVariation.alignmentRas = [];
		}
		rasFinding.phdrRasVariation.alignmentRas.sort(function (f1, f2) {
			return f1.clade.alignmentName.localeCompare(f2.clade.alignmentName);
		});
		_.each(rasFinding.phdrRasVariation.alignmentRas, function(alignmentRas) {
			alignmentRas.alignmentRasDrug.sort(function (f1, f2) {
				return f1.drug.localeCompare(f2.drug);
			});
		});

		
		var variationNumFindings = 0;
		_.each(rasFinding.phdrRasVariation.alignmentRas, function(alignmentRas) {
			var alignmentRasNumFindings = 0;
			_.each(alignmentRas.alignmentRasDrug, function(alignmentRasDrug) {
				alignmentRasDrug.numFindings = alignmentRasDrug.resistanceFinding.length;
				alignmentRasNumFindings += alignmentRasDrug.numFindings;
			});
			alignmentRas.numFindings = alignmentRasNumFindings;
			variationNumFindings += alignmentRas.numFindings;
		});
		rasFinding.phdrRasVariation.numFindings = variationNumFindings;
		
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
	
	phdrReport.phdrReport.phdrSamThresholds = phdrSamThresholds;
	
}

