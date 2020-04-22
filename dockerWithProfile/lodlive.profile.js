$.jStorage
		.set(
				'profile',
				{
					// parametri di connessione agli endpoint
					'connection' : {
						// base degli about dei documenti non dell'ontologia
						'https://w3id.org/arco/resource/' : {
							description : {
								en : 'ArCo'
							},
							useForInverseSameAs : false,
							sparql : {
								allClasses : 'SELECT DISTINCT ?object  WHERE {[] a ?object} ORDER BY ?object  LIMIT 50  ',
								findSubject : 'SELECT DISTINCT ?subject WHERE { {?subject a <{CLASS}>;<http://purl.org/dc/elements/1.1/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2000/01/rdf-schema#label> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2004/02/skos/core#prefLabel> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} } LIMIT 1',
								documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object.FILTER ((( isIRI(?object) && ?property != <http://xmlns.com/foaf/0.1/depiction> )|| ?property = <http://www.w3.org/2000/01/rdf-schema#label>  || ?property = <http://www.georss.org/georss/point> || ?property = <http://xmlns.com/foaf/0.1/surname> || ?property = <http://xmlns.com/foaf/0.1/name> || ?property = <http://purl.org/dc/elements/1.1/title>))}  ORDER BY ?property',
								document : 'SELECT DISTINCT *  WHERE  {{<{URI}> ?property ?object. FILTER(!isLiteral(?object))} UNION 	 {<{URI}> ?property 	 ?object.FILTER(isLiteral(?object)).FILTER(lang(?object) ="fr")} UNION 	 {<{URI}> ?property 	 ?object.FILTER(isLiteral(?object)).FILTER(lang(?object) ="en")} UNION 	 {<{URI}> ?property 	 ?object.FILTER(isLiteral(?object)).FILTER(lang(?object) ="it")}}  ORDER BY ?property',
								bnode : 'SELECT DISTINCT *  WHERE {<{URI}> ?property ?object}',
								inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}>} LIMIT 100',
								inverseSameAs : 'SELECT DISTINCT * WHERE {?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}>}'
							},
							endpoint : 'http://dati.beniculturali.it/sparql',
							examples : []
						}

					},

					/*
					 * 
					 * you can specify the properties you want to show in the
					 * black doc info box you can also specify a custom label
					 * 
					 */
					// 'http://domain.of.my.resources/' : {
					// document : {
					// propertiesMapper : {
					// "http://xmlns.com/foaf/0.1/gender" : "gender",
					// "http://xmlns.com/foaf/0.1/firstName" : "first name",
					// "http://xmlns.com/foaf/0.1/familyName" : "family name"
					// }
					// },
					// },
					arrows : {
						'http://www.w3.org/2002/07/owl#sameAs' : 'isSameAs',
						'http://purl.org/dc/terms/isPartOf' : 'isPartOf',
						'http://purl.org/dc/elements/1.1/type' : 'isType',
						'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' : 'isType'
					},
					// custom labels on arcs
					labeler : {
						'http://dbpedia.org/ontology/currency' : 'currency'
					},
					uriSubstitutor : [ {
						findStr : 'mpii.de/yago/resource/',
						replaceStr : 'yago-knowledge.org/resource/'
					} ],

					// configurazione standard per la rappresentazione di un
					// documento
					// utilizzata nel caso manchi una specifica configurazione
					// per la classe
					'default' : {
						sparql : {
							allClasses : 'SELECT DISTINCT ?object WHERE {[] a ?object}',
							findSubject : 'SELECT DISTINCT ?subject WHERE { {?subject a <{CLASS}>;<http://purl.org/dc/elements/1.1/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2000/01/rdf-schema#label> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2004/02/skos/core#prefLabel> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} }  LIMIT 1  ',
							documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object. FILTER(?property != <http://dbpedia.org/ontology/wikiPageWikiLink>)} ORDER BY ?property',
							document : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
							bnode : 'SELECT DISTINCT *  WHERE {<{URI}> ?property ?object}',
							inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}>.} LIMIT 100',
							inverseSameAs : 'SELECT DISTINCT * WHERE {?object ?t <{URI}> } '
						},
						endpoint : 'http://labs.regesta.com/resourceProxy/',
						document : {
							className : 'standard',
							titleProperties : [
									'http://dati.senato.it/osr/titolo',
									'http://www.w3.org/2004/02/skos/core#notation',
									'http://www.w3.org/1999/02/22-rdf-syntax-ns#value',
									'http://www.geonames.org/ontology#name',
									'http://purl.org/dc/elements/1.1/title',
									'http://purl.org/dc/terms/title',
									'http://www.w3.org/2000/01/rdf-schema#label',
									'http://www.w3.org/2004/02/skos/core#prefLabel',
									'http://logd.tw.rpi.edu/source/visualizing-org/dataset/2010-global-agenda-council-interlinkage-survey/vocab/enhancement/1/how_councils_interlink',
									'http://rdf.freebase.com/ns/type.object.name',
									'http://spcdata.digitpa.gov.it/nome_cognome',
									'http://xmlns.com/foaf/0.1/firstName',
									'http://xmlns.com/foaf/0.1/lastName',
									'http://xmlns.com/foaf/0.1/surname',
									'http://xmlns.com/foaf/0.1/name',
									'http://purl.org/dc/terms/description',
									'http://www.geonames.org/ontology/officialName',
									'http://d-nb.info/standards/elementset/gnd#preferredName',
									'http://d-nb.info/standards/elementset/gnd#preferredNameForTheFamily',
									'http://d-nb.info/standards/elementset/gnd#preferredNameForThePerson',
									'http://d-nb.info/standards/elementset/gnd#preferredNameForThePlaceOrGeographicName',
									'http://d-nb.info/standards/elementset/gnd#preferredNameForTheConferenceOrEvent',
									'http://d-nb.info/standards/elementset/gnd#preferredNameForTheWork',
									'http://d-nb.info/standards/elementset/gnd#preferredNameForTheSubjectHeading' ]
						}, // http://www.w3.org/2000/01/rdf-schema#label
						images : {
							properties : [
									'http://www.w3.org/2006/vcard/ns#photo',
									'http://xmlns.com/foaf/0.1/depiction',
									'http://dbpedia.org/ontology/thumbnail',
									'http://dbpedia.org/property/logo',
									'http://linkedgeodata.org/ontology/schemaIcon' ]
						},
						maps : {
							longs : [ 'http://www.w3.org/2003/01/geo/wgs84_pos#long' ],
							lats : [ 'http://www.w3.org/2003/01/geo/wgs84_pos#lat' ],
							points : [ 'http://www.georss.org/georss/point' ]
						},
						weblinks : {
							properties : [
									'http://www.w3.org/ns/dcat#accessURL',
									'http://xmlns.com/foaf/0.1/mbox',
									'http://rdfs.org/sioc/ns#links_to',
									'http://it.dbpedia.org/property/url',
									'http://data.nytimes.com/elements/search_api_query',
									'http://www.w3.org/2000/01/rdf-schema#isDefinedBy',
									'http://xmlns.com/foaf/0.1/page',
									'http://xmlns.com/foaf/0.1/homepage',
									'http://purl.org/dc/terms/isReferencedBy',
									'http://purl.org/dc/elements/1.1/relation',
									'http://dbpedia.org/ontology/wikiPageExternalLink',
									'http://data.nytimes.com/elements/topicPage' ]
						}
					},

					'http://www.w3.org/2002/07/owl#Class' : {
						document : {
							className : 'Class'/*
												 * , titleProperties :
												 * ['http://purl.org/dc/elements/1.1/title',
												 * 'http://www.w3.org/2000/01/rdf-schema#label']
												 */
						}
					},
					'http://www.w3.org/2002/07/owl#ObjectProperty' : {
						document : {
							className : 'ObjectProperty'
						}
					},
					'http://www.w3.org/2002/07/owl#Restriction' : {
						document : {
							className : 'DatatypeProperty'
						}
					},
					'http://www.w3.org/2002/07/owl#DatatypeProperty' : {
						document : {
							className : 'DatatypeProperty'
						}
					},
					'http://www.w3.org/2002/07/owl#Property' : {
						document : {
							className : 'Property'
						}
					},
					'http://data.oceandrilling.org/core/1/ODP' : {
						document : {
							titleProperties : [
									'expedition',
									'http://data.oceandrilling.org/core/1/expedition',
									'site',
									'http://data.oceandrilling.org/core/1/site',
									'hole',
									'http://data.oceandrilling.org/core/1/hole' ]
						}
					},
					'http://www.w3.org/ns/locn#Address' : {
						document : {
							titleProperties : [ 'http://www.w3.org/ns/locn#fullAddress' ]
						}
					},
					'http://www.cnr.it/ontology/cnr/personale.owl#UnitaDiPersonaleInterno' : {
						document : {
							titleProperties : [
									'http://www.cnr.it/ontology/cnr/personale.owl#cognome',
									' ',
									'http://www.cnr.it/ontology/cnr/personale.owl#nome' ]
						}
					}

				});
if (!document.lodliveVars) {
	document.lodliveVars = {};
}

$.jStorage
		.set('boxTemplate',
				'<div class="boxWrapper" id="first"><div class="box sprite"></div></div>');
$.jStorage.set('relationsLimit', 25);
$.jStorage.set('doStats', $.jStorage.get('doStats', true));
$.jStorage.set('doInverse', $.jStorage.get('doInverse', true));
$.jStorage.set('doAutoExpand', $.jStorage.get('doAutoExpand', true));
$.jStorage.set('doAutoSameas', $.jStorage.get('doAutoSameas', true));
$.jStorage.set('doCollectImages', $.jStorage.get('doCollectImages', true));
$.jStorage.set('doDrawMap', $.jStorage.get('doDrawMap', true));
$.jStorage.set('showInfoConsole', $.jStorage.get('showInfoConsole', true));

$.jStorage.set('endpoints', {
	all : 'output=json&format=application/json&timeout=0',
	arcSparql : 'output=json&jsonp=lodlive',
	sesame : 'Accept=application/sparql-results%2Bjson'
});
