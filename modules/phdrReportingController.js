
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
	glue.inMode("module/phdrRasReportTransformer", function() {
		glue.command({"transform-to-file" : {
			commandDocument: reportDoc,
			outputFile: htmlFilePath
		}});
	});
}


function reportBamAsHtml(bamFilePath, minReadProportionPct, htmlFilePath) {
	var reportDoc = reportBam(bamFilePath, minReadProportionPct);
	glue.inMode("module/phdrRasReportTransformer", function() {
		glue.command({"transform-to-file" : {
			commandDocument: reportDoc,
			outputFile: htmlFilePath
		}});
	});
}

//var staticResult = ;


function reportFastaWeb(base64, filePath) {
	// glue.logInfo("start");

	// glue.log("FINE", "phdrReportingController.reportFastaWeb invoked");
	var fastaDocument;
	glue.inMode("module/phdrFastaUtility", function() {
		fastaDocument = glue.command(["base64-to-nucleotide-fasta", base64]);
	});
	var numSequencesInFile = fastaDocument.nucleotideFasta.sequences.length;
	if(numSequencesInFile == 0) {
		throw new Error("No sequences found in FASTA file");
	}
	var maxSequencesWithoutAuth = 20;
	if(numSequencesInFile > maxSequencesWithoutAuth && !glue.hasAuthorisation("hcvFastaAnalysisLargeSubmissions")) {
		throw new Error("Not authorised to analyse FASTA files with more than "+maxSequencesWithoutAuth+" sequences");
	}
	var fastaMap = {};
	var resultMap = {};
	var placerResultContainer = {};
	// apply blast recogniser / genotyping together on set, as this is more efficient.
	initResultMap(fastaDocument, fastaMap, resultMap, placerResultContainer);
	// apply report generation to each sequence in the set.
// 	var t0 = Java.type("java.lang.System").currentTimeMillis();
	
	
	var cmdDocs = _.map(fastaDocument.nucleotideFasta.sequences, function(sequence) {
		return { 
			"modePath": "module/phdrReportingController",
			"command": {
				"invoke-function" : {
					"functionName" : "generateSingleFastaReport",
					"document" : 
						{ 
							singleFastaInputDoc: {
								sequenceNts: sequence.sequence,
								sequenceResult: resultMap[sequence.id],
								fastaFilePath: filePath
							}
						} 
				}
			}
		};
	});
	var phdrReports;
	var i = 0;
	var numSeqs = fastaDocument.nucleotideFasta.sequences.length;
	glue.setRunningDescription("Scanned "+i+"/"+numSeqs+" sequences for drug resistance");
	phdrReports = glue.parallelCommands(cmdDocs, {
		"completedCmdCallback": function() {
			i++;
			glue.setRunningDescription("Scanned "+i+"/"+numSeqs+" sequences for drug resistance");
		}
	});

// 	var t1 = Java.type("java.lang.System").currentTimeMillis();

	// glue.logInfo("generateSingleFastaReport took "+(t1-t0)+" ms");
	
	
	var result = {
		phdrWebReport:  { 
			results: phdrReports, 
			placerResult: placerResultContainer.placerResult
		}
	};

	// glue.log("FINE", "phdrReportingController.reportFastaWeb result", result);
	// glue.logInfo("complete");
	return result;
	
//	return staticResult;
}

/**
 * Entry point for generating a report for a fasta file containing a single sequence.
 */
function reportFasta(fastaFilePath) {
	// glue.log("FINE", "phdrReportingController.reportFasta invoked, input file:"+fastaFilePath);
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
	var inputDoc = {
			singleFastaInputDoc : {
				sequenceNts: _.values(fastaMap)[0].sequence,
				sequenceResult: _.values(resultMap)[0],
				fastaFilePath: fastaFilePath
			}
	};
	var singleFastaReport = generateSingleFastaReport(inputDoc);
	singleFastaReport.phdrReport["placerResult"] = placerResultContainer.placerResult;
	return singleFastaReport;
}

function initResultMap(fastaDocument, fastaMap, resultMap, placerResultContainer) {
	// glue.log("FINE", "phdrReportingController.initResultMap fastaDocument:", fastaDocument);
	_.each(fastaDocument.nucleotideFasta.sequences, function(sequenceObj) {
		fastaMap[sequenceObj.id] = sequenceObj;
	});
	// initialise result map.
	var sequenceObjs = _.values(fastaMap);
	_.each(sequenceObjs, function(sequenceObj) {
		resultMap[sequenceObj.id] = { 
			id: sequenceObj.id, 
			reliesOnNonDefiniteAa: false
		};
	});
	glue.setRunningDescription("Sequence type recognition");
	// apply recogniser to fastaMap
	recogniseFasta(fastaMap, resultMap);

	// glue.log("FINE", "phdrReportingController.initResultMap, result map after recogniser", resultMap);

	// apply genotyping
	genotypeFasta(fastaMap, resultMap, placerResultContainer);

	// glue.log("FINE", "phdrReportingController.initResultMap, result map after genotyping", resultMap);
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
		// glue.log("FINE", "phdrReportingController.generateQueryToTargetRefSegs, alignResult", alignResult);
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

function generateFeaturesWithDepthCoverage(targetRefName, bamFile) {
	var featuresWithDepthCoverage = [];
	var depthThresholds = [1, 10, 100, 1000];
	_.each(featuresList, function(feature) {
		var featureSiteDepths;
		
		glue.inMode("module/phdrSamReporter", function() {
			featureSiteDepths = glue.tableToObjects(glue.command(["depth", 
				"--fileName", bamFile, 
				"--relRefName", "REF_MASTER_NC_004102",
				"--featureName", feature.name, 
				"--autoAlign",
				"--targetRefName", targetRefName,
				"--linkingAlmtName", "AL_UNCONSTRAINED"]));						
		});
		var totalNumPositions = featureSiteDepths.length;
		var numPositionsWithMinDepth = [];
		for(var i = 0; i < depthThresholds.length; i++) { 
			numPositionsWithMinDepth.push(0); 
		}
		_.each(featureSiteDepths, function(depthObj) {
			for(var i = 0; i < depthThresholds.length; i++) { 
				if(depthObj.depth >= depthThresholds[i]) {
					numPositionsWithMinDepth[i]++;
				}
			}
		});
		var featureCopy = _.clone(feature);
		featureCopy.depthCoveragePcts = [];
		for(var i = 0; i < depthThresholds.length; i++) { 
			featureCopy.depthCoveragePcts.push({ 
				minDepth: depthThresholds[i],
				pctPositions: (numPositionsWithMinDepth[i] / totalNumPositions) * 100.0
			});
		}
		featuresWithDepthCoverage.push(featureCopy);
	});
	return featuresWithDepthCoverage;
	
} 

function generateSingleFastaReport(inputDocument) {
	var sequenceNts = inputDocument.singleFastaInputDoc.sequenceNts;
	var sequenceResult = inputDocument.singleFastaInputDoc.sequenceResult;
	var fastaFilePath = inputDocument.singleFastaInputDoc.fastaFilePath;
	
	var publicationIdToObj = {};
	nextPubIndex = 1;

	// apply variation scanning
	// prvrTime = 0;

	var genotypingResult = sequenceResult.genotypingResult;
	if(genotypingResult != null) {
		if(genotypingResult.genotypeCladeCategoryResult.finalClade != null) {
			var targetRefName = genotypingResultToTargetRefName(genotypingResult);
			var nucleotides = sequenceNts;
			var queryToTargetRefSegs = generateQueryToTargetRefSegs(targetRefName, nucleotides);
			var queryNucleotides = sequenceNts;
			sequenceResult.featuresWithCoverage = generateFeaturesWithCoverage(targetRefName, queryToTargetRefSegs);

			var variationWhereClauses = getVariationWhereClauses(genotypingResult);
			var mainSectionWhereClause = variationWhereClauses.mainSectionWhereClause;
			var sameGenotypeWhereClause = variationWhereClauses.sameGenotypeWhereClause;
			var differentGenotypeWhereClause = variationWhereClauses.differentGenotypeWhereClause;

			sequenceResult.targetRefName = targetRefName;

			// var t0 = Java.type("java.lang.System").currentTimeMillis();
			// run the main scan 
			var mainSectionRasScanResults = 
				fastaVariationScan(queryNucleotides, queryToTargetRefSegs, targetRefName, 
						mainSectionWhereClause, false, false);

			// var t1 = Java.type("java.lang.System").currentTimeMillis();
			// glue.logInfo("scan 1: "+(t1-t0)+" ms")

			// other scans for the "other polymorphisms of interest" section
			var sameGenotypeRasScanResults = 
				fastaVariationScan(queryNucleotides, queryToTargetRefSegs, targetRefName, 
						sameGenotypeWhereClause, true, true);

			// var t2 = Java.type("java.lang.System").currentTimeMillis();
			// glue.logInfo("scan 2: "+(t2-t1)+" ms")

			var differentGenotypeRasScanResults = 
				fastaVariationScan(queryNucleotides, queryToTargetRefSegs, targetRefName, 
						differentGenotypeWhereClause, true, true);

			// var t3 = Java.type("java.lang.System").currentTimeMillis();
			// glue.logInfo("scan 3: "+(t3-t2)+" ms")

			var residuesAtRasAssociatedLocations = 
				fastaResiduesAtRasAssociatedLocations(queryNucleotides, queryToTargetRefSegs, 
						targetRefName);

			// var t4 = Java.type("java.lang.System").currentTimeMillis();
			// glue.logInfo("scan 4: "+(t4-t3)+" ms")

			sequenceResult.rasScanResults = mainSectionRasScanResults;
			// map each drug to resistance literature level (good / poor / none) for genotype and subtype
			var drugs = glue.tableToObjects(glue.command(["list", "custom-table-row", "phdr_drug", "id", "category"]));
			var resistanceLiteratureMap = resistanceLiterature(genotypingResult, drugs);
			// map for recording polymorphisms reported at a higher significance (e.g. confirmed RAS), so that they don't 
			// get reported again at a lower significance (e.g. atypical for subtype).
			var reportedPolymorphismKeys = {};
			// glue.log("FINE", "phdrReportingController.generateSingleFastaReport rasScanResults:", 
			//		sequenceResult.rasScanResults);

			// var rfTime = 0;


			_.each(sequenceResult.rasScanResults, function(scanResult) {

				// var p0 = Java.type("java.lang.System").currentTimeMillis();
				var rasFinding = getRasFinding(genotypingResult, scanResult.referenceName, 
						scanResult.featureName, scanResult.variationName, resistanceLiteratureMap, true);
				// var p1 = Java.type("java.lang.System").currentTimeMillis();
				// rfTime += (p1 - p0);
				// glue.log("FINE", "phdrReportingController.generateSingleFastaReport rasFinding:", rasFinding);
				scanResult.rasDetails = rasFinding.phdrRasVariation;
			});

			// glue.logInfo("rfTime: "+rfTime+" ms")


			// var t5 = Java.type("java.lang.System").currentTimeMillis();
			// glue.logInfo("phase 5: "+(t5-t4)+" ms")

			sequenceResult.rasScanResults = removeEmptyScanResults(sequenceResult.rasScanResults);

			var subtypeAlmtName = getSubtypeAlmtName(genotypingResult);
			if(subtypeAlmtName != null) {
				almtName = subtypeAlmtName;
			} else if(genotypingResult.genotypeCladeCategoryResult.finalClade != null) {
				almtName = genotypingResult.genotypeCladeCategoryResult.finalClade;
			}

			// var pubTime = 0;

			_.each(sequenceResult.rasScanResults, function(scanResult) {
				if(scanResult.present) {
					// var p0 = Java.type("java.lang.System").currentTimeMillis();
					addRasPublications(scanResult.rasDetails, publicationIdToObj);
					// var p1 = Java.type("java.lang.System").currentTimeMillis();
					// pubTime += (p1 - p0);

					_.each(scanResult.rasDetails.alignmentRas, function(alignmentRas) {
						// rewrite display structure so that it's specific to the current sequence genotype / subtype
						alignmentRas.displayStructure = computeDisplayStructure(scanResult.rasDetails.gene, scanResult.rasDetails.structure, almtName);
					});

					scanResult.reliesOnNonDefiniteAa = determineReliesOnNonDefiniteAa(scanResult, sequenceResult);
				}
			});

			// glue.logInfo("pubTime: "+pubTime+" ms")

			// var t6 = Java.type("java.lang.System").currentTimeMillis();
			// glue.logInfo("phase 6: "+(t6-t5)+" ms")

			// at this stage sequenceResult.rasScanResults contains absent / insufficient coverage variation scan results, 
			// which is important for assessing whether the sequence has insufficient coverage overall for a given drug.
			sequenceResult.drugScores = assessResistance(drugs, sequenceResult, resistanceLiteratureMap, false);

			// now remove non-present variation scan results.
			sequenceResult.rasScanResults = _.filter(sequenceResult.rasScanResults, function(scanResult) {
				return scanResult.present;
			});

			// glue.log("FINE", "phdrReportingController.generateSingleFastaReport sequenceResult.drugScores:", sequenceResult.drugScores);

			// var t7 = Java.type("java.lang.System").currentTimeMillis();
			// glue.logInfo("phase 7: "+(t7-t6)+" ms")

			_.each(sequenceResult.rasScanResults, function(scanResult) {
				scanResult.rapUrl = "http://hcv.glue.cvr.ac.uk/#/project/rap/"+scanResult.rasDetails.gene+":"+scanResult.rasDetails.structure;
				reportedPolymorphismKeys[scanResult.rasDetails.gene+":"+scanResult.rasDetails.structure] = "thisCladeRAS";
			});



			sequenceResult.substitutionsOfInterest = [];
			sequenceResult.sameGenotypeRasScanResults = sameGenotypeRasScanResults;
			// glue.log("FINE", "phdrReportingController.generateSingleFastaReport sameGenotypeRasScanResults:", 
			//		sequenceResult.sameGenotypeRasScanResults);
			_.each(sequenceResult.sameGenotypeRasScanResults, function(scanResult) {
				var rasFinding = getRasFinding(genotypingResult, scanResult.referenceName, 
						scanResult.featureName, scanResult.variationName, resistanceLiteratureMap, false);
				// glue.log("FINE", "phdrReportingController.generateSingleFastaReport rasFinding:", rasFinding);
				scanResult.rasDetails = rasFinding.phdrRasVariation;
				scanResult.reliesOnNonDefiniteAa = determineReliesOnNonDefiniteAa(scanResult, sequenceResult);
				checkForSameGenotypeRas(genotypingResult, scanResult, reportedPolymorphismKeys, sequenceResult.substitutionsOfInterest, sequenceResult);
			});

			// var t8 = Java.type("java.lang.System").currentTimeMillis();
			// glue.logInfo("phase 8: "+(t8-t7)+" ms")


			sequenceResult.differentGenotypeRasScanResults = differentGenotypeRasScanResults;
			// glue.log("FINE", "phdrReportingController.generateSingleFastaReport differentGenotypeRasScanResults:", 
			// sequenceResult.differentGenotypeRasScanResults);
			_.each(sequenceResult.differentGenotypeRasScanResults, function(scanResult) {
				var rasFinding = getRasFinding(genotypingResult, scanResult.referenceName, 
						scanResult.featureName, scanResult.variationName, resistanceLiteratureMap, false);
				// glue.log("FINE", "phdrReportingController.generateSingleFastaReport rasFinding:", rasFinding);
				scanResult.rasDetails = rasFinding.phdrRasVariation;
				scanResult.reliesOnNonDefiniteAa = determineReliesOnNonDefiniteAa(scanResult, sequenceResult);
				checkForDifferentGenotypeRas(genotypingResult, scanResult, reportedPolymorphismKeys, sequenceResult.substitutionsOfInterest, sequenceResult);
			});

			// var t9 = Java.type("java.lang.System").currentTimeMillis();
			// glue.logInfo("phase 9: "+(t9-t8)+" ms")

			sequenceResult.residuesAtRasAssociatedLocations = residuesAtRasAssociatedLocations;
			// glue.log("FINE", "phdrReportingController.generateSingleFastaReport residuesAtRasAssociatedLocations", 
			//		sequenceResult.residuesAtRasAssociatedLocations);
			_.each(sequenceResult.residuesAtRasAssociatedLocations, function(residueObj) {
				checkForWildTypeSubstitution(genotypingResult, residueObj, reportedPolymorphismKeys, sequenceResult.substitutionsOfInterest, sequenceResult);
			});
			// var t10 = Java.type("java.lang.System").currentTimeMillis();
			// glue.logInfo("phase 10: "+(t10-t9)+" ms")

			sequenceResult.visualisationHints = visualisationHints(queryNucleotides, targetRefName, genotypingResult, queryToTargetRefSegs, sequenceResult.rasScanResults);

			// var t11 = Java.type("java.lang.System").currentTimeMillis();
			// glue.logInfo("phase 11: "+(t11-t10)+" ms")


			// glue.logInfo("prvrTime: "+prvrTime+" ms")

		}
	}
	// glue.log("FINE", "phdrReportingController.generateSingleFastaReport publicationIdToObj:", publicationIdToObj);

	var publications = _.values(publicationIdToObj);
	publications = _.sortBy(publications, "index");

	
	var phdrReport = { 
		phdrReport: {
			sequenceDataFormat: "FASTA",
			filePath: fastaFilePath,
			sequenceResult: sequenceResult, 
			publications: publications
		}
	};
	addOverview(phdrReport);

	// glue.log("FINE", "phdrReportingController.generateSingleFastaReport phdrReport:", phdrReport);
	return phdrReport;
}

function determineReliesOnNonDefiniteAa(scanResult, sequenceResult) {
	if(scanResult.variationType == "aminoAcidSimplePolymorphism") {
		var relies = scanResult.matches[0].reliesOnNonDefiniteAa;
		if(relies) {
			sequenceResult.reliesOnNonDefiniteAa = true;
		}
		return relies;
	}
	if(scanResult.variationType == "conjunction") {
		var conjunctsRelyOnNonDefiniteAa = _.map(scanResult.matches[0].conjuncts, function(conjunctResult) { return determineReliesOnNonDefiniteAa(conjunctResult, sequenceResult); });
		var relies = conjunctsRelyOnNonDefiniteAa.indexOf(true) >= 0;
		if(relies) {
			sequenceResult.reliesOnNonDefiniteAa = true;
		}
		return relies;
	}
	
	return false;
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
	var subtypeAlmtName = getSubtypeAlmtName(genotypingResult);
	if(subtypeAlmtName != null) {
		almtName = subtypeAlmtName;
	} else if(genotypingResult.genotypeCladeCategoryResult.finalClade != null) {
		almtName = genotypingResult.genotypeCladeCategoryResult.finalClade;
	}
	var gtDisplayClade = genotypingResult.genotypeCladeCategoryResult.finalCladeRenderedName.replace("HCV ", "").toLowerCase();
	var polyKey = scanResult.rasDetails.gene+":"+ scanResult.rasDetails.structure;
	if(reportedPolymorphismKeys[polyKey] == null) {
		var rsgObj = {};
		rsgObj.virusProtein = scanResult.rasDetails.gene;
		rsgObj.rapUrl = "http://hcv.glue.cvr.ac.uk/#/project/rap/"+scanResult.rasDetails.gene+":"+scanResult.rasDetails.structure;
		rsgObj.displayStructure = computeDisplayStructure(scanResult.rasDetails.gene, scanResult.rasDetails.structure, almtName);
		rsgObj.reasonForInterest = "rap_in_same_gt";
		rsgObj.displayReasonForInterest = "Associated with resistance in other subtypes of "+gtDisplayClade;
		rsgObj.reliesOnNonDefiniteAa = scanResult.reliesOnNonDefiniteAa;
		// minority percentage / depth data if appropriate
		if(scanResult.pctPresent != null) {
			rsgObj.pctPresent = scanResult.pctPresent;
			rsgObj.depth = scanResult.readsPresent + scanResult.readsAbsent;
		}
		substitutionsOfInterest.push(rsgObj);
		reportedPolymorphismKeys[polyKey] = "rap_in_same_gt";
	}
}


function checkForDifferentGenotypeRas(genotypingResult, scanResult, reportedPolymorphismKeys, substitutionsOfInterest) {

	var subtypeAlmtName = getSubtypeAlmtName(genotypingResult);
	if(subtypeAlmtName != null) {
		almtName = subtypeAlmtName;
	} else if(genotypingResult.genotypeCladeCategoryResult.finalClade != null) {
		almtName = genotypingResult.genotypeCladeCategoryResult.finalClade;
	}
	var gtDisplayClade = genotypingResult.genotypeCladeCategoryResult.finalCladeRenderedName.replace("HCV ", "").toLowerCase();
	var polyKey = scanResult.rasDetails.gene+":"+ scanResult.rasDetails.structure;
	if(reportedPolymorphismKeys[polyKey] == null) {
		var rdgObj = {};
		rdgObj.virusProtein = scanResult.rasDetails.gene;
		rdgObj.rapUrl = "http://hcv.glue.cvr.ac.uk/#/project/rap/"+scanResult.rasDetails.gene+":"+scanResult.rasDetails.structure;
		rdgObj.displayStructure = computeDisplayStructure(scanResult.rasDetails.gene, scanResult.rasDetails.structure, almtName);
		rdgObj.reasonForInterest = "rap_in_different_gt";
		rdgObj.displayReasonForInterest = "Associated with resistance in genotypes other than "+gtDisplayClade;
		rdgObj.reliesOnNonDefiniteAa = scanResult.reliesOnNonDefiniteAa;
		// minority percentage / depth data if appropriate
		if(scanResult.pctPresent != null) {
			rdgObj.pctPresent = scanResult.pctPresent;
			rdgObj.depth = scanResult.readsPresent + scanResult.readsAbsent;
		}
		substitutionsOfInterest.push(rdgObj);
		reportedPolymorphismKeys[polyKey] = "rap_in_different_gt";
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


function checkForWildTypeSubstitution(genotypingResult, residueObj, reportedPolymorphismKeys, substitutionsOfInterest, sequenceResult) {
	var almtName;
	var displayClade;
	var subtypeAlmtName = getSubtypeAlmtName(genotypingResult);
	if(subtypeAlmtName != null) {
		almtName = subtypeAlmtName;
		displayClade = genotypingResult.subtypeCladeCategoryResult.finalCladeRenderedName.replace("HCV ", "").toLowerCase();
	} else if(genotypingResult.genotypeCladeCategoryResult.finalClade != null) {
		almtName = genotypingResult.genotypeCladeCategoryResult.finalClade;
		displayClade = genotypingResult.genotypeCladeCategoryResult.finalCladeRenderedName.replace("HCV ", "").toLowerCase();
	}
	var gene = residueObj.feature;
	var codon = residueObj.codonLabel;
	var residues;
	var definiteAas;
	if(residueObj.possibleAas != null) {
		// FASTA consensus case, use the set of possible AAs given any ambiguity codes in the triplet.
		residues = residueObj.possibleAas.split("").sort();
		definiteAas = residueObj.definiteAas.split("");
	} else {
		// SAM/BAM case
		residues = [residueObj.aminoAcid];
		definiteAas = [residueObj.aminoAcid];
	}
	
	
	var typicalAAs = glue.getTableColumn(glue.command([
		"list", "custom-table-row", "phdr_alignment_typical_aa", 
		"-w", "alignment.name = '"+almtName+"' and feature.name = '"+gene+"' and codon_label = '"+codon+"'", 
		"aa_residue"]), "aa_residue")
		.sort();

	// check whether detected possible residue is typical or not.
	for(var i = 0; i < residues.length; i++) {
		var residueAA = residues[i];
		// for some triplets with ambiguity codes, the set of possible AAs is very large. We only
		// report possible AAs when there is a set of 6 or less.
		if(typicalAAs.indexOf(residueAA) < 0 && residues.length <= 6) {
			var reportedKey = gene+":"+codon+residueAA;
			if(reportedPolymorphismKeys[reportedKey] == null) {
				var wtSubObj = {};
				wtSubObj.virusProtein = gene;
				wtSubObj.displayStructure = typicalAAs.join("/")+codon+residueAA;
				wtSubObj.reasonForInterest = "sub_at_rap_location";
				wtSubObj.atypicalForClade = almtName;
				wtSubObj.displayReasonForInterest = "Atypical substitution for "+displayClade+" at a location associated with resistance";
				if(definiteAas.indexOf(residueAA) >= 0) {
					wtSubObj.reliesOnNonDefiniteAa = false;
				} else {
					sequenceResult.reliesOnNonDefiniteAa = true;
					wtSubObj.reliesOnNonDefiniteAa = true;
				}

				if(residueObj.pctAaReads != null) {
					// SAM/BAM case
					wtSubObj.pctPresent = residueObj.pctAaReads;
					wtSubObj.depth = residueObj.readsWithAA + residueObj.readsWithDifferentAA;
				}
				substitutionsOfInterest.push(wtSubObj);
				reportedPolymorphismKeys[reportedKey] = "sub_at_rap_location";
			}
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
	var subtypeAlmtName = getSubtypeAlmtName(genotypingResult);
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
	var genotypeAlmtName = genotypingResult.genotypeCladeCategoryResult.finalClade;
	// for main section, at this stage, include RASs for any subtype of the same genotype, or RASs of the genotype.
	// some findings / RASs will get removed again during getRasFinding, based on the resistance literature for
	// the drug / subtype.
	var mainSectionWhereClause = "phdr_ras != null and "+
	"(phdr_ras.phdr_alignment_ras.alignment.parent.name = '"+genotypeAlmtName+"' or "+
	"phdr_ras.phdr_alignment_ras.alignment.name ='"+genotypeAlmtName+"')";
	// for same genotype RASs, as above but exclude resistance category 4 (unclassified) -- too much clutter otherwise
	var sameGenotypeWhereClause = "phdr_ras != null and "+
		"(phdr_ras.phdr_alignment_ras.alignment.parent.name = '"+genotypeAlmtName+"' or "+
		"phdr_ras.phdr_alignment_ras.alignment.name ='"+genotypeAlmtName+"') and "+
		"phdr_ras.phdr_alignment_ras.phdr_alignment_ras_drug.numeric_resistance_category <= 3";
	// for different genotype RASs, exclude resistance category 4 (unclassified) -- too much clutter otherwise
	var differentGenotypeWhereClause = "phdr_ras != null and "+
		"phdr_ras.phdr_alignment_ras.alignment.parent.name !='"+genotypeAlmtName+"' and "+
		"phdr_ras.phdr_alignment_ras.alignment.name !='"+genotypeAlmtName+"' and "+
		"phdr_ras.phdr_alignment_ras.phdr_alignment_ras_drug.numeric_resistance_category <= 3";
	var variationWhereClauses = {
		mainSectionWhereClause: mainSectionWhereClause,
		sameGenotypeWhereClause: sameGenotypeWhereClause,
		differentGenotypeWhereClause: differentGenotypeWhereClause,
	};
	// glue.log("FINEST", "variationWhereClauses", variationWhereClauses);
	return variationWhereClauses;
}

function addRasPublications(rasDetails, publicationIdToObj) {
	_.each(rasDetails.alignmentRas, function(alignmentRas) {
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

function reportBam(bamFilePath, minReadProportionPct) {
	// glue.log("FINE", "phdrReportingController.reportBam invoked, input file:"+bamFilePath);
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
				                                  "--preview"]);
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
				samRefResult.featuresWithCoverage = generateFeaturesWithDepthCoverage(targetRefName, bamFilePath);
				samRefResult.targetRefName = targetRefName;
				
				if(genotypingResult.genotypeCladeCategoryResult.finalClade != null) {
					var variationWhereClauses = getVariationWhereClauses(genotypingResult);
					var mainSectionWhereClause = variationWhereClauses.mainSectionWhereClause;
					var sameGenotypeWhereClause = variationWhereClauses.sameGenotypeWhereClause;
					var differentGenotypeWhereClause = variationWhereClauses.differentGenotypeWhereClause;				

					// run the main scan with no min depth / min read pct.
					// this is to find important variations for which there is insufficient coverage.
					var mainSectionRasScanResults = 
						bamVariationScan(bamFilePath, samRefSense, samRefResult.samReference.name, targetRefName, 
								mainSectionWhereClause, 0, 0);

					// other scans for the "other polymorphisms of interest" section
					var sameGenotypeRasScanResults = 
						bamVariationScan(bamFilePath, samRefSense, samRefResult.samReference.name, targetRefName, 
								sameGenotypeWhereClause, phdrSamThresholds.minDepth, minReadProportionPct);

					var differentGenotypeRasScanResults = 
						bamVariationScan(bamFilePath, samRefSense, samRefResult.samReference.name, targetRefName, 
								differentGenotypeWhereClause, phdrSamThresholds.minDepth, minReadProportionPct);

					var residuesAtRasAssociatedLocations = 
						bamResiduesAtRasAssociatedLocations(bamFilePath, samRefSense, 
								samRefResult.samReference.name, targetRefName, minReadProportionPct);

					samRefResult.rasScanResults = mainSectionRasScanResults;

					// map each drug to resistance literature level (good / poor / none) for genotype and subtype
					var drugs = glue.tableToObjects(glue.command(["list", "custom-table-row", "phdr_drug", "id", "category"]));
					var resistanceLiteratureMap = resistanceLiterature(genotypingResult, drugs);

					// map for recording polymorphisms reported at a higher significance (e.g. confirmed RAS), so that they don't 
					// get reported again at a lower significance (e.g. atypical for subtype).
					var reportedPolymorphismKeys = {};
					_.each(samRefResult.rasScanResults, function(scanResult) {

						if(scanResult.readsPresent + scanResult.readsAbsent >= phdrSamThresholds.minDepth) {
							scanResult.sufficientCoverage = true;
						} else {
							scanResult.sufficientCoverage = false;
						}
						if(scanResult.sufficientCoverage && scanResult.pctPresent >= minReadProportionPct) {
							scanResult.present = true;
						} else {
							scanResult.present = false;
						}

						var rasFinding = getRasFinding(genotypingResult, scanResult.referenceName, 
								scanResult.featureName, scanResult.variationName, resistanceLiteratureMap, true);
						// glue.log("FINE", "phdrReportingController.reportBam rasFinding:", rasFinding);
						scanResult.rasDetails = rasFinding.phdrRasVariation;
					});

					
					samRefResult.rasScanResults = removeEmptyScanResults(samRefResult.rasScanResults);

					var subtypeAlmtName = getSubtypeAlmtName(genotypingResult);
					if(subtypeAlmtName != null) {
						almtName = subtypeAlmtName;
					} else if(genotypingResult.genotypeCladeCategoryResult.finalClade != null) {
						almtName = genotypingResult.genotypeCladeCategoryResult.finalClade;
					}

					_.each(samRefResult.rasScanResults, function(scanResult) {
						if(scanResult.present) {
							addRasPublications(scanResult.rasDetails, publicationIdToObj);
							_.each(scanResult.rasDetails.alignmentRas, function(alignmentRas) {
								// rewrite display structure so that it's specific to the current sequence genotype / subtype
								alignmentRas.displayStructure = computeDisplayStructure(scanResult.rasDetails.gene, scanResult.rasDetails.structure, almtName);
							});
						}
					});
					
					// glue.log("FINE", "phdrReportingController.reportBam rasScanResults including absent:", samRefResult.rasScanResults);
					// at this stage sequenceResult.rasScanResults contains absent / insufficient coverage variation scan results, 
					// which is important for assessing whether the sequence has insufficient coverage overall for a given drug.
					samRefResult.drugScores = assessResistance(drugs, samRefResult, resistanceLiteratureMap, true);

					// now remove non-present variation scan results.
					samRefResult.rasScanResults = _.filter(samRefResult.rasScanResults, function(scanResult) {
						return scanResult.present;
					});

					// glue.log("FINE", "phdrReportingController.reportBam rasScanResults excluding absent:", samRefResult.rasScanResults);


					_.each(samRefResult.rasScanResults, function(scanResult) {
						scanResult.rapUrl = "http://hcv.glue.cvr.ac.uk/#/project/rap/"+scanResult.rasDetails.gene+":"+scanResult.rasDetails.structure;
						reportedPolymorphismKeys[scanResult.rasDetails.gene+":"+scanResult.rasDetails.structure] = "confirmed_rap";

					});



					samRefResult.substitutionsOfInterest = [];
					samRefResult.sameGenotypeRasScanResults = sameGenotypeRasScanResults;
					// glue.log("FINE", "phdrReportingController.reportBam sameGenotypeRasScanResults:", 
					//		samRefResult.sameGenotypeRasScanResults);
					_.each(samRefResult.sameGenotypeRasScanResults, function(scanResult) {
						var rasFinding = getRasFinding(genotypingResult, scanResult.referenceName, 
								scanResult.featureName, scanResult.variationName, resistanceLiteratureMap, false);
						// glue.log("FINE", "phdrReportingController.reportBam rasFinding:", rasFinding);
						scanResult.rasDetails = rasFinding.phdrRasVariation;
						checkForSameGenotypeRas(genotypingResult, scanResult, reportedPolymorphismKeys, samRefResult.substitutionsOfInterest);
					});

					samRefResult.differentGenotypeRasScanResults = differentGenotypeRasScanResults;
					// glue.log("FINE", "phdrReportingController.reportBam differentGenotypeRasScanResults:", 
					//		samRefResult.differentGenotypeRasScanResults);
					_.each(samRefResult.differentGenotypeRasScanResults, function(scanResult) {
						var rasFinding = getRasFinding(genotypingResult, scanResult.referenceName, 
								scanResult.featureName, scanResult.variationName, resistanceLiteratureMap, false);
						// glue.log("FINE", "phdrReportingController.reportBam rasFinding:", rasFinding);
						scanResult.rasDetails = rasFinding.phdrRasVariation;
						checkForDifferentGenotypeRas(genotypingResult, scanResult, reportedPolymorphismKeys, samRefResult.substitutionsOfInterest);
					});

					samRefResult.residuesAtRasAssociatedLocations = residuesAtRasAssociatedLocations;
					// glue.log("FINE", "phdrReportingController.reportBam residuesAtRasAssociatedLocations", 
					//		samRefResult.residuesAtRasAssociatedLocations);
					_.each(samRefResult.residuesAtRasAssociatedLocations, function(residueObj) {
						checkForWildTypeSubstitution(genotypingResult, residueObj, reportedPolymorphismKeys, 
								samRefResult.substitutionsOfInterest, samRefResult);
					});


					// glue.log("FINE", "phdrReportingController.reportBam samRefResult.drugScores:", samRefResult.drugScores);
	
				}
				
			}
		});
		// glue.log("FINE", "phdrReportingController.reportBam publicationIdToObj:", publicationIdToObj);
	
		var publications = _.values(publicationIdToObj);
		publications = _.sortBy(publications, "index");
		
		phdrReport = { 
				phdrReport: {
					sequenceDataFormat: "SAM/BAM",
					filePath: bamFilePath,
					samReferenceResult: _.values(resultMap)[0],
					publications: publications, 
					placerResult: placerResultContainer.placerResult,
					minReadProportionPct: parseFloat(minReadProportionPct)
				}
		};
		addOverview(phdrReport);
		// glue.log("FINE", "phdrReportingController.reportBam phdrReport:", phdrReport);
		
	});
	
	return phdrReport;
}



function bamVariationScan(bamFilePath, samRefSense, samRefName, targetRefName, whereClause, minDepth, minReadProportionPct) {
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
		   				              "--minDepth", minDepth,
		   				              "--minPresentPct", minReadProportionPct]));					
	});
	return scanResults;
}

function bamResiduesAtRasAssociatedLocations(bamFilePath, samRefSense, samRefName, targetRefName, minReadProportionPct) {
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
		   				              "--minAAPct", minReadProportionPct]));					
	});
	return residueObjs;
}


function assessResistance(drugs, result, resistanceLiteratureMap, useAaSpan) {
	var assessmentList = _.map(drugs, function(drug) { 
		return assessResistanceForDrug(result, drug, resistanceLiteratureMap[drug.id], useAaSpan); 
	});
	var categoryToDrugs = _.groupBy(assessmentList, function(assessment) { return assessment.drug.category; });
	var categoryAssessments = _.map(_.pairs(categoryToDrugs), function(pair) {return { category:pair[0], drugAssessments:pair[1]};});
	categoryAssessments = _.sortBy(categoryAssessments, "category");
	return categoryAssessments;
}

// the aaSpan property of each RAS is used in the SAM/BAM case.
// Some RASs have long AA spans, e.g. L31F+Y129H has an AA span of 99.
// These RASs are unlikely to be found to be present / absent in BAM reads
// because it is unlikely that reads will cover all locations.
// However, this must not be taken as evidence that coverage is insufficient.
function assessResistanceForDrug(result, drug, resistanceLiteratureObj, useAaSpan) {
	

	
	// if AA span is higher than this, negative sufficientCoverage for the variation
	// scan result does not count as insufficient coverage for the drug.
	var aaSpanThreshold = 1;
	
	var drugScore = null;
	var drugScoreDisplay = null;
	var drugScoreDisplayShort = null;

	var rasScores_category_I = [];
	var rasScores_category_II = [];
	var rasScores_category_III = [];
	
	var cat_I_keys = {};
	var cat_II_keys = {};
	var cat_III_keys = {};
	
	var overallSufficientCoverage = true;
	var genotypeHasGoodResistanceLiterature = resistanceLiteratureObj.gtResistanceLiterature == "good";
	
	var sufficientCoverage_I = true;
	var sufficientCoverage_II = true;
	var sufficientCoverage_III = true;

	// assume a single category depends on a ras that was included because of insufficient / unknown subtype research
	// until we find a counterexample.
	var insufficientSubtypeResearch_I = true;
	var insufficientSubtypeResearch_II = true;
	var insufficientSubtypeResearch_III = true;
	var unknownSubtypeResearch_I = true;
	var unknownSubtypeResearch_II = true;
	var unknownSubtypeResearch_III = true;

	_.each(result.rasScanResults, function(scanResult) {
		var aaSpan = scanResult.rasDetails.aaSpan;
		_.each(scanResult.rasDetails.alignmentRas, function(alignmentRas) {
			_.each(alignmentRas.alignmentRasDrug, function(alignmentRasDrug) {
				if(alignmentRasDrug.drug == drug.id) {
					if(alignmentRasDrug.resistanceCategory != "insignificant") {
						var key = scanResult.rasDetails.gene+":"+scanResult.rasDetails.structure;
						var rasScoreDetails = {
							gene: scanResult.rasDetails.gene,
							key: key,
							structure: scanResult.rasDetails.structure,
							displayStructure: alignmentRas.displayStructure,
							rapUrl: "http://hcv.glue.cvr.ac.uk/#/project/rap/"+scanResult.rasDetails.gene+":"+scanResult.rasDetails.structure,
							category: alignmentRasDrug.resistanceCategory,
							displayCategory: alignmentRasDrug.displayCategory,
							reliesOnNonDefiniteAa: scanResult.reliesOnNonDefiniteAa
						};
						if(scanResult.pctPresent != null) {
							rasScoreDetails.readsPctPresent = scanResult.pctPresent;
						}
						if(alignmentRasDrug.resistanceCategory == "category_I") {
							if(scanResult.present) {
								if(!alignmentRasDrug.includedBecauseSubtypeResistanceLiteratureInsufficient) {
									insufficientSubtypeResearch_I = false;
								}
								if(!alignmentRasDrug.includedBecauseSubtypeUnknown) {
									unknownSubtypeResearch_I = false;
								}
								if(cat_I_keys[key] == null) { // avoid duplicates
									rasScores_category_I.push(rasScoreDetails); 
									cat_I_keys[key] = "yes";
								}
							} else if(!scanResult.sufficientCoverage) {
								if(aaSpan <= aaSpanThreshold || !useAaSpan) {
									sufficientCoverage_I = false;
								}
							}
						} else if(alignmentRasDrug.resistanceCategory == "category_II") {
							if(scanResult.present) {
								if(!alignmentRasDrug.includedBecauseSubtypeResistanceLiteratureInsufficient) {
									insufficientSubtypeResearch_II = false;
								}
								if(!alignmentRasDrug.includedBecauseSubtypeUnknown) {
									unknownSubtypeResearch_II = false;
								}
								if(cat_II_keys[key] == null) { // avoid duplicates
									rasScores_category_II.push(rasScoreDetails); 
									cat_II_keys[key] = "yes";
								}
							} else if(!scanResult.sufficientCoverage) {
								if(aaSpan <= aaSpanThreshold || !useAaSpan) {
									sufficientCoverage_II = false;
								}
							}
						} else if(alignmentRasDrug.resistanceCategory == "category_III") {
							if(scanResult.present) {
								if(!alignmentRasDrug.includedBecauseSubtypeResistanceLiteratureInsufficient) {
									insufficientSubtypeResearch_III = false;
								}
								if(!alignmentRasDrug.includedBecauseSubtypeUnknown) {
									unknownSubtypeResearch_III = false;
								}
								if(cat_III_keys[key] == null) { // avoid duplicates
									rasScores_category_III.push(rasScoreDetails); 
									cat_III_keys[key] = "yes";
								}
							} else if(!scanResult.sufficientCoverage) {
								if(aaSpan <= aaSpanThreshold || !useAaSpan) {
									sufficientCoverage_III = false;
								}	
							}
						}
					}
				}
			});
		});
	});

	// don't report the same RAS in two categories; only the higher category
	rasScores_category_II = _.filter(rasScores_category_II, function(rsc2) { return cat_I_keys[rsc2.key] == null; });
	rasScores_category_III = _.filter(rasScores_category_III, function(rsc2) { return cat_I_keys[rsc2.key] == null && cat_II_keys[rsc2.key] == null; });
	
	// overall sufficient coverage = false if:
    // No category I RAS detected and sufficientCoverage_I is false or
	// No category I, II RAS detected and sufficientCoverage_II is false or
	// No category I, II or III RAS detected and sufficientCoverage_III is false
	
	// drug score: 4 levels:
	// Resistance detected:					Any category I RASs.
	// Probable resistance detected:		Any category II RAS.
	// Possible resistance detected:		Any category III RAS.
	// No signficant resistance detected:	None of the above.
	
	
	var numCategoryI = rasScores_category_I.length;
	var numCategoryII = rasScores_category_II.length;
	var numCategoryIII = rasScores_category_III.length;

	var reliesOnNonDefiniteAa = false;
	var insufficientSubtypeResearch = false;
	var unknownSubtypeResearch = false;

	
	if(numCategoryI > 0) {
		drugScore = 'resistance_detected';
		drugScoreDisplay = 'Resistance detected';
		drugScoreDisplayShort = 'Resistance';
		insufficientSubtypeResearch = insufficientSubtypeResearch_I;
		unknownSubtypeResearch = unknownSubtypeResearch_I;
		reliesOnNonDefiniteAa = _.every(rasScores_category_I, function(rasScore) { return rasScore.reliesOnNonDefiniteAa; });
	} else if(!sufficientCoverage_I) {
		overallSufficientCoverage = false;
	} else if(numCategoryII > 0) {
		drugScore = 'probable_resistance_detected';
		drugScoreDisplay = 'Probable resistance detected';
		drugScoreDisplayShort = 'Probable resistance';
		insufficientSubtypeResearch = insufficientSubtypeResearch_II;
		unknownSubtypeResearch = unknownSubtypeResearch_II;
		reliesOnNonDefiniteAa = _.every(rasScores_category_II, function(rasScore) { return rasScore.reliesOnNonDefiniteAa; });
	} else if(!sufficientCoverage_II) {
		overallSufficientCoverage = false;
	} else if(numCategoryIII > 0) {
		drugScore = 'possible_resistance_detected';
		drugScoreDisplay = 'Possible resistance detected';
		drugScoreDisplayShort = 'Possible resistance';
		insufficientSubtypeResearch = insufficientSubtypeResearch_III;
		unknownSubtypeResearch = unknownSubtypeResearch_III;
		reliesOnNonDefiniteAa = _.every(rasScores_category_III, function(rasScore) { return rasScore.reliesOnNonDefiniteAa; });
	} else if(!sufficientCoverage_III) {
		overallSufficientCoverage = false;
	} else {
		drugScore = 'no_significant_resistance_detected';
		drugScoreDisplay = 'No resistance detected';
		drugScoreDisplayShort = 'No resistance';
	}

	return {
		drug: drug,
		drugScore: drugScore, 
		drugScoreDisplay: drugScoreDisplay,
		drugScoreDisplayShort: drugScoreDisplayShort,
		rasScores_category_I: rasScores_category_I,
		rasScores_category_II: rasScores_category_II,
		rasScores_category_III: rasScores_category_III,
		reliesOnNonDefiniteAa: reliesOnNonDefiniteAa,
		genotypeHasGoodResistanceLiterature: genotypeHasGoodResistanceLiterature,
		sufficientCoverage: overallSufficientCoverage,
		insufficientSubtypeResearch: insufficientSubtypeResearch,
		unknownSubtypeResearch: unknownSubtypeResearch
	};
	
}

//var prvrTime = 0;

function getRasFinding(genotypingResult, referenceName, featureName, variationName, resistanceLiteratureMap, filterFindings) {
	var rasFinding;
	glue.inMode("/reference/"+referenceName+
			"/feature-location/"+featureName+
			"/variation/"+variationName, function() {
// 		var t0 = Java.type("java.lang.System").currentTimeMillis();
		rasFinding = glue.command(["render-object", "phdrRasVariationRenderer"]);
// 		var t1 = Java.type("java.lang.System").currentTimeMillis();
//		prvrTime += (t1-t0);
	});

	var genotypeAlmtName = genotypingResult.genotypeCladeCategoryResult.finalClade;
	var subtypeAlmtName = getSubtypeAlmtName(genotypingResult);

	if(filterFindings) {
		// for each alignment-RAS association, filter down the alignment-RAS-drug associations according to
		// the genotype, subtype and resistance-literature-quality for the drug.
		_.each(rasFinding.phdrRasVariation.alignmentRas, function(alignmentRas) {
			var findingAlmtName = alignmentRas.clade.alignmentName;
			var findingParentAlmtName = alignmentRas.parentClade.alignmentName;
			alignmentRas.alignmentRasDrug = _.filter(alignmentRas.alignmentRasDrug, function(alignmentRasDrug) {
				alignmentRasDrug.includedBecauseSubtypeUnknown = false;
				alignmentRasDrug.includedBecauseSubtypeResistanceLiteratureInsufficient = false;
				var drug = alignmentRasDrug.drug;
				var stResistanceLiterature = resistanceLiteratureMap[drug].stResistanceLiterature;
				if(findingAlmtName == genotypeAlmtName || (subtypeAlmtName != null && findingAlmtName == subtypeAlmtName)) {
					// finding clade matches genotype or subtype exactly, include it.
					return true;
				}
				if(subtypeAlmtName == null && findingParentAlmtName == genotypeAlmtName) {
					// subtype unknown -- include findings from other subtypes but add a footnote mentioning this
					alignmentRasDrug.includedBecauseSubtypeUnknown = true;
					return true;
				}
				if(subtypeAlmtName != null && stResistanceLiterature != 'good' && findingParentAlmtName == genotypeAlmtName) {
					// subtype known but subtype resistanceLiterature is poor -- include findings from other subtypes 
					// but add a footnote mentioning this
					alignmentRasDrug.includedBecauseSubtypeResistanceLiteratureInsufficient = true;
					return true;
				}
				return false;
			});
		});

		// delete any alignmentRas objects which no longer have any alignmentRasDrug objects
		rasFinding.phdrRasVariation.alignmentRas = _.filter(rasFinding.phdrRasVariation.alignmentRas, function(alignmentRas) {
			return alignmentRas.alignmentRasDrug.length > 0;
		});
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

		glue.setRunningDescription("Phylogenetic placement");

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
		
		
		glue.setRunningDescription("Genotype and subtype assignment");

		
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
		// glue.log("FINE", "phdrReportingController.genotypeFasta genotypingResults:", genotypingResults);
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
			var subtypeAlmtName = getSubtypeAlmtName(genotypingResult);
			if(subtypeAlmtName == null) {
				genotypingResult.subtypeCladeCategoryResult.shortRenderedName = "unknown";
			} else {
				genotypingResult.subtypeCladeCategoryResult.shortRenderedName = 
					genotypingResult.subtypeCladeCategoryResult.finalCladeRenderedName.replace("HCV Subtype ", "");
			}
				
				
			// glue.log("FINE", "phdrReportingController.genotypeFasta genotypeCladeCategoryResult", genotypingResult.genotypeCladeCategoryResult);
			// glue.log("FINE", "phdrReportingController.genotypeFasta subtypeCladeCategoryResult", genotypingResult.subtypeCladeCategoryResult);
			
			
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
	// glue.log("FINE", "phdrReportingController.reportFasta recogniserResults:", recogniserResults);
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

function resistanceLiterature(genotypingResult, drugs) {
	var gtAlmtName = genotypingResult.genotypeCladeCategoryResult.finalClade;
	var stAlmtName = getSubtypeAlmtName(genotypingResult);
	var gtDrugResistanceLiteratureObjs = glue.tableToObjects(glue.command(["list", "custom-table-row", "phdr_alignment_drug", 
		"-w", "alignment.name = '"+gtAlmtName+"'", 
		"phdr_drug.id", "resistance_literature"]));
	var stDrugResistanceLiteratureObjs = [];
	if(stAlmtName != null) {
		var stDrugResistanceLiteratureObjs = glue.tableToObjects(glue.command(["list", "custom-table-row", "phdr_alignment_drug", 
			"-w", "alignment.name = '"+stAlmtName+"'", 
			"phdr_drug.id", "resistance_literature"]));
	}
	var drugIdToResistanceLiterature = {};
	_.each(drugs, function(drugObj) {
		var drugId = drugObj.id;
		var gtDrugResistanceLiteratureObj = _.find(gtDrugResistanceLiteratureObjs, function(gtdrlo) { return gtdrlo["phdr_drug.id"] == drugId; });
		var stDrugResistanceLiteratureObj = _.find(stDrugResistanceLiteratureObjs, function(stdrlo) { return stdrlo["phdr_drug.id"] == drugId; });
		
		drugIdToResistanceLiterature[drugId] = {
			gtResistanceLiterature: gtDrugResistanceLiteratureObj.resistance_literature,
			stResistanceLiterature: stDrugResistanceLiteratureObj == null ? null : stDrugResistanceLiteratureObj.resistance_literature
		};
	});
	return drugIdToResistanceLiterature;
}

function getSubtypeAlmtName(genotypingResult) {
	var subtypeAlmtName = genotypingResult.subtypeCladeCategoryResult.finalClade;
	if(subtypeAlmtName != null && subtypeAlmtName.indexOf("unassigned") >= 0) {
		subtypeAlmtName = null;
	}
	return subtypeAlmtName;
}

// return list with any scanResults that have no alignmentRas objects left removed.
function removeEmptyScanResults(scanResults) {
	return _.filter(scanResults, function(scanResult) {
		return scanResult.rasDetails.alignmentRas.length > 0;
	});
}