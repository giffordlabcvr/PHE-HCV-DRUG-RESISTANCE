var drugObjs;

glue.inMode("module/phdrTabularUtility", function() {
	drugObjs = glue.tableToObjects(glue.command(["load-tabular", "tabular/formatted/phdr_drug.txt"]));
});

_.each(drugObjs, function(drugObj) {
	glue.command(["create", "custom-table-row", "phdr_drug", drugObj.id]);
	glue.inMode("custom-table-row/phdr_drug/"+drugObj.id, function() {
		glue.command(["set", "field", "abbreviation", drugObj.abbreviation]);
	});
});
