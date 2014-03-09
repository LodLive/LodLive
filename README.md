LodLive
=======

browse the web of data - a SPARQL navigator

LodLive is an experimental project that was set-up to spread and promote the linked-open-data philosophy and to create a tool that can be used for connecting RDF browser capabilities with the effectiveness of data graph representation. 

LodLive is the first navigator to use RDF resources based solely on SPARQL endpoints. 

LodLive aims to demonstrate how resources published by W3C standards for the semantic web can be made easily accessible and legible with a few viable tools. 

LodLive is capable of connecting the resources existing in its configured endpoints, allowing the user to pass from one endpoint to another by making use of LOD interconnection capacities.

---------

LodLive è un progetto sperimentale nato per divulgare la filosofia dei linked open data e per creare uno strumento in grado di associare le potenzialità di un browser RDF all'efficacia della rappresentazione a grafo. 

LodLive è il primo navigatore di risorse RDF basato unicamente su endpoint SPARQL.

LodLive vuole dimostrare che le risorse pubblicate secondo gli standard del W3C per il semantic web possono essere facilmente accessibili e comprensibili con strumenti adeguati. 

LodLive è in grado di connettere le risorse presenti negli endpoint configurati al suo interno, consentendo all'utente di passare da un endpoint all'altro sfruttando le capacità di interconnessione insite nei LOD.


ChangeLog
-------
* *2014-03-09* | LodLive now searches for related resources (inverse cross-endpoint relations) even if the opened URI is not published on an EndPoint
* *2014-02-18* | LodLive now guess your endpoint adding "/sparql" to the base of the requested URI ( http://mysite.com/myID becames http://mysite.com/sparql), this is very usefull for non configured endpoints and for test/intranet endpoint: you can use something like http://en.lodlive.it?http://my-intranet-server/myID and it will work (if your endpoint URL is http://my-intranet-server/sparql), you dont need to download lodlive for this
* *2014-02-14* | your own triples on the 'black' doc view: you can specify the properties you want to show and even customize their order and their labels
* *...* many other changes...
* *2012-05-20* | LodLive first commit

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/dvcama/lodlive/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

