
var featuresList = [
		             { name: "precursor_polyprotein", 
		            	 displayName: "Precursor polyprotein"
		             },
		             { name: "Core",
		            	 displayName: "Core"
		             },
		             { name: "E1",
		            	 displayName: "E1"
		             },
		             { name: "E2",
		            	 displayName: "E2"
		             },
		             { name: "p7",
		            	 displayName: "p7"
		             },
		             { name: "NS2",
		            	 displayName: "NS2"
		             },
		             { name: "NS3",
		            	 displayName: "NS3"
		             },
		             { name: "NS4A",
		            	 displayName: "NS4A"
		             },
		             { name: "NS4B",
		            	 displayName: "NS4B"
		             },
		             { name: "NS5A",
		            	 displayName: "NS5A"
		             },
		             { name: "NS5B",
		            	 displayName: "NS5B"
		             }
		];

var nextPubIndex = 1;

function reportFastaAsHtml(fastaFilePath, htmlFilePath) {
	var reportDoc = reportFasta(fastaFilePath);
	glue.command(["file-util", "save-string", JSON.stringify(reportDoc, null, 2), "reportDoc.json"]);
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

//var staticResult = ;


function reportFastaWeb(base64, filePath) {
	glue.log("FINE", "phdrReportingController.reportFastaWeb invoked");
	var fastaDocument;
	glue.inMode("module/phdrFastaUtility", function() {
		fastaDocument = glue.command(["base64-to-nucleotide-fasta", base64]);
	});
	var numSequencesInFile = fastaDocument.nucleotideFasta.sequences.length;
	if(numSequencesInFile == 0) {
		throw new Error("No sequences found in FASTA file");
	}
	var fastaMap = {};
	var resultMap = {};
	var placerResultContainer = {};
	// apply blast recogniser / genotyping together on set, as this is more efficient.
	initResultMap(fastaDocument, fastaMap, resultMap, placerResultContainer);
	// apply report generation to each sequence in the set.
	var phdrReports = _.map(fastaDocument.nucleotideFasta.sequences, function(sequence) {
		return generateSingleFastaReport(_.pick(fastaMap, sequence.id), _.pick(resultMap, sequence.id), filePath);
	});
	var result = {
		phdrWebReport:  { 
			results: phdrReports, 
			placerResult: placerResultContainer.placerResult
		}
	};

	glue.log("FINE", "phdrReportingController.reportFastaWeb result", result);
	
	return result;
	
//	return staticResult;
}

/**
 * Entry point for generating a report for a fasta file containing a single sequence.
 */
function reportFasta(fastaFilePath) {
	glue.log("FINE", "phdrReportingController.reportFasta invoked, input file:"+fastaFilePath);
	// Load fasta and put in a fastaMap
	var fastaDocument;
	glue.inMode("module/phdrFastaUtility", function() {
		fastaDocument = glue.command(["load-nucleotide-fasta", fastaFilePath]);
	});
	var numSequencesInFile = fastaDocument.nucleotideFasta.sequences.length;
	if(numSequencesInFile == 0) {
		throw new Error("No sequences found in FASTA file");
	}
	if(numSequencesInFile > 1) {
		throw new Error("Please use only one sequence per FASTA file");
	}
	var fastaMap = {};
	var resultMap = {};
	var placerResultContainer = {};
	initResultMap(fastaDocument, fastaMap, resultMap, placerResultContainer);
	var singleFastaReport = generateSingleFastaReport(fastaMap, resultMap, fastaFilePath);
	singleFastaReport.phdrReport["placerResult"] = placerResultContainer.placerResult;
	return singleFastaReport;
}

function initResultMap(fastaDocument, fastaMap, resultMap, placerResultContainer) {
	glue.log("FINE", "phdrReportingController.initResultMap fastaDocument:", fastaDocument);
	_.each(fastaDocument.nucleotideFasta.sequences, function(sequenceObj) {
		fastaMap[sequenceObj.id] = sequenceObj;
	});
	// initialise result map.
	var sequenceObjs = _.values(fastaMap);
	_.each(sequenceObjs, function(sequenceObj) {
		resultMap[sequenceObj.id] = { id: sequenceObj.id };
	});
	// apply recogniser to fastaMap
	recogniseFasta(fastaMap, resultMap);

	glue.log("FINE", "phdrReportingController.initResultMap, result map after recogniser", resultMap);

	// apply genotyping
	genotypeFasta(fastaMap, resultMap, placerResultContainer);

	glue.log("FINE", "phdrReportingController.initResultMap, result map after genotyping", resultMap);
}

function generateQueryToTargetRefSegs(targetRefName, nucleotides) {
	var alignerModule;
	glue.inMode("module/phdrFastaSequenceReporter", function() {
		alignerModule = glue.command(["show", "property", "alignerModuleName"]).moduleShowPropertyResult.propertyValue;
	});
	var alignResult;
	glue.inMode("module/"+alignerModule, function() {
		alignResult = glue.command({align: {
				referenceName: targetRefName,
				sequence: [
				    { 
				    	queryId: "query", 
				    	nucleotides: nucleotides
				    }
				]
			}
		});
		glue.log("FINE", "phdrReportingController.generateQueryToTargetRefSegs, alignResult", alignResult);
	});
	return alignResult.compoundAlignerResult.sequence[0].alignedSegment;
	
}

function generateFeaturesWithCoverage(targetRefName, queryToTargetRefSegs) {
	var featuresWithCoverage = []; 
	
	_.each(featuresList, function(feature) {
		glue.inMode("module/phdrFastaSequenceReporter", function() {
			var coveragePercentage = glue.command({
				"alignment-feature-coverage" :{
							"queryToTargetSegs": {
								queryToTargetSegs: {
									alignedSegment: queryToTargetRefSegs
								}
							},
							"targetRefName":targetRefName,
							"relRefName":"REF_MASTER_NC_004102",
							"linkingAlmtName":"AL_UNCONSTRAINED",
							"featureName":feature.name
						}
			}).fastaSequenceAlignmentFeatureCoverageResult.coveragePercentage;
			
			var featureCopy = _.clone(feature);
			featureCopy.coveragePct = coveragePercentage;
			featuresWithCoverage.push(featureCopy);
		});
	});
	return featuresWithCoverage;
}

function generateSingleFastaReport(fastaMap, resultMap, fastaFilePath) {
	var publicationIdToObj = {};
	nextPubIndex = 1;
	
	
	// apply variation scanning
	_.each(_.values(resultMap), function(sequenceResult) {
		var genotypingResult = sequenceResult.genotypingResult;
		if(genotypingResult != null) {
			if(genotypingResult.genotypeCladeCategoryResult.finalClade != null) {
				var targetRefName = genotypingResultToTargetRefName(genotypingResult);
				var nucleotides = fastaMap[sequenceResult.id].sequence;
				var queryToTargetRefSegs = generateQueryToTargetRefSegs(targetRefName, nucleotides);
				var queryNucleotides = fastaMap[sequenceResult.id].sequence;
				sequenceResult.featuresWithCoverage = generateFeaturesWithCoverage(targetRefName, queryToTargetRefSegs);
				
				var variationWhereClauses = getVariationWhereClauses(genotypingResult);
				var thisCladeWhereClause = variationWhereClauses.thisCladeWhereClause;
				var sameGenotypeWhereClause = variationWhereClauses.sameGenotypeWhereClause;
				var differentGenotypeWhereClause = variationWhereClauses.differentGenotypeWhereClause;

				sequenceResult.targetRefName = targetRefName;
				var thisCladeRasScanResults = 
					fastaVariationScan(queryNucleotides, queryToTargetRefSegs, targetRefName, 
							thisCladeWhereClause, false, false);
				var sameGenotypeRasScanResults = 
					fastaVariationScan(queryNucleotides, queryToTargetRefSegs, targetRefName, 
							sameGenotypeWhereClause, true, true);
				var differentGenotypeRasScanResults = 
					fastaVariationScan(queryNucleotides, queryToTargetRefSegs, targetRefName, 
							differentGenotypeWhereClause, true, true);
				var residuesAtRasAssociatedLocations = 
					fastaResiduesAtRasAssociatedLocations(queryNucleotides, queryToTargetRefSegs, 
							targetRefName);
				sequenceResult.rasScanResults = thisCladeRasScanResults;
				// map for recording polymorphisms reported at a higher significance (e.g. confirmed RAS), so that they don't 
				// get reported again at a lower significance (e.g. atypical for subtype).
				var reportedPolymorphismKeys = {};
				glue.log("FINE", "phdrReportingController.generateSingleFastaReport rasScanResults:", 
						sequenceResult.rasScanResults);
				_.each(sequenceResult.rasScanResults, function(scanResult) {
					var rasFinding = getRasFinding(genotypingResult, scanResult.referenceName, 
							scanResult.featureName, scanResult.variationName);
					glue.log("FINE", "phdrReportingController.generateSingleFastaReport rasFinding:", rasFinding);
					scanResult.rasDetails = rasFinding.phdrRasVariation;
					addRasPublications(rasFinding, publicationIdToObj);
				});
				// at this stage sequenceResult.rasScanResults contains absent / insufficient coverage variation scan results, 
				// which is important for assessing whether the sequence has insufficient coverage overall to assess resistnce
				// for a given drug.
				sequenceResult.drugScores = assessResistance(sequenceResult);

				// now remove non-present variation scan results.
				sequenceResult.rasScanResults = _.filter(sequenceResult.rasScanResults, function(scanResult) {
					return scanResult.present;
				});

				glue.log("FINE", "phdrReportingController.generateSingleFastaReport sequenceResult.drugScores:", sequenceResult.drugScores);

				
				_.each(sequenceResult.rasScanResults, function(scanResult) {
					scanResult.rapUrl = "http://hcv.glue.cvr.ac.uk/#/project/rap/"+scanResult.rasDetails.gene+":"+scanResult.rasDetails.structure;
					reportedPolymorphismKeys[scanResult.rasDetails.gene+":"+scanResult.rasDetails.structure.replace(/[A-Z]/g, "")] = "thisCladeRAS";
				});

				
				
				sequenceResult.substitutionsOfInterest = [];
				sequenceResult.sameGenotypeRasScanResults = sameGenotypeRasScanResults;
				glue.log("FINE", "phdrReportingController.generateSingleFastaReport sameGenotypeRasScanResults:", 
						sequenceResult.sameGenotypeRasScanResults);
				_.each(sequenceResult.sameGenotypeRasScanResults, function(scanResult) {
					var rasFinding = getRasFinding(genotypingResult, scanResult.referenceName, 
							scanResult.featureName, scanResult.variationName);
					glue.log("FINE", "phdrReportingController.generateSingleFastaReport rasFinding:", rasFinding);
					scanResult.rasDetails = rasFinding.phdrRasVariation;
					checkForSameGenotypeRas(genotypingResult, scanResult, reportedPolymorphismKeys, sequenceResult.substitutionsOfInterest);
				});
				
				sequenceResult.differentGenotypeRasScanResults = differentGenotypeRasScanResults;
				glue.log("FINE", "phdrReportingController.generateSingleFastaReport differentGenotypeRasScanResults:", 
						sequenceResult.differentGenotypeRasScanResults);
				_.each(sequenceResult.differentGenotypeRasScanResults, function(scanResult) {
					var rasFinding = getRasFinding(genotypingResult, scanResult.referenceName, 
							scanResult.featureName, scanResult.variationName);
					glue.log("FINE", "phdrReportingController.generateSingleFastaReport rasFinding:", rasFinding);
					scanResult.rasDetails = rasFinding.phdrRasVariation;
					checkForDifferentGenotypeRas(genotypingResult, scanResult, reportedPolymorphismKeys, sequenceResult.substitutionsOfInterest);
				});

				
				sequenceResult.residuesAtRasAssociatedLocations = residuesAtRasAssociatedLocations;
				glue.log("FINE", "phdrReportingController.generateSingleFastaReport residuesAtRasAssociatedLocations", 
						sequenceResult.residuesAtRasAssociatedLocations);
				_.each(sequenceResult.residuesAtRasAssociatedLocations, function(residueObj) {
					checkForWildTypeSubstitution(genotypingResult, residueObj, reportedPolymorphismKeys, sequenceResult.substitutionsOfInterest);
				});
				
				sequenceResult.visualisationHints = visualisationHints(queryNucleotides, targetRefName, genotypingResult, queryToTargetRefSegs, sequenceResult.rasScanResults);
			}
		}
	});
	glue.log("FINE", "phdrReportingController.generateSingleFastaReport publicationIdToObj:", publicationIdToObj);
	
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

	glue.log("FINE", "phdrReportingController.generateSingleFastaReport phdrReport:", phdrReport);
	return phdrReport;
}

function fastaResiduesAtRasAssociatedLocations(queryNucleotides, queryToTargetRefSegs, targetRefName) {
	var results;
	glue.inMode("module/phdrFastaSequenceReporter", function() {
		results = glue.tableToObjects(
			glue.command({ 
				"string-plus-alignment" : {
					"amino-acid" : {
						"fastaString" : queryNucleotides,
						"queryToTargetSegs": {
							queryToTargetSegs: {
								alignedSegment: queryToTargetRefSegs
							}
						},
						"targetRefName" : targetRefName,
						"linkingAlmtName" : "AL_UNCONSTRAINED",
						"selectorName" : "phdrRasPositionColumnsSelector"
					}
				}
			})
		);
	});
	return results;
}


function fastaVariationScan(queryNucleotides, queryToTargetRefSegs, targetRefName, whereClause, excludeAbsent, excludeInsufficientCoverage) {
	var results;
	glue.inMode("module/phdrFastaSequenceReporter", function() {
		results = glue.command({
			"string-plus-alignment" :{
				"variation":{
					"scan":{
						"fastaString":queryNucleotides,
						"queryToTargetSegs": {
							queryToTargetSegs: {
								alignedSegment: queryToTargetRefSegs
							}
						},
						"whereClause": whereClause,
						"targetRefName":targetRefName,
						"relRefName":"REF_MASTER_NC_004102",
						"linkingAlmtName":"AL_UNCONSTRAINED",
						"featureName":"precursor_polyprotein",
						"descendentFeatures":"true",
						"excludeAbsent":excludeAbsent,
						"excludeInsufficientCoverage":excludeInsufficientCoverage,
						"showMatchesAsDocument":"true",
						"showMatchesAsTable":"false"
					}
				}
			}
		}).variationScanMatchCommandResult.variations;
	});
	return results;
}

function checkForSameGenotypeRas(genotypingResult, scanResult, reportedPolymorphismKeys, substitutionsOfInterest) {
	var almtName;
	if(genotypingResult.subtypeCladeCategoryResult.finalClade != null) {
		almtName = genotypingResult.subtypeCladeCategoryResult.finalClade;
	} else if(genotypingResult.genotypeCladeCategoryResult.finalClade != null) {
		almtName = genotypingResult.genotypeCladeCategoryResult.finalClade;
	}
	var gtDisplayClade = genotypingResult.genotypeCladeCategoryResult.finalCladeRenderedName.replace("HCV ", "").toLowerCase();
	var polyKey = scanResult.rasDetails.gene+":"+ scanResult.rasDetails.structure.replace(/[A-Z]/g, "");
	if(reportedPolymorphismKeys[polyKey] == null) {
		var rsgObj = {};
		rsgObj.virusProtein = scanResult.rasDetails.gene;
		rsgObj.rapUrl = "http://hcv.glue.cvr.ac.uk/#/project/rap/"+scanResult.rasDetails.gene+":"+scanResult.rasDetails.structure;
		rsgObj.displayStructure = computeDisplayStructure(scanResult.rasDetails.gene, scanResult.rasDetails.structure, almtName);
		rsgObj.reasonForInterest = "rap_same_genotype";
		rsgObj.displayReasonForInterest = "Associated with resistance in other subtypes of "+gtDisplayClade;
		// minority percentage / depth data if appropriate
		if(scanResult.pctPresent != null) {
			rsgObj.pctPresent = scanResult.pctPresent;
			rsgObj.depth = scanResult.readsPresent + scanResult.readsAbsent;
		}
		substitutionsOfInterest.push(rsgObj);
		reportedPolymorphismKeys[polyKey] = "rap_same_genotype";
	}
}


function checkForDifferentGenotypeRas(genotypingResult, scanResult, reportedPolymorphismKeys, substitutionsOfInterest) {
	var almtName;
	if(genotypingResult.subtypeCladeCategoryResult.finalClade != null) {
		almtName = genotypingResult.subtypeCladeCategoryResult.finalClade;
	} else if(genotypingResult.genotypeCladeCategoryResult.finalClade != null) {
		almtName = genotypingResult.genotypeCladeCategoryResult.finalClade;
	}
	var gtDisplayClade = genotypingResult.genotypeCladeCategoryResult.finalCladeRenderedName.replace("HCV ", "").toLowerCase();
	var polyKey = scanResult.rasDetails.gene+":"+ scanResult.rasDetails.structure.replace(/[A-Z]/g, "");
	if(reportedPolymorphismKeys[polyKey] == null) {
		var rdgObj = {};
		rdgObj.virusProtein = scanResult.rasDetails.gene;
		rdgObj.rapUrl = "http://hcv.glue.cvr.ac.uk/#/project/rap/"+scanResult.rasDetails.gene+":"+scanResult.rasDetails.structure;
		rdgObj.displayStructure = computeDisplayStructure(scanResult.rasDetails.gene, scanResult.rasDetails.structure, almtName);
		rdgObj.reasonForInterest = "rap_different_genotype";
		rdgObj.displayReasonForInterest = "Associated with resistance in genotypes other than "+gtDisplayClade;
		// minority percentage / depth data if appropriate
		if(scanResult.pctPresent != null) {
			rdgObj.pctPresent = scanResult.pctPresent;
			rdgObj.depth = scanResult.readsPresent + scanResult.readsAbsent;
		}
		substitutionsOfInterest.push(rdgObj);
		reportedPolymorphismKeys[polyKey] = "rap_different_genotype";
	}
}


function computeDisplayStructure(gene, structure, almtName) {
	var displayStructure = "";
	var structureBits = structure.split("+");
	for(var i = 0; i < structureBits.length; i++) {
		if(i > 0) {
			displayStructure += "+";
		}
		var structureBit = structureBits[i];
		if(structureBit.indexOf("del") >= 0) {
			displayStructure += structureBit;
		} else {
			var codon = structureBit.substring(0, structureBit.length-1);
			var typicalAAs = glue.getTableColumn(glue.command(["list", "custom-table-row", "phdr_alignment_typical_aa", 
				"-w", "alignment.name = '"+almtName+"' and feature.name = '"+gene+"' and codon_label = '"+codon+"'", "aa_residue"]), "aa_residue");
			displayStructure += typicalAAs.join("/")+structureBit;
		}
	}
	return displayStructure;
}


function checkForWildTypeSubstitution(genotypingResult, residueObj, reportedPolymorphismKeys, substitutionsOfInterest) {
	var almtName;
	var displayClade;
	if(genotypingResult.subtypeCladeCategoryResult.finalClade != null) {
		almtName = genotypingResult.subtypeCladeCategoryResult.finalClade;
		displayClade = genotypingResult.subtypeCladeCategoryResult.finalCladeRenderedName.replace("HCV ", "").toLowerCase();
	} else if(genotypingResult.genotypeCladeCategoryResult.finalClade != null) {
		almtName = genotypingResult.genotypeCladeCategoryResult.finalClade;
		displayClade = genotypingResult.genotypeCladeCategoryResult.finalCladeRenderedName.replace("HCV ", "").toLowerCase();
	}
	var gene = residueObj.feature;
	var codon = residueObj.codonLabel;
	var residues;
	if(residueObj.possibleAas != null) {
		// FASTA consensus case
		residues = residueObj.possibleAas.split("").sort();
	} else {
		// SAM/BAM case
		residues = [residueObj.aminoAcid];
	}
	
	var typicalAAs = glue.getTableColumn(glue.command([
		"list", "custom-table-row", "phdr_alignment_typical_aa", 
		"-w", "alignment.name = '"+almtName+"' and feature.name = '"+gene+"' and codon_label = '"+codon+"'", 
		"aa_residue"]), "aa_residue")
		.sort();

	var wildTypeSubstitution = false;
	// check whether detected possible residue is typical or not.
	for(var i = 0; i < residues.length; i++) {
		var residueAA = residues[i];
		if(typicalAAs.indexOf(residueAA) < 0) {
			wildTypeSubstitution = true;
			break;
		}
	}
	if(wildTypeSubstitution) {
		var reportedKey = gene+":"+codon;
		if(reportedPolymorphismKeys[reportedKey] == null) {
			var wtSubObj = {};
			wtSubObj.virusProtein = gene;
			wtSubObj.displayStructure = typicalAAs.join("/")+codon+residues.join("/");
			wtSubObj.reasonForInterest = "clade_atypical";
			wtSubObj.atypicalForClade = almtName;
			wtSubObj.displayReasonForInterest = "Atypical substitution for "+displayClade+" at a location associated with resistance";
			if(residueObj.pctAaReads != null) {
				// SAM/BAM case
				wtSubObj.pctPresent = residueObj.pctAaReads;
				wtSubObj.depth = residueObj.readsWithAA + residueObj.readsWithDifferentAA;
			}
			substitutionsOfInterest.push(wtSubObj);
			reportedPolymorphismKeys[reportedKey] = "atypical";
		}
	}
	
	
}

function visualisationHints(queryNucleotides, targetRefName, genotypingResult, queryToTargetRefSegs, rasScanResults) {
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
				var refDisplayName = glue.command(["show", "property", "displayName"]).propertyValueResult.value;
				if(refDisplayName == null) {
					refDisplayName = "Closest Reference ("+seqID+")";
				}
				comparisonRefs.push({
					"refName": refName,
					"refDisplayName": refDisplayName
				});
			}
		});
	});
	
	var queryDetails = [];
	
	_.each(rasScanResults, function(rasScanResult) {
		if(rasScanResult.variationType == "aminoAcidSimplePolymorphism") {
			queryDetails.push({
				id: rasScanResult.variationName, 
				segments: {
					id: "seg1", 
					refStart: rasScanResult.matches[0].queryNtStart,
					refEnd: rasScanResult.matches[0].queryNtEnd
				}
			});
		} else if(rasScanResult.variationType == "conjunction") {
			var conjunctSegs = [];
			_.each(rasScanResult.matches[0].conjuncts, function(conjunct) {
				if(conjunct.variationType == "aminoAcidSimplePolymorphism") {
					conjunctSegs.push({
						id: "seg"+conjunct.conjunctIndex, 
						refStart: conjunct.matches[0].queryNtStart,
						refEnd: conjunct.matches[0].queryNtEnd
					});
				} else if(conjunct.variationType == "aminoAcidDeletion") {
					conjunctSegs.push({
						id: "seg"+conjunct.conjunctIndex, 
						refStart: conjunct.matches[0].qryLastNtBeforeDel,
						refEnd: conjunct.matches[0].qryFirstNtAfterDel
					});
				}
			});
			queryDetails.push({
				id: rasScanResult.variationName, 
				segments: conjunctSegs
			});
		} else if(rasScanResult.variationType == "aminoAcidDeletion") {
	        queryDetails.push({
				id: rasScanResult.variationName, 
				segments: {
					id: "seg1", 
					refStart: rasScanResult.matches[0].qryLastNtBeforeDel,
					refEnd: rasScanResult.matches[0].qryFirstNtAfterDel
				}
			})
		}
	});
	
	return {
		"features": featuresList,
		"comparisonRefs": comparisonRefs,
		"targetReferenceName":targetRefName,
		"queryNucleotides":queryNucleotides,
		"queryToTargetRefSegments": queryToTargetRefSegs,
		"queryDetails": queryDetails
	};
}


function getVariationWhereClauses(genotypingResult) {
	var thisCladeWhereClause = "phdr_ras != null";
	var sameGenotypeWhereClause = "false";
	var differentGenotypeWhereClause = "false";
	var genotypeAlmtName = genotypingResult.genotypeCladeCategoryResult.finalClade;
	var subtypeAlmtName = genotypingResult.subtypeCladeCategoryResult.finalClade;
	if(genotypeAlmtName != null && subtypeAlmtName == null) {
		// genotype known, subtype unknown, include RASs for genotype only.
		thisCladeWhereClause = thisCladeWhereClause + 
			" and phdr_ras.phdr_alignment_ras.alignment.name = '"+genotypeAlmtName+"'";
		differentGenotypeWhereClause = "phdr_ras != null and "+
			"phdr_ras.phdr_alignment_ras.alignment.parent.name !='"+genotypeAlmtName+"' and "+
			"phdr_ras.phdr_alignment_ras.alignment.name !='"+genotypeAlmtName+"'";
	}
	if(genotypeAlmtName != null && subtypeAlmtName != null) {
		// genotype known, subtype known, include RASs for specific subtype or genotype.
		thisCladeWhereClause = thisCladeWhereClause + 
			" and (phdr_ras.phdr_alignment_ras.alignment.name ='"+subtypeAlmtName+"' or "+
			"phdr_ras.phdr_alignment_ras.alignment.name ='"+genotypeAlmtName+"')";
		sameGenotypeWhereClause = "phdr_ras != null and phdr_ras.phdr_alignment_ras.alignment.parent.name = '"+genotypeAlmtName+"'";
		differentGenotypeWhereClause = "phdr_ras != null and "+
			"phdr_ras.phdr_alignment_ras.alignment.parent.name !='"+genotypeAlmtName+"' and "+
			"phdr_ras.phdr_alignment_ras.alignment.name !='"+genotypeAlmtName+"'";
	}
	var variationWhereClauses = {
		thisCladeWhereClause: thisCladeWhereClause,
		sameGenotypeWhereClause: sameGenotypeWhereClause,
		differentGenotypeWhereClause: differentGenotypeWhereClause,
	};
	glue.log("FINEST", "variationWhereClauses", variationWhereClauses);
	return variationWhereClauses;
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
	var phdrReport;
	glue.inSession("samFileSession", ["phdrSamReporter", bamFilePath], function() {

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
		
		var placerResultContainer = {};
		
		recogniseFasta(consensusFastaMap, resultMap);
		// apply genotyping
		genotypeFasta(consensusFastaMap, resultMap, placerResultContainer);
		
		var publicationIdToObj = {};
		nextPubIndex = 1;
	
		// scan variations for each sam reference
		_.each(_.values(resultMap), function(samRefResult) {
			var genotypingResult = samRefResult.genotypingResult;
			if(genotypingResult != null) {
				var targetRefName = genotypingResultToTargetRefName(genotypingResult);
				var samRefSense = "FORWARD";
				var nucleotides = consensusFastaMap[samRefResult.id].sequence;
				if(samRefResult.isReverseHcv) {
					nucleotides = reverseComplement(nucleotides);
					samRefSense = "REVERSE_COMPLEMENT";
				}
				var queryToTargetRefSegs = generateQueryToTargetRefSegs(targetRefName, nucleotides);
				samRefResult.featuresWithCoverage = generateFeaturesWithCoverage(targetRefName, queryToTargetRefSegs);
				
				var variationWhereClauses = getVariationWhereClauses(genotypingResult);
				var thisCladeWhereClause = variationWhereClauses.thisCladeWhereClause;
				var sameGenotypeWhereClause = variationWhereClauses.sameGenotypeWhereClause;
				var differentGenotypeWhereClause = variationWhereClauses.differentGenotypeWhereClause;				

				samRefResult.targetRefName = targetRefName;
				
				var thisCladeRasScanResults = 
					bamVariationScan(bamFilePath, samRefSense, samRefResult.samReference.name, targetRefName, 
							thisCladeWhereClause);

				var sameGenotypeRasScanResults = 
					bamVariationScan(bamFilePath, samRefSense, samRefResult.samReference.name, targetRefName, 
							sameGenotypeWhereClause);

				var differentGenotypeRasScanResults = 
					bamVariationScan(bamFilePath, samRefSense, samRefResult.samReference.name, targetRefName, 
							differentGenotypeWhereClause);

				var residuesAtRasAssociatedLocations = 
					bamResiduesAtRasAssociatedLocations(bamFilePath, samRefSense, 
							samRefResult.samReference.name, targetRefName);
				
				samRefResult.rasScanResults = thisCladeRasScanResults;
				// map for recording polymorphisms reported at a higher significance (e.g. confirmed RAS), so that they don't 
				// get reported again at a lower significance (e.g. atypical for subtype).
				var reportedPolymorphismKeys = {};
				glue.log("FINE", "phdrReportingController.reportBam rasScanResults:", samRefResult.rasScanResults);
				_.each(samRefResult.rasScanResults, function(scanResult) {
					var rasFinding = getRasFinding(genotypingResult, scanResult.referenceName, 
							scanResult.featureName, scanResult.variationName);
					glue.log("FINE", "phdrReportingController.reportBam rasFinding:", rasFinding);
					scanResult.rasDetails = rasFinding.phdrRasVariation;
					scanResult.rapUrl = "http://hcv.glue.cvr.ac.uk/#/project/rap/"+scanResult.rasDetails.gene+":"+scanResult.rasDetails.structure;
					reportedPolymorphismKeys[scanResult.rasDetails.gene+":"+scanResult.rasDetails.structure.replace(/[A-Z]/g, "")] = "thisCladeRAS";
					addRasPublications(rasFinding, publicationIdToObj);
					
				});
				samRefResult.substitutionsOfInterest = [];
				samRefResult.sameGenotypeRasScanResults = sameGenotypeRasScanResults;
				glue.log("FINE", "phdrReportingController.reportBam sameGenotypeRasScanResults:", 
						samRefResult.sameGenotypeRasScanResults);
				_.each(samRefResult.sameGenotypeRasScanResults, function(scanResult) {
					var rasFinding = getRasFinding(genotypingResult, scanResult.referenceName, 
							scanResult.featureName, scanResult.variationName);
					glue.log("FINE", "phdrReportingController.reportBam rasFinding:", rasFinding);
					scanResult.rasDetails = rasFinding.phdrRasVariation;
					checkForSameGenotypeRas(genotypingResult, scanResult, reportedPolymorphismKeys, samRefResult.substitutionsOfInterest);
				});

				samRefResult.differentGenotypeRasScanResults = differentGenotypeRasScanResults;
				glue.log("FINE", "phdrReportingController.reportBam differentGenotypeRasScanResults:", 
						samRefResult.differentGenotypeRasScanResults);
				_.each(samRefResult.differentGenotypeRasScanResults, function(scanResult) {
					var rasFinding = getRasFinding(genotypingResult, scanResult.referenceName, 
							scanResult.featureName, scanResult.variationName);
					glue.log("FINE", "phdrReportingController.reportBam rasFinding:", rasFinding);
					scanResult.rasDetails = rasFinding.phdrRasVariation;
					checkForDifferentGenotypeRas(genotypingResult, scanResult, reportedPolymorphismKeys, samRefResult.substitutionsOfInterest);
				});

				samRefResult.residuesAtRasAssociatedLocations = residuesAtRasAssociatedLocations;
				glue.log("FINE", "phdrReportingController.reportBam residuesAtRasAssociatedLocations", 
						samRefResult.residuesAtRasAssociatedLocations);
				_.each(samRefResult.residuesAtRasAssociatedLocations, function(residueObj) {
					checkForWildTypeSubstitution(genotypingResult, residueObj, reportedPolymorphismKeys, 
							samRefResult.substitutionsOfInterest);
				});

				
				samRefResult.drugScores = assessResistance(samRefResult);
				glue.log("FINE", "phdrReportingController.reportBam samRefResult.drugScores:", samRefResult.drugScores);
	
			}
		});
		glue.log("FINE", "phdrReportingController.reportBam publicationIdToObj:", publicationIdToObj);
	
		var publications = _.values(publicationIdToObj);
		publications = _.sortBy(publications, "index");
		
		phdrReport = { 
				phdrReport: {
					sequenceDataFormat: "SAM/BAM",
					filePath: bamFilePath,
					samReferenceResult: _.values(resultMap)[0],
					publications: publications, 
					placerResult: placerResultContainer.placerResult
				}
		};
		addOverview(phdrReport);
		glue.log("FINE", "phdrReportingController.reportBam phdrReport:", phdrReport);
		
	});
	
	return phdrReport;
}



function bamVariationScan(bamFilePath, samRefSense, samRefName, targetRefName, whereClause) {
	var scanResults;
	glue.inMode("module/phdrSamReporter", function() {
		scanResults = glue.tableToObjects(glue.command(["variation", "scan",
		   				              "--fileName", bamFilePath, 
		   				              "--samRefSense", samRefSense, 
		   				              "--samRefName", samRefName,
		   				              "--relRefName", "REF_MASTER_NC_004102",
		   				              "--featureName", "precursor_polyprotein",
		   				              "--descendentFeatures",
		   				              "--autoAlign",
		   				              "--targetRefName", targetRefName,
		   				              "--linkingAlmtName", "AL_UNCONSTRAINED",
		   				              "--whereClause", whereClause,
		   				              "--minQScore", phdrSamThresholds.minQScore,
		   				              "--minMapQ", phdrSamThresholds.minMapQ,
		   				              "--minDepth", phdrSamThresholds.minDepth,
		   				              "--minPresentPct", phdrSamThresholds.minReadProportionPct]));					
	});
	return scanResults;
}

function bamResiduesAtRasAssociatedLocations(bamFilePath, samRefSense, samRefName, targetRefName) {
	var residueObjs;
	glue.inMode("module/phdrSamReporter", function() {
		residueObjs = glue.tableToObjects(glue.command(["amino-acid",
		   				              "--fileName", bamFilePath, 
		   				              "--samRefSense", samRefSense, 
		   				              "--samRefName", samRefName,
		   				              "--selectorName", "phdrRasPositionColumnsSelector",
		   				              "--autoAlign",
		   				              "--targetRefName", targetRefName,
		   				              "--linkingAlmtName", "AL_UNCONSTRAINED",
		   				              "--minQScore", phdrSamThresholds.minQScore,
		   				              "--minMapQ", phdrSamThresholds.minMapQ,
		   				              "--minDepth", phdrSamThresholds.minDepth,
		   				              "--minAAPct", phdrSamThresholds.minReadProportionPct]));					
	});
	return residueObjs;
}


function assessResistance(result) {
	var drugs = 
		glue.tableToObjects(
				glue.command(["list", "custom-table-row", "phdr_drug", "id", "category"]));
	var assessmentList = _.map(drugs, function(drug) { 
		return assessResistanceForDrug(result, drug); 
	});
	var categoryToDrugs = _.groupBy(assessmentList, function(assessment) { return assessment.drug.category; });
	var categoryAssessments = _.map(_.pairs(categoryToDrugs), function(pair) {return { category:pair[0], drugAssessments:pair[1]};});
	categoryAssessments = _.sortBy(categoryAssessments, "category");
	return categoryAssessments;
}

function assessResistanceForDrug(result, drug) {
	
	var drugScore = null;
	var drugScoreDisplay = null;
	var drugScoreDisplayShort = null;

	var rasScores_category_I = [];
	var rasScores_category_II = [];
	var rasScores_category_III = [];
	
	var overallSufficientCoverage = true;

	var sufficientCoverage_I = true;
	var sufficientCoverage_II = true;
	var sufficientCoverage_III = true;

	_.each(result.rasScanResults, function(scanResult) {
		_.each(scanResult.rasDetails.alignmentRas, function(alignmentRas) {
			_.each(alignmentRas.alignmentRasDrug, function(alignmentRasDrug) {
				if(alignmentRasDrug.drug == drug.id) {
					if(alignmentRasDrug.resistanceCategory != "insignificant") {
						var rasScoreDetails = {
							gene: scanResult.rasDetails.gene,
							structure: scanResult.rasDetails.structure,
							displayStructure: alignmentRas.displayStructure,
							rapUrl: "http://hcv.glue.cvr.ac.uk/#/project/rap/"+scanResult.rasDetails.gene+":"+scanResult.rasDetails.structure,
							category: alignmentRasDrug.resistanceCategory,
							displayCategory: alignmentRasDrug.displayCategory
						};
						if(scanResult.pctPresent != null) {
							rasScoreDetails.readsPctPresent = scanResult.pctPresent;
						}
						if(alignmentRasDrug.resistanceCategory == "category_I") {
							if(scanResult.present) {
								rasScores_category_I.push(rasScoreDetails); 
							} else if(!scanResult.sufficientCoverage) {
								sufficientCoverage_I = false;
							}
						} else if(alignmentRasDrug.resistanceCategory == "category_II") {
							if(scanResult.present) {
								rasScores_category_II.push(rasScoreDetails); 
							} else if(!scanResult.sufficientCoverage) {
								sufficientCoverage_II = false;
							}
						} else if(alignmentRasDrug.resistanceCategory == "category_III") {
							if(scanResult.present) {
								rasScores_category_III.push(rasScoreDetails); 
							} else if(!scanResult.sufficientCoverage) {
								sufficientCoverage_III = false;
							}
						}
					}
				}
			});
		});
	});

	// overall sufficient coverage = false if:
    // No category I RAS detected and sufficientCoverage_I is false or
	// No category I, II RAS detected and sufficientCoverage_II is false or
	// No category I, II or III RAS detected and sufficientCoverage_III is false
	
	// drug score: 4 levels:
	// strong_resistance:		Any category I RASs.
	// moderate_resistance:		Any category II RAS.
	// weak_resistance:			Any category III RAS.
	// susceptible:				None of the above.
	
	
	var numCategoryI = rasScores_category_I.length;
	var numCategoryII = rasScores_category_II.length;
	var numCategoryIII = rasScores_category_III.length;

	if(numCategoryI > 0) {
		drugScore = 'strong_resistance';
		drugScoreDisplay = 'Strong resistance';
		drugScoreDisplayShort = 'Strong';
	} else if(!sufficientCoverage_I) {
		overallSufficientCoverage = false;
	} else if(numCategoryII > 0) {
		drugScore = 'moderate_resistance';
		drugScoreDisplay = 'Moderate resistance';
		drugScoreDisplayShort = 'Moderate';
	} else if(!sufficientCoverage_II) {
		overallSufficientCoverage = false;
	} else if(numCategoryIII > 0) {
		drugScore = 'weak_resistance';
		drugScoreDisplay = 'Weak resistance';
		drugScoreDisplayShort = 'Weak';
	} else if(!sufficientCoverage_III) {
		overallSufficientCoverage = false;
	} else {
		drugScore = 'susceptible';
		drugScoreDisplay = 'Susceptible';
		drugScoreDisplayShort = 'Susceptible';
	}
	
	return {
		sufficientCoverage: overallSufficientCoverage,
		drug: drug,
		drugScore: drugScore, 
		drugScoreDisplay: drugScoreDisplay,
		drugScoreDisplayShort: drugScoreDisplayShort,
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
 * and runs max likelihood genotyping on the subset of sequences that have been identified as forward HCV.
 * The the genotyping result object is recorded in the result map for each sequence.
 */
function genotypeFasta(fastaMap, resultMap, placerResultContainer) {
	var genotypingFastaMap = {};
	_.each(_.values(resultMap), function(resultObj) {
		if(resultObj.isForwardHcv && !resultObj.isReverseHcv) {
			genotypingFastaMap[resultObj.id] = fastaMap[resultObj.id];
		} 
	});
	if(!_.isEmpty(genotypingFastaMap)) {

		// run the placer and generate a placer result document
		var placerResultDocument;
		glue.inMode("module/maxLikelihoodPlacer", function() {
			placerResultDocument = glue.command({
				"place": {
					"fasta-document": {
						"fastaCommandDocument": {
							"nucleotideFasta" : {
								"sequences": _.values(genotypingFastaMap)
							}
						}
					}
				}
			});
		});
		placerResultContainer.placerResult = placerResultDocument;
		
		
		// list the query summaries within the placer result document
		var placementSummaries;
		glue.inMode("module/maxLikelihoodPlacer", function() {
			placementSummaries = glue.tableToObjects(glue.command({
				"list": {
					"query-from-document": {
						"placerResultDocument": placerResultDocument
					}
				}
			}));
		});

		// for each query in the placer results.
		_.each(placementSummaries, function(placementSummaryObj) {
			var queryName = placementSummaryObj.queryName;
			
			var placements;
			
			// list the placements for that query.
			glue.inMode("module/maxLikelihoodPlacer", function() {
				placements = glue.tableToObjects(glue.command({
					"list": {
						"placement-from-document": {
							"queryName": queryName,
							"placerResultDocument": placerResultDocument
						}
					}
				}));
			});

			resultMap[queryName].placements = placements;
		});
		
		
		var genotypingResults;
		glue.inMode("module/maxLikelihoodGenotyper", function() {
			genotypingResults = glue.command({
				"genotype": {
					"placer-result-document": {
						"placerResultDocument": placerResultDocument, 
						"documentResult" : true
					}
				}
			}).genotypingDocumentResult.queryGenotypingResults;
		});
		glue.log("FINE", "phdrReportingController.genotypeFasta genotypingResults:", genotypingResults);
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
				
				
			glue.log("FINE", "phdrReportingController.genotypeFasta genotypeCladeCategoryResult", genotypingResult.genotypeCladeCategoryResult);
			glue.log("FINE", "phdrReportingController.genotypeFasta subtypeCladeCategoryResult", genotypingResult.subtypeCladeCategoryResult);
			
			
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
	phdrReport.phdrReport.phdrFeatureCoverageThresholds = phdrFeatureCoverageThresholds;
	
}

