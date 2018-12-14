// simple recursive function to set treevisualiser-collapse to true on subtrees if 
// glueAlignmentName is set and the collapse flag is not already set.
function collapseClades(subtree, foundAnyAlignment) {
	var userData;
	var subtreeType;
	if(subtree.internal != null) { // internal node
		userData = subtree.internal.userData;
		subtreeType = "internal";
	} else { // leaf node
		userData = subtree.leaf.userData;
		subtreeType = "leaf";
	}
	var alignmentNames = userData.glueAlignmentNames;
	var recurse = true;
	var nextFoundAnyAlignment = foundAnyAlignment;
	var collapsed = userData["treevisualiser-collapsed"];
	if(collapsed == null) { // collapsed not already set to false
		var collapsedLabel = "";
		var almtStatus = null;
		if(alignmentNames != null && alignmentNames.length > 0) {
			var mainAlignmentName = alignmentNames[0];
			glue.inMode("alignment/"+mainAlignmentName, function() {
				collapsedLabel = glue.command(["show", "property", "displayName"]).propertyValueResult.value;
				collapsedLabel = collapsedLabel.replace("HCV ", "").replace(" (provisional)", "");
				almtStatus = glue.command(["show", "property", "status"]).propertyValueResult.value;
			});
			if(almtStatus != "unassigned") { nextFoundAnyAlignment = true; }
		}
		// don't collapse unassigned subtype leaf nodes
		// don't collapse anything before you have found an alignment.
		if(nextFoundAnyAlignment && (almtStatus == null || almtStatus != "unassigned" || subtreeType == "internal")) { 
			userData["treevisualiser-collapsed"] = "true";
			userData["treevisualiser-collapsedLabel"] = collapsedLabel;
			recurse = false;
		}
	}
	if(subtreeType == "internal" && recurse) { // internal node
		var branches = subtree.internal.branch;
		_.each(branches, function(branch) {
			collapseClades(branch, nextFoundAnyAlignment);
		});
	}
}

function visualisePhyloAsSvg(document) {
	var glueTree;
	
	var queryName = document.inputDocument.queryName;
	var placementIndex = document.inputDocument.placementIndex;
	var maxNeighbours = null;
	var maxDistance = document.inputDocument.maxDistance;
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
						"maxNeighbours": maxNeighbours, 
						"maxDistance": maxDistance
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

	collapseClades(glueTree.phyloTree.root, false);

	
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