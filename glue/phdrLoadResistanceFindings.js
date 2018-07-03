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

function loadResistanceFindings(shortname, longname, gene, pooledMap) {
	glue.inMode("module/phdrTabularUtility", function() {
		rfObjs = glue.tableToObjects(glue.command(["load-tabular", "tabular/formatted/phdr_resistance_findings_"+shortname+".txt"]));
	});

	var idx = 1;

	_.each(rfObjs, function(rfObj) {
		var rfId = shortname+"_"+idx;
		glue.command(["create", "custom-table-row", "phdr_resistance_finding", rfId]);
		var structure = rfObj.substitution.trim();
		var genotype = rfObj.virusGenotype.trim();
		var almtName = "AL_"+genotype;
		glue.inMode("custom-table-row/phdr_resistance_finding/"+rfId, function() {
			glue.command(["set", "link-target", "phdr_drug", "custom-table-row/phdr_drug/"+longname]);
			glue.command(["set", "link-target", "phdr_ras", "custom-table-row/phdr_ras/"+gene+":"+structure]);
			glue.command(["set", "link-target", "alignment", "alignment/"+almtName]);
			var pub_id = rfObj.pubmed.trim();
			glue.command(["set", "link-target", "phdr_publication", "custom-table-row/phdr_publication/"+pub_id]);
		});
		var displayRasId = gene+":"+structure+":"+almtName;
		glue.command(["create", "custom-table-row", "--allowExisting", "phdr_display_ras", displayRasId]);
		glue.inMode("custom-table-row/phdr_display_ras/"+displayRasId, function() {
			glue.command(["set", "link-target", "phdr_ras", "custom-table-row/phdr_ras/"+gene+":"+structure]);
			glue.command(["set", "link-target", "alignment", "alignment/"+almtName]);
			glue.command(["set", "field", "display_structure", computeDisplayStructure(gene, structure, almtName)]);
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
			});
		}
		if(vitroOrVivo == "invivo" || vitroOrVivo == "both") {
			glue.command(["create", "custom-table-row", "phdr_in_vivo_result", rfId]);
			glue.inMode("custom-table-row/phdr_in_vivo_result/"+rfId, function() {
				glue.command(["set", "link-target", "phdr_resistance_finding", "custom-table-row/phdr_resistance_finding/"+rfId]);
				var baselineRas = rfObj.baselineRas.trim();
				if(baselineRas == "Yes") {
					glue.command(["set", "field", "baseline", "true"]);
				} else if(baselineRas == "No") {
					glue.command(["set", "field", "baseline", "false"]);
				} else if(baselineRas == "NA") {
					// leave null
				} else {
					error(rfObj, "Unknown value for baselineRas: "+baselineRas);
				}
				var rxEmergentRas = rfObj.rxEmergentRas.trim();
				if(rxEmergentRas == "Yes") {
					glue.command(["set", "field", "treatment_emergent", "true"]);
				} else if(rxEmergentRas == "No") {
					glue.command(["set", "field", "treatment_emergent", "false"]);
				} else if(rxEmergentRas == "NA") {
					// leave null
				} else {
					error(rfObj, "Unknown value for rxEmergentRas: "+rxEmergentRas);
				}
			});
			var trialNameString = rfObj.clinicalTrialName;
			if(trialNameString.trim() == "" || trialNameString == null || trialNameString.trim() == "NA") {
				error(rfObj, "Resistance finding with in vivo result does not report clinical trial name");
			}
			var pooledMapList = pooledMap[trialNameString.trim()];
			if(pooledMapList != null) {
				_.each(pooledMapList, function(trialId) {
					linkResultToTrial(rfId, trialId);
				});
			} else {
				linkResultToTrial(rfId, trialNameString.trim());
			}
		}
		idx++;
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
			var key = gene+":"+codon+":"+almtName;
			var freqObjs = locStringToFreqObjs[key];
			var typicalAAs = [];
			_.each(freqObjs, function(freqObj) {
				if(freqObj.pctMembers > 10.0) {
					typicalAAs.push(freqObj.aminoAcid);
				}
			});
			displayStructure += typicalAAs.join("/")+structureBit;
		}
	}
	return displayStructure;
}

var locStringToFreqObjs = {};

function loadTypicalAas() {
	var freqObjs = JSON.parse(glue.command(["file-util", "load-string", "tabular/formatted/typicalAas.json"]).fileUtilLoadStringResult.loadedString);
	_.each(freqObjs, function(freqObj) {
		var key = freqObj.gene+":"+freqObj.codon+":"+freqObj.almtName;
		var currentObjs = locStringToFreqObjs[key];
		if(currentObjs == null) {
			currentObjs = [];
			locStringToFreqObjs[key] = currentObjs;
		}
		currentObjs.push(freqObj);
	});
}


loadTypicalAas();

loadResistanceFindings("GLE", "glecaprevir", "NS3", {"Surveyor-1_and_2":["Surveyor-1", "Surveyor-2"], "Pooled analysis": ["Surveyor-1", "Surveyor-2", "Endurance-1", "Endurance-2", "Endurance-3", "Endurance-4", "Expedition-1", "Expedition-2"]});
loadResistanceFindings("PIB", "pibrentasvir", "NS5A", {"Surveyor-1_and_2":["Surveyor-1", "Surveyor-2"], "Pooled": ["Surveyor-1", "Surveyor-2", "Endurance-1", "Endurance-2", "Endurance-3", "Endurance-4", "Expedition-1", "Expedition-2"]});
loadResistanceFindings("VEL", "velpatasvir", "NS5A", {"Pooled analysis": ["ASTRAL-1", "ASTRAL-2", "ASTRAL-3", "ASTRAL-5", "POLARIS-2", "POLARIS-3"]});
loadResistanceFindings("VOX", "voxilaprevir", "NS3", {"Pooled1": ["GS-US-367-1169", "GS-US-367-1871", "GS-US-337-1468", "GS-US-367-1168"], 
	"Pooled2": ["POLARIS-1", "POLARIS-4"], "Pooled3": ["POLARIS-2", "POLARIS-3"]});
