var regimenObjs;

glue.inMode("module/phdrTabularUtility", function() {
	regimenObjs = glue.tableToObjects(glue.command(["load-tabular", "tabular/formatted/phdr_regimens.txt"]));
});

_.each(regimenObjs, function(regimenObj) {
	glue.command(["create", "custom-table-row", "phdr_regimen", regimenObj.id]);
	glue.inMode("custom-table-row/phdr_regimen/"+regimenObj.id, function() {
		glue.command(["set", "field", "display_name", regimenObj.displayName]);
	});
});
