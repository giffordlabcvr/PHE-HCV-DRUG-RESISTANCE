glue.command(["multi-delete", "phdr_publication", "-a"]);

var pubObjs;

glue.inMode("module/phdrTabularUtility", function() {
	pubObjs = glue.tableToObjects(glue.command(["load-tabular", "tabular/formatted/phdr_publications.txt"]));
});

_.each(pubObjs, function(pubObj) {
	glue.command(["create", "custom-table-row", "phdr_publication", pubObj.id]);
	glue.inMode("custom-table-row/phdr_publication/"+pubObj.id, function() {
		glue.command(["set", "field", "title", pubObj.title]);
		glue.command(["set", "field", "authors_short", pubObj.authors_short]);
		glue.command(["set", "field", "authors_full", pubObj.authors_full]);
		glue.command(["set", "field", "year", pubObj.year]);
		glue.command(["set", "field", "journal", pubObj.journal]);
		if(pubObj.volume != null) {
			glue.command(["set", "field", "volume", pubObj.volume]);
		}
		if(pubObj.issue != null) {
			glue.command(["set", "field", "issue", pubObj.issue]);
		}
		if(pubObj.pages != null) {
			glue.command(["set", "field", "pages", pubObj.pages]);
		}
		if(pubObj.doi != null) {
			glue.command(["set", "field", "url", pubObj.doi]);
		} else {
			glue.command(["set", "field", "url", pubObj.url]);
		}
	});
});
