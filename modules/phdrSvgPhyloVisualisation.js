function visualisePhyloAsSvg(document) {
	var glueTree;
	
	// generate a tree for the placement, as a command document.
	glue.inMode("module/maxLikelihoodPlacer", function() {
		glueTree = glue.command({
				"export": {
					"placement-from-document": {
						"phylogeny": {
							"placerResultDocument": document.inputDocument.placerResult,
							"placementIndex": document.inputDocument.placementIndex,
							"queryName": document.inputDocument.queryName, 
							"leafName": document.inputDocument.queryName,
							"placementLeafProperty": ["treevisualiser-nonmember:true", "treevisualiser-highlighted:true"],
							"placementBranchProperty": ["treevisualiser-highlighted:true"]
						}
					}
				}
		});
	});

	// generate a visualisation document for the tree, 
	// with the visualisation maths etc. done
	var visualiseTreeResult;

	glue.inMode("module/phdrTreeVisualiser", function() {
		visualiseTreeResult = glue.command({
			"visualise" : {
				"tree-document": {
					"treeDocument" : glueTree, 
					"pxWidth" : document.inputDocument.pxWidth, 
					"pxHeight" : document.inputDocument.pxHeight,
					"leafTextAnnotationName": "sequenceID"
				}
			}
		});
	});

	// from the visualisation document, generate an SVG as a GLUE web file.
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
				"outputFile": document.inputDocument.fileName
			}
		});
	});
	return transformResult
}