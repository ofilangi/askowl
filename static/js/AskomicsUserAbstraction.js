/*jshint esversion: 6 */

/*
  CLASSE AskomicsUserAbstraction
  Manage Abstraction storing in the TPS.
*/

let instanceUserAbstraction ;

class AskomicsUserAbstraction {
   constructor() {
    /* Implement a Singleton */
    if ( instanceUserAbstraction !== undefined ) {
       return instanceUserAbstraction;
    }

    this.endpoint = askowl_config.endpoint ;


  //  this.endpoint  = 'http://localhost:8890/sparql';
    //this.endpoint  = 'https://www.ebi.ac.uk/rdf/services/biomodels/sparql';
/*
    this.services = {
      'Ensembl SPARQL Endpoint' : 'https://www.ebi.ac.uk/rdf/services/ensembl/sparql',
      'Reactome SPARQL Endpoint': 'https://www.ebi.ac.uk/rdf/services/reactome/sparql',
      'Biomodel'                : 'https://www.ebi.ac.uk/rdf/services/biomodels/sparql',
      'Gene Ontology Endpoint'  : 'http://cloud-60.genouest.org/go/sparql',
      'Uniprot'                 : 'http://sparql.uniprot.org/sparql',
      'DBpedia'                 : 'https://dbpedia.org/sparql'
    };
*/
    this.services = {};

    for ( let service in askowl_config.externalServices ) {
      this.services[service] =  askowl_config.externalServices[service].endpoint ;
    }

    this.prefix = askowl_config.prefix ;
    /*{
      'rdfs'   : 'http://www.w3.org/2000/01/rdf-schema#',
      'rdf'    : 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
      'owl'    : 'http://www.w3.org/2002/07/owl#',
      'biopax3': 'http://www.biopax.org/release/biopax-level3.owl#',
      'obo'    : 'http://purl.obolibrary.org/obo/',
      'faldo'  : 'http://biohackathon.org/resource/faldo#',
      'ensembl': 'http://rdf.ebi.ac.uk/resource/ensembl/',
      'identifiers':'http://identifiers.org/',
    };
*/
    this.currentService = this.endpoint;

      /* Ontology is save locally to avoid request with TPS  */
      /* --------------------------------------------------- */

    this.relationFrom          = {};
    this.relationTo            = {};
    this.entityInformationList = {}; /*   entityInformationList[uri1][rel] = uri2 ; */
    this.relationInformationList = {};
    this.attributesInformationList = {};
    this.attributesEntityList = {};  /*   attributesEntityList[uri1] = [ att1, att2,... ] */

    /* uri ->W get information about ref, taxon, start, end */
//    this.entityPositionableInformationList = {}; /* entityPositionableInformationList[uri1] = { taxon, ref, start, end } */
    this.attributesOrderDisplay = {} ;           /* manage a order list by URInode */

    instanceUserAbstraction = this;
    return instanceUserAbstraction;
    }

    setCurrentService(urlService) {
        this.currentService = urlService;
    }

    getCurrentService() {
        return this.currentService ;
    }

    getServices() {
      return JSON.parse(JSON.stringify(this.services));
    }

    longRDF(litteral) {
      if ( litteral === "" || litteral === undefined ) return litteral ;
      let idx = litteral.lastIndexOf(":");
      let p = this.getPrefix(litteral.substring(0,idx));
      return p+litteral.substring(idx+1);
    }

    shortRDF(litteral) {
      if ( litteral === "" || litteral === undefined ) return litteral ;
      for (let p in this.prefix ) {
        let idx = litteral.indexOf(this.prefix[p]);
        if ( idx !== -1 ) {
          return p+":"+litteral.substring(idx+this.prefix[p].length);
        }
      }

      return litteral;
    }

    getEntities() {
      return JSON.parse(JSON.stringify(Object.keys(this.entityInformationList))) ;
    }

    getAttributesEntity(uriEntity) {
      if ( uriEntity in this.attributesEntityList )
        return JSON.parse(JSON.stringify(this.attributesEntityList[uriEntity])) ;

      return [];
    }

    getPositionableEntities() {
      let positionaleEntities = {};
      for ( let uri_entity in this.entityInformationList ) {
        if ( this.getAttribEntity(uri_entity,new AskomicsUserAbstraction().longRDF('askomicsns:hasOwnClassVisualisation')) === 'AskomicsPositionableNode' ) {
          positionaleEntities[uri_entity] = this.entityInformationList[uri_entity];
        }
      }

      return positionaleEntities;
      //return JSON.parse(JSON.stringify(this.entityPositionableInformationList)) ;
    }

    static getTypeAttribute(attributeForUritype) {

      if ( attributeForUritype.indexOf(new AskomicsUserAbstraction().getPrefix("xsd")) === -1 ) {
          return "category";
      }

      if (attributeForUritype === new AskomicsUserAbstraction().longRDF("xsd:decimal")) {
        return "decimal";
      }
      if (attributeForUritype === new AskomicsUserAbstraction().longRDF("xsd:string")) {
        return "string";
      }
      if (attributeForUritype === new AskomicsUserAbstraction().longRDF("xsd:boolean")) {
        return "string";
      }
      if (attributeForUritype === new AskomicsUserAbstraction().longRDF("xsd:nonNegativeInteger")) {
        return "decimal";
      }
      if (attributeForUritype === new AskomicsUserAbstraction().longRDF("xsd:integer")) {
        return "decimal";
      }
      if (attributeForUritype === new AskomicsUserAbstraction().longRDF("xsd:float")) {
        return "decimal";
      }
      if (attributeForUritype === new AskomicsUserAbstraction().longRDF("xsd:int")) {
        return "decimal";
      }
      if (attributeForUritype === new AskomicsUserAbstraction().longRDF("xsd:long")) {
        return "decimal";
      }
      if (attributeForUritype === new AskomicsUserAbstraction().longRDF("xsd:short")) {
        return "decimal";
      }
      if (attributeForUritype === new AskomicsUserAbstraction().longRDF("xsd:byte")) {
        return "decimal";
      }
      if (attributeForUritype === new AskomicsUserAbstraction().longRDF("xsd:language")) {
        return "string";
      }
      return attributeForUritype;
    }

    getPrefix(ns) {
      if (! (ns in this.prefix)) {
        //get info in prefix.cc
        //
        $.ajax({
          async: false,
          type: 'GET',
          url: 'http://prefix.cc/'+ns.trim()+'.file.json',
          success: function( result_json ) {
            console.log("new prefix:"+ns+"==>"+result_json[ns]);
            instanceUserAbstraction.prefix[ns] = result_json[ns];
          },
          error: function(req, status, ex) {
            instanceUserAbstraction.prefix[ns] = ns;
          },
          timeout:30
        });
      }
      return this.prefix[ns];
    }

    getAttribEntity(uriEntity,attrib) {
      return this.getGenAttrib(this.entityInformationList,uriEntity,attrib);
    }

    getAttribRelation(uri,attrib) {
      return this.getGenAttrib(this.relationInformationList,uri,attrib);
    }

    getAttribAttributes(uri,attrib) {
      return this.getGenAttrib(this.attributesInformationList,uri,attrib);
    }

    /* Get value of an attribut with RDF format like rdfs:label */
    getGenAttrib(diction,uriEntity,attrib) {
      let nattrib = attrib ;

      if (!(uriEntity in diction)) {
        return "";
      }

      if (!(nattrib in diction[uriEntity])) {
        return "";
      }

      return diction[uriEntity][nattrib];
    }

    /* build node from user abstraction infomation */
    buildBaseNode(uriEntity) {
      var node = {
        uri   : uriEntity,
        label : this.getAttribEntity(uriEntity,new AskomicsUserAbstraction().longRDF('rdfs:label'))
      } ;
      return node;
    }


    /*
    Get
    - relations with UriSelectedNode as a subject or object
    - objects link with Subject UriSelectedNode
    - Subjects link with Subject UriSelectedNode
     */

    getRelationsObjectsAndSubjectsWithURI(UriSelectedNode,callback1,callback2) {

      if ( ! ( UriSelectedNode in this.relationFrom) ) {

        let spq = $.sparql(new TriplestoreParametersView().configuration('endpoint'));
        /* Get relation which UriSelectedNode is the domain (or an ancestor) */
      spq.prefix("rdfs",new AskomicsUserAbstraction().getPrefix("rdfs"))
                .prefix("rdf",new AskomicsUserAbstraction().getPrefix("rdf"))
                .prefix("owl",new AskomicsUserAbstraction().getPrefix("owl"))
                .select(["?relation","?label","?entityDomain","?entityRange","?property"])
                .where("?relation","rdf:type","?property")
                .values("?property",["owl:ObjectProperty","owl:AsymmetricProperty",
                                     "owl:InverseFunctionalProperty","owl:IrreflexiveProperty",
                                     "owl:ReflexiveProperty","owl:SymmetricProperty",
                                     "owl:TransitiveProperty"])
                .where("?relation","rdfs:domain","?entityDomain")
                .where("<"+UriSelectedNode+">","rdfs:subClassOf*","?entityDomain")
                .where("?relation","rdfs:range","?entityRange")
                .filter("isIRI(?entityDomain)")
                .filter("isIRI(?entityRange)")
                .optional()
                    .where("?relation","rdfs:label","?label");

        spq.execute(function(results) {
          instanceUserAbstraction.relationFrom[UriSelectedNode] = {} ;
          for ( let elt in results ) {
            let value = results[elt];
            if ( ! (value.entityRange.uri in instanceUserAbstraction.relationFrom[UriSelectedNode] ))
              instanceUserAbstraction.relationFrom[UriSelectedNode][value.entityRange.uri] = [] ;
            let obj = {} ;

            obj.uri = value.relation.uri;
            obj.label =value.label;
            obj.domain = value.entityDomain.uri;
            obj.property = value.property.uri;
            instanceUserAbstraction.relationFrom[UriSelectedNode][value.entityRange.uri].push(obj);
          }

          callback1(JSON.parse(JSON.stringify(instanceUserAbstraction.relationFrom[UriSelectedNode])));
        });
      } else {
        callback1(JSON.parse(JSON.stringify(instanceUserAbstraction.relationFrom[UriSelectedNode])));
      }

      if ( ! ( UriSelectedNode in this.relationTo) ) {

        let spq = $.sparql(new TriplestoreParametersView().configuration('endpoint'));
        /* Get relation which UriSelectedNode is the domain (or an ancestor) */
        spq.prefix("rdfs",new AskomicsUserAbstraction().getPrefix("rdfs"))
                .prefix("rdf",new AskomicsUserAbstraction().getPrefix("rdf"))
                .prefix("owl",new AskomicsUserAbstraction().getPrefix("owl"))
                .select(["?relation","?label","?entityDomain","?entityRange","?property"])
                .where("?relation","rdf:type","?property")
                .values("?property",["owl:ObjectProperty","owl:AsymmetricProperty",
                                     "owl:InverseFunctionalProperty","owl:IrreflexiveProperty",
                                     "owl:ReflexiveProperty","owl:SymmetricProperty",
                                     "owl:TransitiveProperty"])
                .where("?relation","rdfs:domain","?entityDomain")
                .where("?relation","rdfs:range","?entityRange")
                .where("<"+UriSelectedNode+">","rdfs:subClassOf*","?entityRange")
                .filter("isIRI(?entityDomain)")
                .filter("isIRI(?entityRange)")
                .optional()
                    .where("?relation","rdfs:label","?label");

        spq.execute(function(results) {
          instanceUserAbstraction.relationTo[UriSelectedNode] = {} ;
          for ( let elt in results ) {
            let value = results[elt];
            if ( ! (value.entityDomain.uri in instanceUserAbstraction.relationTo[UriSelectedNode] ))
              instanceUserAbstraction.relationTo[UriSelectedNode][value.entityDomain.uri] = [] ;
            let obj = {} ;

            obj.uri = value.relation.uri;
            obj.label =value.label;
            obj.range = value.entityRange.uri;
            obj.property = value.property.uri;
            instanceUserAbstraction.relationTo[UriSelectedNode][value.entityDomain.uri].push(obj);
          }

          callback2(JSON.parse(JSON.stringify(instanceUserAbstraction.relationTo[UriSelectedNode])));
        });
      } else {
        callback2(JSON.parse(JSON.stringify(instanceUserAbstraction.relationTo[UriSelectedNode])));
      }


    }

    /* return a list of attributes according a uri node */
    getDatatypePropertyofEntity(UriSelectedNode,callback) {
      if ( ! (UriSelectedNode in this.attributesEntityList) ) {
        /* Neveler load...we do a spaarql request to update this.attributesEntityList */
        let spq = $.sparql(new TriplestoreParametersView().configuration('endpoint'));

        /* attribute from inherited class */
         spq.prefix("rdfs",new AskomicsUserAbstraction().getPrefix("rdfs"))
           .prefix("rdf",new AskomicsUserAbstraction().getPrefix("rdf"))
           .prefix("owl",new AskomicsUserAbstraction().getPrefix("owl"))
           .select(["?attribute","?entityDomain","?entityRange"])
           .where("?attribute","rdf:type","owl:DatatypeProperty")
           .where("?attribute","rdfs:domain","?entityDomain")
           .where("<"+UriSelectedNode+">","rdfs:subClassOf*","?entityDomain")
           .where("?attribute","rdfs:range","?entityRange")
           .filter("isIRI(?entityDomain)")
           .filter("isIRI(?entityRange)");
         spq.execute(function(results) {

             instanceUserAbstraction.attributesEntityList[UriSelectedNode] = [];
             for ( let elt in results ) {
               let value = results[elt];

               let attribute = {};
               attribute.uri   = value.attribute.uri ;
               attribute.label = value.label===undefined?new AskomicsUserAbstraction().shortRDF(value.attribute.uri):value.label ;
               /*
               The attribut could come from a Generic Class which the current UriSelectedNode inherited
               we save the origin in the 'domain' attribute
                */
               attribute.domain= value.entityDomain.uri ;
               attribute.type  = value.entityRange.uri;
               attribute.basic_type = AskomicsUserAbstraction.getTypeAttribute(value.entityRange.uri);

               instanceUserAbstraction.attributesEntityList[UriSelectedNode].unshift(attribute);
             }
             callback(instanceUserAbstraction.attributesEntityList[UriSelectedNode]);
           });

/*

TODO : AJOUTER LES ATTRIBUTS SANS DOMAIN
----------------------------------------
           PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
         	PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
         	PREFIX owl: <http://www.w3.org/2002/07/owl#>

         	SELECT DISTINCT ?attribute ?entityRange
         	WHERE
         	{
         	?attribute rdf:type owl:DatatypeProperty.
         	?attribute rdfs:range ?entityRange.
         	FILTER NOT EXISTS {
         	?attribute rdfs:domain ?entityDomain.
         	}
         	}
*/

  /*
  TODO : AJOUTER LES ATTRIBUTS DONT LE DOMAIN EST UN BLANK NODE
  -------------------------------------------------------------

         PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
         	PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
         	PREFIX owl: <http://www.w3.org/2002/07/owl#>

         	SELECT DISTINCT ?attribute ?entityRange
         	WHERE
         	{
         	?attribute rdf:type owl:DatatypeProperty.
         	?attribute rdfs:range ?entityRange.
         	?attribute rdfs:domain ?entityDomain.
         	Filter (isBlank(?entityDomain))
         	}

           */


      } else
      callback(instanceUserAbstraction.attributesEntityList[UriSelectedNode]);
    }

    /* Setting order attribute display */
    setOrderAttributesList(URINode,listAtt) {
      this.attributesOrderDisplay[URINode] = listAtt.slice();
    }

    getOrderAttributesList(URINode) {
      if ( URINode in this.attributesOrderDisplay ) {
        return this.attributesOrderDisplay[URINode];
      }
      /* by default */
      let v = [];
      v.push( { 'uri': URINode , 'basic_type' : 'string' });
      if ( URINode in this.attributesEntityList ) {
        v = v.concat(this.attributesEntityList[URINode].slice());
      }
/*
      for (let i in this.attributesEntityList[URINode] ) {
          v.push(this.attributesEntityList[URINode][i]);
      }*/
      return v;
    }
  }
