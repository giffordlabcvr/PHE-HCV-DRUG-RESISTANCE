<#setting number_format="####0.###">
<#assign treeVisDoc = transformerInput.treeVisualisation>
<#assign svgWidthPx = treeVisDoc.pxWidth>
<#assign svgHeightPx = treeVisDoc.pxHeight>
<#assign leafTextWidthPx = treeVisDoc.leafTextWidthPx>
<#assign leafTextHeightPx = treeVisDoc.leafTextHeightPx>
<#assign leafTextGapPx = treeVisDoc.leafTextGapPx>
	
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
  <g class="leafText" font-size="${leafTextHeightPx*0.9}">
  <#list treeVisDoc.leafNodes as leafNode>
    <text <#if leafNode.highlighted!false>class="highlightedLeafText"</#if>
	  	x="${leafNode.x+leafTextGapPx}" y="${leafNode.y}" width="${leafTextWidthPx}" height="${leafTextHeightPx}"
	  	dy=".35em">${leafNode.properties.sequenceID}</text>
  </#list>
  </g>
</svg>
