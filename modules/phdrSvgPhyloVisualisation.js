function visualisePhyloAsSvg(document) {
	var visualiseTreeResult;
	var outputFile = document.inputDocument.fileName;
	delete document.inputDocument["fileName"];

	/*
	 	document.inputDocument is:
	 			{
					"treeDocument" : glueTree, 
					"pxWidth" : 1200, 
					"pxHeight" : 5000
				}

	 */
	glue.inMode("module/phdrTreeVisualiser", function() {
		visualiseTreeResult = glue.command({
			"visualise" : {
				"tree-document": document.inputDocument
			}
		});
	});
	
	var transformResult;
	glue.inMode("module/phdrTreeVisualisationTransformer", function() {
		transformResult = glue.command({ "transform-to-web-file": 
			{
				"webFileType": "WEB_PAGE",
				"commandDocument":{
					transformerInput: {
						treeVisualisation: visualiseTreeResult.treeVisualisation,
						ntWidth: 16
					}
				},
				"outputFile": outputFile
			}
		});
	});
	return transformResult
}