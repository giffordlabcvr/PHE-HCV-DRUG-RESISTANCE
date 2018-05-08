<html>
<h1>Hepatitis C virus sequence report</h1>
<#list sequenceResults as sequenceResult>
<h2>Sequence ${sequenceResult.id}</h2>
<h3>Classification</h3>
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
<td>Genotype</td>
<td>${sequenceResult.genotypingResult.genotypeCladeCategoryResult.shortRenderedName}</td>
</tr>
<tr>
<td>Subtype</td>
<td>${sequenceResult.genotypingResult.subtypeCladeCategoryResult.shortRenderedName}</td>
</tr>
</table>
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