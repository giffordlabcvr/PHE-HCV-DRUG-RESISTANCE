
// uses the module created by phdrCreateRasPositionColumnsSelector.js to create a JSON file
// storing residue frequencies for RAS-associated AA locations, on a per-clade basis.

var almtNames = glue.getTableColumn(glue.command(["list", "alignment", "-w", "refSequence.name != null"]), "name");
// var almtNames = ["AL_4d"];

var almtNameToFreqs = {};

_.each(almtNames, function(almtName) {
	glue.inMode("/alignment/"+almtName, function() {
		var freqObjs = glue.tableToObjects(glue.command(["amino-acid", "frequency", 
			"--whereClause", "sequence.source.name = 'ncbi-curated'", 
			"--almtColsSelector", "phdrRasPositionColumnsSelector"]));
		almtNameToFreqs[almtName] = freqObjs;
	});
});

glue.command(["file-util", "save-string", JSON.stringify(almtNameToFreqs, null, 2), "tabular/formatted/typicalAas.json"]);