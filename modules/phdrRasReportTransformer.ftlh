<html>
<h1>Hepatitis C virus sequence report</h1>


<h3>References</h3>

<#assign pubIdx=1>
<#list publications as publication>
<p>
[${pubIdx}] ${publication.authors_full}: ${publication.title} 
<em>${publication.journal}</em> 
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

</html>