<html>
<h1>Hepatitis C virus sequence report</h1>
<#list sequenceResults as sequenceResult>
<h2>Sequence ${sequenceResult.id}</h2>
<h3>Phylogenetic classification</h3>
<#assign isHcv=true>
<#if sequenceResult.isForwardHcv>
The sequence was identified as hepatitis C virus.
<#elseif sequenceResult.isReverseHcv>
The sequence was identified as hepatitis C virus (reverse complement).
<#else>
<#assign isHcv=false>
The sequence was not identified as hepatitis C virus.
</#if>
<#if isHcv>
<table>
<tr>

<td><b>Genotype</b></td>
<td>${sequenceResult.genotypingResult.genotypeCladeCategoryResult.shortRenderedName}</td>
</tr>
<tr>

<td><b>Subtype</b></td>
<td>${sequenceResult.genotypingResult.subtypeCladeCategoryResult.shortRenderedName}</td>
</tr>

<tr>
<td><b>Closest reference sequence</b></td>
<td>${sequenceResult.genotypingResult.genotypeCladeCategoryResult.closestMemberSequenceID}</td>
</tr>

</table>

<h3>Resistance-associated sequence polymorphisms detected</h3>
<#if sequenceResult.rasScanResults??>
<table>
<#list sequenceResult.rasScanResults as rasScanResult>
<#assign firstRow=true>
<#list rasScanResult.rasDetails.resistanceFinding as resistanceFinding>
<tr>
<#if firstRow>
<td rowspan = "${rasScanResult.rasDetails.resistanceFinding?size}">${rasScanResult.rasDetails.gene}</td>
<td rowspan = "${rasScanResult.rasDetails.resistanceFinding?size}">${rasScanResult.rasDetails.structure}</td>
<#assign firstRow=false>
</#if>
<td>${resistanceFinding.drug}</td>
<td>${resistanceFinding.publication.displayName}</td>
</tr>
</#list>
</#list>
</table>
</#if>

</#if>
</#list>


<#if publications??>
<h2>References</h2>

<#assign pubIdx=1>
<#list publications as publication>
<p>
[${publication.authors_short}, ${publication.year}] 
<b>${publication.title}</b>
${publication.authors_full}, 
${publication.journal}
<#if publication.volume?? && publication.issue??>
	${publication.volume}(${publication.issue}),
</#if>
<#if publication.pages??>
	${publication.pages}
</#if>
(${publication.year})
<br/>
<a href="${publication.url}">${publication.url}</a> 
<#assign pubIdx=pubIdx+1>
</p>
</#list>
</#if>
</html>