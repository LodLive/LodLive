Configuration
=============

 lodlive.profile.js where you have to put the list of the properties you need

something like:

images : {properties : [ 'http://xmlns.com/foaf/0.1/depiction', 'http://dbpedia.org/ontology/thumbnail', 'http://dbpedia.org/property/logo', 'http://linkedgeodata.org/ontology/schemaIcon' ]},

you have to add "http://www.w3.org/2006/vcard/ns#photo" to the list, I did it on en.lodlive.it so if you are using the online version you can try it and tell me if it works

you can handle the "mailbox issue" in the same way:
  	
weblinks : {
			properties : [ 'http://xmlns.com/foaf/0.1/mbox','http://rdfs.org/sioc/ns#links_to', 'http://it.dbpedia.org/property/url', 'http://data.nytimes.com/elements/search_api_query', 'http://www.w3.org/2000/01/rdf-schema#isDefinedBy', 'http://xmlns.com/foaf/0.1/page', 'http://xmlns.com/foaf/0.1/homepage', 'http://purl.org/dc/terms/isReferencedBy', 'http://purl.org/dc/elements/1.1/relation', 'http://dbpedia.org/ontology/wikiPageExternalLink', 'http://data.nytimes.com/elements/topicPage' ]
		}

if you add some property in the weblinks list, lodlive will ignored it as "circle" but will represent it as a link in the document black box
