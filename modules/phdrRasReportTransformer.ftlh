<html>
<head>
<meta charset="UTF-8">
<style>
${getResourceAsString('phdrRasReport.css')?no_esc}
</style>
</head>
<body>

<div id="block1">
<div id="titleAndOverview">
<table id="overview">
<h2>Hepatitis C virus sequence report</h2>
<colgroup>
    <col class="tableHeader"/>
    <col/>
</colgroup>

<tr><td><b>File path</b></td><td>${phdrReport.filePath}</td></tr>
<tr><td><b>Sequance data format</b></td><td>
<#if phdrReport.sequenceDataFormat = "FASTA"> 
<#assign result = phdrReport.sequenceResult>
Consensus (FASTA)
<#elseif phdrReport.sequenceDataFormat = "SAM/BAM">
<#assign result = phdrReport.samReferenceResult>
Deep sequencing (SAM/BAM)
</#if>
</td></tr>

<#if phdrReport.sequenceDataFormat = "FASTA"> 
<tr>
<td><b>Sequence ID</b></td>
<td>${phdrReport.sequenceResult.id}</td>
</tr>
</#if>


<tr><td><b>Report generation date</b></td><td>${phdrReport.reportGenerationDate}</td></tr>
</table>
</div>
<div id="logos">
<img id="pheLogo" alt="PHE logo" src="data:image/svg+xml;base64,${getResourceAsBase64('pheLogo.svg')}" />
<img id="cvrLogo" alt="CVR logo" src="data:image/svg+xml;base64,${getResourceAsBase64('cvrLogo.svg')}" />
</div>
</div>

<div id="phylo">
<h3>Phylogenetic classification</h3>
<table id="phylogenetics">
<colgroup>
    <col class="tableHeader"/>
    <col/>
</colgroup>
<tr>
<td><b>Identified as hepatitis C?</b></td>
<td>
<#assign isForwardHcv=true>
<#if result.isForwardHcv>
Yes
<#elseif result.isReverseHcv>
<#assign isForwardHcv=false>
Yes (reverse complement)
<#else>
<#assign isForwardHcv=false>
No
</#if>
</td>
<tr>

<td><b>Genotype</b></td>
<#if isForwardHcv>
<td>${result.genotypingResult.genotypeCladeCategoryResult.shortRenderedName}</td>
<#else>
<td>N/A</td>
</#if>
</tr>
<tr>

<td><b>Subtype</b></td>
<#if isForwardHcv>
<td>${result.genotypingResult.subtypeCladeCategoryResult.shortRenderedName}</td>
<#else>
<td>N/A</td>
</#if>
</tr>

<tr>
<td><b>Closest reference sequence</b></td>
<#if isForwardHcv && result.genotypingResult.genotypeCladeCategoryResult.closestMemberSequenceID??>
<td>${result.genotypingResult.genotypeCladeCategoryResult.closestMemberSequenceID}</td>
<#else>
<td>N/A</td>
</#if>
</tr>
</table>
</div>

<div id="featureCoverage">

<#if result.featuresWithCoverage??>

<h3>Genome coding region coverage</h3>

<#if result.featuresWithCoverage?size == 0>
<p>No coverage of coding regions</p>
<#else>
<table id="featureCoverageTable">
<colgroup>
    <col class="tableHeader"/>
    <col/>
</colgroup>
<#list result.featuresWithCoverage as feature>
<#if feature.coveragePct gt 0>
<tr>
<td><b>${feature.displayName}</b></td>
<td>${feature.coveragePct?string("##0.#")}%</td>
</tr>
</#if>
</#list>
</table>
</#if>

</#if>




</div>

<div class="pagebreak"> </div>

<div id="antiviralResistance">
<h3>Antiviral resistance summary</h3>


<#if isForwardHcv && result.genotypingResult.genotypeCladeCategoryResult.finalClade??>

<p>
	Please note that the HCV-GLUE drug resistance interpretation system has not yet been clinically validated. 
	<br/>
   <b>No clinical decisions should be made based on the outputs of HCV-GLUE drug resistance analysis.</b>
	<br/>
   Please subscribe to the <a target="_blank" 
   href="https://www.researchgate.net/project/HCV-GLUE-an-online-database-and-sequence-analysis-tool-supporting-treatment-and-eradication-of-hepatitis-C-virus">
   HCV-GLUE ResearchGate project</a> to be notified of updates.
</p>

<table id="drugScores">
<thead>
<tr>
	<th rowspan="2">Drug category</th>
	<th rowspan="2">Drug</th>
	<th colspan="3">Resistance-associated polymorphisms<sup>1</sup></th>
	<th rowspan="2" colspan="2">Resistance level<sup>2</sup></th>
</tr>
<tr>
	<th>Category I</th>
	<th>Category II</th>
	<th>Category III</th>
</tr>
</thead>
<#list result.drugScores as categoryDrugScores>
<#list categoryDrugScores.drugAssessments as drugAssessment>
<#if drugAssessment?index == 0>
<tr class="firstRow">
<#else>
<tr>
</#if>
<#if drugAssessment?index == 0>
<td rowspan = "${categoryDrugScores.drugAssessments?size}">${categoryDrugScores.category}</td>
</#if>
<td>${drugAssessment.drug.id}</td>
<#if !drugAssessment.sufficientCoverage>
<td colspan="5">
Insufficient coverage of ${drugAssessment.featureRequiringCoverage.displayName} to assess resistance level
</td>
<#else>
<td>
<#if drugAssessment.rasScores_category_I?? && drugAssessment.rasScores_category_I?size gt 0>
<#list drugAssessment.rasScores_category_I as rasScore>
	<a href="${rasScore.rapUrl}" target="_blank">${rasScore.displayStructure}</a><#if phdrReport.sequenceDataFormat = "SAM/BAM"> (${rasScore.readsPctPresent?string("##0.#")}%)</#if><#if !rasScore?is_last>,</#if></#list>
<#else>
	-
</#if>
</td>
<td>
<#if drugAssessment.rasScores_category_II?? && drugAssessment.rasScores_category_II?size gt 0>
<#list drugAssessment.rasScores_category_II as rasScore>
	<a href="${rasScore.rapUrl}" target="_blank">${rasScore.displayStructure}</a><#if phdrReport.sequenceDataFormat = "SAM/BAM"> (${rasScore.readsPctPresent?string("##0.#")}%)</#if><#if !rasScore?is_last>,</#if></#list>
<#else>
	- 
</#if>
</td>
<td>
<#if drugAssessment.rasScores_category_III?? && drugAssessment.rasScores_category_III?size gt 0>
<#list drugAssessment.rasScores_category_III as rasScore>
	<a href="${rasScore.rapUrl}" target="_blank">${rasScore.displayStructure}</a><#if phdrReport.sequenceDataFormat = "SAM/BAM"> (${rasScore.readsPctPresent?string("##0.#")}%)</#if><#if !rasScore?is_last>,</#if></#list>
<#else>
	- 
</#if>
</td>
<td>${drugAssessment.drugScoreDisplay}</td>
<td class="resistanceBlock resistanceColourCode_${drugAssessment.drugScore}"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
</#if>
</tr>
</#list>
</#list>
</table>
<div id="resistanceAlgorithmNotes">
<ol>
<li>Polymorphisms are assigned to one of three categories according to the strength of evidence for drug resistance. 
Category I polymorphisms have the strongest evidence: either (a) <em>in vitro</em> resistance level &ge; 5 and found at baseline or treatment-emergent <em>in vivo</em>, or 
(b) both found at baseline and treatment-emergent. Category II: <em>in vitro</em> level &ge; 50 or found at baseline or treatment-emergent.
Category III: <em>in vitro</em> level &ge; 5</li>
<li>Resistance level to a given drug is assigned to one of four categories. 
Strong resistance: any category I polymorphisms.
Moderate resistance: any category II polymorphisms. 
Weak resistance: any category III polymorphisms. 
Susceptible: none of the above.
</li>
</ol>
</div>
<#else>
No resistance analysis was performed for the sequence.
</#if>
</div>

<div class="pagebreak"> </div>

<div id="block3">
<h3>Resistance-associated polymorphism details</h3>
<#if isForwardHcv && result.genotypingResult.genotypeCladeCategoryResult.finalClade??>
<#if result.rasScanResults??>
<#assign evenRow=true>
<table id="resistanceFinding">
<thead>
<tr>
<#if phdrReport.sequenceDataFormat = "SAM/BAM">
<th style="width:6%">Virus protein</th>
<th style="width:7%">Polymorphism</th>
<th style="width:6%">Read proportion</th>
<th style="width:6%">Read depth</th>
<th style="width:8%">Genotype / Subtype</th>
<th style="width:7%">Resisted drug</th>
<th style="width:6%">Resistance category<sup>1</sup></th>
<th style="width:7%"><em>In vitro</em> resistance level<br/>(EC50 log fold change)</th>

<th style="width:15%">Clinical trials / study cohort</th>
<th style="width:7%">Associated drug regimens</th>
<th style="width:7%">Found at baseline?</th>
<th style="width:7%">Treatment-emergent?</th>
<th style="width:11%">Reference</th>
<#else>
<th style="width:6%">Virus protein</th>
<th style="width:8%">Polymorphism</th>
<th style="width:8%">Genotype / Subtype</th>
<th style="width:8%">Resisted drug</th>
<th style="width:6%">Resistance category</th>
<th style="width:8%">EC50 log fold change <em>in vitro</em></th>

<th style="width:19%">Clinical trials / study cohort</th>
<th style="width:8%">Associated drug regimens</th>
<th style="width:8%">Found at baseline?</th>
<th style="width:8%">Treatment-emergent?</th>
<th style="width:13%">Reference</th>
</#if>
</tr>
</thead>
<tbody>
<#list result.rasScanResults as rasScanResult>
<#list rasScanResult.rasDetails.alignmentRas as alignmentRas>
<#list alignmentRas.alignmentRasDrug as alignmentRasDrug>
<#list alignmentRasDrug.resistanceFinding as resistanceFinding>
<#if resistanceFinding?index == 0 && alignmentRasDrug?index == 0>
<tr class="firstRow">
<td rowspan = "${alignmentRas.numFindings}">${rasScanResult.rasDetails.gene}</td>
<td rowspan = "${alignmentRas.numFindings}">
	<a href="${rasScanResult.rapUrl}" target="_blank">
	${alignmentRas.displayStructure}
	</a>
</td>
<#if phdrReport.sequenceDataFormat = "SAM/BAM">
<td rowspan = "${alignmentRas.numFindings}">${rasScanResult.pctPresent?string("##0.#")}%</td>
<td rowspan = "${alignmentRas.numFindings}">${(rasScanResult.readsPresent+rasScanResult.readsAbsent)?c}</td>
</#if>
<td rowspan = "${alignmentRas.numFindings}">${alignmentRas.clade.displayName?replace("HCV ", "")}</td>
<#else>
<tr>
</#if>
<#if resistanceFinding?index == 0>
<td rowspan = "${alignmentRasDrug.numFindings}">${alignmentRasDrug.drug}</td>
<td rowspan = "${alignmentRasDrug.numFindings}">${alignmentRasDrug.displayResistanceCategory}</td>
</#if>
<td <#if evenRow>id="resistanceFindingEven"</#if>>
<#if resistanceFinding.inVitroResult?? && resistanceFinding.inVitroResult.rangeEC50FoldChange??>
${(resistanceFinding.inVitroResult.rangeEC50FoldChange)}
<#else>
-
</#if>
</td>
<td <#if evenRow>id="resistanceFindingEven"</#if>>
<#if resistanceFinding.inVivoResult??>
<#if resistanceFinding.inVivoResult.clinicalTrial??>
<#list resistanceFinding.inVivoResult.clinicalTrial as clinicalTrial>
<a target="_blank" href="https://clinicaltrials.gov/ct2/show/${clinicalTrial.nctId}">${clinicalTrial.displayName}</a><#if !clinicalTrial?is_last>;</#if>
</#list>
<#else>
${resistanceFinding.inVivoResult.cohortDescription}
</#if>
<#else>
-
</#if>
</td>
<td <#if evenRow>id="resistanceFindingEven"</#if>>
<#if resistanceFinding.inVivoResult??>
<#list resistanceFinding.inVivoResult.regimen as regimen>
${regimen.displayName}<#if !regimen?is_last>;</#if>
</#list>
<#else>
-
</#if>
</td>
<td <#if evenRow>id="resistanceFindingEven"</#if>>
<#if resistanceFinding.inVivoResult?? && resistanceFinding.inVivoResult.foundAtBaseline??>
<#if resistanceFinding.inVivoResult.foundAtBaseline = true>
Yes
<#elseif resistanceFinding.inVivoResult.foundAtBaseline = false>
No
<#else>
-
</#if>
<#else>
-
</#if>
</td>
<td <#if evenRow>id="resistanceFindingEven"</#if>>
<#if resistanceFinding.inVivoResult?? && resistanceFinding.inVivoResult.treatmentEmergent??>
<#if resistanceFinding.inVivoResult.treatmentEmergent = true>
Yes
<#elseif resistanceFinding.inVivoResult.treatmentEmergent = false>
No
<#else>
-
</#if>
<#else>
-
</#if>
</td>
<td <#if evenRow>id="resistanceFindingEven"</#if>>
<a target="_blank" href="${resistanceFinding.publication.url}">${resistanceFinding.publication.displayName}</a> [${resistanceFinding.publication.index}]

</td>
<#if evenRow>
<#assign evenRow=false>
<#else>
<#assign evenRow=true>
</#if>
</tr>
</#list>
</#list>
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
</div>


<div class="pagebreak"> </div>

<#if result.substitutionsOfInterest ?? && (result.substitutionsOfInterest?size gt 0)>

<div id="substitutionsOfInterestDiv">
<h3>Other polymorphisms of interest</h3>
<table id="substitutionsOfInterest">
<thead>
<tr>
<#if phdrReport.sequenceDataFormat = "SAM/BAM">
<th style="width:10%">Virus protein</th>
<th style="width:10%">Polymorphism</th>
<th style="width:10%">Read proportion</th>
<th style="width:10%">Read depth</th>
<th style="width:60%">Notes</th>
<#else>
<th style="width:15%">Virus protein</th>
<th style="width:15%">Polymorphism</th>
<th style="width:70%">Notes</th>
</#if>
</thead>
<tbody>
<#list result.substitutionsOfInterest as substitutionOfInterest>
<tr>
	<td>${substitutionOfInterest.virusProtein}</td>
	<td>
<#if substitutionOfInterest.rapUrl ??>
	<a href="${substitutionOfInterest.rapUrl}" target="_blank">
</#if>
	${substitutionOfInterest.displayStructure}
<#if substitutionOfInterest.rapUrl ??>
	</a>
</#if>
</td>
<#if phdrReport.sequenceDataFormat = "SAM/BAM">
<td>${substitutionOfInterest.pctPresent?string("##0.#")}%</td>
<td>${(substitutionOfInterest.depth)?c}</td>
</#if>
	<td>${substitutionOfInterest.displayReasonForInterest}</td>
</tr>
</#list>
</tbody>
</table>
</div>


<div class="pagebreak"> </div>

</#if>

<div id="configuration">
<h3>System configuration</h3>
<table id="systemConfigTable">
<colgroup style="width:50%">
    <col class="tableHeader"/>
</colgroup>
<colgroup style="width:50%">
    <col/>
</colgroup>
<tr><td><b>GLUE engine version</b></td><td>${phdrReport.engineVersion}</td></tr>
<tr><td><b>HCV project version</b></td><td>${phdrReport.projectVersion}</td></tr>
<tr><td><b>PHE extension version</b></td><td>${phdrReport.extensionVersion}</td></tr>
<#if phdrReport.sequenceDataFormat = "SAM/BAM">
<tr><td><b>Minimum read proportion</b></td><td>${phdrReport.phdrSamThresholds.minReadProportionPct?string("##0.#")}%</td></tr>
<tr><td><b>Minimum read depth</b></td><td>${phdrReport.phdrSamThresholds.minDepth?c}</td></tr>
<tr><td><b>Minimum base quality</b></td><td>${phdrReport.phdrSamThresholds.minQScore}</td></tr>
<tr><td><b>Minimum mapping quality</b></td><td>${phdrReport.phdrSamThresholds.minMapQ}</td></tr>
</#if>
<tr><td><b>Minimum coding region coverage for resistance analysis</b></td><td>${phdrReport.phdrFeatureCoverageThresholds.resistanceGeneMinCoveragePct}%</td></tr>


</table>
</div>

<#if phdrReport.publications?? && phdrReport.publications?size != 0>

<h3>References</h3>
<div id="references">
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
<a target="_blank" href="${publication.url}">${publication.url}</a> 
<#assign pubIdx=pubIdx+1>
</p>
</#list>
</#if>
</div>


</body>
</html>