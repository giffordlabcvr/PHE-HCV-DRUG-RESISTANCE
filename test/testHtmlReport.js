var inputs = ["fasta1", "fasta2", "fasta3", "fasta4"];

glue.inMode("module/phdrRasReportTransformer", function() {
	glue.command("load configuration modules/phdrRasReportTransformer.xml --loadResources");
});

_.each(inputs, function(input) {
	var analysisString = glue.command(["file-util", "load-string", "test/analysis/"+input+"Analysis.json"]).
		fileUtilLoadStringResult.loadedString;
	var analysis = JSON.parse(analysisString);
	glue.inMode("module/phdrRasReportTransformer", function() {
		glue.command({"transform-to-file" : {
			commandDocument: analysis,
			outputFile: "test/html/"+input+"Report.html"
		}});
	});

});
