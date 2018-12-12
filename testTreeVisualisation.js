
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
		var collapsed = userData["treevisualiser-collapsed"];
		if(collapsed == null) {
			userData["treevisualiser-collapsed"] = "true";
			var cladeDisplayName;
			glue.inMode("alignment/"+alignmentNames[0], function() {
				cladeDisplayName = glue.command(["show", "property", "displayName"]).propertyValueResult.value;
			});
			userData["treevisualiser-collapsedLabel"] = cladeDisplayName.replace("HCV ", "");
			recurse = false;
		}
	}
	if(subtree.internal != null && recurse) { // internal node
		var branches = subtree.internal.branch;
		_.each(branches, function(branch) {
			collapseClades(branch);
		});
	}
}

var placementFile = "fasta1DetailedPlacement.json";
var placementFileString = glue.command(["file-util", "load-string", placementFile]).fileUtilLoadStringResult.loadedString;

var placerResult = JSON.parse(placementFileString);

var glueTree;
var queryName = "query1";
var placementIndex = 1;
var minNeighboursToShow = 15;


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

glue.command(["file-util", "save-string", JSON.stringify(glueTree, null, 2), "glueTree.json"]);

var visualisationDocument;
glue.inMode("module/phdrTreeVisualiser", function() {
	
	visualisationDocument = glue.command({
		"visualise" : {
			"tree-document": {
				"treeDocument" : glueTree, 
				"pxWidth" : 1200, 
				"pxHeight" : 1200, 
				"leafTextAnnotationName": "cladeDisplayName"
			}
		}
	});
});

glue.command(["file-util", "save-string", JSON.stringify(visualisationDocument, null, 2), "glueVisDoc.json"]);

glue.inMode("module/phdrTreeVisualisationTransformer", function() {
	glue.command({"transform-to-file": {
			"commandDocument":{
				transformerInput: {
					treeVisualisation: visualisationDocument.treeVisualisation
				}
			},
			"outputFile": "glueTree.svg"
		}
	});
});