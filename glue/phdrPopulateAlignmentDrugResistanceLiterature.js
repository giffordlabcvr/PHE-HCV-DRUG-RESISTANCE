glue.command(["multi-delete", "phdr_alignment_drug", "-a"]);

// method 1
// All genotypes have good resistance literature for all drugs.
// All subtypes have poor resistance literature for all drugs unless they are one of a list of common subtypes.

var almtObjs = glue.tableToObjects(glue.command(["list", "alignment", "-w", "parent.name = 'AL_MASTER' or parent.parent+.name = 'AL_MASTER'"]));

var drugIds = glue.getTableColumn(glue.command(["list", "custom-table-row", "phdr_drug"]), "id");

var commonSubtypes = ["AL_1a", "AL_1b", "AL_2a", "AL_2b", "AL_2c", "AL_3a", "AL_3b", "AL_4a", "AL_4d", "AL_6a"];

_.each(almtObjs, function(almtObj) {
	var almtName = almtObj.name;
	var almtParentName = almtObj["parent.name"];
	
	var resistanceLiterature = "poor";
	
	if(almtParentName == "AL_MASTER" || commonSubtypes.indexOf(almtName) >= 0) {
		resistanceLiterature = "good";
	} 
	
	_.each(drugIds, function(drugId) {
		almtDrugId = almtName+":"+drugId;
		glue.command(["create", "custom-table-row", "phdr_alignment_drug", almtDrugId]);
		glue.inMode("/custom-table-row/phdr_alignment_drug/"+almtDrugId, function() {
			glue.command(["set", "link-target", "alignment", "alignment/"+almtName]);
			glue.command(["set", "link-target", "phdr_drug", "custom-table-row/phdr_drug/"+drugId]);
			glue.command(["set", "field", "resistance_literature", resistanceLiterature]);
		});
	});
});

/*
// method 2

// this alternative script is another way to populate which drugs / subtypes have good evidence.
// it's based on a simple scan of the resistance findings. 
// however this should really be done using a curated table: this placeholder method
// misclassifies drug / subtype combinations where there is genuinely no 
// resistance as poorly characterised

glue.command(["multi-delete", "phdr_alignment_drug", "-a"]);

// number of required in vitro findings for "good" resistance literature.
var numRequiredInVitro = 1;

//number of required in vivo findings for "good" resistance literature.
var numRequiredInVivo = 1;

//number of required publications for "good" resistance literature.
var numRequiredPublications = 2;

var almtObjs = glue.tableToObjects(glue.command(["list", "alignment", "-w", "parent.name = 'AL_MASTER' or parent.parent+.name = 'AL_MASTER'"]));

var drugIds = glue.getTableColumn(glue.command(["list", "custom-table-row", "phdr_drug"]), "id");

_.each(almtObjs, function(almtObj) {
	var almtName = almtObj.name;
	var almtParentName = almtObj["parent.name"];
	_.each(drugIds, function(drugId) {
		almtDrugId = almtName+":"+drugId;
		
		var findingObjs = glue.tableToObjects(glue.command(["list", "custom-table-row", "phdr_resistance_finding", 
			"-w", "phdr_alignment_ras_drug.phdr_drug.id = '"+drugId+"' and "+
			"( phdr_alignment_ras_drug.phdr_alignment_ras.alignment.name = '"+almtName+"' or "+
			"phdr_alignment_ras_drug.phdr_alignment_ras.alignment.parent.name = '"+almtName+"')", // for genotypes, capture subtype findings
			"id", "phdr_publication.id", "phdr_in_vitro_result.id", "phdr_in_vivo_result.id"]));
		
		var resistanceLiterature = "none";
		
		if(findingObjs.length > 0) {
			resistanceLiterature = "poor";
		}
		
		var inVitro = 0;
		var inVivo = 0;
		var publicationSet = {};
		
		_.each(findingObjs, function(findingObj) {
			if(findingObj["phdr_in_vitro_result.id"] != null) {
				inVitro++;
			}
			if(findingObj["phdr_in_vivo_result.id"] != null) {
				inVivo++;
			}
			publicationSet[findingObj["phdr_publication.id"]] = "yes";
		});
		if(inVitro >= numRequiredInVitro && inVivo >= numRequiredInVivo && _.pairs(publicationSet).length >= numRequiredPublications) {
			resistanceLiterature = "good";
		}
		
		glue.command(["create", "custom-table-row", "phdr_alignment_drug", almtDrugId]);
		glue.inMode("/custom-table-row/phdr_alignment_drug/"+almtDrugId, function() {
			glue.command(["set", "link-target", "alignment", "alignment/"+almtName]);
			glue.command(["set", "link-target", "phdr_drug", "custom-table-row/phdr_drug/"+drugId]);
			glue.command(["set", "field", "resistance_literature", resistanceLiterature]);
		});
	});
});


*/