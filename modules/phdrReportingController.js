
var nextPubIndex = 1;

function reportFastaAsHtml(fastaFilePath, htmlFilePath) {
	var reportDoc = reportFasta(fastaFilePath);
	glue.inMode("module/phdrRasReportTransformer", function() {
		glue.command({"transform-to-file" : {
			commandDocument: reportDoc,
			outputFile: htmlFilePath
		}});
	});
}


function reportBamAsHtml(bamFilePath, htmlFilePath) {
	var reportDoc = reportBam(bamFilePath);
	glue.inMode("module/phdrRasReportTransformer", function() {
		glue.command({"transform-to-file" : {
			commandDocument: reportDoc,
			outputFile: htmlFilePath
		}});
	});
}

var staticResult = {
		  "phdrWebReport": {
			    "results": [
			      {
			        "phdrReport": {
			          "sequenceDataFormat": "FASTA",
			          "filePath": "example_mix_2a_2b_3a_3b.fasta",
			          "sequenceResult": {
			            "id": "AB047639.REF_2a_D00944.example",
			            "isForwardHcv": true,
			            "isReverseHcv": false,
			            "genotypingResult": {
			              "queryName": "AB047639.REF_2a_D00944.example",
			              "queryCladeCategoryResult": [
			                {
			                  "categoryName": "genotype",
			                  "categoryDisplayName": "Genotype",
			                  "queryCladeResult": [
			                    {
			                      "cladeName": "AL_2",
			                      "cladeRenderedName": "HCV Genotype 2",
			                      "percentScore": 100
			                    }
			                  ],
			                  "finalClade": "AL_2",
			                  "finalCladeRenderedName": "HCV Genotype 2",
			                  "closestMemberAlignmentName": "AL_2a",
			                  "closestMemberSourceName": "ncbi-refseqs",
			                  "closestMemberSequenceID": "AB047639",
			                  "closestTargetAlignmentName": "AL_2a",
			                  "closestTargetSourceName": "ncbi-refseqs",
			                  "closestTargetSequenceID": "AB047639",
			                  "shortRenderedName": "2"
			                },
			                {
			                  "categoryName": "subtype",
			                  "categoryDisplayName": "Subtype",
			                  "queryCladeResult": [
			                    {
			                      "cladeName": "AL_2a",
			                      "cladeRenderedName": "HCV Subtype 2a",
			                      "percentScore": 100
			                    }
			                  ],
			                  "finalClade": "AL_2a",
			                  "finalCladeRenderedName": "HCV Subtype 2a",
			                  "closestMemberAlignmentName": "AL_2a",
			                  "closestMemberSourceName": "ncbi-refseqs",
			                  "closestMemberSequenceID": "AB047639",
			                  "closestTargetAlignmentName": "AL_2a",
			                  "closestTargetSourceName": "ncbi-refseqs",
			                  "closestTargetSequenceID": "AB047639",
			                  "shortRenderedName": "2a"
			                }
			              ],
			              "genotypeCladeCategoryResult": {
			                "categoryName": "genotype",
			                "categoryDisplayName": "Genotype",
			                "queryCladeResult": [
			                  {
			                    "cladeName": "AL_2",
			                    "cladeRenderedName": "HCV Genotype 2",
			                    "percentScore": 100
			                  }
			                ],
			                "finalClade": "AL_2",
			                "finalCladeRenderedName": "HCV Genotype 2",
			                "closestMemberAlignmentName": "AL_2a",
			                "closestMemberSourceName": "ncbi-refseqs",
			                "closestMemberSequenceID": "AB047639",
			                "closestTargetAlignmentName": "AL_2a",
			                "closestTargetSourceName": "ncbi-refseqs",
			                "closestTargetSequenceID": "AB047639",
			                "shortRenderedName": "2"
			              },
			              "subtypeCladeCategoryResult": {
			                "categoryName": "subtype",
			                "categoryDisplayName": "Subtype",
			                "queryCladeResult": [
			                  {
			                    "cladeName": "AL_2a",
			                    "cladeRenderedName": "HCV Subtype 2a",
			                    "percentScore": 100
			                  }
			                ],
			                "finalClade": "AL_2a",
			                "finalCladeRenderedName": "HCV Subtype 2a",
			                "closestMemberAlignmentName": "AL_2a",
			                "closestMemberSourceName": "ncbi-refseqs",
			                "closestMemberSequenceID": "AB047639",
			                "closestTargetAlignmentName": "AL_2a",
			                "closestTargetSourceName": "ncbi-refseqs",
			                "closestTargetSequenceID": "AB047639",
			                "shortRenderedName": "2a"
			              }
			            },
			            "targetRefName": "REF_2a_AB047639",
			            "rasScanResults": [],
			            "drugScores": [
			              {
			                "category": "NS3/4A protease inhibitors",
			                "drugAssessments": [
			                  {
			                    "drug": {
			                      "id": "glecaprevir",
			                      "category": "NS3/4A protease inhibitors"
			                    },
			                    "drugScore": "susceptible",
			                    "drugScoreDisplay": "Susceptible",
			                    "drugScoreDisplayShort": "Susceptible",
			                    "rasScores_category_I": [],
			                    "rasScores_category_II": [],
			                    "rasScores_category_III": []
			                  },
			                  {
			                    "drug": {
			                      "id": "voxilaprevir",
			                      "category": "NS3/4A protease inhibitors"
			                    },
			                    "drugScore": "susceptible",
			                    "drugScoreDisplay": "Susceptible",
			                    "drugScoreDisplayShort": "Susceptible",
			                    "rasScores_category_I": [],
			                    "rasScores_category_II": [],
			                    "rasScores_category_III": []
			                  }
			                ]
			              },
			              {
			                "category": "NS5A inhibitors",
			                "drugAssessments": [
			                  {
			                    "drug": {
			                      "id": "pibrentasvir",
			                      "category": "NS5A inhibitors"
			                    },
			                    "drugScore": "susceptible",
			                    "drugScoreDisplay": "Susceptible",
			                    "drugScoreDisplayShort": "Susceptible",
			                    "rasScores_category_I": [],
			                    "rasScores_category_II": [],
			                    "rasScores_category_III": []
			                  },
			                  {
			                    "drug": {
			                      "id": "velpatasvir",
			                      "category": "NS5A inhibitors"
			                    },
			                    "drugScore": "susceptible",
			                    "drugScoreDisplay": "Susceptible",
			                    "drugScoreDisplayShort": "Susceptible",
			                    "rasScores_category_I": [],
			                    "rasScores_category_II": [],
			                    "rasScores_category_III": []
			                  }
			                ]
			              },
			              {
			                "category": "NS5B RNA polymerase inhibitors",
			                "drugAssessments": [
			                  {
			                    "drug": {
			                      "id": "sofosbuvir",
			                      "category": "NS5B RNA polymerase inhibitors"
			                    },
			                    "drugScore": "susceptible",
			                    "drugScoreDisplay": "Susceptible",
			                    "drugScoreDisplayShort": "Susceptible",
			                    "rasScores_category_I": [],
			                    "rasScores_category_II": [],
			                    "rasScores_category_III": []
			                  }
			                ]
			              }
			            ],
			            "visualisationHints": {
			              "features": [
			                "precursor_polyprotein",
			                "Core",
			                "E1",
			                "E2",
			                "p7",
			                "NS2",
			                "NS3",
			                "NS4A",
			                "NS4B",
			                "NS5A",
			                "NS5B"
			              ],
			              "comparisonRefs": [
			                {
			                  "refName": "REF_MASTER_NC_004102",
			                  "refDisplayName": "Hepatitis C Virus Reference (NC_004102)"
			                },
			                {
			                  "refName": "REF_2_D00944",
			                  "refDisplayName": "Genotype 2 Reference (D00944)"
			                },
			                {
			                  "refName": "REF_2a_AB047639",
			                  "refDisplayName": null
			                }
			              ],
			              "visualisationUtilityModule": "phdrVisualisationUtility",
			              "targetReferenceName": "REF_2a_AB047639",
			              "queryNucleotides": "ACCTGCCCCTAATAGGGGCGACACTCCGCCATGAATCACTCCCCTGTGAGGAACTACTGTCTTCACGCAGAAAGCGCCTAGCCATGGCGTTAGTATGAGTGTCGTACAGCCTCCAGGCCCCCCCCTCCCGGGAGAGCCATAGTGGTCTGCGGAACCGGTGAGTACACCGGAATTGCCGGGAAGACTGGGTCCTTTCTTGGATAAACCCACTCTATGCCCGGCCATTTGGGCGTGCCCCCGCAAGACTGCTAGCCGAGTAGCGTTGGGTTGCGAAAGGCCTTGTGGTACTGCCTGATAGGGCGCTTGCGAGTGCCCCGGGAGGTCTCGTAGACCGTGCACCATGAGCACAAATCCTAAACCTCAAAGAAAAACCAAAAGAAACACCAACCGTCGCCCAGAAGACGTTAAGTTCCCGGGCGGCGGCCAGATCGTTGGCGGAGTATACTTGTTGCCGCGCAGGGGCCCCAGGTTGGGTGTGCGCACGACAAGGAAAACTTCGGAGCGGTCCCAGCCACGTGGGAGACGCCAGCCCATCCCCAAAGATCGGCGCTCCACTGGCAAGGCCTGGGGAAAACCAGGTCGCCCCTGGCCCCTATATGGGAATGAGGGACTCGGCTGGGCAGGATGGCTCCTGTCCCCCCGAGGCTCTCGCCCCTCCTGGGGCCCCACTGACCCCCGGCATAGGTCGCGCAACGTGGGTAAAGTCATCGACACCCTAACGTGTGGCTTTGCCGACCTCATGGGGTACATCCCCGTCGTAGGCGCCCCGCTTAGTGGCGCCGCCAGAGCTGTCGCGCACGGCGTGAGAGTCCTGGAGGACGGGGTTAATTATGCAACAGGGAACCTACCCGGTTTCCCCTTTTCTATCTTCTTGCTGGCCCTGTTGTCCTGCATCACCGTTCCGGTCTCTGCTGCCCAGGTGAAGAATACCAGTAGCAGCTACATGGTGACCAATGACTGCTCCAATGACAGCATCACTTGGCAGCTCGAGGCTGCGGTTCTCCACGTCCCCGGGTGCGTCCCGTGCGAGAGAGTGGGGAATACGTCACGGTGTTGGGTGCCAGTCTCGCCAAACATGGCTGTGCGGCAGCCCGGTGCCCTCACGCAGGGTCTGCGGACGCACATCGATATGGTTGTGATGTCCGCCACCTTCTGCTCTGCTCTCTACGTGGGGGACCTCTGTGGCGGGGTGATGCTCGCGGCCCAGGTGTTCATCGTCTCGCCGCAGTACCACTGGTTTGTGCAAGAATGCAATTGCTCCATCTACCCTGGCACCATCACTGGACACCGCATGGCATGGGACATGATGATGAACTGGTCGCCCACGGCCACCATGATCCTGGCGTACGTGATGCGCGTCCCCGAGGTCATCATAGACATCGTTAGCGGGGCTCACTGGGGCGTCATGTTCGGCTTGGCCTACTTCTCTATGCAGGGAGCGTGGGCGAAGGTCATTGTCATCCTTCTGCTGGCCGCTGGGGTGGACGCGGGCACCACCACCGTTGGAGGCGCTGTTGCACGTTCCACCAACGTGATTGCCGGCGTGTTCAGCCATGGCCCTCAGCAGAACATTCAGCTCATTAACACCAACGGCAGTTGGCACATCAACCGTACTGCCTTGAATTGCAATGACTCCTTGAACACCGGCTTTCTCGCGGCCTTGTTCTACACCAACCGCTTTAACTCGTCAGGGTGTCCAGGGCGCCTGTCCGCCTGCCGCAACATCGAGGCTTTCCGGATAGGGTGGGGCACCCTACAGTACGAGGATAATGTCACCAATCCAGAGGATATGAGGCCGTACTGCTGGCACTACCCCCCAAAGCCGTGTGGCGTAGTCCCCGCGAGGTCTGTGTGTGGCCCAGTGTACTGTTTCACCCCCAGCCCGGTAGTAGTGGGCACGACCGACAGACGTGGAGTGCCCACCTACACATGGGGAGAGAATGAGACAGATGTCTTCCTACTGAACAGCACCCGACCGCCGCAGGGCTCATGGTTCGGCTGCACGTGGATGAACTCCACTGGTTTCACCAAGACTTGTGGCGCGCCACCTTGCCGCACCAGAGCTGACTTCAACGCCAGCACGGACTTGTTGTGCCCTACGGATTGTTTTAGGAAGCATCCTGATGCCACTTATATTAAGTGTGGTTCTGGGCCCTGGCTCACACCAAAGTGCCTGGTCCACTACCCTTACAGACTCTGGCATTACCCCTGCACAGTCAATTTTACCATCTTCAAGATAAGAATGTATGTAGGGGGGGTTGAGCACAGGCTCACGGCCGCATGCAACTTCACTCGTGGGGATCGCTGCGACTTGGAGGACAGGGACAGGAGTCAGCTGTCTCCTCTGTTGCACTCTACCACGGAATGGGCCATCCTGCCCTGCACCTACTCAGACTTACCCGCTTTGTCAACTGGTCTTCTCCACCTTCACCAGAACATCGTGGACGTACAATACATGTATGGCCTCTCACCTGCTATCACAAAATACGTCGTTCGATGGGAGTGGGTGGTACTCTTATTCCTGCTCTTAGCGGACGCCAGAGTCTGCGCCTGCTTGTGGATGCTCATCTTGTTGGGCCAGGCCGAAGCAGCATTGGAGAAGTTGGTCGTCTTGCACGCTGCGAGTGCGGCTAACTGCCATGGCCTCCTATATTTTGCCATCTTCTTCGTGGCAGCTTGGCACATCAGGGGTCGGGTGGTCCCCTTGACCACCTATTGCCTCACTGGCCTATGGCCCTTCTGCCTACTGCTCATGGCACTGCCCCGGCAGGCTTATGCCTATGACGCACCTGTGCACGGACAGATAGGCGTGGGTTTGTTGATATTGATCACCCTCTTCACACTCACCCCGGGGTATAAGACCCTCCTCGGCCAGTGTCTGTGGTGGTTGTGCTATCTCCTGACCCTGGGGGAAGCCATGATTCAGGAGTGGGTACCACCCATGCAGGTGCGCGGCGGCCGCGATGGCATCGCGTGGGCCGTCACTATATTCTGCCCGGGTGTGGTGTTTGACATTACCAAATGGCTTTTGGCGTTGCTTGGGCCTGCTTACCTCTTAAGGGCCGCTTTGACACATGTGCCGTACTTCGTCAGAGCTCACGCTCTGATAAGGGTATGCGCTTTGGTGAAGCAGCTCGCGGGGGGTAGGTATGTTCAGGTGGCGCTATTGGCCCTTGGCAGGTGGACTGGCACCTACATCTATGACCACCTCACACCTATGTCGGACTGGGCCGCTAGCGGCCTGCGCGACTTAGCGGTCGCCGTGGAACCCATCATCTTCAGTCCGATGGAGAAGAAGGTCATCGTCTGGGGAGCGGAGACGGCTGCATGTGGGGACATTCTACATGGACTTCCCGTGTCCGCCCGACTCGGCCAGGAGATCCTCCTCGGCCCAGCTGATGGCTACACCTCCAAGGGGTGGAAGCTCCTTGCTCCCATCACTGCTTATGCCCAGCAAACACGAGGCCTCCTGGGCGCCATAGTGGTGAGTATGACGGGGCGTGACAGGACAGAACAGGCCGGGGAAGTCCAAATCCTGTCCACAGTCTCTCAGTCCTTCCTCGGAACAACCATCTCGGGGGTTTTGTGGACTGTTTACCACGGAGCTGGCAACAAGACTCTAGCCGGCTTACGGGGTCCGGTCACGCAGATGTACTCGAGTGCTGAGGGGGACTTGGTAGGCTGGCCCAGCCCCCCTGGGACCAAGTCTTTGGAGCCGTGCAAGTGTGGAGCCGTCGACCTATATCTGGTCACGCGGAACGCTGATGTCATCCCGGCTCGGAGACGCGGGGACAAGCGGGGAGCATTGCTCTCCCCGAGACCCATTTCGACCTTGAAGGGGTCCTCGGGGGGGCCGGTGCTCTGCCCTAGGGGCCACGTCGTTGGGCTCTTCCGAGCAGCTGTGTGCTCTCGGGGCGTGGCCAAATCCATCGATTTCATCCCCGTTGAGACACTCGACGTTGTTACAAGGTCTCCCACTTTCAGTGACAACAGCACGCCACCGGCTGTGCCCCAGACCTATCAGGTCGGGTACTTGCATGCTCCAACTGGCAGTGGAAAGAGCACCAAGGTCCCTGTCGCGTATGCCGCCCAGGGGTACAAAGTACTAGTGCTTAACCCCTCGGTAGCTGCCACCCTGGGGTTTGGGGCGTACCTATCCAAGGCACATGGCATCAATCCCAACATTAGGACTGGAGTCAGGACCGTGATGACCGGGGAGGCCATCACGTACTCCACATATGGCAAATTTCTCGCCGATGGGGGCTGCGCTAGCGGCGCCTATGACATCATCATATGCGATGAATGCCACGCTGTGGATGCTACCTCCATTCTCGGCATCGGAACGGTCCTTGATCAAGCAGAGACAGCCGGGGTCAGACTAACTGTGCTGGCTACGGCCACACCCCCCGGGTCAGTGACAACCCCCCATCCCGATATAGAAGAGGTAGGCCTCGGGCGGGAGGGTGAGATCCCCTTCTATGGGAGGGCGATTCCCCTATCCTGCATCAAGGGAGGGAGACACCTGATTTTCTGCCACTCAAAGAAAAAGTGTGACGAGCTCGCGGCGGCCCTTCGGGGCATGGGCTTGAATGCCGTGGCATACTATAGAGGGTTGGACGTCTCCATAATACCAGCTCAGGGAGATGTGGTGGTCGTCGCCACCGACGCCCTCATGACGGGGTACACTGGAGACTTTGACTCCGTGATCGACTGCAATGTAGCGGTCACCCAAGCTGTCGACTTCAGCCTGGACCCCACCTTCACTATAACCACACAGACTGTCCCACAAGACGCTGTCTCACGCAGTCAGCGCCGCGGGCGCACAGGTAGAGGAAGACAGGGCACTTATAGGTATGTTTCCACTGGTGAACGAGCCTCAGGAATGTTTGACAGTGTAGTGCTTTGTGAGTGCTACGACGCAGGGGCTGCGTGGTACGATCTCACACCAGCGGAGACCACCGTCAGGCTTAGAGCGTATTTCAACACGCCCGGCCTACCCGTGTGTCAAGACCATCTTGAATTTTGGGAGGCAGTTTTCACCGGCCTCACACACATAGACGCCCACTTCCTCTCCCAAACAAAGCAAGCGGGGGAGAACTTCGCGTACCTAGTAGCCTACCAAGCTACGGTGTGCGCCAGAGCCAAGGCCCCTCCCCCGTCCTGGGACGCCATGTGGAAGTGCCTGGCCCGACTCAAGCCTACGCTTGCGGGCCCCACACCTCTCCTGTACCGTTTGGGCCCTATTACCAATGAGGTCACCCTCACACACCCTGGGACGAAGTACATCGCCACATGCATGCAAGCTGACCTTGAGGTCATGACCAGCACGTGGGTCCTAGCTGGAGGAGTCCTGGCAGCCGTCGCCGCATATTGCCTGGCGACTGGATGCGTTTCCATCATCGGCCGCTTGCACGTCAACCAGCGAGTCGTCGTTGCGCCGGATAAGGAGGTCCTGTATGAGGCTTTTGATGAGATGGAGGAATGCGCCTCTAGGGCGGCTCTCATCGAAGAGGGGCAGCGGATAGCCGAGATGTTGAAGTCCAAGATCCAAGGCTTGCTGCAGCAGGCCTCTAAGCAGGCCCAGGACATACAACCCGCTATGCAGGCTTCATGGCCCAAAGTGGAACAATTTTGGGCCAGACACATGTGGAACTTCATTAGCGGCATCCAATACCTCGCAGGATTGTCAACACTGCCAGGGAACCCCGCGGTGGCTTCCATGATGGCATTCAGTGCCGCCCTCACCAGTCCGTTGTCGACCAGTACCACCATCCTTCTCAACATCATGGGAGGCTGGTTAGCGTCCCAGATCGCACCACCCGCGGGGGCCACCGGCTTTGTCGTCAGTGGCCTGGTGGGGGCTGCCGTGGGCAGCATAGGCCTGGGTAAGGTGCTGGTGGACATCCTGGCAGGATATGGTGCGGGCATTTCGGGGGCCCTCGTCGCATTCAAGATCATGTCTGGCGAGAAGCCCTCTATGGAAGATGTCATCAATCTACTGCCTGGGATCCTGTCTCCGGGAGCCCTGGTGGTGGGGGTCATCTGCGCGGCCATTCTGCGCCGCCACGTGGGACCGGGGGAGGGCGCGGTCCAATGGATGAACAGGCTTATTGCCTTTGCTTCCAGAGGAAACCACGTCGCCCCTACTCACTACGTGACGGAGTCGGATGCGTCGCAGCGTGTGACCCAACTACTTGGCTCTCTTACTATAACCAGCCTACTCAGAAGACTCCACAATTGGATAACTGAGGACTGCCCCATCCCATGCTCCGGATCCTGGCTCCGCGACGTGTGGGACTGGGTTTGCACCATCTTGACAGACTTCAAAAATTGGCTGACCTCTAAATTGTTCCCCAAGCTGCCCGGCCTCCCCTTCATCTCTTGTCAAAAGGGGTACAAGGGTGTGTGGGCCGGCACTGGCATCATGACCACGCGCTGCCCTTGCGGCGCCAACATCTCTGGCAATGTCCGCCTGGGCTCTATGAGGATCACAGGGCCTAAAACCTGCATGAACACCTGGCAGGGGACCTTTCCTATCAATTGCTACACGGAGGGCCAGTGCGCGCCGAAACCCCCCACGAACTACAAGACCGCCATCTGGAGGGTGGCGGCCTCGGAGTACGCGGAGGTGACGCAGCATGGGTCGTACTCCTATGTAACAGGACTGACCACTGACAATCTGAAAATTCCTTGCCAACTACCTTCTCCAGAGTTTTTCTCCTGGGTGGACGGTGTGCAGATCCATAGGTTTGCACCCACACCAAAGCCGTTTTTCCGGGATGAGGTCTCGTTCTGCGTTGGGCTTAATTCCTATGCTGTCGGGTCCCAGCTTCCCTGTGAACCTGAGCCCGACGCAGACGTATTGAGGTCCATGCTAACAGATCCGCCCCACATCACGGCGGAGACTGCGGCGCGGCGCTTGGCACGGGGATCACCTCCATCTGAGGCGAGCTCCTCAGTGAGCCAGCTATCAGCACCGTCGCTGCGGGCCACCTGCACCACCCACAGCAACACCTATGACGTGGACATGGTCGATGCCAACCTGCTCATGGAGGGCGGTGTGGCTCAGACAGAGCCTGAGTCCAGGGTGCCCGTTCTGGACTTTCTCGAGCCAATGGCCGAGGAAGAGAGCGACCTTGAGCCCTCAATACCATCGGAGTGCATGCTCCCCAGGAGCGGGTTTCCACGGGCCTTACCGGCTTGGGCACGGCCTGACTACAACCCGCCGCTCGTGGAATCGTGGAGGAGGCCAGATTACCAACCGCCCACCGTTGCTGGTTGTGCTCTCCCCCCCCCCAAGAAGGCCCCGACGCCTCCCCCAAGGAGACGCCGGACAGTGGGTCTGAGCGAGAGCACCATATCAGAAGCCCTCCAGCAACTGGCCATCAAGACCTTTGGCCAGCCCCCCTCGAGCGGTGATGCAGGCTCGTCCACGGGGGCGGGCGCCGCCGAATCCGGCGGTCCGACGTCCCCTGGTGAGCCGGCCCCCTCAGAGACAGGTTCCGCCTCCTCTATGCCCCCCCTCGAGGGGGAGCCTGGAGATCCGGACCTGGAGTCTGATCAGGTAGAGCTTCAACCTCCCCCCCAGGGGGGGGGGGTAGCTCCCGGTTCGGGCTCGGGGTCTTGGTCTACTTGCTCCGAGGAGGACGATACCACCGTGTGCTGCTCCATGTCATACTCCTGGACCGGGGCTCTAATAACTCCCTGTAGCCCCGAAGAGGAAAAGTTGCCAATCAACCCTTTGAGTAACTCGCTGTTGCGATACCATAACAAGGTGTACTGTACAACATCAAAGAGCGCCTCACAGAGGGCTAAAAAGGTAACTTTTGACAGGACGCAAGTGCTCGACGCCCATTATGACTCAGTCTTAAAGGACATCAAGCTAGCGGCTTCCAAGGTCAGCGCAAGGCTCCTCACCTTGGAGGAGGCGTGCCAGTTGACTCCACCCCATTCTGCAAGATCCAAGTATGGATTCGGGGCCAAGGAGGTCCGCAGCTTGTCCGGGAGGGCCGTTAACCACATCAAGTCCGTGTGGAAGGACCTCCTGGAAGACCCACAAACACCAATTCCCACAACCATCATGGCCAAAAATGAGGTGTTCTGCGTGGACCCCGCCAAGGGGGGTAAGAAACCAGCTCGCCTCATCGTTTACCCTGACCTCGGCGTCCGGGTCTGCGAGAAAATGGCCCTCTATGACATTACACAAAAGCTTCCTCAGGCGGTAATGGGAGCTTCCTATGGCTTCCAGTACTCCCCTGCCCAACGGGTGGAGTATCTCTTGAAAGCATGGGCGGAAAAGAAGGACCCCATGGGTTTTTCGTATGATACCCGATGCTTCGACTCAACCGTCACTGAGAGAGACATCAGGACCGAGGAGTCCATATACCAGGCCTGCTCCCTGCCCGAGGAGGCCCGCACTGCCATACACTCGCTGACTGAGAGACTTTACGTAGGAGGGCCCATGTTCAACAGCAAGGGTCAAACCTGCGGTTACAGACGTTGCCGCGCCAGCGGGGTGCTAACCACTAGCATGGGTAACACCATCACATGCTATGTGAAAGCCCTAGCGGCCTGCAAGGCTGCGGGGATAGTTGCGCCCACAATGCTGGTATGCGGCGATGACCTAGTAGTCATCTCAGAAAGCCAGGGGACTGAGGAGGACGAGCGGAACCTGAGAGCCTTCACGGAGGCCATGACCAGGTACTCTGCCCCTCCTGGTGATCCCCCCAGACCGGAATATGACCTGGAGCTAATAACATCCTGTTCCTCAAATGTGTCTGTGGCGTTGGGCCCGCGGGGCCGCCGCAGATACTACCTGACCAGAGACCCAACCACTCCACTCGCCCGGGCTGCCTGGGAAACAGTTAGACACTCCCCTATCAATTCATGGCTGGGAAACATCATCCAGTATGCTCCAACCATATGGGTTCGCATGGTCCTAATGACACACTTCTTCTCCATTCTCATGGTCCAAGACACCCTGGACCAGAACCTCAACTTTGAGATGTATGGATCAGTATACTCCGTGAATCCTTTGGACCTTCCAGCCATAATTGAGAGGTTACACGGGCTTGACGCCTTTTCTATGCACACATACTCTCACCACGAACTGACGCGGGTGGCTTCAGCCCTCAGAAAACTTGGGGCGCCACCCCTCAGGGTGTGGAAGAGTCGGGCTCGCGCAGTCAGGGCGTCCCTCATCTCCCGTGGAGGGAAAGCGGCCGTTTGCGGCCGATATCTCTTCAATTGGGCGGTGAAGACCAAGCTCAAACTCACTCCATTGCCGGAGGCGCGCCTACTGGACTTATCCAGTTGGTTCACCGTCGGCGCCGGCGGGGGCGACATTTTTCACAGCGTGTCGCGCGCCCGACCCCGCTCATTACTCTTCGGCCTACTCCTACTTTTCGTAGGGGTAGGCCTCTTCCTACTCCCCGCTCGGTAGAGCGGCACACACTAGGTACACTCCATAGCTAACTGTTCCTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTCTTTTTTTTTTTTTTCCCTCTTTCTTCCCTTCTCATCTTATTCTACTTTCTTTCTTGGTGGCTCCATCTTAGCCCTAGTCACGGCTAGCTGTGAAAGGTCCGTGAGCCGCATGACTGCAGAGAGTGCCGTAACTGGTCTCTCTGCAGATCATGT",
			              "queryToTargetRefSegments": [
			                {
			                  "refStart": 1,
			                  "refEnd": 340,
			                  "queryStart": 1,
			                  "queryEnd": 340
			                },
			                {
			                  "refStart": 341,
			                  "refEnd": 9379,
			                  "queryStart": 341,
			                  "queryEnd": 9379
			                },
			                {
			                  "refStart": 9380,
			                  "refEnd": 9678,
			                  "queryStart": 9380,
			                  "queryEnd": 9678
			                }
			              ]
			            }
			          },
			          "publications": [],
			          "reportGenerationDate": "13/09/2018",
			          "engineVersion": "1.0.16",
			          "projectVersion": "0.1.30",
			          "extensionVersion": "0.1.7",
			          "phdrSamThresholds": {
			            "minDepth": 10,
			            "minMapQ": 5,
			            "minQScore": 5,
			            "minReadProportionPct": 15
			          }
			        }
			      },
			      {
			        "phdrReport": {
			          "sequenceDataFormat": "FASTA",
			          "filePath": "example_mix_2a_2b_3a_3b.fasta",
			          "sequenceResult": {
			            "id": "AB559564.REF_2b_D10988.example",
			            "isForwardHcv": true,
			            "isReverseHcv": false,
			            "genotypingResult": {
			              "queryName": "AB559564.REF_2b_D10988.example",
			              "queryCladeCategoryResult": [
			                {
			                  "categoryName": "genotype",
			                  "categoryDisplayName": "Genotype",
			                  "queryCladeResult": [
			                    {
			                      "cladeName": "AL_2",
			                      "cladeRenderedName": "HCV Genotype 2",
			                      "percentScore": 100
			                    }
			                  ],
			                  "finalClade": "AL_2",
			                  "finalCladeRenderedName": "HCV Genotype 2",
			                  "closestMemberAlignmentName": "AL_2b",
			                  "closestMemberSourceName": "ncbi-refseqs",
			                  "closestMemberSequenceID": "D10988",
			                  "closestTargetAlignmentName": "AL_2b",
			                  "closestTargetSourceName": "ncbi-refseqs",
			                  "closestTargetSequenceID": "D10988",
			                  "shortRenderedName": "2"
			                },
			                {
			                  "categoryName": "subtype",
			                  "categoryDisplayName": "Subtype",
			                  "queryCladeResult": [
			                    {
			                      "cladeName": "AL_2b",
			                      "cladeRenderedName": "HCV Subtype 2b",
			                      "percentScore": 100
			                    }
			                  ],
			                  "finalClade": "AL_2b",
			                  "finalCladeRenderedName": "HCV Subtype 2b",
			                  "closestMemberAlignmentName": "AL_2b",
			                  "closestMemberSourceName": "ncbi-refseqs",
			                  "closestMemberSequenceID": "D10988",
			                  "closestTargetAlignmentName": "AL_2b",
			                  "closestTargetSourceName": "ncbi-refseqs",
			                  "closestTargetSequenceID": "D10988",
			                  "shortRenderedName": "2b"
			                }
			              ],
			              "genotypeCladeCategoryResult": {
			                "categoryName": "genotype",
			                "categoryDisplayName": "Genotype",
			                "queryCladeResult": [
			                  {
			                    "cladeName": "AL_2",
			                    "cladeRenderedName": "HCV Genotype 2",
			                    "percentScore": 100
			                  }
			                ],
			                "finalClade": "AL_2",
			                "finalCladeRenderedName": "HCV Genotype 2",
			                "closestMemberAlignmentName": "AL_2b",
			                "closestMemberSourceName": "ncbi-refseqs",
			                "closestMemberSequenceID": "D10988",
			                "closestTargetAlignmentName": "AL_2b",
			                "closestTargetSourceName": "ncbi-refseqs",
			                "closestTargetSequenceID": "D10988",
			                "shortRenderedName": "2"
			              },
			              "subtypeCladeCategoryResult": {
			                "categoryName": "subtype",
			                "categoryDisplayName": "Subtype",
			                "queryCladeResult": [
			                  {
			                    "cladeName": "AL_2b",
			                    "cladeRenderedName": "HCV Subtype 2b",
			                    "percentScore": 100
			                  }
			                ],
			                "finalClade": "AL_2b",
			                "finalCladeRenderedName": "HCV Subtype 2b",
			                "closestMemberAlignmentName": "AL_2b",
			                "closestMemberSourceName": "ncbi-refseqs",
			                "closestMemberSequenceID": "D10988",
			                "closestTargetAlignmentName": "AL_2b",
			                "closestTargetSourceName": "ncbi-refseqs",
			                "closestTargetSequenceID": "D10988",
			                "shortRenderedName": "2b"
			              }
			            },
			            "targetRefName": "REF_2b_D10988",
			            "rasScanResults": [
			              {
			                "referenceName": "REF_MASTER_NC_004102",
			                "featureName": "NS5A",
			                "variationName": "phdr_ras:NS5A:31M",
			                "variationType": "aminoAcidSimplePolymorphism",
			                "matches": [
			                  {
			                    "firstRefCodon": "31",
			                    "lastRefCodon": "31",
			                    "queryAAs": "M",
			                    "refNtStart": 6348,
			                    "refNtEnd": 6350,
			                    "queryNtStart": 6360,
			                    "queryNtEnd": 6362,
			                    "queryNts": "ATG",
			                    "combinedTripletFraction": 1
			                  }
			                ],
			                "rasDetails": {
			                  "referenceName": "REF_MASTER_NC_004102",
			                  "featureName": "NS5A",
			                  "name": "phdr_ras:NS5A:31M",
			                  "type": "aminoAcidSimplePolymorphism",
			                  "gene": "NS5A",
			                  "structure": "31M",
			                  "displayName": null,
			                  "description": null,
			                  "metatag": [
			                    {
			                      "name": "SIMPLE_AA_PATTERN",
			                      "value": "M"
			                    }
			                  ],
			                  "alignmentRas": [
			                    {
			                      "displayStructure": "M/L31M",
			                      "clade": {
			                        "alignmentName": "AL_2b",
			                        "displayName": "HCV Subtype 2b"
			                      },
			                      "parentClade": {
			                        "alignmentName": "AL_2",
			                        "displayName": "HCV Genotype 2"
			                      },
			                      "alignmentRasDrug": [
			                        {
			                          "drug": "velpatasvir",
			                          "resistanceCategory": "category_II",
			                          "displayResistanceCategory": "II",
			                          "resistanceFinding": [
			                            {
			                              "inVivoResult": {
			                                "foundAtBaseline": true,
			                                "treatmentEmergent": false,
			                                "clinicalTrial": [
			                                  {
			                                    "id": "NCT02300103",
			                                    "displayName": "NCT02300103",
			                                    "nctId": "NCT02300103"
			                                  }
			                                ],
			                                "cohortDescription": null,
			                                "regimen": [
			                                  {
			                                    "id": "SOF_VEL",
			                                    "displayName": "SOF/VEL"
			                                  }
			                                ]
			                              },
			                              "publication": {
			                                "id": "28498551",
			                                "displayName": "Gane et al., 2017",
			                                "url": "https://doi.org/10.1002/hep.29256",
			                                "index": 1
			                              }
			                            }
			                          ],
			                          "numFindings": 1
			                        }
			                      ],
			                      "numFindings": 1
			                    }
			                  ],
			                  "numFindings": 1
			                }
			              },
			              {
			                "referenceName": "REF_MASTER_NC_004102",
			                "featureName": "NS5A",
			                "variationName": "phdr_ras:NS5A:44K",
			                "variationType": "aminoAcidSimplePolymorphism",
			                "matches": [
			                  {
			                    "firstRefCodon": "44",
			                    "lastRefCodon": "44",
			                    "queryAAs": "K",
			                    "refNtStart": 6387,
			                    "refNtEnd": 6389,
			                    "queryNtStart": 6399,
			                    "queryNtEnd": 6401,
			                    "queryNts": "AAG",
			                    "combinedTripletFraction": 1
			                  }
			                ],
			                "rasDetails": {
			                  "referenceName": "REF_MASTER_NC_004102",
			                  "featureName": "NS5A",
			                  "name": "phdr_ras:NS5A:44K",
			                  "type": "aminoAcidSimplePolymorphism",
			                  "gene": "NS5A",
			                  "structure": "44K",
			                  "displayName": null,
			                  "description": null,
			                  "metatag": [
			                    {
			                      "name": "SIMPLE_AA_PATTERN",
			                      "value": "K"
			                    }
			                  ],
			                  "alignmentRas": [
			                    {
			                      "displayStructure": "R/K44K",
			                      "clade": {
			                        "alignmentName": "AL_2b",
			                        "displayName": "HCV Subtype 2b"
			                      },
			                      "parentClade": {
			                        "alignmentName": "AL_2",
			                        "displayName": "HCV Genotype 2"
			                      },
			                      "alignmentRasDrug": [
			                        {
			                          "drug": "velpatasvir",
			                          "resistanceCategory": "insignificant",
			                          "displayResistanceCategory": "-",
			                          "resistanceFinding": [
			                            {
			                              "inVitroResult": {
			                                "minEC50FoldChange": 2.8,
			                                "maxEC50FoldChange": 2.8,
			                                "midpointEC50FoldChange": 2.8,
			                                "rangeEC50FoldChange": "2.8"
			                              },
			                              "publication": {
			                                "id": "EASL_2013_Poster_1191",
			                                "displayName": "Cheng et al., 2013",
			                                "url": "https://doi.org/10.1016/S0168-8278(13)61192-7",
			                                "index": 2
			                              }
			                            }
			                          ],
			                          "numFindings": 1
			                        }
			                      ],
			                      "numFindings": 1
			                    }
			                  ],
			                  "numFindings": 1
			                }
			              }
			            ],
			            "drugScores": [
			              {
			                "category": "NS3/4A protease inhibitors",
			                "drugAssessments": [
			                  {
			                    "drug": {
			                      "id": "glecaprevir",
			                      "category": "NS3/4A protease inhibitors"
			                    },
			                    "drugScore": "susceptible",
			                    "drugScoreDisplay": "Susceptible",
			                    "drugScoreDisplayShort": "Susceptible",
			                    "rasScores_category_I": [],
			                    "rasScores_category_II": [],
			                    "rasScores_category_III": []
			                  },
			                  {
			                    "drug": {
			                      "id": "voxilaprevir",
			                      "category": "NS3/4A protease inhibitors"
			                    },
			                    "drugScore": "susceptible",
			                    "drugScoreDisplay": "Susceptible",
			                    "drugScoreDisplayShort": "Susceptible",
			                    "rasScores_category_I": [],
			                    "rasScores_category_II": [],
			                    "rasScores_category_III": []
			                  }
			                ]
			              },
			              {
			                "category": "NS5A inhibitors",
			                "drugAssessments": [
			                  {
			                    "drug": {
			                      "id": "pibrentasvir",
			                      "category": "NS5A inhibitors"
			                    },
			                    "drugScore": "susceptible",
			                    "drugScoreDisplay": "Susceptible",
			                    "drugScoreDisplayShort": "Susceptible",
			                    "rasScores_category_I": [],
			                    "rasScores_category_II": [],
			                    "rasScores_category_III": []
			                  },
			                  {
			                    "drug": {
			                      "id": "velpatasvir",
			                      "category": "NS5A inhibitors"
			                    },
			                    "drugScore": "moderate_resistance",
			                    "drugScoreDisplay": "Moderate resistance",
			                    "drugScoreDisplayShort": "Moderate",
			                    "rasScores_category_I": [],
			                    "rasScores_category_II": [
			                      {
			                        "gene": "NS5A",
			                        "structure": "31M",
			                        "displayStructure": "M/L31M",
			                        "category": "category_II"
			                      }
			                    ],
			                    "rasScores_category_III": []
			                  }
			                ]
			              },
			              {
			                "category": "NS5B RNA polymerase inhibitors",
			                "drugAssessments": [
			                  {
			                    "drug": {
			                      "id": "sofosbuvir",
			                      "category": "NS5B RNA polymerase inhibitors"
			                    },
			                    "drugScore": "susceptible",
			                    "drugScoreDisplay": "Susceptible",
			                    "drugScoreDisplayShort": "Susceptible",
			                    "rasScores_category_I": [],
			                    "rasScores_category_II": [],
			                    "rasScores_category_III": []
			                  }
			                ]
			              }
			            ],
			            "visualisationHints": {
			              "features": [
			                "precursor_polyprotein",
			                "Core",
			                "E1",
			                "E2",
			                "p7",
			                "NS2",
			                "NS3",
			                "NS4A",
			                "NS4B",
			                "NS5A",
			                "NS5B"
			              ],
			              "comparisonRefs": [
			                {
			                  "refName": "REF_MASTER_NC_004102",
			                  "refDisplayName": "Hepatitis C Virus Reference (NC_004102)"
			                },
			                {
			                  "refName": "REF_2_D00944",
			                  "refDisplayName": "Genotype 2 Reference (D00944)"
			                },
			                {
			                  "refName": "REF_2b_D10988",
			                  "refDisplayName": "Subtype 2b Reference (D10988)"
			                }
			              ],
			              "visualisationUtilityModule": "phdrVisualisationUtility",
			              "targetReferenceName": "REF_2b_D10988",
			              "queryNucleotides": "GCCCGCCCCCTGATGGGGGCGACACTCCGCCATGAATCACTCCCCTGTGAGGAACTACTGTCTTCACGCAGAAAGCGTCTAGCCATGGCGTTAGTATGAGTGTCGTACAGCCTCCAGGCCCCCCCCTCCCGGGAGAGCCATAGTGGTCTGCGGAACCGGTGAGTACACCGGAATTGCCGGAAAGGCTGGGTCCTTTCTTGGATTAACCCACTCTATGTCCGGTCATTTGGGCGTGCCCCCGCAAGACTGCTAGCCTAGTAGCGTTGGGTTGCGAACGGCCTTGTGGTACTGCCTGATAGGGTGCTTGCGAGTGCCCCGGGAGGTCTCGTAGACCGTGCATCATGAGCACAAATCCTAAACCTCAAAGAAAAACCAAAAGAAACACAAACCGCCGCCCACAGGACGTCAAGTTCCCGGGTGGCGGCCAGATCGTTGGCGGAGTTTACTTGCTGCCGCGCAGGGGCCCCAGGTTGGGTGTGCGCGCGACGAGGAAGACTTCCGAGCGATCCCAGCCGCGTGGGAGACGCCAGCCCATCCCAAAAGATCGGCGCTCCACCGGCAAGTCCTGGGGAAAGCCAGGATATCCTTGGCCCCTGTACGGAAACGAGGGCTGCGGATGGGCAGGCTGGCTCCTGTCCCCCCGCGGGTCTCGTCCTACTTGGGGCCCCACCGACCCCCGGCATAGATCACGCAATTTGGGCAAGGTCATCGATACCATTACGTGTGGTTTTGCCGACCTCATGGGGTACATCCCTGTCGTTGGCGCCCCGGTCGGAGGCGTCGCCAGAGCCCTGGCACACGGTGTTAGGGTCCTGGAAGACGGGGTAAATTTTGCAACAGGGAATCTGCCTGGTTGCTCTTTTTCTATCTTCTTGCTTGCTCTTCTGTCATGCGTCACAGTGCCAGTGTCTGCAGTGGAAGTTAGAAACATCAGTACTAGCTACTACGCCACTAACGACTGCTCGAATAGCAGCATCACCTGGCAGCTCATTGACGCAGTTCTCCACCTTCCCGGATGCGTCCCATGTGAGAATGATAATGGCACCTTGCGATGTTGGATACAAGTAACACCTAATGTGGCTGTGAGACACCGCGGCGCACTTACCCGCAACCTGCGAACACATGTCGACATGATCGTGATGGCAGCTACGGTCTGCTCGGCCTTGTACGTAGGAGATATATGCGGGGCCGTGATGATTGTGTCGCAGGCTTTCATAATATCGCCAGAACACCGCAACTTTACCCAAGAGTGCAATTGTTCCATCTACCAAGGCCATGTCACCGGCCACCGTATGGCATGGGACATGATGCTAAACTGGTCACCAACCCTTACCATGGCCCTCGCCTACGTTGCTCGCATTCCTGAGATGGTCCTTGAAGTTATTTTCGGTGGCCATTGGGGTGTGGTGTTTGGCTTGGCCTACTTCTCCATGCAGGGAGCGTGGGCCAAAGTCATTGCCATCCTCCTCCTTGTCGCAGGAGTAGATGCAACTACCTATTCCACCGGTGCACAAGCGGGTCGTACTACTAGTGGGTTCGCTGGCTTATTTAGCTCTGGCTCCAAACAGAACATCCAGTTAATCAATAGCAATGGTAGCTGGCACATAAACCGGACCGCTCTCAATTGCAATGACAGCTTGCAAACGGGTTTCCTCGCCTCCCTGTTTTACACCCACAGCTTCAACAGCTCTGGCTGCCCCGAGCGCTTGTCTTCCTGCCGTGGACTGGACGATTTCCGCATCGGGTGGGGAACCTTGGAATACGAAACTAATGTCACCAATGAGGAGGACATGAGGCCGTACTGCTGGCATTACCCTCCGAAGCCTTGCGGTATCGTCTCGGCTAGGACGGTTTGCGGGCCGGTCTACTGTTTCACTCCCAGCCCTGTTGTCGTGGGTACCACTGACAAGCAAGGAGTGCCCACCTATACTTGGGGGGTAAACGAGACTGATGTCTTCCTGCTAAATAGCACAAGACCCCCGCAAGGAGCTTGGTTCGGCTGCACCTGGATGAACGGGACTGGGTACACTAAGACTTGCGGTGCACCACCTTGCCGCATTAGGAGGGATTACAACGCAACCCTCGATCTATTGTGCCCCACGGATTGTTTTAGGAAGCACCCAGAGACCACTTATCTCAAGTGTGGAGCAGGGCCTTGGTTGACCCCCAAGTGCCTGGTTGACTACCCTTATAGATTGTGGCATTATCCGTGCACTCTGAATTTCACCATCTTCAAGGTACGGATGTATGTGGGGGGGGTGGAGCACCGGTTGTCTGCAGCATGTAACTTCACGCGTGGGGACCGCTGCAGATTGGAAGACAGGGATAGGGGTCAGCAGAGTCCATTATTGCATTCCACCACTGAGTGGTCAGTGCTTCCATGCTCCTTCTCTGACCTACCGGCTCTATCTACTGGTCTATTACACCTCCACCAAAACATCGTGGACGTGCAGTACCTCTATGGACTTTCCCCAGCCATCACAAGACACATCGTGAAGTGGGAATGGGTGATCCTCCTTTTCTTGCTGTTGGCAGACGCCAGGGTCTGTGCATGCCTTTGGATGCTCATCATACTGGGCCAGGCCGAGGCAGCGCTTGAAAAGCTCATTATCTTACACTCCGCTAGCGCTGCTAGTACCTATGGGCCACTATGGTTCTTCATCTTCTTTATAGCGGCCTGGTACTTAAAGGGCAGGGTGGTCCCTGTGGCCACGTACTCTGTTCTCGGCTTGTGGTCCTTTCTCCTCTTAGTCTTGGCCCTACCACAGCAGGCTTATGCTTTGGACGCCACTGAGCAAGGGGAACTTGGGCTGGTCGTATTGGTAACCATATCCATCTTTACCCTCACCCCGGCATACAAGATTCTCCTGAGCCGTTCAGTGTGGTGGCTGTCCTACATGCTGGTCCTGGCTGAGGCCCAGGTCCAGCAATGGGTTCCCCCTTTAGAGGCTCGAGGGGGGCGCGACGGGATCATTTGGGTGGCTGTCATTCTACACCCACGCCTTGTGTTTGAGGTCACTAAATGGTTATTGGCAATCCTGGGGCCTGCCTACCTCCTTCGAGCATCTTTGCTACGGGTACCATACTTCGTGAGGGCCCACGCCCTACTACGAGTGTGCACCCTGGTGAGACACCTCGCAGGAGCTAGGTACATCCAGATGTTGCTGATTACCATAGGTAGGTGGACCGGTACATATATATATGACCACCTCTCCCCTTTGTCAACTTGGGCAGCTCAGGGTTTACGGGACCTAGCGGTCGCCGTGGAGCCCGTGGTGTTTAGCCCAATGGAGAAGAAGGTAATTGTGTGGGGGGCTGAAACAGTGGCATGCGGGGACATCCTGCATGGTCTTCCGGTTTCCGCGAGACTAGGTAGGGAAGTTCTGCTTGGCCCCGCCGATGGCTACACCTCGAAGGGGTGGAAGCTCCTAGCCCCCATAACTGCTTATACGCAGCAGACTCGTGGCCTTCTGGGTGCCATCGTGGTCAGCTTAACGGGCCGCGATAAAAACGAGCAGGCTGGGCAGGTCCAGGTTCTGTCCTCCGTCACACAATCTTTCTTAGGGACATCTATCTCAGGGGTTCTCTGGACAGTATATCATGGGGCTGGCAACAAGACCTTGGCCGGCCCCAAAGGACCAGTCACTCAGATGTACACCAGCGCAGAGGGAGACCTCGTGGGGTGGCCTAGCCCTCCAGGGACTAAGTCTTTAGACCCCTGTACCTGCGGGGCCGTGGACCTCTACTTGGTCACCCGAAACGCTGATGTCATTCCGGTCCGGAGAAAAGATGACCGGCGGGGTGCACTACTCTCGCCAAGGCCTCTCTCAACCCTCAAAGGATCATCCGGTGGACCTGTGCTCTGCTCCAGAGGGCACGCTGTGGGCTTGTTTAGAGCGGCTGTGTGCGCCAGGGGTGTGGCCAAATCTATTGACTTTATCCCCGTTGAATCTCTTGACATTGCAGCACGGTCGCCCAGTTTTTCTGATAACAGCACGCCACCAGCTGTGCCTCAGACTTTCCAGGTGGGCTACTTGCACGCACCAACAGGTAGCGGGAAGAGCACCAAGGTCCCTGCCGCGTATGCCAGTCAGGGGTATAAAGTACTTGTACTAAATCCCTCTGTCGCGGCTACACTCGGTTTTGGGGCCTACATGTCTAAAGCCCACGGGATCAACCCCAACATTAGAACCGGGGTACGGACCGTGACCACCGGGGACCCTATCACCTACTCCACTTATGGCAAGTTTCTCGCAGACGGAGGCTGCTCAGCAGGCGCCTATGACGTCATTATATGCGATGAATGCCATTCCGTGGACTCCACTACCATCCTCGGCATTGGGACGGTCCTCGACCAGGCTGAGACCGCAGGCGCCAGGCTGGTGGTGTTGGCCACAGCCACACCTCCTGGCACAGTGACAACTCCCCATAGCAACATAGAGGGAGTGGCCCTTGGTCATGAAGGCGAGATCCCTTTCTACGGCAAGGCTATTCCCCTAGCTTACATCAAGGGGGGCAGACACCTGATCTTCTGCCATTCAAAGAAGAAGTGCGATGAGTTCGCAGCAGCCCTTCGGGGCATGGGTGTCAATGCCGTTGCTTACTATAGGGGTCTCGACGTCTCCGTTATACCAACCCAAGGAGACGTGGTGGTTGTTGCCACCGATGCCTTAATGACTGGATACTCCGGTGACTTTGACTCTGTCATCGACTGCAATGTTGCAGTCACTCAGGTTGTTGATTTTAGCCTAGACCCAACCTTTACCATCACCACGCAAACTGTCCCCCAAGATGCTGTCTCTCGTAGCCAACGTAGAGGGAGAACTGGGAGGGGGCGGCTGGGCGTTTACAGGTACGTCTCGTCAGGTGAAAGGCCGTCCGGGATGTTCGACAGCGTAGTGCTCTGCGAGTGCTATGATGCCGGGGCAGCCTGGTACGAACTCACGCCTGCTGAGACCACAGTGAGACTCCGGGCTTATTTCAACACGCCGGGTCTGCCCGTGTGTCAAGATCACCTAGAGTTCTGGGAGGCAGTCTTCACAGGTCTCACACACATCGATGCCCACTTCCTCTCCCAAACGAAGCAAGGAGGAGATAACTTTGCGTATCTGACAGCCTACCAGGCTACAGTATGCGCTAGGGCAAAGGCCCCCCCACCTTCGTGGGACATGATGTGGAAATGTCTAACTAGGCTCAAACCTACACTAACTGGTCCTACCCCCCTCCTGTACCGCTTAGGTGCCGTGACCAACGACGTCACCCTGACACACCCCGTGACGAAATACATCGCCACGTGCATGCAAGCTGACCTTGAGGTCATGACGAGCACATGGGTTCTGGCAGGGGGGGTGCTAGCTGCCGTGGCAGCTTACTGCCTGGCAACTGGCTGCATTTCCATCATCGGCCGCCTGCACCTGAATGATCGGGTGGTTGTGGCCCCTGATAAGGAGATTTTATACGAGGCCTTTGATGAGATGGAAGAGTGCGCCTCCAAAACCGCCCTCATTGAGGAAGGGCAGAGGATAGCGGAGATGCTCAAATCTAAGATACAAGGCCTCTTACAACAGGCCACAAGACAGGCCCAAGACATACAGCCAGCCATAGAGTCATCATGGCCCAAGCTTGAACAATTTTGGGCCAAACATATGTGGAATTTCATCAGTGGCATACAATACCTGGCGGGACTTTCTACTCTACCAGGGAATCCCGCAGTGGCATCAATGATGGCTTTCAGCGCCGCGTTGACTAGCCCACTATCTACCAGCACCACCATCCTCTTGAACATCATGGGGGGATGGTTGGCCTCTCAGATTGCCCCCCCTGCTGGAGCCACTGGCTTCGTTGTCAGTGGTCTAGTTGGGGCGGCCGTCGGAAGTATAGGCCTGGGCAAGATACTGGTGGATGTCCTGGCCGGGTATGGCGCAGGTATTTCAGGAGCTCTCGTAGCTTTTAAGATCATGAGCGGCGAGAAGCCCTCGGTAGAAGATGTCGTAAATCTCCTGCCTGCTATCTTGTCTCCTGGCGCTTTGGTAGTGGGAGTCATCTGTGCAGCGATCTTGCGCCGCCATGTCGGCCAGGGAGAGGGGGCGGTCCAGTGGATGAACAGACTGATCGCTTTCGCCTCCCGAGGAAACCATGTTGCCCCTACCCACTACGTGGCAGAGTCTGATGCCTCGCAGCGCGTAATGCAAGTGTTGAGTTCACTCACAATTACCAGCTTGCTTAGGAGACTACATACCTGGATCACTGAAGAATGCCCAGTCCCATGCTCGGGGTCTTGGCTCCGGGACATTTGGGATTGGGTTTGTTCCATTCTCACAGACTTTAAGAACTGGCTGTCTTCAAAATTACTCCCCAAAATGCCCGGCCTTCCCTTTATCTCTTGTCAAAAGGGGTATAAGGGTGTATGGGCTGGCACGGGGGTCATGACTACCCGGTGTCCATGCGGAGCAAACATTTCGGGCCATGTCCGCATGGGCACCATGAAAATAACAGGCCCGAAGACCTGCTTGAACATGTGGCAGGGGACCTTCCCTATCAATTGTTACACAGAAGGGCCTTGTGTGCCAAAACCCCCTCCTAATTACAAGACCGCAATTTGGAGGGTGGCAGCGTCGGAGTACGTTGAGATCACGCAGCACGGCTCTTTCTCGTATGTAACGGGGTTAACCAGTGACAACCTTAAGGTCCCTTGCCAGGTACCAGCTCCAGAATTCTTCTCTTGGGTGGACGGAGTGCAGATACATCGATTCGCCCCCACTCCAGGTCCCTTCTTTCGAGATGAGGTAGTGTTCACCGTGGGCCTCAATTCCTTCGTGGTCGGCTCTCAGCTCCCTTGCGACCCTGAGCCGGACACTGAGGTATTGGCCTCAATGTTAACAGACCCGTCACACATCACAGCGGAGACGGCGGCCAGGCGATTGGCCAGGGGATCTCCCCCCTCACAGGCCAGTTCTTCAGCAAGCCAGCTCTCCGCCCCGTCTTTGAAGGCCACCTGTACCACCCATAAGATGGCATATGACTGTGACATGGTGGATGCTAACCTTTTCATGGGAGGTGATGTGACCCGGATTGAGTCCGACTCTAAGGTCATTGTCCTCGACTCCCTCGATTCTATGACCGAGGTAGAGGACGATCGTGAGCCTTCCATACCATCAGAGTACTTGATCAGGAGGAAAAAGTTTCCACCGGCGCTACCTCCCTGGGCCCGTCCAGAGTACAACCCGCCTGTGCTCGAGACATGGAAGAGGCCGGACTATGAACCACCCACTGTCCTAGGCTGTGCCCTCCCCTCCACGCTCCAAGCGCCAGTGCCCCCACCTCGGAGGCGCCGCGCCAAAGTCCTAACTCAGGACAATGTAGAGGGGGTCCTCAGGGAGATGGCGGACAATGTGCTCAGCCCTCTCCAAGATTGCAATGACTCCGGTCACTCCACTGGGGTGGACACCGGAGGAGACAGCGTCCAGCAACCCTCTGACGAGACCGCTACTTCAGAAGCGGGATCACTGTCCTCCATGCCTCCCCTTGAGGGAGAGCCGGGGGACCCAGACTTGGAGTTCCGACAAGCCGGATCCACTCCCCCTTCCGAGGGGGAGTGTGAGGTCATTGATTCGGACTCTAAGTCATGGTCCACAGTCTCTGATCAAGAGGATTCTGTCATCTGCTGCTCTATGTCATACTCCTGGACAGGGGCCCTCATAACACCATGTGGACCCGAGGAGGAGAAGTTGCCAATTAACCCTCTGAGCAATTCGCTCATGCGGTTTCACAACAAGGTGTACTCCACAACCTCAAGGAGCGCTTCTCTGAGGGCAAAGAAGGTGACCTTTGACAGGGTGCAGGTGCTGGACGCGCACTACGACTCAGTCTTGCAGGACGTTAAGCGGGCCGCCTCTAAGGTTAGTGCGAGGCTCCTCTCAGTAGAGGAAGCCTGCGCGCTGACCCCGCCCCACTCCGCCAAATCAAAGTACGGATATGGGGCAAAAGAGGTGCGCAGCTTATCCAGGAGGGCCATTAACCACATCCGGTCCGTGTGGGAGGACCTCCTGGAAGACCAACATACTCCAATTGACACAACTATCATGGCCAAAAATGAGGTGTTCTGTATCGACCCCGCCAAAGGCGGGAAGAAGGCAGCTCGCCTCATCGTGTACCCTGACCTTGGAGTCCGGGTGTGCGAAAAGATGGCCCTCTATGACATTGCACAAAAGCTTCCCAAGGCAATAATGGGGCCATCCTATGGGTTCCAATACTCTCCTGCAGAACGGGTCGATTTTCTCCTCAAGGCTTGGGGAAGTAAGAAGGACCCAATGGGGTTCTCGTATGACACCCGCTGCTTTGACTCAACCGTCACGGAGAGAGACATAAGAACAGAAGAATCCATATATCAGGCTTGCTCCTTGCCTCAAGAGGCCAGAACTGTCATACACTCGCTCACTGAGAGACTTTACGTAGGAGGGCCCATGACAAACAGCAAAGGGCAATCCTGCGGCTACAGGCGTTGCCGCGCAAGCGGTGTTTTCACCACCAGCATGGGGAATACTATGACATGTTACATCAAAGCCCTTGCAGCGTGCAAAGCTGCAGGGATCTTGAACCCTACCATGCTGGTGTGTGGAGACGACCTGGTTGTCATCTCAGAGAGCCAAGGCAACGAGGAGGATGAGCGAAACCTGAGAGCTTTCACGGAGGCTATGACCAGGTATTCAGCCCCCCCCGGTGACCTTCCCAGACCTGAATATGACTTGGAGCTTATAACATCCTGCTCCTCAAATGTATCGGTAGCGCTGGACCCTCGGGGTCGCCGCCGGTACTACCTAACTAGAGACCCTACCACTCCAATTTCCCGAGCCGCTTGGGAAACAGTAAGACACTCCCCTGTCAATTCTTGGCTGGGCAACATCATTCAATACGCCCCCACAATCTGGGTCCGGATGGTCATAATGACCCATTTCTTCTCCATACTGTTGGCCCAGGACACTCTGAACCAAAATCTCAATTTTGAGCTGTACGGGGCAGTATATTCGGTCAATCCATTAGACCTACCAGCCATAATTGAAAGGCTACATGGGCTTGACGCCTTTTCACTGCACACATACTCTCCCCACGAACTCTCGCGGGTGGCAGCGACTCTCAGAAAACTTGGAGCGCCACCCCTTAGAGCGTGGAAGAGCCGGGCACGTGCTGTGAGGGCTTCACTCATCGTCCAGGGAGGGAGAGCGGCCATTTGTGGCCGCTACCTCTTCAACTGGGCGGTGAAGACAAAGCTCAAACTCACTCCATTGCCCGAGGCGGCCCGCCTGGATTTATCCGGGTGGTTCACCGTGGGCGCCGGCGGGGGCGACATCTTTCACAGCGTGTCGCATGCCCGACCCCGCTTATTACTCCTGTGCCTACTCCTACTTAGCGTAGGAGTAGGCATCTTTTTACTCCCCGCTCGGTAGAGCGGCAAACCCTAGCTACACTCCATAGCTAGTTTCCGTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
			              "queryToTargetRefSegments": [
			                {
			                  "refStart": 1,
			                  "refEnd": 341,
			                  "queryStart": 1,
			                  "queryEnd": 341
			                },
			                {
			                  "refStart": 342,
			                  "refEnd": 9443,
			                  "queryStart": 342,
			                  "queryEnd": 9443
			                },
			                {
			                  "refStart": 9444,
			                  "refEnd": 9511,
			                  "queryStart": 9444,
			                  "queryEnd": 9511
			                }
			              ]
			            }
			          },
			          "publications": [
			            {
			              "id": "28498551",
			              "authors_short": "Gane et al.",
			              "authors_full": "E. J. Gane, M. L. Shiffman, K. Etzkorn, G. Morelli, C. A. M. Stedman, M. N. Davis, F. Hinestrosa, H. Dvory-Sobol, K. C. Huang, A. Osinusi, J. McNally, D. M. Brainard, J. G. McHutchison, A. J. Thompson, M. S. Sulkowski and GS-US-342-1553 Investigators",
			              "title": "Sofosbuvir-velpatasvir with ribavirin for 24 weeks in hepatitis C virus patients previously treated with a direct-acting antiviral regimen.",
			              "year": "2017",
			              "journal": "Hepatology",
			              "volume": "66",
			              "issue": "4",
			              "pages": "1083-1089",
			              "url": "https://doi.org/10.1002/hep.29256",
			              "index": 1
			            },
			            {
			              "id": "EASL_2013_Poster_1191",
			              "authors_short": "Cheng et al.",
			              "authors_full": "G. Cheng, M. Yu, B. Peng, Y.-J. Lee, A. Trejo-Martin, R. Gong, C. Bush, A. Worth, M. Nash, K. Chan, H. Yang, R. Beran, Y. Tian, J. Perry, J. Taylor, C. Yang, M. Paulson, W. Delaney and J.O. Link",
			              "title": "GS-5816, A SECOND GENERATION HCV NS5A INHIBITOR WITH POTENT ANTIVIRAL ACTIVITY, BROAD GENOTYPIC COVERAGE AND A HIGH RESISTANCE BARRIER",
			              "year": "2013",
			              "journal": "J. Hepatol.",
			              "volume": "58",
			              "issue": "Supplement 1",
			              "pages": "S484-S485",
			              "url": "https://doi.org/10.1016/S0168-8278(13)61192-7",
			              "index": 2
			            }
			          ],
			          "reportGenerationDate": "13/09/2018",
			          "engineVersion": "1.0.16",
			          "projectVersion": "0.1.30",
			          "extensionVersion": "0.1.7",
			          "phdrSamThresholds": {
			            "minDepth": 10,
			            "minMapQ": 5,
			            "minQScore": 5,
			            "minReadProportionPct": 15
			          }
			        }
			      },
			      {
			        "phdrReport": {
			          "sequenceDataFormat": "FASTA",
			          "filePath": "example_mix_2a_2b_3a_3b.fasta",
			          "sequenceResult": {
			            "id": "AB691595.REF_3a_D17763.example",
			            "isForwardHcv": true,
			            "isReverseHcv": false,
			            "genotypingResult": {
			              "queryName": "AB691595.REF_3a_D17763.example",
			              "queryCladeCategoryResult": [
			                {
			                  "categoryName": "genotype",
			                  "categoryDisplayName": "Genotype",
			                  "queryCladeResult": [
			                    {
			                      "cladeName": "AL_3",
			                      "cladeRenderedName": "HCV Genotype 3",
			                      "percentScore": 100
			                    }
			                  ],
			                  "finalClade": "AL_3",
			                  "finalCladeRenderedName": "HCV Genotype 3",
			                  "closestMemberAlignmentName": "AL_3a",
			                  "closestMemberSourceName": "ncbi-refseqs",
			                  "closestMemberSequenceID": "NC_009824",
			                  "closestTargetAlignmentName": "AL_3a",
			                  "closestTargetSourceName": "ncbi-refseqs",
			                  "closestTargetSequenceID": "NC_009824",
			                  "shortRenderedName": "3"
			                },
			                {
			                  "categoryName": "subtype",
			                  "categoryDisplayName": "Subtype",
			                  "queryCladeResult": [
			                    {
			                      "cladeName": "AL_3a",
			                      "cladeRenderedName": "HCV Subtype 3a",
			                      "percentScore": 100
			                    }
			                  ],
			                  "finalClade": "AL_3a",
			                  "finalCladeRenderedName": "HCV Subtype 3a",
			                  "closestMemberAlignmentName": "AL_3a",
			                  "closestMemberSourceName": "ncbi-refseqs",
			                  "closestMemberSequenceID": "NC_009824",
			                  "closestTargetAlignmentName": "AL_3a",
			                  "closestTargetSourceName": "ncbi-refseqs",
			                  "closestTargetSequenceID": "NC_009824",
			                  "shortRenderedName": "3a"
			                }
			              ],
			              "genotypeCladeCategoryResult": {
			                "categoryName": "genotype",
			                "categoryDisplayName": "Genotype",
			                "queryCladeResult": [
			                  {
			                    "cladeName": "AL_3",
			                    "cladeRenderedName": "HCV Genotype 3",
			                    "percentScore": 100
			                  }
			                ],
			                "finalClade": "AL_3",
			                "finalCladeRenderedName": "HCV Genotype 3",
			                "closestMemberAlignmentName": "AL_3a",
			                "closestMemberSourceName": "ncbi-refseqs",
			                "closestMemberSequenceID": "NC_009824",
			                "closestTargetAlignmentName": "AL_3a",
			                "closestTargetSourceName": "ncbi-refseqs",
			                "closestTargetSequenceID": "NC_009824",
			                "shortRenderedName": "3"
			              },
			              "subtypeCladeCategoryResult": {
			                "categoryName": "subtype",
			                "categoryDisplayName": "Subtype",
			                "queryCladeResult": [
			                  {
			                    "cladeName": "AL_3a",
			                    "cladeRenderedName": "HCV Subtype 3a",
			                    "percentScore": 100
			                  }
			                ],
			                "finalClade": "AL_3a",
			                "finalCladeRenderedName": "HCV Subtype 3a",
			                "closestMemberAlignmentName": "AL_3a",
			                "closestMemberSourceName": "ncbi-refseqs",
			                "closestMemberSequenceID": "NC_009824",
			                "closestTargetAlignmentName": "AL_3a",
			                "closestTargetSourceName": "ncbi-refseqs",
			                "closestTargetSequenceID": "NC_009824",
			                "shortRenderedName": "3a"
			              }
			            },
			            "targetRefName": "REF_3a_NC_009824",
			            "rasScanResults": [
			              {
			                "referenceName": "REF_MASTER_NC_004102",
			                "featureName": "NS3",
			                "variationName": "phdr_ras:NS3:166T",
			                "variationType": "aminoAcidSimplePolymorphism",
			                "matches": [
			                  {
			                    "firstRefCodon": "166",
			                    "lastRefCodon": "166",
			                    "queryAAs": "T",
			                    "refNtStart": 3915,
			                    "refNtEnd": 3917,
			                    "queryNtStart": 3931,
			                    "queryNtEnd": 3933,
			                    "queryNts": "ACC",
			                    "combinedTripletFraction": 1
			                  }
			                ],
			                "rasDetails": {
			                  "referenceName": "REF_MASTER_NC_004102",
			                  "featureName": "NS3",
			                  "name": "phdr_ras:NS3:166T",
			                  "type": "aminoAcidSimplePolymorphism",
			                  "gene": "NS3",
			                  "structure": "166T",
			                  "displayName": null,
			                  "description": null,
			                  "metatag": [
			                    {
			                      "name": "SIMPLE_AA_PATTERN",
			                      "value": "T"
			                    }
			                  ],
			                  "alignmentRas": [
			                    {
			                      "displayStructure": "A166T",
			                      "clade": {
			                        "alignmentName": "AL_3a",
			                        "displayName": "HCV Subtype 3a"
			                      },
			                      "parentClade": {
			                        "alignmentName": "AL_3",
			                        "displayName": "HCV Genotype 3"
			                      },
			                      "alignmentRasDrug": [
			                        {
			                          "drug": "glecaprevir",
			                          "resistanceCategory": "category_II",
			                          "displayResistanceCategory": "II",
			                          "resistanceFinding": [
			                            {
			                              "inVitroResult": {
			                                "minEC50FoldChange": 4.7,
			                                "maxEC50FoldChange": 4.7,
			                                "midpointEC50FoldChange": 4.7,
			                                "rangeEC50FoldChange": "4.7"
			                              },
			                              "publication": {
			                                "id": "EASL_2017_FRI_205",
			                                "displayName": "Krishnan et al., 2017",
			                                "url": "https://doi.org/10.1016/S0168-8278(17)31399-5",
			                                "index": 1
			                              }
			                            },
			                            {
			                              "inVivoResult": {
			                                "foundAtBaseline": true,
			                                "treatmentEmergent": false,
			                                "clinicalTrial": [
			                                  {
			                                    "id": "Surveyor-1",
			                                    "displayName": "Surveyor-1",
			                                    "nctId": "NCT02243280"
			                                  },
			                                  {
			                                    "id": "Surveyor-2",
			                                    "displayName": "Surveyor-2",
			                                    "nctId": "NCT02243293"
			                                  }
			                                ],
			                                "cohortDescription": null,
			                                "regimen": [
			                                  {
			                                    "id": "GLE_PIB",
			                                    "displayName": "GLE/PIB"
			                                  }
			                                ]
			                              },
			                              "publication": {
			                                "id": "28412293",
			                                "displayName": "Kwo et al., 2017",
			                                "url": "https://doi.org/10.1016/j.jhep.2017.03.039",
			                                "index": 2
			                              }
			                            }
			                          ],
			                          "numFindings": 2
			                        }
			                      ],
			                      "numFindings": 2
			                    }
			                  ],
			                  "numFindings": 2
			                }
			              }
			            ],
			            "drugScores": [
			              {
			                "category": "NS3/4A protease inhibitors",
			                "drugAssessments": [
			                  {
			                    "drug": {
			                      "id": "glecaprevir",
			                      "category": "NS3/4A protease inhibitors"
			                    },
			                    "drugScore": "moderate_resistance",
			                    "drugScoreDisplay": "Moderate resistance",
			                    "drugScoreDisplayShort": "Moderate",
			                    "rasScores_category_I": [],
			                    "rasScores_category_II": [
			                      {
			                        "gene": "NS3",
			                        "structure": "166T",
			                        "displayStructure": "A166T",
			                        "category": "category_II"
			                      }
			                    ],
			                    "rasScores_category_III": []
			                  },
			                  {
			                    "drug": {
			                      "id": "voxilaprevir",
			                      "category": "NS3/4A protease inhibitors"
			                    },
			                    "drugScore": "susceptible",
			                    "drugScoreDisplay": "Susceptible",
			                    "drugScoreDisplayShort": "Susceptible",
			                    "rasScores_category_I": [],
			                    "rasScores_category_II": [],
			                    "rasScores_category_III": []
			                  }
			                ]
			              },
			              {
			                "category": "NS5A inhibitors",
			                "drugAssessments": [
			                  {
			                    "drug": {
			                      "id": "pibrentasvir",
			                      "category": "NS5A inhibitors"
			                    },
			                    "drugScore": "susceptible",
			                    "drugScoreDisplay": "Susceptible",
			                    "drugScoreDisplayShort": "Susceptible",
			                    "rasScores_category_I": [],
			                    "rasScores_category_II": [],
			                    "rasScores_category_III": []
			                  },
			                  {
			                    "drug": {
			                      "id": "velpatasvir",
			                      "category": "NS5A inhibitors"
			                    },
			                    "drugScore": "susceptible",
			                    "drugScoreDisplay": "Susceptible",
			                    "drugScoreDisplayShort": "Susceptible",
			                    "rasScores_category_I": [],
			                    "rasScores_category_II": [],
			                    "rasScores_category_III": []
			                  }
			                ]
			              },
			              {
			                "category": "NS5B RNA polymerase inhibitors",
			                "drugAssessments": [
			                  {
			                    "drug": {
			                      "id": "sofosbuvir",
			                      "category": "NS5B RNA polymerase inhibitors"
			                    },
			                    "drugScore": "susceptible",
			                    "drugScoreDisplay": "Susceptible",
			                    "drugScoreDisplayShort": "Susceptible",
			                    "rasScores_category_I": [],
			                    "rasScores_category_II": [],
			                    "rasScores_category_III": []
			                  }
			                ]
			              }
			            ],
			            "visualisationHints": {
			              "features": [
			                "precursor_polyprotein",
			                "Core",
			                "E1",
			                "E2",
			                "p7",
			                "NS2",
			                "NS3",
			                "NS4A",
			                "NS4B",
			                "NS5A",
			                "NS5B"
			              ],
			              "comparisonRefs": [
			                {
			                  "refName": "REF_MASTER_NC_004102",
			                  "refDisplayName": "Hepatitis C Virus Reference (NC_004102)"
			                },
			                {
			                  "refName": "REF_3_NC_009824",
			                  "refDisplayName": "Genotype 3 Reference (NC_009824)"
			                }
			              ],
			              "visualisationUtilityModule": "phdrVisualisationUtility",
			              "targetReferenceName": "REF_3a_NC_009824",
			              "queryNucleotides": "ACCTGCCTCTTACGAGGCGACACTCCACCATGGATCACTCCCCTGTGAGGAACTTCTGTCTTCACGCGGAAAGCGCCTAGCCATGGCGTTAGTACGAGTGTCGTGCAGCCTCCAGGACCCCCCCTCCCGGGAGAGCCATAGTGGTCTGCGGAACCGGTGAGTACACCGGAATCGCTGGGGTGACCGGGTCCTTTCTTGGAACAACCCGCTCAATACCCAGAAATTTGGGCGTGCCCCCGCGAGATCACTAGCCGAGTAGTGTTGGGTCGCGAAAGGCCTTGTGGTACTGCCTGATAGGGTGCTTGCGAGTGCCCCGGGAGGTCTCGTAGACCGTGCAACATGAGCACACTTCCTAAACCCCAAAGAAAAACCAAAAGAAACACCATCCGTCGCCCACAGGACGTCAAGTTCCCGGGTGGCGGACAGATCGTTGGTGGAGTATACGTGTTGCCGCGCAGGGGCCCACGGTTGGGTGTGCGCGCGGCGCGTAAAACTTCTGAACGGTCACAGCCTCGTGGACGGCGGCAGCCTATCCCCACGGCGCGTCGGAGCGAAGGCCGGTCCTGGGCTCAGCCCGGGTACCCTTGGCCCCTCTATGGTAATGAGGGCTGCGGGTGGGCAGGGTGGCTCCTGTCCCCGCGCGGCTCCCGTCCATCTTGGGGCCCGAACGACCCCCGGCGAAGGTCCCGCAACTTGGGTAAAGTCATCGATACCCTCACGTGCGGGTTCGCCGACCTCATGGGGTACATCCCGCTCGTCGGCGCTCCCGTAGGGGGCGTCGCAAGAGCTCTCGCGCATGGCGTGAGGGCCCTTGAAGACGGGATAAATTTCGCAACAGGGAACTTGCCTGGTTGCTCCTTTTCTATCTTCCTTCTTGCTCTGCTTTCTTGCTTAGTCCATCCTGCAGCTAGTTTAGAGTGGCGGAATGCATCTGGCCTCTACATCCTTACCAACGACTGTCCCAACAGCAGTATTGTGTATGAGGCCGATGATGTTATTCTGCACACACCCGGCTGTATACCTTGTGTTCAGGACGGCAATAAATCCACGTGCTGGACCTCAGTGACACCTACAGTGGCAGTCAGGTACGTCGGAGCAACCACCGCTTCGATACGCAGTCATGTGGACCTATTAGTGGGCGCGGCCACGATGTGCTCTGCGCTCTACGTGGGTGATATGTGTGGGGCCGTCTTCCTTGTGGGACAAGCCTTCACGTTCAGACCTCGTCGCCATCAAACGGTCCAGACCTGTAACTGCTCACTGTACCCGGGCCATCTCTCAGGACACCGAATGGCTTGGGATATGATGATGAACTGGTCCCCCGCTATGGGTATGGTGGTAGCGCACATCCTACGTCTGCCTCAGACCTTGTTTGACATAATAGCCGGGGCCCATTGGGGCATCTTGGCGGGGCTAGCCTATTACTCCATGCAGGGCAACTGGGCCAAGGTCGCTATCATCATGGTTATGTTTTCAGGGGTCGATGCCACTACATATACCACCGGTGGCGCAGTAGCTCATGGCGCCAAGGGACTAACTAGTCTTTTTAGTCTGGGCGCCCAACAGAAACTGCAGTTGGTCAACACCAATGGCTCCTGGCACATCAACAGGACTGCCCTGAACTGCAATGAGTCCATACACACGGGGTTCGTAGCTGGGTTGTTTTACTATCATAAGTTCAACTCTACTGGATGCCCTCAAAGGCTCAGCAGCTGCAAGCCCATCACTTCCTTCAAGCAGGGGTGGGGCTCCCTGACAGATGCTAACATCACCGGGTCTTCTGAGGACAAACCGTACTGCTGGCACTACGCACCCAGACCTTGCACAACTGTTCAAGCATCAAGTGTCTGCGGCCCTGTGTACTGCTTCACACCATCGCCAGTGGTTGTGGGCACTACTGATGCTGAGGGCGTCCCAACCTATACCTGGGGTGGAAATAAGACAGACGTGTTCCTGCTGAAGTCCTTGCGGCCTCCCAACGGTCAGTGGTTTGGGTGCACGTGGATGAACTCCACGGGGTTTACCAAGACGTGCGGGGCTCCCCCTTGTAACATCTATGGGGGTAAAGGGAGTCATCACAATGATTCAGACCTCATCTGCCCTACCGACTGTTTCAGGAAACATCCCGAGGCCACATACAGCCGGTGCGGTGCGGGGCCCTGGTTGACACCTCGATGCATGGTCGACTATCCATACCGGCTTTGGCATTACCCGTGCACAGTCAATTTTTCATTGTTCAAGGTGAGGATGTTTGTGGGTGGGTTTGAGCACCGGTTCACCGCCGCTTGCAACTGGACCAGGGGGGAGCGCTGCGATATCGAGGATCGCGACCGCAGCGAGCAACACCCGCTGCTGCATTCAACGACCGAGCTCGCTATACTGCCTTGCTCCTTCACGCCCATGCCTGCGTTGTCAACAGGTTTAATACACCTCCACCAAAACATCGTGGATGTCCAGTACCTTTATGGCGTTGGATCTGGCATGGTGGGATGGGCGCTGAAATGGGAGTTCGTCGTCCTCGTTTTCCTCCTCCTAGCAGACGCACGCGTGTGCGTTGCTCTTTGGCTGATGCTGATGATATCACAAGCAGAAGCAGCCTTGGAGAACCTTGTCACGCTGAACGCCATCGCTGCTGCCGGGACACATGGTATTGGTTGGTACTTTGTAGCCTTTTGCGCGGCATGGTACGTGCGGGGTAAGCTTGTCCCGCTGGTGACCTACAGCCTGACGGGTCTCTGGTCTCTGGCGTTGCTCGTCCTCTTGCTCCCCCAGCGGGCGTACGCCTGGTCAGGTGAAGACAGCGCTACTCTTGGCGCTGGGATCTTGGTCCTCTTTGGCTTCTTTACCTTGTCACCCTGGTATAAGCATTGGATCGGCCGCCTCATGTGGTGGAACCAGTACACCATATGTAGATGCGAGGCCGCCCTCCAAGTGTGGGTCCCCCCCTTACTCGCACGCGGGAGTAGGGACGGTGTTATCCTGCTAACAAGTCTGCTTTATCCATCTTTAATTTTTGACATCACCAAGCTACTGATAGCAGTATTGGGCCCATTATACTTAATACAGGCTGCCATCACTGCCACCCCCTACTTTGTGCGTGCACATGTATTGGTTCGCCTTTGCATGCTCGTGCGCTCTGTAATGGGGGGAAAATACTTCCAGATGATCATACTGAGCATTGGCAGATGGTTTAACACCTATCTGTACGACCACCTAGCGCCAATGCAATATTGGGCTGCAGCTGGCCTCAAAGACCTAGCAGTGGCCACTGAACCTGTGATATTTAGTCCCATGGAAACCAAGGTCATCACCTGGGGCGCGGACACAGCGGCTTGCGGAGATATTCTTTGCGGGCTGCCCGTCTCCGCGCGACTAGGCCGTGAGGTGTTGTTGGGACCTGCTGATGATTACCGGGAGATGGGTTGGCGCCTGTTGGCCCCAATCACAGCATACGCCCAGCAAACCAGGGGCCTTCTTGGGACTATTGTGACCAGCTTGACTGGCAGGGATAAGAATGTGGTGACCGGCGAAGTGCAGGTGCTTTCTACGGCTACCCAGACCTTCCTAGGTACAACAATAGGGGGGGTTATGTGGACTGTTTACCATGGCGCAGGCTCAAGGACACTTGCGGGCGCTAAACATCCTGCGCTCCAAATGTACACAAATGTAGATCAGGACCTCGTTGGGTGGCCAGCCCCTCCAGGGGCTAAGTCTCTTGAACCGTGCACCTGCGGGTCTGCAGACTTATACTTGGTTACCCGCGATGCTGACGTCATCCCCGCTCGGCGCAGGGGGGACTCCACAGCGAGCTTGCTCAGCCCTAGGCCTCTCGCCTGTCTCAAGGGCTCCTCTGGAGGTCCCGTTATGTGCCCTTCGGGGCATGTCACGGGGATCTTTCGGGCTGCTGTGTGCACCAGAGGTGTAGCAAAGACCCTACAGTTCATACCAGTGGAAACCCTTAGTACACAGACTAGGTCCCCATCCTTCTCTGACAATTCAACTCCTCCCGCCGTCCCACAGAGCTACCAAGTAGGGTATCTTCATGCCCCGACCGGTAGTGGCAAGAGCACAAAGGTCCCGGCCGCTTACGTAGCACAAGGATACCATGTTCTCGTGTTGAATCCATCAGTGGCGGCCACACTAGGCTTCGGCTCTTACATGTCGAAAGCCTATGGGATCGACCCCAACGTCCGCACTGGGAACCGCACTGTCACAACTGGTGCTAAACTGACCTATTCCACCTACGGTAAGTTTCTCGCGGATGGGGGTTGCTCTGGGGGAGCGTATGATGTGATTATTTGTGATGAATGCCATGCCCAAGACGCTACTACCATATTGGGTATTGGCACGGTCTTAGATCAGGCTGAGACGGCTGGGGTGAGGCTGACGGTTCTGGCGACAGCAACTCCCCCAGGCAGCATCACTGTGCCACATTCTAACATCGAGGAGGTAGCCCTGGGCTCTGAAGGTGAGATCCCTTTCTACGGTAAGGCTATACCGATAGCCCAGCTCAAGGGGGGGAGGCACCTTATCTTTTGCCATTCCAAGAAAAAGTGTGATGAGATAGCATCCAAGCTCAGAGGCATGGGGCTCAACGCTGTAGCATTCTATAGGGGTCTTGATGTGTCCATCATACCAACAGCAGGAGACGTCGTGGTTTGCGCCACTGACGCCCTCATGACTGGGTACACCGGAGACTTTGATTCTGTCATAGATTGCAACGTGACTGTTGAACAGTACGTTGACTTCAGCTTGGACCCCACCTTTTCCATTGAGACTCACACTGCTCCCCAAGACGCGGTTTCCCGCAGCCAACGTCGTGGCCGTACGGGCCGGGGTAGACTCGGCATATACCGATATGTCACCCCGGGTGAAAGACCGTCTGGAATGTTTGACTCGGTTGTTCTCTGTGAGTGCTATGATGCGGGCTGCTCGTGGTACGATCTGCAGCCCGCTGAGACTACAGTCAGACTGAGAGCTTACTTGTCCACGCCGGGTTTACCTGTCTGTCAAGACCATCTTGACTTTTGGGAGAGCGTCTTTACTGGACTAACTCACATAGATGCCCACTTTCTGTCACAGACTAAGCAGCAGGGACTCAACTTCCCGTACCTGACTGCCTACCAAGCCACTGTGTGCGCCCGCGCGCAGGCTCCTCCCCCAAGTTGGGACGAGACGTGGAAATGTCTCGTACGGCTTAAACCAACACTACATGGACCCACGCCCCTTCTGTATCGGTTGGGGCCTATCCAAAATGAAACCTGCTTGACACACCCCGTCACAAAATACATCATGGCATGCATGTCAGCTGATCTGGAAGTGACCACCAGCGCCTGGGTGTTGCTTGGAGGGGTGCTCGCGGCCCTAGCGGCTTACTGCTTGTCAGTCGGCTGCGTTGTGATCGTGGGTCATATTGAGCTGGGGGGCAAGCCAGCACTCGTTCCAGACAAAGAGGTGTTGTATCAACAATTCGATGAGATGGAGGAGTGCTCGCAAGCTGCCCCATATATCGAACAAGCTCAGGTAATAGCCCACCAGTTCAAGGAGAAAGTCCTTGGATTGCTGCAGCGAGCCACCCAACAACAAGCTGTCATTGAGCCCATAGTAGCTACCAACTGGCAAAAGCTTGAGGCGTTCTGGCACAAGCATATGTGGAATTTTGTGAGTGGGATCCAGTACCTAGCAGGCCTTTCCACTTTGCCTGGCAACCCCGCTGTGGCGTCTCTTATGGCGTTCACCGCTTCTGTCACCAGTCCCCTGACGACCAACCAAACTATGTTCTTCAACATACTCGGGGGGTGGGTTGCTACCCATTTGGCAGGGCCCCAGAGCTCTTCCGCATTCGTGGTAAGCGGCTTGGCCGGCGCTGCCATAGGGGGTATAGGCCTGGGCAGGGTCTTGATTGACATCCTGGCAGGATACGGAGCTGGTGTCTCAGGCGCCTTGGTGGCTTTTAAGATCATGGGAGGAGAACTCCCCACTGCTGAGGACATGGTCAACATGCTGCCTGCCATACTATCTCCGGGCGCCCTCGTTGTCGGTGTGATATGTGCAGCCATACTGCGTCGACACGTAGGACCTGGGGAGGGGGCGGTGCAGTGGATGAACAGGCTCATCGCATTCGCATCCCGGGGTAACCACGTCTCACCGACGCACTATGTCCCCGAGAGCGATGCTGCAGCGAAGGTTACTGCATTGCTGAGTTCTCTAACTGTCACAAGTCTGCTCCGGCGACTGCACCAGTGGATCAATGAAGACTACCCAAGTCCTTGCTGCGGCGACTGGCTGCGTACCATCTGGGACTGGGTTTGCATGGTGTTGTCTGACTTCAAGACATGGCTCTCCGCTAAGATTATGCCAGCGCTCCCTGGGCTGCCTTTCCTTTCCTGTCAGAAGGGATACAAGGGCGTGTGGCGGGGAGACGGTGTGATGTCGACACGCTGTCCTTGCGGGGCGACAATAACCGGTCATGTGAAGAATGGGTCTATGCGGCTTGCAGGGCCACGCACATGTGCTAACATGTGGCACGGTACTTTCCCCATCAATGAGTACACCACCGGACCCGGCACACCTTGCCCAGCACCCAACTACACTCGCGCATTATTGCGCGTGGCTGCCAACAGCTACGTTGAGGTGCGCCGGGTGGGGGACTTCCACTACATTACGGGGGCTACAGAAGATGAGCTCAAGTGTCCGTGCCAAGTGCCGGCCGCAGAGTTTTTTACTGAGGTGGATGGGGTGAGACTCCACCGTTACGCCCCTCCATGCAAGCCCCTGTTGAGGGATGAAATCACTTTCATGGTAGGGTTGAACTCCTACGCAATAGGATCTCAACTCCCCTGTGAGCCCGAACCAGATGTTTCTGTGCTGACCTCGATGTTGAGAGACCCTTCCCATATTACCGCTGAGGCAGCAGCGCGCCGCCTTGCGCGTGGGTCCCCTCCATCAGAGGCAAGCTCATCCGCCAGCCAACTGTCGGCTCCGTCGTTGAAGGCCACTTGTCAGTCGTATGGGCCTCATCTGGACGCTGAGCTAGTGGATGCCAACCTGTTATGGCGGCAGGAGATGGGCAGCACTATCACACGGGTAGAGTCTGAAACAAAGGTTGTGATTCTTGATTCATTCGAACCTCTGAGAGCCGAAACTGATGACGCCGAGCTCTCGGTGGCTGCAGAGTGTTTCAAGAAGCCTCCCAAGTATCCTCCAGCCCTTCCTATCTGGGCTAGGCCAGACTACAACCCTCCATTGTTAGACCGCTGGAAAGCACCGGATTATGTTCCACCAACTGTTCATGGATGCGCCTTACCACCACGGGGCGCTCCACCGGTGCCTCCCCCTCGGAGGAAGAGAACAATTCAGCTGGATGGCTCCAATGTGTCCGCGGCGCTAGCTGCGCTAGCAGAAAAGTCATTCCCGTCCTCAAAGCCGCAGGAAGAGAATAGCTCATCCTCAGGGGTCGACACACAGTCCAGCACTACCTCTAAGGTGCCCCCCCCCCCAGGAGGGGAATCCGACTCAGAGTCGTGCTCGTCCATGCCTCCTCTCGAGGGAGAGCCGGGCGATCCGGATTTGAGCTGCGACTCTTGGTCCACTGTGAGTGACAATGAGGAGCAGAACGTAGTCTGCTGCTCCATGTCGTACTCTTGGACCGGCGCCTTGATAACACCATGTAGTGCTGAGGAGGAGAAACTACCCATCAGCCCACTCAGCAACTCCTTGTTGAGACACCATAATCTGGTTTATTCAACGTCGTCAAGAAGCGCTTCTCAGCGTCAGAAGAAGGTTACCTTCGACAGGCTGCAGGTGCTCGACGACCACTACAAAACTGCTTTAAAGGAGGTAAAGGAGCGAGCGTCTGGGGTGAAGGCTCGCATGCTCACCATCGAGGAAGCGTGCAAGCTTGTCCCCCCCCACTCTGCCCGTTCGAAGTTCGGGTATAGTGCGAAGGACGCTCGTTCCTTGTCCAGCAGGGCCGTTAACCAGATCCGCTCCGTCTGGGAGGACTTGCTGGAAGACACCACAACTCCAATTCCAACAACCATCATGGCGAAGAACGAGGTGTTTTGTGTGGACCCCGTTAAGGGGGGCCGCAAGCCCGCTCGCCTCATTGTGTACCCTGACCTGGGGGTGCGTGTCTGTGAGAAACGCGCCCTATATGACGTGATACAGAAGTTGTCAATCGCGACGATGGGTCCTGCTTATGGATTCCAGTACTCGCCTCAGCAGCGGGTCGAACGTCTGCTGAAGATGTGGACCTCAAAGAGAACCCCCCTGGGGTTCTCGTATGACACCCGCTGCTTTGACTCGACTGTCACTGAACAGGATATCAGGGTGGAAGAGGAGATATATCAATGCTGTAACCTTGAACCGGAGGCCAGGAAGGTGATCTCCTCCCTCACGGAGCGGCTTTACTGCGGGGGCCCCATGTTCAACAGCAAGGGGGCCCAGTGCGGTTATCGCCGTTGCCGTGCTAGTGGAGTTCTACCGACCAGCTTTGGCAACACAATCACTTGTTACATCAAGGCCACAGCGGCTGCAAGGGCCGCGGGTCTCCGGAACCCGGACTTTCTTGTCTGCGGAGATGATTTGGTCGTGGTGGCCGAGAGTGATGGCGTCGACGAGGATAGGGCAGCCCTGAGAGCCTTCACGGAGGCTATGACCAGGTACTCTGCTCCACCCGGAGATGCTCCACAGCCTACCTACGACCTTGAGCTCATCACATCTTGCTCCTCTAACGTCTCCGTAGCACATGACAACAAGGGGAGGAGGTATTACTACCTCACCCGTGATGCCACTACTCCCCTGGCCCGTGCGGCTTGGGAAACAGCTCGTCACACTCCAGTTAACTCCTGGTTGGGCAACATCATCATGTACGCGCCTACCATCTGGGTGCGCATGGTGATGATGACACACTTTTTCTCCATACTCCAATCCCAGGAGATACTTGATCGCCCCCTTGATTTTGAAATGTACGGGGCCACTTACTCTGTCACTCCGCTGGATTTACCAGCAATCATTGAAAGACTCCATGGTCTAAGCGCGTTCACACTCCACAGTTACTCTCCAGTAGAACTCAATAGGGTCGCGGGGACACTCAGGAAGCTTGGGTGCCCCCCCCTACGAGCTTGGAGACATCGGGCACGAGCAGTGCGCGCTAAGCTTATTGCCCAGGGAGGTAAGGCCAAAATATGTGGCCTTTATCTCTTTAACTGGGCAGTACGCACCAAGACCAAACTCACTCCACTGCCAGCCGCTAGCCAGTTGGACTTATCCAATTGGTTTTCGGTTGGCGTCGGCGGGAACGACATTTATCACAGCGTGTCACATGCCCGAACCCGCCATTTGCTGCTTTGCCTACTCCTACTAACTGTAGGGGTAGGCATCTTTCTCCTGCCAGCACGATAAGCTGGTAGGATAACACTCCATTCCTTTTCCCTTGTTTTTATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTCTTTTTTTTTTTTTTTTTTTTTTTTTTGTTTTTCCTCTTTCCATTCTTTTCTAACCTTAAATTTTCCTTTCTTTAGGTGGCTCCATCTTAGCCCTAGTCACGGCTAGCTGTGAAAGGTCCGTGAGCCGCATGACTGCAGAGAGTGCCGTAACTGGTCTCTCTGCAGATCATGT",
			              "queryToTargetRefSegments": [
			                {
			                  "refStart": 1,
			                  "refEnd": 339,
			                  "queryStart": 1,
			                  "queryEnd": 339
			                },
			                {
			                  "refStart": 340,
			                  "refEnd": 9405,
			                  "queryStart": 340,
			                  "queryEnd": 9405
			                },
			                {
			                  "refStart": 9406,
			                  "refEnd": 9433,
			                  "queryStart": 9406,
			                  "queryEnd": 9433
			                },
			                {
			                  "refStart": 9434,
			                  "refEnd": 9441,
			                  "queryStart": 9437,
			                  "queryEnd": 9444
			                },
			                {
			                  "refStart": 9442,
			                  "refEnd": 9456,
			                  "queryStart": 9446,
			                  "queryEnd": 9460
			                }
			              ]
			            }
			          },
			          "publications": [
			            {
			              "id": "EASL_2017_FRI_205",
			              "authors_short": "Krishnan et al.",
			              "authors_full": "P. Krishnan, G. Schnell, R. Tripathi, T. Ng, T. Reisch, J. Beyer, T. Dekhtyar, M. Irvin, W. Xie, L. Larsen, F. Mensa, T. Pilot-Matias and C. Collins",
			              "title": "Pooled resistance analysis in HCV genotype 1–6-infected patients treated with glecaprevir/pibrentasvir in phase 2 and 3 clinical trials",
			              "year": "2017",
			              "journal": "J. Hepatol.",
			              "volume": "66",
			              "issue": "1",
			              "pages": "S500",
			              "url": "https://doi.org/10.1016/S0168-8278(17)31399-5",
			              "index": 1
			            },
			            {
			              "id": "28412293",
			              "authors_short": "Kwo et al.",
			              "authors_full": "P. Y. Kwo, F. Poordad, A. Asatryan, S. Wang, D. L. Wyles, T. Hassanein, F. Felizarta, M. S. Sulkowski, E. Gane, B. Maliakkal, J. S. Overcash, S. C. Gordon, A. J. Muir, H. Aguilar, K. Agarwal, G. J. Dore, C. W. Lin, R. Liu, S. S. Lovell, T. I. Ng, J. Kort and F. J. Mensa",
			              "title": "Glecaprevir and pibrentasvir yield high response rates in patients with HCV genotype 1-6 without cirrhosis.",
			              "year": "2017",
			              "journal": "J. Hepatol.",
			              "volume": "67",
			              "issue": "2",
			              "pages": "263-271",
			              "url": "https://doi.org/10.1016/j.jhep.2017.03.039",
			              "index": 2
			            }
			          ],
			          "reportGenerationDate": "13/09/2018",
			          "engineVersion": "1.0.16",
			          "projectVersion": "0.1.30",
			          "extensionVersion": "0.1.7",
			          "phdrSamThresholds": {
			            "minDepth": 10,
			            "minMapQ": 5,
			            "minQScore": 5,
			            "minReadProportionPct": 15
			          }
			        }
			      },
			      {
			        "phdrReport": {
			          "sequenceDataFormat": "FASTA",
			          "filePath": "example_mix_2a_2b_3a_3b.fasta",
			          "sequenceResult": {
			            "id": "KC844044.REF_3b_D49374.example",
			            "isForwardHcv": true,
			            "isReverseHcv": false,
			            "genotypingResult": {
			              "queryName": "KC844044.REF_3b_D49374.example",
			              "queryCladeCategoryResult": [
			                {
			                  "categoryName": "genotype",
			                  "categoryDisplayName": "Genotype",
			                  "queryCladeResult": [
			                    {
			                      "cladeName": "AL_3",
			                      "cladeRenderedName": "HCV Genotype 3",
			                      "percentScore": 100
			                    }
			                  ],
			                  "finalClade": "AL_3",
			                  "finalCladeRenderedName": "HCV Genotype 3",
			                  "closestMemberAlignmentName": "AL_3b",
			                  "closestMemberSourceName": "ncbi-refseqs",
			                  "closestMemberSequenceID": "JQ065709",
			                  "closestTargetAlignmentName": "AL_3b",
			                  "closestTargetSourceName": "ncbi-refseqs",
			                  "closestTargetSequenceID": "JQ065709",
			                  "shortRenderedName": "3"
			                },
			                {
			                  "categoryName": "subtype",
			                  "categoryDisplayName": "Subtype",
			                  "queryCladeResult": [
			                    {
			                      "cladeName": "AL_3b",
			                      "cladeRenderedName": "HCV Subtype 3b",
			                      "percentScore": 100
			                    }
			                  ],
			                  "finalClade": "AL_3b",
			                  "finalCladeRenderedName": "HCV Subtype 3b",
			                  "closestMemberAlignmentName": "AL_3b",
			                  "closestMemberSourceName": "ncbi-refseqs",
			                  "closestMemberSequenceID": "JQ065709",
			                  "closestTargetAlignmentName": "AL_3b",
			                  "closestTargetSourceName": "ncbi-refseqs",
			                  "closestTargetSequenceID": "JQ065709",
			                  "shortRenderedName": "3b"
			                }
			              ],
			              "genotypeCladeCategoryResult": {
			                "categoryName": "genotype",
			                "categoryDisplayName": "Genotype",
			                "queryCladeResult": [
			                  {
			                    "cladeName": "AL_3",
			                    "cladeRenderedName": "HCV Genotype 3",
			                    "percentScore": 100
			                  }
			                ],
			                "finalClade": "AL_3",
			                "finalCladeRenderedName": "HCV Genotype 3",
			                "closestMemberAlignmentName": "AL_3b",
			                "closestMemberSourceName": "ncbi-refseqs",
			                "closestMemberSequenceID": "JQ065709",
			                "closestTargetAlignmentName": "AL_3b",
			                "closestTargetSourceName": "ncbi-refseqs",
			                "closestTargetSequenceID": "JQ065709",
			                "shortRenderedName": "3"
			              },
			              "subtypeCladeCategoryResult": {
			                "categoryName": "subtype",
			                "categoryDisplayName": "Subtype",
			                "queryCladeResult": [
			                  {
			                    "cladeName": "AL_3b",
			                    "cladeRenderedName": "HCV Subtype 3b",
			                    "percentScore": 100
			                  }
			                ],
			                "finalClade": "AL_3b",
			                "finalCladeRenderedName": "HCV Subtype 3b",
			                "closestMemberAlignmentName": "AL_3b",
			                "closestMemberSourceName": "ncbi-refseqs",
			                "closestMemberSequenceID": "JQ065709",
			                "closestTargetAlignmentName": "AL_3b",
			                "closestTargetSourceName": "ncbi-refseqs",
			                "closestTargetSequenceID": "JQ065709",
			                "shortRenderedName": "3b"
			              }
			            },
			            "targetRefName": "REF_3b_JQ065709",
			            "rasScanResults": [
			              {
			                "referenceName": "REF_MASTER_NC_004102",
			                "featureName": "NS5A",
			                "variationName": "phdr_ras:NS5A:30K",
			                "variationType": "aminoAcidSimplePolymorphism",
			                "matches": [
			                  {
			                    "firstRefCodon": "30",
			                    "lastRefCodon": "30",
			                    "queryAAs": "K",
			                    "refNtStart": 6345,
			                    "refNtEnd": 6347,
			                    "queryNtStart": 6364,
			                    "queryNtEnd": 6366,
			                    "queryNts": "AAG",
			                    "combinedTripletFraction": 1
			                  }
			                ],
			                "rasDetails": {
			                  "referenceName": "REF_MASTER_NC_004102",
			                  "featureName": "NS5A",
			                  "name": "phdr_ras:NS5A:30K",
			                  "type": "aminoAcidSimplePolymorphism",
			                  "gene": "NS5A",
			                  "structure": "30K",
			                  "displayName": null,
			                  "description": null,
			                  "metatag": [
			                    {
			                      "name": "SIMPLE_AA_PATTERN",
			                      "value": "K"
			                    }
			                  ],
			                  "alignmentRas": [
			                    {
			                      "displayStructure": "A30K",
			                      "clade": {
			                        "alignmentName": "AL_3",
			                        "displayName": "HCV Genotype 3"
			                      },
			                      "parentClade": {
			                        "alignmentName": "AL_MASTER",
			                        "displayName": "Hepatitis C Virus (HCV)"
			                      },
			                      "alignmentRasDrug": [
			                        {
			                          "drug": "pibrentasvir",
			                          "resistanceCategory": "category_I",
			                          "displayResistanceCategory": "I",
			                          "resistanceFinding": [
			                            {
			                              "inVivoResult": {
			                                "foundAtBaseline": true,
			                                "treatmentEmergent": true,
			                                "clinicalTrial": [
			                                  {
			                                    "id": "Endurance-1",
			                                    "displayName": "Endurance-1",
			                                    "nctId": "NCT02604017"
			                                  },
			                                  {
			                                    "id": "Endurance-2",
			                                    "displayName": "Endurance-2",
			                                    "nctId": "NCT02640482"
			                                  },
			                                  {
			                                    "id": "Endurance-3",
			                                    "displayName": "Endurance-3",
			                                    "nctId": "NCT02640157"
			                                  },
			                                  {
			                                    "id": "Endurance-4",
			                                    "displayName": "Endurance-4",
			                                    "nctId": "NCT02636595"
			                                  },
			                                  {
			                                    "id": "Expedition-1",
			                                    "displayName": "Expedition-1",
			                                    "nctId": "NCT02642432"
			                                  },
			                                  {
			                                    "id": "Expedition-2",
			                                    "displayName": "Expedition-2",
			                                    "nctId": "NCT02738138"
			                                  },
			                                  {
			                                    "id": "Surveyor-1",
			                                    "displayName": "Surveyor-1",
			                                    "nctId": "NCT02243280"
			                                  },
			                                  {
			                                    "id": "Surveyor-2",
			                                    "displayName": "Surveyor-2",
			                                    "nctId": "NCT02243293"
			                                  }
			                                ],
			                                "cohortDescription": null,
			                                "regimen": [
			                                  {
			                                    "id": "GLE_PIB",
			                                    "displayName": "GLE/PIB"
			                                  }
			                                ]
			                              },
			                              "publication": {
			                                "id": "EASL_2017_FRI_205",
			                                "displayName": "Krishnan et al., 2017",
			                                "url": "https://doi.org/10.1016/S0168-8278(17)31399-5",
			                                "index": 1
			                              }
			                            }
			                          ],
			                          "numFindings": 1
			                        }
			                      ],
			                      "numFindings": 1
			                    }
			                  ],
			                  "numFindings": 1
			                }
			              },
			              {
			                "referenceName": "REF_MASTER_NC_004102",
			                "featureName": "NS5A",
			                "variationName": "phdr_ras:NS5A:31M",
			                "variationType": "aminoAcidSimplePolymorphism",
			                "matches": [
			                  {
			                    "firstRefCodon": "31",
			                    "lastRefCodon": "31",
			                    "queryAAs": "M",
			                    "refNtStart": 6348,
			                    "refNtEnd": 6350,
			                    "queryNtStart": 6367,
			                    "queryNtEnd": 6369,
			                    "queryNts": "ATG",
			                    "combinedTripletFraction": 1
			                  }
			                ],
			                "rasDetails": {
			                  "referenceName": "REF_MASTER_NC_004102",
			                  "featureName": "NS5A",
			                  "name": "phdr_ras:NS5A:31M",
			                  "type": "aminoAcidSimplePolymorphism",
			                  "gene": "NS5A",
			                  "structure": "31M",
			                  "displayName": null,
			                  "description": null,
			                  "metatag": [
			                    {
			                      "name": "SIMPLE_AA_PATTERN",
			                      "value": "M"
			                    }
			                  ],
			                  "alignmentRas": [
			                    {
			                      "displayStructure": "L31M",
			                      "clade": {
			                        "alignmentName": "AL_3",
			                        "displayName": "HCV Genotype 3"
			                      },
			                      "parentClade": {
			                        "alignmentName": "AL_MASTER",
			                        "displayName": "Hepatitis C Virus (HCV)"
			                      },
			                      "alignmentRasDrug": [
			                        {
			                          "drug": "pibrentasvir",
			                          "resistanceCategory": "category_II",
			                          "displayResistanceCategory": "II",
			                          "resistanceFinding": [
			                            {
			                              "inVivoResult": {
			                                "foundAtBaseline": true,
			                                "treatmentEmergent": false,
			                                "clinicalTrial": [
			                                  {
			                                    "id": "Endurance-1",
			                                    "displayName": "Endurance-1",
			                                    "nctId": "NCT02604017"
			                                  },
			                                  {
			                                    "id": "Endurance-2",
			                                    "displayName": "Endurance-2",
			                                    "nctId": "NCT02640482"
			                                  },
			                                  {
			                                    "id": "Endurance-3",
			                                    "displayName": "Endurance-3",
			                                    "nctId": "NCT02640157"
			                                  },
			                                  {
			                                    "id": "Endurance-4",
			                                    "displayName": "Endurance-4",
			                                    "nctId": "NCT02636595"
			                                  },
			                                  {
			                                    "id": "Expedition-1",
			                                    "displayName": "Expedition-1",
			                                    "nctId": "NCT02642432"
			                                  },
			                                  {
			                                    "id": "Expedition-2",
			                                    "displayName": "Expedition-2",
			                                    "nctId": "NCT02738138"
			                                  },
			                                  {
			                                    "id": "Surveyor-1",
			                                    "displayName": "Surveyor-1",
			                                    "nctId": "NCT02243280"
			                                  },
			                                  {
			                                    "id": "Surveyor-2",
			                                    "displayName": "Surveyor-2",
			                                    "nctId": "NCT02243293"
			                                  }
			                                ],
			                                "cohortDescription": null,
			                                "regimen": [
			                                  {
			                                    "id": "GLE_PIB",
			                                    "displayName": "GLE/PIB"
			                                  }
			                                ]
			                              },
			                              "publication": {
			                                "id": "EASL_2017_FRI_205",
			                                "displayName": "Krishnan et al., 2017",
			                                "url": "https://doi.org/10.1016/S0168-8278(17)31399-5",
			                                "index": 1
			                              }
			                            }
			                          ],
			                          "numFindings": 1
			                        }
			                      ],
			                      "numFindings": 1
			                    }
			                  ],
			                  "numFindings": 1
			                }
			              }
			            ],
			            "drugScores": [
			              {
			                "category": "NS3/4A protease inhibitors",
			                "drugAssessments": [
			                  {
			                    "drug": {
			                      "id": "glecaprevir",
			                      "category": "NS3/4A protease inhibitors"
			                    },
			                    "drugScore": "susceptible",
			                    "drugScoreDisplay": "Susceptible",
			                    "drugScoreDisplayShort": "Susceptible",
			                    "rasScores_category_I": [],
			                    "rasScores_category_II": [],
			                    "rasScores_category_III": []
			                  },
			                  {
			                    "drug": {
			                      "id": "voxilaprevir",
			                      "category": "NS3/4A protease inhibitors"
			                    },
			                    "drugScore": "susceptible",
			                    "drugScoreDisplay": "Susceptible",
			                    "drugScoreDisplayShort": "Susceptible",
			                    "rasScores_category_I": [],
			                    "rasScores_category_II": [],
			                    "rasScores_category_III": []
			                  }
			                ]
			              },
			              {
			                "category": "NS5A inhibitors",
			                "drugAssessments": [
			                  {
			                    "drug": {
			                      "id": "pibrentasvir",
			                      "category": "NS5A inhibitors"
			                    },
			                    "drugScore": "strong_resistance",
			                    "drugScoreDisplay": "Strong resistance",
			                    "drugScoreDisplayShort": "Strong",
			                    "rasScores_category_I": [
			                      {
			                        "gene": "NS5A",
			                        "structure": "30K",
			                        "displayStructure": "A30K",
			                        "category": "category_I"
			                      }
			                    ],
			                    "rasScores_category_II": [
			                      {
			                        "gene": "NS5A",
			                        "structure": "31M",
			                        "displayStructure": "L31M",
			                        "category": "category_II"
			                      }
			                    ],
			                    "rasScores_category_III": []
			                  },
			                  {
			                    "drug": {
			                      "id": "velpatasvir",
			                      "category": "NS5A inhibitors"
			                    },
			                    "drugScore": "susceptible",
			                    "drugScoreDisplay": "Susceptible",
			                    "drugScoreDisplayShort": "Susceptible",
			                    "rasScores_category_I": [],
			                    "rasScores_category_II": [],
			                    "rasScores_category_III": []
			                  }
			                ]
			              },
			              {
			                "category": "NS5B RNA polymerase inhibitors",
			                "drugAssessments": [
			                  {
			                    "drug": {
			                      "id": "sofosbuvir",
			                      "category": "NS5B RNA polymerase inhibitors"
			                    },
			                    "drugScore": "susceptible",
			                    "drugScoreDisplay": "Susceptible",
			                    "drugScoreDisplayShort": "Susceptible",
			                    "rasScores_category_I": [],
			                    "rasScores_category_II": [],
			                    "rasScores_category_III": []
			                  }
			                ]
			              }
			            ],
			            "visualisationHints": {
			              "features": [
			                "precursor_polyprotein",
			                "Core",
			                "E1",
			                "E2",
			                "p7",
			                "NS2",
			                "NS3",
			                "NS4A",
			                "NS4B",
			                "NS5A",
			                "NS5B"
			              ],
			              "comparisonRefs": [
			                {
			                  "refName": "REF_MASTER_NC_004102",
			                  "refDisplayName": "Hepatitis C Virus Reference (NC_004102)"
			                },
			                {
			                  "refName": "REF_3_NC_009824",
			                  "refDisplayName": "Genotype 3 Reference (NC_009824)"
			                },
			                {
			                  "refName": "REF_3b_D49374",
			                  "refDisplayName": "Subtype 3b Reference (D49374)"
			                },
			                {
			                  "refName": "REF_3b_JQ065709",
			                  "refDisplayName": null
			                }
			              ],
			              "visualisationUtilityModule": "phdrVisualisationUtility",
			              "targetReferenceName": "REF_3b_JQ065709",
			              "queryNucleotides": "ACCTGCCTCTTTCGAGGCGACACTCCACCATGGATCACTCCCCTGTGAGGAACTTCTGTCTTCACGCGGAAAGCGTCTAGCCATGGCGTTAGTACGAGTGTCGTGCAGCCTCCAGGCCCCCCCCTCCCGGGAGAGCCATAGTGGTCTGCGGAACCGGTGAGTACACCGGAATCGCCGGGACGACCGGGTCCTTTCTTGGAACAACCCGCTCAATGCCCGGAAATTTGGGCGTGCCCCCGCGAGATCACTAGCCGAGTAGTGTTGGGTCGCGAAAGGCCTTGTGGTACTGCCTGATAGGGTGCTTGCGAGTGCCCCGGGAGGTCTCGTAGACCGTGCATCATGAGCACACTYCCTAAACCTCAAAGACAAACCAAAAGAAACACACCCCGTCGCCCACAGAACGTTAAGTTCCCGGGCGGCGGGCAGATCGTTGGTGGAGTATATGTGCTGCCACGCAGGGGCCCACGATTGGGTGTGCGTGCAGTACGTAAGACYTCCGAGCGGTCGCAACCTCGCGGACGGTGTCAGCCTATTCCCAAGGCGCGCCCACGCGAGGGCCGGTCCTGGGCTCAGCCTGGGTACCCCTGGCCCCTCTACGGGAATGAGGGCTGCGGTTGGGYGGGATGGCTCTTGTCCCCCCGCGGCTCTCGCCCTAATTGGGGTCCAAACGACCCCCGGCGTAGATCTCGCAACCTGGGTAAGGTCATCGACACCCTAACGTGCGGATTCGCCGAYCTCATGGGGTACATCCCGCTCATCGGTGCCCCCGTAGGGGGTGTCGCAAGAGCCCTAGCTCACGGCGTTAGGGCTCTTGAGGACGGGGTGAACTATGCAACAGGGAACCTTCCTGGTTGCTCCTTCTCTATCTTTCTCCTCGCTCTCTTCTCCTGCCTGACTTGCCCCGCGTCCGGTCTAGAATACAGGAACGCGTCTGGCCTATACATACTCACCAACGACTGCTCTAACGGGAGCATTGTGTACGAGGCCGAAGATGTGATCTTGCACCTACCCGGATGTGTGCCCTGCGTCGCAACCGACAACGGAACATCGTGCTGGACACCAGTGTCACCAACAGTGGCCGTCAGGTATCCTGGTGCTACCACCGCATCGATCCGCAATCATGTGGACGTGCTGGTGGGCGCAGCCACATTGTGCTCAGCACTGTACGTCGGGGACCTCTGTGGGGCCGTGTTCCTCGTGGGACAAGCATTCACCTTCAGACCCCGCCGACACACGACTGCACAGACGTGCAACTGCTCAATATACCCAGGCCAAATTACAGGACATCGTATGGCGTGGGATATGATGATGAACTGGTCCCCTGCAGTCGGGCTGCTAATATCGCACTTGATGCGKTTGCCCCAAACCTTCTTTGATCTGGTCATAGGGGCCCACTGGGGCGTGATGGCAGGCCTCGCCTATTTCTCCATGCAAGGTAACTGGGCCAAAGTCGGCGTCGTGCTGATCATGTTCTCAGGAGTGGATGCGGGCCCATCCATCTCCGGTGGAACCACGTCTTACATTACTCGCGATGTTGTGAGCCTGTTTACTCGAGGCCCGCGCCAGAACCTGCATTTGGTGAATACTAACGGGTCGTGGCATATCAACAGCACTGCCCTGAGTTGTAATGATTCCCTAAACACCGGGTTCATAGCAGGGCTCATCTACTATCACAAGTTCAACGCCACGGGGTGCCCAGCTCGAATGACCAGCTGCAAGCCCATCACAGCCTTCAAGCAGGGGTGGGGTTCACTAAAAGATGTCAACATATCTGGTCCCAGCGAAGACAAACCATACTGCTGGCACTACGCACCCAGACCCTGCTTCAAGGTCCAGGCGTTGAAAGTCTGCGGGCCCGTCTACTGCTTCACGCCATCACCGGTAGTGGTGGGCACCACCGACGCCAAGGGCCTACCAACTTACAACTTTGGCGAGAATGAGACGGATGTGTTCTTGTTGACCTCCTTGAGGCCCCCCCAAGGCCGGTGGTTTGGATGTGTGTGGATGAATAGCACAGGGTTCGTGAAGACCTGCGGGGCCCCCCCCTGCAACATTTATGGGGGGATGGAGGGCGCTGAGACAAATCAGACCTTCCTCAAATGCCCTACAGATTGTTTTAGGAAGCACCCCGCTGCCACGTACACCCGCTGCGGGTCTGGACCCTGGCTTACGCCAAGGTGTTTAGTAGATTACCCGTACCGGTTGTGGCACTACCCTTGCACTCATAACTTCACCATATTCAAAGTCAGAATGTTTGTGGGAGGAGCGGAACATCGGTTCTCGGCTGCTTGCAACTGGACGAGGGGAGATCGCTGCGACCTTGAGGATCGTGACCGCAGCGAGCAACACCCGCTGCTTCACTCAACAACTGAATTCGCCATACTACCATGCTCATTTACGCCCATGCCTGCTCTATCAACAGGGCTCATACACCTCCACCAGAACATCGTGGACGTGCAATACCTTTACGGTGTTGGGTCTGGCATAGTGGGCTGGGCTATCAAGTGGGAGTTCGTTGTCCTCGTGTTCCTCTTTCTAGCGGACGCACGCGTGTGCGTAGCCCTCTGGATGATGTTAATGATTTCTCAGGCAGAAGCGGCAATGGAGAACTTGATAATGTTGAATGCCCTCAGCGCTGCGGGAGACCAGAGTTACCTCTGCTACCTGCTTGTGTTCTGCGCTGCGTGGCACATTCGGGGGAAGCTTGTTCCGCTGATAACCTATAGCCTGACAGGCCTGTGGTCCCTGGCCCTACTCGTCCTCCTGCTCCCTCAGCGTGCTTACGCTTGGACGGGAGAGGACGACGCCACCCTCGGGGCCGGAGTGCTCTTGCTCTTCGGGTTCTTCACCTTGTCACCATGGTATAAACACTGGATTGGCCGTCTCATCTGGTGGAACCAATATGCCATCTGCAGGAGCGAGGCCGCCTTGCAAGTATGGGTCCCTTCTCTGATTGTTCGAGGCAGTCGGGACAGTGTGATCCTGCTAGCGAGCCTGCTATATCCTTCTCTAATTTTTGACATCACAAAGCTGCTGATAGCTGTCCTTGGGCCGCTGTACCTAATACAAGCTGCACTCACCAGTACCCCTTACTTTGTACGCGCTCACGTATTGATTCGTATCTGTATGATGGTGCGCTCTGCAATGGGAGGGAAGTACATGCAAATGCTGGTGCTGACGGTCGGCCGGTGGTTCAACACCTATCTGTACGACCACCTATCCCCCATGAGGGACTGGGCTGCTGAGGGTCTCAAAGACCTGGCAGTGGCCACAGAGCCCGTCATCTTCAGTCCTATGGAGATAAAGGTTATCACCTGGGGTGCGGACACTGCAGCCTGTGGGGACATCCTGTGCGGGTTGCCCGTTTCAGCACGATTGGGCCATGAAGTGTTGTTGGGACCAGCTGATAATTACAAGACGATGGGGTGGCGCCTATTGTCTCCAATCTCAGCATATGCCCAGCAGACCCGAGGACTTTTCGGAACCATTGTTACCAGCTTGACAGGTAGGGACAAAAACGTAGTGACTGGTGAAGTGCAAGTGCTGTCCACAGCTACCCAGACCTTCTTGGGTACAGCAGTTGGGGGGGTTATGTGGACTGTCTACCACGGTGCTGGGACGCGAACACTCGCTGGCAACAAACGGGCCGCGCTCCAAATGTACACCAATGTGGACCAGGACCTGGTGGGTTGGCCAGCGCCTGCGGGGACGAAGTCTCTTGACCCTTGCACGTGCGGTTCTTCCGACCTGTACCTGGTGACTCGTGAGGCTGACGTGCTCCCCGCGCGTCGTAGGGGAGACTCAACGGCGAGTTTGCTCAGTCCCAGACCACTGTCCTGCCTCAAAGGCTCCTCTGGAGGTCCCATCATGTGCCCCTCGGGACACGTGGTGGGGATCTTCAGGGCGGCTGTGTGCACCAGAGGCGTAGCAAAAGCCCTACAGTTCATACCAGTASAWWYTCTGAGCACGCAGGTTAGGTCTCCATCTTTCAGTGACAATTCTACCCCCCCCGCCGTGCCAGAGTCCTACCAGGTAGGATACCTTCATGCCCCCACCGGGAGCGGGAAAAGCACCAAGGTCCCCGCCGCTTATGTAGCACAGGGATATTCTGTCCTAGTGCTAAATCCATCAGTAGCGGCTACCCTAGGCTTCGGCATGTACATGTCGAAGGCCTATGGGATTGATCCCAACATTCGCACGGGGACACGCACTATCACAACTGGTGCTAAACTCACCTACTCCACATATGGCAAGTTCCTCGCCGACGGGGGCTGTTCTGGAGGCGCCTATGATGTGATCATCTGTGATGAATGTCATGCGCAAGACGCCACCTCCATATTGGGCATAGGCACGGTGCTGGATCAAGCGGAGACAGCTGGAGTGAGGTTGACAGTGCTGGCAACAGCGACCCCCCCCGGCAGCATCACTGTGCCACATCCCAACATTGAGGAAGTGGCCCTTACCAATGACGGAGAGATCCCCTTTTATGGCAAAGCTTTTCCGCTGGCAATGGTCAAAGGAGGAAGACATCTTGTATTCTGCCATTCAAAGAAAAAGTGTGATGAGCTGGCCAGCAAGCTCAGAGGGATGGGGGTCAACGCTGTGGCGTTTTACAGGGGCCTTGACGTGTCCGTGATACCCACATCCGGAGACGTGGTAGTGTGCGCCACCGATGCCCTCATGACTGGATTTACAGGGGATTTTGACTCTGTTATAGACTGCAACGTGGCTGTTGAGCAGTACGTTGACTTTAGTCTAGACCCCACCTTCTCCATTGAGACACGCACGACTCCCCAGGACGCGGTGTCCCGAAGCCAACGCAGGGGCCGCACGGGCCGGGGTAGGCARGGCACATACCGGTTTGTCACCCCAGGAGAGCGGCCATCCGGCATGTTTGACTCAGTGGTGTTGTGTGAGTGCTATGACGCAGGCTGTTCCTGGTACGACCTACAGCCTGCCGAGACCACGGTACGACTGAGAGCATACCTGTCCACCCCAGGACTACCCGTCTGTCAAGACCATCTAGACTTCTGGGAGAGCGTGTTCACCGGACTGACTCAYATAGATGCCCACTTCTTGTCGCAGACGAAACAGCAGGGCTTGAATTTTGCATACTTAGTAGCTTATCAAGCCACTGTCTGTGCCCGCGCTCAGGCGAGYCCGCCATCTTGGGATGAGATGTGGAAATGTCTCATACGCCTGAAGCCGAATCTGCATGGTCCCACCCCTCTCCTGTATAGGCTAGGAGCAATCCAAAGTGACATCTGCACAACACACCCTATCACCAAGTACATCATGGCTTGCATGTCAGCAGACTTGGAAGTCACAACGAGCACCTGGGTATTGGTCGGCGGTGTCCTAGCAGCCCTCGCAGCCTACTGTTTATCAGTCGGCTGTGTTGTCATCGTAGGGCACATCGAGCTAGGGGGCAAACCTGCGCTTGTCCCTGATAGACAAGTGCTGTATCAACAATATGATGAAATGGAAGAATGCTCCCAGTCTGCTCCCTACATCGAGCAGGCACAGGCCATCGCTCAACAGTTCAAGGACAAGGTCCTCGGCTTGTTGCAAAGGGCTAGTCAGCAAGAGGCCGACATTCGGCCCATAGTGCAGTCACACTGGCAGAAAGCGGAGGCGTTCTGGCACAAGCACATGTGGAACTTTGTGAGCGGGATTCAGTACCTAGCAGGCCTCTCCACGCTGCCAGGCAACCCCGCTGTGGCTTCCCTCATGGCCTTTACTGCCTCTGTAACCAGCCCCCTCACCACCAACCAAACTATGTTCTTTAACATCCTTGGGGGTTGGGTGGCCACACACCTAGCAGGACCCACAGCATCATCCGCATTTGTGGTAAGCGGCTTGGCTGGTGCTGCCGTGGGAGGCATAGGTATTGGCAGGGTGTTGCTTGATGTGCTCGCTGGGTACGGAGCCGGAGTCTCCGGCGCCCTAGTGGCCTTTAAAATCATGGGAGGGGAGCTCCCTTCCACAGAGGACGTGGTTAATCTCCTGCCTGCTATCTTATCCCCCGGAGCGCTGGTTGTCGGCGTGATATGCGCCGCAGTGTTGCGCCGACACGTGGGACCTGGAGAAGGAGCAGTGCAGTGGATGAACAGACTCATAGCGTTTGCATCTCGGGGCAACCATGTATCACCAACACACTATGTCCCTGAGAGCGACGYTGCGGCAAAAGTGACAGCACTGCTAAGTTCTTTGACCGTCACCCGATTGCTTCGCCGACTACATCAGTGGATCAACGAGGACTATCCAAGTCCTTGCAACGGTGATTGGTTACATGACATTTGGGACTGGGTCTGTACAGTAYTCAGTGACTTCAAAACCTGGCTCTCGGCCAAGATTATGCCCAAGATGCCGGGCGTGCCCTTCTTCTCATGCCAGCGAGGGTACAAGGGGGTGTGGCGAGGGGATGGTGTGATGACAACACGCTGCCCTTGCGGACGGGAAATAACAGGGCACGTAAAGAATGGGTCCATGAGGATGGCGGGGTCAGCCCTATGCGCCAACATGTGGTACGGCACTTTTCCCATCAATGAATACACCACCGGGCCGAGCACGCCCGTCCCTGCATACAACTACTCGCGCGCCTTGTGGCGCGTGACCTCAGACAGTTATGTCGAGGTGCGCAGGGAGGGAGATACCCACTTCGTGGTGGGGGCCACGAATGATGGTCTAAAGATCCCATGTCAGGTGCCGGCACCCGAGTTCTTCACCGAGTTGGACGGGGTGAGGCTCCACCGTTACGCCCCCCCCTGCAAACCCCTGCTGAGGGACGAGATCACCTTTAGTGTAGGACTGCATTCATATGTAATTGGGTCCCAACTTCCATGTGAACCCGAGCCAGACGTCGCAGTGTTGACCTCGATGTTGCGAGATCCTGCCCACATCACAGCCGCTACGGCGGCCCGGCGGCTTGCACGTGGTTCCCCCCCATCGGAAGCTAGCTCCTCTGCCAGCCAGCTCTCAGCTCCGTCGTTGAAGGCCACTTGTCAAACGCATAAGCTGCACCCTGATGTTGAGCTGATAGACGCCAACCTCCTCTGGAGGCAAGCGATGGATAGCGATATCACTTGGGTAGAGACTGATACAAAGGTGCTGAACCTTGACTCATTCGAGCCCCTGAGGGCTGAGGAAGATGATACTGAGCTCTCGGTACCGGCGGAGTGTTTCAAGAAACCACCCAAGTGTCCACCGGCCCTTCCCATCTGGGCCAGACCAGACTACAACCCTCCATTGCTCCCTCCATGGAAGGACCCGACCTATGAACCACCCGTAGTCCACGGGTGTGCCCTGCCACCAACTCGTCCCACTCCAGTGCCTCCCCCCCGCAGGAAGAGAACAATTGCGCTCGATGGGTCGAACGTGTCCATGGCTCTTGCCGYTCTGGCGGAAAGATCCTTCCCGTCGACGAAATCGGAGGGGAYAGGCGCTTCCTCCTCAGGAGTCGGTACAGAGTCCACTACTGAGTCCGGCGACTCGCCTGAAACTGGCGAAGGGTCGGACGCAGAGTCATGTTCGTCCATGCCCCCCCTTGAGGGAGAGCCGGGCGACCCGGACCTGGATGCCGACTCTTGGTCTACTGTCAGTGACTCCGAAGAGCAGAGTGTGGTTTGCTGTTCTATGTCATACTCTTGGACTGGCGCTATAATAACACCGTGTAGTGCCGAAGAGGAAAAACTACCCATTAGTCCACTCAGCAATTCTTTGCTGAGACACCACAATCTTATCTACTCAACGTCATCTCGTAGCGCTGCTGCGCGCCAGAAGAAGGTTACCTTCGACAGGCTGCAGGTGCTCGATGACCATTACAAGAATGTACTTAAGGAGGTGAAGGAGCGAGCATCAGGGGTGAAGGGTCGCTTACTCTCTTTCGAGGAAGCGTGTTCCCTTGTCCCCCCCCACTCCGCCCGGTCAAAGTACGGGTATAGTGCAAAGGATGTTCGTTCCTTCTCTGGCAAGGCCATGAACCAGATCCGCTCCGTCTGGGAGGACTTGCTGGAAGACAGTACTACCCCAATCTCCACCACCATTATGGCGAAGAACGAGGTGTTTAGCGTAAACCCTGCAAAGGGGGGACGCAAGCCCGCTCGTCTCATTGTCTACCCTGATCTAGGGGTGCGGGTCTGTGAGAAACGCGCCCTGTATGACGTGATACAGAAGTTGTCAATCGCAACGATGGGGACCGCCTATGGGTTCCAGTACTCGCCCAAACAGCGAGTGGAACATCTTCTCAAGATGTGGTCGTCAAAGAAAACCCCCTTGGGGTTTTCGTACGACACCCGTTGCTTTGACTCTACTGTCACCGAACATGACATCAGGGTGGAGGAGGAGATATACCAATGTTGTGACCTTGAGCCAGAAGCTCGGAAGGCAATCAGCGCCCTCACGGAGCGGCTGTACATCGGGGGCCCCATGTATAACAGCAAAGGGCTCCAGTGTGGCTATCGCCGCTGCCGCGCTAGCGGTGTCTTGCCTACCAGCTTTGGCAATACAATAACCTGTTACATCAAGGCCACTGCCGCTAGCAGGGCCGCGGGTCTCAAAAACCCATCTTTCCTTGTCTGCGGGGACGATTTGGTGGTGATATCCGAAAGTTGCGGTGTCGAGGAGGACAGAGCAACTCTGCGAGCCTTCACGGAGGCTATGACCAGATATTCTGCCCCTCCCGGGGACGCCYCACAGCCCACCTATGACTTGGAGCTGATTACATCTTGCTCCTCAAATGTCTCCGTGGCATGCGACGAGAAGGGCAAGAGGTACTATTACCTCACCCGAGACCCAGAAACTCCCCTAGCCCGCGCGGCTTGGGAGACTGCCCGCCACACTCCAGTCAACTCCTGGTTGGGGAATATCATCATGTTCGCCCCTACCATTTGGGTGCGTATGGTGTTGATGACCCACTTCTTTTCCATACTCCAAGCCCAGGAGCAGCTTGAAAAAGCCCTAGACTTCGAAATGTACGGGGCTACCTACTCAGTCACTCCACTGGACTTACCAGCTATCATTGAAAGACTCCATGGTTTGAGCGCGTTCTCGCTTCACAGTTACTCTCCAACTGAGCTCAACAGAGTGGCGGGGGTTCTCAGGAAACTTGGGATCCCCCCCCTACGAGCGTGGAGACACCGGGCACGAGCAGTGCGCGCCAAACTCATTGTCCAGGGAGGAAAGGCCAAGATATGTGGCCTATACCTCTTTAACTGGGCAGTGCGTACCAAAACCAGACTCACTCCATTGCCGGCTGCGGGCCTACTGGATCTTTCCAGTTGGTTCACTGTTGGCGTCGGCGGGAACGACATTTATCACAGCGTGTCGCGTGCCCGAACCCGCCATTTACTCCTTTGCCTACTCCTACTTGCCGTAGGGGTAGGCGTYTTTCTCCTACCTGCTCGGTGAGCTGGTAGGTTAACACCCCAACCCTG",
			              "queryToTargetRefSegments": [
			                {
			                  "refStart": 1,
			                  "refEnd": 314,
			                  "queryStart": 26,
			                  "queryEnd": 339
			                },
			                {
			                  "refStart": 315,
			                  "refEnd": 9383,
			                  "queryStart": 340,
			                  "queryEnd": 9408
			                }
			              ]
			            }
			          },
			          "publications": [
			            {
			              "id": "EASL_2017_FRI_205",
			              "authors_short": "Krishnan et al.",
			              "authors_full": "P. Krishnan, G. Schnell, R. Tripathi, T. Ng, T. Reisch, J. Beyer, T. Dekhtyar, M. Irvin, W. Xie, L. Larsen, F. Mensa, T. Pilot-Matias and C. Collins",
			              "title": "Pooled resistance analysis in HCV genotype 1–6-infected patients treated with glecaprevir/pibrentasvir in phase 2 and 3 clinical trials",
			              "year": "2017",
			              "journal": "J. Hepatol.",
			              "volume": "66",
			              "issue": "1",
			              "pages": "S500",
			              "url": "https://doi.org/10.1016/S0168-8278(17)31399-5",
			              "index": 1
			            }
			          ],
			          "reportGenerationDate": "13/09/2018",
			          "engineVersion": "1.0.16",
			          "projectVersion": "0.1.30",
			          "extensionVersion": "0.1.7",
			          "phdrSamThresholds": {
			            "minDepth": 10,
			            "minMapQ": 5,
			            "minQScore": 5,
			            "minReadProportionPct": 15
			          }
			        }
			      }
			    ]
			  }
			};


function reportFastaWeb(base64, filePath) {
	glue.log("FINE", "phdrReportingController.reportFastaWeb invoked");
	var fastaDocument;
	glue.inMode("module/phdrFastaUtility", function() {
		fastaDocument = glue.command(["base64-to-nucleotide-fasta", base64]);
	});
	var numSequencesInFile = fastaDocument.nucleotideFasta.sequences.length;
	if(numSequencesInFile == 0) {
		throw new Error("No sequences found in FASTA file");
	}
	var fastaMap = {};
	var resultMap = {};
	// apply blast recogniser / genotyping together on set, as this is more efficient.
	initResultMap(fastaDocument, fastaMap, resultMap);
	// apply report generation to each sequence in the set.
	var phdrReports = _.map(fastaDocument.nucleotideFasta.sequences, function(sequence) {
		return generateSingleFastaReport(_.pick(fastaMap, sequence.id), _.pick(resultMap, sequence.id), filePath);
	});
	var result = {
		phdrWebReport:  { 
			results: phdrReports
		}
	};

	glue.log("FINE", "phdrReportingController.reportFastaWeb result", result);
	
	return result;
	
	//return staticResult;
}

/**
 * Entry point for generating a report for a fasta file containing a single sequence.
 */
function reportFasta(fastaFilePath) {
	glue.log("FINE", "phdrReportingController.reportFasta invoked, input file:"+fastaFilePath);
	// Load fasta and put in a fastaMap
	var fastaDocument;
	glue.inMode("module/phdrFastaUtility", function() {
		fastaDocument = glue.command(["load-nucleotide-fasta", fastaFilePath]);
	});
	var numSequencesInFile = fastaDocument.nucleotideFasta.sequences.length;
	if(numSequencesInFile == 0) {
		throw new Error("No sequences found in FASTA file");
	}
	if(numSequencesInFile > 1) {
		throw new Error("Please use only one sequence per FASTA file");
	}
	var fastaMap = {};
	var resultMap = {};
	initResultMap(fastaDocument, fastaMap, resultMap);
	return generateSingleFastaReport(fastaMap, resultMap, fastaFilePath);
}

function initResultMap(fastaDocument, fastaMap, resultMap) {
	glue.log("FINE", "phdrReportingController.initResultMap fastaDocument:", fastaDocument);
	_.each(fastaDocument.nucleotideFasta.sequences, function(sequenceObj) {
		fastaMap[sequenceObj.id] = sequenceObj;
	});
	// initialise result map.
	var sequenceObjs = _.values(fastaMap);
	_.each(sequenceObjs, function(sequenceObj) {
		resultMap[sequenceObj.id] = { id: sequenceObj.id };
	});
	// apply recogniser to fastaMap
	recogniseFasta(fastaMap, resultMap);

	glue.log("FINE", "phdrReportingController.initResultMap, result map after recogniser", resultMap);

	// apply genotyping
	genotypeFasta(fastaMap, resultMap);

	glue.log("FINE", "phdrReportingController.initResultMap, result map after genotyping", resultMap);
}

function generateSingleFastaReport(fastaMap, resultMap, fastaFilePath) {
	var publicationIdToObj = {};
	nextPubIndex = 1;
	
	var alignerModule;
	glue.inMode("module/phdrFastaSequenceReporter", function() {
		alignerModule = glue.command(["show", "property", "alignerModuleName"]).moduleShowPropertyResult.propertyValue;
	});
	
	// apply variation scanning
	_.each(_.values(resultMap), function(sequenceResult) {
		var genotypingResult = sequenceResult.genotypingResult;
		if(genotypingResult != null) {
			if(genotypingResult.genotypeCladeCategoryResult.finalClade != null) {
				var targetRefName = genotypingResultToTargetRefName(genotypingResult);

				// TODO -- these could all be done together.
				var alignResult;
				glue.inMode("module/"+alignerModule, function() {
					alignResult = glue.command({align: {
							referenceName: targetRefName,
							sequence: [
							    { 
							    	queryId: sequenceResult.id, 
							    	nucleotides: fastaMap[sequenceResult.id].sequence
							    }
							]
						}
					});
					glue.log("FINE", "phdrReportingController.generateSingleFastaReport, alignResult", alignResult);
				});
				var queryToTargetRefSegs = alignResult.compoundAlignerResult.sequence[0].alignedSegment;
				
				var variationWhereClause = getVariationWhereClause(genotypingResult);
				sequenceResult.targetRefName = targetRefName;
				var queryNucleotides = fastaMap[sequenceResult.id].sequence;
				var scanResults;
				glue.inMode("module/phdrFastaSequenceReporter", function() {
					scanResults = glue.command({
						"string-plus-alignment" :{
							"variation":{
								"scan":{
									"fastaString":queryNucleotides,
									"queryToTargetSegs": {
										queryToTargetSegs: {
											alignedSegment: queryToTargetRefSegs
										}
									},
									"whereClause": variationWhereClause,
									"targetRefName":targetRefName,
									"relRefName":"REF_MASTER_NC_004102",
									"linkingAlmtName":"AL_UNCONSTRAINED",
									"featureName":"precursor_polyprotein",
									"descendentFeatures":"true",
									"excludeAbsent":"true",
									"excludeInsufficientCoverage":"true",
									"showMatchesAsDocument":"true",
									"showMatchesAsTable":"false"
								}
							}
						}
					}).variationScanMatchCommandResult.variations;
				});
				sequenceResult.rasScanResults = scanResults;
				glue.log("FINE", "phdrReportingController.generateSingleFastaReport rasScanResults:", sequenceResult.rasScanResults);
				_.each(scanResults, function(scanResult) {
					var rasFinding = getRasFinding(genotypingResult, scanResult.referenceName, 
							scanResult.featureName, scanResult.variationName);
					glue.log("FINE", "phdrReportingController.generateSingleFastaReport rasFinding:", rasFinding);
					scanResult.rasDetails = rasFinding.phdrRasVariation;
					addRasPublications(rasFinding, publicationIdToObj);
					
				});
				sequenceResult.drugScores = assessResistance(scanResults);
				glue.log("FINE", "phdrReportingController.generateSingleFastaReport sequenceResult.drugScores:", sequenceResult.drugScores);
				sequenceResult.visualisationHints = visualisationHints(queryNucleotides, targetRefName, genotypingResult, queryToTargetRefSegs);
			}
		}
	});
	glue.log("FINE", "phdrReportingController.generateSingleFastaReport publicationIdToObj:", publicationIdToObj);
	
	var results = _.values(resultMap);
	var publications = _.values(publicationIdToObj);
	publications = _.sortBy(publications, "index");

	
	var phdrReport = { 
		phdrReport: {
			sequenceDataFormat: "FASTA",
			filePath: fastaFilePath,
			sequenceResult: results[0], 
			publications: publications
		}
	};
	addOverview(phdrReport);

	glue.log("FINE", "phdrReportingController.generateSingleFastaReport phdrReport:", phdrReport);
	return phdrReport;
}

function visualisationHints(queryNucleotides, targetRefName, genotypingResult, queryToTargetRefSegs) {
	// consider the target ref, subtype ref, genotype ref and master ref as comparison refs.
	var comparisonReferenceNames = ["REF_MASTER_NC_004102"];
	var genotypeAlmtName = genotypingResult.genotypeCladeCategoryResult.finalClade;
	if(genotypeAlmtName != null) {
		glue.inMode("alignment/"+genotypeAlmtName, function() {
			comparisonReferenceNames.push(glue.command(["show", "reference"]).showReferenceResult.referenceName);
		});
	}
	var subtypeAlmtName = genotypingResult.subtypeCladeCategoryResult.finalClade;
	if(subtypeAlmtName != null) {
		glue.inMode("alignment/"+subtypeAlmtName, function() {
			comparisonReferenceNames.push(glue.command(["show", "reference"]).showReferenceResult.referenceName);
		});
	}
	comparisonReferenceNames.push(targetRefName);
	var seqs = [];
	var comparisonRefs = [];
	
	// eliminate duplicates and enhance with display names.
	_.each(comparisonReferenceNames, function(refName) {
		glue.inMode("reference/"+refName, function() {
			var seqID = glue.command(["show", "sequence"]).showSequenceResult["sequence.sequenceID"];
			if(seqs.indexOf(seqID) < 0) {
				seqs.push(seqID);
				var refDisplayName = glue.command(["show", "property", "displayName"]).propertyValueResult.value;
				if(refDisplayName == null) {
					refDisplayName = "Closest Reference ("+seqID+")";
				}
				comparisonRefs.push({
					"refName": refName,
					"refDisplayName": refDisplayName
				});
			}
		});
	});
	
	return {
		"features": ["precursor_polyprotein", "Core", "E1", "E2", "p7", "NS2", "NS3", "NS4A", "NS4B", "NS5A", "NS5B"],
		"comparisonRefs": comparisonRefs,
		"targetReferenceName":targetRefName,
		"queryNucleotides":queryNucleotides,
		"queryToTargetRefSegments": queryToTargetRefSegs
	};
}


function getVariationWhereClause(genotypingResult) {
	var variationWhereClause = "phdr_ras != null";
	var genotypeAlmtName = genotypingResult.genotypeCladeCategoryResult.finalClade;
	var subtypeAlmtName = genotypingResult.subtypeCladeCategoryResult.finalClade;
	if(genotypeAlmtName != null && subtypeAlmtName == null) {
		// genotype known, subtype unknown, include RASs for genotype only.
		variationWhereClause = variationWhereClause + 
		" and phdr_ras.phdr_alignment_ras.alignment.name ='"+genotypeAlmtName+"'"
	}
	if(genotypeAlmtName != null && subtypeAlmtName != null) {
		// genotype known, subtype known, include RASs for specific subtype or genotype.
		variationWhereClause = variationWhereClause + 
		" and (phdr_ras.phdr_alignment_ras.alignment.name ='"+subtypeAlmtName+"' or "+
		"phdr_ras.phdr_alignment_ras.alignment.name ='"+genotypeAlmtName+"')"
	}
	glue.log("FINEST", "variationWhereClause", variationWhereClause);
	return variationWhereClause;
}

function addRasPublications(rasFinding, publicationIdToObj) {
	_.each(rasFinding.phdrRasVariation.alignmentRas, function(alignmentRas) {
		_.each(alignmentRas.alignmentRasDrug, function(alignmentRasDrug) {
			_.each(alignmentRasDrug.resistanceFinding, function(resistanceFinding) {
				var publicationId = resistanceFinding.publication.id;
				var publicationObj = publicationIdToObj[publicationId];
				if(publicationObj == null) {
					glue.inMode("/custom-table-row/phdr_publication/"+publicationId, function() {
						publicationObj = glue.command(["render-object", "phdrPublicationRenderer"]).publication;
						publicationObj.index = nextPubIndex;
						nextPubIndex++;
						publicationIdToObj[publicationId] = publicationObj;
					});							
				}
				resistanceFinding.publication.index = publicationObj.index;
			});
		});
	});
}

function reportBam(bamFilePath) {
	glue.log("FINE", "phdrReportingController.reportBam invoked, input file:"+bamFilePath);
	
	var samReferences;
	glue.inMode("module/phdrSamReporter", function() {
		samReferences = glue.tableToObjects(glue.command(["list", "sam-reference", "--fileName", bamFilePath]));
	});
	
	var resultMap = {};

	var numSamReferencesInFile = 0;
	_.each(samReferences, function(samReference) {
		resultMap[samReference.name] = {
			id: samReference.name,
			samReference: samReference
		};
		numSamReferencesInFile++;
	});
	if(numSamReferencesInFile == 0) {
		throw new Error("No SAM reference sequences found in SAM/BAM file");
	}
	if(numSamReferencesInFile > 1) {
		throw new Error("Multiple reference sequences found in SAM/BAM file");
	}

	
	
	var consensusFastaMap = {};
	_.each(samReferences, function(samReference) {
		glue.inMode("module/phdrSamReporter", function() {
			consensusDocument = glue.command(["nucleotide-consensus", 
			                                  "--fileName", bamFilePath, 
			                                  "--samRefName", samReference.name, 
			                                  "--consensusID", samReference.name,
			                                  "--preview",
				   				              "--minQScore", phdrSamThresholds.minQScore,
				   				              "--minMapQ", phdrSamThresholds.minMapQ,
				   				              "--minDepth", phdrSamThresholds.minDepth]);
		});
		consensusFastaMap[samReference.name] = consensusDocument.nucleotideFasta.sequences[0];
	});
	
	recogniseFasta(consensusFastaMap, resultMap);
	// apply genotyping
	genotypeFasta(consensusFastaMap, resultMap);
	
	var publicationIdToObj = {};
	nextPubIndex = 1;

	// scan variations for each sam reference
	_.each(_.values(resultMap), function(samRefResult) {
		var genotypingResult = samRefResult.genotypingResult;
		if(genotypingResult != null) {
			var targetRefName = genotypingResultToTargetRefName(genotypingResult);
			var variationWhereClause = getVariationWhereClause(genotypingResult);
			samRefResult.targetRefName = targetRefName;
			var samRefSense = "FORWARD";
			if(samRefResult.isReverseHcv) {
				var samRefSense = "REVERSE_COMPLEMENT";
			}
			var scanResults;
			glue.inMode("module/phdrSamReporter", function() {
				scanResults = glue.tableToObjects(glue.command(["variation", "scan",
				   				              "--fileName", bamFilePath, 
				   				              "--samRefSense", samRefSense, 
				   				              "--samRefName", samRefResult.samReference.name,
				   				              "--relRefName", "REF_MASTER_NC_004102",
				   				              "--featureName", "precursor_polyprotein",
				   				              "--descendentFeatures",
				   				              "--autoAlign",
				   				              "--targetRefName", targetRefName,
				   				              "--linkingAlmtName", "AL_UNCONSTRAINED",
				   				              "--whereClause", variationWhereClause,
				   				              "--minQScore", phdrSamThresholds.minQScore,
				   				              "--minMapQ", phdrSamThresholds.minMapQ,
				   				              "--minDepth", phdrSamThresholds.minDepth,
				   				              "--minPresentPct", phdrSamThresholds.minReadProportionPct]));					
			});
			samRefResult.rasScanResults = scanResults;
			glue.log("FINE", "phdrReportingController.reportBam rasScanResults:", samRefResult.rasScanResults);
			_.each(scanResults, function(scanResult) {
				var rasFinding = getRasFinding(genotypingResult, scanResult.referenceName, 
						scanResult.featureName, scanResult.variationName);
				glue.log("FINE", "phdrReportingController.reportBam rasFinding:", rasFinding);
				scanResult.rasDetails = rasFinding.phdrRasVariation;
				addRasPublications(rasFinding, publicationIdToObj);
				
			});
			samRefResult.drugScores = assessResistance(scanResults);
			glue.log("FINE", "phdrReportingController.reportBam samRefResult.drugScores:", samRefResult.drugScores);

		}
	});
	glue.log("FINE", "phdrReportingController.reportBam publicationIdToObj:", publicationIdToObj);

	var publications = _.values(publicationIdToObj);
	publications = _.sortBy(publications, "index");
	
	var phdrReport = { 
			phdrReport: {
				sequenceDataFormat: "SAM/BAM",
				filePath: bamFilePath,
				samReferenceResult: _.values(resultMap)[0],
				publications: publications
			}
	};
	addOverview(phdrReport);
	glue.log("FINE", "phdrReportingController.reportBam phdrReport:", phdrReport);
	
	return phdrReport;
}


function assessResistance(scanResults) {
	var drugs = 
		glue.tableToObjects(
				glue.command(["list", "custom-table-row", "phdr_drug", "id", "category"]));
	var assessmentList = _.map(drugs, function(drug) { 
		return assessResistanceForDrug(scanResults, drug); 
	});
	var categoryToDrugs = _.groupBy(assessmentList, function(assessment) { return assessment.drug.category; });
	return _.map(_.pairs(categoryToDrugs), function(pair) {return { category:pair[0], drugAssessments:pair[1]};});
}

function assessResistanceForDrug(scanResults, drug) {
	
	var rasScores_category_I = [];
	var rasScores_category_II = [];
	var rasScores_category_III = [];
	
	_.each(scanResults, function(scanResult) {
		_.each(scanResult.rasDetails.alignmentRas, function(alignmentRas) {
			_.each(alignmentRas.alignmentRasDrug, function(alignmentRasDrug) {
				if(alignmentRasDrug.drug == drug.id) {
					if(alignmentRasDrug.resistanceCategory != "insignificant") {
						var rasScoreDetails = {
							gene: scanResult.rasDetails.gene,
							structure: scanResult.rasDetails.structure,
							displayStructure: alignmentRas.displayStructure,
							category: alignmentRasDrug.resistanceCategory,
							displayCategory: alignmentRasDrug.displayCategory
						};
						if(scanResult.pctPresent != null) {
							rasScoreDetails.readsPctPresent = scanResult.pctPresent;
						}
						if(alignmentRasDrug.resistanceCategory == "category_I") {
							rasScores_category_I.push(rasScoreDetails); 
						} else if(alignmentRasDrug.resistanceCategory == "category_II") {
							rasScores_category_II.push(rasScoreDetails); 
						} else if(alignmentRasDrug.resistanceCategory == "category_III") {
							rasScores_category_III.push(rasScoreDetails); 
						}
					}
				}
			});
		});
	});
	
	// drug score: 4 levels:
	// strong_resistance:		Any category I RAS or multiple category II RASs.
	// moderate_resistance:		Any category II RAS or multiple category III RAS.
	// weak_resistance:			Any category III RAS.
	// susceptible:				None of the above.
	
	var numCategoryI = rasScores_category_I.length;
	var numCategoryII = rasScores_category_II.length;
	var numCategoryIII = rasScores_category_III.length;

	var drugScore;
	var drugScoreDisplay;
	if(numCategoryI > 0 || numCategoryII > 1) {
		drugScore = 'strong_resistance';
		drugScoreDisplay = 'Strong resistance';
		drugScoreDisplayShort = 'Strong';
	} else if(numCategoryII > 0 || numCategoryIII > 1) {
		drugScore = 'moderate_resistance';
		drugScoreDisplay = 'Moderate resistance';
		drugScoreDisplayShort = 'Moderate';
	} else if(numCategoryIII > 0) {
		drugScore = 'weak_resistance';
		drugScoreDisplay = 'Weak resistance';
		drugScoreDisplayShort = 'Weak';
	} else {
		drugScore = 'susceptible';
		drugScoreDisplay = 'Susceptible';
		drugScoreDisplayShort = 'Susceptible';
	}
	
	return {
		drug: drug,
		drugScore: drugScore, 
		drugScoreDisplay: drugScoreDisplay,
		drugScoreDisplayShort: drugScoreDisplayShort,
		rasScores_category_I: rasScores_category_I,
		rasScores_category_II: rasScores_category_II,
		rasScores_category_III: rasScores_category_III
	};
	
}

function getRasFinding(genotypingResult, referenceName, featureName, variationName) {
	var rasFinding;
	glue.inMode("/reference/"+referenceName+
			"/feature-location/"+featureName+
			"/variation/"+variationName, function() {
		rasFinding = glue.command(["render-object", "phdrRasVariationRenderer"]);
		var genotypeAlmtName = genotypingResult.genotypeCladeCategoryResult.finalClade;
		var subtypeAlmtName = genotypingResult.subtypeCladeCategoryResult.finalClade;
		if(subtypeAlmtName != null && genotypeAlmtName != null) {
			rasFinding.phdrRasVariation.alignmentRas = _.filter(rasFinding.phdrRasVariation.alignmentRas, function(alignmentRas) {
				if(alignmentRas.clade.alignmentName == subtypeAlmtName || alignmentRas.clade.alignmentName == genotypeAlmtName ) {
					return true;
				}
			});
		} else if(genotypeAlmtName != null) {
			rasFinding.phdrRasVariation.alignmentRas = _.filter(rasFinding.phdrRasVariation.alignmentRas, function(alignmentRas) {
				if(alignmentRas.clade.alignmentName == genotypeAlmtName ) {
					return true;
				}
			});
		} else {
			rasFinding.phdrRasVariation.alignmentRas = [];
		}
		rasFinding.phdrRasVariation.alignmentRas.sort(function (f1, f2) {
			return f1.clade.alignmentName.localeCompare(f2.clade.alignmentName);
		});
		_.each(rasFinding.phdrRasVariation.alignmentRas, function(alignmentRas) {
			alignmentRas.alignmentRasDrug.sort(function (f1, f2) {
				return f1.drug.localeCompare(f2.drug);
			});
		});

		
		var variationNumFindings = 0;
		_.each(rasFinding.phdrRasVariation.alignmentRas, function(alignmentRas) {
			var alignmentRasNumFindings = 0;
			_.each(alignmentRas.alignmentRasDrug, function(alignmentRasDrug) {
				alignmentRasDrug.numFindings = alignmentRasDrug.resistanceFinding.length;
				alignmentRasNumFindings += alignmentRasDrug.numFindings;
			});
			alignmentRas.numFindings = alignmentRasNumFindings;
			variationNumFindings += alignmentRas.numFindings;
		});
		rasFinding.phdrRasVariation.numFindings = variationNumFindings;
		
	});
	return rasFinding;
}

/*
 * Given a genotypingResult with a non-null genotypeFinalClade, return the name of the "target" reference
 */
function genotypingResultToTargetRefName(genotypingResult) {
	var targetRefSourceName;
	var targetRefSequenceID;
	var subtypeFinalClade = genotypingResult.subtypeCladeCategoryResult.finalClade;
	if(subtypeFinalClade != null) {
		targetRefSourceName = genotypingResult.subtypeCladeCategoryResult.closestMemberSourceName;
		targetRefSequenceID = genotypingResult.subtypeCladeCategoryResult.closestMemberSequenceID;
	} else {
		targetRefSourceName = genotypingResult.genotypeCladeCategoryResult.closestMemberSourceName;
		targetRefSequenceID = genotypingResult.genotypeCladeCategoryResult.closestMemberSequenceID;
	}
	var targetRefOptions = glue.tableToObjects(glue.command([
         "list", "reference", 
         "--whereClause", "sequence.source.name = '"+targetRefSourceName+"' and sequence.sequenceID = '"+targetRefSequenceID+"'"]));
	return targetRefOptions[0].name;
}

/*
 * This function takes a fastaMap of id -> { id, nucleotideFasta }, and a result map of id -> ? 
 * and runs max likelihood genotyping on the subset of sequences that have been identified as forward HCV.
 * The the genotyping result object is recorded in the result map for each sequence.
 */
function genotypeFasta(fastaMap, resultMap) {
	var genotypingFastaMap = {};
	_.each(_.values(resultMap), function(resultObj) {
		if(resultObj.isForwardHcv && !resultObj.isReverseHcv) {
			genotypingFastaMap[resultObj.id] = fastaMap[resultObj.id];
		} 
	});
	if(!_.isEmpty(genotypingFastaMap)) {
		var genotypingResults;
		glue.inMode("module/maxLikelihoodGenotyper", function() {
			genotypingResults = glue.command({
				"genotype": {
					"fasta-document":
					{
						"fastaCommandDocument": {
							"nucleotideFasta" : {
								"sequences": _.values(genotypingFastaMap)
							}
						}, 
						"documentResult" : true
					}
				}
			}).genotypingDocumentResult.queryGenotypingResults;
		});
		glue.log("FINE", "phdrReportingController.genotypeFasta genotypingResults:", genotypingResults);
		_.each(genotypingResults, function(genotypingResult) {
			genotypingResult.genotypeCladeCategoryResult = _.find(genotypingResult.queryCladeCategoryResult, 
					function(cladeCategoryResult) { return cladeCategoryResult.categoryName == "genotype"; });
			genotypingResult.subtypeCladeCategoryResult = _.find(genotypingResult.queryCladeCategoryResult, 
					function(cladeCategoryResult) { return cladeCategoryResult.categoryName == "subtype"; });
			if(genotypingResult.genotypeCladeCategoryResult.finalCladeRenderedName == null) {
				genotypingResult.genotypeCladeCategoryResult.shortRenderedName = "unknown";
			} else {
				genotypingResult.genotypeCladeCategoryResult.shortRenderedName = 
					genotypingResult.genotypeCladeCategoryResult.finalCladeRenderedName.replace("HCV Genotype ", "");
			}
			if(genotypingResult.subtypeCladeCategoryResult.finalCladeRenderedName == null) {
				genotypingResult.subtypeCladeCategoryResult.shortRenderedName = "unknown";
			} else {
				genotypingResult.subtypeCladeCategoryResult.shortRenderedName = 
					genotypingResult.subtypeCladeCategoryResult.finalCladeRenderedName.replace("HCV Subtype ", "");
			}
				
				
			glue.log("FINE", "phdrReportingController.genotypeFasta genotypeCladeCategoryResult", genotypingResult.genotypeCladeCategoryResult);
			glue.log("FINE", "phdrReportingController.genotypeFasta subtypeCladeCategoryResult", genotypingResult.subtypeCladeCategoryResult);
			
			
			resultMap[genotypingResult.queryName].genotypingResult = genotypingResult;
		});
	}
}

/*
 * Use the fastaUtility module to reverse complement a FASTA string
 */
function reverseComplement(fastaString) {
	var reverseComplement;
	glue.inMode("module/phdrFastaUtility", function() {
		var reverseComplementResult = 
			glue.command(["reverse-complement", "string", 
			              "--fastaString", fastaString]);
		reverseComplement = reverseComplementResult.reverseComplementFastaResult.reverseComplement;
	});
	return reverseComplement;
}

/*
 * This function takes a fastaMap of id -> { id, nucleotideFasta }, and a result map of id -> ? 
 * and runs BLAST recogniser, to determine whether the sequence is HCV, and if so, whether 
 * it is in the forward direction or reverse complement.
 * The result map will have isForwardHcv set to true if a forward hit was found, false otherwise
 * It will have isReverseHcv set to true if a reverse hit was found, false otherwise
 */
function recogniseFasta(fastaMap, resultMap) {
	var sequenceObjs = _.values(fastaMap);
	_.each(_.values(resultMap), function(resultObj) {
		resultObj.isForwardHcv = false;
		resultObj.isReverseHcv = false;
	});
	var fastaDocument = {
		"nucleotideFasta" : {
			"sequences" : sequenceObjs
		}
	};
	var recogniserResults;
	glue.inMode("module/hcvSequenceRecogniser", function() {
		recogniserResults = glue.tableToObjects(glue.command({
				"recognise": {
					"fasta-document": {
						"fastaCommandDocument": fastaDocument
					}
				}
		}));
	});
	glue.log("FINE", "phdrReportingController.reportFasta recogniserResults:", recogniserResults);
	_.each(recogniserResults, function(recogniserResult) {
		if(recogniserResult.direction == 'FORWARD') {
			resultMap[recogniserResult.querySequenceId].isForwardHcv = true;
		} else if(recogniserResult.direction == 'REVERSE') {
			resultMap[recogniserResult.querySequenceId].isReverseHcv = true;
		} 
	});
}

function addOverview(phdrReport) {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; // January is 0!
	var yyyy = today.getFullYear();
	if(dd < 10) {
	    dd = '0'+dd
	} 
	if(mm < 10) {
	    mm = '0'+mm
	} 
	phdrReport.phdrReport.reportGenerationDate = dd + '/' + mm + '/' + yyyy;
	phdrReport.phdrReport.engineVersion = 
		glue.command(["glue-engine","show-version"]).glueEngineShowVersionResult.glueEngineVersion;
	phdrReport.phdrReport.projectVersion = 
		glue.command(["show","setting","project-version"]).projectShowSettingResult.settingValue;
	phdrReport.phdrReport.extensionVersion = 
		glue.command(["show","extension-setting","phdr","extension-version"]).projectShowExtensionSettingResult.extSettingValue;
	
	phdrReport.phdrReport.phdrSamThresholds = phdrSamThresholds;
	
}

