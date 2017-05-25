$.jStorage
        .set(
                'profile',
                {
                    // parametri di connessione agli endpoint
                    'connection' : {
                        // base degli about dei documenti non dell'ontologia
                        'http://fr.dbpedia.org' : {
                            description : {
                                fr : 'DBpédia en français est le chapitre francophone de DBpedia, il s\'inscrit dans l\'effort d\'internationalisation de DBpedia dont le but est de maintenir des données structurées extraites de différents chapitres de Wikipedia.',
                                en : 'French version of DBpedia'
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
                            endpoint : 'http://fr.dbpedia.org/sparql',
                            examples : [ {
                                uri : 'http://fr.dbpedia.org/resource/France',
                                label : 'France'
                            }, {
                                uri : 'http://fr.dbpedia.org/resource/Resource_Description_Framework',
                                label : 'Resource Description Framework'
                            } ]
                        },
                        'http://linked.opendata.cz' : {
                            description : {
                                it : 'European Central Bank Exchange Rates (relative to EUR); Common Procurement Vocabulary 2008 converted to RDF; RDF data extracted from excel files published at czso.cz with demographic data; RDF data extracted from excel files published at czso.cz with regions (IDs and hierarchy); Dataset about Czech courts including contacts and abbreviations; Hierarchical list of the Nomenclature of territorial units for statistics - NUTS and the Statistical regions of Europe - 2008 edition; Hierarchical list of the Nomenclature of territorial units for statistics - NUTS and the Statistical regions of Europe - 2008 edition; Metadata for acts from zakonyprolidi.cz - two sample expressions; Metadata for acts from psp.cz; Publications exported from the application OBD UK; Budgets of Czech municipalities; Czech municipalities.',
                                en : 'European Central Bank Exchange Rates (relative to EUR); Common Procurement Vocabulary 2008 converted to RDF; RDF data extracted from excel files published at czso.cz with demographic data; RDF data extracted from excel files published at czso.cz with regions (IDs and hierarchy); Dataset about Czech courts including contacts and abbreviations; Hierarchical list of the Nomenclature of territorial units for statistics - NUTS and the Statistical regions of Europe - 2008 edition; Hierarchical list of the Nomenclature of territorial units for statistics - NUTS and the Statistical regions of Europe - 2008 edition; Metadata for acts from zakonyprolidi.cz - two sample expressions; Metadata for acts from psp.cz; Publications exported from the application OBD UK; Budgets of Czech municipalities; Czech municipalities.'
                            },
                            useForInverseSameAs : false,
                            endpoint : 'http://linked.opendata.cz/sparql/',
                            examples : [ {
                                label : 'Czech municipalities',
                                uri : 'http://linked.opendata.cz/resource/municipality/00232173'
                            }, {
                                label : 'Publications exported from the application OBD UK',
                                uri : 'http://linked.opendata.cz/resource/publications/people/cz/cuni/16667789'
                            }, {
                                label : 'Budgets of Czech municipalities',
                                uri : 'http://linked.opendata.cz/resource/wwwinfo.mfcr.cz/income-statement/00573124'
                            } ]
                        },
                        'http://dati.culturaitalia.it' : {
                            description : {
                                it : 'Il progetto pilota dati.culturaitalia.it contiene set di open data aggregati in CulturaItalia e rilasciati dai partner del progetto con licenza "CC0 1.0 Universal Public Domain Dedication".',
                                en : 'Il progetto pilota dati.culturaitalia.it contiene set di open data aggregati in CulturaItalia e rilasciati dai partner del progetto con licenza "CC0 1.0 Universal Public Domain Dedication".'
                            },
                            useForInverseSameAs : false,
                            endpoint : 'http://dati.culturaitalia.it/sparql/',
                            proxy : 'http://lodview.it/simple-proxy/resourceProxy/',
                            examples : [ {
                                label : 'Accademia dei georgofili',
                                uri : 'http://dati.culturaitalia.it/resource/actor/accademia-dei-georgofili'
                            }, {
                                label : 'Biblioteca universitaria Alessandrina',
                                uri : 'http://dati.culturaitalia.it/resource/title/biblioteca-universitaria-alessandrina'
                            } ]
                        },

                        'http://dati.senato.it' : {
                            description : {
                                it : 'Il punto per l\'accesso diretto ai dati del Senato della Repubblica. I disegni di legge con il loro iter, le votazioni elettroniche d\'Aula, le Commissioni, i Gruppi parlamentari...',
                                en : 'Il punto per l\'accesso diretto ai dati del Senato della Repubblica. I disegni di legge con il loro iter, le votazioni elettroniche d\'Aula, le Commissioni, i Gruppi parlamentari...'
                            },
                            useForInverseSameAs : true,
                            endpoint : 'http://dati.senato.it/sparql',
                            examples : [ {
                                label : 'Emilio Colombo (foaf:Person)',
                                uri : 'http://dati.senato.it/senatore/638'
                            }, {
                                label : 'Giulio Andreotti (foaf:Person)',
                                uri : 'http://dati.senato.it/senatore/74'
                            } ]
                        },
                        'http://dati.camera.it' : {
                            // il parametro {URI} viene sostituito con la uri del documento da
                            // caricare
                            description : {
                                it : 'Un catalogo completo di dati e documenti digitali su tutte le legislature precedenti all\'attuale, dalla I del Regno di Sardegna alla XV della Repubblica, che alimentano il Portale storico della Camera dei deputati.<br />Sono inoltre disponibili i primi dataset di atti di indirizzo e controllo, deputati, organi e gruppi parlamentari della legislatura corrente.',
                                en : 'A complete catalogue of digital data and documents of all previous legislatures, from I legislature of the Kingdom of Sardinia to XV legislature of the Republic, which supplies the historical portal of the Chamber of Deputies.<br />There are also the first datasets of Acts of direction and control, Deputies, parliamentary groups and committees of the current legislature.'
                            },
                            useForInverseSameAs : true,
                            endpoint : 'http://dati.camera.it/sparql',
                            examples : [ {
                                label : 'Giorgio Napolitano',
                                uri : 'http://dati.camera.it/ocd/bpr/autore.rdf/1993'
                            }, {
                                label : 'Nilde Iotti (foaf:Person)',
                                uri : 'http://dati.camera.it/ocd/persona.rdf/p3140'
                            }, {
                                label : 'II Governo Moro',
                                uri : 'http://dati.camera.it/ocd/governo.rdf/g17'
                            }, {
                                label : 'ocd:deputato (ontology description)',
                                uri : 'http://dati.camera.it/ocd/deputato'
                            } ]
                        },
                        'http://data.opendataday.it' : {
                            // il parametro {URI} viene sostituito con la uri del documento da
                            // caricare
                            description : {
                                it : 'Catalogo dei dataset OpenData pubblicati da alcune istituzioni. Generato da fonti CKAN per l\'International Open Data Day Italia.',
                                en : 'Catalogo dei dataset OpenData pubblicati da alcune istituzioni. Generato da fonti CKAN per l\'International Open Data Day Italia.'
                            },
                            useForInverseSameAs : false,
                            endpoint : 'http://data.opendataday.it/sparql',
                            examples : [ {
                                label : 'Catalogo della Provincia di Roma',
                                uri : 'http://data.opendataday.it/resource/dati.provinciaRoma'
                            }, {
                                label : 'Catalogo della Regione Lombardia',
                                uri : 'http://data.opendataday.it/resource/dati.lombardia'
                            }, {
                                label : 'Catalogo della Regione Toscana',
                                uri : 'http://data.opendataday.it/resource/dati.toscana'
                            }, {
                                label : 'Catalogo del Comune di Firenze',
                                uri : 'http://data.opendataday.it/resource/dati.firenze'
                            } ]
                        },
                        'http://dbpedia.org' : {
                            description : {
                                it : 'DBpedia is a community effort to extract structured information from Wikipedia and to make this information available on the Web. DBpedia allows you to ask sophisticated queries against Wikipedia, and to link other data sets on the Web to Wikipedia data.',
                                en : 'DBpedia is a community effort to extract structured information from Wikipedia and to make this information available on the Web. DBpedia allows you to ask sophisticated queries against Wikipedia, and to link other data sets on the Web to Wikipedia data.'
                            },
                            sparql : {
                                allClasses : 'SELECT DISTINCT ?object  WHERE {[] a ?object} ORDER BY ?object  LIMIT 50  ',
                                findSubject : 'SELECT DISTINCT ?subject WHERE { {?subject a <{CLASS}>;<http://purl.org/dc/elements/1.1/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2000/01/rdf-schema#label> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2004/02/skos/core#prefLabel> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} } LIMIT 1',
                                documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object.FILTER ((( isIRI(?object) && ?property != <http://xmlns.com/foaf/0.1/depiction> )|| ?property = <http://www.w3.org/2000/01/rdf-schema#label>  || ?property = <http://www.georss.org/georss/point> || ?property = <http://xmlns.com/foaf/0.1/surname> || ?property = <http://xmlns.com/foaf/0.1/name> || ?property = <http://purl.org/dc/elements/1.1/title>))}  ORDER BY ?property',
                                document : 'SELECT DISTINCT *  WHERE  {{<{URI}> ?property ?object. FILTER(!isLiteral(?object))} UNION 	 {<{URI}> ?property 	 ?object.FILTER(isLiteral(?object)).FILTER(lang(?object) ="it")} UNION 	 {<{URI}> ?property 	 ?object.FILTER(isLiteral(?object)).FILTER(lang(?object) ="en")}}  ORDER BY ?property',
                                bnode : 'SELECT DISTINCT *  WHERE {<{URI}> ?property ?object}',
                                inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}> FILTER(REGEX(STR(?object),\'//dbpedia.org\'))} LIMIT 100',
                                inverseSameAs : 'SELECT DISTINCT * WHERE {?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}> FILTER(REGEX(STR(?object),\'//dbpedia.org\'))}'
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
                                documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object.FILTER (isIRI(?object) || ?property = <http://www.w3.org/2000/01/rdf-schema#label> || ?property = <http://rdf.freebase.com/ns/type.object.name> || ?property = <http://purl.org/dc/elements/1.1/title>)} ORDER BY ?property',
                                document : 'SELECT DISTINCT *  WHERE  {{<{URI}> ?property ?object. FILTER(!isLiteral(?object))} UNION 	 {<{URI}> ?property 	 ?object.FILTER(isLiteral(?object)).FILTER(lang(?object) ="it")} UNION 	 {<{URI}> ?property 	 ?object.FILTER(isLiteral(?object)).FILTER(lang(?object) =en)}}',
                                bnode : 'SELECT DISTINCT *  WHERE {<{URI}> ?property ?object}',
                                inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}>.FILTER(isIRI(?object) && ?property != <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> && ?property != <http://www.w3.org/1999/02/22-rdf-syntax-ns#object> && !REGEX(?object,"fact_"))} LIMIT 100',
                                inverseSameAs : 'SELECT DISTINCT * WHERE {?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}> FILTER(!REGEX(STR(?object),\'dbpedia\'))}'
                            },
                            endpoint : 'http://lod.openlinksw.com/sparql',
                            useForInverseSameAs : true,
                            examples : [ {
                                uri : 'http://yago-knowledge.org/resource/Mario_Monti',
                                label : 'Mario Monti'
                            } ]
                        },
                        'http://data.nature.com,http://ns.nature.com,http://dx.doi.org' : {
                            description : {
                                it : 'Bibliographic data from around 900,000 articles published by Nature Publishing Group (NPG) from 1845 through to the present day. Additionally the datasets include NPG products and subjects ontologies.',
                                en : 'Bibliographic data from around 900,000 articles published by Nature Publishing Group (NPG) from 1845 through to the present day. Additionally the datasets include NPG products and subjects ontologies.'
                            },
                            sparql : {
                                allClasses : 'SELECT DISTINCT ?object WHERE {[] a ?object}',
                                findSubject : 'SELECT DISTINCT ?subject WHERE   {?subject a <{CLASS}>;<http://www.w3.org/2000/01/rdf-schema#label> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\')) }  LIMIT 1  ',
                                documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
                                document : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
                                bnode : 'SELECT DISTINCT *  WHERE {<{URI}> ?property ?object}',
                                inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}>} LIMIT 100',
                                inverseSameAs : 'SELECT DISTINCT * WHERE {{?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}> } UNION { ?object <http://www.w3.org/2004/02/skos/core#exactMatch> <{URI}>}}'
                            },
                            useForInverseSameAs : false,
                            endpoint : 'http://data.nature.com/query',
                            proxy : 'http://lodview.it/simple-proxy/resourceProxy/',
                            examples : [ {
                                label : 'Stem cells',
                                uri : 'http://ns.nature.com/subjects/stem_cells'
                            }, {
                                label : 'Higgs boson: The need for new physics',
                                uri : 'http://dx.doi.org/10.1038/481024a'
                            } ]
                        },
                        'http://worldbank.270a.info' : {
                            description : {
                                it : 'The World Bank is an international development organization that provides access to a comprehensive set of data about countries around the globe. The data that is collected from The World Bank is published using the Linked Data principles and is composed of a wide array of observations on World Development Indicators, World Bank Finances, World Bank Projects and Operations, and World Bank Climate Change data.',
                                en : 'The World Bank is an international development organization that provides access to a comprehensive set of data about countries around the globe. The data that is collected from The World Bank is published using the Linked Data principles and is composed of a wide array of observations on World Development Indicators, World Bank Finances, World Bank Projects and Operations, and World Bank Climate Change data.'
                            },
                            sparql : {
                                allClasses : 'SELECT DISTINCT ?object WHERE {[] a ?object}',
                                findSubject : 'SELECT DISTINCT ?subject WHERE { {?subject a <{CLASS}>;<http://purl.org/dc/elements/1.1/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2000/01/rdf-schema#label> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2004/02/skos/core#prefLabel> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} }  LIMIT 1  ',
                                documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object} ORDER BY ?property',
                                document : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
                                bnode : 'SELECT DISTINCT *  WHERE {<{URI}> ?property ?object}',
                                inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}>} LIMIT 100',
                                inverseSameAs : 'SELECT DISTINCT * WHERE {{?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}> } UNION { ?object <http://www.w3.org/2004/02/skos/core#exactMatch> <{URI}>}}'
                            },
                            useForInverseSameAs : false,
                            endpoint : 'http://worldbank.270a.info/sparql',
                            examples : [ {
                                label : 'Canada (country)',
                                uri : 'http://worldbank.270a.info/classification/country/CA'
                            }, {
                                label : 'Agricultural machinery, tractors (skos)',
                                uri : 'http://worldbank.270a.info/classification/indicator/AG.AGR.TRAC.NO'
                            }, {
                                label : 'World Bank Finances dataset',
                                uri : 'http://worldbank.270a.info/dataset/world-bank-finances'
                            }, {
                                label : 'Canadian Dollar (currency)',
                                uri : 'http://worldbank.270a.info/classification/currency/CAD'
                            } ]
                        },
                        'http://ReLoad,http://lod.xdams.org' : {
                            description : {
                                it : 'ReLoad (Repository for Linked open archival data) &egrave; un progetto realizzato dall\'Archivio Centrale dello Stato, dall\'Istituto per i Beni culturali dell\'Emilia Romagna e da Regesta.exe con l\'obiettivo di sperimentare le metodologie del semantic web e le tecnologie standard per i linked open data sulle risorse archivistiche',
                                en : 'ReLoad (Repository for Linked open archival data) &egrave; un progetto realizzato dall\'Archivio Centrale dello Stato, dall\'Istituto per i Beni culturali dell\'Emilia Romagna e da Regesta.exe con l\'obiettivo di sperimentare le metodologie del semantic web e le tecnologie standard per i linked open data sulle risorse archivistiche'
                            },
                            sparql : {
                                allClasses : 'SELECT DISTINCT ?object WHERE {[] a ?object}',
                                findSubject : 'SELECT DISTINCT ?subject WHERE { {?subject a <{CLASS}>;<http://purl.org/dc/terms/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2000/01/rdf-schema#label> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>; <http://purl.org/dc/terms/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} }  LIMIT 1  ',
                                documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object.FILTER (isIRI(?object) || ?property = <http://www.w3.org/2000/01/rdf-schema#label> || ?property = <http://purl.org/dc/terms/title> ||  ?property =  <http://purl.org/dc/elements/1.1/title>)} ORDER BY ?property',
                                document : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
                                bnode : 'SELECT DISTINCT *  WHERE {<{URI}> ?property ?object}',
                                inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}>} LIMIT 100',
                                inverseSameAs : 'SELECT DISTINCT * WHERE {?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}>}'
                            },
                            endpoint : 'http://lod.xdams.org/sparql',
                            examples : [ {
                                uri : 'http://lod.xdams.org/reload/oad/uod/IT-ACS-AS0002-0019726',
                                label : 'uod'
                            } ]
                        },

                        'http://data.oceandrilling.org' : {
                            description : {
                                it : 'data.oceandrilling.org facilitates the discovery and access to data and information related to scientific ocean drilling efforts of the Integrated Ocean Drilling Program (IODP) U.S. implementing organization (USIO). Additional data originates from the: Deep Sea Drilling Project (DSDP), Ocean Drilling Program (ODP and ODP Legacy) in addition to IODP.',
                                en : 'data.oceandrilling.org facilitates the discovery and access to data and information related to scientific ocean drilling efforts of the Integrated Ocean Drilling Program (IODP) U.S. implementing organization (USIO). Additional data originates from the: Deep Sea Drilling Project (DSDP), Ocean Drilling Program (ODP and ODP Legacy) in addition to IODP.'
                            },
                            sparql : {
                                allClasses : 'SELECT DISTINCT ?object WHERE {[] a ?object}',
                                findSubject : 'SELECT DISTINCT ?subject WHERE { {?subject a <{CLASS}>;<http://purl.org/dc/elements/1.1/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2000/01/rdf-schema#label> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2004/02/skos/core#prefLabel> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} }  LIMIT 1  ',
                                documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object} ORDER BY ?property',
                                document : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
                                bnode : 'SELECT DISTINCT *  WHERE {<{URI}> ?property ?object}',
                                inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}>} LIMIT 100',
                                inverseSameAs : 'SELECT DISTINCT * WHERE {?object <http://www.w3.org/2002/07/owl#sameas> <{URI}>}'
                            },
                            useForInverseSameAs : false,
                            endpoint : 'http://data.oceandrilling.org/sparql',
                            examples : [ {
                                uri : 'http://data.oceandrilling.org/core/1/ODP',
                                label : 'Ocean Drilling Program'
                            }, {
                                uri : 'http://data.oceandrilling.org/core/1/',
                                label : 'USIO-IODP vocabulary'
                            }, {
                                uri : 'http://data.oceandrilling.org/codices/lsh/104/642/D',
                                label : 'Expedition 104 site 642 hole D'
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
                                documentUri : 'SELECT DISTINCT * WHERE {{<{URI}> ?property ?object. FILTER(!isLiteral(?object))}  UNION 	 {<{URI}> ?property 	 ?object.FILTER(isLiteral(?object)).FILTER(lang(?object) ="it")} UNION 	 {<{URI}> ?property 	 ?object.FILTER(isLiteral(?object)).FILTER(lang(?object) = "en")} UNION 	 {<{URI}> ?property 	 ?object.FILTER(isLiteral(?object)).FILTER(lang(?object) ="")}} ORDER BY ?property',
                                document : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
                                bnode : 'SELECT DISTINCT *  WHERE {<{URI}> ?property ?object}',
                                inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}>} LIMIT 100',
                                inverseSameAs : 'SELECT DISTINCT * WHERE {?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}>}'
                            },
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
                                documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object} ORDER BY ?property',
                                document : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
                                bnode : 'SELECT DISTINCT *  WHERE {<{URI}> ?property ?object}',
                                inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}>} LIMIT 100',
                                inverseSameAs : 'SELECT DISTINCT * WHERE {?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}>}'
                            },
                            endpointType : 'sesame',
                            proxy : 'http://lodview.it/simple-proxy/resourceProxy/',
                            endpoint : 'http://data.linkedmdb.org/sparql',
                            examples : [ {
                                uri : 'http://data.linkedmdb.org/resource/film/2014',
                                label : 'Shining'
                            } ]
                        }, /*
							 * 'http://data.nytimes.com' : { description : { it : 'For the last 150 years, The New York Times has maintained one of the most authoritative news
							 * vocabularies ever developed. In 2009, we began to publish this vocabulary as linked open data.<br />As of 13 January 2010, The New York Times has
							 * published 10,000 subject headings as linked open data under a CC BY license.', en : 'For the last 150 years, The New York Times has maintained one of
							 * the most authoritative news vocabularies ever developed. In 2009, we began to publish this vocabulary as linked open data.<br />As of 13 January
							 * 2010, The New York Times has published 10,000 subject headings as linked open data under a CC BY license.' }, sparql : { allClasses : 'SELECT
							 * DISTINCT ?object WHERE {[] a ?object}', findSubject : 'SELECT DISTINCT ?subject WHERE { {?subject a <{CLASS}>;<http://purl.org/dc/elements/1.1/title>
							 * ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2000/01/rdf-schema#label> ?object.
							 * FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2004/02/skos/core#prefLabel> ?object.
							 * FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} } LIMIT 1 ', documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}', document : 'SELECT
							 * DISTINCT * WHERE {<{URI}> ?property ?object}', bnode : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}', inverse : 'SELECT DISTINCT * WHERE
							 * {?object ?property <{URI}>} LIMIT 100', inverseSameAs : 'SELECT DISTINCT * WHERE {?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}>}' },
							 * useForInverseSameAs : true, endpoint : 'http://api.talis.com/stores/nytimes/services/sparql', examples : [ { uri :
							 * 'http://data.nytimes.com/55630655163615370853', label : 'Romano Prodi' } ] },
							 */
                        'http://data.ordnancesurvey.co.uk' : {
                            description : {
                                it : 'Ordnance Survey is Great Britain\'s national mapping agency, providing geographic data, relied on by government, business and individuals. <br/>Ordnance Survey has published three separate linked data resources: the 1:50 000 Scale Gazetteer, Code-Point Open and the administrative geography gazetteer for Great Britain.',
                                en : 'Ordnance Survey is Great Britain\'s national mapping agency, providing geographic data, relied on by government, business and individuals. <br/>Ordnance Survey has published three separate linked data resources: the 1:50 000 Scale Gazetteer, Code-Point Open and the administrative geography gazetteer for Great Britain.'
                            },
                            sparql : {
                                allClasses : 'SELECT DISTINCT ?object WHERE {[] a ?object}',
                                findSubject : 'SELECT DISTINCT ?subject WHERE { {?subject a <{CLASS}>;<http://purl.org/dc/elements/1.1/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2000/01/rdf-schema#label> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2004/02/skos/core#prefLabel> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} }  LIMIT 1  ',
                                documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object} ORDER BY ?property',
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

	                            findSubject : 'SELECT DISTINCT ?subject WHERE { {?subject a <{CLASS}>;<http://purl.org/dc/elements/1.1/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2000/01/rdf-schema#label> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2004/02/skos/core#prefLabel> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} } LIMIT 1'
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
                            useForInverseSameAs : true,
                            sparql : {
                                allClasses : 'SELECT DISTINCT ?object WHERE {[] a ?object}',
                                findSubject : 'SELECT DISTINCT ?subject WHERE {?subject a <{CLASS}>;?none ?object.	 FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} LIMIT 1',
                                documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}  ',
                                document : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
                                bnode : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
                                inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}>} LIMIT		 100',
                                inverseSameAs : 'SELECT DISTINCT * WHERE {?object <http://www.w3.org/2004/02/skos/core#subject> <{URI}>}'
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
                                documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object} ORDER BY ?property',
                                document : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
                                bnode : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
                                inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}>} LIMIT		 100',
                                inverseSameAs : 'SELECT DISTINCT * WHERE {?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}>}'
                            },
                            endpoint : 'http://sparql.sindice.com/sparql',
                            examples : [ {
                                uri : 'http://www.semanlink.net/tag/dbpedia',
                                label : 'Dbpedia'
                            } ]
                        },
                        'http://reference.data.gov.uk' : {
                            description : {
                                it : 'Reference data for linked UK government data: it covers the central working of government, including organisational structures where these have been made available as RDF.',
                                en : 'Reference data for linked UK government data: it covers the central working of government, including organisational structures where these have been made available as RDF.'
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
                            useForInverseSameAs : false,
                            endpoint : 'http://spcdata.digitpa.gov.it:8899/sparql',
                            examples : [ {
                                uri : 'http://spcdata.digitpa.gov.it/UnitaOrganizzativa/2612',
                                label : 'Economato'
                            } ]
                        },
                        'http://dati.acs' : {
                            description : {
	                            en : ''
                            },

                            useForInverseSameAs : true,
                            endpoint : 'http://dati.acs.beniculturali.it/sparql',
                            examples : [ {
                                uri : '',
                                label : ''
                            } ]
                        },
                        'http://comune.fi.it,http://sr-vm091-opend.comune.fi.it' : {
                            description : {
                                it : 'In quest\'area sono accessibili i linked open data del Comune di Firenze. Al momento sono disponibili i dataset musei, viario, sinistri e toponomastica.',
                                en : 'The linked open data of the City of Florence are available here. Museums, traffic, accidents and place names datasets are currently available.'
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
                            endpoint : 'http://dblp.l3s.de/d2r/sparql',
                            examples : [ {
                                uri : 'http://dblp.l3s.de/d2r/resource/authors/Oktie_Hassanzadeh',
                                label : 'Oktie Hassanzadeh'
                            } ]
                        },
                        "http://transparency.270a.info" : {
                            endpoint : "http://transparency.270a.info/sparql",
                            description : {
	                            en : "Transparency International Linked Data: A world in which government, politics, business, civil society and the daily lives of people are free of corruption"
                            }
                        },
                        "http://imf.270a.info" : {
                            endpoint : "http://imf.270a.info/sparql",
                            description : {
	                            en : "International Monetary Fund Linked Data: Working to foster global monetary cooperation, secure financial stability, facilitate international trade, promote high employment and sustainable economic growth, and reduce poverty around the world"
                            }
                        },
                        "http://ecb.270a.info" : {
                            endpoint : "http://ecb.270a.info/sparql",
                            description : {
	                            en : "European Central Bank Linked Data: Whose main task is to maintain the euro's purchasing power and thus price stability in the euro area"
                            }
                        },
                        "http://bfs.270a.info" : {
                            endpoint : "http://bfs.270a.info/sparql",
                            description : {
	                            en : "Swiss Federal Statistics Office Linked Data: A wide range of statistical information on the most important areas of life: population, health, economy, employment, education and more"
                            }
                        },
                        "http://fao.270a.info" : {
                            endpoint : "http://fao.270a.info/sparql",
                            description : {
	                            en : "Food and Agriculture Organization of the United Nations Linked Data: Achieving food security for all is at the heart of FAO's efforts - to make sure people have regular access to enough high-quality food to lead active, healthy lives"
                            }
                        },
                        "http://oecd.270a.info" : {
                            endpoint : "http://oecd.270a.info/sparql",
                            description : {
	                            en : "Organisation for Economic Co-operation and Development Linked Data: The mission of OECD is to promote policies that will improve the economic and social well-being of people around the world"
                            }
                        }

                    },

                    /*
					 * 
					 * you can specify the properties you want to show in the black doc info box you can also specify a custom label
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

                    // configurazione standard per la rappresentazione di un documento
                    // utilizzata nel caso manchi una specifica configurazione per la classe
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
                                    'http://rdf.freebase.com/ns/type.object.name', 'http://spcdata.digitpa.gov.it/nome_cognome', 'http://xmlns.com/foaf/0.1/firstName',
                                    'http://xmlns.com/foaf/0.1/lastName', 'http://xmlns.com/foaf/0.1/surname', 'http://xmlns.com/foaf/0.1/name',
                                    'http://purl.org/dc/terms/description', 'http://www.geonames.org/ontology/officialName',
                                    'http://d-nb.info/standards/elementset/gnd#preferredName', 'http://d-nb.info/standards/elementset/gnd#preferredNameForTheFamily',
                                    'http://d-nb.info/standards/elementset/gnd#preferredNameForThePerson',
                                    'http://d-nb.info/standards/elementset/gnd#preferredNameForThePlaceOrGeographicName',
                                    'http://d-nb.info/standards/elementset/gnd#preferredNameForTheConferenceOrEvent',
                                    'http://d-nb.info/standards/elementset/gnd#preferredNameForTheWork',
                                    'http://d-nb.info/standards/elementset/gnd#preferredNameForTheSubjectHeading' ]
                        }, // http://www.w3.org/2000/01/rdf-schema#label
                        images : {
	                        properties : [ 'http://www.w3.org/2006/vcard/ns#photo', 'http://xmlns.com/foaf/0.1/depiction', 'http://dbpedia.org/ontology/thumbnail',
	                                'http://dbpedia.org/property/logo', 'http://linkedgeodata.org/ontology/schemaIcon' ]
                        },
                        maps : {
                            longs : [ 'http://www.w3.org/2003/01/geo/wgs84_pos#long' ],
                            lats : [ 'http://www.w3.org/2003/01/geo/wgs84_pos#lat' ],
                            points : [ 'http://www.georss.org/georss/point' ]
                        },
                        weblinks : {
	                        properties : [ 'http://www.w3.org/ns/dcat#accessURL', 'http://xmlns.com/foaf/0.1/mbox', 'http://rdfs.org/sioc/ns#links_to',
	                                'http://it.dbpedia.org/property/url', 'http://data.nytimes.com/elements/search_api_query', 'http://www.w3.org/2000/01/rdf-schema#isDefinedBy',
	                                'http://xmlns.com/foaf/0.1/page', 'http://xmlns.com/foaf/0.1/homepage', 'http://purl.org/dc/terms/isReferencedBy',
	                                'http://purl.org/dc/elements/1.1/relation', 'http://dbpedia.org/ontology/wikiPageExternalLink', 'http://data.nytimes.com/elements/topicPage' ]
                        }
                    },

                    'http://www.w3.org/2002/07/owl#Class' : {
	                    document : {
		                    className : 'Class'/*
												 * , titleProperties : ['http://purl.org/dc/elements/1.1/title', 'http://www.w3.org/2000/01/rdf-schema#label']
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
		                    titleProperties : [ 'expedition', 'http://data.oceandrilling.org/core/1/expedition', 'site', 'http://data.oceandrilling.org/core/1/site', 'hole',
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
		                    titleProperties : [ 'http://www.cnr.it/ontology/cnr/personale.owl#cognome', ' ', 'http://www.cnr.it/ontology/cnr/personale.owl#nome' ]
	                    }
                    }

                });
if (!document.lodliveVars) {
	document.lodliveVars = {};
}

$.jStorage.set('boxTemplate', '<div class="boxWrapper" id="first"><div class="box sprite"></div></div>');
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
