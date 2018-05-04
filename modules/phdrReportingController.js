function reportFasta(fastaFilePath) {
	glue.log("FINE", "phdrReportingController.reportFasta invoked, input file:"+fastaFilePath);
	// Load fasta and put in a fastaMap
	var fastaDocument;
	glue.inMode("module/phdrFastaUtility", function() {
		fastaDocument = glue.command(["load-nucleotide-fasta", fastaFilePath]);
	});
	glue.log("FINE", "phdrReportingController.reportFasta fastaDocument:", fastaDocument);
	var fastaMap = {};
	_.each(fastaDocument.nucleotideFasta.sequences, function(sequenceObj) {
		fastaMap[sequenceObj.id] = sequenceObj;
	});
	// initialise result map.
	var resultMap = {};
	var sequenceObjs = _.values(fastaMap);
	_.each(sequenceObjs, function(sequenceObj) {
		resultMap[sequenceObj.id] = { id: sequenceObj.id };
	});
	// apply recogniser to fastaMap
	recogniseFasta(fastaMap, resultMap);

	var genotypingFastaMap = filterFastaMapForGenotyping(fastaMap, resultMap);
	// apply genotyping
	genotypeFasta(genotypingFastaMap, resultMap);
	
	var publicationIdToObj = {};
	
	// apply variation scanning
	_.each(_.values(resultMap), function(sequenceResult) {
		var genotypingResult = sequenceResult.genotypingResult;
		if(genotypingResult != null) {
			if(genotypingResult.genotypeFinalClade != null) {
				var variationWhereClause = "phdr_ras != null";
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
				var rasFindings = [];
				_.each(scanResults, function(scanResult) {
					glue.inMode("/reference/"+scanResult.referenceName+
								"/feature-location/"+scanResult.featureName+
								"/variation/"+scanResult.variationName, function() {
						rasFindings.push(glue.command(["render-object", "phdrRasVariationRenderer"]));
					});
				});
				_.each(rasFindings, function(rasFinding) {
					addRasPublications(rasFinding, publicationIdToObj);
				});
				sequenceResult.rasFindings = rasFindings;
			}
		}
	});
	glue.log("FINE", "phdrReportingController.reportFasta publicationIdToObj:", publicationIdToObj);
	
	var results = _.values(resultMap);
	var fastaReport = { 
		fastaReport: {
			fastaFilePath: fastaFilePath,
			sequenceResults: results, 
			publications: _.values(publicationIdToObj)
		}
	};
	glue.log("FINE", "phdrReportingController.reportFasta fastaReport:", fastaReport);
	return fastaReport;
}

function addRasPublications(rasFinding, publicationIdToObj) {
	_.each(rasFinding.phdrRasVariation.resistanceFinding, function(resistanceFinding) {
		var publicationId = resistanceFinding.publication.id;
		if(publicationIdToObj[publicationId] == null) {
			glue.inMode("/custom-table-row/phdr_publication/"+publicationId, function() {
				publicationIdToObj[publicationId] = glue.command(["render-object", "phdrPublicationRenderer"]).publication;
			});							
		}
	});
}

function reportBam(bamFilePath) {
	glue.log("FINE", "phdrReportingController.reportBam invoked, input file:"+bamFilePath);
	
	var samReferences;
	glue.inMode("module/phdrSamReporter", function() {
		samReferences = glue.tableToObjects(glue.command(["list", "sam-reference", "--fileName", bamFilePath]));
	});
	
	var resultMap = {};

	_.each(samReferences, function(samReference) {
		resultMap[samReference.name] = {
			id: samReference.name,
			samReference: samReference
		};
	});
	
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
	
	// scan variations for each sam reference
	_.each(_.values(resultMap), function(samRefResult) {
		var genotypingResult = samRefResult.genotypingResult;
		if(genotypingResult != null) {
			var variationWhereClause = "phdr_ras != null";
			var targetRefName = genotypingResultToTargetRefName(genotypingResult);
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
			var rasFindings = [];
			_.each(scanResults, function(scanResult) {
				glue.inMode("/reference/"+scanResult.referenceName+
							"/feature-location/"+scanResult.featureName+
							"/variation/"+scanResult.variationName, function() {
					rasFindings.push(glue.command(["render-object", "phdrRasVariationRenderer"]));
				});
			});
			_.each(rasFindings, function(rasFinding) {
				addRasPublications(rasFinding, publicationIdToObj);
			});
			samRefResult.rasFindings = rasFindings;
			glue.log("FINE", "phdrReportingController.reportBam rasFindings:", samRefResult.rasFindings);
		}
	});
	glue.log("FINE", "phdrReportingController.reportBam publicationIdToObj:", publicationIdToObj);

	var bamReport = 
	{ 
		bamReport: { 
			bamFilePath: bamFilePath,
			samReferenceResults: _.values(resultMap),
			publications: _.values(publicationIdToObj)
		} 
	};
	
	glue.log("FINE", "phdrReportingController.reportBam bamReport:", bamReport);
	
	return bamReport;
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
	var subtypeFinalClade = genotypingResult.subtypeFinalClade;
	if(subtypeFinalClade != null) {
		targetRefSourceName = genotypingResult.subtypeClosestMemberSourceName;
		targetRefSequenceID = genotypingResult.subtypeClosestMemberSequenceID;
	} else {
		targetRefSourceName = genotypingResult.genotypeClosestMemberSourceName;
		targetRefSequenceID = genotypingResult.genotypeClosestMemberSequenceID;
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
	var genotypingResults;
	glue.inMode("module/maxLikelihoodGenotyper", function() {
		genotypingResults = glue.tableToObjects(glue.command({
				"genotype": {
					"fasta-document":
						{
							"fastaCommandDocument": {
								"nucleotideFasta" : {
									"sequences": _.values(fastaMap)
								}
							}, 
							"detailLevel" : "HIGH"
						}
				}
		}));
	});
	glue.log("FINE", "phdrReportingController.reportFasta genotypingResults:", genotypingResults);
	_.each(genotypingResults, function(genotypingResult) {
		resultMap[genotypingResult.queryName].genotypingResult = genotypingResult;
	});
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

function enhanceInVitroRasScanResult(genotypingResult, scanResult) {
	var subtypeFinalClade = genotypingResult.subtypeFinalClade;
	var genotypeFinalClade = genotypingResult.genotypeFinalClade;
	var relevantClades = "('"+genotypeFinalClade+"')"
	if(subtypeFinalClade != null) {
		relevantClades = "('"+genotypeFinalClade+"', '"+subtypeFinalClade+"')"
	}
	scanResult.rasDetails = glue.command(
			["multi-render", "phdr_resistance_finding", 
              "--whereClause", 
              "phdr_ras.variation.featureLoc.referenceSequence.name = '"+scanResult.referenceName+"' and "+
              "phdr_ras.variation.featureLoc.feature.name = '"+scanResult.featureName+"' and "+
              "phdr_ras.variation.name = '"+scanResult.variationName+"' and "+
              "alignment.name in "+relevantClades, 
              "hcvDRInVitroFindingRenderer"]).multiRenderResult.resultDocument;
}

