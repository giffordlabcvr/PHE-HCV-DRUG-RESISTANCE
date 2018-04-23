var drugObjs;
var rasObjs;

glue.inMode("module/phdrTabularUtility", function() {
	drugObjs = glue.tableToObjects(glue.command(["load-tabular", "tabular/formatted/phdr_drug.txt"]));
	rasObjs = glue.tableToObjects(glue.command(["load-tabular", "tabular/formatted/phdr_ras.txt"]));
});

_.each(drugObjs, function(drugObj) {
	glue.command(["create", "custom-table-row", "phdr_drug", drugObj.id]);
});

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
				for(var i = 1; i <= bits.length; i++) {
					glue.command(["set", "metatag", "CONJUNCT_NAME_"+i, "phdr_ras:"+rasObj.gene+":"+bits[i]]);
				}
			});
		} else if(rasObj.structure.indexOf("del") > 0) {
			// deletion
			var deletedCodon = rasObj.structure.replace("del", "");
			glue.command(["create", "variation", variationId, "--vtype", "aminoAcidDeletion", "--labeledCodon", deletedCodon, deletedCodon]);
		} else {
			var mutatedCodon = rasObj.structure.substring(0, rasObj.structure.length-1);
			var residue = rasObj.structure.substring(rasObj.structure.length-1, rasObj.structure.length);
			glue.command(["create", "variation", variationId, "--vtype", "aminoAcidSimplePolymorphism", "--labeledCodon", mutatedCodon, mutatedCodon]);
			// polymorphism
			glue.inMode("variation/"+variationId, function() {
				glue.command(["set", "metatag", "SIMPLE_AA_PATTERN", residue]);
			});
		}
		glue.inMode("variation/"+variationId, function() {
			glue.command(["set", "link-target", "phdr_ras", "custom-table-row/phdr_ras/"+rasId]);
		});		
	});
});

