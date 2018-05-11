<html>
<head>
<meta charset="UTF-8">
<style>
${getResourceAsString('phdrRasReport.css')?no_esc}
</style>
</head>
<body>

<div id="title">
<img height="125px" alt="PHE logo" src="data:image/svg+xml;base64,${getResourceAsBase64('pheLogo.svg')}" />
<img height="125px" alt="CVR logo" src="data:image/svg+xml;base64,${getResourceAsBase64('cvrLogo.svg')}" />
</div>
<h1>Hepatitis C virus sequence report</h1>

<table id="overview">
<colgroup>
    <col class="tableHeader"/>
    <col/>
</colgroup>

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
<colgroup>
    <col class="tableHeader"/>
    <col/>
</colgroup>
<tr>
<td><b>Identified as hepatitis C?</b></td>
<td>
<#assign isHcv=true>
<#if phdrReport.sequenceResult.isForwardHcv>
Yes
<#elseif phdrReport.sequenceResult.isReverseHcv>
Yes (reverse complement).
<#else>
<#assign isHcv=false>
No
</#if>
</td>
<tr>

<td><b>Genotype</b></td>
<#if isHcv>
<td>${phdrReport.sequenceResult.genotypingResult.genotypeCladeCategoryResult.shortRenderedName}</td>
<#else>
<td>N/A</td>
</#if>
</tr>
<tr>

<td><b>Subtype</b></td>
<#if isHcv>
<td>${phdrReport.sequenceResult.genotypingResult.subtypeCladeCategoryResult.shortRenderedName}</td>
<#else>
<td>N/A</td>
</#if>
</tr>

<tr>
<td><b>Closest reference sequence</b></td>
<#if isHcv>
<td>${phdrReport.sequenceResult.genotypingResult.genotypeCladeCategoryResult.closestMemberSequenceID}</td>
<#else>
<td>N/A</td>
</#if>
</tr>
</table>

<table id="overview">
<colgroup>
    <col class="tableHeader"/>
    <col/>
</colgroup>

<div id="antiviralResistance">
<h3>Antiviral resistance summary</h3>
<#if isHcv>
<table id="drugScores">
<thead>
<tr>
	<th>Drug category</th>
	<th>Drug</th>
	<th colspan="2">Resistance level</th>
	<th>Resistance-associated polymorphisms</th>
</tr>
</thead>
<#list phdrReport.sequenceResult.drugScores as categoryDrugScores>
<#list categoryDrugScores.drugAssessments as drugScore>
<#if drugScore?index == 0>
<tr class="firstRow">
<#else>
<tr>
</#if>
<#if drugScore?index == 0>
	<td rowspan = "2">${categoryDrugScores.category}</td>
	</#if>
	<td>${drugScore.drug.id}</td>
	<td>${drugScore.drugScoreDisplay}</td>
	<td class="resistanceBlock resistanceColourCode_${drugScore.drugScore}"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
	<td>
	<#if drugScore.rasScores??>
	<#list drugScore.rasScores.fieldNames as gene>
    ${gene}:
	<#list drugScore.rasScores[gene] as rasScore><#if rasScore?index gt 0>,</#if>
		<span class="rasColourCode_${rasScore.rasLevel}">${rasScore.structure}</span></#list>
	</#list>
	<#else>
		None relevant 
	</#if>
	</td>
</tr>
</#list>
</#list>

</table>
</div>
<#else>
No resistance analysis was performed for the sequence.
</#if>

<div class="pagebreak"> </div>

<h3>Resistance-associated polymorphism details</h3>
<#if isHcv>
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
<#list rasScanResult.rasDetails.resistanceFinding as resistanceFinding>
<#if resistanceFinding?index == 0>
<tr class="firstRow">
<td rowspan = "${rasScanResult.rasDetails.resistanceFinding?size}">${rasScanResult.rasDetails.gene}</td>
<td rowspan = "${rasScanResult.rasDetails.resistanceFinding?size}">${rasScanResult.rasDetails.structure}</td>
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
<#else>
No resistance-associated polymorphisms were detected.
</#if>
<#else>
No resistance analysis was performed for the sequence.
</#if>

<div class="pagebreak"> </div>

<#if phdrReport.publications?? && phdrReport.publications?size != 0>
<div id="references">
<h3>References</h3>

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
</div>
</body>
</html>