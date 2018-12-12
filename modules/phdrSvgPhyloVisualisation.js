// simple recursive function to set treevisualiser-collapse to true on subtrees if 
// glueAlignmentName is set and the collapse flag is not already set.
function collapseClades(subtree) {
	var userData;
	if(subtree.internal != null) { // internal node
		userData = subtree.internal.userData;
	} else { // leaf node
		userData = subtree.leaf.userData;
	}
	var alignmentNames = userData.glueAlignmentNames;
	var recurse = true;
	if(alignmentNames != null && alignmentNames.length > 0) {
		var mainAlignmentName = alignmentNames[0];
		var collapsed = userData["treevisualiser-collapsed"];
		if(collapsed == null) {
			var status;
			glue.inMode("alignment/"+mainAlignmentName, function() {
				status = glue.command(["show", "property", "status"]).propertyValueResult.value;
			});
			if(status == null || status != "unassigned") { // don't collapse unassigned subtypes
				userData["treevisualiser-collapsed"] = "true";
				var cladeDisplayName;
				glue.inMode("alignment/"+mainAlignmentName, function() {
					cladeDisplayName = glue.command(["show", "property", "displayName"]).propertyValueResult.value;
				});
				userData["treevisualiser-collapsedLabel"] = cladeDisplayName.replace("HCV ", "").replace(" (provisional)", "");
				recurse = false;
			}
		}
	}
	if(subtree.internal != null && recurse) { // internal node
		var branches = subtree.internal.branch;
		_.each(branches, function(branch) {
			collapseClades(branch);
		});
	}
}

function visualisePhyloAsSvg(document) {
	var glueTree;
	
	var queryName = document.inputDocument.queryName;
	var placementIndex = document.inputDocument.placementIndex;
	var minNeighboursToShow = 15;
	var placerResult = document.inputDocument.placerResult;
	
	// generate a tree for the placement, as a command document.
	glue.inMode("module/maxLikelihoodPlacer", function() {
		glueTree = glue.command({
				"export": {
					"placement-from-document": {
						"phylogeny": {
							"placerResultDocument": placerResult,
							"placementIndex": placementIndex,
							"queryName": queryName, 
							"leafName": queryName
						}
					}
				}
		});
	});

	var neighbourObjs;

	glue.inMode("module/maxLikelihoodPlacer", function() {
		neighbourObjs = glue.tableToObjects(glue.command({
				"list": {
					"neighbour-from-document": {
						"placerResultDocument": placerResult,
						"placementIndex": placementIndex,
						"queryName": queryName, 
						"maxNeighbours": minNeighboursToShow
					}
				}
		}));
	});

	var neighbourLeafNames = [queryName];

	_.each(neighbourObjs, function(neighbourObj) {
		neighbourLeafNames.push("alignment/"+neighbourObj.alignmentName+"/member/"+neighbourObj.sourceName+"/"+neighbourObj.sequenceID);
	});

	glue.inMode("module/hcvPhyloUtility", function() {
		// suppress the collapse of any subtree which is an ancestor of the query leaf or its neighbours
		glueTree = glue.command({
			"update-ancestor-subtrees" : {
				propertyName: "treevisualiser-collapsed",
				propertyValue: "false",
				leafNodeNames : neighbourLeafNames, 
				inputPhyloTree: glueTree
			}
		});
		// set leaf node to highlighted
		glueTree = glue.command({
			"update-leaves" : {
				propertyName: "treevisualiser-highlighted",
				propertyValue: "true",
				leafNodeNames : [queryName], 
				inputPhyloTree: glueTree
			}
		});
		// set leaf node to non-member
		glueTree = glue.command({
			"update-leaves" : {
				propertyName: "treevisualiser-nonmember",
				propertyValue: "true",
				leafNodeNames : [queryName], 
				inputPhyloTree: glueTree
			}
		});
		// set ancestor branches of leaf node to highlighted
		glueTree = glue.command({
			"update-ancestor-branches" : {
				propertyName: "treevisualiser-highlighted",
				propertyValue: "true",
				leafNodeNames : [queryName], 
				inputPhyloTree: glueTree
			}
		});
	});

	collapseClades(glueTree.phyloTree.root);

	
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
					"leafTextAnnotationName": "sequenceIDPlusClade"
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
						treeVisualisation: visualiseTreeResult.treeVisualisation
					}
				},
				"outputFile": document.inputDocument.fileName
			}
		});
	});
	return transformResult
}