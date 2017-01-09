var askowl_config = {
  "prefix" : {
    "rdfs"   : "http://www.w3.org/2000/01/rdf-schema#",
    "rdf"    : "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "rdfg"   : "http://www.w3.org/2004/03/trix/rdfg-1/",
    "owl"    : "http://www.w3.org/2002/07/owl#",
    "biopax3": "http://www.biopax.org/release/biopax-level3.owl#",
    "obo"    : "http://purl.obolibrary.org/obo/",
    "faldo"  : "http://biohackathon.org/resource/faldo#",
    "ensembl": "http://rdf.ebi.ac.uk/resource/ensembl/",
    "identifiers":"http://identifiers.org/",
    "irisa" : "http://www.semanticweb.org/irisa/ontologies/2016/1/igepp-ontology#",
    "inra" : "http://www.semanticweb.org/INRA/igepp/ontologies/2016/1#",
    "askons": "http://www.semanticweb.org/askomicsns/setting#"
  },

  "endpoint" : "http://localhost:8890/sparql",
  /*
  urn:sparql:tests-askomics:insert:informative1
  mygraph/biopax
  mygraph/dbpedia
  */

  "externalServices" : {
    "Ensembl SPARQL Endpoint" : {
      "endpoint" : "https://www.ebi.ac.uk/rdf/services/ensembl/sparql"
    },
    "Reactome SPARQL Endpoint": {
      "endpoint" : "https://www.ebi.ac.uk/rdf/services/reactome/sparql"
    },
    "Biomodel"                : {
      "endpoint" : "https://www.ebi.ac.uk/rdf/services/biomodels/sparql"
    },
    "Gene Ontology Endpoint"  : {
      "endpoint" : "http://cloud-60.genouest.org/go/sparql"
    },
    "Uniprot"                 : {
      "endpoint" : "http://sparql.uniprot.org/sparql"
    },
    /*
    "DBpedia"                 : {
      "endpoint" : "https://dbpedia.org/sparql"
    },*/
  },
};
