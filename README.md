
Load biopax in virtuoso
-----------------------

curl -i --data-urlencode query="LOAD <http://www.biopax.org/release/biopax-level3.owl> INTO GRAPH <mygraph/biopax>" -H "Content-Type: application/sparql-query" -G http://localhost:8890/sparql

Load GO
-----------------------
curl -i --data-urlencode query="LOAD <http://purl.obolibrary.org/obo/go.owl> INTO GRAPH <mygraph/go>" -H "Content-Type: application/sparql-query" -G http://localhost:8890/sparql

Load DBPedia
-----------------------
curl -i --data-urlencode query="LOAD <http://downloads.dbpedia.org/2014/dbpedia_2014.owl> INTO GRAPH <mygraph/dbpedia>" -H "Content-Type: application/sparql-query" -G http://localhost:8890/sparql

Load Uniprot
-------------------------
curl -i --data-urlencode query="LOAD <ftp://ftp.uniprot.org/pub/databases/uniprot/current_release/rdf/core.owl> INTO GRAPH <mygraph/Uniprot>" -H "Content-Type: application/sparql-query" -G http://localhost:8890/sparql


Data Reactome
--------------------------
https://www.ebi.ac.uk/rdf/running-sparql-endpoint-locally

