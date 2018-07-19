var ctObjs;

glue.inMode("module/phdrTabularUtility", function() {
	ctObjs = glue.tableToObjects(glue.command(["load-tabular", "tabular/formatted/phdr_clinical_trials.txt"]));
});

_.each(ctObjs, function(ctObj) {
	glue.command(["create", "custom-table-row", "phdr_clinical_trial", ctObj.id]);
	glue.inMode("custom-table-row/phdr_clinical_trial/"+ctObj.id, function() {
		glue.command(["set", "field", "display_name", ctObj.display_name]);
		glue.command(["set", "field", "nct_id", ctObj.nct_id]);
	});
});
