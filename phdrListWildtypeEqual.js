

var almtRasObjs = glue.tableToObjects(glue.command(["list", "custom-table-row", "phdr_alignment_ras", 
		"display_structure", "phdr_ras.gene", "phdr_ras.structure", "alignment.displayName"]));

var wildtypeRasObjs = [];

_.each(almtRasObjs, function(almtRasObj) {
	var wildtypeRas = false;
	var mixedWildtypeRas = false;
	var structure = almtRasObj.display_structure;
	var structureBits = structure.split("+");
	_.each(structureBits, function(structureBit) {
		if(structureBit.indexOf("del") < 0) {
			var wildtypeAndMutationBits = structureBit.split(/[0-9]+/);
			var wildtypeBit = wildtypeAndMutationBits[0];
			var mutationBit = wildtypeAndMutationBits[1];
			var wildtypeAas = wildtypeBit.split("/");
			var mutationAas = mutationBit.split("/");
			var intersection = _.intersection(wildtypeAas, mutationAas);
			if(intersection.length > 0) {
				if(wildtypeAas.length > 1) {
					mixedWildtypeRas = true;
				} else {
					wildtypeRas = true;
				}
			}
		}
	});
	if(wildtypeRas || mixedWildtypeRas) {
		wildtypeRasObjs.push({
			clade: almtRasObj["alignment.displayName"].replace("HCV ", ""),
			virusProtein: almtRasObj["phdr_ras.gene"],
			polymorphism: almtRasObj["display_structure"],
			combination: structureBits.length > 1 ? "Yes" : "No",
			mixedWildtype: mixedWildtypeRas ? "Yes" : "No",
			hcvGlueLink: "=HYPERLINK(\"http://hcv-glue.cvr.gla.ac.uk/#/project/rap/"+almtRasObj["phdr_ras.gene"]+":"+almtRasObj["phdr_ras.structure"]+"\")",
		});
	}
});

var documentResult = {
	"documentResult":{
        "column":_.keys(wildtypeRasObjs[0]),
        "row":_.map(wildtypeRasObjs, function(obj) {
        	return {
                "value":_.values(obj)
            };
        })
    }
};
glue.inMode("module/phdrTabularUtility", function() {
	glue.command({"save-tabular": {
		"tabularData": documentResult, 
		"fileName": "wildtypeRasList.txt"
	}});
});
