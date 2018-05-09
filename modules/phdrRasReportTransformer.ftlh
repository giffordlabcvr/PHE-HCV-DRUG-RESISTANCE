<html>
<head>
<style>
body {
    font-family: Arial, Helvetica, sans-serif;
}

table {
    border: 1px solid #000;
    border-collapse: collapse;
}

tr {
    border-top: 1px solid #000;
}

tr + tr {
    border-top: 1px solid #ddd;
}

td {
    border-left: 1px solid #000;
    vertical-align: top;
}

td + td {
    border-left: 1px solid #ddd;
}

#rasFirstRow {
    border-top: 1px solid #000;
}

#resistanceFinding {
    width: 100%;
}

#resistanceFindingEven {
	background-color: #f2f2f2;
}

td, th {
    padding: 8px;
}

#resistanceFinding th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #c2daef;
}

</style>
</head>
<body>
<h1>Hepatitis C virus sequence report</h1>

<#list sequenceResults as sequenceResult>

<h3>Overview</h3>
<table id="overview">
<tr><td><b>Sequence ID</b></td><td>${sequenceResult.id}</td></tr>
<tr><td><b>Sequance data format</b></td><td>
<#if sequenceDataFormat = "FASTA"> 
Consensus (FASTA)
<#elseif sequenceDataFormat = "SAM/BAM">
Deep sequencing (SAM/BAM)
</#if>
</td></tr>
<tr><td><b>Report generation date</b></td><td>${reportGenerationDate}</td></tr>
<tr><td><b>GLUE engine version</b></td><td>${engineVersion}</td></tr>
<tr><td><b>HCV project version</b></td><td>${projectVersion}</td></tr>
<tr><td><b>PHE extension version</b></td><td>${extensionVersion}</td></tr>
</table>

<h3>Phylogenetic classification</h3>
<table id="phylogenetics">
<tr>
<td colspan = "2">
<#assign isHcv=true>
<#if sequenceResult.isForwardHcv>
The sequence was identified as hepatitis C virus.
<#elseif sequenceResult.isReverseHcv>
The sequence was identified as hepatitis C virus (reverse complement).
<#else>
<#assign isHcv=false>
The sequence was not identified as hepatitis C virus.
</#if>
</td>
<#if isHcv>
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
<#list sequenceResult.rasScanResults as rasScanResult>
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
</#list>


<#if publications??>
<h2>References</h2>

<#assign pubIdx=1>
<#list publications as publication>
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