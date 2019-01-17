// Creates an alignment columns selector consisting of all AA locations mentioned in the the RAS part of the database.

var phdrRasIds = glue.getTableColumn(glue.command(["list", "custom-table-row", "phdr_ras"]), "id");

// set of AA locations of interest, e.g. { gene: "NS3", aaLoc: 80 } 
var geneLocPairs = [];

_.each(phdrRasIds, function(phdrRasId) {
	var bits = phdrRasId.split(":");
	var gene = bits[0];
	var structure = bits[1];
	var structureBits = structure.split("+");
	var locs = [];
	_.each(structureBits, function(structureBit) {
		if(structureBit.indexOf("del") < 0) {
			locs.push(structureBit.substring(0, structureBit.length - 1))
		}
	});

	_.each(locs, function(loc) {
		geneLocPairs.push({ gene: gene, aaLoc: parseInt(loc, 10)});
	});
});

geneLocPairs = _(geneLocPairs).chain().sortBy(function(geneLocPair) {
    return geneLocPair.aaLoc;
}).sortBy(function(geneLocPair) {
    return geneLocPair.gene;
}).value();

var glpPresenceMap = {};
var geneLocPairsNoDups = [];

_.each(geneLocPairs, function(glp) {
	var key = glp.gene+":"+glp.aaLoc;
	var exists = glpPresenceMap[key];
	if(exists == null) {
		glpPresenceMap[key] = "yes";
		geneLocPairsNoDups.push(glp);
	}
});
geneLocPairs = geneLocPairsNoDups;

glue.command(["delete", "module", "phdrRasPositionColumnsSelector"]);

glue.command(["create", "module", "-t", "alignmentColumnsSelector", "phdrRasPositionColumnsSelector"]);

glue.inMode("/module/phdrRasPositionColumnsSelector", function() {
	glue.command(["set", "property", "relRefName", "REF_MASTER_NC_004102"]);
	_.each(geneLocPairs, function(glp) {
		glue.command(["add", "region-selector", "-f", glp.gene, "--aminoAcid", "-l", glp.aaLoc, glp.aaLoc]); 
	});
});

/*
var locationCladesPairs = _.pairs(locationToClades);

var freqObjs = [];

_.each(locationCladesPairs, function(pair) {
	var key = pair[0];
	var clades = pair[1];
	var bits = key.split(":");
	var gene = bits[0];
	var loc = bits[1];

	
	_.each(clades, function(almtName) {
		var localObjs;

		glue.inMode("alignment/"+almtName, function() {
			localObjs = glue.tableToObjects(glue.command(["amino-acid", "frequency", "-c", 
			              "-w", "sequence.source.name = 'ncbi-curated'",
			              "-r", "REF_MASTER_NC_004102", "-f", gene, "-l",loc, loc]));
		}); 
	
		_.each(localObjs, function(localObj) {
			localObj["almtName"] = almtName;
			localObj["gene"] = gene;
		});
		
		freqObjs.push.apply(freqObjs, localObjs);

	});
	
	
});

glue.command(["file-util", "save-string", JSON.stringify(freqObjs, undefined, 4), "tabular/formatted/typicalAas.json"]);

*/