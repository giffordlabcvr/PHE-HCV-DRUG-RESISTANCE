var rfObjs;

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
		idx++;
	});
}

loadResistanceFindings("GLE", "glecaprevir", "NS3");
loadResistanceFindings("PIB", "pibrentasvir", "NS5A");
loadResistanceFindings("VEL", "velpatasvir", "NS5A");
loadResistanceFindings("VOX", "voxilaprevir", "NS3");
