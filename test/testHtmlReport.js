var fasta1Result = {
		  "fastaReport": {
			    "fastaFilePath": "../HCV-GLUE/exampleQuerySequences/resistanceGeno1AmbiguityY93H.fasta",
			    "sequenceResults": [
			      {
			        "id": "EF407428",
			        "isForwardHcv": true,
			        "isReverseHcv": false,
			        "genotypingResult": {
			          "queryName": "EF407428",
			          "queryCladeCategoryResult": [
			            {
			              "categoryName": "genotype",
			              "categoryDisplayName": "Genotype",
			              "queryCladeResult": [
			                {
			                  "cladeName": "AL_1",
			                  "cladeRenderedName": "HCV Genotype 1",
			                  "percentScore": 100
			                }
			              ],
			              "finalClade": "AL_1",
			              "finalCladeRenderedName": "HCV Genotype 1",
			              "closestMemberAlignmentName": "AL_1a",
			              "closestMemberSourceName": "ncbi-refseqs",
			              "closestMemberSequenceID": "M62321",
			              "shortRenderedName": "1"
			            },
			            {
			              "categoryName": "subtype",
			              "categoryDisplayName": "Subtype",
			              "queryCladeResult": [
			                {
			                  "cladeName": "AL_1a",
			                  "cladeRenderedName": "HCV Subtype 1a",
			                  "percentScore": 100
			                }
			              ],
			              "finalClade": "AL_1a",
			              "finalCladeRenderedName": "HCV Subtype 1a",
			              "closestMemberAlignmentName": "AL_1a",
			              "closestMemberSourceName": "ncbi-refseqs",
			              "closestMemberSequenceID": "M62321",
			              "shortRenderedName": "1a"
			            }
			          ],
			          "genotypeCladeCategoryResult": {
			            "categoryName": "genotype",
			            "categoryDisplayName": "Genotype",
			            "queryCladeResult": [
			              {
			                "cladeName": "AL_1",
			                "cladeRenderedName": "HCV Genotype 1",
			                "percentScore": 100
			              }
			            ],
			            "finalClade": "AL_1",
			            "finalCladeRenderedName": "HCV Genotype 1",
			            "closestMemberAlignmentName": "AL_1a",
			            "closestMemberSourceName": "ncbi-refseqs",
			            "closestMemberSequenceID": "M62321",
			            "shortRenderedName": "1"
			          },
			          "subtypeCladeCategoryResult": {
			            "categoryName": "subtype",
			            "categoryDisplayName": "Subtype",
			            "queryCladeResult": [
			              {
			                "cladeName": "AL_1a",
			                "cladeRenderedName": "HCV Subtype 1a",
			                "percentScore": 100
			              }
			            ],
			            "finalClade": "AL_1a",
			            "finalCladeRenderedName": "HCV Subtype 1a",
			            "closestMemberAlignmentName": "AL_1a",
			            "closestMemberSourceName": "ncbi-refseqs",
			            "closestMemberSequenceID": "M62321",
			            "shortRenderedName": "1a"
			          }
			        },
			        "targetRefName": "REF_1a_M62321",
			        "rasScanResults": [
			          {
			            "referenceName": "REF_MASTER_NC_004102",
			            "featureName": "NS3",
			            "variationName": "phdr_ras:NS3:80K",
			            "variationType": "aminoAcidSimplePolymorphism",
			            "matches": [
			              {
			                "firstRefCodon": "80",
			                "lastRefCodon": "80",
			                "queryAAs": "K",
			                "refNtStart": 3657,
			                "refNtEnd": 3659,
			                "queryNtStart": 3563,
			                "queryNtEnd": 3565,
			                "queryNts": "AAA",
			                "combinedTripletFraction": 1
			              }
			            ]
			          },
			          {
			            "referenceName": "REF_MASTER_NC_004102",
			            "featureName": "NS3",
			            "variationName": "phdr_ras:NS3:168D",
			            "variationType": "aminoAcidSimplePolymorphism",
			            "matches": [
			              {
			                "firstRefCodon": "168",
			                "lastRefCodon": "168",
			                "queryAAs": "D",
			                "refNtStart": 3921,
			                "refNtEnd": 3923,
			                "queryNtStart": 3827,
			                "queryNtEnd": 3829,
			                "queryNts": "GAC",
			                "combinedTripletFraction": 1
			              }
			            ]
			          },
			          {
			            "referenceName": "REF_MASTER_NC_004102",
			            "featureName": "NS5A",
			            "variationName": "phdr_ras:NS5A:30H",
			            "variationType": "aminoAcidSimplePolymorphism",
			            "matches": [
			              {
			                "firstRefCodon": "30",
			                "lastRefCodon": "30",
			                "queryAAs": "H",
			                "refNtStart": 6345,
			                "refNtEnd": 6347,
			                "queryNtStart": 6251,
			                "queryNtEnd": 6253,
			                "queryNts": "CAC",
			                "combinedTripletFraction": 1
			              }
			            ]
			          },
			          {
			            "referenceName": "REF_MASTER_NC_004102",
			            "featureName": "NS5A",
			            "variationName": "phdr_ras:NS5A:30H+93H",
			            "variationType": "conjunction",
			            "matches": [
			              {
			                "conjuncts": [
			                  {
			                    "conjunctIndex": 1,
			                    "referenceName": "REF_MASTER_NC_004102",
			                    "featureName": "NS5A",
			                    "variationName": "phdr_ras:NS5A:30H",
			                    "variationType": "aminoAcidSimplePolymorphism",
			                    "matches": [
			                      {
			                        "firstRefCodon": "30",
			                        "lastRefCodon": "30",
			                        "queryAAs": "H",
			                        "refNtStart": 6345,
			                        "refNtEnd": 6347,
			                        "queryNtStart": 6251,
			                        "queryNtEnd": 6253,
			                        "queryNts": "CAC",
			                        "combinedTripletFraction": 1
			                      }
			                    ]
			                  },
			                  {
			                    "conjunctIndex": 2,
			                    "referenceName": "REF_MASTER_NC_004102",
			                    "featureName": "NS5A",
			                    "variationName": "phdr_ras:NS5A:93H",
			                    "variationType": "aminoAcidSimplePolymorphism",
			                    "matches": [
			                      {
			                        "firstRefCodon": "93",
			                        "lastRefCodon": "93",
			                        "queryAAs": "H",
			                        "refNtStart": 6534,
			                        "refNtEnd": 6536,
			                        "queryNtStart": 6440,
			                        "queryNtEnd": 6442,
			                        "queryNts": "CAY",
			                        "combinedTripletFraction": 1
			                      }
			                    ]
			                  }
			                ]
			              }
			            ]
			          },
			          {
			            "referenceName": "REF_MASTER_NC_004102",
			            "featureName": "NS5A",
			            "variationName": "phdr_ras:NS5A:93H",
			            "variationType": "aminoAcidSimplePolymorphism",
			            "matches": [
			              {
			                "firstRefCodon": "93",
			                "lastRefCodon": "93",
			                "queryAAs": "H",
			                "refNtStart": 6534,
			                "refNtEnd": 6536,
			                "queryNtStart": 6440,
			                "queryNtEnd": 6442,
			                "queryNts": "CAY",
			                "combinedTripletFraction": 1
			              }
			            ]
			          }
			        ],
			        "rasFindings": [
			          {
			            "phdrRasVariation": {
			              "referenceName": "REF_MASTER_NC_004102",
			              "featureName": "NS3",
			              "name": "phdr_ras:NS3:80K",
			              "type": "aminoAcidSimplePolymorphism",
			              "displayName": null,
			              "description": null,
			              "metatag": [
			                {
			                  "name": "SIMPLE_AA_PATTERN",
			                  "value": "K"
			                }
			              ],
			              "resistanceFinding": [
			                {
			                  "drug": "glecaprevir",
			                  "clade": {
			                    "alignmentName": "AL_3",
			                    "displayName": "HCV Genotype 3"
			                  },
			                  "inVivoResult": {
			                    "clinicalTrial": [
			                      {
			                        "id": "Endurance-1",
			                        "displayName": "Endurance-1",
			                        "regimen": "GLE/PIB"
			                      },
			                      {
			                        "id": "Endurance-2",
			                        "displayName": "Endurance-2",
			                        "regimen": "GLE/PIB"
			                      },
			                      {
			                        "id": "Endurance-3",
			                        "displayName": "Endurance-3",
			                        "regimen": "GLE/PIB"
			                      },
			                      {
			                        "id": "Endurance-4",
			                        "displayName": "Endurance-4",
			                        "regimen": "GLE/PIB"
			                      },
			                      {
			                        "id": "Expedition-1",
			                        "displayName": "Expedition-1",
			                        "regimen": "GLE/PIB"
			                      },
			                      {
			                        "id": "Expedition-2",
			                        "displayName": "Expedition-2",
			                        "regimen": "GLE/PIB"
			                      },
			                      {
			                        "id": "Surveyor-1",
			                        "displayName": "Surveyor-1",
			                        "regimen": "GLE/PIB"
			                      },
			                      {
			                        "id": "Surveyor-2",
			                        "displayName": "Surveyor-2",
			                        "regimen": "GLE/PIB"
			                      }
			                    ]
			                  },
			                  "publication": {
			                    "id": "EASL_2017_FRI_205",
			                    "displayName": "Krishnan et al., 2017"
			                  }
			                },
			                {
			                  "drug": "voxilaprevir",
			                  "clade": {
			                    "alignmentName": "AL_1a",
			                    "displayName": "HCV Subtype 1a"
			                  },
			                  "inVivoResult": {
			                    "clinicalTrial": [
			                      {
			                        "id": "POLARIS-2",
			                        "displayName": "POLARIS-2",
			                        "regimen": "SOF/VEL"
			                      },
			                      {
			                        "id": "POLARIS-3",
			                        "displayName": "POLARIS-3",
			                        "regimen": "SOF/VEL"
			                      }
			                    ]
			                  },
			                  "publication": {
			                    "id": "EASL_2017_Abs_THU-257",
			                    "displayName": "Wyles, et al., 2017"
			                  }
			                },
			                {
			                  "drug": "voxilaprevir",
			                  "clade": {
			                    "alignmentName": "AL_3a",
			                    "displayName": "HCV Subtype 3a"
			                  },
			                  "inVitroResult": {
			                    "minEC50FoldChange": 2.5,
			                    "maxEC50FoldChange": 20
			                  },
			                  "publication": {
			                    "id": "AASLD_2017_Abs_1176",
			                    "displayName": "Dvory-Sobol et al., 2017"
			                  }
			                },
			                {
			                  "drug": "voxilaprevir",
			                  "clade": {
			                    "alignmentName": "AL_1a",
			                    "displayName": "HCV Subtype 1a"
			                  },
			                  "inVivoResult": {
			                    "clinicalTrial": [
			                      {
			                        "id": "POLARIS-1",
			                        "displayName": "POLARIS-1",
			                        "regimen": "SOF/VEL/VOX"
			                      },
			                      {
			                        "id": "POLARIS-4",
			                        "displayName": "POLARIS-4",
			                        "regimen": "SOF/VEL"
			                      }
			                    ]
			                  },
			                  "publication": {
			                    "id": "Pooled_phase_III_EASL_2017_Abs_248",
			                    "displayName": "Sarrazin et al., 2017"
			                  }
			                }
			              ]
			            }
			          },
			          {
			            "phdrRasVariation": {
			              "referenceName": "REF_MASTER_NC_004102",
			              "featureName": "NS3",
			              "name": "phdr_ras:NS3:168D",
			              "type": "aminoAcidSimplePolymorphism",
			              "displayName": null,
			              "description": null,
			              "metatag": [
			                {
			                  "name": "SIMPLE_AA_PATTERN",
			                  "value": "D"
			                }
			              ],
			              "resistanceFinding": [
			                {
			                  "drug": "voxilaprevir",
			                  "clade": {
			                    "alignmentName": "AL_5a",
			                    "displayName": "HCV Subtype 5a"
			                  },
			                  "inVivoResult": {
			                    "clinicalTrial": [
			                      {
			                        "id": "POLARIS-2",
			                        "displayName": "POLARIS-2",
			                        "regimen": "SOF/VEL"
			                      },
			                      {
			                        "id": "POLARIS-3",
			                        "displayName": "POLARIS-3",
			                        "regimen": "SOF/VEL"
			                      }
			                    ]
			                  },
			                  "publication": {
			                    "id": "EASL_2017_Abs_THU-257",
			                    "displayName": "Wyles, et al., 2017"
			                  }
			                }
			              ]
			            }
			          },
			          {
			            "phdrRasVariation": {
			              "referenceName": "REF_MASTER_NC_004102",
			              "featureName": "NS5A",
			              "name": "phdr_ras:NS5A:30H",
			              "type": "aminoAcidSimplePolymorphism",
			              "displayName": null,
			              "description": null,
			              "metatag": [
			                {
			                  "name": "SIMPLE_AA_PATTERN",
			                  "value": "H"
			                }
			              ],
			              "resistanceFinding": [
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_1a",
			                    "displayName": "HCV Subtype 1a"
			                  },
			                  "inVitroResult": {
			                    "minEC50FoldChange": 2.3,
			                    "maxEC50FoldChange": 2.3
			                  },
			                  "publication": {
			                    "id": "27353271",
			                    "displayName": "Lawitz et al., 2016"
			                  }
			                }
			              ]
			            }
			          },
			          {
			            "phdrRasVariation": {
			              "referenceName": "REF_MASTER_NC_004102",
			              "featureName": "NS5A",
			              "name": "phdr_ras:NS5A:30H+93H",
			              "type": "conjunction",
			              "displayName": null,
			              "description": null,
			              "metatag": [
			                {
			                  "name": "CONJUNCT_NAME_1",
			                  "value": "phdr_ras:NS5A:30H"
			                },
			                {
			                  "name": "CONJUNCT_NAME_2",
			                  "value": "phdr_ras:NS5A:93H"
			                }
			              ],
			              "resistanceFinding": [
			                {
			                  "drug": "pibrentasvir",
			                  "clade": {
			                    "alignmentName": "AL_1a",
			                    "displayName": "HCV Subtype 1a"
			                  },
			                  "inVivoResult": {
			                    "clinicalTrial": [
			                      {
			                        "id": "Magellan-1_Part_2",
			                        "displayName": "Magellan-1, Part 2",
			                        "regimen": "GLE/PIB"
			                      }
			                    ]
			                  },
			                  "publication": {
			                    "id": "29152781",
			                    "displayName": "Poordad et al., 2018"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_1a",
			                    "displayName": "HCV Subtype 1a"
			                  },
			                  "inVivoResult": {
			                    "clinicalTrial": [
			                      {
			                        "id": "ASTRAL-4",
			                        "displayName": "ASTRAL-4",
			                        "regimen": "SOF/VEL"
			                      }
			                    ]
			                  },
			                  "publication": {
			                    "id": "26569658",
			                    "displayName": "Curry et al., 2015"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_1a",
			                    "displayName": "HCV Subtype 1a"
			                  },
			                  "inVitroResult": {
			                    "minEC50FoldChange": 2835,
			                    "maxEC50FoldChange": 2835
			                  },
			                  "publication": {
			                    "id": "27353271",
			                    "displayName": "Lawitz et al., 2016"
			                  }
			                }
			              ]
			            }
			          },
			          {
			            "phdrRasVariation": {
			              "referenceName": "REF_MASTER_NC_004102",
			              "featureName": "NS5A",
			              "name": "phdr_ras:NS5A:93H",
			              "type": "aminoAcidSimplePolymorphism",
			              "displayName": null,
			              "description": null,
			              "metatag": [
			                {
			                  "name": "SIMPLE_AA_PATTERN",
			                  "value": "H"
			                }
			              ],
			              "resistanceFinding": [
			                {
			                  "drug": "pibrentasvir",
			                  "clade": {
			                    "alignmentName": "AL_3a",
			                    "displayName": "HCV Subtype 3a"
			                  },
			                  "inVitroResult": {
			                    "minEC50FoldChange": 2.3,
			                    "maxEC50FoldChange": 2.3
			                  },
			                  "publication": {
			                    "id": "28193664",
			                    "displayName": "Ng et al., 2017"
			                  }
			                },
			                {
			                  "drug": "pibrentasvir",
			                  "clade": {
			                    "alignmentName": "AL_3",
			                    "displayName": "HCV Genotype 3"
			                  },
			                  "inVivoResult": {
			                    "clinicalTrial": [
			                      {
			                        "id": "Endurance-1",
			                        "displayName": "Endurance-1",
			                        "regimen": "GLE/PIB"
			                      },
			                      {
			                        "id": "Endurance-2",
			                        "displayName": "Endurance-2",
			                        "regimen": "GLE/PIB"
			                      },
			                      {
			                        "id": "Endurance-3",
			                        "displayName": "Endurance-3",
			                        "regimen": "GLE/PIB"
			                      },
			                      {
			                        "id": "Endurance-4",
			                        "displayName": "Endurance-4",
			                        "regimen": "GLE/PIB"
			                      },
			                      {
			                        "id": "Expedition-1",
			                        "displayName": "Expedition-1",
			                        "regimen": "GLE/PIB"
			                      },
			                      {
			                        "id": "Expedition-2",
			                        "displayName": "Expedition-2",
			                        "regimen": "GLE/PIB"
			                      },
			                      {
			                        "id": "Surveyor-1",
			                        "displayName": "Surveyor-1",
			                        "regimen": "GLE/PIB"
			                      },
			                      {
			                        "id": "Surveyor-2",
			                        "displayName": "Surveyor-2",
			                        "regimen": "GLE/PIB"
			                      }
			                    ]
			                  },
			                  "publication": {
			                    "id": "EASL_2017_FRI_205",
			                    "displayName": "Krishnan et al., 2017"
			                  }
			                },
			                {
			                  "drug": "pibrentasvir",
			                  "clade": {
			                    "alignmentName": "AL_1a",
			                    "displayName": "HCV Subtype 1a"
			                  },
			                  "inVivoResult": {
			                    "clinicalTrial": [
			                      {
			                        "id": "Magellan-1_Part_2",
			                        "displayName": "Magellan-1, Part 2",
			                        "regimen": "GLE/PIB"
			                      }
			                    ]
			                  },
			                  "publication": {
			                    "id": "29152781",
			                    "displayName": "Poordad et al., 2018"
			                  }
			                },
			                {
			                  "drug": "pibrentasvir",
			                  "clade": {
			                    "alignmentName": "AL_1a",
			                    "displayName": "HCV Subtype 1a"
			                  },
			                  "inVitroResult": {
			                    "minEC50FoldChange": 6.7,
			                    "maxEC50FoldChange": 6.7
			                  },
			                  "publication": {
			                    "id": "28193664",
			                    "displayName": "Ng et al., 2017"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_3a",
			                    "displayName": "HCV Subtype 3a"
			                  },
			                  "inVitroResult": {
			                    "minEC50FoldChange": 246.2,
			                    "maxEC50FoldChange": 246.2
			                  },
			                  "publication": {
			                    "id": "EASL_2013_Poster_1191",
			                    "displayName": "Cheng et al., 2013"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_3",
			                    "displayName": "HCV Genotype 3"
			                  },
			                  "inVivoResult": {
			                    "clinicalTrial": [
			                      {
			                        "id": "NCT02300103",
			                        "displayName": "NCT02300103",
			                        "regimen": "SOF/VEL"
			                      }
			                    ]
			                  },
			                  "publication": {
			                    "id": "28498551",
			                    "displayName": "Gane et al., 2017"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_3a",
			                    "displayName": "HCV Subtype 3a"
			                  },
			                  "inVivoResult": {
			                    "clinicalTrial": [
			                      {
			                        "id": "NCT02300103",
			                        "displayName": "NCT02300103",
			                        "regimen": "SOF/VEL"
			                      }
			                    ]
			                  },
			                  "publication": {
			                    "id": "28498551",
			                    "displayName": "Gane et al., 2017"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_3a",
			                    "displayName": "HCV Subtype 3a"
			                  },
			                  "inVivoResult": {
			                    "clinicalTrial": [
			                      {
			                        "id": "ASTRAL-4",
			                        "displayName": "ASTRAL-4",
			                        "regimen": "SOF/VEL"
			                      }
			                    ]
			                  },
			                  "publication": {
			                    "id": "26569658",
			                    "displayName": "Curry et al., 2015"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_3a",
			                    "displayName": "HCV Subtype 3a"
			                  },
			                  "inVivoResult": {
			                    "clinicalTrial": [
			                      {
			                        "id": "ASTRAL-4",
			                        "displayName": "ASTRAL-4",
			                        "regimen": "SOF/VEL"
			                      }
			                    ]
			                  },
			                  "publication": {
			                    "id": "26569658",
			                    "displayName": "Curry et al., 2015"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_3",
			                    "displayName": "HCV Genotype 3"
			                  },
			                  "inVivoResult": {
			                    "clinicalTrial": [
			                      {
			                        "id": "ASTRAL-4",
			                        "displayName": "ASTRAL-4",
			                        "regimen": "SOF/VEL"
			                      }
			                    ]
			                  },
			                  "publication": {
			                    "id": "26569658",
			                    "displayName": "Curry et al., 2015"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_1b",
			                    "displayName": "HCV Subtype 1b"
			                  },
			                  "inVivoResult": {
			                    "clinicalTrial": [
			                      {
			                        "id": "ASTRAL-4",
			                        "displayName": "ASTRAL-4",
			                        "regimen": "SOF/VEL"
			                      }
			                    ]
			                  },
			                  "publication": {
			                    "id": "26569658",
			                    "displayName": "Curry et al., 2015"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_1a",
			                    "displayName": "HCV Subtype 1a"
			                  },
			                  "inVitroResult": {
			                    "minEC50FoldChange": 80,
			                    "maxEC50FoldChange": 999
			                  },
			                  "publication": {
			                    "id": "29274866",
			                    "displayName": "Gottwein et al., 2018"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_1a",
			                    "displayName": "HCV Subtype 1a"
			                  },
			                  "inVitroResult": {
			                    "minEC50FoldChange": 609.1,
			                    "maxEC50FoldChange": 609.1
			                  },
			                  "publication": {
			                    "id": "EASL_2013_Poster_1191",
			                    "displayName": "Cheng et al., 2013"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_2a",
			                    "displayName": "HCV Subtype 2a"
			                  },
			                  "inVitroResult": {
			                    "minEC50FoldChange": 999,
			                    "maxEC50FoldChange": null
			                  },
			                  "publication": {
			                    "id": "29274866",
			                    "displayName": "Gottwein et al., 2018"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_2b",
			                    "displayName": "HCV Subtype 2b"
			                  },
			                  "inVitroResult": {
			                    "minEC50FoldChange": 999,
			                    "maxEC50FoldChange": null
			                  },
			                  "publication": {
			                    "id": "29274866",
			                    "displayName": "Gottwein et al., 2018"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_3a",
			                    "displayName": "HCV Subtype 3a"
			                  },
			                  "inVitroResult": {
			                    "minEC50FoldChange": 80,
			                    "maxEC50FoldChange": 999
			                  },
			                  "publication": {
			                    "id": "29274866",
			                    "displayName": "Gottwein et al., 2018"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_1a",
			                    "displayName": "HCV Subtype 1a"
			                  },
			                  "inVitroResult": {
			                    "minEC50FoldChange": 609.1,
			                    "maxEC50FoldChange": 609.1
			                  },
			                  "publication": {
			                    "id": "27353271",
			                    "displayName": "Lawitz et al., 2016"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_1b",
			                    "displayName": "HCV Subtype 1b"
			                  },
			                  "inVitroResult": {
			                    "minEC50FoldChange": 3.3,
			                    "maxEC50FoldChange": 3.3
			                  },
			                  "publication": {
			                    "id": "27353271",
			                    "displayName": "Lawitz et al., 2016"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_2a",
			                    "displayName": "HCV Subtype 2a"
			                  },
			                  "inVitroResult": {
			                    "minEC50FoldChange": 45.7,
			                    "maxEC50FoldChange": 45.7
			                  },
			                  "publication": {
			                    "id": "27353271",
			                    "displayName": "Lawitz et al., 2016"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_3a",
			                    "displayName": "HCV Subtype 3a"
			                  },
			                  "inVitroResult": {
			                    "minEC50FoldChange": 723.5,
			                    "maxEC50FoldChange": 723.5
			                  },
			                  "publication": {
			                    "id": "27353271",
			                    "displayName": "Lawitz et al., 2016"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_4a",
			                    "displayName": "HCV Subtype 4a"
			                  },
			                  "inVitroResult": {
			                    "minEC50FoldChange": 2.9,
			                    "maxEC50FoldChange": 2.9
			                  },
			                  "publication": {
			                    "id": "27353271",
			                    "displayName": "Lawitz et al., 2016"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_1a",
			                    "displayName": "HCV Subtype 1a"
			                  },
			                  "inVitroResult": {
			                    "minEC50FoldChange": 609,
			                    "maxEC50FoldChange": 609
			                  },
			                  "inVivoResult": {
			                    "clinicalTrial": [
			                      {
			                        "id": "ASTRAL-1",
			                        "displayName": "ASTRAL-1",
			                        "regimen": "SOF/VEL"
			                      },
			                      {
			                        "id": "ASTRAL-2",
			                        "displayName": "ASTRAL-2",
			                        "regimen": "SOF/VEL"
			                      },
			                      {
			                        "id": "ASTRAL-3",
			                        "displayName": "ASTRAL-3",
			                        "regimen": "SOF/VEL"
			                      },
			                      {
			                        "id": "ASTRAL-5",
			                        "displayName": "ASTRAL-5",
			                        "regimen": "SOF/VEL"
			                      },
			                      {
			                        "id": "POLARIS-2",
			                        "displayName": "POLARIS-2",
			                        "regimen": "SOF/VEL"
			                      },
			                      {
			                        "id": "POLARIS-3",
			                        "displayName": "POLARIS-3",
			                        "regimen": "SOF/VEL"
			                      }
			                    ]
			                  },
			                  "publication": {
			                    "id": "29221887",
			                    "displayName": "Hezode et al., 2018"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_3a",
			                    "displayName": "HCV Subtype 3a"
			                  },
			                  "inVitroResult": {
			                    "minEC50FoldChange": 302,
			                    "maxEC50FoldChange": 1221
			                  },
			                  "inVivoResult": {
			                    "clinicalTrial": [
			                      {
			                        "id": "ASTRAL-1",
			                        "displayName": "ASTRAL-1",
			                        "regimen": "SOF/VEL"
			                      },
			                      {
			                        "id": "ASTRAL-2",
			                        "displayName": "ASTRAL-2",
			                        "regimen": "SOF/VEL"
			                      },
			                      {
			                        "id": "ASTRAL-3",
			                        "displayName": "ASTRAL-3",
			                        "regimen": "SOF/VEL"
			                      },
			                      {
			                        "id": "ASTRAL-5",
			                        "displayName": "ASTRAL-5",
			                        "regimen": "SOF/VEL"
			                      },
			                      {
			                        "id": "POLARIS-2",
			                        "displayName": "POLARIS-2",
			                        "regimen": "SOF/VEL"
			                      },
			                      {
			                        "id": "POLARIS-3",
			                        "displayName": "POLARIS-3",
			                        "regimen": "SOF/VEL"
			                      }
			                    ]
			                  },
			                  "publication": {
			                    "id": "29221887",
			                    "displayName": "Hezode et al., 2018"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_3a",
			                    "displayName": "HCV Subtype 3a"
			                  },
			                  "inVitroResult": {
			                    "minEC50FoldChange": 74,
			                    "maxEC50FoldChange": 1138
			                  },
			                  "inVivoResult": {
			                    "clinicalTrial": [
			                      {
			                        "id": "ASTRAL-1",
			                        "displayName": "ASTRAL-1",
			                        "regimen": "SOF/VEL"
			                      },
			                      {
			                        "id": "ASTRAL-2",
			                        "displayName": "ASTRAL-2",
			                        "regimen": "SOF/VEL"
			                      },
			                      {
			                        "id": "ASTRAL-3",
			                        "displayName": "ASTRAL-3",
			                        "regimen": "SOF/VEL"
			                      },
			                      {
			                        "id": "ASTRAL-5",
			                        "displayName": "ASTRAL-5",
			                        "regimen": "SOF/VEL"
			                      },
			                      {
			                        "id": "POLARIS-2",
			                        "displayName": "POLARIS-2",
			                        "regimen": "SOF/VEL"
			                      },
			                      {
			                        "id": "POLARIS-3",
			                        "displayName": "POLARIS-3",
			                        "regimen": "SOF/VEL"
			                      }
			                    ]
			                  },
			                  "publication": {
			                    "id": "29221887",
			                    "displayName": "Hezode et al., 2018"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_3a",
			                    "displayName": "HCV Subtype 3a"
			                  },
			                  "inVivoResult": {
			                    "clinicalTrial": [
			                      {
			                        "id": "ASTRAL-3",
			                        "displayName": "ASTRAL-3",
			                        "regimen": "SOF/VEL"
			                      }
			                    ]
			                  },
			                  "publication": {
			                    "id": "26575258",
			                    "displayName": "Foster et al., 2015"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_3a",
			                    "displayName": "HCV Subtype 3a"
			                  },
			                  "inVivoResult": {
			                    "clinicalTrial": [
			                      {
			                        "id": "ASTRAL-3",
			                        "displayName": "ASTRAL-3",
			                        "regimen": "SOF/VEL"
			                      }
			                    ]
			                  },
			                  "publication": {
			                    "id": "26575258",
			                    "displayName": "Foster et al., 2015"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_3",
			                    "displayName": "HCV Genotype 3"
			                  },
			                  "inVivoResult": {
			                    "clinicalTrial": [
			                      {
			                        "id": "ASTRAL-3",
			                        "displayName": "ASTRAL-3",
			                        "regimen": "SOF/VEL"
			                      }
			                    ]
			                  },
			                  "publication": {
			                    "id": "26575258",
			                    "displayName": "Foster et al., 2015"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_3a",
			                    "displayName": "HCV Subtype 3a"
			                  },
			                  "inVivoResult": {
			                    "clinicalTrial": [
			                      {
			                        "id": "POLARIS-1",
			                        "displayName": "POLARIS-1",
			                        "regimen": "SOF/VEL/VOX"
			                      }
			                    ]
			                  },
			                  "publication": {
			                    "id": "28564569",
			                    "displayName": "Bourlière et al., 2017"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_1a",
			                    "displayName": "HCV Subtype 1a"
			                  },
			                  "inVivoResult": {
			                    "clinicalTrial": [
			                      {
			                        "id": "POLARIS-4",
			                        "displayName": "POLARIS-4",
			                        "regimen": "SOF/VEL"
			                      }
			                    ]
			                  },
			                  "publication": {
			                    "id": "28564569",
			                    "displayName": "Bourlière et al., 2017"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_1a",
			                    "displayName": "HCV Subtype 1a"
			                  },
			                  "inVivoResult": {
			                    "clinicalTrial": [
			                      {
			                        "id": "POLARIS-4",
			                        "displayName": "POLARIS-4",
			                        "regimen": "SOF/VEL"
			                      }
			                    ]
			                  },
			                  "publication": {
			                    "id": "28564569",
			                    "displayName": "Bourlière et al., 2017"
			                  }
			                },
			                {
			                  "drug": "velpatasvir",
			                  "clade": {
			                    "alignmentName": "AL_3a",
			                    "displayName": "HCV Subtype 3a"
			                  },
			                  "inVivoResult": {
			                    "clinicalTrial": [
			                      {
			                        "id": "POLARIS-4",
			                        "displayName": "POLARIS-4",
			                        "regimen": "SOF/VEL"
			                      }
			                    ]
			                  },
			                  "publication": {
			                    "id": "28564569",
			                    "displayName": "Bourlière et al., 2017"
			                  }
			                }
			              ]
			            }
			          }
			        ]
			      }
			    ],
			    "publications": [
			      {
			        "id": "26569658",
			        "authors_short": "Curry et al.",
			        "authors_full": "Curry MP, O'Leary JG, Bzowej N, Muir AJ, Korenblat KM, Fenkel JM, Reddy KR, Lawitz E, Flamm SL, Schiano T, Teperman L, Fontana R, Schiff E, Fried M, Doehle B, An D, McNally J, Osinusi A, Brainard DM, McHutchison JG, Brown RS Jr, Charlton M",
			        "title": "Sofosbuvir and Velpatasvir for HCV in Patients with Decompensated Cirrhosis.",
			        "year": "2015",
			        "journal": "N. Engl. J. Med.",
			        "volume": "373",
			        "issue": "27",
			        "pages": "2618-28",
			        "url": "https://doi.org/10.1056/NEJMoa1512614"
			      },
			      {
			        "id": "26575258",
			        "authors_short": "Foster et al.",
			        "authors_full": "Foster GR, Afdhal N, Roberts SK, Bräu N, Gane EJ, Pianko S, Lawitz E, Thompson A, Shiffman ML, Cooper C, Towner WJ, Conway B, Ruane P, Bourlière M, Asselah T, Berg T, Zeuzem S, Rosenberg W, Agarwal K, Stedman CA, Mo H, Dvory-Sobol H, Han L, Wang J, McNally J, Osinusi A, Brainard DM, McHutchison JG, Mazzotta F, Tran TT, Gordon SC, Patel K, Reau N, Mangia A, Sulkowski M",
			        "title": "Sofosbuvir and Velpatasvir for HCV Genotype 2 and 3 Infection.",
			        "year": "2015",
			        "journal": "N. Engl. J. Med.",
			        "volume": "373",
			        "issue": "27",
			        "pages": "2608-17",
			        "url": "https://doi.org/10.1056/NEJMoa1512612"
			      },
			      {
			        "id": "27353271",
			        "authors_short": "Lawitz et al.",
			        "authors_full": "Lawitz EJ, Dvory-Sobol H, Doehle BP, Worth AS, McNally J, Brainard DM, Link JO, Miller MD, Mo H",
			        "title": "Clinical Resistance to Velpatasvir (GS-5816), a Novel Pan-Genotypic Inhibitor of the Hepatitis C Virus NS5A Protein.",
			        "year": "2016",
			        "journal": "Antimicrob. Agents Chemother.",
			        "volume": "60",
			        "issue": "9",
			        "pages": "5368-78",
			        "url": "https://doi.org/10.1128/AAC.00763-16"
			      },
			      {
			        "id": "28193664",
			        "authors_short": "Ng et al.",
			        "authors_full": "Ng TI, Krishnan P, Pilot-Matias T, Kati W, Schnell G, Beyer J, Reisch T, Lu L, Dekhtyar T, Irvin M, Tripathi R, Maring C, Randolph JT, Wagner R, Collins C",
			        "title": "In Vitro Antiviral Activity and Resistance Profile of the Next-Generation Hepatitis C Virus NS5A Inhibitor Pibrentasvir.",
			        "year": "2017",
			        "journal": "Antimicrob. Agents Chemother.",
			        "volume": "61",
			        "issue": "5",
			        "pages": null,
			        "url": "https://doi.org/10.1128/AAC.02558-16"
			      },
			      {
			        "id": "28498551",
			        "authors_short": "Gane et al.",
			        "authors_full": "Gane EJ, Shiffman ML, Etzkorn K, Morelli G, Stedman CAM, Davis MN, Hinestrosa F, Dvory-Sobol H, Huang KC, Osinusi A, McNally J, Brainard DM, McHutchison JG, Thompson AJ, Sulkowski MS",
			        "title": "Sofosbuvir-velpatasvir with ribavirin for 24 weeks in hepatitis C virus patients previously treated with a direct-acting antiviral regimen.",
			        "year": "2017",
			        "journal": "Hepatology",
			        "volume": "66",
			        "issue": "4",
			        "pages": "1083-1089",
			        "url": "https://doi.org/10.1002/hep.29256"
			      },
			      {
			        "id": "28564569",
			        "authors_short": "Bourlière et al.",
			        "authors_full": "Bourlière M, Gordon SC, Flamm SL, Cooper CL, Ramji A, Tong M, Ravendhran N, Vierling JM, Tran TT, Pianko S, Bansal MB, de Lédinghen V, Hyland RH, Stamm LM, Dvory-Sobol H, Svarovskaia E, Zhang J, Huang KC, Subramanian GM, Brainard DM, McHutchison JG, Verna EC, Buggisch P, Landis CS, Younes ZH, Curry MP, Strasser SI, Schiff ER, Reddy KR, Manns MP, Kowdley KV, Zeuzem S",
			        "title": "Sofosbuvir, Velpatasvir, and Voxilaprevir for Previously Treated HCV Infection.",
			        "year": "2017",
			        "journal": "N. Engl. J. Med.",
			        "volume": "376",
			        "issue": "22",
			        "pages": "2134-2146",
			        "url": "https://doi.org/10.1056/NEJMoa1613512"
			      },
			      {
			        "id": "29152781",
			        "authors_short": "Poordad et al.",
			        "authors_full": "Poordad F, Pol S, Asatryan A, Buti M, Shaw D, Hézode C, Felizarta F, Reindollar RW, Gordon SC, Pianko S, Fried MW, Bernstein DE, Gallant J, Lin CW, Lei Y, Ng TI, Krishnan P, Kopecky-Bromberg S, Kort J, Mensa FJ",
			        "title": "Glecaprevir/Pibrentasvir in patients with hepatitis C virus genotype 1 or 4 and past direct-acting antiviral treatment failure.",
			        "year": "2018",
			        "journal": "Hepatology",
			        "volume": "67",
			        "issue": "4",
			        "pages": "1253-1260",
			        "url": "https://doi.org/10.1002/hep.29671"
			      },
			      {
			        "id": "29221887",
			        "authors_short": "Hezode et al.",
			        "authors_full": "Hezode C, Reau N, Svarovskaia ES, Doehle BP, Shanmugam R, Dvory-Sobol H, Hedskog C, McNally J, Osinusi A, Brainard DM, Miller MD, Mo H, Roberts SK, O'Leary JG, Shafran SD, Zeuzem S",
			        "title": "Resistance analysis in patients with genotype 1-6 HCV infection treated with sofosbuvir/velpatasvir in the phase III studies.",
			        "year": "2018",
			        "journal": "J. Hepatol.",
			        "volume": "68",
			        "issue": "5",
			        "pages": "895-903",
			        "url": "https://doi.org/10.1016/j.jhep.2017.11.032"
			      },
			      {
			        "id": "29274866",
			        "authors_short": "Gottwein et al.",
			        "authors_full": "Gottwein JM, Pham LV, Mikkelsen LS, Ghanem L, Ramirez S, Scheel TKH, Carlsen THR, Bukh J",
			        "title": "Efficacy of NS5A Inhibitors Against Hepatitis C Virus Genotypes 1-7 and Escape Variants.",
			        "year": "2018",
			        "journal": "Gastroenterology",
			        "volume": "154",
			        "issue": "5",
			        "pages": "1435-1448",
			        "url": "https://doi.org/10.1053/j.gastro.2017.12.015"
			      },
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
			        "url": "https://doi.org/10.1016/S0168-8278(17)31399-5"
			      },
			      {
			        "id": "EASL_2017_Abs_THU-257",
			        "authors_short": "Wyles, et al.",
			        "authors_full": "D. Wyles, A. Thompson, E. Lawitz, B. Willems, E.J. Gane, E. Svarovskaia, H. Dvory-Sobol, R. Martin, G. Camus, B.P. Doehle, L.M. Stamm, R.H. Hyland, D.M. Brainard, H.M. Mo, T. Asselah, I. Jacobson, G.R. Foster and S. Roberts",
			        "title": "No impact of RASs on the high efficacy of SOF/VEL/VOX for 8 weeks in DAA-naïve patients: an integrated resistance analysis of the POLARIS-2 and POLARIS-3 studies",
			        "year": "2017",
			        "journal": "J. Hepatol.",
			        "volume": "66",
			        "issue": "1",
			        "pages": "S303",
			        "url": "https://doi.org/10.1016/S0168-8278(17)30924-8"
			      },
			      {
			        "id": "AASLD_2017_Abs_1176",
			        "authors_short": "Dvory-Sobol et al.",
			        "authors_full": "H. Dvory-Sobol, B. Han, J. Lu, B. Parhy, D. Hsieh, E. Zhou, M. Bourlière, I. Jacobson, L. M. Stamm, G. Camus, R. Martin, E. S. Svarovskaia and H. Mo",
			        "title": "Susceptibility to Voxilaprevir of NS3 Resistance-Associated Substitutions and of Clinical Isolates from Direct Acting Antiviral-Experienced and-Naive Patients",
			        "year": "2017",
			        "journal": "Hepatology",
			        "volume": "66",
			        "issue": "S1",
			        "pages": "632A",
			        "url": "https://doi.org/10.1002/hep.29501"
			      },
			      {
			        "id": "Pooled_phase_III_EASL_2017_Abs_248",
			        "authors_short": "Sarrazin et al.",
			        "authors_full": "C. Sarrazin, C.L. Cooper, M.P. Manns, R.K. Reddy, K. Kowdley, H. Dvory-Sobol, E. Svarovskia, R. Martin, B.P. Doehle, G. Camus, L.M. Stamm, R.H. Hyland, D.M. Brainard, H. Mo, S.C. Gordon, M. Bourlière, S. Zeuzem and S.L. Flamm",
			        "title": "No impact of RASs on the high efficacy of SOF/VEL/VOX for 12 weeks in DAA-experienced patients: an integrated resistance analysis of the POLARIS-1 and POLARIS-4 studies",
			        "year": "2017",
			        "journal": "J. Hepatol.",
			        "volume": "66",
			        "issue": "1",
			        "pages": "S299",
			        "url": "https://doi.org/10.1016/S0168-8278(17)30915-7"
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
			        "url": "https://doi.org/10.1016/S0168-8278(13)61192-7"
			      }
			    ]
			  }
			};


var fasta2Result ={
	    "fastaReport":{
	        "fastaFilePath":"nonsense.fasta",
	        "sequenceResults":[
	            {
	                "id":"Nonsense",
	                "isForwardHcv":false,
	                "isReverseHcv":false
	            }
	        ],
	        "publications":[
	        ]
	    }
	};

var fasta3Result = {
	    "fastaReport":{
	        "fastaFilePath":"test/unclearSubtype.fasta",
	        "sequenceResults":[
	            {
	                "id":"unclearSubtype",
	                "isForwardHcv":true,
	                "isReverseHcv":false,
	                "genotypingResult":{
	                    "queryName":"unclearSubtype",
	                    "queryCladeCategoryResult":[
	                        {
	                            "categoryName":"genotype",
	                            "categoryDisplayName":"Genotype",
	                            "queryCladeResult":[
	                                {
	                                    "cladeName":"AL_1",
	                                    "cladeRenderedName":"HCV Genotype 1",
	                                    "percentScore":100
	                                }
	                            ],
	                            "finalClade":"AL_1",
	                            "finalCladeRenderedName":"HCV Genotype 1",
	                            "closestMemberAlignmentName":"AL_1c",
	                            "closestMemberSourceName":"ncbi-refseqs",
	                            "closestMemberSequenceID":"AY651061",
	                            "shortRenderedName":"1"
	                        },
	                        {
	                            "categoryName":"subtype",
	                            "categoryDisplayName":"Subtype",
	                            "queryCladeResult":[
	                                {
	                                    "cladeName":"AL_1c",
	                                    "cladeRenderedName":"HCV Subtype 1c",
	                                    "percentScore":43.17024143244757
	                                },
	                                {
	                                    "cladeName":"AL_1a",
	                                    "cladeRenderedName":"HCV Subtype 1a",
	                                    "percentScore":56.671601059496254
	                                },
	                                {
	                                    "cladeName":"AL_1n",
	                                    "cladeRenderedName":"HCV Subtype 1n",
	                                    "percentScore":0.15815750805618678
	                                }
	                            ],
	                            "finalClade":null,
	                            "finalCladeRenderedName":null,
	                            "closestMemberAlignmentName":null,
	                            "closestMemberSourceName":null,
	                            "closestMemberSequenceID":null,
	                            "shortRenderedName":"unknown"
	                        }
	                    ],
	                    "genotypeCladeCategoryResult":{
	                        "categoryName":"genotype",
	                        "categoryDisplayName":"Genotype",
	                        "queryCladeResult":[
	                            {
	                                "cladeName":"AL_1",
	                                "cladeRenderedName":"HCV Genotype 1",
	                                "percentScore":100
	                            }
	                        ],
	                        "finalClade":"AL_1",
	                        "finalCladeRenderedName":"HCV Genotype 1",
	                        "closestMemberAlignmentName":"AL_1c",
	                        "closestMemberSourceName":"ncbi-refseqs",
	                        "closestMemberSequenceID":"AY651061",
	                        "shortRenderedName":"1"
	                    },
	                    "subtypeCladeCategoryResult":{
	                        "categoryName":"subtype",
	                        "categoryDisplayName":"Subtype",
	                        "queryCladeResult":[
	                            {
	                                "cladeName":"AL_1c",
	                                "cladeRenderedName":"HCV Subtype 1c",
	                                "percentScore":43.17024143244757
	                            },
	                            {
	                                "cladeName":"AL_1a",
	                                "cladeRenderedName":"HCV Subtype 1a",
	                                "percentScore":56.671601059496254
	                            },
	                            {
	                                "cladeName":"AL_1n",
	                                "cladeRenderedName":"HCV Subtype 1n",
	                                "percentScore":0.15815750805618678
	                            }
	                        ],
	                        "finalClade":null,
	                        "finalCladeRenderedName":null,
	                        "closestMemberAlignmentName":null,
	                        "closestMemberSourceName":null,
	                        "closestMemberSequenceID":null,
	                        "shortRenderedName":"unknown"
	                    }
	                },
	                "targetRefName":"REF_1c_AY651061",
	                "rasScanResults":[
	                ],
	                "rasFindings":[
	                ]
	            }
	        ],
	        "publications":[
	        ]
	    }
	};

glue.inMode("module/phdrRasReportTransformer", function() {
	glue.command({"transform-to-file" : {
		commandDocument: fasta1Result,
		outputFile: "test/fasta1Report.html"
	}});
});

glue.inMode("module/phdrRasReportTransformer", function() {
	glue.command({"transform-to-file" : {
		commandDocument: fasta2Result,
		outputFile: "test/fasta2Report.html"
	}});
});

glue.inMode("module/phdrRasReportTransformer", function() {
	glue.command({"transform-to-file" : {
		commandDocument: fasta3Result,
		outputFile: "test/fasta3Report.html"
	}});
});