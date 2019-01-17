
glue.command(["multi-delete", "phdr_alignment_typical_aa", "--allObjects"]);

var typicalAasString = glue.command(["file-util", "load-string", "tabular/formatted/typicalAas.json"]).fileUtilLoadStringResult.loadedString;

var almtNameToFreqs = JSON.parse(typicalAasString);

_.each(_.pairs(almtNameToFreqs), function(pair) {
	var almtName = pair[0];
	var freqObjs = pair[1];
	
	_.each(freqObjs, function(freqObj) {
		if(freqObj.pctMembers > 10.0) {
			var id = almtName+":"+freqObj.feature+":"+freqObj.codon+":"+freqObj.aminoAcid;
			glue.command(["create", "custom-table-row", "phdr_alignment_typical_aa", id]);
			glue.inMode("custom-table-row/phdr_alignment_typical_aa/"+id, function() {
				glue.command(["set", "field", "--noCommit", "codon_label", freqObj.codon]);
				glue.command(["set", "field", "--noCommit", "aa_residue", freqObj.aminoAcid]);
				glue.command(["set", "field", "--noCommit", "num_members", freqObj.numMembers]);
				glue.command(["set", "field", "--noCommit", "pct_members", freqObj.pctMembers]);
				glue.command(["set", "link-target", "--noCommit", "alignment", "alignment/"+almtName]);
				glue.command(["set", "link-target", "--noCommit", "feature", "feature/"+freqObj.feature]);
			});
		}
	});
	
	glue.command(["commit"]);
});
