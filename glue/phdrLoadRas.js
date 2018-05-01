var rasObjs;

glue.inMode("module/phdrTabularUtility", function() {
	rasObjs = glue.tableToObjects(glue.command(["load-tabular", "tabular/formatted/phdr_ras.txt"]));
});

var varObjs = {};

_.each(rasObjs, function(rasObj) {
	if(rasObj.structure.indexOf("+") > 0) {
		var rasId = rasObj.gene+":"+rasObj.structure;
		var bits = rasObj.structure.split("+");
		for(var i = 0; i < bits.length; i++) {
			var variationId = "phdr_ras:"+rasObj.gene+":"+bits[i];
			var gene = rasObj.gene;
			var structure = bits[i];
			varObjs[variationId] = {
					gene: gene,
					structure: structure
			};
		}
	} else {
		var variationId = "phdr_ras:"+rasObj.gene+":"+rasObj.structure;
		var gene = rasObj.gene;
		var structure = rasObj.structure;
		varObjs[variationId] = {
				gene: gene,
				structure: structure
		};
	}
});

// create all the basic (non conjunct) variations
_.each(_.pairs(varObjs), function(pair) {
	var variationId = pair[0];
	var varObj = pair[1];
	glue.inMode("reference/REF_MASTER_NC_004102/feature-location/"+varObj.gene, function() {
		if(varObj.structure.indexOf("del") > 0) {
			// deletion
			var deletedCodon = varObj.structure.replace("del", "");
			glue.command(["create", "variation", variationId, "--vtype", "aminoAcidDeletion", "--labeledCodon", deletedCodon, deletedCodon]);
		} else {
			var mutatedCodon = varObj.structure.substring(0, varObj.structure.length-1);
			var residue = varObj.structure.substring(varObj.structure.length-1, varObj.structure.length);
			glue.command(["create", "variation", variationId, "--vtype", "aminoAcidSimplePolymorphism", "--labeledCodon", mutatedCodon, mutatedCodon]);
			// polymorphism
			glue.inMode("variation/"+variationId, function() {
				glue.command(["set", "metatag", "SIMPLE_AA_PATTERN", residue]);
			});
		}
	});
});

// create conjunct variations, custom RAS rows and associations
_.each(rasObjs, function(rasObj) {
	var rasId = rasObj.gene+":"+rasObj.structure;
	var variationId = "phdr_ras:"+rasId;
	glue.command(["create", "custom-table-row", "phdr_ras", rasId]);
	glue.inMode("reference/REF_MASTER_NC_004102/feature-location/"+rasObj.gene, function() {
		if(rasObj.structure.indexOf("+") > 0) {
			// conjunction
			glue.command(["create", "variation", variationId, "--vtype", "conjunction"]);
			glue.inMode("variation/"+variationId, function() {
				var bits = rasObj.structure.split("+");
				for(var i = 0; i < bits.length; i++) {
					glue.command(["set", "metatag", "CONJUNCT_NAME_"+(i+1), "phdr_ras:"+rasObj.gene+":"+bits[i]]);
				}
			});
		} 
		glue.inMode("variation/"+variationId, function() {
			glue.command(["set", "link-target", "phdr_ras", "custom-table-row/phdr_ras/"+rasId]);
		});		
	});
});

