var rfObjs;

function error(rfObj, errorTxt) {
	glue.log("SEVERE", "Resistance finding", rfObj);
	throw new Error(errorTxt);
}

function loadResistanceFindings(shortname, longname, gene) {
	glue.inMode("module/phdrTabularUtility", function() {
		rfObjs = glue.tableToObjects(glue.command(["load-tabular", "tabular/formatted/phdr_resistance_findings_"+shortname+".txt"]));
	});

	var idx = 1;

	_.each(rfObjs, function(rfObj) {
		var rfId = shortname+"_"+idx;
		glue.command(["create", "custom-table-row", "phdr_resistance_finding", rfId]);
		glue.inMode("custom-table-row/phdr_resistance_finding/"+rfId, function() {
			glue.command(["set", "link-target", "phdr_drug", "custom-table-row/phdr_drug/"+longname]);
			var structure = rfObj.substitution.trim();
			glue.command(["set", "link-target", "phdr_ras", "custom-table-row/phdr_ras/"+gene+":"+structure]);
			var genotype = rfObj.virusGenotype.trim();
			glue.command(["set", "link-target", "alignment", "alignment/AL_"+genotype]);
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
		idx++;
	});
}

loadResistanceFindings("GLE", "glecaprevir", "NS3");
loadResistanceFindings("PIB", "pibrentasvir", "NS5A");
loadResistanceFindings("VEL", "velpatasvir", "NS5A");
loadResistanceFindings("VOX", "voxilaprevir", "NS3");
