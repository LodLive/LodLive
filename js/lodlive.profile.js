$.jStorage.set('profile', {
	// parametri di connessione agli endpoint
	'connection' : {
		// base degli about dei documenti non dell'ontologia
		'http://dati.camera.it' : {
			// il parametro {URI} viene sostituito con la uri del documento da
			// caricare
			description : {
				it : 'Un catalogo completo di dati e documenti digitali su tutte le legislature precedenti all\'attuale, dalla I del Regno di Sardegna alla XV della Repubblica, che alimentano il Portale storico della Camera dei deputati.<br />Sono inoltre disponibili i primi dataset di atti di indirizzo e controllo, deputati, organi e gruppi parlamentari della legislatura corrente.',
				en : 'A complete catalogue of digital data and documents of all previous legislatures, from I legislature of the Kingdom of Sardinia to XV legislature of the Republic, which supplies the historical portal of the Chamber of Deputies.<br />There are also the first datasets of Acts of direction and control, Deputies, parliamentary groups and committees of the current legislature.'
			},
			sparql : {
				allClasses : 'SELECT DISTINCT ?object FROM <http://dati.camera.it/ocd/> WHERE {[] a ?object} ORDER BY ?object',
				findSubject : 'SELECT DISTINCT ?subject WHERE { {?subject a <{CLASS}>;<http://purl.org/dc/elements/1.1/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2000/01/rdf-schema#label> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2004/02/skos/core#prefLabel> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} }  LIMIT 1  ',
				documentUri : 'SELECT DISTINCT * FROM <http://dati.camera.it/ocd/> WHERE {<{URI}> ?property ?object.FILTER (isIRI(?object) || ?property = <http://www.w3.org/2000/01/rdf-schema#label> || ?property = <http://xmlns.com/foaf/0.1/surname> || ?property = foaf:firstName || ?property = <http://purl.org/dc/elements/1.1/title>)} ORDER BY ?property',
				document : 'SELECT DISTINCT * FROM <http://dati.camera.it/ocd/> WHERE {<{URI}> ?property ?object} ORDER BY ?property',
				bnode : 'SELECT DISTINCT * FROM <http://dati.camera.it/ocd/> WHERE {<{URI}> ?property ?object}',
				inverse : 'SELECT DISTINCT * FROM <http://dati.camera.it/ocd/> WHERE {?object ?property <{URI}>} LIMIT 100',
				inverseSameAs : 'SELECT DISTINCT * WHERE {?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}>}'
			},
			useForInverseSameAs : true,
			endpoint : 'http://dati.camera.it/sparql',
			examples : [ {
				label : 'Nilde Iotti (foaf:Person)',
				uri : 'http://dati.camera.it/ocd/persona.rdf/p3140'
			}, {
				label : 'II Governo Moro',
				uri : 'http://dati.camera.it/ocd/governo.rdf/g17'
			}, {
				label : 'ocd:deputato (ontology description)',
				uri : 'http://dati.camera.it/ocd/deputato'
			}

			]
		},
		'http://dbpedia.org' : {
			description : {
				it : 'DBpedia is a community effort to extract structured information from Wikipedia and to make this information available on the Web. DBpedia allows you to ask sophisticated queries against Wikipedia, and to link other data sets on the Web to Wikipedia data.',
				en : 'DBpedia is a community effort to extract structured information from Wikipedia and to make this information available on the Web. DBpedia allows you to ask sophisticated queries against Wikipedia, and to link other data sets on the Web to Wikipedia data.'
			},
			sparql : {
				allClasses : 'SELECT DISTINCT ?object  WHERE {[] a ?object} ORDER BY ?object  LIMIT 50  ',
				findSubject : 'SELECT DISTINCT ?subject WHERE { {?subject a <{CLASS}>;<http://purl.org/dc/elements/1.1/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2000/01/rdf-schema#label> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2004/02/skos/core#prefLabel> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} } LIMIT 1',
				documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object.FILTER ( ?property != <http://www.w3.org/2002/07/owl#sameAs> && ( isIRI(?object) || ?property = <http://www.w3.org/2000/01/rdf-schema#label> || ?property = <http://xmlns.com/foaf/0.1/surname> || ?property = <http://xmlns.com/foaf/0.1/name> || ?property = <http://purl.org/dc/elements/1.1/title>))}  ORDER BY ?property',
				document : 'SELECT DISTINCT *  WHERE  {{<{URI}> ?property ?object. FILTER(!isLiteral(?object))} UNION 	 {<{URI}> ?property 	 ?object.FILTER(isLiteral(?object)).FILTER(lang(?object) ="it")} UNION 	 {<{URI}> ?property 	 ?object.FILTER(isLiteral(?object)).FILTER(lang(?object) ="en")}}  ORDER BY ?property',
				bnode : 'SELECT DISTINCT *  WHERE {<{URI}> ?property ?object}',
				inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}>} LIMIT 100',
				inverseSameAs : 'SELECT DISTINCT * WHERE {?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}>}'
			},
			useForInverseSameAs : true,
			endpoint : 'http://dbpedia.org/sparql',
			examples : [ {
				label : 'Giulio Andreotti (foaf:Person)',
				uri : 'http://dbpedia.org/resource/Giulio_Andreotti'
			}, {
				label : 'Leonardo Sciascia (foaf:Person)',
				uri : 'http://dbpedia.org/resource/Leonardo_Sciascia'
			}, {
				label : 'Rome',
				uri : 'http://dbpedia.org/resource/Rome'
			}, {
				label : 'Wikipedia',
				uri : 'http://dbpedia.org/resource/Wikipedia'
			}, {
				label : 'Linked data',
				uri : 'http://dbpedia.org/resource/Linked_data'
			} ]
		},
		'http://yago-knowledge.org' : {
			description : {
				it : 'YAGO2 is a huge semantic knowledge base, derived from Wikipedia, WordNet and GeoNames. Currently, YAGO2 has knowledge of more than 10 million entities (like persons, organizations, cities, etc.) and contains more than 120 million facts about these entities. ',
				en : 'YAGO2 is a huge semantic knowledge base, derived from Wikipedia, WordNet and GeoNames. Currently, YAGO2 has knowledge of more than 10 million entities (like persons, organizations, cities, etc.) and contains more than 120 million facts about these entities. '
			},
			sparql : {
				allClasses : 'SELECT DISTINCT ?object  WHERE {[] a ?object} ORDER BY ?object  LIMIT 50  ',
				findSubject : 'SELECT DISTINCT ?subject WHERE { {?subject a <{CLASS}>;<http://purl.org/dc/elements/1.1/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://rdf.freebase.com/ns/type.object.name> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2000/01/rdf-schema#label> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2004/02/skos/core#prefLabel> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} } LIMIT 1',
				documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object.FILTER (isIRI(?object) || ?property = <http://www.w3.org/2000/01/rdf-schema#label> || ?property = <http://rdf.freebase.com/ns/type.object.name> || ?property = <http://purl.org/dc/elements/1.1/title>)}',
				document : 'SELECT DISTINCT *  WHERE  {{<{URI}> ?property ?object. FILTER(!isLiteral(?object))} UNION 	 {<{URI}> ?property 	 ?object.FILTER(isLiteral(?object)).FILTER(lang(?object) ="it")} UNION 	 {<{URI}> ?property 	 ?object.FILTER(isLiteral(?object)).FILTER(lang(?object) ="en")}}',
				bnode : 'SELECT DISTINCT *  WHERE {<{URI}> ?property ?object}',
				inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}>.FILTER(?property != <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> && ?property != <http://www.w3.org/1999/02/22-rdf-syntax-ns#object> && !REGEX(?object,"fact_"))} LIMIT 100',
				inverseSameAs : 'SELECT DISTINCT * WHERE {?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}>}'
			},
			endpoint : 'http://lod.openlinksw.com/sparql',
			useForInverseSameAs : true,
			examples : [ {
				uri : 'http://yago-knowledge.org/resource/Mario_Monti',
				label : 'Mario Monti'
			} ]
		},
		'http://data.nytimes.com' : {
			description : {
				it : 'For the last 150 years, The New York Times has maintained one of the most authoritative news vocabularies ever developed. In 2009, we began to publish this vocabulary as linked open data.<br />As of 13 January 2010, The New York Times has published 10,000 subject headings as linked open data under a CC BY license.',
				en : 'For the last 150 years, The New York Times has maintained one of the most authoritative news vocabularies ever developed. In 2009, we began to publish this vocabulary as linked open data.<br />As of 13 January 2010, The New York Times has published 10,000 subject headings as linked open data under a CC BY license.'
			},
			sparql : {
				allClasses : 'SELECT DISTINCT ?object WHERE {[] a ?object}',
				findSubject : 'SELECT DISTINCT ?subject WHERE { {?subject a <{CLASS}>;<http://purl.org/dc/elements/1.1/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2000/01/rdf-schema#label> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2004/02/skos/core#prefLabel> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} }  LIMIT 1  ',
				documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
				document : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
				bnode : 'SELECT DISTINCT *  WHERE {<{URI}> ?property ?object}',
				inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}>} LIMIT 100',
				inverseSameAs : 'SELECT DISTINCT * WHERE {?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}>}'
			},
			useForInverseSameAs : true,
			endpoint : 'http://api.talis.com/stores/nytimes/services/sparql',
			examples : [ {
				uri : 'http://data.nytimes.com/55630655163615370853',
				label : 'Romano Prodi'
			} ]
		},
		'http://linkedgeodata.org' : {
			description : {
				it : 'LinkedGeoData is an effort to add a spatial dimension to the Web of Data / Semantic Web. LinkedGeoData uses the information collected by the OpenStreetMap project and makes it available as an RDF knowledge base according to the Linked Data principles. It interlinks this data with other knowledge bases in the Linking Open Data initiative.',
				en : 'LinkedGeoData is an effort to add a spatial dimension to the Web of Data / Semantic Web. LinkedGeoData uses the information collected by the OpenStreetMap project and makes it available as an RDF knowledge base according to the Linked Data principles. It interlinks this data with other knowledge bases in the Linking Open Data initiative.'
			},
			sparql : {
				allClasses : 'SELECT DISTINCT ?object WHERE {[] a ?object}',
				findSubject : 'SELECT DISTINCT ?subject WHERE {  {?subject a <{CLASS}>;<http://www.w3.org/2000/01/rdf-schema#label> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2004/02/skos/core#prefLabel> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} }  LIMIT 1  ',
				documentUri : 'SELECT DISTINCT * WHERE {{<{URI}> ?property ?object. FILTER(!isLiteral(?object))}  UNION 	 {<{URI}> ?property 	 ?object.FILTER(isLiteral(?object)).FILTER(lang(?object) ="it")} UNION 	 {<{URI}> ?property 	 ?object.FILTER(isLiteral(?object)).FILTER(lang(?object) ="en")} UNION 	 {<{URI}> ?property 	 ?object.FILTER(isLiteral(?object)).FILTER(lang(?object) ="")}}',
				document : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
				bnode : 'SELECT DISTINCT *  WHERE {<{URI}> ?property ?object}',
				inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}>} LIMIT 100',
				inverseSameAs : 'SELECT DISTINCT * WHERE {?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}>}'
			},
			useForInverseSameAs : true,
			endpoint : 'http://linkedgeodata.org/sparql',
			examples : [ {
				uri : 'http://linkedgeodata.org/triplify/node243496028',
				label : 'Roma'
			}, {
				uri : 'http://linkedgeodata.org/triplify/node61753365',
				label : 'Livorno'
			} ]
		},
		'http://data.linkedmdb.org' : {
			description : {
				it : 'The project aims at publishing the first open semantic web database for movies, including a large number of interlinks to several datasets on the open data cloud and references to related webpages.',
				en : 'The project aims at publishing the first open semantic web database for movies, including a large number of interlinks to several datasets on the open data cloud and references to related webpages.'
			},
			sparql : {
				allClasses : 'SELECT DISTINCT ?object WHERE {[] a ?object}',
				findSubject : 'SELECT DISTINCT ?subject WHERE { {?subject a <{CLASS}>;<http://purl.org/dc/elements/1.1/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2000/01/rdf-schema#label> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2004/02/skos/core#prefLabel> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} }  LIMIT 1  ',
				documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
				document : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
				bnode : 'SELECT DISTINCT *  WHERE {<{URI}> ?property ?object}',
				inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}>} LIMIT 100',
				inverseSameAs : 'SELECT DISTINCT * WHERE {?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}>}'
			},
			endpointType : 'sesame',
			proxy : 'http://labs.regesta.com/sparqlProxy/',
			endpoint : 'http://data.linkedmdb.org/sparql',
			examples : [ {
				uri : 'http://data.linkedmdb.org/resource/film/2014',
				label : 'Shining'
			} ]
		},
		'http://data.ordnancesurvey.co.uk' : {
			description : {
				it : 'Ordnance Survey is Great Britain\'s national mapping agency, providing geographic data, relied on by government, business and individuals. <br/>Ordnance Survey has published three separate linked data resources: the 1:50 000 Scale Gazetteer, Code-Point Open and the administrative geography gazetteer for Great Britain.',
				en : 'Ordnance Survey is Great Britain\'s national mapping agency, providing geographic data, relied on by government, business and individuals. <br/>Ordnance Survey has published three separate linked data resources: the 1:50 000 Scale Gazetteer, Code-Point Open and the administrative geography gazetteer for Great Britain.'
			},
			sparql : {
				allClasses : 'SELECT DISTINCT ?object WHERE {[] a ?object}',
				findSubject : 'SELECT DISTINCT ?subject WHERE { {?subject a <{CLASS}>;<http://purl.org/dc/elements/1.1/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2000/01/rdf-schema#label> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2004/02/skos/core#prefLabel> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} }  LIMIT 1  ',
				documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
				document : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
				bnode : 'SELECT DISTINCT *  WHERE {<{URI}> ?property ?object}',
				inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}>} LIMIT 100',
				inverseSameAs : 'SELECT DISTINCT * WHERE {?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}>}'
			},
			endpoint : 'http://api.talis.com/stores/ordnance-survey/services/sparql',
			examples : [ {
				uri : 'http://data.ordnancesurvey.co.uk/id/7000000000041428',
				label : 'London'
			}, {
				uri : 'http://data.ordnancesurvey.co.uk/id/ordnancesurvey',
				label : 'Ordnance Survey'
			} ]
		},
		'http://it.dbpedia.org' : {
			description : {
				it : 'DBpedia Italia &egrave; un progetto aperto e collaborativo per l\'estrazione e il riutilizzo di informazioni semanticamente strutturate dalla versione italiana di Wikipedia. Il progetto mira a rendere riutilizzabili le informazioni di Wikipedia da parte di software e applicazioni.',
				en : 'DBpedia Italy is an open and collaborative project for the extraction and reuse of semantically structured information of the Italian version of Wikipedia. The project aims to enable the usability of the Wikipedia information within external software and applications.'
			},
			useForInverseSameAs : true,
			sparql : {
				allClasses : 'SELECT DISTINCT ?object WHERE {[] a ?object}',
				findSubject : 'SELECT DISTINCT ?subject WHERE {?subject a <{CLASS}>;?none ?object.	 FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} LIMIT 1',
				documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
				document : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
				bnode : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
				inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}>} LIMIT		 100',
				inverseSameAs : 'SELECT DISTINCT * WHERE {?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}>}'
			},
			endpoint : 'http://it.dbpedia.org/sparql',
			examples : [ {
				uri : 'http://it.dbpedia.org/resource/L\'armata_Brancaleone',
				label : 'L\'armata Brancaleone (movie)'
			}, {
				uri : 'http://it.dbpedia.org/resource/Duomo_di_Bressanone',
				label : 'Duomo di Bressanone'
			} ]
		},
		'http://www.cnr.it' : {
			description : {
				it : 'data.cnr.it &egrave; una iniziativa del Consiglio Nazionale delle Ricerche per consentire un accesso pubblico alle informazioni e ai dati dell\'organizzazione. I dataset disponibili nell\'endpoint sono il frutto di una conversione in RDF di alucni database dell\'Istituto secondo una ontologia appositamente definita.',
				en : 'data.cnr.it is an initiative of the Italian National Research Council aimed to provide public access to the information of the CNR organization.'
			},
			sparql : {
				allClasses : 'SELECT DISTINCT ?object WHERE {[] a ?object}',
				findSubject : 'SELECT DISTINCT ?subject WHERE {?subject a <{CLASS}>;?none ?object.	 FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} LIMIT 1',
				documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
				document : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
				bnode : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
				inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}>} LIMIT		 100',
				inverseSameAs : 'SELECT DISTINCT * WHERE {?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}>}'
			},
			endpoint : 'http://data.cnr.it/sparql-proxy/',
			examples : [ {
				uri : 'http://www.cnr.it/ontology/cnr/individuo/unitaDiPersonaleInterno/MATRICOLA7247',
				label : 'Agata Gambacorta'
			}, {
				uri : 'http://www.cnr.it/ontology/cnr/individuo/brevetti-brevetto/ID1000',
				label : 'an optical system.. '
			} ]
		},
		'http://sindice.com,http://www.semanlink.net' : {
			description : {
				it : 'Sindice ingests RDF, RDFa, Microformats (and soon microdata). The model is "Page Based" where the name of the graph is the URL where the data was fetched.',
				en : 'Sindice ingests RDF, RDFa, Microformats (and soon microdata). The model is "Page Based" where the name of the graph is the URL where the data was fetched.'
			},
			sparql : {
				allClasses : 'SELECT DISTINCT ?object WHERE {[] a ?object}',
				findSubject : 'SELECT DISTINCT ?subject WHERE {?subject a <{CLASS}>;?none ?object.	 FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} LIMIT 1',
				documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
				document : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
				bnode : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
				inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}>} LIMIT		 100',
				inverseSameAs : 'SELECT DISTINCT * WHERE {?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}>}'
			},
			endpoint : 'http://sparql.sindice.com/sparql',
			examples : [ {
				uri : 'http://www.semanlink.net/tag/dbpedia.rdf',
				label : 'Dbpedia'
			} ]
		},
		'http://reference.data.gov.uk' : {
			description : {
				it : 'Reference data for linked UK government data: it covers the central working of government, including organisational structures where these have been made available as RDF.',
				en : 'Reference data for linked UK government data: it covers the central working of government, including organisational structures where these have been made available as RDF.'
			},
			sparql : {
				allClasses : 'SELECT DISTINCT ?object WHERE {[] a ?object}',
				findSubject : 'SELECT DISTINCT ?subject WHERE { {?subject a <{CLASS}>;<http://purl.org/dc/elements/1.1/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2000/01/rdf-schema#label> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2004/02/skos/core#prefLabel> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} }  LIMIT 1  ',
				documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
				document : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
				bnode : 'SELECT DISTINCT *  WHERE {<{URI}> ?property ?object}',
				inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}>} LIMIT 100',
				inverseSameAs : 'SELECT DISTINCT * WHERE {?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}>}'
			},

			endpoint : 'http://services.data.gov.uk/reference/sparql',
			examples : [ {
				uri : 'http://reference.data.gov.uk/id/minister/dfe/secretary-of-state-for-education',
				label : 'Secretary of State for Education'
			}, {
				uri : 'http://reference.data.gov.uk/id/mp/witney/david-cameron',
				label : 'David Cameron'
			} ]
		},
		'http://spcdata.digitpa.gov.it' : {
			description : {
				it : 'SPCdata.digitpa.gov.it &egrave; il portale dei dati aperti del Sistema Pubblico di Connettivit&agrave; e Cooperazione progettato e gestito direttamente da DigitPA per condividere l\'insieme dei dati pubblici disponibili presso le Pubbliche Amministrazioni. I Linked Open Data SPC attualmente disponibili sono i dati dell\'Indice della Pubblica Amministrazione.',
				en : 'SPCdata.digitpa.gov.it is the open data portal of the Public Connectivity and Cooperation System, designed and managed by DigitPA to share the set of public data available from the Public Administrations. The Linked Open Data SPC data currently available are the Index of Public Administration.'
			},
			sparql : {
				allClasses : 'SELECT DISTINCT ?object WHERE {[] a ?object}',
				findSubject : 'SELECT DISTINCT ?subject WHERE { {?subject a <{CLASS}>;<http://purl.org/dc/terms/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2000/01/rdf-schema#label> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>; <http://purl.org/dc/terms/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))}  UNION {?subject a <{CLASS}>; <http://spcdata.digitpa.gov.it/nome_cognome> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} }  LIMIT 1  ',
				documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object.FILTER (isIRI(?object) || ?property = <http://spcdata.digitpa.gov.it/nome_cognome> || ?property = <http://www.w3.org/2000/01/rdf-schema#label> || ?property = <http://purl.org/dc/terms/title>)}',
				document : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
				bnode : 'SELECT DISTINCT *  WHERE {<{URI}> ?property ?object}',
				inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}>} LIMIT 100',
				inverseSameAs : 'SELECT DISTINCT * WHERE {?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}>}'
			},
			useForInverseSameAs : true,
			endpoint : 'http://spcdata.digitpa.gov.it:8899/sparql',
			examples : [ {
				uri : 'http://spcdata.digitpa.gov.it/UnitaOrganizzativa/2612',
				label : 'Economato'
			} ]
		},
		'http://comune.fi.it,http://sr-vm091-opend.comune.fi.it' : {
			description : {
				it : 'In quest\'area sono accessibili i linked open data del Comune di Firenze. Al momento sono disponibili i dataset musei, viario, sinistri e toponomastica.',
				en : 'The linked open data of the City of Florence are available here. Museums, traffic, accidents and place names datasets are currently available.'
			},
			sparql : {
				allClasses : 'SELECT DISTINCT ?object WHERE {[] a ?object}',
				findSubject : 'SELECT DISTINCT ?subject WHERE { {?subject a <{CLASS}>;<http://purl.org/dc/terms/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2000/01/rdf-schema#label> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>; <http://purl.org/dc/terms/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} }  LIMIT 1  ',
				documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object.FILTER (isIRI(?object) || ?property = <http://www.w3.org/2000/01/rdf-schema#label> || ?property = <http://purl.org/dc/terms/title>)}',
				document : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
				bnode : 'SELECT DISTINCT *  WHERE {<{URI}> ?property ?object}',
				inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}>} LIMIT 100',
				inverseSameAs : 'SELECT DISTINCT * WHERE {?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}>}'
			},
			endpointType : 'arcSparql',
			endpoint : 'http://sr-vm091-opend.comune.fi.it:2020/sparql',
			examples : [ {
				uri : 'http://sr-vm091-opend.comune.fi.it:8080/resource/musei/GALLERIA_DEGLI_UFFIZI',
				label : 'Galleria degli Uffizi'
			}, {
				uri : 'http://sr-vm091-opend.comune.fi.it:8080/resource/sinistri/Borgo_San_Iacopo',
				label : 'Sinistri avvenuti in Borgo San Iacopo'
			} ]
		},
		'http://provincia.carboniaiglesias.it,http://www.provincia.carboniaiglesias.it' : {
			description : {
				it : 'I linked open data degli atti amministrativi della Provincia di Carbonia Iglesias, relativi alle Determine e Delibere.',
				en : 'The linked open data of the administrative acts of the Province of Carbonia Iglesias, relative to resolutions, are available here.'
			},
			sparql : {
				allClasses : 'SELECT DISTINCT ?object WHERE {[] a ?object}',
				findSubject : 'SELECT DISTINCT ?subject WHERE { {?subject a <{CLASS}>;<http://purl.org/dc/terms/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2000/01/rdf-schema#label> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>; <http://purl.org/dc/terms/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} }  LIMIT 1  ',
				documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object.FILTER (isIRI(?object) || ?property = <http://www.w3.org/2000/01/rdf-schema#label> || ?property = <http://purl.org/dc/terms/title>)}',
				document : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
				bnode : 'SELECT DISTINCT *  WHERE {<{URI}> ?property ?object}',
				inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}>} LIMIT 100',
				inverseSameAs : 'SELECT DISTINCT * WHERE {?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}>}'
			},
			endpointType : 'arcSparql',
			endpoint : 'http://www.provincia.carboniaiglesias.it/sparql',
			examples : [ {
				uri : 'http://www.provincia.carboniaiglesias.it/taxonomy_term/39',
				label : 'Area dei servizi ambientali'
			}, {
				uri : 'http://www.provincia.carboniaiglesias.it/taxonomy_term/78',
				label : 'Segretario Generale Reggente'
			} ]
		},
		'http://dblp.l3s.de' : {
			description : {
				it : 'The DBLP Computer Science Bibliography.',
				en : 'The DBLP Computer Science Bibliography.'
			},
			sparql : {
				allClasses : 'SELECT DISTINCT ?object WHERE {[] a ?object}',
				findSubject : 'SELECT DISTINCT ?subject WHERE { {?subject a <{CLASS}>;<http://purl.org/dc/terms/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2000/01/rdf-schema#label> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>; <http://purl.org/dc/terms/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} }  LIMIT 1  ',
				documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object.FILTER (isIRI(?object) || ?property = <http://www.w3.org/2000/01/rdf-schema#label> || ?property = <http://purl.org/dc/terms/title>)}',
				document : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
				bnode : 'SELECT DISTINCT *  WHERE {<{URI}> ?property ?object}',
				inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}>} LIMIT 100',
				inverseSameAs : 'SELECT DISTINCT * WHERE {?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}>}'
			},

			endpoint : 'http://dblp.l3s.de/d2r/sparql',
			examples : [ {
				uri : 'http://dblp.l3s.de/d2r/resource/authors/Oktie_Hassanzadeh',
				label : 'Oktie Hassanzadeh'
			} ]
		}

	},
	uriSubstitutor : [ {
		findStr : 'mpii.de/yago/resource/',
		replaceStr : 'yago-knowledge.org/resource/'
	}, {
		findStr : 'dbpedia.org/page/',
		replaceStr : 'dbpedia.org/resource/'
	} ],
	/* per ricavare un rdf da risorse non presenti in endpoint */
	resourceResolver : {
		sparql : {
			documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object.} ORDER BY ?property',
			document : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object.} ORDER BY ?property',
			bnode : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
			inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}>} LIMIT 100'
		},
		endpoint : 'http://labs.regesta.com/resourceProxy/'
	// endpoint : 'http://127.0.0.1:8080/sparql-rdf-proxy/resource/'

	},
	// configurazione standard per la rappresentazione di un documento
	// utilizzata nel caso manchi una specifica configurazione per la classe
	'default' : {
		document : {
			className : 'standard',
			titleProperties : [ 'http://www.geonames.org/ontology#name', 'http://purl.org/dc/elements/1.1/title', 'http://purl.org/dc/terms/title', 'http://www.w3.org/2000/01/rdf-schema#label', 'http://www.w3.org/2004/02/skos/core#prefLabel', 'http://logd.tw.rpi.edu/source/visualizing-org/dataset/2010-global-agenda-council-interlinkage-survey/vocab/enhancement/1/how_councils_interlink', 'http://rdf.freebase.com/ns/type.object.name', 'http://spcdata.digitpa.gov.it/nome_cognome' ]
		},// http://www.w3.org/2000/01/rdf-schema#label
		images : {
			visualizationType : '',
			properties : [ 'http://xmlns.com/foaf/0.1/depiction', 'http://dbpedia.org/ontology/thumbnail', 'http://dbpedia.org/property/logo', 'http://linkedgeodata.org/ontology/schemaIcon' ]
		},
		maps : [],
		weblinks : {
			visualizationType : '',
			properties : [ 'http://it.dbpedia.org/property/url', 'http://data.nytimes.com/elements/search_api_query', 'http://www.w3.org/2000/01/rdf-schema#isDefinedBy', 'http://xmlns.com/foaf/0.1/page', 'http://xmlns.com/foaf/0.1/homepage', 'http://purl.org/dc/terms/isReferencedBy', 'http://purl.org/dc/elements/1.1/relation', 'http://dbpedia.org/ontology/wikiPageExternalLink', 'http://data.nytimes.com/elements/topicPage' ]
		}
	},
	'http://www.w3.org/2002/07/owl#Class' : {
		document : {
			className : 'Class',
			titleProperties : [ 'http://purl.org/dc/elements/1.1/title', 'http://www.w3.org/2000/01/rdf-schema#label' ]
		}
	},
	'http://www.w3.org/2002/07/owl#ObjectProperty' : {
		document : {
			className : 'ObjectProperty',
			titleProperties : [ 'http://purl.org/dc/elements/1.1/title', 'http://www.w3.org/2000/01/rdf-schema#label' ]
		}
	},
	'http://www.w3.org/2002/07/owl#Restriction' : {
		document : {
			className : 'DatatypeProperty',
			titleProperties : [ 'http://purl.org/dc/elements/1.1/title', 'http://www.w3.org/2000/01/rdf-schema#label' ]
		}
	},
	'http://www.w3.org/2002/07/owl#DatatypeProperty' : {
		document : {
			className : 'DatatypeProperty',
			titleProperties : [ 'http://purl.org/dc/elements/1.1/title', 'http://www.w3.org/2000/01/rdf-schema#label' ],
			weblinks : {
				visualizationType : '',
				properties : []
			}
		}
	},
	'http://xmlns.com/foaf/0.1/Person' : {
		document : {
			titleProperties : [ 'http://xmlns.com/foaf/0.1/firstName', 'http://xmlns.com/foaf/0.1/surname', 'http://xmlns.com/foaf/0.1/name' ]
		}
	},
	'http://yago-knowledge.org/resource/wordnet_person_100007846' : {
		document : {
			titleProperties : [ 'http://purl.org/dc/elements/1.1/title', 'http://www.w3.org/2000/01/rdf-schema#label' ]
		}
	},
	'http://dati.camera.it/ocd/deputato' : {
		document : {
			titleProperties : 'http://www.w3.org/2000/01/rdf-schema#label'
		}
	},
	'http://dati.camera.it/ocd/mandatoCamera' : {
		document : {
			titleProperties : 'http://www.w3.org/2000/01/rdf-schema#label'
		}
	},
	'http://dati.camera.it/ocd/legislatura' : {
		document : {
			titleProperties : 'http://www.w3.org/2000/01/rdf-schema#label'
		}
	},
	'http://dati.camera.it/ocd/organo' : {
		document : {
			titleProperties : 'http://www.w3.org/2000/01/rdf-schema#label'
		}
	},
	'http://dati.camera.it/ocd/organoGoverno' : {
		document : {
			titleProperties : 'http://www.w3.org/2000/01/rdf-schema#label'
		}
	},
	'http://dati.camera.it/ocd/incarico' : {
		document : {
			titleProperties : 'http://www.w3.org/2000/01/rdf-schema#label'
		}
	},
	'http://dati.camera.it/ocd/incaricoGoverno' : {
		document : {
			titleProperties : 'http://www.w3.org/2000/01/rdf-schema#label'
		}
	},
	'http://dati.camera.it/ocd/gruppoParlamentare' : {
		document : {
			titleProperties : 'http://www.w3.org/2000/01/rdf-schema#label'
		}
	},
	'http://dati.camera.it/ocd/componenteGruppoMisto' : {
		document : {
			titleProperties : 'http://www.w3.org/2000/01/rdf-schema#label'
		}
	},
	'http://dati.camera.it/ocd/senatore' : {
		document : {
			titleProperties : 'http://www.w3.org/2000/01/rdf-schema#label'
		}
	},
	'http://dati.camera.it/ocd/assemblea' : {
		document : {
			titleProperties : 'http://www.w3.org/2000/01/rdf-schema#label'
		}
	},
	'http://dati.camera.it/ocd/atto' : {
		document : {
			titleProperties : 'http://www.w3.org/2000/01/rdf-schema#label'
		}
	},
	'http://dati.camera.it/ocd/DOC' : {
		document : {
			titleProperties : 'http://www.w3.org/2000/01/rdf-schema#label'
		}
	},
	'http://dati.camera.it/ocd/aic' : {
		document : {
			titleProperties : 'http://www.w3.org/2000/01/rdf-schema#label'
		}
	},
	'http://dati.camera.it/ocd/legge' : {
		document : {
			titleProperties : 'http://www.w3.org/2000/01/rdf-schema#label'
		}
	},
	'http://dati.camera.it/ocd/governo' : {
		document : {
			titleProperties : 'http://www.w3.org/2000/01/rdf-schema#label'
		}
	},
	'http://dati.camera.it/ocd/mandatoSenato' : {
		document : {
			titleProperties : 'http://www.w3.org/2000/01/rdf-schema#label'
		}
	},
	'http://dati.camera.it/ocd/presidenteCamera' : {
		document : {
			titleProperties : 'http://www.w3.org/2000/01/rdf-schema#label'
		}
	},
	'http://dati.camera.it/ocd/presidenteRepubblica' : {
		document : {
			titleProperties : 'http://www.w3.org/2000/01/rdf-schema#label'
		}
	},
	'http://dati.camera.it/ocd/presidenteConsiglioMinistri' : {
		document : {
			titleProperties : 'http://www.w3.org/2000/01/rdf-schema#label'
		}
	},
	'http://dati.camera.it/ocd/sistemaElettorale' : {
		document : {
			titleProperties : 'http://www.w3.org/2000/01/rdf-schema#label'
		}
	},
	'http://dati.camera.it/ocd/dibattito' : {
		document : {
			titleProperties : 'http://www.w3.org/2000/01/rdf-schema#label'
		}
	},
	'http://dati.camera.it/ocd/discussione' : {
		document : {
			titleProperties : 'http://www.w3.org/2000/01/rdf-schema#label'
		}
	},
	'http://dati.camera.it/ocd/ufficioParlamentare' : {
		document : {
			titleProperties : 'http://www.w3.org/2000/01/rdf-schema#label'
		}
	},
	'http://dati.camera.it/ocd/seduta' : {
		document : {
			titleProperties : 'http://www.w3.org/2000/01/rdf-schema#label'
		}
	},
	'http://dati.camera.it/ocd/bollettino' : {
		document : {
			titleProperties : 'http://www.w3.org/2000/01/rdf-schema#label'
		}
	},
	'http://dati.camera.it/ocd/elezione' : {
		document : {
			titleProperties : 'http://www.w3.org/2000/01/rdf-schema#label'
		}
	},
	'http://www.cnr.it/ontology/cnr/personale.owl#UnitaDiPersonaleInterno' : {
		document : {
			titleProperties : [ 'http://www.cnr.it/ontology/cnr/personale.owl#cognome', ' ', 'http://www.cnr.it/ontology/cnr/personale.owl#nome' ]
		}
	}

});
if (!document.lodliveVars) {
	document.lodliveVars = {};
}

$.jStorage.set('boxTemplate', '<div class="boxWrapper" id="first"><div class="box sprite"></div></div>');
document.lodliveVars['relationsLimit'] = 25;

document.lodliveVars.doStats = true;
document.lodliveVars.doInverse = true;
document.lodliveVars.doAutoExpand = true;
document.lodliveVars.doAutoSameas = true;

$.jStorage.set('endpoints', {
	all : 'output=json&format=application/json&timeout=0',
	arcSparql : 'output=json&jsonp=lodlive',
	sesame : 'Accept=application/sparql-results%2Bjson'
});
$.jStorage.set('language', {
	it : {
		restart : 'riavvia',
		generateInverse : 'calcola relazioni inverse',
		autoExpand : 'espandi automaticamente le relazioni',
		autoSameAs : 'calcola relazioni inverse di tipo sameAs',
		noName : 'denominazione non trovata',
		addUri : 'inserisci una uri',
		findResource : 'cerca una risorsa',
		choose : 'scegli...',
		resourceMissing : 'risorsa non trovata',
		resourceMissingDoc : 'non sono state trovate proprietà di tipo literal per la risorsa per la lingua impostata o la risorsa non è momentaneamente disponibile nell\'endpoint',
		options : 'OPZIONI',
		endpointNotConfigured : 'nessun endpoint configurato per la risorsa',
		impostaUnaURI : 'imposta un uri, esegui una ricerca \no scegli tra gli esempi proposti',
		example : 'esempio',
		noIe : 'Siamo spiacenti ma attualmente Internet Explorer non &egrave; totalmente supportato.',
		enpointNotAvailable : 'errore: endpoint non disponibile',
		enpointNotAvailableOrSLow : 'errore: endpoint non disponibile o la richiesta è scaduta'
	},
	en : {
		restart : 'restart',
		generateInverse : 'generate inverse relations',
		autoExpand : 'auto-expand mode',
		autoSameAs : 'generate inverse sameAs relations',
		noName : 'no title provided',
		addUri : 'insert an URI',
		findResource : 'find resources',
		choose : 'choose...',
		resourceMissing : 'resource not found',
		resourceMissingDoc : 'literal values not found or the resource is missing or not available in the endpoint',
		options : 'OPTIONS',
		endpointNotConfigured : 'no endpoint configured for the resource',
		impostaUnaURI : 'inert an uri, make a query or choose one of the examples provided',
		example : 'example',
		noIe : 'Sorry but Internet Explorer is not totally supported.',
		enpointNotAvailable : 'error: endpoint not available',
		enpointNotAvailableOrSLow : 'error: endpoint not available or the request timed out'
	}
});

$.jStorage.set('selectedLanguage', 'en');
