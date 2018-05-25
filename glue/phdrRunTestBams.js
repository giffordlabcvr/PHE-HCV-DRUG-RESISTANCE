glue.command(["delete", "module", "-w", "name like 'phdrTestBam%Generator'"]);

for(var i = 1; i <= 10; i++) {
	glue.command(["create", "module", "--fileName", "modules/phdrTestBam"+i+"Generator.xml"]);
	glue.inMode("module/phdrTestBam"+i+"Generator", function() {
		glue.command(["generate-bam", "test/glueSyntheticBams/testBam"+i+".bam"]);
	});
	glue.inMode("module/phdrReportingController", function() {
		glue.command(["invoke-function", "reportBamAsHtml", 
		              "test/glueSyntheticBams/testBam"+i+".bam", "test/glueSyntheticBams/testBam"+i+".html"]);
	
	});
	
	
}