

var phdrRfIds = glue.getTableColumn(glue.command(["list", "custom-table-row", "phdr_resistance_finding"]), "id");

var locationToClades = {};

_.each(phdrRfIds, function(phdrRfId) {
	glue.inMode("custom-table-row/phdr_resistance_finding/"+phdrRfId, function() {
		var phdrRasId = glue.command(["show", "property", "phdr_ras.id"]).propertyValueResult.value;

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

		var almtName = glue.command(["show", "property", "alignment.name"]).propertyValueResult.value;

		_.each(locs, function(loc) {
			var locString = gene+":"+loc;
			var clades = locationToClades[locString];
			if(clades == null) {
				clades = [];
				locationToClades[locString] = clades;
			}
			if(clades.indexOf(almtName) < 0) {
				clades.push(almtName);
			}
		});
	});
	
});

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

