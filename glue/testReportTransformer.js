
var jsonReport = JSON.parse(glue.command(["file-util", "load-string", "fasta1.json"]).fileUtilLoadStringResult.loadedString);

glue.inMode("module/phdrRasReportTransformer", function() {
	glue.command({"transform-to-file" : {
		commandDocument: jsonReport,
		outputFile: "fasta1Report.html"
	}});
});

