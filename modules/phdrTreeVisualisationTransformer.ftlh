<#setting number_format="####0.###">
<#assign treeVisDoc = transformerInput.treeVisualisation>
<#assign svgWidthPx = treeVisDoc.pxWidth>
<#assign svgHeightPx = treeVisDoc.pxHeight>
<#assign verticalLeafSpacePx = treeVisDoc.verticalLeafSpacePx>
<#assign leafTextGapPx = treeVisDoc.leafTextGapPx>
<#assign leafTextHeightPx = treeVisDoc.leafTextHeightPx>
	
<#assign leafNodeRadiusPx = 2>
	
<svg width="${svgWidthPx}" height="${svgHeightPx}"
     xmlns="http://www.w3.org/2000/svg">
  <style>${getResourceAsString('phdrTreeVisualisationTransformer.css')?no_esc}</style>
  <g class="branch">
  <polyline points="${treeVisDoc.root.x1} ${treeVisDoc.root.y1}, ${treeVisDoc.root.x2} ${treeVisDoc.root.y2}"/>
  <#list treeVisDoc.branches as branch>
    <polyline <#if branch.highlighted!false>class="highlightedBranch"</#if>
		points="${branch.parentX} ${branch.parentY}, ${branch.cornerX} ${branch.cornerY}, ${branch.childX} ${branch.childY}"/>
  </#list>
  </g>
  <g class="leafNode">
  <#list treeVisDoc.leafNodes as leafNode>
    <circle <#if leafNode.highlighted!false>class="highlightedLeafNode"</#if>
    	cx="${leafNode.x}" cy="${leafNode.y}" r="${leafNodeRadiusPx}"/>
  </#list>
  </g>
  <g class="leafText" font-size="${leafTextHeightPx}">
  <#list treeVisDoc.leafNodes as leafNode>
    <text <#if leafNode.highlighted!false>class="highlightedLeafText"</#if>
	  	x="${leafNode.x+leafTextGapPx}" y="${leafNode.y}" width="${leafNode.properties.leafTextWidthPx}" height="${verticalLeafSpacePx}"
	  	dy=".35em">${leafNode.properties.leafText}</text>
  </#list>
  </g>
  <#if treeVisDoc.collapsedSubtrees??>
  <g class="collapsedSubtree">
  <#list treeVisDoc.collapsedSubtrees as collapsedSubtree>
    <path
		d="M ${collapsedSubtree.rootX} ${collapsedSubtree.rootY} L ${collapsedSubtree.leafX} ${collapsedSubtree.upperLeafY} L ${collapsedSubtree.leafX} ${collapsedSubtree.lowerLeafY} Z"/>
  </#list>
  </g>
  <g class="collapsedSubtreeText" font-size="${leafTextHeightPx}">
  <#list treeVisDoc.collapsedSubtrees as collapsedSubtree>
    <text
	  	x="${collapsedSubtree.leafX+leafTextGapPx}" y="${collapsedSubtree.rootY}" width="${collapsedSubtree.properties.collapsedTextWidthPx}" height="${verticalLeafSpacePx}"
	  	dy=".35em">${collapsedSubtree.properties.collapsedText}</text>
  </#list>
  </g>
  </#if>



</svg>
