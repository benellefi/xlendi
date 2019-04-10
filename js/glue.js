//Connecting Yasqe with Yasr/

var yasqe = YASQE(document.getElementById("yasqe"), {
	sparql: {endpoint:'http://139.124.41.79:8080/fuseki/xlendi/sparql',
            showQueryButton: true}
});
var yasr = YASR(document.getElementById("yasr"), {
	//this way, the URLs in the results are prettified using the defined prefixes in the query
	getUsedPrefixes: yasqe.getPrefixesFromQuery
});

//link both together
yasqe.options.sparql.callbacks.complete = yasr.setResponse;

yasqe.setValue( " PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>  \n PREFIX arp: <http://www.arpenteur.org/ontology/Arpenteur.owl#> \n SELECT distinct ?name ?typo WHERE { \n ?amp arp:hasName ?name; arp:hasTypologyName ?typo.} Order by DESC (?typo)");
  
yasqe.query();