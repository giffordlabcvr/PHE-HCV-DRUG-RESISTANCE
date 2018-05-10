var inputs = ["fasta1", "fasta2", "fasta3", "fasta4"];

glue.inMode("module/phdrReportingController", function() {
	glue.command("load configuration modules/phdrReportingController.xml --loadResources");
});


_.each(inputs, function(input) {
	var result;
	glue.inMode("module/phdrReportingController", function() {
		result = glue.command(["invoke-function", "reportFasta", "test/inputs/"+input+".fasta"]);	
	});
	glue.command(["file-util", "save-string", JSON.stringify(result, null, 2), "test/analysis/"+input+"Analysis.json"]);
});