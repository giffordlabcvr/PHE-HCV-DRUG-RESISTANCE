<html>
<head>
<style>
${getResourceAsString('phdrRasReport.css')?no_esc}
</style>
</head>
<body>

<div id="title">
<img height="150px" alt="PHE logo" src="data:image/svg+xml;base64,${getResourceAsBase64('pheLogo.svg')}" />
<img height="150px" alt="CVR logo" src="data:image/svg+xml;base64,${getResourceAsBase64('cvrLogo.svg')}" />
</div>
<h1>Hepatitis C virus sequence report</h1>

<table id="overview">
<tr><td><b>Sequence ID</b></td><td>${phdrReport.sequenceResult.id}</td></tr>
<tr><td><b>File path</b></td><td>${phdrReport.filePath}</td></tr>
<tr><td><b>Sequance data format</b></td><td>
<#if phdrReport.sequenceDataFormat = "FASTA"> 
Consensus (FASTA)
<#elseif phdrReport.sequenceDataFormat = "SAM/BAM">
Deep sequencing (SAM/BAM)
</#if>
</td></tr>
<tr><td><b>Report generation date</b></td><td>${phdrReport.reportGenerationDate}</td></tr>
<tr><td><b>GLUE engine version</b></td><td>${phdrReport.engineVersion}</td></tr>
<tr><td><b>HCV project version</b></td><td>${phdrReport.projectVersion}</td></tr>
<tr><td><b>PHE extension version</b></td><td>${phdrReport.extensionVersion}</td></tr>
</table>
</div>

<h3>Phylogenetic classification</h3>
<table id="phylogenetics">
<tr>
<td colspan = "2">
<#assign isHcv=true>
<#if phdrReport.sequenceResult.isForwardHcv>
The sequence was identified as hepatitis C virus.
<#elseif phdrReport.sequenceResult.isReverseHcv>
The sequence was identified as hepatitis C virus (reverse complement).
<#else>
<#assign isHcv=false>
The sequence was not identified as hepatitis C virus.
</#if>
</td>
<#if isHcv>
<tr>

<td><b>Genotype</b></td>
<td>${phdrReport.sequenceResult.genotypingResult.genotypeCladeCategoryResult.shortRenderedName}</td>
</tr>
<tr>

<td><b>Subtype</b></td>
<td>${phdrReport.sequenceResult.genotypingResult.subtypeCladeCategoryResult.shortRenderedName}</td>
</tr>

<tr>
<td><b>Closest reference sequence</b></td>
<td>${phdrReport.sequenceResult.genotypingResult.genotypeCladeCategoryResult.closestMemberSequenceID}</td>
</tr>

</table>

<h3>Resistance-associated sequence polymorphisms detected</h3>
<#if phdrReport.sequenceResult.rasScanResults??>
<#assign evenRow=true>
<table id="resistanceFinding">
<thead>
<tr>
<th>Virus protein</th>
<th>Polymorphism</th>
<th>Resisted drug</th>
<th>Genotype / Subtype</th>
<th><em>In vitro</em> resistance level<br/>(EC50 log fold change)</th>
<th>Clinical trials</th>
<th>Reference</th>
</tr>
</thead>
<tbody>
<#list phdrReport.sequenceResult.rasScanResults as rasScanResult>
<#assign firstRow=true>
<#list rasScanResult.rasDetails.resistanceFinding as resistanceFinding>
<#if firstRow>
<tr id="rasFirstRow">
<td rowspan = "${rasScanResult.rasDetails.resistanceFinding?size}">${rasScanResult.rasDetails.gene}</td>
<td rowspan = "${rasScanResult.rasDetails.resistanceFinding?size}">${rasScanResult.rasDetails.structure}</td>
<#assign firstRow=false>
<#else>
<tr>
</#if>
<td <#if evenRow>id="resistanceFindingEven"</#if>>${resistanceFinding.drug}</td>
<td <#if evenRow>id="resistanceFindingEven"</#if>>${resistanceFinding.clade.displayName}</td>
<td <#if evenRow>id="resistanceFindingEven"</#if>>
<#if resistanceFinding.inVitroResult?? && resistanceFinding.inVitroResult.ec50RangeString??>
${(resistanceFinding.inVitroResult.ec50RangeString)}
<#else>
-
</#if>
</td>
<td <#if evenRow>id="resistanceFindingEven"</#if>>
<#if resistanceFinding.inVivoResult?? && resistanceFinding.inVivoResult.clinicalTrial??>
<#list resistanceFinding.inVivoResult.clinicalTrial as clinicalTrial>
${clinicalTrial.displayName} [${clinicalTrial.regimen}]</br>
</#list>
<#else>
-
</#if>
</td>
<td <#if evenRow>id="resistanceFindingEven"</#if>>${resistanceFinding.publication.displayName} [${resistanceFinding.publication.index}]</td>
<#if evenRow>
<#assign evenRow=false>
<#else>
<#assign evenRow=true>
</#if>
</tr>
</#list>
</#list>
</tbody>
</table>
</#if>

</#if>

<#if phdrReport.publications??>
<h2>References</h2>

<#assign pubIdx=1>
<#list phdrReport.publications as publication>
<p>
[${publication.index}] 
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
</body>
</html>