var rfObjs;

function error(rfObj, errorTxt) {
	glue.log("SEVERE", "Resistance finding", rfObj);
	throw new Error(errorTxt);
}

function linkResultToTrial(resultId, trialId) {
	glue.command(["create", "custom-table-row", "phdr_result_trial", resultId+":"+trialId]);
	glue.inMode("custom-table-row/phdr_result_trial/"+resultId+":"+trialId, function() {
		glue.command(["set", "link-target", "phdr_clinical_trial", "custom-table-row/phdr_clinical_trial/"+trialId]);
		glue.command(["set", "link-target", "phdr_in_vivo_result", "custom-table-row/phdr_in_vivo_result/"+resultId]);
	});
}


function linkResultToRegimen(resultId, regimenId) {
	glue.command(["create", "custom-table-row", "phdr_result_regimen", resultId+":"+regimenId]);
	glue.inMode("custom-table-row/phdr_result_regimen/"+resultId+":"+regimenId, function() {
		glue.command(["set", "link-target", "phdr_regimen", "custom-table-row/phdr_regimen/"+regimenId]);
		glue.command(["set", "link-target", "phdr_in_vivo_result", "custom-table-row/phdr_in_vivo_result/"+resultId]);
	});
}


function loadResistanceFindings(shortname, drugId, gene, pooledMap) {
	glue.inMode("module/phdrTabularUtility", function() {
		rfObjs = glue.tableToObjects(glue.command(["load-tabular", "tabular/formatted/phdr_resistance_findings_"+shortname+".txt"]));
	});

	var idx = 1;

	var almtRasDrugIdToCategoryFactors = {};
	
	_.each(rfObjs, function(rfObj) {
		var rfId = shortname+"_"+idx;
		glue.command(["create", "custom-table-row", "phdr_resistance_finding", rfId]);
		var structure = rfObj.substitution.trim();
		var genotype = rfObj.virusGenotype.trim();
		var rasId = gene+":"+structure;
		var almtName = "AL_"+genotype;

		ensureAlmtRasObject(rasId, gene, structure, almtName);

		var alignmentRasId = gene+":"+structure+":"+almtName;
		var alignmentRasDrugId = gene+":"+structure+":"+almtName+":"+drugId;

		var categoryFactors = almtRasDrugIdToCategoryFactors[alignmentRasDrugId];
		
		if(categoryFactors == null) {
			categoryFactors = {
				insignificantInVitro: false, // EC50 [0, 5) observed.
				lowInVitro: false, // EC50 [5, 50).
				highInVitro: false,// EC50 >= 50 observed.
				highestEc50Midpoint: null, // highest EC50 midpoint of any finding.
				anyInVivo: false,
				inVivoBaseline: null, // observed at baseline in clinical trial.
				inVivoTreatmentEmergent: null, // treatment emergent in clinical trial.
			};
			almtRasDrugIdToCategoryFactors[alignmentRasDrugId] = categoryFactors;
			glue.command(["create", "custom-table-row", "phdr_alignment_ras_drug", alignmentRasDrugId]);
			glue.inMode("custom-table-row/phdr_alignment_ras_drug/"+alignmentRasDrugId, function() {
				glue.command(["set", "link-target", "phdr_drug", "custom-table-row/phdr_drug/"+drugId]);
				glue.command(["set", "link-target", "phdr_alignment_ras", "custom-table-row/phdr_alignment_ras/"+alignmentRasId]);
			});		
		}
		

		glue.inMode("custom-table-row/phdr_resistance_finding/"+rfId, function() {
			glue.command(["set", "link-target", "phdr_alignment_ras_drug", "custom-table-row/phdr_alignment_ras_drug/"+alignmentRasDrugId]);
			var pub_id = rfObj.pubmed.trim();
			glue.command(["set", "link-target", "phdr_publication", "custom-table-row/phdr_publication/"+pub_id]);
		});
		
		var vitroOrVivo = rfObj.vitroOrVivo.trim().replace(" ", "").toLowerCase();
		if(vitroOrVivo == "invitro" || vitroOrVivo == "both") {
			glue.command(["create", "custom-table-row", "phdr_in_vitro_result", rfId]);
			glue.inMode("custom-table-row/phdr_in_vitro_result/"+rfId, function() {
				glue.command(["set", "link-target", "phdr_resistance_finding", "custom-table-row/phdr_resistance_finding/"+rfId]);
				var ec50 = rfObj.ec50.trim().replace(" ", "").toUpperCase();
				var ec50Min;
				var ec50Max;
				if(ec50 == "NA") {
					error(rfObj, "Resistance finding with in vitro result does not report EC50 log FC");
				} else if(ec50.indexOf("±") > 0) {
					var midpoint = parseFloat(ec50.substring(0, ec50.indexOf("±")));
					var radius = parseFloat(ec50.substring(ec50.indexOf("±")+1));
					ec50Min = Math.max(0.0, midpoint - radius);
					ec50Max = midpoint + radius;
					
					/*glue.logInfo("Plus/minus style EC50", {
						ec50: ec50,
						midpoint: midpoint,
						radius: radius,
						ec50Min : ec50Min,
						ec50Max: ec50Max
					});*/
					
				} else if(ec50.indexOf("<") == 0) {
					ec50Max = parseFloat(ec50.substring(1));
				} else if(ec50.indexOf(">") == 0) {
					ec50Min = parseFloat(ec50.substring(1));
				} else if(ec50.indexOf("-") > 0) {
					var bits = ec50.split("-");
					if(bits.length != 2) {
						error(rfObj, "Malformed EC50 log FC: "+rfObj.ec50);
					}
					ec50Min = parseFloat(bits[0]);
					ec50Max = parseFloat(bits[1]);
				} else {
					ec50Min = parseFloat(ec50);
					ec50Max = parseFloat(ec50);
				}
				if(ec50Min != null && isNaN(parseFloat(ec50Min))) {
					error(rfObj, "Malformed minimum EC50 log FC: "+ec50Min);
				}
				if(ec50Max != null && isNaN(parseFloat(ec50Max))) {
					error(rfObj, "Malformed maximum EC50 log FC: "+ec50Max);
				}
				if(ec50Min != null) {
					glue.command(["set", "field", "ec50_min", parseFloat(ec50Min)]);
				}
				if(ec50Max != null) {
					glue.command(["set", "field", "ec50_max", parseFloat(ec50Max)]);
				}
				var ec50Midpoint = null;
				if(ec50Min != null && ec50Max != null) {
					ec50Midpoint = (ec50Min + ec50Max) / 2;
				} else if(ec50Min == null && ec50Max != null) {
					ec50Midpoint = ec50Max / 2;
				} else if(ec50Min != null && ec50Max == null) {
					ec50Midpoint = ec50Min;
				}
				if(categoryFactors.highestEc50Midpoint == null || ec50Midpoint > categoryFactors.highestEc50Midpoint) {
					categoryFactors.highestEc50Midpoint = ec50Midpoint;
				}
				if(ec50Midpoint != null) {
					glue.command(["set", "field", "ec50_midpoint", parseFloat(ec50Midpoint)]);
				}
				if(ec50Midpoint < 5.0) {
					categoryFactors.insignificantInVitro = true;
				} else if(ec50Midpoint < 50.0) {
					categoryFactors.lowInVitro = true;
				} else if(ec50Midpoint >= 50.0) {
					categoryFactors.highInVitro = true;
				}
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
				if(ec50RangeString != null) {
					glue.command(["set", "field", "ec50_range_string", ec50RangeString]);
				}
			});
		}
		if(vitroOrVivo == "invivo" || vitroOrVivo == "both") {
			categoryFactors.anyInVivo = true;
			if(categoryFactors.inVivoBaseline == null) {
				categoryFactors.inVivoBaseline = false;
			}
			if(categoryFactors.inVivoTreatmentEmergent == null) {
				categoryFactors.inVivoTreatmentEmergent = false;
			}
			glue.command(["create", "custom-table-row", "phdr_in_vivo_result", rfId]);
			glue.inMode("custom-table-row/phdr_in_vivo_result/"+rfId, function() {
				glue.command(["set", "link-target", "phdr_resistance_finding", "custom-table-row/phdr_resistance_finding/"+rfId]);
				var baselineRas = rfObj.baselineRas.trim().toLowerCase();
				if(baselineRas == "yes") {
					glue.command(["set", "field", "baseline", "true"]);
					categoryFactors.inVivoBaseline = true;
				} else if(baselineRas == "no") {
					glue.command(["set", "field", "baseline", "false"]);
				} else if(baselineRas == "na") {
					// leave null
				} else {
					error(rfObj, "Unknown value for baselineRas: "+baselineRas);
				}
				
				
				var rxEmergentRas = rfObj.rxEmergentRas.trim().toLowerCase();
				if(rxEmergentRas == "yes") {
					glue.command(["set", "field", "treatment_emergent", "true"]);
					categoryFactors.inVivoTreatmentEmergent = true;
				} else if(rxEmergentRas == "no") {
					glue.command(["set", "field", "treatment_emergent", "false"]);
				} else if(rxEmergentRas == "na") {
					// leave null
				} else {
					error(rfObj, "Unknown value for rxEmergentRas: "+rxEmergentRas);
				}
			});
			// in vivo results may list a single clinical trial, a pooled set of trials or, if
			// terminated with a '*', some other string describing the subject cohort, e.g. "Real world".
			var cohortString = rfObj.clinicalTrialName;
			if(cohortString == null || cohortString.trim() == "" || cohortString.trim() == "NA") {
				error(rfObj, "Resistance finding with in vivo result does not report clinical trials / cohort description");
			}
			cohortString = cohortString.trim();
			if(cohortString.endsWith("*")) {
				glue.inMode("custom-table-row/phdr_in_vivo_result/"+rfId, function() {
					glue.command(["set", "field", "cohort_description", cohortString.substring(0, cohortString.length - 1)]);
				});
			} else {
				var pooledMapList = pooledMap[cohortString];
				if(pooledMapList != null) {
					_.each(pooledMapList, function(trialId) {
						linkResultToTrial(rfId, trialId);
					});
				} else {
					linkResultToTrial(rfId, cohortString);
				}
			}
			var trialRegimenString = rfObj.trialRegimen;
			var trialRegimenBits = trialRegimenString.split(";");
			_.each(trialRegimenBits, function(trialRegimenBit) {
				var regimenId = trialRegimenBit.trim().split("/").join("_").replace(" ", "_");
				linkResultToRegimen(rfId, regimenId);
			});
		}
		idx++;
	});
	_.each(_.pairs(almtRasDrugIdToCategoryFactors), function(pair) {
		var almtRasDrugId = pair[0];
		var categoryFactors = pair[1];

		var resistanceCategory = "insignificant";
		var displayCategory = "-";
		var numericCategory = 4;
		if((categoryFactors.lowInVitro || categoryFactors.highInVitro) && (categoryFactors.inVivoBaseline || categoryFactors.inVivoTreatmentEmergent)) {
			resistanceCategory = "category_I";
			displayCategory = "I";
			numericCategory = 1;
		} else if(categoryFactors.inVivoBaseline && categoryFactors.inVivoTreatmentEmergent) {
			resistanceCategory = "category_I";
			displayCategory = "I";
			numericCategory = 1;
		} else if(categoryFactors.highInVitro || categoryFactors.inVivoBaseline || categoryFactors.inVivoTreatmentEmergent) {
			resistanceCategory = "category_II";
			displayCategory = "II";
			numericCategory = 2;
		} else if(categoryFactors.lowInVitro) {
			resistanceCategory = "category_III";
			displayCategory = "III";
			numericCategory = 3;
		}
		
		glue.inMode("custom-table-row/phdr_alignment_ras_drug/"+almtRasDrugId, function() {
			glue.command(["set", "field", "resistance_category", resistanceCategory]);
			glue.command(["set", "field", "display_resistance_category", displayCategory]);
			glue.command(["set", "field", "numeric_resistance_category", numericCategory]);
			glue.command(["set", "field", "any_in_vitro_evidence", categoryFactors.highestEc50Midpoint != null]);
			if(categoryFactors.highestEc50Midpoint != null) {
				glue.command(["set", "field", "in_vitro_max_ec50_midpoint", categoryFactors.highestEc50Midpoint]); 
			}
			glue.command(["set", "field", "any_in_vivo_evidence", categoryFactors.anyInVivo]);
			if(categoryFactors.inVivoBaseline != null) {
				glue.command(["set", "field", "in_vivo_baseline", categoryFactors.inVivoBaseline]);
			}
			if(categoryFactors.inVivoTreatmentEmergent != null) {
				glue.command(["set", "field", "in_vivo_treatment_emergent", categoryFactors.inVivoTreatmentEmergent]);
			}
		});
	});
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
			//glue.log("FINEST", "typicalAAs for "+almtName+", "+gene+", "+codon, typicalAAs);
			displayStructure += typicalAAs.join("/")+structureBit;
		}
	}
	return displayStructure;
}

function ensureAlmtRasObject(rasId, gene, structure, almtName) {
	var existing = glue.tableToObjects(glue.command(["list", "custom-table-row", "phdr_alignment_ras", "-w", "phdr_ras.gene = '"+
		gene+"' and phdr_ras.structure = '"+structure+"' and alignment.name = '"+almtName+"'"]));
	if(existing.length == 0) {
		var alignmentRasId = gene+":"+structure+":"+almtName;
		var displayStructure = computeDisplayStructure(gene, structure, almtName);
		glue.command(["create", "custom-table-row", "phdr_alignment_ras", alignmentRasId]);
		glue.inMode("custom-table-row/phdr_alignment_ras/"+alignmentRasId, function() {
			glue.command(["set", "link-target", "phdr_ras", "custom-table-row/phdr_ras/"+rasId]);
			glue.command(["set", "link-target", "alignment", "alignment/"+almtName]);
			glue.command(["set", "field", "display_structure", displayStructure]);
		});
	}
}
/*
loadResistanceFindings("EBR", "elbasvir", "NS5A", 
		{"Pooled1": ["C-SURFER", "C-EDGE TN", "C-EDGE CO-INFECTION", "C-EDGE TE", "C-WORTHY", "C-SALVAGE"], 
	 "Pooled2": ["C-SURFER", "C-EDGE CO-INFECTION", "C-EDGE TN", "C-EDGE TE", "C-WORTHY", "C-SALVAGE"], 
	 "Pooled3": ["C‐SCAPE ", "C-EDGE TN", "C-EDGE CO-INFECTION", "C-EDGE CO-STAR", "C‐EDGE IBLD", "C-CORAL", "C-EDGE TE", "C‐EDGE Head‐2‐head"]});
loadResistanceFindings("GLE", "glecaprevir", "NS3", {"Surveyor-1_and_2":["Surveyor-1", "Surveyor-2"], "Pooled analysis": ["Surveyor-1", "Surveyor-2", "Endurance-1", "Endurance-2", "Endurance-3", "Endurance-4", "Expedition-1", "Expedition-2"]});
loadResistanceFindings("PIB", "pibrentasvir", "NS5A", {"Surveyor-1_and_2":["Surveyor-1", "Surveyor-2"], "Pooled": ["Surveyor-1", "Surveyor-2", "Endurance-1", "Endurance-2", "Endurance-3", "Endurance-4", "Expedition-1", "Expedition-2"]});
loadResistanceFindings("VEL", "velpatasvir", "NS5A", {"Pooled analysis": ["ASTRAL-1", "ASTRAL-2", "ASTRAL-3", "ASTRAL-5", "POLARIS-2", "POLARIS-3"]});
loadResistanceFindings("VOX", "voxilaprevir", "NS3", {"Pooled1": ["GS-US-367-1169", "GS-US-367-1871", "GS-US-337-1468", "GS-US-367-1168"], 
	"Pooled2": ["POLARIS-1", "POLARIS-4"], "Pooled3": ["POLARIS-2", "POLARIS-3"]});
loadResistanceFindings("SOF", "sofosbuvir", "NS5B", 
		{"Pooled1": ["ASTRAL-1", "ASTRAL-2", "ASTRAL-3", "ASTRAL-5", "POLARIS-2", "POLARIS-3"], 
		 "Pooled2": ["QUANTUM", "P7977-0221", "PROTON", "ELECTRON", "ATOMIC", "POSITRON", "FUSION", "NEUTRINO", "FISSION"], 
		 // not sure why I have both Pooled3 and Pooled4, it's the same paper.
		 "Pooled3": ["GS-US-337-1119", "GS-US-342-1138"],
		 "Pooled4": ["GS-US-337-1119", "GS-US-342-1138"], 
		 "Pooled5": ["LONESTAR", "ELECTRON", "ION-1", "ION-2", "ION-3"], 
		 "Pooled6": ["GS-US-248-0120", "GS-US-248-0121", "GS-US-196-0123", "GS-US-256-0124", "GS-US-196-0140", "GS-US-256-0148"], 
		 "Pooled7": ["NEUTRINO", "FISSION", "POSITRON", "FUSION", "VALENCE", "PHOTON-1", "PHOTON-2", "P7977-2025", "LONESTAR", "ELECTRON", "ION-1", "ION-2", "ION-3"]});

loadResistanceFindings("DCV", "daclatasvir", "NS5A", {
	"Pooled1": ["NCT01497834", "Hallmark DUAL", "NCT01995266", "NCT01718145", "NCT01051414", "NCT01012895", "UMIN000015627"],
	"Pooled3": ["NCT01257204", "NCT01359644", "NCT02032875", "NCT02032888", "NCT01616524"]});

loadResistanceFindings("LDV", "ledipasvir", "NS5A", {"Pooled1": ["ION-1", "ION-2", "ION-3", "ELECTRON", "LONESTAR"]});
*/
loadResistanceFindings("GZR", "grazoprevir", "NS3", {
	"Pooled1": ["NCT01710501", "NCT01716156"],
	"Pooled2": ["C-SURFER", "C-EDGE TN", "C-EDGE CO-INFECTION", "C-EDGE TE", "C-WORTHY", "C-SALVAGE"],
	"Pooled3": ["C-SCAPE", "C-EDGE TN", "C-EDGE CO-INFECTION", "C-EDGE CO-STAR", "C‐EDGE IBLD", "C-CORAL", "C-EDGE TE", "C‐EDGE Head‐2‐head"]});


