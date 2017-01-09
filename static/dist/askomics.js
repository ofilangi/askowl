"use strict";

var askowl_config = {
  "prefix": {
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "rdfg": "http://www.w3.org/2004/03/trix/rdfg-1/",
    "owl": "http://www.w3.org/2002/07/owl#",
    "biopax3": "http://www.biopax.org/release/biopax-level3.owl#",
    "obo": "http://purl.obolibrary.org/obo/",
    "faldo": "http://biohackathon.org/resource/faldo#",
    "ensembl": "http://rdf.ebi.ac.uk/resource/ensembl/",
    "identifiers": "http://identifiers.org/",
    "irisa": "http://www.semanticweb.org/irisa/ontologies/2016/1/igepp-ontology#",
    "inra": "http://www.semanticweb.org/INRA/igepp/ontologies/2016/1#",
    "askons": "http://www.semanticweb.org/askomicsns/setting#"
  },

  "endpoint": "http://localhost:8890/sparql",
  /*
  urn:sparql:tests-askomics:insert:informative1
  mygraph/biopax
  mygraph/dbpedia
  */

  "externalServices": {
    "Ensembl SPARQL Endpoint": {
      "endpoint": "https://www.ebi.ac.uk/rdf/services/ensembl/sparql"
    },
    "Reactome SPARQL Endpoint": {
      "endpoint": "https://www.ebi.ac.uk/rdf/services/reactome/sparql"
    },
    "Biomodel": {
      "endpoint": "https://www.ebi.ac.uk/rdf/services/biomodels/sparql"
    },
    "Gene Ontology Endpoint": {
      "endpoint": "http://cloud-60.genouest.org/go/sparql"
    },
    "Uniprot": {
      "endpoint": "http://sparql.uniprot.org/sparql"
    }
  }
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint multistr:true */
/*jshint esversion: 6 */

var AskomicsHelp = function () {
  function AskomicsHelp() {
    _classCallCheck(this, AskomicsHelp);
  }

  _createClass(AskomicsHelp, null, [{
    key: 'start',
    value: function start() {

      introJs().setOptions({
        //showBullets: false,
        showStepNumbers: false,
        steps: [
        /*
                {
                  intro: "<h2>Need Help to use Askomics ?</h2>\
                  <p>AskOmics provide a visual\
                  representation of the user abstraction as a graph.\
                  By starting from a node of interest and iteratively selecting its\
                  neighbors, the user creates a path on an abstraction graph.\
                  This path can then be transformed into a SPARQL query that can be\
                  executed on the original dataset.</p>"
                },
                {
                  intro: "You <b>don't need</b> to define element to focus, this is a floating tooltip."
                },
        */

        /*******************************************************************/
        /*                   UPLOAD CONTAINER                              */
        /*******************************************************************/
        {
          element: '#add_files_upload',
          intro: "<p>Select CSV/TSV files that you want upload.</p>",
          position: 'bottom'
        }, {
          element: '#start_upload',
          intro: "<p>Start upload of the selectionned files </p>",
          position: 'bottom'
        }, {
          element: '#cancel_upload',
          intro: "<p>Cancel upload</p>",
          position: 'bottom'
        }, {
          element: '#delete_upload',
          intro: "<p>Delete uploaded files (Your local files are not deleted) </p>",
          position: 'bottom'
        }, {
          element: '#integrate_upload',
          intro: "<p>Start the data integration with a friendly user interface !</p>",
          position: 'bottom'
        },

        /*******************************************************************/
        /*                   ASK CONTAINER                              */
        /*******************************************************************/
        {
          element: '#content_interrogation #startpoints',
          intro: "Have you ever upload your data with the 'Upload' section ? Next this step, you can select a started element to begin an askomics session with you integrated data.",
          position: 'right'
        }, {
          element: '.glyphicon-plus',
          intro: "<p>Match or negative match if the expression is not empty.</p><ul class=\"list-group\">\
            <li class=\"list-group-item\"><span class=\"glyphicon glyphicon-plus\">&nbsp;match</li>\
            <li class=\"list-group-item\"><span class=\"glyphicon glyphicon-minus\">&nbsp;negative match</li>\
            </ul>",
          position: 'left'
        },
        /* Keep at end */
        /* =============================   NAV BAR ========================================================================*/
        {
          element: '#integration',
          intro: "<p>Upload your CSV/TSV user files.</p>",
          position: 'bottom'
        }, {
          element: '#interrogation',
          intro: "<p>Create a path on your data and external services to build a SPARQL query based on your data.</p>",
          position: 'bottom'
        }, {
          element: '#datasets',
          intro: 'Manage yours datasets.',
          position: 'bottom'
        }, {
          element: '#statistics',
          intro: "Get some information about yours datasets(number of triplet, relation between entities, etc...).",
          position: 'bottom'
        }, {
          element: '#administration',
          intro: 'Run/Stop services. Administration of external services (GO, UniProt,... )',
          position: 'bottom'
        }].filter(function (obj) {
          if (obj.element === undefined) return true;
          return $(obj.element).is(':visible');
        })
      }).onbeforechange(function (targetElement) {

        if (targetElement === undefined || $(targetElement).is(':hidden')) // if targetElement does not exist or is hide
          {
            //  this.nextStep(); // go to the next step
          }
      }).start();
      return false;
    }
  }]);

  return AskomicsHelp;
}();
'use strict';

/*jshint esversion: 6 */
//https://github.com/jgeldart/jquery-sparql/blob/master/example.html
/**
 * jQuery SPARQL
 *
 * Provides an idiomatic jQuery-like interface to SPARQL endpoints.
 * Queries are built through method-chaining, before being compiled into a
 * string query which can be sent to the endpoint.
 *
 * $.sparql("http://www.example.com/sparql/").prefix("foaf","http://xmlns.com/0.1/foaf/")
 *  .select()
 *  .where("?p", "a", "foaf:Person")
 *        .where("foaf:name", "?name")
 *        .where("foaf:homepage", "?page")
 *  .orderby("?name")
 *  .distinct()
 *  .execute(cbfunc);
 */
(function ($) {

  $.sparqlrequest = function (config, query, callback) {
    //var url = "http://query.yahooapis.com/v1/public/yql?format=json&q=" + $.URLEncode(query);
    if (config === undefined || config.endpoint === undefined) {
      throw "sparqlrequest : can not find endpoint in config var.";
    }
    var method = config.method === undefined ? 'POST' : config.method;
    var output = config.output === undefined ? 'jsonp' : config.output;
    var contentType = config.contentType === undefined ? 'application/sparql-query' : config.contentType;

    var url = config.endpoint + "?query=" + encodeURIComponent(query) + "&format=json"; //+"&callback=?";

    console.log("URL\n----------------------------\n" + url);

    var ajax = $.ajax({
      type: method,
      url: url,
      dataType: output,
      success: callback,
      processData: false,
      contentType: contentType,
      crossDomain: true,
      cache: false,
      error: function error(jqXHR, status, errorThrown) {
        alert(errorThrown);
        console.err(status);
        console.err(errorThrown);
      }
    });
  };

  var URI = function URI(uri) {
    this.uri = uri;
  };

  var Query = function Query(endpoint, options, parentQuery) {
    this.config = {
      "endpoint": endpoint,
      "method": "POST",
      "output": "jsonp",
      'contentType': 'application/sparql-query; charset=utf-8' //application/json; charset=utf-8
    };

    this._parentQuery = parentQuery;
    this.queryType = "SELECT";
    this.prefixes = [];
    this.defaultGraphs = [];
    this.namedGraphs = [];
    this.variables = [];
    this.patterns = [];
    this.filters = [];
    this.filtersNotExist = [];
    this._values = [];
    this.combiner = "";
    this.orders = [];
    this.limitCount = -1;
    this.offsetCount = 0;
    this._prevSubj = null;
    this._prevProp = null;
    this._storedQuery = "";

    // Override the defaults with anything interesting
    if (options) $.extend(this.config, options);
  };

  Query.prototype.end = function () {
    return this._parentQuery;
  };

  Query.prototype.query = function (qstring) {
    this._storedQuery = qstring;
    return this;
  };

  Query.prototype.execute = function (callback) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var output = this.config.output;
    var queryString = this._storedQuery;

    var _clean = function _clean(val) {
      if (val.type == "literal") {
        return val.value;
      } else if (val.type == "uri") {
        return new URI(val.value);
      } else {
        return val.value;
      }
    };

    var _preproc = function _preproc(data) {
      if (data.results === null) {
        throw "jquery.sparql.js:results null";
      }
      var results = data.results.bindings;
      var cleaned_results = [];
      for (var r in results) {
        var result = results[r];
        var cleaned_obj = {};
        for (var k in result) {
          cleaned_obj[k] = _clean(result[k]);
        }
        cleaned_results.push(cleaned_obj);
      }
      callback(cleaned_results, args);
    };

    if (queryString === "") queryString = this.serialiseQuery();
    console.log("========== jquery sparql ===============");
    console.log(queryString);
    console.log("========================================");

    $.sparqlrequest(this.config, queryString, _preproc);
    return this;
  };

  Query.prototype.serialiseQuery = function () {
    var queryString = [];

    // Prefixes
    for (var _i = 0; _i < this.prefixes.length; _i++) {
      var pfx = this.prefixes[_i];
      queryString.push("PREFIX " + pfx.prefix + ": <" + pfx.uri + ">");
    }

    // Type and projection
    queryString.push(this.queryType);
    if (this.combiner !== "") {
      queryString.push(this.combiner);
    }
    if (this.queryType === "SELECT" && this.variables.length === 0) {
      queryString.push("*"); // No variables is seen as an implicit projection over ALL variables
    } else {
      for (var i = 0; i < this.variables.length; i++) {
        var v = this.variables[i];
        queryString.push(v);
      }
    }

    // Add the default graphs
    for (var _i2 = 0; _i2 < this.defaultGraphs.length; _i2++) {
      var defaultGraph = this.defaultGraphs[_i2];
      queryString.push("FROM <" + defaultGraph + ">");
    }

    // Add the named graphs
    for (var _i3 = 0; _i3 < this.namedGraphs.length; _i3++) {
      var namedGrph = this.namedGraphs[_i3];
      queryString.push("FROM NAMED <" + namedGrph + ">");
    }

    // Start WHERE block
    queryString.push("WHERE {");

    // Basic triple patterns and more exotic blocks
    for (var _i4 = 0; _i4 < this.patterns.length; _i4++) {
      var pat = this.patterns[_i4];

      // Basic triple
      if (pat._sort == "triple") {
        queryString.push(pat.s + " " + pat.p + " " + pat.o + ".");
      }
      // Optionals
      else if (pat._sort == "optional") {
          queryString.push("OPTIONAL");
          queryString.push(pat.subquery.serialiseBlock());
        }
        // Graph blocks
        else if (pat._sort == "graph") {
            queryString.push("GRAPH");
            queryString.push(pat.graphName);
            queryString.push(pat.subquery.serialiseBlock());
          }
          // Service blocks
          else if (pat._sort == "service") {
              queryString.push("SERVICE");
              queryString.push("<" + pat.serviceEndpoint + ">");
              queryString.push(pat.subquery.serialiseBlock());
            }
            // Just blocks
            else if (pat._sort == "block") {
                queryString.push(pat.subquery.serialiseBlock());
              }
    }

    // Filters
    for (var _i5 = 0; _i5 < this.filters.length; _i5++) {
      var flt = this.filters[_i5];
      queryString.push("FILTER ( " + flt + " )");
    }

    for (var _i6 = 0; _i6 < this.filtersNotExist.length; _i6++) {
      var _flt = this.filtersNotExist[_i6];
      queryString.push("FILTER NOT EXISTS( " + _flt + " )");
    }

    // Values
    for (var _i7 = 0; _i7 < this._values.length; _i7++) {
      var _flt2 = this._values[_i7];
      var stringValues = "VALUES " + _flt2.var + " {";
      for (var j = 0; j < _flt2.values.length; j++) {
        stringValues += " " + _flt2.values[j];
      }
      stringValues += "}";

      queryString.push(stringValues);
    }

    // End WHERE block
    queryString.push("}");

    if (this.orders.length > 0) {
      queryString.push("ORDER BY");
      for (var _i8 = 0; _i8 < this.orders.length; _i8++) {
        var odr = this.orders[_i8];
        queryString.push(odr);
      }
    }

    if (this.limitCount > -1) {
      queryString.push("LIMIT " + this.limitCount);
    }

    if (this.offsetCount > 0) {
      queryString.push("OFFSET " + this.offsetCount);
    }

    return queryString.join("\n");
  };

  Query.prototype.serialiseBlock = function () {
    var queryString = [];

    // Start block
    queryString.push("{");

    // Basic triple patterns and more exotic blocks
    for (var i = 0; i < this.patterns.length; i++) {
      var pat = this.patterns[i];

      // Basic triple
      if (pat._sort == "triple") {
        queryString.push(pat.s + " " + pat.p + " " + pat.o + ".");
      }
      // Optionals
      else if (pat._sort == "optional") {
          queryString.push("OPTIONAL");
          queryString.push(pat.subquery.serialiseBlock());
        }
        // Graph blocks
        else if (pat._sort == "graph") {
            queryString.push("GRAPH");
            queryString.push(pat.graphName);
            queryString.push(pat.subquery.serialiseBlock());
          }
          // Service blocks
          else if (pat._sort == "service") {
              queryString.push("SERVICE");
              queryString.push("<" + pat.serviceEndpoint + ">");
              queryString.push(pat.subquery.serialiseBlock());
            }
            // Just blocks
            else if (pat._sort == "block") {
                queryString.push(pat.subquery.serialiseBlock());
              }
    }

    // Filters
    for (var _i9 = 0; _i9 < this.filters.length; _i9++) {
      var flt = this.filters[_i9];
      queryString.push("FILTER ( " + flt + " )");
    }

    for (var _i10 = 0; _i10 < this.filtersNotExist.length; _i10++) {
      var _flt3 = this.filtersNotExist[_i10];
      queryString.push("FILTER NOT EXISTS( " + _flt3 + " )");
    }

    // Values
    for (var _i11 = 0; _i11 < this._values.length; _i11++) {
      var _flt4 = this._values[_i11];
      var stringValues = "VALUES " + _flt4.var + " {";
      for (var j = 0; j < _flt4.values.length; j++) {
        stringValues += " " + _flt4.values[j];
      }
      stringValues += "}";

      queryString.push(stringValues);
    }

    // End block
    queryString.push("} .");
    return queryString.join("\n");
  };

  Query.prototype.distinct = function () {
    this.combiner = "DISTINCT";
    return this;
  };

  Query.prototype.reduced = function () {
    this.combiner = "REDUCED";
    return this;
  };

  Query.prototype.select = function (variables) {
    this.queryType = "SELECT";
    if (variables) this.variables = variables;
    return this;
  };

  Query.prototype.describe = function (variables) {
    this.queryType = "DESCRIBE";
    if (variables) this.variables = variables;
    return this;
  };

  Query.prototype.prefix = function (prefix, uri) {
    this.prefixes.push({ "prefix": prefix, "uri": uri });
    return this;
  };

  Query.prototype.from = function (graph, isNamed) {
    if (isNamed) {
      this.namedGraphs.push(graph);
    } else {
      this.defaultGraphs.push(graph);
    }
    return this;
  };

  Query.prototype.where = function (subj, prop, obj) {
    if (!obj && !prop) {
      // We're in a subj-prop repeating section, use previous subj and prop
      return this.where(this._prevSubj, this._prevProp, subj);
    } else if (!obj) {
      // We're in a subj repeating section, use previous subj
      this._prevProp = subj;
      return this.where(this._prevSubj, subj, prop);
    } else {
      // We have a full triple
      this._prevSubj = subj;
      this._prevProp = prop;
      this.patterns.push({ "_sort": "triple", "s": subj, "p": prop, "o": obj });
      return this;
    }
  };

  Query.prototype.values = function (idvar, listValues) {
    this._values.push({ "var": idvar, "values": listValues });
    return this;
  };

  Query.prototype.filter = function (filter) {
    this.filters.push(filter);
    return this;
  };

  Query.prototype.filterNotExists = function (filter) {
    this.filtersNotExist.push(filter);
    return this;
  };

  Query.prototype.orderby = function (order) {
    this.orders.push(order);
    return this;
  };

  Query.prototype.limit = function (limit) {
    this.limitCount = limit;
    return this;
  };

  Query.prototype.offset = function (offset) {
    this.offsetCount = offset;
    return this;
  };

  Query.prototype.optional = function () {
    var opt = new Query(this.config.endpoint, this.config, this);
    this.patterns.push({ "_sort": "optional", "subquery": opt });
    return opt;
  };

  Query.prototype.graph = function (name) {
    var grph = new Query(this.config.endpoint, this.config, this);
    this.patterns.push({ "_sort": "graph", "graphName": name, "subquery": grph });
    return grph;
  };

  Query.prototype.service = function (endpoint) {
    var srvc = new Query(this.config.endpoint, this.config, this);
    this.patterns.push({ "_sort": "service", "serviceEndpoint": endpoint, "subquery": srvc });
    return srvc;
  };

  Query.prototype.block = function () {
    var blk = new Query(this.config.endpoint, this.config, this);
    this.patterns.push({ "_sort": "block", "subquery": blk });
    return blk;
  };

  $.sparql = function (endpoint, options) {
    return new Query(endpoint, options);
  };
})(jQuery);
"use strict";

function RestServiceJs(newurl) {
  if (location.pathname.indexOf("http") > 0) {
    this.myurl = location.pathname + newurl;
  } else {
    // TEST MODE IF FILE PATH WE SEARCH FOR A LOCAL SERVER on 6543 port
    this.myurl = "http://localhost:6543/" + newurl;
  }

  this.post = function (model, callback) {
    $.ajax({
      type: 'POST',
      url: this.myurl,
      data: JSON.stringify(model), // '{"name":"' + model.name + '"}',
      dataType: 'json',
      processData: false,
      contentType: 'application/json',
      success: callback,
      error: function error(req, status, ex) {
        alert('Request has failed.');
      },
      timeout: 0
    });
  };

  this.postsync = function (model, callback) {
    $.ajax({
      async: false,
      type: 'POST',
      url: this.myurl,
      data: JSON.stringify(model), // '{"name":"' + model.name + '"}',
      dataType: 'json',
      processData: false,
      contentType: 'application/json',
      success: callback,
      error: function error(req, status, ex) {
        alert('Request has failed.');
      },
      timeout: 0
    });
  };

  this.update = function (model, callback) {
    $.ajax({
      type: 'PUT',
      url: this.myurl,
      data: JSON.stringify(model), // '{"name":"' + model.name + '"}',
      dataType: 'json',
      processData: false,
      contentType: 'application/json',
      success: callback,
      error: function error(req, status, ex) {},
      timeout: 0
    });
  };

  this.get = function (id, callback) {
    $.ajax({
      type: 'GET',
      url: this.myurl + '/' + id,
      contentType: 'application/json',
      success: callback,
      error: function error(req, status, ex) {},
      timeout: 0
    });
  };

  this.getsync = function (callback) {
    $.ajax({
      async: false,
      type: 'GET',
      url: this.myurl,
      contentType: 'application/json',
      success: callback,
      error: function error(req, status, ex) {},
      timeout: 0
    });
  };

  this.getAll = function (callback) {
    $.ajax({
      type: 'GET',
      url: this.myurl,
      contentType: 'application/json',
      success: callback,
      error: function error(req, status, ex) {},
      timeout: 0
    });
  };

  this.remove = function (id, callback) {
    $.ajax({
      type: 'DELETE',
      url: this.myurl + '/' + id,
      contentType: 'application/json',
      success: callback,
      error: function error(req, status, ex) {},
      timeout: 0
    });
  };
}
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */

/*
  CLASSE AskomicsUserAbstraction
  Manage Abstraction storing in the TPS.
*/

var instanceUserAbstraction = void 0;

var AskomicsUserAbstraction = function () {
  function AskomicsUserAbstraction() {
    _classCallCheck(this, AskomicsUserAbstraction);

    /* Implement a Singleton */
    if (instanceUserAbstraction !== undefined) {
      return instanceUserAbstraction;
    }

    this.endpoint = askowl_config.endpoint;

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

    for (var service in askowl_config.externalServices) {
      this.services[service] = askowl_config.externalServices[service].endpoint;
    }

    this.prefix = askowl_config.prefix;
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

    this.relationFrom = {};
    this.relationTo = {};
    this.entityInformationList = {}; /*   entityInformationList[uri1][rel] = uri2 ; */
    this.relationInformationList = {};
    this.attributesInformationList = {};
    this.attributesEntityList = {}; /*   attributesEntityList[uri1] = [ att1, att2,... ] */

    /* uri ->W get information about ref, taxon, start, end */
    //    this.entityPositionableInformationList = {}; /* entityPositionableInformationList[uri1] = { taxon, ref, start, end } */
    this.attributesOrderDisplay = {}; /* manage a order list by URInode */

    instanceUserAbstraction = this;
    return instanceUserAbstraction;
  }

  _createClass(AskomicsUserAbstraction, [{
    key: "setCurrentService",
    value: function setCurrentService(urlService) {
      this.currentService = urlService;
    }
  }, {
    key: "getCurrentService",
    value: function getCurrentService() {
      return this.currentService;
    }
  }, {
    key: "getServices",
    value: function getServices() {
      return JSON.parse(JSON.stringify(this.services));
    }
  }, {
    key: "longRDF",
    value: function longRDF(litteral) {
      if (litteral === "" || litteral === undefined) return litteral;
      var idx = litteral.lastIndexOf(":");
      var p = this.getPrefix(litteral.substring(0, idx));
      return p + litteral.substring(idx + 1);
    }
  }, {
    key: "shortRDF",
    value: function shortRDF(litteral) {
      if (litteral === "" || litteral === undefined) return litteral;
      for (var p in this.prefix) {
        var idx = litteral.indexOf(this.prefix[p]);
        if (idx !== -1) {
          return p + ":" + litteral.substring(idx + this.prefix[p].length);
        }
      }

      return litteral;
    }
  }, {
    key: "getEntities",
    value: function getEntities() {
      return JSON.parse(JSON.stringify(Object.keys(this.entityInformationList)));
    }
  }, {
    key: "getAttributesEntity",
    value: function getAttributesEntity(uriEntity) {
      if (uriEntity in this.attributesEntityList) return JSON.parse(JSON.stringify(this.attributesEntityList[uriEntity]));

      return [];
    }
  }, {
    key: "getPositionableEntities",
    value: function getPositionableEntities() {
      var positionaleEntities = {};
      for (var uri_entity in this.entityInformationList) {
        if (this.getAttribEntity(uri_entity, new AskomicsUserAbstraction().longRDF('askomicsns:hasOwnClassVisualisation')) === 'AskomicsPositionableNode') {
          positionaleEntities[uri_entity] = this.entityInformationList[uri_entity];
        }
      }

      return positionaleEntities;
      //return JSON.parse(JSON.stringify(this.entityPositionableInformationList)) ;
    }
  }, {
    key: "getPrefix",
    value: function getPrefix(ns) {
      if (!(ns in this.prefix)) {
        //get info in prefix.cc
        //
        $.ajax({
          async: false,
          type: 'GET',
          url: 'http://prefix.cc/' + ns.trim() + '.file.json',
          success: function success(result_json) {
            console.log("new prefix:" + ns + "==>" + result_json[ns]);
            instanceUserAbstraction.prefix[ns] = result_json[ns];
          },
          error: function error(req, status, ex) {
            instanceUserAbstraction.prefix[ns] = ns;
          },
          timeout: 30
        });
      }
      return this.prefix[ns];
    }
  }, {
    key: "getAttribEntity",
    value: function getAttribEntity(uriEntity, attrib) {
      return this.getGenAttrib(this.entityInformationList, uriEntity, attrib);
    }
  }, {
    key: "getAttribRelation",
    value: function getAttribRelation(uri, attrib) {
      return this.getGenAttrib(this.relationInformationList, uri, attrib);
    }
  }, {
    key: "getAttribAttributes",
    value: function getAttribAttributes(uri, attrib) {
      return this.getGenAttrib(this.attributesInformationList, uri, attrib);
    }

    /* Get value of an attribut with RDF format like rdfs:label */

  }, {
    key: "getGenAttrib",
    value: function getGenAttrib(diction, uriEntity, attrib) {
      var nattrib = attrib;

      if (!(uriEntity in diction)) {
        return "";
      }

      if (!(nattrib in diction[uriEntity])) {
        return "";
      }

      return diction[uriEntity][nattrib];
    }

    /* build node from user abstraction infomation */

  }, {
    key: "buildBaseNode",
    value: function buildBaseNode(uriEntity) {
      var node = {
        uri: uriEntity,
        label: this.getAttribEntity(uriEntity, new AskomicsUserAbstraction().longRDF('rdfs:label'))
      };
      return node;
    }

    /*
    Get
    - relations with UriSelectedNode as a subject or object
    - objects link with Subject UriSelectedNode
    - Subjects link with Subject UriSelectedNode
     */

  }, {
    key: "getRelationsObjectsAndSubjectsWithURI",
    value: function getRelationsObjectsAndSubjectsWithURI(UriSelectedNode, callback1, callback2) {

      if (!(UriSelectedNode in this.relationFrom)) {

        var spq = $.sparql(new TriplestoreParametersView().configuration('endpoint'));
        /* Get relation which UriSelectedNode is the domain (or an ancestor) */
        spq.prefix("rdfs", new AskomicsUserAbstraction().getPrefix("rdfs")).prefix("rdf", new AskomicsUserAbstraction().getPrefix("rdf")).prefix("owl", new AskomicsUserAbstraction().getPrefix("owl")).select(["?relation", "?label", "?entityDomain", "?entityRange", "?property"]).where("?relation", "rdf:type", "?property").values("?property", ["owl:ObjectProperty", "owl:AsymmetricProperty", "owl:InverseFunctionalProperty", "owl:IrreflexiveProperty", "owl:ReflexiveProperty", "owl:SymmetricProperty", "owl:TransitiveProperty"]).where("?relation", "rdfs:domain", "?entityDomain").where("<" + UriSelectedNode + ">", "rdfs:subClassOf*", "?entityDomain").where("?relation", "rdfs:range", "?entityRange").filter("isIRI(?entityDomain)").filter("isIRI(?entityRange)").optional().where("?relation", "rdfs:label", "?label");

        spq.execute(function (results) {
          instanceUserAbstraction.relationFrom[UriSelectedNode] = {};
          for (var elt in results) {
            var value = results[elt];
            if (!(value.entityRange.uri in instanceUserAbstraction.relationFrom[UriSelectedNode])) instanceUserAbstraction.relationFrom[UriSelectedNode][value.entityRange.uri] = [];
            var obj = {};

            obj.uri = value.relation.uri;
            obj.label = value.label;
            obj.domain = value.entityDomain.uri;
            obj.property = value.property.uri;
            instanceUserAbstraction.relationFrom[UriSelectedNode][value.entityRange.uri].push(obj);
          }

          callback1(JSON.parse(JSON.stringify(instanceUserAbstraction.relationFrom[UriSelectedNode])));
        });
      } else {
        callback1(JSON.parse(JSON.stringify(instanceUserAbstraction.relationFrom[UriSelectedNode])));
      }

      if (!(UriSelectedNode in this.relationTo)) {

        var _spq = $.sparql(new TriplestoreParametersView().configuration('endpoint'));
        /* Get relation which UriSelectedNode is the domain (or an ancestor) */
        _spq.prefix("rdfs", new AskomicsUserAbstraction().getPrefix("rdfs")).prefix("rdf", new AskomicsUserAbstraction().getPrefix("rdf")).prefix("owl", new AskomicsUserAbstraction().getPrefix("owl")).select(["?relation", "?label", "?entityDomain", "?entityRange", "?property"]).where("?relation", "rdf:type", "?property").values("?property", ["owl:ObjectProperty", "owl:AsymmetricProperty", "owl:InverseFunctionalProperty", "owl:IrreflexiveProperty", "owl:ReflexiveProperty", "owl:SymmetricProperty", "owl:TransitiveProperty"]).where("?relation", "rdfs:domain", "?entityDomain").where("?relation", "rdfs:range", "?entityRange").where("<" + UriSelectedNode + ">", "rdfs:subClassOf*", "?entityRange").filter("isIRI(?entityDomain)").filter("isIRI(?entityRange)").optional().where("?relation", "rdfs:label", "?label");

        _spq.execute(function (results) {
          instanceUserAbstraction.relationTo[UriSelectedNode] = {};
          for (var elt in results) {
            var value = results[elt];
            if (!(value.entityDomain.uri in instanceUserAbstraction.relationTo[UriSelectedNode])) instanceUserAbstraction.relationTo[UriSelectedNode][value.entityDomain.uri] = [];
            var obj = {};

            obj.uri = value.relation.uri;
            obj.label = value.label;
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

  }, {
    key: "getDatatypePropertyofEntity",
    value: function getDatatypePropertyofEntity(UriSelectedNode, callback) {
      if (!(UriSelectedNode in this.attributesEntityList)) {
        /* Neveler load...we do a spaarql request to update this.attributesEntityList */
        var spq = $.sparql(new TriplestoreParametersView().configuration('endpoint'));

        /* attribute from inherited class */
        spq.prefix("rdfs", new AskomicsUserAbstraction().getPrefix("rdfs")).prefix("rdf", new AskomicsUserAbstraction().getPrefix("rdf")).prefix("owl", new AskomicsUserAbstraction().getPrefix("owl")).select(["?attribute", "?entityDomain", "?entityRange"]).where("?attribute", "rdf:type", "owl:DatatypeProperty").where("?attribute", "rdfs:domain", "?entityDomain").where("<" + UriSelectedNode + ">", "rdfs:subClassOf*", "?entityDomain").where("?attribute", "rdfs:range", "?entityRange").filter("isIRI(?entityDomain)").filter("isIRI(?entityRange)");
        spq.execute(function (results) {

          instanceUserAbstraction.attributesEntityList[UriSelectedNode] = [];
          for (var elt in results) {
            var value = results[elt];

            var attribute = {};
            attribute.uri = value.attribute.uri;
            attribute.label = value.label === undefined ? new AskomicsUserAbstraction().shortRDF(value.attribute.uri) : value.label;
            /*
            The attribut could come from a Generic Class which the current UriSelectedNode inherited
            we save the origin in the 'domain' attribute
             */
            attribute.domain = value.entityDomain.uri;
            attribute.type = value.entityRange.uri;
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
      } else callback(instanceUserAbstraction.attributesEntityList[UriSelectedNode]);
    }

    /* Setting order attribute display */

  }, {
    key: "setOrderAttributesList",
    value: function setOrderAttributesList(URINode, listAtt) {
      this.attributesOrderDisplay[URINode] = listAtt.slice();
    }
  }, {
    key: "getOrderAttributesList",
    value: function getOrderAttributesList(URINode) {
      if (URINode in this.attributesOrderDisplay) {
        return this.attributesOrderDisplay[URINode];
      }
      /* by default */
      var v = [];
      v.push({ 'uri': URINode, 'basic_type': 'string' });
      if (URINode in this.attributesEntityList) {
        v = v.concat(this.attributesEntityList[URINode].slice());
      }
      /*
            for (let i in this.attributesEntityList[URINode] ) {
                v.push(this.attributesEntityList[URINode][i]);
            }*/
      return v;
    }
  }], [{
    key: "getTypeAttribute",
    value: function getTypeAttribute(attributeForUritype) {

      if (attributeForUritype.indexOf(new AskomicsUserAbstraction().getPrefix("xsd")) === -1) {
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
  }]);

  return AskomicsUserAbstraction;
}();
'use strict';

/*jshint esversion: 6 */
/**
 * Register event handlers for integration
 */
$(function () {

    // Generate preview data
    $("#content_integration").on('change', '.toggle_column', function (event) {
        var block = $(event.target).closest('.template-source_file');
        if (block.find('.preview_field').is(':visible')) {
            previewTtl(block);
        }
        checkExistingData(block);
    });

    $("#content_integration").on('change', '.column_type', function (event) {
        var block = $(event.target).closest('.template-source_file');
        if (block.find('.preview_field').is(':visible')) {
            previewTtl(block);
        }
        checkExistingData(block);
    });

    $("#content_integration").on('click', '.preview_button', function (event) {
        var block = $(event.target).closest('.template-source_file');
        if (block.find('.preview_field').is(':visible')) {
            hidePreview(block);
        } else {
            previewTtl(block);
        }
    });

    $("#content_integration").on('click', '.load_data', function (event) {
        loadSourceFile($(event.target).closest('.template-source_file'));
    });
});

/**
 * Transform an array of column content to an array of row content
 */
function cols2rows(items) {
    var out = [];

    for (var i = 0, l = items.length; i < l; i++) {
        for (var j = 0, m = items[i].length; j < m; j++) {
            if (!(j in out)) {
                out[j] = [];
            }
            out[j][i] = items[i][j];
        }
    }

    return out;
}

/**
 * Show preview data on the page
 */
function displayTableTabularFile(data) {
    // Transform columns to rows
    for (var i = 0; i < data.files.length; i++) {
        if ('preview_data' in data.files[i]) {
            data.files[i].preview_data = cols2rows(data.files[i].preview_data);
        }
    }

    // display received data
    var template = $('#template-source_file-preview').html();

    var templateScript = Handlebars.compile(template);
    var html = templateScript(data);

    $("#content_integration").html(html);

    function mapCallback() {
        return $(this).val();
    }

    function getSelectCallback(index, value) {
        selectbox.find("option[value=" + value + "]").hide();
    }

    // Select the correct type for each column
    /*
      data.file[i]
      - name : name file
      - preview_data : first line of file
      - column_types : text, numeric, etc...
    */
    for (var _i = 0, l = data.files.length; _i < l; _i++) {

        if ('column_types' in data.files[_i]) {
            var cols = data.files[_i].column_types;
            for (var j = 0; j < cols.length; j++) {
                var selectbox = $('div#content_integration form.template-source_file:eq(' + _i + ') select.column_type:eq(' + j + ')');
                var values = selectbox.find("option").map(mapCallback);

                if ($.inArray(cols[j], ['start', 'end', 'numeric']) == -1) {
                    $.each(['start', 'end', 'numeric'], getSelectCallback);
                }

                if ($.inArray(cols[j], ['entityGoterm']) == -1) {
                    $.each(['entityGoterm'], getSelectCallback);
                }

                if ($.inArray(cols[j], values) >= 0) {
                    selectbox.val(cols[j]);
                }

                // Check what is in the db
                checkExistingData($('div#content_integration form.template-source_file:eq(' + _i + ')'));
            }
        }
    }
}

/**
 *
 */
function displayTableRDF(data) {
    var info = ""; //$('<div></div>');
    for (var i = 0; i < data.files.length; i++) {
        info += "Insertion of " + data.files[i].filename + ".\n";
    }
    displayModal(info, '', 'Close');
    if (data.error !== undefined) alert(JSON.stringify(data.error));
}

/**
 * Get ttl representation of preview data
 */
function previewTtl(file_elem) {

    var file_name = file_elem.find('.file_name').text();

    // Get column types
    var col_types = file_elem.find('.column_type').map(function () {
        return $(this).val();
    }).get();

    // Find which column is disabled
    var disabled_columns = [];
    file_elem.find('.toggle_column').each(function (index) {
        if (!$(this).is(':checked')) {
            disabled_columns.push(index + 1); // +1 to take into account the first non-disablable column
        }
    });

    var service = new RestServiceJs("preview_ttl");
    var model = { 'file_name': file_name,
        'col_types': col_types,
        'disabled_columns': disabled_columns };

    service.post(model, function (data) {
        file_elem.find(".preview_field").html(data);
        file_elem.find(".preview_field").show();
    });
}

function hidePreview(file_elem) {
    var file_name = file_elem.find('.file_name').text();
    file_elem.find(".preview_field").hide();
}

// Function to find if array contain all values of a list

function containAll(Array1, Array2) {
    for (var i = 0; i < Array2.length; i++) {
        if ($.inArray(Array2[i], Array1) == -1) {
            return false;
        }
    }
    return true;
}

// Function to find if array contain any values of a list

function containAny(Array1, Array2) {
    for (var i = 0; i < Array2.length; i++) {
        if ($.inArray(Array2[i], Array1) != -1) {
            return true;
        }
    }
    return false;
}

/**
 * Compare the user data and what is already in the triple store
 */
function checkExistingData(file_elem) {

    var file_name = file_elem.find('.file_name').text();

    // Get column types
    var col_types = file_elem.find('.column_type').map(function () {
        return $(this).val();
    }).get();

    // check if all positionable attributes are set
    var warning_elem = file_elem.find(".warning-message").first();

    if (containAll(col_types, ['start', 'end'])) {
        //positionable entity with all attributes
        warning_elem.html("").removeClass("show").addClass("hidden");
    } else {
        if (containAny(col_types, ['start', 'end', 'ref', 'taxon'])) {
            //positionable entity with missing attributes
            warning_elem.html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Missing positionable attributes for ' + file_name).removeClass('hidden').addClass("show alert alert-danger");
        } else {
            //not a positionable entity
            warning_elem.html("").removeClass("show").addClass("hidden");
        }
    }

    // Find which column is disabled
    var disabled_columns = [];
    file_elem.find('.toggle_column').each(function (index) {
        if (!$(this).is(':checked')) {
            disabled_columns.push(index + 1); // +1 to take into account the first non-disablable column
        }
    });

    var service = new RestServiceJs("check_existing_data");
    var model = { 'file_name': file_name,
        'col_types': col_types,
        'disabled_columns': disabled_columns };

    service.post(model, function (data) {
        file_elem.find('.column_header').each(function (index) {
            if (data.headers_status[index - 1] == 'present') {
                $(this).find("#relation_present").first().show();
                $(this).find("#relation_new").first().hide();
            } else {
                $(this).find("#relation_present").first().hide();
                $(this).find("#relation_new").first().show();
            }
        });

        var insert_warning_elem = file_elem.find(".insert_warning").first();
        if (data.missing_headers.length > 0) {
            insert_warning_elem.html("<strong>The following columns are missing:</strong> " + data.missing_headers.join(', ')).removeClass("hidden alert-success").removeClass("hidden alert-danger").addClass("show alert-warning");
        }
    });
}

/**
 * Load a source_file into the triplestore
 */
function loadSourceFile(file_elem) {

    var file_name = file_elem.find('.file_name').text();

    // Get column types
    var col_types = file_elem.find('.column_type').map(function () {
        return $(this).val();
    }).get();

    // Find which column is disabled
    var disabled_columns = [];
    file_elem.find('.toggle_column').each(function (index) {
        if (!$(this).is(':checked')) {
            disabled_columns.push(index + 1); // +1 to take into account the first non-disablable column
        }
    });

    displayModal('Please wait', '', 'Close');

    var service = new RestServiceJs("load_data_into_graph");
    var model = { 'file_name': file_name,
        'col_types': col_types,
        'disabled_columns': disabled_columns };

    service.post(model, function (data) {
        hideModal();
        var insert_status_elem = file_elem.find(".insert_status").first();
        var insert_warning_elem = file_elem.find(".insert_warning").first();
        if (data.status != "ok") {
            alert(data.error);
            insert_warning_elem.append('<span class="glyphicon glyphicon glyphicon-exclamation-sign"></span>').html(data.error);

            if ('url' in data) {
                insert_warning_elem.append("<br>You can view the ttl file here: <a href=\"" + data.url + "\">" + data.url + "</a>");
            }
            insert_status_elem.removeClass('hidden alert-success').addClass('show alert-danger');
        } else {
            if ($.inArray('entitySym', col_types) != -1) {
                if (data.expected_lines_number * 2 == data.total_triple_count) {
                    insert_status_elem.html('<strong><span class="glyphicon glyphicon-ok"></span> Success:</strong> inserted ' + data.total_triple_count + " lines of " + data.expected_lines_number * 2).removeClass('hidden alert-danger').removeClass('hidden alert-warning').addClass('show alert-success');
                } else {
                    insert_status_elem.html('<strong><span class="glyphicon glyphicon-exclamation-sign"></span> Warning:</strong> inserted ' + data.total_triple_count * 2 + " lines of " + data.expected_lines_number).removeClass('hidden alert-success').removeClass('hidden alert-warning').addClass('show alert-danger');
                }
            } else {
                if (data.expected_lines_number == data.total_triple_count) {
                    insert_status_elem.html('<strong><span class="glyphicon glyphicon-ok"></span> Success:</strong> inserted ' + data.total_triple_count + " lines of " + data.expected_lines_number).removeClass('hidden alert-danger').removeClass('hidden alert-warning').addClass('show alert-success');
                } else {
                    insert_status_elem.html('<strong><span class="glyphicon glyphicon-exclamation-sign"></span> Warning:</strong> inserted ' + data.total_triple_count + " lines of " + data.expected_lines_number).removeClass('hidden alert-success').removeClass('hidden alert-warning').addClass('show alert-danger');
                }
            }
        }

        // Check what is in the db now
        $('.template-source_file').each(function (index) {
            checkExistingData($(this));
        });
    });

    // when user upload a file, reset the stats and clear the results table
    // (it no longer reflects reality)
    if (!$('#results').is(':empty')) {
        $("#results").empty();
    }
    resetStats();
}
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */

var AskomicsResultsView = function () {
  function AskomicsResultsView(data) {
    _classCallCheck(this, AskomicsResultsView);

    this.data = data;

    this.activesAttributes = undefined; // Attributes id by Node Id to Display
    this.activesAttributesLabel = undefined; // Attributes label by Node Id to Display
    this.activesAttributesUrl = undefined; // Url when results is clickable
  }

  _createClass(AskomicsResultsView, [{
    key: "is_valid",
    value: function is_valid() {
      if (this.data === undefined) throw "AskomicsResultsView :: data prototyperty in unset!";
    }
  }, {
    key: "is_activedAttribute",
    value: function is_activedAttribute() {
      if (this.activesAttributes === undefined) throw "AskomicsResultsView :: activesAttributes is not set.";
    }
  }, {
    key: "setActivesAttributes",
    value: function setActivesAttributes() {

      this.is_valid();

      this.activesAttributes = {};
      this.activesAttributesLabel = {};
      this.activesAttributesUrl = {};
      var graphBuilder = new AskomicsGraphBuilder();

      for (var i = 0; i < graphBuilder.nodes().length; i++) {
        var node = graphBuilder.nodes()[i];
        if (!node.actif) continue;
        var attr_disp = node.getAttributesDisplaying();
        this.activesAttributes[node.id] = attr_disp.id;
        this.activesAttributesLabel[node.id] = attr_disp.label;
        if ('url' in attr_disp) {
          //if results is clickable
          this.activesAttributesUrl[node.id] = attr_disp.url;
        } else {
          this.activesAttributesUrl[node.id] = {};
        }
        if (this.activesAttributes[node.id].length != this.activesAttributesLabel[node.id].length) {
          throw "Devel: Error node.getAttributesDisplaying give array with different size:" + str(this.activesAttributes[node.id].length) + "," + str(this.activesAttributesLabel[node.id].length);
        }
      }
    }
  }, {
    key: "displayResults",
    value: function displayResults() {
      this.is_valid();
      // to clear and print new results
      $("#results").empty();
      //.css("overflow","scroll")
      //.css("height","80px")
      //.css("width","100%")
      //.css("overflow","auto");

      this.setActivesAttributes();

      if (this.data.length <= 0) {
        $("#results").append("No results have been found for this query.");
        return;
      }

      /* new presentation by entity */
      var table = $('<table></table>').addClass('table').addClass('table-bordered').addClass('table-results');

      $("#results")
      //.append($('<table></table>').append(this.build_simple_header_results()))
      .append(table.append(this.build_simple_subheader_results(new AskomicsGraphBuilder().nodes())).append(this.build_body_results(new AskomicsGraphBuilder().nodes())));
      /*
              $("#results")
                .append(table.append(this.build_simple_header_results())
                .append(this.build_simple_subheader_results(new AskomicsGraphBuilder().nodes()))
                .append(this.build_body_results(new AskomicsGraphBuilder().nodes())));
      */

      //https://datatables.net/extensions/buttons/examples/initialisation/export.html
      table.DataTable({
        "paging": true,
        "ordering": true,
        "info": true,
        dom: 'Bfrtip',
        buttons: ['copy', 'csv', 'excel']
      });
    }
  }, {
    key: "build_simple_header_results",
    value: function build_simple_header_results() {
      var head = $('<thead></thead>');
      var row = $('<tr></tr>');

      this.is_valid();
      this.is_activedAttribute();

      /* set Entity Header */
      for (var i = 0; i < new AskomicsGraphBuilder().nodes().length; i++) {
        var node = new AskomicsGraphBuilder().nodes()[i];
        if (!node.actif) continue;

        var nAttributes = this.activesAttributes[node.id].length;
        /* Fomattage en indice du numero de l'entité */
        row.append($('<th></th>').addClass("table-bordered").attr("style", "text-align:center;").attr("colspan", nAttributes).append(node.formatInHtmlLabelEntity()));
      }

      head.append(row);
      return head;
    }
  }, {
    key: "build_header_results",
    value: function build_header_results() {
      var head = $('<thead></thead>');
      var row = $('<tr></tr>');

      this.is_valid();
      this.is_activedAttribute();

      /* set Entity Header */
      for (var i = 0; i < new AskomicsGraphBuilder().nodes().length; i++) {
        var node = new AskomicsGraphBuilder().nodes()[i];
        if (!node.actif) continue;

        var nAttributes = this.activesAttributes[node.id].length;
        /* Fomattage en indice du numero de l'entité */
        row.append($('<th></th>').addClass("table-bordered").addClass("active").addClass("entityHeaderResults").attr("id", node.id).attr("style", "text-align:center;").attr("colspan", nAttributes).append(node.formatInHtmlLabelEntity()));
      }

      var currentView = this;
      row.sortable({ // allow to change order of display
        placeholder: "ui-state-highlight",
        start: function start(event, ui) {
          ui.item.toggleClass("highlight");
          // modify ui.placeholder however you like
          //ui.placeholder.attr("colspan",ui.item.attr("colspan"));
          //ui.placeholder.css("width",0);
        },
        stop: function stop(event, ui) {
          ui.item.toggleClass("highlight");
        },
        update: function update(event, ui) {
          var nodeList = [];
          $(".entityHeaderResults").each(function (index) {
            nodeList.push($(this).attr("id"));
          });
          var lNodes = new AskomicsGraphBuilder().nodes(nodeList, 'id');
          $(this).parent().parent().find("thead:eq(1)").remove();
          $(this).parent().parent().find("tbody").remove();

          $(this).parent().parent().append(currentView.build_subheader_results(lNodes));
          $(this).parent().parent().append(currentView.build_body_results(lNodes));
        }
      }).disableSelection();

      head.append(row);
      return head;
    }
  }, {
    key: "build_simple_subheader_results",
    value: function build_simple_subheader_results(nodeList) {

      this.is_valid();
      this.is_activedAttribute();

      var head = $('<thead></thead>');
      var row = $('<tr></tr>');
      for (var i = 0; i < nodeList.length; i++) {
        var node = nodeList[i];
        if (!node.actif) continue;
        for (var sparqlid in this.activesAttributes[node.id]) {
          console.log(sparqlid + "=" + this.activesAttributesLabel[node.id][sparqlid]);
          row.append($('<th></th>').addClass("success").addClass("table-bordered").html(this.activesAttributesLabel[node.id][sparqlid] + node.getLabelIndex()));
        }
      }
      head.append(row);
      return head;
    }
  }, {
    key: "build_subheader_results",
    value: function build_subheader_results(nodeList) {

      this.is_valid();
      this.is_activedAttribute();

      var head = $('<thead></thead>');
      var row = $('<tr></tr>');
      for (var i = 0; i < nodeList.length; i++) {
        var node = nodeList[i];
        if (!node.actif) continue;
        for (var sparqlid in this.activesAttributes[node.id]) {
          row.append($('<th></th>').addClass("success").addClass("attributesHeaderResults").attr("sparqlid", this.activesAttributes[node.id][sparqlid]).attr("nodeid", node.id).addClass("table-bordered").text(this.activesAttributesLabel[node.id][sparqlid]));
        }
      }
      var currentView = this;
      row.sortable({ // allow to change order of display
        placeholder: "ui-state-highlight",
        items: ":not(.ui-state-disabled)",
        cancel: '.ui-state-disabled',
        start: function start(event, ui) {
          $(".attributesHeaderResults").css({ width: $(ui.item).width() });
          // unactive cells associated with other node
          var currentCell = $(".attributesHeaderResults:eq(" + ui.item.index() + ")");
          var nodeid = currentCell.attr("nodeid");
          // unselcted other element
          //$('.attributesHeaderResults').not(":eq("+ui.item.index()+")").addClass('ui-state-disabled');
          //unallow to place the cell in an other node id
          $('.attributesHeaderResults[nodeid!=' + nodeid + ']').addClass('ui-state-disabled');
        },
        stop: function stop(event, ui) {
          $('.attributesHeaderResults').removeClass('ui-state-disabled');
        },
        update: function update(event, ui) {

          var nodeList = [];
          $(".entityHeaderResults").each(function (index) {
            nodeList.push($(this).attr("id"));
          });
          var lNodes = new AskomicsGraphBuilder().nodes(nodeList, 'id');

          var attList = [];
          $(".attributesHeaderResults").each(function (index) {
            var obj = {};
            obj.sparqlid = $(this).attr("sparqlid");
            obj.nodeid = $(this).attr("nodeid");
            attList.push(obj);
          });
          /*
             rebuild activesAttributesLabel activesAttributes
          */

          currentView.activesAttributes = {};
          for (var ielt in attList) {
            var elt = attList[ielt];
            if (!(elt.nodeid in currentView.activesAttributes)) currentView.activesAttributes[elt.nodeid] = [];
            currentView.activesAttributes[elt.nodeid].push(elt.sparqlid);
          }

          $(this).parent().parent().parent().find("tbody").remove();
          $(this).parent().parent().append(currentView.build_body_results(lNodes));
        }
      }).disableSelection();

      head.append(row);
      return head;
    }
  }, {
    key: "build_body_results",
    value: function build_body_results(nodeList) {

      this.is_valid();
      this.is_activedAttribute();

      var body = $('<tbody></tbody');
      for (var i = 0; i < this.data.length; i++) {
        var row = $('<tr></tr>');
        for (var j = 0; j < nodeList.length; j++) {
          var node = nodeList[j];
          if (!node.actif) continue;
          for (var sparqlId in this.activesAttributes[node.id]) {
            var headerName = this.activesAttributes[node.id][sparqlId];
            var val = "";
            if (this.data[i][this.activesAttributes[node.id][sparqlId]].value !== undefined) val = this.data[i][this.activesAttributes[node.id][sparqlId]].value;

            //if ( headerName in this.activesAttributesUrl[node.id] ) {
            if (this.data[i][this.activesAttributes[node.id][sparqlId]].type === 'uri') {
              var valWithPrefix = new AskomicsUserAbstraction().shortRDF(val);
              //let url = this.activesAttributesUrl[node.id][headerName].replace("%s",this.data[i][this.activesAttributes[node.id][sparqlId]]);
              row.append($('<td></td>').html($('<a></a>').attr('href', val).attr('target', '_blank').text(valWithPrefix)));
            } else {
              row.append($('<td></td>').text(val));
            }
          }
        }
        body.append(row);
      }
      return body;
    }
    /*
      getValueWithPrefix(val) {
        let prefix = new AskomicsUserAbstraction().prefix ;
        for ( let p in prefix ) {
          if ( val.search(prefix[p]) != -1 ) {
            return val.replace(prefix[p],p+":");
          }
        }
        return val;
      }
    */

  }]);

  return AskomicsResultsView;
}();
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*jshint esversion: 6 */

function prepareQuery(exp, roq) {
  //     Get JSON to ask for a SPARQL query corresponding to the graph
  //     and launch it according to given parameters.
  //
  //     :exp: false = results overview
  //           true = complete results file generation
  //     :lim: LIMIT value in the SPARQL query
  //     :roq: bool, if true, don't launch the query, only return it

  var tab = new AskomicsGraphBuilder().buildConstraintsGraph();

  var variates = tab[0];
  var constraintesRelations = tab[1];

  var reqPrefix = "";

  var req = "";
  req += "SELECT DISTINCT " + variates.join(" ") + "\n";
  req += "WHERE \n";
  var reqWhere = buildRecursiveBlock('', constraintesRelations);
  var re = /(\w+):\w+/gi;
  var resTab = void 0;
  var lPref = {};
  while ((resTab = re.exec(reqWhere)) !== null) {
    console.log(resTab);
    if (!(resTab[1] in lPref)) {
      lPref[resTab[1]] = "";
      reqPrefix += "PREFIX " + resTab[1] + ":<" + new AskomicsUserAbstraction().getPrefix(resTab[1]) + ">\n";
    }
  }
  req = reqPrefix + req;
  req += reqWhere;
  return req;
  /*
  return {
            'export'               : exp,
            'variates'             : tab[0],
            'constraintesRelations': tab[1],
            'constraintesFilters'  : tab[2],
            'limit'                : parseInt(new TriplestoreParametersView().config.max_results_size)
         };
  */
}

/*
  # build SPARQL Block following this grammar :
      # B ==> [ A , KEYWORKD ] . KEYWORKD is a string prefix for BLOCK (ex: OPTIONAL, SERVICE)
      # A ==> [ ((B|F),)+ ] . a list of Block or constraints leafs
      # F ==> [ CONSTRAINT1, CONSTRAINT2,.... ] an array contains only constraints
  */
function buildRecursiveBlock(tabul, constraints) {
  if (constraints.length == 2 && _typeof(constraints[0]) === 'object' && typeof constraints[1] === 'string') {
    return tabul + constraints[1] + "{\n" + buildRecursiveBlock(tabul + '\t', constraints[0]) + tabul + "}\n";
  }
  var req = '';
  for (var elt in constraints) {
    if (typeof constraints[elt] === 'string') {
      req += tabul + constraints[elt] + ".\n";
    } else if (_typeof(constraints[elt]) === 'object' && constraints[elt].length == 2 && _typeof(constraints[elt][0]) === 'object' && typeof constraints[elt][1] === 'string') {
      if (constraints[elt][1] !== '') {
        req += tabul + constraints[elt][1] + " {\n" + buildRecursiveBlock(tabul + '\t', constraints[elt][0]) + tabul + "}\n";
      } else {
        req += buildRecursiveBlock(tabul, constraints[elt][0]);
      }
    } else {
      throw "buildRecursiveBlock:: constraint malformed :" + JSON.stringify(elt);
    }
  } // end for
  return req;
}

function viewQueryResults() {
  $("#btn-down").prop("disabled", false);
  displayModal('Please wait', '', 'Close');

  var time = $.now();
  //let service = new RestServiceJs("sparqlquery");
  var queryString = prepareQuery(false, false);

  var conf = {};
  conf.endpoint = new TriplestoreParametersView().configuration('endpoint');
  $.sparqlrequest(conf, queryString, function (data) {
    hideModal();
    var new_time = $.now();
    var exec_time = new_time - time;
    console.log('===> query executed in ' + exec_time + ' ms');
    var results = data.results.bindings;
    new AskomicsResultsView(results).displayResults();
  });
}
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */

/*
  Manage Menu View to select and unselect proposition of element/link
*/
var AskomicsMenuFile = function () {
  function AskomicsMenuFile() {
    _classCallCheck(this, AskomicsMenuFile);
  }

  _createClass(AskomicsMenuFile, [{
    key: "start",
    value: function start() {
      var mythis = this;
      //$("#uploadedQuery")
      $("#dwl-query").on('click', function (d) {
        var date = new Date().getTime();
        $(this).attr("href", "data:application/octet-stream," + encodeURIComponent(new AskomicsGraphBuilder().getInternalState())).attr("download", "query-" + date + ".json");
      });

      $("#dwl-query-sparql").on('click', function (d) {
        var query = prepareQuery(false, 0, false);
        var date = new Date().getTime();
        $(this).attr("href", "data:application/sparql-query," + encodeURIComponent(query)).attr("download", "query-" + date + ".rq");
      });
    }
  }, {
    key: "unbindDownloadButtons",
    value: function unbindDownloadButtons() {
      $('#dwl-query').unbind();
      $('#dwl-query-sparql').unbind();
    }
  }]);

  return AskomicsMenuFile;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */

/*
  Manage Menu View to select and unselect proposition of element/link
*/
var AskomicsMenuView = function () {
  function AskomicsMenuView(_forceLayoutManager) {
    _classCallCheck(this, AskomicsMenuView);

    this.forceLayoutManager = _forceLayoutManager;
  }

  _createClass(AskomicsMenuView, [{
    key: "buildLiView",
    value: function buildLiView(uri, label, submenu) {

      var icheck = $("<span/>").attr("class", "glyphicon glyphicon-check");

      var a = $("<a></a>").attr("href", "#").attr("class", "small").attr("data-value", "option1").attr("tabIndex", "-1");
      if (submenu) {
        a.html($("<i></i>").append(label + "\t")).append(icheck);
      } else {
        a.html($("<b></b>").append(label + "\t")).append(icheck);
      }
      var li = $("<li></li>");
      li.attr("uri", uri);
      li.css("display", "table-cell");
      li.css("vertical-align", "middle");
      li.append(a);
      return li;
    }
  }, {
    key: "reset",
    value: function reset() {
      // Remove onclick
      $("#buttonViewListNodesAndLinks").unbind();
      $("#viewListNodesAndLinks").empty();
    }

    /* initialize the view. The abstraction have to be done */

  }, {
    key: "start",
    value: function start(node) {
      var menuView = this;

      /* to close the menu when a click event outside */
      $(window).click(function () {
        $("#viewListNodesAndLinks").slideUp();
      });

      $("#buttonViewListNodesAndLinks").on('mousedown', function (event) {
        if ($("#viewListNodesAndLinks").is(':visible')) {
          $("#viewListNodesAndLinks").slideUp();
        } else {
          $("#viewListNodesAndLinks").slideDown();
        }
      });

      $("#viewListNodesAndLinks").css("display", "table-row")
      /* let the menu open when something is clicked inside !! */
      .on('click', function (event) {
        event.stopPropagation();
      });

      // <li><a href="#" class="small" data-value="option1" tabIndex="-1"><input type="checkbox"/>&nbsp;Option 1</a></li>
      var lentities = new AskomicsUserAbstraction().getEntities();

      $.each(lentities, function (i) {
        var node = new GraphObject({ 'uri': lentities[i] });
        var nodeuri = node.uri;
        var li = menuView.buildLiView(nodeuri, node.removePrefix(), false);

        li.on('click', function () {
          var span = $(this).find(".glyphicon");
          var cur_uri = $(this).attr("uri");
          if (span.css("visibility") == "visible") {
            span.css("visibility", "hidden");
            menuView.forceLayoutManager.offProposedUri("node", cur_uri);
            // disable all predicate associated with this node
            $(this).parent().parent().find("li[nodeuri='" + cur_uri + "']").attr("class", "disabled");
          } else {
            span.css("visibility", "visible");
            menuView.forceLayoutManager.onProposedUri("node", cur_uri);
            // enable all predicate associated with this node
            $(this).parent().parent().find("li[nodeuri='" + cur_uri + "']").removeAttr("class");
          }
          // remove old suggestion
          menuView.forceLayoutManager.removeSuggestions();
          // insert new suggestion
          menuView.forceLayoutManager.insertSuggestions();
          // regenerate the graph
          menuView.forceLayoutManager.update();
        });
        $("#viewListNodesAndLinks").append(li);
        /* --------------------------- */
        /* Adding filter on relations  */
        /* --------------------------- */

        var tab = new AskomicsUserAbstraction().getRelationsObjectsAndSubjectsWithURI(nodeuri);
        var listRelObj = tab[0];

        $.each(listRelObj, function (objecturi) {
          var object = new GraphObject({ uri: objecturi });
          $.each(listRelObj[objecturi], function (idxrel) {
            var rel = listRelObj[objecturi][idxrel];
            var linkRel = new GraphObject({ uri: rel });
            var li = menuView.buildLiView(rel, linkRel.removePrefix() + "&#8594;" + object.removePrefix(), true);
            li.attr("nodeuri", nodeuri).on('click', function () {
              /* when this li is unavailable, we can do nothing */
              if ($(this).attr("class") === "disabled") return;

              var span = $(this).find(".glyphicon");
              var cur_uri = $(this).attr("uri");
              if (span.css("visibility") == "visible") {
                span.css("visibility", "hidden");
                menuView.forceLayoutManager.offProposedUri("link", cur_uri);
              } else {
                span.css("visibility", "visible");
                menuView.forceLayoutManager.onProposedUri("link", cur_uri);
              }
              /* remove old suggestion */
              menuView.forceLayoutManager.removeSuggestions();
              /* insert new suggestion */
              menuView.forceLayoutManager.insertSuggestions();
              /* regenerate the graph */
              menuView.forceLayoutManager.update();
            });
            $("#viewListNodesAndLinks").append(li);
          });
        });
        $("#viewListNodesAndLinks").append($("<li></li>").attr("class", "divider"));
        /* next entity */
      });

      var positionableEntities = new AskomicsUserAbstraction().getPositionableEntities();
      if (Object.keys(positionableEntities).length > 0) {
        /* positionable object */
        var posuri = "positionable";
        var li = menuView.buildLiView(posuri, posuri, false);
        li.attr("nodeuri", posuri).on('click', function () {
          var span = $(this).find(".glyphicon");
          var cur_uri = $(this).attr("uri");
          if (span.css("visibility") == "visible") {
            span.css("visibility", "hidden");
            menuView.forceLayoutManager.offProposedUri("link", cur_uri);
          } else {
            span.css("visibility", "visible");
            menuView.forceLayoutManager.onProposedUri("link", cur_uri);
          }
          /* remove old suggestion */
          menuView.forceLayoutManager.removeSuggestions();
          /* insert new suggestion */
          menuView.forceLayoutManager.insertSuggestions();
          /* regenerate the graph */
          menuView.forceLayoutManager.update();
        });
        $("#viewListNodesAndLinks").append(li);
        //$("#viewListNodesAndLinks").append($("<li></li>").attr("class","divider"));
      }

      //hide by default
      $("#viewListNodesAndLinks").hide();
    }
  }]);

  return AskomicsMenuView;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */

var GraphObject = function () {
  function GraphObject(obj) {
    _classCallCheck(this, GraphObject);

    if (!obj || !('uri' in obj)) {
      /*  if ( obj && ('_uri' in obj) ) {
          // load json object
          this.setjson(obj);
        } else*/
      throw "GraphObject : Constructor need an 'uri' node:" + JSON.stringify(obj);
    }

    this._id = -1;
    this._SPARQLid = "";
    this._suggested = true;
    this._uri = obj.uri;

    if (obj.label) {
      this._label = obj.label;
    } else {
      this._label = this.removePrefix();
    }
  }

  _createClass(GraphObject, [{
    key: "setjson",
    value: function setjson(obj) {
      this.id = obj._id;
      this.SPARQLid = obj._SPARQLid;
      this.suggested = obj._suggested;
      this.uri = obj._uri;
      this.label = obj._label;
    }
  }, {
    key: "URI",
    value: function URI(uristring) {
      var uribase = this.uri;

      if (uristring) uribase = uristring;

      if (typeof uribase !== "string") {
        throw "removePrefix: uri is not a string :" + JSON.stringify(uribase);
      }

      return '<' + uribase + ">";
    }

    /* Get value of an attribut with RDF format like rdfs:label */

  }, {
    key: "removePrefix",
    value: function removePrefix() {

      if (typeof this.uri !== 'string') {
        console.warn(JSON.stringify(this));
        throw "removePrefix: uri is not a string :" + JSON.stringify(this.uri);
      }
      var idx = this.uri.indexOf("#");
      if (idx == -1) {
        idx = this.uri.indexOf(":");
        if (idx == -1) return this.uri;
      }
      var res = this.uri.substr(idx + 1, this.uri.length);
      return res;
    }
  }, {
    key: "formatInHtmlLabelEntity",
    value: function formatInHtmlLabelEntity() {
      var re = new RegExp(/(\d+)$/);
      var indiceEntity = this.SPARQLid.match(re);
      if (indiceEntity === null || indiceEntity.length <= 0) indiceEntity = [""];
      var labelEntity = this.SPARQLid.replace(re, "");
      //return $('<em></em>').text(labelEntity).append($('<sub></sub>').text(indiceEntity[0]));
      return "<em>" + labelEntity + "<sub>" + indiceEntity[0] + "</sub>" + "</em>";
    }
  }, {
    key: "getSvgLabelId",
    value: function getSvgLabelId() {
      return GraphObject.getSvgLabelPrefix() + this.id;
    }

    /*
      return the index name of the node to set up and update the graph
    */

  }, {
    key: "getLabelIndex",
    value: function getLabelIndex() {
      if (this.SPARQLid === "") return "";

      var re = new RegExp(/(\d+)$/);
      var indiceEntity = this.SPARQLid.match(re);

      if (indiceEntity && indiceEntity.length > 0) return indiceEntity[0];else return "";
    }
  }, {
    key: "getLabelIndexHtml",
    value: function getLabelIndexHtml() {
      var v = '<tspan font-size="7" baseline-shift="sub">' + this.getLabelIndex() + "</tspan>";
      v += '<tspan constraint_node_id=' + this.id + ' font-size="8" dy="10" x="14"></tspan>';
      return v;
    }
  }, {
    key: "getOpacity",
    value: function getOpacity() {
      return this.suggested ? "0.5" : "1";
    }
  }, {
    key: "getTextOpacity",
    value: function getTextOpacity() {
      return this.suggested ? "0.3" : "1";
    }
  }, {
    key: "toString",
    value: function toString() {
      var s = _get(GraphObject.prototype.__proto__ || Object.getPrototypeOf(GraphObject.prototype), "toString", this).call(this);
      return "< id:" + this.id + " ," + "uri:" + this.uri + " ," + "label:" + this.label + " ," + "SPARQLid:" + this.SPARQLid + " ," + "suggested:" + this.suggested + " >";
    }
  }, {
    key: "id",
    set: function set(__id) {
      this._id = __id;
    },
    get: function get() {
      return this._id;
    }
  }, {
    key: "SPARQLid",
    set: function set(__spq) {
      this._SPARQLid = __spq;
    },
    get: function get() {
      return this._SPARQLid;
    }
  }, {
    key: "suggested",
    set: function set(__sug) {
      this._suggested = __sug;
    },
    get: function get() {
      return this._suggested;
    }
  }, {
    key: "uri",
    set: function set(__uri) {
      this._uri = __uri;
    },
    get: function get() {
      return this._uri;
    }
  }, {
    key: "label",
    set: function set(__label) {
      this._label = __label;
    },
    get: function get() {
      return this._label;
    }
  }], [{
    key: "getSvgLabelPrefix",
    value: function getSvgLabelPrefix() {
      return "label-svg-";
    }
  }]);

  return GraphObject;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*jshint esversion: 6 */

var colorPalette = ["yellowgreen", "teal", "paleturquoise", "peru", "tomato", "steelblue", "lightskyblue", "lightcoral"];

var idxColorPalette = 0;
var colorUriList = {};

var GraphNode = function (_GraphObject) {
  _inherits(GraphNode, _GraphObject);

  function GraphNode(node, x, y) {
    var _ret;

    _classCallCheck(this, GraphNode);

    var _this = _possibleConstructorReturn(this, (GraphNode.__proto__ || Object.getPrototypeOf(GraphNode)).call(this, node));

    _this.init();
    /* if this future node have the same coordinate with the previous node, the graph move too much ! */
    var sc = 30;
    var scaleX = Math.random() < 0.5 ? -1 : 1;
    var scaleY = Math.random() < 0.5 ? -1 : 1;
    _this.x = x + scaleX * sc;
    _this.y = y + scaleY * sc;

    return _ret = _this, _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GraphNode, [{
    key: "getType",
    value: function getType() {
      return "node";
    }
  }, {
    key: "init",
    value: function init() {
      this.actif = false;
      this.weight = 0;
      this.x = 0;
      this.y = 0;
      this.nlink = {}; // number of relation with a node.
    }
  }, {
    key: "setjson",
    value: function setjson(obj) {
      _get(GraphNode.prototype.__proto__ || Object.getPrototypeOf(GraphNode.prototype), "setjson", this).call(this, obj);

      this._actif = obj._actif;
      this._x = obj._x;
      this._y = obj._y;
      this._weight = obj._weight;
      this._nlink = $.extend(true, {}, obj._nlink);
    }
  }, {
    key: "switchActiveNode",
    value: function switchActiveNode() {
      this.actif = !this.actif;
    }

    /* Build attribute with id, sparId inside a node from a generic uri attribute */

  }, {
    key: "setAttributeOrCategoryForNode",
    value: function setAttributeOrCategoryForNode(AttOrCatArray, attributeForUri) {
      AttOrCatArray[attributeForUri.uri] = {};

      for (var elt in attributeForUri) {
        AttOrCatArray[attributeForUri.uri][elt] = attributeForUri[elt];
      }

      new AskomicsGraphBuilder().setSPARQLVariateId(AttOrCatArray[attributeForUri.uri]);
      AttOrCatArray[attributeForUri.uri].id = new AskomicsGraphBuilder().getId();

      /* by default all attributes is ask */
      AttOrCatArray[attributeForUri.uri].actif = false;

      return AttOrCatArray[attributeForUri.uri];
    }
  }, {
    key: "buildAttributeOrCategoryForNode",
    value: function buildAttributeOrCategoryForNode(attributeForUri) {

      if (attributeForUri.basic_type === "category") {
        return this.setAttributeOrCategoryForNode(this.categories, attributeForUri);
      } else {
        return this.setAttributeOrCategoryForNode(this.attributes, attributeForUri);
      }
    }
  }, {
    key: "getAttributeOrCategoryForNode",
    value: function getAttributeOrCategoryForNode(attributeForUri) {
      if (attributeForUri.basic_type === "category") {
        if (attributeForUri.uri in this.categories) {
          return this.categories[attributeForUri.uri];
        }
        return this.buildAttributeOrCategoryForNode(attributeForUri);
      } else {
        if (attributeForUri.uri in this.attributes) {
          return this.attributes[attributeForUri.uri];
        }
        return this.buildAttributeOrCategoryForNode(attributeForUri);
      }
    }
  }, {
    key: "getNodeStrokeColor",
    value: function getNodeStrokeColor() {
      return 'grey';
    }
  }, {
    key: "getColorInstanciatedNode",
    value: function getColorInstanciatedNode() {

      if (this.uri in colorUriList) {
        return colorUriList[this.uri];
      }

      colorUriList[this.uri] = colorPalette[idxColorPalette++];
      if (idxColorPalette >= colorPalette.length) idxColorPalette = 0;
      return colorUriList[this.uri];
    }
  }, {
    key: "toString",
    value: function toString() {
      var s = _get(GraphNode.prototype.__proto__ || Object.getPrototypeOf(GraphNode.prototype), "toString", this).call(this);
      return " GraphNode (" + s + ")";
    }
  }, {
    key: "actif",
    set: function set(__actif) {
      this._actif = __actif;
    },
    get: function get() {
      return this._actif;
    }
  }, {
    key: "weight",
    set: function set(__weight) {
      this._weight = __weight;
    },
    get: function get() {
      return this._weight;
    }
  }, {
    key: "x",
    set: function set(__x) {
      this._x = __x;
    },
    get: function get() {
      return this._x;
    }
  }, {
    key: "y",
    set: function set(__y) {
      this._y = __y;
    },
    get: function get() {
      return this._y;
    }
  }, {
    key: "nlink",
    set: function set(nlink) {
      this._nlink = nlink;
    },
    get: function get() {
      return this._nlink;
    }
  }]);

  return GraphNode;
}(GraphObject);
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*jshint esversion: 6 */

var AskomicsNode = function (_GraphNode) {
  _inherits(AskomicsNode, _GraphNode);

  function AskomicsNode(node, x, y, service) {
    var _ret;

    _classCallCheck(this, AskomicsNode);

    var _this = _possibleConstructorReturn(this, (AskomicsNode.__proto__ || Object.getPrototypeOf(AskomicsNode)).call(this, node, x, y));

    _this._attributes = {};
    _this._categories = {};
    _this._filters = {}; /* filters of attributes key:sparqlid*/
    _this._values = {}; /* values of attributes key:sparqlid*/
    _this._isregexp = {}; /* boolean if exact or regexp match */
    _this._inverseMatch = {}; /* boolean if negation filter is actived */
    _this._linkvar = {}; /* link variable are listed */

    if (service !== undefined) {
      _this._service = service;
    } else {
      _this._service = "";
    }

    return _ret = _this, _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AskomicsNode, [{
    key: "getAttributesWithConstraints",
    value: function getAttributesWithConstraints() {
      var attribs = [];
      var regexp = [];
      var invmat = [];
      var linkv = [];

      for (var uri in this.attributes) {

        var inFilters = this.attributes[uri].SPARQLid in this.filters;
        var inValues = this.attributes[uri].SPARQLid in this.values;
        if (inFilters || inValues) {
          attribs.push(this.attributes[uri].label);
        }
      }

      for (var _uri in this.categories) {

        var SPARQLIDv = 'URICat' + this.categories[_uri].SPARQLid;
        var _inFilters = SPARQLIDv in this.filters;
        var _inValues = SPARQLIDv in this.values;

        if (_inFilters || _inValues) {
          attribs.push(this.categories[_uri].label);
        }
      }

      return attribs;
    }
  }, {
    key: "getAttributesWithConstraintsString",
    value: function getAttributesWithConstraintsString() {
      var constraints = this.getAttributesWithConstraints();
      var v = "";
      var iConstr = 0;

      if (constraints.length >= 1) {
        v = "#" + constraints[iConstr++];
      }
      for (iConstr; iConstr < constraints.length; iConstr++) {
        v += ",#" + constraints[iConstr];
      }
      return v;
    }
  }, {
    key: "setjson",
    value: function setjson(obj) {
      _get(AskomicsNode.prototype.__proto__ || Object.getPrototypeOf(AskomicsNode.prototype), "setjson", this).call(this, obj);

      this._attributes = $.extend(true, {}, obj._attributes);
      this._categories = $.extend(true, {}, obj._categories);
      this._filters = $.extend(true, {}, obj._filters); /* filters of attributes key:sparqlid*/
      this._values = $.extend(true, {}, obj._values);
      this._isregexp = $.extend(true, {}, obj._isregexp);
      this._inverseMatch = $.extend(true, {}, obj._inverseMatch);
      this._linkvar = $.extend(true, {}, obj._linkvar);
    }
  }, {
    key: "getPanelView",
    value: function getPanelView() {
      if (this.panelview === undefined) this.panelview = new AskomicsNodeView(this);

      return this.panelview;
    }
  }, {
    key: "buildConstraintsSPARQL",
    value: function buildConstraintsSPARQL() {
      var blockConstraintByNode = [];

      /* add node inside */
      blockConstraintByNode.push("?" + this.SPARQLid + " " + 'rdf:type' + " " + "?" + this.SPARQLid + "_SubClassOf");
      blockConstraintByNode.push("?" + this.SPARQLid + "_SubClassOf" + " " + 'rdfs:subClassOf*' + " " + this.URI());

      for (var uri in this.attributes) {
        var SparqlId = this.attributes[uri].SPARQLid;
        var isFiltered = SparqlId in this.filters;
        var isLinked = SparqlId in this.linkvar;
        var isInversedMatch = SparqlId in this.inverseMatch;

        if (isLinked || isFiltered || isInversedMatch || this.attributes[uri].actif) {
          var subBlockConstraint = [];
          subBlockConstraint.push("?" + this.SPARQLid + " " + this.URI(uri) + " " + "?" + SparqlId);
          subBlockConstraint.push("FILTER isLiteral(?" + SparqlId + ")");
          //  subBlockConstraint.push("?"+SparqlId+" "+'a'+" "+this.URI(this.attributes[uri].type));
          /* check filter if exist */

          var subBlockNegativeConstraint = [];
          if (isInversedMatch && (this.inverseMatch[SparqlId] === 'inverseWithExistingRelation' || this.inverseMatch[SparqlId] === 'inverseWithNoRelation')) {
            subBlockNegativeConstraint.push("?" + this.SPARQLid + " " + this.URI(uri) + " " + "?negative" + SparqlId);
            subBlockNegativeConstraint.push("FILTER isLiteral(?negative" + SparqlId + ")");
          }
          /* If Inverse Match we have to build a block */
          if (isFiltered) {
            if (isInversedMatch && (this.inverseMatch[SparqlId] === 'inverseWithExistingRelation' || this.inverseMatch[SparqlId] === 'inverseWithNoRelation')) {
              var newfilt = this.filters[SparqlId].replace(SparqlId, "negative" + SparqlId);
              subBlockNegativeConstraint.push(newfilt);
            } else {
              subBlockConstraint.push(this.filters[SparqlId]);
            }
          }

          if (isInversedMatch && (this.inverseMatch[SparqlId] === 'inverseWithExistingRelation' || this.inverseMatch[SparqlId] === 'inverseWithNoRelation')) {
            if (this._inverseMatch[SparqlId] === 'inverseWithNoRelation') {
              blockConstraintByNode.push([subBlockConstraint, 'OPTIONAL']);
            } else {
              blockConstraintByNode.push([subBlockConstraint, '']);
            }
            blockConstraintByNode.push([subBlockNegativeConstraint, 'FILTER NOT EXISTS']);
          } else {
            if (this.attributes[uri].optional) {
              blockConstraintByNode.push([subBlockConstraint, 'OPTIONAL']);
            } else {
              blockConstraintByNode.push([subBlockConstraint, '']);
            }
          }
        }
      }
      for (var _uri2 in this.categories) {
        var _SparqlId = "URICat" + this.categories[_uri2].SPARQLid;
        var _isFiltered = _SparqlId in this.filters;
        var _isLinked = _SparqlId in this.linkvar;
        var _isInversedMatch = _SparqlId in this.inverseMatch;

        if (_isInversedMatch || _isLinked || _isFiltered || this.categories[_uri2].actif) {
          var _subBlockConstraint = [];
          _subBlockConstraint.push("?" + this.SPARQLid + " " + this.URI(_uri2) + " " + "?" + _SparqlId);
          _subBlockConstraint.push("[] askomicsns:category ?" + _SparqlId);
          _subBlockConstraint.push("?" + _SparqlId + " " + 'rdfs:label' + " " + "?" + this.categories[_uri2].SPARQLid);

          var _subBlockNegativeConstraint = [];
          if (_isInversedMatch && (this.inverseMatch[_SparqlId] === 'inverseWithExistingRelation' || this.inverseMatch[_SparqlId] === 'inverseWithNoRelation')) {
            _subBlockNegativeConstraint.push("?" + this.SPARQLid + " " + this.URI(_uri2) + " " + "?negative" + _SparqlId);
            _subBlockNegativeConstraint.push("[] askomicsns:category " + "?negative" + _SparqlId);
            _subBlockNegativeConstraint.push("?negative" + _SparqlId + " " + 'rdfs:label' + " " + "?negative" + this.categories[_uri2].SPARQLid);
          }
          /* If Inverse Match we have to build a block */
          if (_isFiltered) {
            if (_isInversedMatch && (this.inverseMatch[_SparqlId] === 'inverseWithExistingRelation' || this.inverseMatch[_SparqlId] === 'inverseWithNoRelation')) {
              var _newfilt = this.filters[_SparqlId].replace(_SparqlId, "negative" + _SparqlId);
              _subBlockNegativeConstraint.push(_newfilt);
            } else {
              _subBlockConstraint.push(this.filters[_SparqlId]);
            }
          }

          if (_isInversedMatch && (this.inverseMatch[_SparqlId] === 'inverseWithExistingRelation' || this.inverseMatch[_SparqlId] === 'inverseWithNoRelation')) {
            if (this._inverseMatch[_SparqlId] === 'inverseWithNoRelation') {
              blockConstraintByNode.push([_subBlockConstraint, 'OPTIONAL']);
            } else {
              blockConstraintByNode.push([_subBlockConstraint, '']);
            }
            blockConstraintByNode.push([_subBlockNegativeConstraint, 'FILTER NOT EXISTS']);
          } else {
            if (this.categories[_uri2].optional) {
              blockConstraintByNode.push([_subBlockConstraint, 'OPTIONAL']);
            } else {
              blockConstraintByNode.push([_subBlockConstraint, '']);
            }
          }
        }
      }

      // add the filters on entity name at end
      if (this.SPARQLid in this.filters) {
        /* If Inverse Match we have to build a block */

        if (this.inverseMatch[this.SPARQLid] === 'inverseWithExistingRelation') {
          var _subBlockConstraint2 = [];
          _subBlockConstraint2.push("?" + this.SPARQLid + " " + 'rdfs:label' + " " + "?negative" + this.SPARQLid);
          var _newfilt2 = this.filters[this.SPARQLid].replace(this.SPARQLid, "negative" + this.SPARQLid);
          _subBlockConstraint2.push(_newfilt2);
          _subBlockConstraint2 = [_subBlockConstraint2, 'FILTER NOT EXISTS'];
          blockConstraintByNode.push([_subBlockConstraint2, '']);
        } else {
          blockConstraintByNode.push(this.filters[this.SPARQLid]);
        }
      }
      var service = this.service;
      if (service !== '') {
        service = 'SERVICE <' + service + '>';
      }

      return [blockConstraintByNode, service];
    }
  }, {
    key: "instanciateVariateSPARQL",
    value: function instanciateVariateSPARQL(variates) {
      /* adding variable node name if asked by the user */
      if (this.actif) {
        variates.push("?" + this.SPARQLid);
      } else {
        return; /* Attribute are not instanciate too */
      }
      for (var uri in this.attributes) {
        var SparqlId = this.attributes[uri].SPARQLid;
        if (this.attributes[uri].actif) {
          variates.push("?" + this.attributes[uri].SPARQLid);
        }
      }

      for (var _uri3 in this.categories) {
        var _SparqlId2 = this.categories[_uri3].SPARQLid;
        if (this.categories[_uri3].actif) {
          variates.push("?" + this.categories[_uri3].SPARQLid);
        }
      }
    }

    /* Using by the View to get Categories */

  }, {
    key: "buildConstraintsGraphForCategory",
    value: function buildConstraintsGraphForCategory(attributeId) {
      var variates = [];
      var constraintRelations = [];

      if (attributeId === undefined || $.trim(attributeId) === "") {
        return [[], []];
      }
      var node = this;
      /* add node inside */
      constraintRelations.push("?" + node.SPARQLid + " " + 'rdf:type' + " " + node.URI());
      //constraintRelations.push("?"+'URI'+node.SPARQLid+" "+'rdfs:label'+" "+"?"+node.SPARQLid);
      var service = this.service;

      for (var uri in node.categories) {
        if (node.categories[uri].id != attributeId) continue;

        // on relache cette contrainte trop forte lorsque c est distant !
        if (service === '') {
          constraintRelations.push("?" + node.SPARQLid + " " + this.URI(uri) + " " + "?URICat" + node.categories[uri].SPARQLid);
          constraintRelations.push("[] askomicsns:category " + "?URICat" + node.categories[uri].SPARQLid);
        }
        constraintRelations.push("?URICat" + node.categories[uri].SPARQLid + " " + 'rdfs:label' + " " + "?" + node.categories[uri].SPARQLid);
        variates.push("?" + node.categories[uri].SPARQLid);
        variates.push("?URICat" + node.categories[uri].SPARQLid);

        if (service !== '') {
          service = 'SERVICE <' + service + '>';
          return [variates, [[constraintRelations, service], '']];
        }

        return [variates, [constraintRelations, service]];
      }
      /* category are not found */
      return [[], []];
    }
  }, {
    key: "switchRegexpMode",
    value: function switchRegexpMode(idatt) {
      if (idatt === undefined) throw "switchRegexpMode : undefined attribute !";
      if (!(idatt in this._isregexp)) {
        /* default value */
        this._isregexp[idatt] = true;
        return;
      }

      this._isregexp[idatt] = !this._isregexp[idatt];
    }
  }, {
    key: "isRegexpMode",
    value: function isRegexpMode(idatt) {
      if (idatt === undefined) throw "isRegexpMode : undefined attribute !";
      if (!(idatt in this._isregexp)) {
        /* default value */
        this._isregexp[idatt] = false;
      }
      return this._isregexp[idatt];
    }
  }, {
    key: "setActiveAttribute",
    value: function setActiveAttribute(uriId, boolean, optional) {
      if (uriId === undefined) throw "activeAttribute : undefined attribute !";
      var opt = false;
      if ((typeof optional === "undefined" ? "undefined" : _typeof(optional)) !== undefined) {
        opt = true;
      }

      for (var a in this.attributes) {
        if (this.attributes[a].SPARQLid == uriId) {
          this.attributes[a].actif = boolean;
          if (opt) this.attributes[a].optional = optional;
          return;
        }
      }
      for (var _a in this.categories) {
        if (this.categories[_a].SPARQLid == uriId) {
          this.categories[_a].actif = boolean;
          if (opt) this.categories[_a].optional = optional;
          return;
        }
      }
      throw "activeAttribute : can not find attribute:" + uriId;
    }
  }, {
    key: "setFilterAttributes",
    value: function setFilterAttributes(SPARQLid, value, filter) {
      if ($.trim(value) === "") {
        // case if user don't wan anymore a filter
        delete this.filters[SPARQLid];
        delete this.values[SPARQLid];
      } else {
        if ($.trim(filter) !== "") {
          this.filters[SPARQLid] = filter;
        } else {
          delete this.filters[SPARQLid];
        }
        this.values[SPARQLid] = value; /* save value to restore it when the views need it*/
      }
    }
  }, {
    key: "setFilterLinkVariable",
    value: function setFilterLinkVariable(SPARQLid1, node2, SPARQLid2) {
      this.setFilterAttributes(SPARQLid1, SPARQLid2, 'FILTER ( ?' + SPARQLid1 + '=?' + SPARQLid2 + ')');
      if (!(SPARQLid1 in this.linkvar)) {
        this.linkvar[SPARQLid1] = {};
        this.linkvar[SPARQLid1].cpt = 0; /* counter about this attribute */
        this.linkvar[SPARQLid1].nodelink = -1; /* ref node link */
      }

      if (!(SPARQLid2 in node2.linkvar)) {
        node2.linkvar[SPARQLid2] = {};
        node2.linkvar[SPARQLid2].cpt = 0; /* counter about this attribute */
        node2.linkvar[SPARQLid2].nodelink = -1; /* ref node link */
      }

      this.linkvar[SPARQLid1].cpt++;
      this.linkvar[SPARQLid1].nodelink = node2.id;
      node2.linkvar[SPARQLid2].cpt++;
      node2.linkvar[SPARQLid2].nodelink = this.id;
    }
  }, {
    key: "removeFilterLinkVariable",
    value: function removeFilterLinkVariable(SPARQLid1) {

      if (!(SPARQLid1 in this.values)) return;

      var SPARQLid2 = this.values[SPARQLid1];
      this.setFilterAttributes(SPARQLid1, "", "");

      this.linkvar[SPARQLid1].cpt--;
      var n = new AskomicsGraphBuilder().nodes(this.linkvar[SPARQLid1].nodelink);
      n.linkvar[SPARQLid2].cpt--;

      if (this.linkvar[SPARQLid1].cpt <= 0) delete this.linkvar[SPARQLid1];
      if (n.linkvar[SPARQLid2].cpt <= 0) delete n.linkvar[SPARQLid2];
    }
  }, {
    key: "getAttributesDisplaying",
    value: function getAttributesDisplaying() {

      var list_id = [];
      var list_label = [];
      var map_url = {};

      var orderAttributes = new AskomicsUserAbstraction().getOrderAttributesList(this.uri);

      for (var uriAttI in orderAttributes) {
        var uriAtt = orderAttributes[uriAttI].uri;

        if (this.uri === uriAtt) {
          list_id.push(this.SPARQLid);
          list_label.push(this.label);
          map_url[this.SPARQLid] = "%s";
        } else if (orderAttributes[uriAttI].basic_type != "category") {
          if (this.attributes[uriAtt].actif) {
            list_id.push(this.attributes[uriAtt].SPARQLid);
            list_label.push(this.attributes[uriAtt].label);
          }
        } else {
          if (this.categories[uriAtt].actif) {
            list_id.push(this.categories[uriAtt].SPARQLid);
            list_label.push(this.categories[uriAtt].label);
          }
        }
      }
      return { 'id': list_id, 'label': list_label, 'url': map_url };
    }
  }, {
    key: "getTextFillColor",
    value: function getTextFillColor() {
      return 'black';
    }
  }, {
    key: "getTextStrokeColor",
    value: function getTextStrokeColor() {
      return 'black';
    }
  }, {
    key: "getRNode",
    value: function getRNode() {
      return 12;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "AskomicsNode >" + _get(AskomicsNode.prototype.__proto__ || Object.getPrototypeOf(AskomicsNode.prototype), "toString", this).call(this);
    }
  }, {
    key: "attributes",
    set: function set(attributes) {
      this._attributes = attributes;
    },
    get: function get() {
      return this._attributes;
    }
  }, {
    key: "categories",
    set: function set(categories) {
      this._categories = categories;
    },
    get: function get() {
      return this._categories;
    }
  }, {
    key: "filters",
    set: function set(filters) {
      this._filters = filters;
    },
    get: function get() {
      return this._filters;
    }
  }, {
    key: "values",
    set: function set(values) {
      this._values = values;
    },
    get: function get() {
      return this._values;
    }
  }, {
    key: "isregexp",
    set: function set(__isregexp) {
      this._isregexp = __isregexp;
    },
    get: function get() {
      return this._isregexp;
    }
  }, {
    key: "inverseMatch",
    set: function set(__inverseMatch) {
      this._inverseMatch = __inverseMatch;
    },
    get: function get() {
      return this._inverseMatch;
    }
  }, {
    key: "linkvar",
    set: function set(__linkvar) {
      this._linkvar = __linkvar;
    },
    get: function get() {
      return this._linkvar;
    }
  }, {
    key: "service",
    set: function set(__service) {
      this._service = __service;
    },
    get: function get() {
      return this._service;
    }
  }]);

  return AskomicsNode;
}(GraphNode);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*jshint esversion: 6 */

var AskomicsPositionableNode = function (_AskomicsNode) {
  _inherits(AskomicsPositionableNode, _AskomicsNode);

  function AskomicsPositionableNode(node, x, y) {
    _classCallCheck(this, AskomicsPositionableNode);

    return _possibleConstructorReturn(this, (AskomicsPositionableNode.__proto__ || Object.getPrototypeOf(AskomicsPositionableNode)).call(this, node, x, y));
  }

  _createClass(AskomicsPositionableNode, [{
    key: 'setjson',
    value: function setjson(obj) {
      _get(AskomicsPositionableNode.prototype.__proto__ || Object.getPrototypeOf(AskomicsPositionableNode.prototype), 'setjson', this).call(this, obj);
    }
  }, {
    key: 'getPanelView',
    value: function getPanelView() {
      return new AskomicsPositionableNodeView(this);
    }
  }, {
    key: 'getTextFillColor',
    value: function getTextFillColor() {
      return 'darkgreen';
    }
  }, {
    key: 'getTextStrokeColor',
    value: function getTextStrokeColor() {
      return 'darkgreen';
    }
  }, {
    key: 'getNodeFillColor',
    value: function getNodeFillColor() {
      return 'darkgreen';
    }
  }]);

  return AskomicsPositionableNode;
}(AskomicsNode);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*jshint esversion: 6 */
/*
http://geneontology.org/page/go-rdfxml-file-format

*/
var GONode = function (_AskomicsNode) {
  _inherits(GONode, _AskomicsNode);

  function GONode(node, x, y) {
    var _ret;

    _classCallCheck(this, GONode);

    var _this = _possibleConstructorReturn(this, (GONode.__proto__ || Object.getPrototypeOf(GONode)).call(this, node, x, y));

    _this.label = "GO Term";
    _this.filterOnOboId = [];
    return _ret = _this, _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GONode, [{
    key: 'setjson',
    value: function setjson(obj) {
      _get(GONode.prototype.__proto__ || Object.getPrototypeOf(GONode.prototype), 'setjson', this).call(this, obj);
      this.filterOnOboId = obj._filterOnOboId;
    }
  }, {
    key: 'getPanelView',
    value: function getPanelView() {
      return new GONodeView(this);
    }
  }, {
    key: 'addOboIdFilter',
    value: function addOboIdFilter(oboid) {
      this.filterOnOboId.push(oboid);
    }
  }, {
    key: 'deleteOboIdFilter',
    value: function deleteOboIdFilter(oboid) {
      for (var i = 0; i < this.filterOnOboId.length; i++) {
        if (this.filterOnOboId[i] == oboid) {
          this.filterOnOboId.splice(i, 1);
          return;
        }
      }
    }
  }, {
    key: 'buildConstraintsSPARQL',
    value: function buildConstraintsSPARQL() {

      var blockConstraintByNode = [];
      //blockConstraintByNode.push('?URI'+this.SPARQLid+' rdfs:label ?Label'+this.SPARQLid);
      blockConstraintByNode = blockConstraintByNode.concat(_get(GONode.prototype.__proto__ || Object.getPrototypeOf(GONode.prototype), 'buildConstraintsSPARQL', this).call(this)[0]);

      if (this.filterOnOboId.length > 0) {
        blockConstraintByNode.push('?' + this.SPARQLid + ' rdfs:subClassOf* ' + '?oboid' + this.SPARQLid);
        var valueFilterOnOboId = 'VALUES ?oboid' + this.SPARQLid + " {";
        for (var i = 0; i < this.filterOnOboId.length; i++) {
          valueFilterOnOboId += " <" + this.filterOnOboId[i] + ">";
        }
        valueFilterOnOboId += " }";
        blockConstraintByNode.push(valueFilterOnOboId);
      }

      /*     TEST       */
      //blockConstraintByNode.push('?subClass'+this.SPARQLid+' rdfs:subClassOf* '+'?URI'+this.SPARQLid);
      // obo: ne match pas avec la bonne url....on met en dure pour les tests
      //blockConstraintByNode.push('?subClass'+this.SPARQLid+' <http://www.geneontology.org/formats/oboInOwl#id> ?id2'+this.SPARQLid);
      //blockConstraintByNode.push('?subClass'+this.SPARQLid+' rdfs:label ?desc2'+this.SPARQLid);
      var service = new AskomicsUserAbstraction().getAttribEntity(this.uri, new AskomicsUserAbstraction().longRDF("askomicsns:hasUrlExternalService"));

      if (service !== '') {
        service = 'SERVICE <' + service + '>';
      }

      return [blockConstraintByNode, service];
    }
    /*
      instanciateVariateSPARQL(variates) {
        variates.push("?Label"+this.SPARQLid);
        variates.push("?OBONamespace"+this.SPARQLid);
        variates.push("?IAODefinition"+this.SPARQLid);
        variates.push("?Comment"+this.SPARQLid);
    
        variates.push("?BroadSynonym"+this.SPARQLid);
        variates.push("?RelatedSynonym"+this.SPARQLid);
        variates.push("?ExactSynonym"+this.SPARQLid);
        variates.push("?NarrowSynonym"+this.SPARQLid);
        //variates.push("?Definition"+this.SPARQLid);
    
        //variates.push("?rel"+this.SPARQLid);
        //variates.push("?valueString"+this.SPARQLid);
    
        //variates.push('?subClass'+this.SPARQLid);
        //variates.push('?desc2'+this.SPARQLid);
        //variates.push('?id2'+this.SPARQLid);
      }
    */

  }, {
    key: 'getAttributesDisplaying',
    value: function getAttributesDisplaying() {
      var list_id = [];
      var list_label = [];
      var map_url = {};

      list_id.push("tmp_" + this.SPARQLid);
      list_label.push("Id");
      map_url["tmp_" + this.SPARQLid] = new GOParametersView().config.web_link;

      var lD = _get(GONode.prototype.__proto__ || Object.getPrototypeOf(GONode.prototype), 'getAttributesDisplaying', this).call(this);
      list_id = list_id.concat(lD.id);
      list_label = list_label.concat(lD.label);

      /*
      list_id.push("Label"+this.SPARQLid);
      list_label.push("Label");
       list_id.push("OBONamespace"+this.SPARQLid);
      list_label.push("Namespace");
      list_id.push("IAODefinition"+this.SPARQLid);
      list_label.push("IAO:Definition");
      list_id.push("Comment"+this.SPARQLid);
      list_label.push("Comment");
      list_id.push("BroadSynonym"+this.SPARQLid);
      list_label.push("BroadSynonym");
      list_id.push("RelatedSynonym"+this.SPARQLid);
      list_label.push("RelatedSynonym");
      list_id.push("ExactSynonym"+this.SPARQLid);
      list_label.push("ExactSynonym");
      list_id.push("NarrowSynonym"+this.SPARQLid);
      list_label.push("NarrowSynonym");
      //list_id.push("Definition"+this.SPARQLid);
      //list_label.push("OBO:Definition");
      */
      return { 'id': list_id, 'label': list_label, 'url': map_url };
    }

    /* To informe userAbstraction with new relation managed by GO */

  }, {
    key: 'getTextFillColor',
    value: function getTextFillColor() {
      return 'Coral';
    }
  }, {
    key: 'getTextStrokeColor',
    value: function getTextStrokeColor() {
      return 'Coral';
    }
  }, {
    key: 'getNodeFillColor',
    value: function getNodeFillColor() {
      return 'Coral';
    }
  }, {
    key: 'getNodeStrokeColor',
    value: function getNodeStrokeColor() {
      return 'yellowgreen';
    }
  }, {
    key: 'getRNode',
    value: function getRNode() {
      return 13;
    }
  }, {
    key: 'filterOnOboId',
    set: function set(__filterOnOboId) {
      this._filterOnOboId = __filterOnOboId;
    },
    get: function get() {
      return this._filterOnOboId;
    }
  }], [{
    key: 'getRemoteRelations',
    value: function getRemoteRelations() {
      /*
          http://www.geneontology.org/formats/oboInOwl#hasAlternativeId    ===> GO:TERM
          http://www.geneontology.org/formats/oboInOwl#hasDbXref           ===> Reactome:REACT_30266,Wikipedia:Apoptosis,NIF_Subcellular:sao1702920020
      */
      var allRel = [];

      allRel.push({
        'subject': "http://purl.org/obo/owl/GO#term",
        'object': "http://purl.org/obo/owl/GO#term",
        'relation': 'http://www.geneontology.org/formats/oboInOwl#hasAlternativeId' });

      allRel.push({
        'subject': "http://purl.org/obo/owl/GO#term",
        'object': "http://identifiers.org/reactome#term",
        'relation': 'http://www.geneontology.org/formats/oboInOwl#hasDbXref' });
      allRel.push({
        'subject': "http://purl.org/obo/owl/GO#term",
        'object': "https://en.wikipedia.org/wiki#term",
        'relation': 'http://www.geneontology.org/formats/oboInOwl#hasDbXref' });

      return allRel;
    }
  }]);

  return GONode;
}(AskomicsNode);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*jshint esversion: 6 */

var GraphLink = function (_GraphObject) {
  _inherits(GraphLink, _GraphObject);

  function GraphLink(link, sourceN, targetN) {
    _classCallCheck(this, GraphLink);

    var _this = _possibleConstructorReturn(this, (GraphLink.__proto__ || Object.getPrototypeOf(GraphLink)).call(this, link));

    _this.linkindex = -1;

    if (sourceN && sourceN !== null) {
      _this.source = sourceN;
      //this.source.weight++;
    } else {
      _this.source = null;
    }
    if (targetN && targetN !== null) {
      _this.target = targetN;
    } else {
      _this.target = null;
    }

    if (_this.source !== null && _this.target !== null) {
      if (!(_this.target.id in _this.source.nlink)) {
        _this.source.nlink[_this.target.id] = 0;
        _this.target.nlink[_this.source.id] = 0;
      }
      /* increment the number of link between the two nodes */
      _this.source.nlink[_this.target.id]++;
      _this.target.nlink[_this.source.id]++;

      _this.linkindex = _this.source.nlink[_this.target.id];
    }
    return _this;
  }

  _createClass(GraphLink, [{
    key: 'getType',
    value: function getType() {
      return "link";
    }
  }, {
    key: 'setjson',
    value: function setjson(obj) {
      _get(GraphLink.prototype.__proto__ || Object.getPrototypeOf(GraphLink.prototype), 'setjson', this).call(this, obj);
      this.linkindex = obj._linkindex;

      if (!('_source' in obj || '_target' in obj)) {
        throw "Devel error: setjson : obj have no _source/_target property : " + JSON.stringify(obj);
      }

      if (!('_id' in obj._source)) {
        throw "Devel error: setjson : obj._source have no id property : " + JSON.stringify(obj);
      }

      if (!('_id' in obj._target)) {
        throw "Devel error: setjson : obj._target have no id property : " + JSON.stringify(obj);
      }

      var t = AskomicsGraphBuilder.findElt(new AskomicsGraphBuilder().nodes(), obj._source._id);
      if (t[0] < 0) {
        throw "Devel error: setjson : nodes have to be initialized to define links.";
      }

      this.source = t[1];

      t = AskomicsGraphBuilder.findElt(new AskomicsGraphBuilder().nodes(), obj._target._id);
      if (t[0] < 0) {
        throw "Devel error: setjson : nodes have to be initialized to define links.";
      }
      this.target = t[1];
    }
  }, {
    key: 'getLinkStrokeColor',
    value: function getLinkStrokeColor() {
      return 'grey';
    }
  }, {
    key: 'getTextFillColor',
    value: function getTextFillColor() {
      return 'grey';
    }
  }, {
    key: 'toString',
    value: function toString() {
      var s = _get(GraphLink.prototype.__proto__ || Object.getPrototypeOf(GraphLink.prototype), 'toString', this).call(this);
      return " GraphLink (" + s + ")";
    }
  }, {
    key: 'source',
    set: function set(__source) {
      this._source = __source;
    },
    get: function get() {
      return this._source;
    }
  }, {
    key: 'target',
    set: function set(__target) {
      this._target = __target;
    },
    get: function get() {
      return this._target;
    }
  }, {
    key: 'linkindex',
    set: function set(__linkindex) {
      this._linkindex = __linkindex;
    },
    get: function get() {
      return this._linkindex;
    }
  }]);

  return GraphLink;
}(GraphObject);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*jshint esversion: 6 */

var AskomicsLink = function (_GraphLink) {
  _inherits(AskomicsLink, _GraphLink);

  function AskomicsLink(link, sourceN, targetN) {
    _classCallCheck(this, AskomicsLink);

    var _this = _possibleConstructorReturn(this, (AskomicsLink.__proto__ || Object.getPrototypeOf(AskomicsLink)).call(this, link, sourceN, targetN));

    _this._transitive = false;
    _this._negative = false;
    _this._subProperty = true;
    return _this;
  }

  _createClass(AskomicsLink, [{
    key: "setjson",
    value: function setjson(obj) {
      _get(AskomicsLink.prototype.__proto__ || Object.getPrototypeOf(AskomicsLink.prototype), "setjson", this).call(this, obj);

      this._transitive = obj._transitive;
      this._negative = obj._negative;
      this._subProperty = obj._subProperty;
    }
  }, {
    key: "getPanelView",
    value: function getPanelView() {
      return new AskomicsLinkView(this);
    }
  }, {
    key: "buildConstraintsSPARQL",
    value: function buildConstraintsSPARQL() {
      var blockConstraintByNode = [];
      var rel = this.URI();

      var addSC = "";
      if (this.transitive) addSC = "+";

      if (this.subProperty) {
        var propertyId = "?subProperty" + this.id;
        blockConstraintByNode.push("?" + this.source.SPARQLid + " " + propertyId + addSC + " " + "?" + this.target.SPARQLid);
        blockConstraintByNode.push(propertyId + " rdfs:subPropertyOf* " + rel);
      } else {
        blockConstraintByNode.push("?" + this.source.SPARQLid + " " + rel + addSC + " " + "?" + this.target.SPARQLid);
      }

      if (this.negative) {
        blockConstraintByNode = [blockConstraintByNode, 'FILTER NOT EXISTS'];
      }

      var service = "";
      if (this.source.service === this.target.service && this.target.service !== new AskomicsUserAbstraction().endpoint) {
        service = this.target.service;
      }

      if (service !== '') {
        //service = new TriplestoreParametersView().config.endpoint;
        service = 'SERVICE <' + service + '>';
      }

      return [blockConstraintByNode, service];
    }
  }, {
    key: "instanciateVariateSPARQL",
    value: function instanciateVariateSPARQL(variates) {}
  }, {
    key: "getLinkStrokeColor",
    value: function getLinkStrokeColor() {
      return _get(AskomicsLink.prototype.__proto__ || Object.getPrototypeOf(AskomicsLink.prototype), "getLinkStrokeColor", this).call(this);
    }
  }, {
    key: "transitive",
    set: function set(transitive) {
      this._transitive = transitive;
    },
    get: function get() {
      return this._transitive;
    }
  }, {
    key: "negative",
    set: function set(negative) {
      this._negative = negative;
    },
    get: function get() {
      return this._negative;
    }
  }, {
    key: "subProperty",
    set: function set(subp) {
      this._subProperty = subp;
    },
    get: function get() {
      return this._subProperty;
    }
  }]);

  return AskomicsLink;
}(GraphLink);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*jshint esversion: 6 */

var AskomicsPositionableLink = function (_AskomicsLink) {
  _inherits(AskomicsPositionableLink, _AskomicsLink);

  function AskomicsPositionableLink(link, sourceN, targetN) {
    _classCallCheck(this, AskomicsPositionableLink);

    var _this = _possibleConstructorReturn(this, (AskomicsPositionableLink.__proto__ || Object.getPrototypeOf(AskomicsPositionableLink)).call(this, link, sourceN, targetN));

    _this.type = 'included';
    _this.label = 'included in';
    _this.same_tax = 'undef';
    _this.same_ref = 'undef';
    _this.which_strand = 'both'; // 'both', 'same' or 'opp'
    _this.strict = true;
    _this.position_taxon = 'undef';
    _this.position_ref = 'undef';
    _this.position_strand = 'undef';
    return _this;
  }

  _createClass(AskomicsPositionableLink, [{
    key: 'setCommonPosAttr',
    value: function setCommonPosAttr() {
      /*  get list of common positionable attributes
          (taxon, ref and strand) */
      var service = new RestServiceJs("positionable_attr");
      var model = { 'node': this.source.uri,
        'second_node': this.target.uri,
        'link': this };

      displayModal('Please wait', '', 'Close');
      service.post(model, function (data) {
        if (data.error) {
          throw new Error(data.error);
        }

        model.link.position_taxon = data.results.position_taxon;
        model.link.position_ref = data.results.position_ref;
        model.link.position_strand = data.results.position_strand;

        model.link.same_tax = data.results.position_taxon ? true : false;
        model.link.same_ref = data.results.position_ref ? true : false;
        hideModal();
      });
    }
  }, {
    key: 'setjson',
    value: function setjson(obj) {
      _get(AskomicsPositionableLink.prototype.__proto__ || Object.getPrototypeOf(AskomicsPositionableLink.prototype), 'setjson', this).call(this, obj);
      this.type = obj.type;
      this.label = obj.label;
      this.same_tax = obj.same_tax;
      this.same_ref = obj.same_ref;
      this.which_strand = obj.which_strand;
      this.strict = obj.strict;
      this.position_taxon = obj.position_taxon;
      this.position_ref = obj.position_ref;
      this.position_strand = obj.position_strand;
    }
  }, {
    key: 'getPanelView',
    value: function getPanelView() {
      return new AskomicsPositionableLinkView(this);
    }
  }, {
    key: 'getTextFillColor',
    value: function getTextFillColor() {
      return 'darkgreen';
    }
  }, {
    key: 'buildConstraintsSPARQL',
    value: function buildConstraintsSPARQL() {

      var node = this.target;
      var secondNode = this.source;
      var blockConstraint = [];

      /* constrainte to target the same ref */
      if (this.position_ref) {
        blockConstraint.push("?" + node.SPARQLid + " " + ":position_ref" + " " + "?ref_" + node.SPARQLid);
        blockConstraint.push("?" + secondNode.SPARQLid + " " + ":position_ref" + " " + "?ref_" + secondNode.SPARQLid);
      }

      /* constrainte to target the same taxon */
      if (this.position_taxon) {
        blockConstraint.push("?" + node.SPARQLid + " " + ":position_taxon" + " " + "?taxon_" + node.SPARQLid);
        blockConstraint.push("?" + secondNode.SPARQLid + " " + ":position_taxon" + " " + "?taxon_" + secondNode.SPARQLid);
      }

      /* constraint to target the same/opposite strand */
      if (this.position_strand) {
        blockConstraint.push("?" + node.SPARQLid + " " + ":position_strand" + " " + "?strand_" + node.SPARQLid);
        blockConstraint.push("?" + secondNode.SPARQLid + " " + ":position_strand" + " " + "?strand_" + secondNode.SPARQLid);
      }

      /* manage start and end variates */
      blockConstraint.push("?" + node.SPARQLid + " " + ":position_start" + " " + "?start_" + node.SPARQLid);
      blockConstraint.push("?" + node.SPARQLid + " " + ":position_end" + " " + "?end_" + node.SPARQLid);

      blockConstraint.push("?" + secondNode.SPARQLid + " " + ":position_start" + " " + "?start_" + secondNode.SPARQLid);
      blockConstraint.push("?" + secondNode.SPARQLid + " " + ":position_end" + " " + "?end_" + secondNode.SPARQLid);

      this.buildFiltersSPARQL(blockConstraint);
      return [blockConstraint, ''];
    }
  }, {
    key: 'buildFiltersSPARQL',
    value: function buildFiltersSPARQL(filters) {
      var equalsign = '';

      if (!this.strict) {
        equalsign = '=';
      }

      var node = this.target;
      var secondNode = this.source;

      if (this.same_ref) {
        //TODO: test which of the following line is the fastest
        filters.push('FILTER(?ref_' + node.SPARQLid + ' = ?ref_' + secondNode.SPARQLid + ')');
        //filters.push('FILTER(SAMETERM(?ref_'+node.SPARQLid+', ?ref_'+secondNode.SPARQLid+'))');
      }

      if (this.same_tax) {
        //TODO: test which of the following line is the fastest
        filters.push('FILTER(?taxon_' + node.SPARQLid + ' = ?taxon_' + secondNode.SPARQLid + ')');
        //filters.push('FILTER(SAMETERM(?taxon_'+node.SPARQLid+', ?taxon_'+secondNode.SPARQLid+'))');
      }

      if (this.which_strand == 'same') {
        filters.push('FILTER(?strand_' + node.SPARQLid + ' = ?strand_' + secondNode.SPARQLid + ')');
      } else if (this.which_strand == 'opp') {
        filters.push('FILTER(?strand_' + node.SPARQLid + ' != ?strand_' + secondNode.SPARQLid + ')');
      }

      switch (this.type) {
        case 'included':
          filters.push('FILTER((?start_' + secondNode.SPARQLid + ' >' + equalsign + ' ?start_' + node.SPARQLid + ' ) && (?end_' + secondNode.SPARQLid + ' <' + equalsign + ' ?end_' + node.SPARQLid + '))');
          break;
        case 'excluded':
          filters.push('FILTER(?end_' + node.SPARQLid + ' <' + equalsign + ' ?start_' + secondNode.SPARQLid + ' || ?start_' + node.SPARQLid + ' >' + equalsign + ' ?end_' + secondNode.SPARQLid + ')');
          break;

        case 'overlap':
          filters.push('FILTER(((?end_' + secondNode.SPARQLid + ' >' + equalsign + ' ?start_' + node.SPARQLid + ') && (?start_' + secondNode.SPARQLid + ' <' + equalsign + ' ?end_' + node.SPARQLid + ')) || ((?start_' + secondNode.SPARQLid + ' <' + equalsign + ' ?end_' + node.SPARQLid + ') && (?end_' + secondNode.SPARQLid + ' >' + equalsign + ' ?start_' + node.SPARQLid + ')))');
          break;

        case 'near':
          alert('sorry, near query is not implemanted yet !');
          hideModal();
          exit();
          break;

        default:
          throw new Error("buildPositionableConstraintsGraph: unkown type: " + this.type);
      }
    }
  }, {
    key: 'instanciateVariateSPARQL',
    value: function instanciateVariateSPARQL(variates) {}
  }]);

  return AskomicsPositionableLink;
}(AskomicsLink);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*jshint esversion: 6 */

var GOLink = function (_GraphLink) {
  _inherits(GOLink, _GraphLink);

  function GOLink(link, sourceN, targetN) {
    _classCallCheck(this, GOLink);

    return _possibleConstructorReturn(this, (GOLink.__proto__ || Object.getPrototypeOf(GOLink)).call(this, link, sourceN, targetN));
  }

  _createClass(GOLink, [{
    key: 'setjson',
    value: function setjson(obj) {
      _get(GOLink.prototype.__proto__ || Object.getPrototypeOf(GOLink.prototype), 'setjson', this).call(this, obj);
    }
  }, {
    key: 'getPanelView',
    value: function getPanelView() {
      return new GOLinkView(this);
    }
  }, {
    key: 'getFillColor',
    value: function getFillColor() {
      return 'darkgreen';
    }
  }, {
    key: 'buildConstraintsSPARQL',
    value: function buildConstraintsSPARQL() {
      var blockConstraintByNode = [];
      var rel = this.URI();

      blockConstraintByNode.push('?URI' + this.source.SPARQLid + " " + rel + " " + '?tmp_URI' + this.target.SPARQLid);
      blockConstraintByNode.push("BIND (IRI ( REPLACE(str(" + '?tmp_URI' + this.target.SPARQLid + "),\"GO:\",\"http://purl.obolibrary.org/obo/GO_\",\"i\")) AS " + '?URI' + this.target.SPARQLid + ")");
      var service = new AskomicsUserAbstraction().getAttribRelation(this.uri, new AskomicsUserAbstraction().longRDF("askomicsns:hasUrlExternalService"));

      if (service !== '') {
        service = 'SERVICE <' + service + '>';
      }
      return [blockConstraintByNode, service];
    }
  }, {
    key: 'instanciateVariateSPARQL',
    value: function instanciateVariateSPARQL(variates) {
      variates.push('?tmp_URI' + this.target.SPARQLid);
    }
  }]);

  return GOLink;
}(GraphLink);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */
/*jshint multistr:true */

/* */
var InterfaceParametersView = function () {
  function InterfaceParametersView() {
    _classCallCheck(this, InterfaceParametersView);
  }

  _createClass(InterfaceParametersView, [{
    key: "configuration",
    value: function configuration(keyword) {

      if (this.config === undefined) {
        throw "InterfaceParametersView::configuration Classes extends InterfaceParametersView have to defined a config property !";
      }

      if (!(keyword in this.config)) throw "GOParametersView::configuration unkown keyword:" + keyword;

      return this.config[keyword];
    }

    /* Build an input for parameters views */

  }, {
    key: "createInput",
    value: function createInput(label, configKey) {
      var div = $("<div></div>").addClass("row");
      var lab = $("<label></label>").html(label);
      var inp = $("<input/>").attr("type", "text").val(this.configuration(configKey)).addClass("form-control");

      var currentInterface = this;

      inp.change(function (d) {
        currentInterface.config[configKey] = $(this).val();
      });

      div.append(lab);
      div.append(inp);
      return div;
    }

    /* Build a select for parameters views */

  }, {
    key: "createSelect",
    value: function createSelect(label, configKey, listOptionsValue, listOptionsText) {

      if (listOptionsValue.length != listOptionsText.length) {
        throw "TriplestoreParametersView::createSelect bads arguments with option list ";
      }

      var div = $("<div></div>").addClass("row");
      var lab = $("<label></label>").html(label);
      var sel = $("<select/>").addClass("form-control");

      for (var iOpt in listOptionsValue) {
        var option = $('<option/>').attr('value', listOptionsValue[iOpt]).text(listOptionsText[iOpt]);

        if (listOptionsValue[iOpt] === this.config[configKey]) option.attr("selected", "selected");

        sel.append(option);
      }

      var currentInterface = this;

      sel.change(function (d) {
        currentInterface.config[configKey] = $(this).val();
      });

      div.append(lab);
      div.append(sel);
      return div;
    }

    /* Build an input for parameters views */

  }, {
    key: "createTextArea",
    value: function createTextArea(label, configKey, buttonLabel, actionClick) {
      var div = $("<div></div>").addClass("row");
      var lab = $("<label></label>").html(label);
      var textArea = $("<textarea/>").attr("row", "5").val(this.configuration(configKey)).addClass("form-control");

      var currentInterface = this;

      textArea.change(function (d) {
        currentInterface.config[configKey] = $(this).val();
      });

      var button = $('<button></button>').addClass('btn').addClass('btn-default').text(buttonLabel).on('click', actionClick);

      div.append(lab);
      div.append(textArea);
      div.append(button);
      return div;
    }
  }]);

  return InterfaceParametersView;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*jshint esversion: 6 */
/*jshint multistr:true */

var instanceTriplestoreParametersView = void 0;

var TriplestoreParametersView = function (_InterfaceParametersV) {
  _inherits(TriplestoreParametersView, _InterfaceParametersV);

  function TriplestoreParametersView() {
    _classCallCheck(this, TriplestoreParametersView);

    /* Implement a Singleton */
    var _this = _possibleConstructorReturn(this, (TriplestoreParametersView.__proto__ || Object.getPrototypeOf(TriplestoreParametersView)).call(this));

    if (instanceTriplestoreParametersView !== undefined) {
      var _ret;

      return _ret = instanceTriplestoreParametersView, _possibleConstructorReturn(_this, _ret);
    }

    _this.config = {
      endpoint: new AskomicsUserAbstraction().endpoint,
      usergraph: 'askomics:user:graph:',
      max_content_size_to_update_database: '500000',
      max_results_size: '2000',
      tpsname: 'virtuoso'
    };

    instanceTriplestoreParametersView = _this;
    return _this;
  }

  _createClass(TriplestoreParametersView, [{
    key: 'configurationView',
    value: function configurationView() {

      /* if the content have ever been created */
      if ($("#content_triplestore_parameters").length > 0) return;

      /* build otherwise */
      var container = $("<div></div>").addClass("container").attr("id", "content_triplestore_parameters");
      var lab = $("<h3></h3>").html("Triplestore configuration");

      container.append($('<hr/>')).append(lab).append($('<hr/>')).append(this.createInput("ENDPOINT", 'endpoint')).append($('<hr/>')).append(this.createInput("GRAPH NAME", 'usergraph')).append($('<hr/>')).append(this.createInput("LIMIT UPLOAD SIZE (Ko)", 'max_content_size_to_update_database')).append($('<hr/>')).append(this.createSelect("TRIPLESTORE", 'tpsname', ['virtuoso', 'fuseki'], ['virtuoso', 'fuseki'])).append($('<hr/>')).append(this.createInput("MAX RESULTS", 'max_results_size'));

      /* add to the main document */
      $('body').append(container);
    }
  }]);

  return TriplestoreParametersView;
}(InterfaceParametersView);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*jshint esversion: 6 */
/*jshint multistr:true */

/*
var askomics_abstraction="\
?attribute askomicsns:attribute \"true\"^^xsd:boolean .\
\
?attribute rdf:type owl:DatatypeProperty;\
           rdfs:label ?labelAttribute ;\
           rdfs:domain ?entity;\
           rdfs:range ?typeAttribute.\
";
*/

var instanceGOParametersView = void 0;

var GOParametersView = function (_InterfaceParametersV) {
  _inherits(GOParametersView, _InterfaceParametersV);

  function GOParametersView() {
    _classCallCheck(this, GOParametersView);

    /* Implement a Singleton */
    var _this = _possibleConstructorReturn(this, (GOParametersView.__proto__ || Object.getPrototypeOf(GOParametersView)).call(this));

    if (instanceGOParametersView !== undefined) {
      var _ret;

      return _ret = instanceGOParametersView, _possibleConstructorReturn(_this, _ret);
    }

    /* adding */
    /*
        $("body").append($("<script />", {
          src: "http://cdn.berkeleybop.org/jsapi/bbop.js"
        }));
    */
    _this.config = {
      //url_service              : "http://cloud-60.genouest.org/go/sparql"     ,
      //url_service              : "http://localhost:8891/sparql"     ,
      number_char_search_allow: 5,
      web_link: "http://amigo.geneontology.org/amigo/term/%s",
      askomics_abstraction: ''
    };

    instanceGOParametersView = _this;
    return _this;
  }

  _createClass(GOParametersView, [{
    key: "configurationView",
    value: function configurationView() {

      /* if the content have ever been created */
      if ($("#content_gene_ontology").length > 0) return;

      /* build otherwise */
      var container = $("<div></div>").addClass("container").attr("id", "content_gene_ontology");
      var lab = $("<h3></h3>").html("Gene Ontology Service");

      container.append($('<hr/>')).append(lab).append($('<hr/>')).append(this.createTextArea("ABSTRACTION", 'askomics_abstraction', "Inject in the triplestore", function (e) {})).append($('<hr/>')).append(this.createInput("NUMBER OF CHAR", 'number_char_search_allow')).append($('<hr/>')).append(this.createInput("WEB LINK", 'web_link'));

      $('body').append(container);
    }
  }]);

  return GOParametersView;
}(InterfaceParametersView);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */

var AskomicsObjectView_prefix = "rightview_";
/* General class to manage Askomics Panel View*/

var AskomicsObjectView = function () {
  function AskomicsObjectView(objet) {
    _classCallCheck(this, AskomicsObjectView);

    this.objet = objet;
    this.details = undefined;
  }

  _createClass(AskomicsObjectView, [{
    key: "showTitleObjectView",
    value: function showTitleObjectView() {

      $("#objectName").html(this.objet.formatInHtmlLabelEntity());
      $("#objectName").attr("objid", this.objet.id);
      $("#objectName").attr("type", this.objet.getType());
      $("#showNode").show();
      $("#deleteNode").show();

      if ('actif' in this.objet) {
        if (this.objet.actif) {
          $("#showNode").removeClass('glyphicon-eye-close');
          $("#showNode").addClass('glyphicon-eye-open');
        } else {
          $("#showNode").removeClass('glyphicon-eye-open');
          $("#showNode").addClass('glyphicon-eye-close');
        }
      } else {
        $("#showNode").removeClass('glyphicon-eye-close');
        $("#showNode").removeClass('glyphicon-eye-open');
      }
    }
  }, {
    key: "remove",
    value: function remove() {
      $("#" + AskomicsObjectView_prefix + this.objet.id).remove();
    }
  }, {
    key: "show",
    value: function show() {
      AskomicsObjectView.hideAll();
      AskomicsObjectView.cleanTitleObjectView();
      this.showTitleObjectView();
      $("#" + AskomicsObjectView_prefix + this.objet.id).show();
    }
  }, {
    key: "hide",
    value: function hide() {
      AskomicsObjectView.cleanTitleObjectView();
      $("#" + AskomicsObjectView_prefix + this.objet.id).hide();
    }
  }, {
    key: "divPanel",
    value: function divPanel() {
      this.details = $("<div></div>").attr("id", AskomicsObjectView_prefix + this.objet.id).attr("nodeid", this.objet.id).attr("sparqlid", this.objet.SPARQLid).addClass('div-details');
    }

    /* Build a Panel for attribute with attribute movable to change order of the attribute view display */

  }, {
    key: "divPanelUlSortable",
    value: function divPanelUlSortable() {

      this.divPanel();

      var ul = $("<ul></ul>").attr("id", "sortableAttribute").css("list-style-type", "none").sortable({
        placeholder: "ui-state-highlight",
        update: function update(event, ui) {
          var orderAttributes = [];
          $(this).parent().find(".attribute").each(function () {
            var uri = $(this).attr("uri");
            var basic_type = $(this).attr("basic_type");
            orderAttributes.push({ 'uri': uri, 'basic_type': basic_type });
          });
          var l = $(this).parent().find("[urinode]");
          if (l.length === 0) {
            throw "Devel Error :: Attribute list have to defined a urinode !!";
          }
          new AskomicsUserAbstraction().setOrderAttributesList(l.first().attr("urinode"), orderAttributes);
        }
      });

      this.details.append(ul);
    }
  }, {
    key: "addPanel",
    value: function addPanel(element) {
      var ul = this.details.find("#sortableAttribute");
      if (ul.length === 0) {
        this.details.append(element);
      } else {
        element.addClass("attribute");
        ul.append($("<li></li>").addClass("ui-state-default").css("margin", "5px").css("padding", "5px").css("border-radius", "10px").append(element));
        this.details.append(ul);
      }
    }
  }], [{
    key: "cleanTitleObjectView",
    value: function cleanTitleObjectView() {
      $("#objectName").text("");
      $("#showNode").hide();
      $("#deleteNode").hide();
      $("#objectName").removeAttr("objid");
    }
  }, {
    key: "removeAll",
    value: function removeAll() {
      $("div[id*='" + AskomicsObjectView_prefix + "']").remove();

      $("#showNode").unbind();
      $("#deleteNode").unbind();
      $('#helpNode').unbind();
    }
  }, {
    key: "hideAll",
    value: function hideAll() {
      AskomicsObjectView.cleanTitleObjectView();
      $("div[id*='" + AskomicsObjectView_prefix + "']").hide();
    }
  }, {
    key: "defineClickMenu",
    value: function defineClickMenu() {
      var mythis = this;
      // Switch between close and open eye icon for unselected
      $("#showNode").click(function () {
        var id = $("#objectName").attr("objid");
        if (new AskomicsGraphBuilder().nodes().length <= 1) {
          var help_title = "Information";
          var help_str = "Askomics can not disable a single node.";
          displayModal(help_title, help_str, 'ok');
          return;
        }
        var countActif = 0;
        for (var i = 0; i < new AskomicsGraphBuilder().nodes().length; i++) {
          if (new AskomicsGraphBuilder().nodes()[i].actif) countActif++;
        }
        if (countActif <= 1) {
          var _help_title = "Information";
          var _help_str = "Askomics can not disable all nodes.";
          displayModal(_help_title, _help_str, 'ok');
          return;
        }

        var node = new AskomicsGraphBuilder().getInstanciedNode(id);
        if (node) {
          node.switchActiveNode();

          if (node.actif) {
            $(this).removeClass('glyphicon-eye-close');
            $(this).addClass('glyphicon-eye-open');
          } else {
            $(this).removeClass('glyphicon-eye-open');
            $(this).addClass('glyphicon-eye-close');
          }
        }
        // link is not manage
      });

      // Node deletion
      $("#deleteNode").click(function () {
        var id = $("#objectName").attr("objid");
        var type = $("#objectName").attr("type");
        if (type == "node") {
          var node = new AskomicsGraphBuilder().getInstanciedNode(id);
          if (node.id == new AskomicsGraphBuilder().nodes()[0].id) {
            var help_title = "Information";
            var help_str = "Askomics can not delete the start node. Use the reset button to begin a new query!";
            displayModal(help_title, help_str, 'ok');
            return;
          }

          var listLinksRemoved = new AskomicsGraphBuilder().removeInstanciedNode(node);
          forceLayoutManager.removeSuggestions();
          forceLayoutManager.update();
          node.getPanelView().remove();
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = listLinksRemoved[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var l = _step.value;

              l.getPanelView().remove();
              forceLayoutManager.removeLinkSvgInformation(l);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        } else if (type == "link") {
          var link = new AskomicsGraphBuilder().getInstanciedLink(id);

          var removenode = new AskomicsGraphBuilder().removeInstanciedLink(link);
          forceLayoutManager.removeSuggestions();
          forceLayoutManager.update();
          link.getPanelView().remove();
          forceLayoutManager.removeLinkSvgInformation(link);
          if (removenode) {
            removenode.getPanelView().remove();
          }
        } else {
          throw "Unknown type of this Graph Object:" + type;
        }
      });

      $('#helpNode').click(function () {
        var id = $("#objectName").attr("objid");
        var type = $("#objectName").attr("type");

        var elem = void 0;

        if (type == "node") {
          elem = new AskomicsGraphBuilder().getInstanciedNode(id);
        } else if (type == "link") {
          elem = new AskomicsGraphBuilder().getInstanciedLink(id);
        } else {
          throw "AskomisObjectView::help  ==> unkown type:" + type;
        }
        if (elem !== undefined) elem.getPanelView().display_help();
      });
    }
  }]);

  return AskomicsObjectView;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*jshint esversion: 6 */

/*
  Manage Information Link View With a current selected link
*/
var LINKVIEW_NEGATIVE_COLOR_TEXT = 'red';
var LINKVIEW_TRANSITIVE_COLOR_TEXT = 'purple';
var LINKVIEW_TRANSITIVE_NEGATIVE_COLOR_TEXT = 'orange';
var LINKVIEW_SUBPROPERTY_COLOR_TEXT = 'bleue';

var AskomicsLinkView = function (_AskomicsObjectView) {
  _inherits(AskomicsLinkView, _AskomicsObjectView);

  function AskomicsLinkView(link) {
    _classCallCheck(this, AskomicsLinkView);

    var _this = _possibleConstructorReturn(this, (AskomicsLinkView.__proto__ || Object.getPrototypeOf(AskomicsLinkView)).call(this, link));

    _this.link = link;
    return _this;
  }

  _createClass(AskomicsLinkView, [{
    key: 'display_help',
    value: function display_help() {
      var help_title = 'Link "' + this.link.label + '"';
      var help_str = 'There is a relation between ' + this.link.source.label + ' and ' + this.link.target.label + '.';
      help_str += ' This mean that attribute ' + this.link.target.label + ' of ' + this.link.source.label + ' is an entity.';
      $('#help_figure').addClass("hidden");
      displayModal(help_title, help_str, 'ok');
    }
  }, {
    key: 'getTextColorLabel',
    value: function getTextColorLabel() {
      if (this.link.negative && this.link.transitive) return LINKVIEW_TRANSITIVE_NEGATIVE_COLOR_TEXT;
      if (this.link.negative) return LINKVIEW_NEGATIVE_COLOR_TEXT;
      if (this.link.transitive) return LINKVIEW_TRANSITIVE_COLOR_TEXT;
      if (this.link.subProperty) return LINKVIEW_SUBPROPERTY_COLOR_TEXT;
      return this.link.getTextFillColor();
    }
  }, {
    key: 'getTextLabel',
    value: function getTextLabel() {
      if (this.link.negative && this.link.transitive) return 'NOT ' + this.link.label + "+";
      if (this.link.negative) return 'NOT ' + this.link.label;
      if (this.link.transitive) return this.link.label + "+";
      if (this.link.subProperty) return "SUBPROPERTY OF " + this.link.label + "";
      return this.link.label;
    }
  }, {
    key: 'makeNegativeCheckBox',
    value: function makeNegativeCheckBox() {
      var inpNeg = $('<input>').attr('type', 'checkbox').attr('linkid', this.link.id);

      var mythis = this;

      inpNeg.click(function (d) {
        var linkid = $(this).attr('linkid');
        var link = new AskomicsGraphBuilder().getInstanciedLink(linkid);
        if ($(this).is(':checked')) {
          link.negative = true;
        } else {
          link.negative = false;
        }
        $('#' + mythis.link.getSvgLabelId()).find('textPath').attr('fill', mythis.getTextColorLabel());
        $('#' + mythis.link.getSvgLabelId()).find('textPath').text(mythis.getTextLabel());
      });

      if (this.link.negative) {
        inpNeg.attr('checked', 'checked');
      }

      return inpNeg;
    }
  }, {
    key: 'makeTransitiveCheckBox',
    value: function makeTransitiveCheckBox() {
      var inpTrans = $('<input>').attr('type', 'checkbox').attr('linkid', this.link.id);

      var mythis = this;

      inpTrans.click(function (d) {
        var linkid = $(this).attr('linkid');
        var link = new AskomicsGraphBuilder().getInstanciedLink(linkid);
        if ($(this).is(':checked')) {
          link.transitive = true;
        } else {
          link.transitive = false;
        }
        $('#' + mythis.link.getSvgLabelId()).find('textPath').attr('fill', mythis.getTextColorLabel());
        $('#' + mythis.link.getSvgLabelId()).find('textPath').text(mythis.getTextLabel());
      });

      if (this.link.transitive) {
        inpTrans.attr('checked', 'checked');
      }

      return inpTrans;
    }
  }, {
    key: 'makeSubPropertyCheckBox',
    value: function makeSubPropertyCheckBox() {
      var inpSubProp = $('<input>').attr('type', 'checkbox').attr('linkid', this.link.id);

      var mythis = this;

      inpSubProp.click(function (d) {
        var linkid = $(this).attr('linkid');
        var link = new AskomicsGraphBuilder().getInstanciedLink(linkid);
        if ($(this).is(':checked')) {
          link.subProperty = true;
        } else {
          link.subProperty = false;
        }
        $('#' + mythis.link.getSvgLabelId()).find('textPath').attr('fill', mythis.getTextColorLabel());
        $('#' + mythis.link.getSvgLabelId()).find('textPath').text(mythis.getTextLabel());
      });

      if (this.link.subProperty) {
        inpSubProp.attr('checked', 'checked');
      }

      return inpSubProp;
    }
  }, {
    key: 'create',
    value: function create() {
      this.divPanel();
      var inpNeg = this.makeNegativeCheckBox();
      var inpTrans = this.makeTransitiveCheckBox();
      var inpSubProp = this.makeSubPropertyCheckBox();

      var listProperties = $('<div></div>').append($("<label></label>").html("Relations properties")).append($('<br>')).append($('<label></label>').append(inpTrans).append('Transitive relation')).append($('<br>')).append($('<label></label>').append(inpNeg).append('Negative relation'))
      //.append($('<br>'))
      //.append($('<label></label>').append(inpSubProp).append('rdfs:SubProperty relation'))
      ;
      this.details.append($('<hr>')).append(listProperties).append($('<hr>'));

      $("#viewDetails").append(this.details);
    }
  }]);

  return AskomicsLinkView;
}(AskomicsObjectView);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*jshint esversion: 6 */

/*
  Manage The creation, update and deletaion inside the Attributes Graph view
*/

var AskomicsNodeView = function (_AskomicsObjectView) {
  _inherits(AskomicsNodeView, _AskomicsObjectView);

  function AskomicsNodeView(node) {
    _classCallCheck(this, AskomicsNodeView);

    var _this = _possibleConstructorReturn(this, (AskomicsNodeView.__proto__ || Object.getPrototypeOf(AskomicsNodeView)).call(this, node));

    _this.node = node;
    return _this;
  }

  _createClass(AskomicsNodeView, [{
    key: 'define_context_menu',
    value: function define_context_menu() {
      var mythis = this;
      $('#node_' + this.node.id).contextmenu(function () {
        var title = '<h4>' + mythis.node.label + '<tspan font-size="5" baseline-shift="sub">' + mythis.node.getLabelIndexHtml() + '</tspan>' + '</h4>';
        var mess = "";
        $("div[id=" + AskomicsObjectView_prefix + mythis.node.id + "]").find("div[basic_type][uri]").each(function (index) {
          var sparqlid = $(this).attr('sparqlid');

          var isFiltered = sparqlid in mythis.node.filters;
          var isInversedMatch = sparqlid in mythis.node.inverseMatch;
          var isFilteredCat = 'URICat' + sparqlid in mythis.node.filters;

          if (isFiltered || isInversedMatch || isFilteredCat) {
            mess += '<h4>' + $(this).find('label').text() + '</h4>';

            if (sparqlid in mythis.node.filters) mess += '<p><pre>' + mythis.node.filters[sparqlid] + '</pre></p>';
            if ('URICat' + sparqlid in mythis.node.filters) mess += '<p><pre>' + mythis.node.filters['URICat' + sparqlid] + '</pre></p>';
            if (sparqlid in mythis.node.inverseMatch) mess += '<p><it><small>Inverse match</small><it></p>';
          }
        });

        var VarDisplay = mythis.node.getAttributesDisplaying();
        if (VarDisplay.label.length - 1 > 0) {

          mess += '<h4>Displaying attributes</h4>';
          for (var v = 0; v < VarDisplay.label.length - 1; v++) {
            mess += VarDisplay.label[v] + ",";
          }
          mess += VarDisplay.label[VarDisplay.label.length - 1];
        }

        displayModalHtml(title, mess, 'Close');
        return false;
      });
    }
  }, {
    key: 'display_help',
    value: function display_help() {
      var help_title = 'Node "' + this.node.label + '"';
      var help_str = ' Choose which attributes you want to see on the right panel.';
      help_str += ' Filter this attributes by choosing values';
      $('#help_figure').addClass("hidden");
      displayModal(help_title, help_str, 'ok');
    }
  }, {
    key: 'updateNodeView',
    value: function updateNodeView() {
      $("[constraint_node_id=" + this.node.id + "]").text(this.node.getAttributesWithConstraintsString());
    }

    /* ===============================================================================================*/

  }, {
    key: 'buildCategory',
    value: function buildCategory(attribute) {
      var labelSparqlVarId = attribute.SPARQLid;
      var URISparqlVarId = "URICat" + labelSparqlVarId;
      var inp = $("<select/>").addClass("form-control").attr("multiple", "multiple");

      displayModal('Please wait', '', 'Close');
      var tab = this.node.buildConstraintsGraphForCategory(attribute.id);

      inp.attr("list", "opt_" + labelSparqlVarId).attr("sparqlid", URISparqlVarId);

      var service = new RestServiceJs("sparqlquery");
      var model = {
        'variates': tab[0],
        'constraintesRelations': tab[1],
        'limit': 100,
        'export': false
      };

      var mythis = this;
      //  console.log(attribute.uri);
      service.post(model, function (d) {
        var selectedValue = "";
        if (labelSparqlVarId in mythis.node.values) {
          selectedValue = mythis.node.values[labelSparqlVarId];
        }
        /* bubble sort */
        var isNotSort = true;
        while (isNotSort) {
          isNotSort = false;
          for (var i = 0; i < d.values.length - 1; i++) {
            if (d.values[i][URISparqlVarId] > d.values[i + 1][URISparqlVarId]) {
              var a = d.values[i];
              d.values[i] = d.values[i + 1];
              d.values[i + 1] = a;
              isNotSort = true;
            }
          }
        }

        var sizeSelect = 3;
        if (d.values.length < 3) sizeSelect = d.values.length;
        if (d.values.length === 0) sizeSelect = 1;
        inp.attr("size", sizeSelect);
        if (d.values.length > 1) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = d.values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var v = _step.value;

              if (selectedValue == v[labelSparqlVarId]) {
                inp.append($("<option></option>").attr("value", v[URISparqlVarId]).attr("selected", "selected").append(v[labelSparqlVarId]));
              } else {
                inp.append($("<option></option>").attr("value", v[URISparqlVarId]).append(v[labelSparqlVarId]));
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        } else if (d.values.length == 1) {
          inp.append($("<option></option>").attr("value", d.values[0][URISparqlVarId]).append(d.values[0][labelSparqlVarId]));
        }
        hideModal();
      });

      inp.change(function (d) {
        var value = $(this).val();
        if (!value) value = '';
        var sparqlid = $(this).attr('sparqlid');

        if (sparqlid === undefined) {
          throw new Error("AskomicsNodeView: can not reach sparqlid attribute!");
        }

        var listValue = "";
        for (var i = 0; i < value.length; i++) {
          listValue += "<" + value[i] + "> ";
        }
        mythis.node.setFilterAttributes(sparqlid, value, 'VALUES ?' + sparqlid + ' { ' + listValue + '}');
        mythis.updateNodeView();
      });

      return inp;
    }

    /* ===============================================================================================*/

  }, {
    key: 'buildDecimal',
    value: function buildDecimal(attribute) {
      var labelSparqlVarId = attribute.SPARQLid;

      var inputValue = "";
      var selectedOpValue = "";

      var inp = $("<table></table>");
      if ('op_' + labelSparqlVarId in this.node.values) {
        selectedOpValue = this.node.values['op_' + labelSparqlVarId];
      }
      if (labelSparqlVarId in this.node.values) {
        inputValue = this.node.values[labelSparqlVarId];
      }

      var v = $("<select></select>").addClass("form-control").attr("sparqlid", labelSparqlVarId);
      var t = void 0;
      t = $("<option></option>").attr("value", '=').append('=');
      if (selectedOpValue == '=') t.attr("selected", "selected");
      v.append(t);
      t = $("<option></option>").attr("value", '<').append('<');
      if (selectedOpValue == '<') t.attr("selected", "selected");
      v.append(t);
      t = $("<option></option>").attr("value", '<=').append('<=');
      if (selectedOpValue == '<=') t.attr("selected", "selected");
      v.append(t);
      t = $("<option></option>").attr("value", '>').append('>');
      if (selectedOpValue == '>') t.attr("selected", "selected");
      v.append(t);
      t = $("<option></option>").attr("value", '>=').append('>=');
      if (selectedOpValue == '>=') t.attr("selected", "selected");
      v.append(t);
      t = $("<option></option>").attr("value", '!=').append('!=');
      if (selectedOpValue == '!=') t.attr("selected", "selected");
      v.append(t);

      var tr = $("<tr></tr>");
      tr.append($("<td></td>").append(v));

      v = $('<input type="text" class="form-control"/>').attr("id", attribute.id);
      v.val(inputValue);

      tr.append($("<td></td>").append(v));
      inp.append(tr);

      var mythis = this;

      inp.change(function (d) {
        var op = $(this).find("option:selected").text();
        var value = $(this).find('input').val();

        if (!$.isNumeric(value)) {
          displayModal("'" + value + "' is not a numeric value !", '', 'Close');
          value = $(this).find('input').val(null);
          return;
        }

        var sparlid = $(this).find('select').attr('sparqlid');

        mythis.node.setFilterAttributes(sparlid, value, 'FILTER ( ?' + sparlid + ' ' + op + ' ' + value + ')');
        mythis.node.setFilterAttributes("op_" + sparlid, op, '');
        mythis.updateNodeView();
      });
      return inp;
    }
  }, {
    key: 'changeFilter',
    value: function changeFilter(sparqlid, value) {
      if (!this.node.isRegexpMode(sparqlid)) {
        this.node.setFilterAttributes(sparqlid, value, 'FILTER ( ?' + sparqlid + ' = "' + value + '" )');
      } else {
        this.node.setFilterAttributes(sparqlid, value, 'FILTER ( regex(str(?' + sparqlid + '), "' + value + '", "i" ))');
      }
    }

    /* ===============================================================================================*/

  }, {
    key: 'buildString',
    value: function buildString(SPARQLid) {
      var inputValue = "";

      if (SPARQLid in this.node.values) {
        inputValue = this.node.values[SPARQLid];
      }

      var inp = $("<input/>").attr("sparqlid", SPARQLid).attr("type", "text").val(inputValue).addClass("form-control");

      var mythis = this;

      inp.change(function (d) {
        var value = $(this).val();
        var sparqlid = $(this).attr('sparqlid');

        mythis.changeFilter(sparqlid, value);
        mythis.updateNodeView();
      });
      return inp;
    }

    /*
      Build select list to link with an other variable in the graph
    */

  }, {
    key: 'buildLinkVariable',
    value: function buildLinkVariable(curAtt) {
      var inp = $("<select/>").attr("linkvar", "true").attr("sparqlid", curAtt.SPARQLid).attr("type", "list").addClass("form-control").hide();

      /* Default */
      inp.append($('<option></option>').prop('disabled', true).prop('selected', true).html("Link with an attribute node..."));

      var mythis = this;
      /* rebuild list when this option is selected */
      inp.focus(function (d) {
        /* Remove all childs */
        $(this).empty();
        /* Default */
        $(this).append($('<option></option>').prop('disabled', true).prop('selected', true).html("Link with an attribute node..."));
        /* check if query was upload, if a selected value exist */
        var sparqlIdisSelected = mythis.node.values[curAtt.SPARQLid] !== undefined;
        var sparqlIdSelected = "";
        if (sparqlIdisSelected) {
          sparqlIdSelected = mythis.node.values[curAtt.SPARQLid];
        }
        /* set up the list with possible entities to link */

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = new AskomicsGraphBuilder().nodes()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var n = _step2.value;

            var attributes = new AskomicsUserAbstraction().getAttributesWithURI(n.uri);
            var firstPrintForThisNode = true;
            /* Manage Link node id  */
            if (n.id != curAtt.id) {

              inp.append($('<option></option>').prop('disabled', true).html("<b><i> --- " + n.formatInHtmlLabelEntity() + " --- </i></b>"));
              firstPrintForThisNode = false;
              //ID Label is a string
              if (!('type' in curAtt) || "string" == curAtt.basic_type) {
                // if not, it's a NODE ID

                var option = $('<option></option>').attr("value", n.SPARQLid).attr("type", "string").html(n.label).attr("nodeAttLink", n.id);
                if (sparqlIdSelected == n.SPARQLid) option.prop('selected', true);
                inp.append(option);
              }
            }

            /* Manage Attributes */
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = attributes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var a = _step3.value;

                var att = n.getAttributeOrCategoryForNode(a);
                /* we can not link the attribute with himself */
                if (att.id == curAtt.id) continue;

                if ('type' in curAtt) {
                  /* we can not link attributes with diffente type */
                  if (att.basic_type != curAtt.basic_type) continue;
                } else {
                  // It's a node ID
                  if (att.basic_type != "string") continue;
                }
                if (firstPrintForThisNode) {
                  inp.append($('<option></option>').prop('disabled', true).html("<b><i> --- " + n.formatInHtmlLabelEntity() + " --- </i></b>"));
                  firstPrintForThisNode = false;
                }

                var _option = $('<option></option>').attr("value", att.SPARQLid).attr("type", att.basic_type).html(att.label).attr("nodeAttLink", n.id);

                if (sparqlIdSelected == att.SPARQLid) _option.prop('selected', true);
                inp.append(_option);
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      });

      /* set up when var is clicked */
      inp.change(function (d) {
        var attLink = $(this).find("option:selected").attr("value");
        var type = $(this).find("option:selected").attr("type");
        var nodeAttLink = $(this).find("option:selected").attr("nodeAttLink");
        var sparlidCurrentAtt = $(this).attr('sparqlid');

        if (nodeAttLink === undefined) return;

        var node2 = new AskomicsGraphBuilder().getInstanciedNode(nodeAttLink);

        if (type == "category") {
          mythis.node.setFilterLinkVariable('URICat' + sparlidCurrentAtt, node2, 'URICat' + attLink);
        } else {
          mythis.node.setFilterLinkVariable(sparlidCurrentAtt, node2, attLink);
        }
        mythis.updateNodeView();
      });

      return inp;
    }

    //Check if a value is in the input / selcet

  }, {
    key: 'haveSelectionUserValue',
    value: function haveSelectionUserValue(currentIcon) {
      //filter on node.values does not work (event change is not call if user click just after to fill input box)
      var hasSelection = false;
      var lv = $(currentIcon).parent().find('input');
      if (lv.length > 0) if (typeof lv.val() == "string") hasSelection = lv.val() !== "";
      //console.log($(currentIcon).parent().find('select').length);
      if (!hasSelection) {
        lv = $(currentIcon).parent().find('select').find(":selected");
        if (lv.length > 1) return true;
        // by default a first value with ="Link with an attribute node..."
        //if ( lv.length > 0 ) hasSelection = true;
      }
      return hasSelection;
    }

    // dedicated to String entry

  }, {
    key: 'makeRegExpIcon',
    value: function makeRegExpIcon(SPARQLid) {
      var icon = $('<span></span>').attr('sparqlid', SPARQLid).attr('aria-hidden', 'true').addClass('makeRegExpIcon').addClass('fa').addClass('fa-filter').addClass('display');

      var mythis = this;

      icon.click(function (d) {
        if (icon.hasClass('fa-filter')) {
          icon.removeClass('fa-filter');
          icon.addClass('fa-font');
        } else {
          icon.removeClass('fa-font');
          icon.addClass('fa-filter');
        }

        var sparqlid = $(this).attr('sparqlid');
        mythis.node.switchRegexpMode(sparqlid);
        if (sparqlid in mythis.node.values) {
          mythis.changeFilter(sparqlid, mythis.node.values[sparqlid]);
        }
      });
      return icon;
    }
    // Add attributes of the selected node on the right side of AskOmics

  }, {
    key: 'makeRemoveIcon',
    value: function makeRemoveIcon() {
      var removeIcon = $('<span"></span>').addClass('makeRemoveIcon').addClass('fa').addClass('fa-eraser').addClass('display');
      removeIcon.click(function () {
        $(this).parent().find('input[linkvar!="true"]').val(null).trigger("change");
        $(this).parent().find('select[linkvar!="true"]').val(null).trigger("change");

        /* remove linkvar if exist and reset value of the select linkvar */
        var icon = $(this).parent().find('.fa-link');
        if (icon.length > 0) {
          icon.click();
          icon.parent().find('select[linkvar="true"]').val(null);
        }
      });
      return removeIcon;
    }
  }, {
    key: 'makeEyeIcon',
    value: function makeEyeIcon(attribute) {
      // =============================================================================================
      //    Manage Attribute variate when eye is selected or deselected
      //
      var eyeLabel = attribute.actif ? 'fa-eye' : 'fa-eye-slash';
      var icon = $('<span></span>').attr('sparqlid', attribute.SPARQLid).attr('aria-hidden', 'true').addClass('fa').addClass('makeEyeIcon').addClass(eyeLabel).addClass('display');

      var mythis = this;

      // eye-close --> optional search --> exact search
      icon.click(function (d) {
        var sparqlid = $(this).attr('sparqlid');
        var hasSelection = mythis.haveSelectionUserValue(this);
        // See value of a input selection
        if (icon.hasClass('fa-eye-slash')) {
          icon.removeClass('fa-eye-slash');
          icon.addClass('fa-eye');
          mythis.node.setActiveAttribute(sparqlid, true, false);
          //
        } else if (icon.hasClass('fa-eye') && hasSelection) {
          icon.removeClass('fa-eye');
          icon.addClass('fa-eye-slash');
          mythis.node.setActiveAttribute(sparqlid, false, false);
        }
        // No filter are defined
        else if (icon.hasClass('fa-eye')) {
            icon.removeClass('fa-eye');
            icon.addClass('fa-question-circle');
            mythis.clean_box_attribute($(this).parent().parent());
            //if ( !(sparqlid in node.values) || ( node.values[sparqlid] === "" ) )
            //  displayModal("Warning", "Optional results with a selection disable the current filter !", 'ok');
            //clean the selction
            $(this).parent().find('.fa-eraser').trigger('click');
            mythis.node.setActiveAttribute(sparqlid, true, true);
            $(this).parent().find("select").hide();
            $(this).parent().find("input").hide();
            $(this).parent().find(".fa").hide();
            $(this).show();
          } else {
            icon.removeClass('fa-question-circle');
            icon.addClass('fa-eye-slash');

            if ($(this).parent().find('.fa-link').length > 0) {
              $(this).parent().find('select[linkvar="true"]').show();
            } else {
              $(this).parent().find('select[linkvar!="true"]').show();
              $(this).parent().find('input[linkvar!="true"]').show();
            }
            $(this).parent().find(".fa").show();
            mythis.node.setActiveAttribute(sparqlid, false, false);
          }
        mythis.updateNodeView();
      });
      return icon;
    }

    // dedicated to String entry

  }, {
    key: 'makeNegativeMatchIcon',
    value: function makeNegativeMatchIcon(SPARQLid) {
      var icon = $('<span></span>').attr('sparqlid', SPARQLid).attr('aria-hidden', 'true').addClass('makeNegativeMatchIcon').addClass('fa').addClass('fa-plus').addClass('display');

      var mythis = this;

      icon.click(function (d) {
        var sparqlid = $(this).attr('sparqlid');
        var hasSelection = mythis.haveSelectionUserValue(this);

        /*
        Confugisng Functionality...waitin reflexion....
        */
        //if (icon.hasClass('fa-plus') && hasSelection ) {
        //icon.removeClass('fa-plus');
        //icon.addClass('fa-minus');
        //mythis.node.inverseMatch[sparqlid] = 'inverseWithExistingRelation';
        //} else if (icon.hasClass('fa-plus')) {
        if (icon.hasClass('fa-plus')) {
          icon.removeClass('fa-plus');
          icon.addClass('fa-search-minus');
          mythis.node.inverseMatch[sparqlid] = 'inverseWithNoRelation';
        } else if (icon.hasClass('fa-minus')) {
          icon.removeClass('fa-minus');
          icon.addClass('fa-search-minus');
          mythis.node.inverseMatch[sparqlid] = 'inverseWithNoRelation';
        } else {
          icon.removeClass('fa-search-minus');
          icon.addClass('fa-plus');
          delete mythis.node.inverseMatch[sparqlid];
        }
        mythis.updateNodeView();
      });
      return icon;
    }

    // dedicated to String entry

  }, {
    key: 'makeLinkVariableIcon',
    value: function makeLinkVariableIcon(SPARQLid) {
      var icon = $('<span></span>').attr('sparqlid', SPARQLid).attr('aria-hidden', 'true').addClass('makeLinkVariableIcon').addClass('fa').addClass('fa-chain-broken').addClass('display');

      var mythis = this;

      icon.click(function (d) {
        if (icon.hasClass('fa-chain-broken')) {
          icon.removeClass('fa-chain-broken');
          icon.addClass('fa-link');
          $(this).parent().find('input[linkvar!="true"]').hide();
          $(this).parent().find('select[linkvar!="true"]').hide();
          $(this).parent().find('select[linkvar="true"]').show();
        } else {
          var sparqlid = $(this).attr('sparqlid');
          icon.removeClass('fa-link');
          icon.addClass('fa-chain-broken');
          $(this).parent().find('input[linkvar!="true"]').show();
          $(this).parent().find('select[linkvar!="true"]').show();
          $(this).parent().find('select[linkvar="true"]').hide();
          mythis.node.removeFilterLinkVariable(sparqlid);
          mythis.updateNodeView();
        }
      });
      return icon;
    }
  }, {
    key: 'clean_icon',
    value: function clean_icon(div_attribute, classIcon, defaultIcon) {

      while (!div_attribute.find("." + classIcon).hasClass(defaultIcon)) {
        div_attribute.find("." + classIcon).trigger('click');
      }
    }
  }, {
    key: 'clean_box_attribute',
    value: function clean_box_attribute(div_attribute) {

      var classIcon = "makeLinkVariableIcon";
      var defaultIcon = "fa-chain-broken";
      this.clean_icon(div_attribute, classIcon, defaultIcon);

      classIcon = "makeNegativeMatchIcon";
      defaultIcon = "fa-plus";
      this.clean_icon(div_attribute, classIcon, defaultIcon);

      this.makeRemoveIcon();
    }
  }, {
    key: 'countNodeInservice',
    value: function countNodeInservice(service, urinode, option) {
      var req = 'PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#>\n\nselect distinct count(?elt) as ?c {\n  SERVICE <' + service + '> {\n     ?elt rdf:type ?elt_SubClassOf.\n     ?elt_SubClassOf rdfs:subClassOf* <' + urinode + '>.\n  }\n}';

      var conf = {};
      conf.endpoint = new TriplestoreParametersView().configuration('endpoint');
      $.sparqlrequest(conf, req, function (data) {
        var results = data.results.bindings;
        var numberOfNodeAvailInService = results[0].c.value;
        console.log(service + ' count===>' + numberOfNodeAvailInService);

        if (parseInt(numberOfNodeAvailInService) === 0) {
          option.prop('disabled', true);
        }

        option.text(option.text() + "(" + numberOfNodeAvailInService + ")");
      });
    }

    /* ===============================================================================================*/

  }, {
    key: 'create',
    value: function create() {
      var mythis = this;
      var node = this.node;

      var listRS = new AskomicsUserAbstraction().getServices();
      var curService = new AskomicsUserAbstraction().getCurrentService();

      var selectRemoteService = $('<select>').attr("urinode", node.uri).attr("uri", node.uri);

      selectRemoteService.append($("<option/>").attr("value", new AskomicsUserAbstraction().endpoint).text("User endpoint"));

      for (var opt in listRS) {
        var option = $("<option/>").attr("value", listRS[opt]).text(opt);
        this.countNodeInservice(listRS[opt], node.uri, option);
        if (curService === listRS[opt]) {
          mythis.node.service = curService;
          option.attr('selected', 'selected');
        }
        selectRemoteService.append(option);
      }

      selectRemoteService.change(function (d) {
        var url = $(this).val();
        /* change the service node */
        if (url === new AskomicsUserAbstraction().endpoint) {
          mythis.node.service = "";
        } else {
          mythis.node.service = url;
        }
        /* future node will be initiaized with this url */
        new AskomicsUserAbstraction().setCurrentService(url);
      });

      this.divPanelUlSortable();
      mythis.details.append(selectRemoteService);

      /* Label Entity as ID attribute */
      //let lab = $("<label></label>").attr("for",elemId).html(node.label);
      var lab = $("<label></label>").attr("urinode", node.uri).attr("uri", node.uri).attr("for", node.label).html(node.label);
      node.switchRegexpMode(node.SPARQLid);

      new AskomicsUserAbstraction().getDatatypePropertyofEntity(node.uri, function (attributes) {

        console.log("====================================================================");

        $.each(attributes, function (i) {
          var attribute = node.getAttributeOrCategoryForNode(attributes[i]);
          console.log("ATTRIBUTES:" + JSON.stringify(attribute));
          var lab = $("<label></label>").attr("uri", attribute.uri).attr("for", attribute.label).text(attribute.label);

          if (attribute.basic_type == "category") {
            /* RemoveIcon, EyeIcon, Attribute IHM */
            mythis.addPanel($('<div></div>').attr("id", attribute.id).attr("sparqlid", attribute.SPARQLid).attr("uri", attribute.uri).attr("basic_type", attribute.basic_type).append(lab).append(mythis.makeRemoveIcon()).append(mythis.makeEyeIcon(attribute)).append(mythis.makeNegativeMatchIcon('URICat' + attribute.SPARQLid)).append(mythis.makeLinkVariableIcon('URICat' + attribute.SPARQLid)).append(mythis.buildCategory(attribute)).append(mythis.buildLinkVariable(attribute)));
          } else if (attribute.basic_type == "decimal") {
            /* RemoveIcon, EyeIcon, Attribute IHM */
            mythis.addPanel($('<div></div>').append(lab).attr("id", attribute.id).attr("sparqlid", attribute.SPARQLid).attr("uri", attribute.uri).attr("basic_type", attribute.basic_type).append(mythis.makeRemoveIcon()).append(mythis.makeEyeIcon(attribute)).append(mythis.makeNegativeMatchIcon(attribute.SPARQLid)).append(mythis.makeLinkVariableIcon(attribute.SPARQLid)).append(mythis.buildDecimal(attribute)).append(mythis.buildLinkVariable(attribute)));
          } else if (attribute.basic_type == "string") {
            node.switchRegexpMode(attribute.SPARQLid);
            /* RemoveIcon, EyeIcon, Attribute IHM */
            mythis.addPanel($('<div></div>').append(lab).attr("id", attribute.id).attr("sparqlid", attribute.SPARQLid).attr("uri", attribute.uri).attr("basic_type", attribute.basic_type).append(mythis.makeRemoveIcon()).append(mythis.makeEyeIcon(attribute)).append(mythis.makeRegExpIcon(attribute.SPARQLid)).append(mythis.makeNegativeMatchIcon(attribute.SPARQLid)).append(mythis.makeLinkVariableIcon(attribute.SPARQLid)).append(mythis.buildString(attribute.SPARQLid)).append(mythis.buildLinkVariable(attribute)));
          } else {
            throw _typeof(this) + "::create . Unknown type attribute:" + attribute.basic_type;
          }
          //$('#waitModal').modal('hide');
        });
        //TODO: set a method in super class
        $("#viewDetails").append(mythis.details);
      });
    }
  }]);

  return AskomicsNodeView;
}(AskomicsObjectView);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*jshint esversion: 6 */

/*
  Manage Information Link View With a current selected link
*/
var AskomicsPositionableLinkView = function (_AskomicsObjectView) {
  _inherits(AskomicsPositionableLinkView, _AskomicsObjectView);

  function AskomicsPositionableLinkView(link) {
    _classCallCheck(this, AskomicsPositionableLinkView);

    var _this = _possibleConstructorReturn(this, (AskomicsPositionableLinkView.__proto__ || Object.getPrototypeOf(AskomicsPositionableLinkView)).call(this, link));

    _this.link = link;
    return _this;
  }

  _createClass(AskomicsPositionableLinkView, [{
    key: 'display_help',
    value: function display_help() {
      var help_title = 'Positionable link ' + this.link.label;
      var help_str = 'There is a relation of position between ' + this.link.source.label + ' and ' + this.link.target.label + '.';
      help_str += ' You can choose different kind of positionable relation.';
      help_str += 'This relations are explained on the following figure:';
      $('#help_figure').attr('src', '/static/images/positionable.png').attr('alt', 'positionable').css('width', '650px');
      $('#help_figure').removeClass("hidden");
      displayModal(help_title, help_str, 'ok');
    }
  }, {
    key: 'changeType',
    value: function changeType(type) {
      // remove link
      var id = this.link.id;
      $('#' + id).remove(); // link
      $('#' + GraphObject.getSvgLabelPrefix() + id).remove(); // link label
      $('#marker-' + id).remove(); // arrow

      // change link type and label
      this.link.type = type;
      var labels = { 'included': 'included in', 'excluded': 'exluded of', 'overlap': 'overlap with', 'near': 'near' };
      this.link.label = labels[type];

      // If overlap, don't show reverse query (it is the same)
      if (type == 'overlap') {
        $('#change_dir-div-' + id).hide();
      } else {
        if ($('#change_dir-div-' + id).is(":hidden")) {
          $('#change_dir-div-' + id).show();
        }
      }

      // reload graph (it will recreate the link)
      forceLayoutManager.update();
      //select the link
      forceLayoutManager.setSelectLink(this.link);
    }
  }, {
    key: 'reverseDir',
    value: function reverseDir() {

      // remove rightview
      this.remove();

      // remove link
      var id = this.link.id;
      var linkid = $('#' + id).attr("idlink");

      $('#' + id).remove(); // link
      $('#' + GraphObject.getSvgLabelPrefix() + id).remove(); // link label
      $('#marker-' + id).remove(); // arrow

      // swap target and source
      var buf = this.link.source;
      this.link.source = this.link.target;
      this.link.target = buf;

      // new rightview for the reverse link
      this.create();

      // reload graph (it will recreate the link)
      forceLayoutManager.update();
      //select the link
      forceLayoutManager.setSelectLink(this.link);
    }
  }, {
    key: 'changeStrict',
    value: function changeStrict(strict) {
      this.link.strict = strict;
    }
  }, {
    key: 'changeSameTax',
    value: function changeSameTax(same_tax) {
      this.link.same_tax = same_tax;
    }
  }, {
    key: 'changeSameRef',
    value: function changeSameRef(same_ref) {
      this.link.same_ref = same_ref;
    }
  }, {
    key: 'changeStrand',
    value: function changeStrand(strand) {
      this.link.which_strand = strand;
    }
  }, {
    key: 'create',
    value: function create() {
      var id_link = this.link.id;
      var elemUri = this.link.uri;

      this.divPanel();

      var reverseArrow = $('<div></div>').attr('id', 'change_dir-div-' + id_link).append($('<span><span>').attr('class', 'glyphicon glyphicon-resize-horizontal').attr('aria-hidden', 'true').attr('id', 'change_dir-' + id_link)).append('Reverse direction');

      var select = $('<select></select>').attr('id', 'type-' + id_link);

      // Uncomment near when near query is OK
      var types = { 'included': 'included in', 'excluded': 'excluded of', 'overlap': 'overlap with' /*, 'near': 'near'*/ };

      for (var key in types) {
        if (this.type == key) {
          select.append($('<option></option>').attr("value", key).attr("selected", "selected").append(types[key]));
        } else {
          select.append($('<option></option>').attr("value", key).append(types[key]));
        }
      }

      var relation = $("<div></div>").append(this.link.source.formatInHtmlLabelEntity()).append(select).append(this.link.target.formatInHtmlLabelEntity());

      var checkbox_sameref;
      var checkbox_sametax;
      var checkbox_samestrand;
      var radio_samestrand;

      if (this.link.position_ref) {
        if (this.link.same_ref) {
          checkbox_sameref = $('<label></label>').attr('id', 'reflab-' + id_link).append($('<input>').attr('type', 'checkbox').attr('id', 'ref-' + id_link).attr('checked', 'checked')).append('Reference');
        } else {
          checkbox_sameref = $('<label></label>').attr('id', 'reflab-' + id_link).append($('<input>').attr('type', 'checkbox').attr('id', 'ref-' + id_link)).append('Reference');
        }

        checkbox_sameref.change(function () {
          if ($('#ref-' + id_link).is(':checked')) {
            view.changeSameRef(true);
          } else {
            view.changeSameRef(false);
          }
        });
      } else {
        checkbox_sameref = '';
      }

      if (this.link.position_taxon) {
        if (this.link.same_tax) {
          checkbox_sametax = $('<label></label>').attr('id', 'taxlab-' + id_link).append($('<input>').attr('type', 'checkbox').attr('id', 'tax-' + id_link).attr('checked', 'checked')).append('Taxon');
        } else {
          checkbox_sametax = $('<label></label>').attr('id', 'taxlab-' + id_link).append($('<input>').attr('type', 'checkbox').attr('id', 'tax-' + id_link)).append('Taxon');
        }

        checkbox_sametax.change(function () {
          if ($('#tax-' + id_link).is(':checked')) {
            view.changeSameTax(true);
          } else {
            view.changeSameTax(false);
          }
        });
      } else {
        checkbox_sametax = '';
      }

      if (this.link.position_strand) {
        if (this.link.which_strand == 'same') {
          radio_samestrand = $('<div></div>').attr('id', 'div_strand-' + id_link).append('Strand:').append('<br>').append($('<input>').attr('id', 'both_strand-' + id_link).attr('type', 'radio').attr('name', 'strand-' + id_link).attr('value', 'both')).append('both').append('<br>').append($('<input>').attr('id', 'same_strand-' + id_link).attr('type', 'radio').attr('name', 'strand-' + id_link).attr('value', 'same').attr('checked', 'checked')).append('same').append('<br>').append($('<input>').attr('id', 'opp_strand-' + id_link).attr('type', 'radio').attr('name', 'strand-' + id_link).attr('value', 'opp')).append('opposite').append('<br>');
        } else if (this.link.which_strand == 'opp') {
          radio_samestrand = $('<div></div>').attr('id', 'div_strand-' + id_link).append('Strand:').append('<br>').append($('<input>').attr('id', 'both_strand-' + id_link).attr('type', 'radio').attr('name', 'strand-' + id_link).attr('value', 'both')).append('both').append('<br>').append($('<input>').attr('id', 'same_strand-' + id_link).attr('type', 'radio').attr('name', 'strand-' + id_link).attr('value', 'same')).append('same').append('<br>').append($('<input>').attr('id', 'opp_strand-' + id_link).attr('type', 'radio').attr('name', 'strand-' + id_link).attr('value', 'opp').attr('checked', 'checked')).append('opposite').append('<br>');
        } else {
          // 'both'
          radio_samestrand = $('<div></div>').attr('id', 'div_strand-' + id_link).append('Strand:').append('<br>').append($('<input>').attr('id', 'both_strand-' + id_link).attr('type', 'radio').attr('name', 'strand-' + id_link).attr('value', 'both').attr('checked', 'checked')).append('both').append('<br>').append($('<input>').attr('id', 'same_strand-' + id_link).attr('type', 'radio').attr('name', 'strand-' + id_link).attr('value', 'same')).append('same').append('<br>').append($('<input>').attr('id', 'opp_strand-' + id_link).attr('type', 'radio').attr('name', 'strand-' + id_link).attr('value', 'opp')).append('opposite').append('<br>');
        }
        // Onchange function for strand
        radio_samestrand.change(function () {
          var value = $('input[name=strand-' + id_link + ']:checked', '#div_strand-' + id_link).val();
          view.changeStrand(value);
        });
      } else {
        radio_samestrand = '';
      }

      var onTheSame = $('<div></div>').append('On the same:').append($('<br>')).append(checkbox_sameref).append($('<br>')).append(checkbox_sametax).append($('<hr>')).append(checkbox_samestrand).append(radio_samestrand);
      var strict;

      if (this.link.strict) {
        strict = $('<div></div>').append($('<label></label>').append($('<input>').attr('type', 'checkbox').attr('checked', 'checked').attr('id', 'strict-' + id_link).attr('value', 'strict')).append('Strict'));
      } else {
        strict = $('<div></div>').append($('<label></label>').append($('<input>').attr('type', 'checkbox').attr('id', 'strict-' + id_link).attr('value', 'strict')).append('Strict'));
      }

      this.details //.append(reverseArrow)
      .append(relation).append(reverseArrow).append($('<hr>')).append(onTheSame).append($('<hr>')).append(strict);

      var view = this;

      select.change(function () {
        var value = select.val();
        view.changeType(value);
      });

      strict.change(function () {
        if ($('#strict-' + id_link).is(':checked')) {
          view.changeStrict(true);
        } else {
          view.changeStrict(false);
        }
      });

      reverseArrow.click(function () {
        view.reverseDir();
      });

      $("#viewDetails").append(this.details);
    }
  }]);

  return AskomicsPositionableLinkView;
}(AskomicsObjectView);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*jshint esversion: 6 */

/*
  Manage Information Link View With a current selected link
*/
var AskomicsPositionableNodeView = function (_AskomicsNodeView) {
  _inherits(AskomicsPositionableNodeView, _AskomicsNodeView);

  function AskomicsPositionableNodeView(node) {
    _classCallCheck(this, AskomicsPositionableNodeView);

    return _possibleConstructorReturn(this, (AskomicsPositionableNodeView.__proto__ || Object.getPrototypeOf(AskomicsPositionableNodeView)).call(this, node));
  }

  _createClass(AskomicsPositionableNodeView, [{
    key: 'display_help',
    value: function display_help() {
      var help_title = 'positionable node ' + this.node.label;
      var help_str = this.node.label + ' is a positionable node. You can click on the positionable link to change the query.';
      help_str += ' Choose which attributes you want to see on the right panel.';
      help_str += ' Filter this attributes by choosing values';
      displayModal(help_title, help_str, 'ok');
    }
  }]);

  return AskomicsPositionableNodeView;
}(AskomicsNodeView);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*jshint esversion: 6 */

/*

*/
var GOLinkView = function (_AskomicsObjectView) {
  _inherits(GOLinkView, _AskomicsObjectView);

  function GOLinkView(node) {
    _classCallCheck(this, GOLinkView);

    return _possibleConstructorReturn(this, (GOLinkView.__proto__ || Object.getPrototypeOf(GOLinkView)).call(this, node));
  }

  _createClass(GOLinkView, [{
    key: 'display_help',
    value: function display_help() {
      var help_title = 'todo';
      var help_str = 'todo';
      displayModal(help_title, help_str, 'ok');
    }
  }, {
    key: 'create',
    value: function create() {}
  }]);

  return GOLinkView;
}(AskomicsObjectView);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*jshint esversion: 6 */
/*jshint multistr:true */
/*

*/
//var datalist_go_description_upload = false;

var GONodeView = function (_AskomicsNodeView) {
  _inherits(GONodeView, _AskomicsNodeView);

  function GONodeView(node) {
    _classCallCheck(this, GONodeView);

    var _this = _possibleConstructorReturn(this, (GONodeView.__proto__ || Object.getPrototypeOf(GONodeView)).call(this, node));

    _this.lastValueFiler = "";
    return _this;
  }

  _createClass(GONodeView, [{
    key: 'display_help',
    value: function display_help() {
      var help_title = 'todo';
      var help_str = 'todo';
      displayModal(help_title, help_str, 'ok');
    }
  }, {
    key: 'upload_go_description',
    value: function upload_go_description(id_input, filterStr) {
      /* load once time for all GO node */
      if (filterStr === undefined) return;
      if (filterStr.length < new GOParametersView().config.number_char_search_allow.length) return;

      $('#matchGoValue').remove();
      /* General datalist available for all GOnode */
      var datalist = $('<datalist>').attr('id', 'matchGoValue');

      //let tab = this.objet.buildListOfGODescriptionsSPARQL(filterStr);
      var spq = $.sparql(new TriplestoreParametersView().configuration('endpoint'));
      var service = new AskomicsUserAbstraction().getAttribEntity(new AskomicsUserAbstraction().longRDF("go:term"), new AskomicsUserAbstraction().longRDF("askomicsns:hasUrlExternalService"));

      spq.prefix("askomicsns", new AskomicsUserAbstraction().getPrefix("askomicsns")).prefix("rdfs", new AskomicsUserAbstraction().getPrefix("rdfs")).select(["?goid", "?description", "?oboid"]).service(service).where("?oboid", "rdfs:label", "?description").where("<http://www.geneontology.org/formats/oboInOwl#id>", "?goid").filter("regex(str(?description), \"" + filterStr + "\", \"i\" ) ").limit(100);

      var query = spq.serialiseQuery();
      console.log(query);
      spq.execute(function (results) {
        datalist.empty();
        for (var elt in results) {

          datalist.append($('<option>').attr('goid', results[elt].goid).attr('oboid', results[elt].oboid.uri).attr('value', results[elt].goid + " - " + results[elt].description));
        }
      });

      $("#viewDetails").append(datalist);
      $("#viewDetails").show();
    }
  }, {
    key: 'createDivGlobalSearch',
    value: function createDivGlobalSearch() {
      var lab = $("<label></label>").attr("for", this.objet.uri).html("Description filtering");

      var sparqlId = "desc" + this.objet.SPARQLid;
      /* search input */
      var inp = $("<input/>").addClass("form-control").attr("type", "text").attr("placeholder", "Search...").attr('required', 'required').attr('list', 'matchGoValue').attr("id", "goinput_" + sparqlId);

      /* button to add filter */
      var button_add = $("<input/>").addClass("form-control").attr("id", "button_go_" + sparqlId).attr("sparqlId", sparqlId).attr("type", "button").attr("value", "add to filter");
      /* Filter list */
      var titleFilter = $("<label></label>").html('Filters');
      var listFilter = $('<ul></ul>').addClass("list-group").attr("id", "gofilterlist_" + sparqlId);

      var currentView = this;

      inp.keyup(function (d) {
        // when arrow is pressed, no action to avoid querying for nothing...
        //if (d.keyCode >= 37 && d.keyCode <= 40) return;

        var valueFilter = $(this).val();
        if (currentView.lastValueFiler === valueFilter) return;
        currentView.lastValueFiler = valueFilter;
        if (valueFilter === undefined || valueFilter.length < new GOParametersView().config.number_char_search_allow) {
          $("#button_go_" + sparqlId).attr('disable', true);
          return;
        }

        currentView.upload_go_description("#button_go_" + sparqlId, valueFilter);
        $("#button_go_" + sparqlId).attr('disable', false);
      });

      button_add.on('click', function (e) {
        var sparqlid = $(this).attr("sparqlid");
        if (sparqlid === undefined) {
          console.error("Can not find attribute ID ");
          return;
        }
        var valueSel = $('#goinput_' + sparqlid).val();
        if (valueSel === undefined) {
          console.error("Can not find input search text GO id: goinput_" + sparqlId);
          return;
        }
        var filterList = $("#gofilterlist_" + sparqlId);
        if (filterList === undefined) {
          console.error("Can not find Filter list id: gofilterlist_" + sparqlId);
          return;
        }
        var exp = /GO:\d+/i;
        var tabGO = exp.exec(valueSel);

        var goid = "";

        if (tabGO !== null && tabGO.length > 0) {
          goid = tabGO[0];
        }

        if (goid === "") {
          alert("Input expression have to contains a GO id.");
          return;
        }

        /* check if exist in the selected list */
        var goid_exist = filterList.find("li[goid='" + goid + "']").attr('goid');
        /* no need to add in the list */
        if (goid_exist === goid) return;

        /* set up the node */
        var nodeid = $(this).parent().attr("nodeid");
        var oboid = $("#viewDetails").find("#matchGoValue option[goid='" + goid + "']").attr('oboid');
        if (oboid === undefined) {
          alert("GOID Unknown:" + goid);
          return;
        }
        var node = new AskomicsGraphBuilder().getInstanciedNode(nodeid);
        node.addOboIdFilter(oboid);

        /* Add to Html Filter list */
        var li = $('<li></li>').addClass('list-group-item').attr('nodeid', nodeid).attr('goid', goid) // need to know if the GO is selectioned previouly
        .attr('oboid', oboid) // need to set up the filter to build sparql query
        .html(valueSel);

        var iconRemove = $('<span></span>').attr('aria-hidden', 'true').addClass('glyphicon').addClass('glyphicon-remove-sign').addClass('display').on('click', function (e) {
          var nodeid = $(this).parent().attr("nodeid");
          var oboid = $(this).parent().attr("oboid");
          var node = new AskomicsGraphBuilder().getInstanciedNode(nodeid);
          node.deleteOboIdFilter(oboid);
          $(this).parent().remove();
        });
        li.append(iconRemove);
        filterList.append(li);
      });

      var div = $("<div></div>").attr("id", "globalSearch_go").attr("gonodeid", this.objet.id);

      div.append(lab).append(inp).append(button_add).append(titleFilter).append(listFilter);

      div.show();

      return div;
    }
  }, {
    key: 'createDivJsTreeSearch',
    value: function createDivJsTreeSearch() {
      /***********************************************/
      /* JSTree */

      var div_jstree = $("<div>").attr("id", "jstree_go").attr("gonodeid", this.objet.id);

      div_jstree.on('changed.jstree', function (e, data) {
        var i,
            j,
            r = [];

        // Only one select when expand a node tree
        for (i = 0, j = data.selected.length; i < j; i++) {
          // no need to expand (already done)
          if (data.instance.get_node(data.selected[i]).children !== undefined && data.instance.get_node(data.selected[i]).children.length > 0) continue;

          var spq = $.sparql(new TriplestoreParametersView().configuration('endpoint'));
          var service = new AskomicsUserAbstraction().getAttribEntity(new AskomicsUserAbstraction().longRDF("go:term"), new AskomicsUserAbstraction().longRDF("askomicsns:hasUrlExternalService"));

          spq.prefix("rdfs", new AskomicsUserAbstraction().getPrefix("rdfs")).prefix("rdf", new AskomicsUserAbstraction().getPrefix("rdf")).prefix("xsd", new AskomicsUserAbstraction().getPrefix("xsd")).select(["?goid_child", "?label_child"]).service(service).where("?oboid_root", "<http://www.geneontology.org/formats/oboInOwl#id>", "?goid_root").values("?goid_root", ["\"" + data.instance.get_node(data.selected[i]).id + "\"^^xsd:string"]).where("?oboid_child", "rdfs:subClassOf", "?oboid_root").where("rdfs:label", "?label_child").where("<http://www.geneontology.org/formats/oboInOwl#id>", "?goid_child").distinct();

          var query = spq.serialiseQuery();
          //console.log(query);
          spq.execute(expand_jtree, data.instance.get_node(data.selected[i]).id);

          // unselect parent
          //console.log(JSON.stringify(data.instance.get_node(data.selected[i])));
          if (data.instance.get_node(data.selected[i]).parents !== undefined) data.instance.deselect_node(data.instance.get_node(data.selected[i]).parents[0]);
          //unselect current node because first click load child GO terms
          //data.instance.deselect_node(data.instance.get_node(data.selected[i]));
        }

        $('#event_result').html('Selected: ' + r.join(', '));
        //************************************************************************************************************************************
      }).on('select_node.jstree deselect_node.jstree', function (e, data) {
        var gonodeid = $("#jstree_go").attr("gonodeid");
        var gonode = new AskomicsGraphBuilder().getInstanciedNode(gonodeid);
        //console.log(JSON.stringify(gonode));
        gonode.filterOnOboId.splice(0, gonode.filterOnOboId.length);
        for (var i = 0, j = data.selected.length; i < j; i++) {
          var node_sel = data.instance.get_node(data.selected[i]);
          gonode.filterOnOboId.push("http://purl.obolibrary.org/obo/" + node_sel.id.replace(":", "_"));
        }
        //************************************************************************************************************************************
      }).jstree({
        "checkbox": {
          "keep_selected_style": false,
          "tie_selection": true,
          "three_state": false,
          "whole_node": false
        },
        "plugins": ["checkbox", "wholerow", "search"],
        'core': {
          "check_callback": true,
          "open_parents": true,
          "load_open": true,
          'data': [{ "id": "GO:0008150", "parent": "#", "text": "biological process" }, { "id": "GO:0003674", "parent": "#", "text": "molecular function" }, { "id": "GO:0005575", "parent": "#", "text": "cellular component" }]
        } });

      //by default
      div_jstree.hide();
      return div_jstree;
    }

    // dedicated to String entry

  }, {
    key: 'makeFilterStringOrJstreeIcon',
    value: function makeFilterStringOrJstreeIcon() {
      var icon = $('<span></span>').attr('aria-hidden', 'true').addClass('glyphicon').addClass('glyphicon-search').addClass('display');

      var mythis = this;

      icon.click(function (d) {
        if (icon.hasClass('glyphicon-search')) {
          icon.removeClass('glyphicon-search');
          icon.addClass('glyphicon-list');
          $("#jstree_go[gonodeid='" + mythis.objet.id + "']").show();
          $("#globalSearch_go[gonodeid='" + mythis.objet.id + "']").hide();
        } else {
          icon.removeClass('glyphicon-list');
          icon.addClass('glyphicon-search');
          $("#jstree_go[gonodeid='" + mythis.objet.id + "']").hide();
          $("#globalSearch_go[gonodeid='" + mythis.objet.id + "']").show();
        }
      });
      return icon;
    }
  }, {
    key: 'create',
    value: function create() {
      var mythis = this;
      var node = this.node;
      this.divPanelUlSortable();

      this.details.append($('<div></div>').append(this.makeFilterStringOrJstreeIcon()).append(this.createDivGlobalSearch()).append(this.createDivJsTreeSearch()));

      var attributes = new AskomicsUserAbstraction().getAttributesWithURI(node.uri);
      console.log("ATTRIBUTES:" + attributes.length);

      $.each(attributes, function (i) {
        var attribute = node.getAttributeOrCategoryForNode(attributes[i]);

        var lab = $("<label></label>").attr("uri", attribute.uri).attr("for", attribute.label).text(attribute.label);

        if (attribute.basic_type == "category") {
          /* RemoveIcon, EyeIcon, Attribute IHM */
          mythis.addPanel($('<div></div>').attr("id", attribute.id).attr("sparqlid", attribute.SPARQLid).attr("uri", attribute.uri).attr("basic_type", attribute.basic_type).append(lab).append(mythis.makeRemoveIcon()).append(mythis.makeEyeIcon(attribute)).append(mythis.makeNegativeMatchIcon('URICat' + attribute.SPARQLid)).append(mythis.makeLinkVariableIcon('URICat' + attribute.SPARQLid)).append(mythis.buildCategory(attribute)).append(mythis.buildLinkVariable(attribute)));
        } else if (attribute.basic_type == "decimal") {
          /* RemoveIcon, EyeIcon, Attribute IHM */
          mythis.addPanel($('<div></div>').append(lab).attr("id", attribute.id).attr("sparqlid", attribute.SPARQLid).attr("uri", attribute.uri).attr("basic_type", attribute.basic_type).append(mythis.makeRemoveIcon()).append(mythis.makeEyeIcon(attribute)).append(mythis.makeNegativeMatchIcon(attribute.SPARQLid)).append(mythis.makeLinkVariableIcon(attribute.SPARQLid)).append(mythis.buildDecimal(attribute)).append(mythis.buildLinkVariable(attribute)));
        } else if (attribute.basic_type == "string") {
          node.switchRegexpMode(attribute.SPARQLid);
          /* RemoveIcon, EyeIcon, Attribute IHM */
          mythis.addPanel($('<div></div>').append(lab).attr("id", attribute.id).attr("sparqlid", attribute.SPARQLid).attr("uri", attribute.uri).attr("basic_type", attribute.basic_type).append(mythis.makeRemoveIcon()).append(mythis.makeEyeIcon(attribute)).append(mythis.makeRegExpIcon(attribute.SPARQLid)).append(mythis.makeNegativeMatchIcon(attribute.SPARQLid)).append(mythis.makeLinkVariableIcon(attribute.SPARQLid)).append(mythis.buildString(attribute.SPARQLid)).append(mythis.buildLinkVariable(attribute)));
        } else {
          throw _typeof(this) + "::create . Unknown type attribute:" + attribute.basic_type;
        }
        //$('#waitModal').modal('hide');
      });

      $("#viewDetails").append(this.details);
    }
  }]);

  return GONodeView;
}(AskomicsNodeView);

function expand_jtree(results, expand_id) {
  for (var elt in results) {
    var node = { "id": results[elt].goid_child, "text": results[elt].label_child };
    $('#jstree_go').jstree().create_node(expand_id, node, 'last');
  }
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */

var AskomicsObjectBuilder = function () {
  function AskomicsObjectBuilder() {
    _classCallCheck(this, AskomicsObjectBuilder);
  }

  _createClass(AskomicsObjectBuilder, null, [{
    key: 'instanceNode',
    value: function instanceNode(node, x, y) {

      /* Check if abstraction store the taget class to instancied */
      var className = new AskomicsUserAbstraction().getAttribEntity(node.uri, new AskomicsUserAbstraction().longRDF('askomicsns:hasOwnClassVisualisation'));
      if (className !== "") {
        return new classesMapping[className](node, x, y);
      }

      //by default !
      return new AskomicsNode(node, x, y);
    }
  }, {
    key: 'instanceLink',
    value: function instanceLink(linkbase, source, target) {

      if (source.constructor.name === 'GONode' || target.constructor.name === 'GONode') {
        return new GOLink(linkbase, source, target);
      }

      return new AskomicsLink(linkbase, source, target);
    }
  }]);

  return AskomicsObjectBuilder;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */
var classesMapping = {
  'GraphNode': GraphNode,
  'AskomicsPositionableNode': AskomicsPositionableNode,
  'AskomicsNode': AskomicsNode,
  'GONode': GONode,
  'GraphLink': GraphLink,
  'AskomicsLink': AskomicsLink,
  'GOLink': GOLink,
  'AskomicsPositionableLink': AskomicsPositionableLink
};

var instanceGraphBuilder = void 0;

/* constructeur de AskomicsGraphBuilder */

var AskomicsGraphBuilder = function () {
  function AskomicsGraphBuilder() {
    _classCallCheck(this, AskomicsGraphBuilder);

    /* Implement a Singleton */
    if (instanceGraphBuilder !== undefined) {
      return instanceGraphBuilder;
    }

    this.AskomicsGraphBuilderVersion = 1.1;
    this.reset();
    instanceGraphBuilder = this;
  }

  _createClass(AskomicsGraphBuilder, [{
    key: 'reset',
    value: function reset() {
      /* ========================================= ATTRIBUTES ============================================= */
      this.SPARQLIDgeneration = {}; /* { <ENT1> : 5, ... }  last index used to named variable */
      this.IDgeneration = 0;

      /* We keep information about instancied Node and Link to be able to rebuild graph */
      this._instanciedNodeGraph = [];
      this._instanciedLinkGraph = [];
    }

    /* get node */

  }, {
    key: 'nodes',
    value: function nodes(selectedOrderList, kindparam) {

      if (selectedOrderList === undefined) return this._instanciedNodeGraph;

      if (kindparam === undefined) throw "AskomicsGraphBuilder :: nodes -> Define kindparam when use selectedOrderList param";

      var nodeL = [];
      for (var i in selectedOrderList) {
        for (var j in this._instanciedNodeGraph) {
          if (selectedOrderList[i] == this._instanciedNodeGraph[j][kindparam]) {
            nodeL.push(this._instanciedNodeGraph[j]);
            break;
          }
        }
      }
      return nodeL;
    }
  }, {
    key: 'links',
    value: function links() {
      return this._instanciedLinkGraph;
    }
    /* create a dump to store data structure and finally the query */

  }, {
    key: 'getInternalState',
    value: function getInternalState() {
      var nodes = [];
      var links = [];

      /* Save class name to rebuild the object when loading */
      for (var i = 0; i < this.nodes().length; i++) {
        nodes.push([this.nodes()[i].constructor.name, this.nodes()[i]]);
      }
      for (var _i = 0; _i < this.links().length; _i++) {
        links.push([this.links()[_i].constructor.name, this.links()[_i]]);
      }
      return JSON.stringify([this.AskomicsGraphBuilderVersion, nodes, links, this.SPARQLIDgeneration, this.IDgeneration], null, '\t');
    }

    /* create and return list of nodes and links to build a new grpah from a dump file */

  }, {
    key: 'setNodesAndLinksFromState',
    value: function setNodesAndLinksFromState(dump) {
      try {
        var struct = JSON.parse(dump);

        var versionOfFile = struct[0];
        //this._instanciedNodeGraph = struct[1];
        //this._instanciedLinkGraph = struct[2];
        var nodes = struct[1];
        var links = struct[2];
        this.SPARQLIDgeneration = struct[3];
        this.IDgeneration = struct[4];

        /* manage version */
        if (versionOfFile != this.AskomicsGraphBuilderVersion) {
          alert("Dump file are builded with the Askomics Graph Builder Version:" + versionOfFile + "\n" + ". Current version is " + AskomicsGraphBuilderVersion + ".\nReload of dump are not guaranteed !");
        }

        this._instanciedNodeGraph = [];
        this._instanciedLinkGraph = [];

        this.nodes().splice(0, this.nodes().length);
        this.links().splice(0, this.links().length);

        //setup nodes
        for (var i = 0; i < nodes.length; i++) {
          var className = nodes[i][0];
          var jsonObj = nodes[i][1];
          var n = new classesMapping[className]({ uri: "undefined" });
          n.setjson(jsonObj);
          this.nodes().push(n);
        }

        //setup links
        for (var _i2 = 0; _i2 < links.length; _i2++) {
          var _className = links[_i2][0];
          var _jsonObj = links[_i2][1];
          var l = new classesMapping[_className]({ uri: "undefined" });
          l.setjson(_jsonObj, this);
          this.links().push(l);
        }
        return [this.nodes(), this.links()];
      } catch (ex) {
        console.error(ex);
      }
      return [[], []];
    }
  }, {
    key: 'addInstanciedElt',
    value: function addInstanciedElt(node) {
      this._instanciedNodeGraph.push(node);
    }
  }, {
    key: 'addInstanciedLink',
    value: function addInstanciedLink(link) {
      this._instanciedLinkGraph.push(link);
    }
  }, {
    key: 'removeInstanciedNode',

    /*
      remove a node and all node newest (and link) associated
    */
    value: function removeInstanciedNode(node) {
      if (this._instanciedNodeGraph[0].length <= 0 || this._instanciedNodeGraph[0].id == node.id) {
        return [];
      }

      /* the method return list of links */
      var listLinkRemoved = [];

      /* search link associated with this node and a node with a id > (newest than idNode)*/
      var linkIndexToDelete = [];
      var i = 0;
      while (i < this._instanciedLinkGraph.length) {
        var link = this._instanciedLinkGraph[i++];

        var t1 = link.source.id == node.id,
            t2 = link.target.id == node.id;

        if (t1 || t2) {
          // find a link associated with node.id
          var currentNode = t1 ? link.source : link.target;
          var targetNode = t1 ? link.target : link.source;

          /* the second node is newest than node.id, we have to remove it ! */
          if (targetNode.id > currentNode.id) {
            // && targetNode in this._instanciedNodeGraph ) {
            // removing node
            listLinkRemoved = listLinkRemoved.concat(this.removeInstanciedNode(targetNode));
            i = 0;
            continue; /* !!!!! reinit the loop because this._instanciedLinkGraph have change !!!!!!!!!! */
            //console.log("111:"+JSON.stringify(listLinkRemoved));
          }

          // removing link
          linkIndexToDelete.push(link.id);
          if (currentNode.id in targetNode.nlink) delete targetNode.nlink[currentNode.id];
          if (targetNode.id in currentNode.nlink) delete currentNode.nlink[targetNode.id];
        }
      }

      /* remove links */
      for (var l = linkIndexToDelete.length - 1; l >= 0; l--) {
        for (var j = 0; j < this._instanciedLinkGraph.length; j++) {
          if (this._instanciedLinkGraph[j].id == linkIndexToDelete[l]) {
            listLinkRemoved.push(this._instanciedLinkGraph[j]);
            this._instanciedLinkGraph.splice(j, 1);
          }
        }
      }

      /* remove the node */
      for (var n in this._instanciedNodeGraph) {
        if (this._instanciedNodeGraph[n].id == node.id) {
          this._instanciedNodeGraph.splice(n, 1);
          //  console.log("222:"+JSON.stringify(listLinkRemoved));
          return listLinkRemoved;
        }
      }
      return listLinkRemoved;
    }
  }, {
    key: 'removeInstanciedLink',
    value: function removeInstanciedLink(link) {
      // finding link
      if (!link) {
        throw new Error("Link is undefined.");
      }
      var t = AskomicsGraphBuilder.findElt(this._instanciedLinkGraph, link.id);
      var removeNode = null;
      //console.log(JSON.stringify(this._instanciedLinkGraph));

      var indexLinkNode = t[0];
      var linkNode = t[1];

      if (indexLinkNode == -1) {
        throw new Error("AskomicsGraphBuilder.prototype.removeInstanciedLink id link unknown:" + link.id);
      }

      linkNode.source.nlink[linkNode.target.id]--;
      linkNode.target.nlink[linkNode.source.id]--;
      /* if no link between node then remove the newest node */
      if (linkNode.source.nlink[linkNode.target.id] <= 0) {
        // keep the oldest node !
        if (linkNode.source.id > linkNode.target.id) {
          this.removeInstanciedNode(linkNode.source);
          removeNode = linkNode.source;
        } else {
          this.removeInstanciedNode(linkNode.target);
          removeNode = linkNode.target;
        }
      }
      //removing the link
      t = AskomicsGraphBuilder.findElt(this._instanciedLinkGraph, link.id);
      if (t[0] > -1) this._instanciedLinkGraph.splice(t[0], 1);

      return removeNode;
    }

    /* create and return a new ID to instanciate a new SPARQL variate */

  }, {
    key: 'setSPARQLVariateId',
    value: function setSPARQLVariateId(nodeOrLinkOrAttribute) {
      var lab = new GraphNode({ uri: nodeOrLinkOrAttribute.uri }).removePrefix();
      lab = lab.replace(/[%!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '');
      if (!this.SPARQLIDgeneration[lab]) {
        this.SPARQLIDgeneration[lab] = 0;
      }

      this.SPARQLIDgeneration[lab]++;
      nodeOrLinkOrAttribute.SPARQLid = lab + this.SPARQLIDgeneration[lab];
      return nodeOrLinkOrAttribute;
    }
  }, {
    key: 'getId',
    value: function getId(node) {
      var id = this.IDgeneration;
      this.IDgeneration++;
      return id;
    }
  }, {
    key: 'setStartpoint',
    value: function setStartpoint(node) {
      node = this.setSuggestedNode(node, 0, 0);
      node = this.instanciateNode(node);
      return node;
    }
  }, {
    key: 'getInstanciedNode',
    value: function getInstanciedNode(id) {
      for (var n in this._instanciedNodeGraph) {
        if (this._instanciedNodeGraph[n].id == id) return this._instanciedNodeGraph[n];
      }
      throw "GraphBuilder::getInstanciedNode Can not find instancied node:" + JSON.stringify(id);
    }
  }, {
    key: 'getInstanciedLink',
    value: function getInstanciedLink(id) {
      for (var n in this._instanciedLinkGraph) {
        if (this._instanciedLinkGraph[n].id == id) return this._instanciedLinkGraph[n];
      }
      throw "GraphBuilder::getInstanciedLink Can not find instancied link:" + JSON.stringify(id);
    }
  }, {
    key: 'setSuggestedNode',
    value: function setSuggestedNode(node, x, y) {
      var iNode = AskomicsObjectBuilder.instanceNode(node, x, y);
      iNode.id = this.getId();
      return iNode;
    }
  }, {
    key: 'instanciateNode',
    value: function instanciateNode(node) {
      node.suggested = false;
      node.actif = true;
      node = this.setSPARQLVariateId(node);
      this._instanciedNodeGraph.push(node);
      return node;
    }
  }, {
    key: 'isInstanciatedNode',
    value: function isInstanciatedNode(node) {

      for (var n in this._instanciedNodeGraph) {
        if (this._instanciedNodeGraph[n].id === node.id) return true;
      }
      return false;
    }
  }, {
    key: 'instanciateLink',
    value: function instanciateLink(links) {
      for (var l in links) {
        links[l].suggested = false;
        links[l] = this.setSPARQLVariateId(links[l]);
        this._instanciedLinkGraph.push(links[l]);
      }
    }
  }, {
    key: 'synchronizeInstanciatedNodesAndLinks',
    value: function synchronizeInstanciatedNodesAndLinks(nodes, links) {
      var removeElt = [];
      var present = false;
      for (var idn in nodes) {
        if (nodes[idn].suggested) continue;
        present = false;
        for (var n in this._instanciedNodeGraph) {
          if (this._instanciedNodeGraph[n].id == nodes[idn].id) {
            present = true;
            break;
          }
        }
        if (present) continue;
        removeElt.push(idn);
      }
      for (var i = removeElt.length - 1; i >= 0; i--) {
        nodes.splice(removeElt[i], 1);
      }

      removeElt = [];
      for (var idl in links) {
        if (links[idl].suggested) continue;
        present = false;
        for (var l in this._instanciedLinkGraph) {
          if (this._instanciedLinkGraph[l].id == links[idl].id) {
            present = true;
            break;
          }
        }
        if (present) continue;
        removeElt.push(idl);
      }
      for (var j = removeElt.length - 1; j >= 0; j--) {
        links.splice(removeElt[j], 1);
      }
    }
  }, {
    key: 'buildConstraintsGraph',
    value: function buildConstraintsGraph() {
      var variates = [];
      var blockConstraint = [];

      /* copy arrays to avoid to removed nodes and links instancied */
      var dup_node_array = $.extend(true, [], this._instanciedNodeGraph);
      var dup_link_array = $.extend(true, [], this._instanciedLinkGraph);

      var currentService = '---- noservice ---';
      var concatConstr = [];

      for (var idx = 0; idx < this._instanciedNodeGraph.length; idx++) {
        var node = dup_node_array[idx];
        /* find relation with this node and add it as a constraint  */
        for (var ilx = dup_link_array.length - 1; ilx >= 0; ilx--) {

          if (dup_link_array[ilx].source.id == node.id || dup_link_array[ilx].target.id == node.id) {
            var blockConstraintByLink = [];
            var _bcs = dup_link_array[ilx].buildConstraintsSPARQL();
            if (_bcs[1] === currentService) {
              concatConstr = concatConstr.concat(_bcs[0]);
            } else {
              if (concatConstr.length > 0) {
                blockConstraint.push([concatConstr, currentService]);
              }
              concatConstr = _bcs[0];
              currentService = _bcs[1];
            }
            dup_link_array[ilx].instanciateVariateSPARQL(variates);

            //remove link to avoid to add two same constraint
            dup_link_array.splice(ilx, 1);
          }
        }
        var blockConstraintByNode = [];
        var bcs = node.buildConstraintsSPARQL();
        if (bcs[1] === currentService) {
          concatConstr = concatConstr.concat(bcs[0]);
        } else {
          if (concatConstr.length > 0) {
            blockConstraint.push([concatConstr, currentService]);
          }
          concatConstr = bcs[0];
          currentService = bcs[1];
        }
        /* adding constraints about attributs about the current node */
        //blockConstraint.push(node.buildConstraintsSPARQL());
        node.instanciateVariateSPARQL(variates);
      }

      if (concatConstr.length > 0) {
        blockConstraint.push([concatConstr, currentService]);
      }

      return [variates, [blockConstraint, '']];
    }
  }], [{
    key: 'findElt',
    value: function findElt(_array, id) {
      var elt = null;
      var indexElt = -1;
      for (var i in _array) {
        if (_array[i].id == id) {
          elt = _array[i];
          indexElt = i;
          break;
        }
      }
      return [indexElt, elt];
    }
  }]);

  return AskomicsGraphBuilder;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */

var AskomicsForceLayoutManager = function () {
  function AskomicsForceLayoutManager() {
    _classCallCheck(this, AskomicsForceLayoutManager);

    this.w = $("#svgdiv").width();
    this.h = 350;
    this.maxh = 700;
    this.curx = 0;
    this.cury = 0;
    this.charge = -700;
    this.distance = 175;
    this.friction = 0.7;
    /* To manage information about menu propositional view */
    this.menuView = new AskomicsMenuView(this);
    /* To manage information about File menu */
    this.menuFile = new AskomicsMenuFile(this);

    this.optionsView = {
      attributesFiltering: true,
      relationsName: true
    };

    var currentFL = this;

    /*************************************************/
    /* Context Menu definition inside SVG Div        */
    /*************************************************/
    var faCheckEmptBox = 'fa-square-o';
    var faCheckBox = 'fa-check-square-o';

    var TitleFilterAtt = "Filtering attributes";
    var TitleFilterRelationName = "Relations name";

    $.contextMenu({
      selector: '#svgdiv',
      items: {
        "rmenu-save-query": {
          name: $("#dwl-query").text(),
          icon: "fa-download",
          callback: function callback(key, options) {
            $("#dwl-query")[0].click();
          }
        },
        "rmenu-save-sparql-query": {
          name: $("#dwl-query-sparql").text(),
          icon: "fa-floppy-o",
          callback: function callback(key, options) {
            $("#dwl-query-sparql")[0].click();
          }
        },
        "sep1": "---------",
        "rmenu-filt-attributes": {
          name: TitleFilterAtt,
          icon: faCheckBox,
          callback: function callback(key, options) {
            $(".context-menu-icon." + faCheckBox + ",.context-menu-icon." + faCheckEmptBox).find("span").each(function (index) {
              if ($(this).text() === TitleFilterAtt) {
                if ($(this).parent().hasClass(faCheckBox)) {
                  currentFL.optionsView.attributesFiltering = false;
                  $(this).parent().removeClass(faCheckBox);
                  $(this).parent().addClass(faCheckEmptBox);
                } else {
                  currentFL.optionsView.attributesFiltering = true;
                  $(this).parent().removeClass(faCheckEmptBox);
                  $(this).parent().addClass(faCheckBox);
                }
              }
            });
            $("tspan[constraint_node_id]").css('display', currentFL.optionsView.attributesFiltering ? 'block' : 'none');
            return false;
          }
        },
        "rmenu-relation-name": {
          name: TitleFilterRelationName,
          icon: faCheckBox,
          callback: function callback(key, options) {

            $(".context-menu-icon." + faCheckBox + ",.context-menu-icon." + faCheckEmptBox).find("span").each(function (index) {

              if ($(this).text() === TitleFilterRelationName) {
                if ($(this).parent().hasClass(faCheckBox)) {
                  $(this).parent().removeClass(faCheckBox);
                  $(this).parent().addClass(faCheckEmptBox);
                  currentFL.optionsView.relationsName = false;
                } else {
                  currentFL.optionsView.relationsName = true;
                  $(this).parent().removeClass(faCheckEmptBox);
                  $(this).parent().addClass(faCheckBox);
                }
              }
            });
            $("[id^=" + GraphObject.getSvgLabelPrefix() + "] textPath").css('display', currentFL.optionsView.relationsName ? 'block' : 'none');
            return false;
          }
        },
        "sep2": "---------",
        "rmenu-reset": {
          name: "Reset",
          callback: function callback() {
            resetGraph();
          }
        },
        "rmenu-quit": {
          name: "Quit",
          callback: function callback(key, options) {
            $("#dwl-query-sparql")[0].click();
          }
        }
      },
      events: {
        show: function show(opt) {
          // this is the trigger element
          var $this = this;
          if (Object.keys($this.data()).length === 0) return;

          // import states from data store
          $.contextMenu.setInputValues(opt, $this.data());
          // this basically fills the input commands from an object
          // like {name: "foo", yesno: true, radio: "3", &hellip;}
        },
        hide: function hide(opt) {
          // this is the trigger element
          var $this = this;
          // export states to data store
          $.contextMenu.getInputValues(opt, $this.data());
          // this basically dumps the input commands' values to an object
          // like {name: "foo", yesno: true, radio: "3", &hellip;}
        }
      }
    });

    $('#full-screen-graph').click(function () {
      if ($('#icon-resize-graph').attr('value') == 'small') {
        currentFL.fullsizeGraph();
        return;
      }

      if ($('#icon-resize-graph').attr('value') == 'full') {
        currentFL.normalsizeGraph();
        return;
      }
    });

    $('#full-screen-attr').click(function () {
      if ($('#icon-resize-attr').attr('value') == 'small') {
        currentFL.fullsizeRightview();
        return;
      }

      if ($('#icon-resize-attr').attr('value') == 'full') {
        currentFL.normalsizeRightview();
        return;
      }
    });

    /* filter to hide and show proposition node and links */
    this._hideProposedUriNode = [];
    this._hideProposedUriLink = [];

    this.vis = d3.select("#svgdiv").append("svg:svg").attr("id", "svg").attr("pointer-events", "all").attr({
      "width": "100%",
      "height": "100%"
    }).attr("viewBox", "0 0 " + this.w + " " + this.h).attr("perserveAspectRatio", "xMinYMid meet").call(d3.behavior.zoom().on("zoom", function () {
      var velocity = 1 / 10;
      var scale = Math.pow(d3.event.scale, velocity);

      var translateY = (currentFL.h - currentFL.h * scale) / 2;
      var translateX = (currentFL.w - currentFL.w * scale) / 2;

      currentFL.vis.attr("transform", "translate(" + [translateX, translateY] + ")" + " scale(" + scale + ")");

      //  currentFL.vis.attr("transform","translate(" + d3.event.translate + ")" + " scale(" +scale+ ")");
    })).append('svg:g');

    this.force = d3.layout.force();

    this.nodes = this.force.nodes();
    this.links = this.force.links();

    this.ctrlPressed = false;
    this.selectNodes = [];
    this.selectLink = '';
    this.enterPressed = false;

    /* Definition of an event when CTRL key is actif to select several node */
    /* Definition of an event when a special key is pressed */
    $(document).keydown(function (e) {
      // if ctrl is pressed, select several node
      if (e.keyCode == 17) {
        currentFL.ctrlPressed = true;
      }

      // If enter is pressed, launch the query
      if (e.keyCode == 13 && $('#queryBuilder').is(':visible') && !this.enterPressed) {
        viewQueryResults();
        currentFL.enterPressed = true;
      }
    });

    $(document).keyup(function (e) {
      currentFL.ctrlPressed = false;

      if (e.keyCode == 13) {
        currentFL.enterPressed = false;
      }
    });
  }

  _createClass(AskomicsForceLayoutManager, [{
    key: 'getArrayForProposedUri',
    value: function getArrayForProposedUri(type) {
      if (type == "node") {
        return this._hideProposedUriNode;
      }
      if (type == "link") {
        return this._hideProposedUriLink;
      }
      throw "AskomicsForceLayoutManager::getArrayForProposedUri Devel error => type !=node and link :" + type;
    }
  }, {
    key: 'offProposedUri',
    value: function offProposedUri(type, uri) {
      var tab = this.getArrayForProposedUri(type);

      for (var i in tab) {
        if (tab[i] == uri) return;
      }
      tab.push(uri);
    }
  }, {
    key: 'onProposedUri',
    value: function onProposedUri(type, uri) {
      var tab = this.getArrayForProposedUri(type);

      for (var i in tab) {
        if (tab[i] == uri) {
          tab.splice(i, 1);
          return;
        }
      }
    }
  }, {
    key: 'isProposedUri',
    value: function isProposedUri(type, uri) {
      var tab = this.getArrayForProposedUri(type);

      for (var i in tab) {
        if (tab[i] == uri) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'fullsizeGraph',
    value: function fullsizeGraph() {
      $('#viewDetails').hide();
      $('#results').hide();
      $('#graph').attr('class', 'col-md-12');

      $("#svg").attr("viewBox", this.curx + " " + this.cury + " " + $("#content_interrogation").width() + " " + this.maxh);
      $("#svg").attr('height', this.maxh);
      $("#svg").attr('width', $("#content_interrogation").width());

      //change icon
      $('#icon-resize-graph').attr('class', 'glyphicon glyphicon-resize-small');
      $('#icon-resize-graph').attr('value', 'full');
    }
  }, {
    key: 'normalsizeGraph',
    value: function normalsizeGraph() {
      $('#viewDetails').show();
      $('#results').show();
      $('#graph').attr('class', 'col-md-6');
      $("#svg").attr("viewBox", this.curx + " " + this.cury + " " + this.w + " " + this.h);
      $("#svg").attr('height', this.h);
      $("#svg").attr('width', this.w);

      //change icon
      $('#icon-resize-graph').attr('class', 'glyphicon glyphicon-resize-full');
      $('#icon-resize-graph').attr('value', 'small');
    }
  }, {
    key: 'fullsizeRightview',
    value: function fullsizeRightview() {
      $('#graph').hide();
      $('#results').hide();
      $('#viewDetails').attr('class', 'col-md-12');
      $('.div-details').attr('class', 'div-details-max');

      //change icon
      $('#icon-resize-attr').attr('class', 'glyphicon glyphicon-resize-small');
      $('#icon-resize-attr').attr('value', 'full');
    }
  }, {
    key: 'normalsizeRightview',
    value: function normalsizeRightview() {
      $('#graph').show();
      $('#results').show();
      $('#viewDetails').attr('class', 'col-md-6');
      $('.div-details-max').attr('class', 'div-details');

      //change icon
      $('#icon-resize-attr').attr('class', 'glyphicon glyphicon-resize-full');
      $('#icon-resize-attr').attr('value', 'small');
    }
  }, {
    key: 'unbindFullscreenButtons',
    value: function unbindFullscreenButtons() {
      $('#full-screen-graph').unbind();
      $('#full-screen-attr').unbind();
    }
  }, {
    key: 'colorSelectdObject',
    value: function colorSelectdObject(prefix, id) {
      $(prefix + id).css("stroke", "firebrick");
    }
  }, {
    key: 'updateInstanciedNode',
    value: function updateInstanciedNode() {
      d3.selectAll('g.node').each(function (d) {
        //d3.select(this) // Transform to d3 Object
        if (!d.suggested) d.getPanelView().define_context_menu();
      });
    }
  }, {
    key: 'start',
    value: function start() {
      /* Get information about start point to bgin query */
      var startPoint = $('#startpoints').find(":selected").data("value");

      /* load abstraction */
      //new AskomicsUserAbstraction().loadUserAbstraction();

      startPoint = new AskomicsUserAbstraction().buildBaseNode(startPoint.uri);
      /* initialize menus */
      this.menuView.start();

      this.menuFile.start();

      startPoint = new AskomicsUserAbstraction().buildBaseNode(startPoint.uri);

      /* Setting up an ID for the first variate */
      startPoint = new AskomicsGraphBuilder().setStartpoint(startPoint);

      /* first node */
      this.nodes.push(startPoint);
      this.manageSelectedNodes(startPoint);

      startPoint.getPanelView().create();
      /* update right view with attribute view */
      startPoint.getPanelView().show();
      /* insert new suggestion with startpoints */
      this.insertSuggestions();
      //alert("1:");
      /* build graph */
      //this.update();
      //alert("2:");
      this.colorSelectdObject("#node_", startPoint.id);
      //alert("3:");
    }
  }, {
    key: 'startWithQuery',
    value: function startWithQuery(dump) {
      d3.select("g").selectAll("*").remove();
      new AskomicsUserAbstraction().loadUserAbstraction();
      /* initialize menus */
      this.menuView.start();
      this.menuFile.start();

      this.nodes.splice(0, this.nodes.length);
      this.links.splice(0, this.links.length);
      var t = new AskomicsGraphBuilder().setNodesAndLinksFromState(dump);
      var lnodes = t[0];
      var llinks = t[1];

      if (lnodes.length <= 0) return; /* nothing to do */

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = lnodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var n = _step.value;

          this.nodes.push(n);
          n.getPanelView().create();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      AskomicsObjectView.hideAll();

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = llinks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var l = _step2.value;

          this.links.push(l);
          l.getPanelView().create(l);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      AskomicsObjectView.hideAll();

      /* select the last node */
      var lastn = new AskomicsGraphBuilder().nodes()[new AskomicsGraphBuilder().nodes().length - 1];
      this.unSelectNodes();
      this.manageSelectedNodes(lastn);
      /* update right view with attribute view */
      lastn.getPanelView().show();
      /* insert new suggestion with startpoints */
      this.insertSuggestions();
      this.update();
      this.colorSelectdObject("#node_", lastn.id);
    }
  }, {
    key: 'reset',
    value: function reset() {
      //reset view menu
      this.menuView.reset();

      //unbind files menu
      this.menuFile.unbindDownloadButtons();

      //unbind fullscreen buttons
      this.unbindFullscreenButtons();
    }
  }, {
    key: 'updateInstanciateLinks',
    value: function updateInstanciateLinks(links) {
      for (var l in links) {
        var id = links[l].id;
        $("#" + id).css("stroke-dasharray", "");
        $("#" + id).css("opacity", "1");
        $('#' + GraphObject.getSvgLabelPrefix() + id).css('opacity', "1");
      }
      //  $("[id^=" + GraphObject.getSvgLabelPrefix() + "] textPath").css('display', this.optionsView.relationsName?'block':'none');
    }

    /* Update the label of cercle when a node is instanciated */

  }, {
    key: 'updateInstanciatedNode',
    value: function updateInstanciatedNode(node) {

      if (!node) throw new Error("AskomicsForceLayoutManager::updateInstanciateNode : node is not defined !");

      // change label node with the SPARQL Variate Id
      $('#txt_' + node.id).html(node.label + node.getLabelIndexHtml());
      // canceled transparency
      $("#node_" + node.id).css("opacity", "1");
      $('#txt_' + node.id).css("opacity", "1");
      $("tspan[constraint_node_id]").css('display', this.optionsView.attributesFiltering ? 'block' : 'none');
    }

    /* Update the label of cercle when a node is instanciated */

  }, {
    key: 'manageSelectedNodes',
    value: function manageSelectedNodes(node) {
      if (!this.ctrlPressed) {
        $("[id*='node_']").each(function (index, value) {
          $(this).css("stroke", "grey");
        });

        /* if several node were selected or a diffente node were selected so select only the current node */
        if (this.selectNodes.length > 1 || this.selectNodes.length === 0 || this.selectNodes[0].id != node.id) {
          this.selectNodes = [];
          this.selectNodes.push(node);
          this.colorSelectdObject("#node_", node.id);
        } else {
          /* deselection of node */
          this.selectNodes = [];
          console.log('---> deselection');
          $("#node_" + node.id).css("stroke", "grey");
        }
      } else {
        // deselection case
        for (var n in this.selectNodes) {
          if (this.selectNodes[n].id == node.id) {
            // remove the current node from the selected node list !
            this.selectNodes.splice(n, 1);
            $("#node_" + node.id).css("stroke", "grey");
            return;
          }
        }
        this.selectNodes.push(node);
        this.colorSelectdObject("#node_", node.id);
      }

      if (this.selectNodes.length === 0) {
        //no node selected: hide rightview
        AskomicsObjectView.hideAll();
        //linksView.hideAll();
      }
    }

    /* unselect all nodes */

  }, {
    key: 'unSelectNodes',
    value: function unSelectNodes() {
      this.selectNodes = [];
      $("[id*='node_']").each(function (index, value) {
        $(this).css("stroke", "grey");
      });
    }
  }, {
    key: 'setSelectLink',
    value: function setSelectLink(link) {
      $("#" + link.id).css("stroke", "firebrick");
      $('#end-marker-' + link.id).css("stroke", "firebrick");
      $('#end-marker-' + link.id).css("fill", "firebrick");
      $('#start-marker-' + link.id).css("stroke", "firebrick");
      $('#start-marker-' + link.id).css("fill", "firebrick");
      this.selectLink = link;
    }
  }, {
    key: 'unSelectLink',
    value: function unSelectLink() {
      this.selectLink = '';
      $(".link").each(function (index) {
        $(this).css("stroke", "grey");
        this.selectLink = '';
      });
      $(".arrow").each(function (index) {
        $(this).css("stroke", "grey");
        $(this).css("fill", "grey");
        this.selectLink = '';
      });
    }
  }, {
    key: 'nodeIsSelected',
    value: function nodeIsSelected(node) {
      if (this.selectNodes.length > 1) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.selectNodes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var i = _step3.value;

            if (node.id == i.id) return true;
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
      return false;
    }
  }, {
    key: 'insertSuggestions',
    value: function insertSuggestions() {
      if (this.selectNodes.length === 0) {
        return;
      } else if (this.selectNodes.length === 1) {
        this.insertSuggestionsWithNewNode(this.selectNodes[0]);
      } else if (this.selectNodes.length === 2) {
        this.insertSuggestionsWithTwoNodesInstancied(this.selectNodes[0], this.selectNodes[1]);
      }
    }
  }, {
    key: 'insertSuggestionsWithNewNode',
    value: function insertSuggestionsWithNewNode(slt_node) {
      var mythis = this;
      var suggestedList = {};
      /* objectsTarget  :  All triplets which slt_node URI are the subject */
      /* subjectsTarget :  All triplets which slt_node URI are the object */

      /* get All suggested node and relation associated to get orientation of arc */
      new AskomicsUserAbstraction().getRelationsObjectsAndSubjectsWithURI(slt_node.uri, function (objectsTarget) {
        /// A RESOUDRE***********************************
        ////  ===> DOIT ETRE PARTAGER ENTRE LES DEUX FONCTIONS POUR EVITER DE CREER DEUX FOIS LE NOEUD

        var link = void 0;

        for (var uri in objectsTarget) {
          //alert(uri);
          /* Filter if node are not desired by the user */
          if (!mythis.isProposedUri("node", uri)) continue;
          /* creatin node */
          var suggestedNode = new AskomicsUserAbstraction().buildBaseNode(uri);
          /* specific attribute for suggested node */
          suggestedNode = new AskomicsGraphBuilder().setSuggestedNode(suggestedNode, slt_node.x, slt_node.y);

          for (var rel in objectsTarget[uri]) {

            /* Filter if link are not desired by the user */
            if (!mythis.isProposedUri("link", objectsTarget[uri][rel].uri)) continue;

            /* adding in the node list to create D3.js graph */
            if (!(suggestedNode.id in slt_node.nlink)) {
              /* We create a unique instance and add all possible relation between selected node and this suggested node */
              suggestedList[uri] = suggestedNode;
              mythis.nodes.push(suggestedNode);
            }
            /* increment the number of link between the two nodes */
            var linkbase = {};
            linkbase.uri = objectsTarget[uri][rel].uri;
            var source = slt_node;
            var target = suggestedList[uri];

            //link = new AskomicsLink(linkbase,source,target);
            link = AskomicsObjectBuilder.instanceLink(linkbase, source, target);

            link.id = new AskomicsGraphBuilder().getId();
            mythis.links.push(link);
          }
        }
        mythis.update();
      }, function (subjectsTarget) {
        var link = void 0;

        for (var uri in subjectsTarget) {
          /* Filter if node are not desired by the user */
          if (!mythis.isProposedUri("node", uri)) continue;
          var suggestedNode = void 0;
          if (!(uri in suggestedList)) {
            suggestedNode = new AskomicsUserAbstraction().buildBaseNode(uri);
            suggestedNode = new AskomicsGraphBuilder().setSuggestedNode(suggestedNode, slt_node.x, slt_node.y);
          } else {
            suggestedNode = suggestedList[uri];
          }

          for (var rel2 in subjectsTarget[uri]) {
            /* Filter if link are not desired by the user */
            if (!mythis.isProposedUri("link", subjectsTarget[uri][rel2].uri)) continue;

            /* adding in the node list to create D3.js graph */
            if (!(suggestedNode.id in slt_node.nlink)) {
              suggestedList[uri] = suggestedNode;
              mythis.nodes.push(suggestedNode);
            }

            var linkbase = {};
            linkbase.uri = subjectsTarget[uri][rel2].uri;
            var source = suggestedList[uri];
            var target = slt_node;
            //link = new AskomicsLink(linkbase,source,target);
            link = AskomicsObjectBuilder.instanceLink(linkbase, source, target);
            link.id = new AskomicsGraphBuilder().getId();
            mythis.links.push(link);
          }
        }
        mythis.update();
      });

      // add neighbours of a node to the graph as propositions.

      // Manage positionnable entities
      var positionableEntities = new AskomicsUserAbstraction().getPositionableEntities();

      for (var uri in positionableEntities) {
        // if selected node is not a positionable node, donc create a positionable
        // link with an other positionable node
        if (!(slt_node.uri in positionableEntities)) continue;
        /* Filter if node are not desired by the user */
        if (!this.isProposedUri("node", uri)) continue;
        /* Filter if link are not desired by the user */
        if (!this.isProposedUri("link", "positionable")) continue;

        /* uncomment if we don't want a positionable relation between the same node  */
        //if ( uri == slt_node.uri ) continue ;
        var suggestedNode = void 0;
        if (!(uri in suggestedList)) {
          /* creatin node */
          suggestedNode = new AskomicsUserAbstraction().buildBaseNode(uri);
          /* specific attribute for suggested node */
          suggestedNode = new AskomicsGraphBuilder().setSuggestedNode(suggestedNode, slt_node.x, slt_node.y);
          /* adding in the node list to create D3.js graph */
          this.nodes.push(suggestedNode);
          suggestedList[uri] = suggestedNode;
        }

        var linkbase = {};
        linkbase.uri = 'positionable';
        var source = suggestedList[uri];
        var target = slt_node;
        link = new AskomicsPositionableLink(linkbase, source, target);
        link.setCommonPosAttr();
        link.id = new AskomicsGraphBuilder().getId();
        this.links.push(link);
      }
    }
  }, {
    key: 'relationInstancied',
    value: function relationInstancied(subj, obj, relation, links) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = links[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var rel = _step4.value;

          if (rel.source == subj && rel.target == obj && rel.uri == relation) return true;
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return false;
    }
  }, {
    key: 'insertSuggestionsWithTwoNodesInstancied',
    value: function insertSuggestionsWithTwoNodesInstancied(node1, node2) {
      var mythis = this;
      var suggestedList = {};

      /* get All suggested node and relation associated to get orientation of arc */
      var tab = new AskomicsUserAbstraction().getRelationsObjectsAndSubjectsWithURI(node1.uri, function (objectsTarget) {

        for (var rel in objectsTarget[node2.uri]) {
          /* Filter if link are not desired by the user */
          if (!mythis.isProposedUri("link", objectsTarget[node2.uri][rel].uri)) continue;

          if (mythis.relationInstancied(node1, node2, objectsTarget[node2.uri][rel].uri, mythis.links)) continue;

          var linkbase = {};
          linkbase.uri = objectsTarget[node2.uri][rel].uri;
          var source = node1;
          var target = node2;
          //let link = new AskomicsLink(linkbase,source,target);
          var _link = AskomicsObjectBuilder.instanceLink(linkbase, source, target);
          _link.id = new AskomicsGraphBuilder().getId();
          mythis.links.push(_link);
        }
        mythis.update();
      }, function (subjectsTarget) {

        for (var rel in subjectsTarget[node2.uri]) {
          /* Filter if link are not desired by the user */
          if (!mythis.isProposedUri("link", subjectsTarget[node2.uri][rel].uri)) continue;

          if (mythis.relationInstancied(node2, node1, subjectsTarget[node2.uri][rel].uri, mythis.links)) continue;

          var linkbase = {};
          linkbase.uri = subjectsTarget[node2.uri][rel].uri;
          var source = node2;
          var target = node1;
          //let link = new AskomicsLink(linkbase,source,target);
          var _link2 = AskomicsObjectBuilder.instanceLink(linkbase, source, target);
          _link2.id = new AskomicsGraphBuilder().getId();
          mythis.links.push(_link2);
        }
        mythis.update();
      });

      // Manage positionnable entities
      var positionableEntities = new AskomicsUserAbstraction().getPositionableEntities();

      if (this.isProposedUri("link", "positionable") && node1.uri in positionableEntities && node2.uri in positionableEntities) {

        var linkbase = {};
        linkbase.uri = 'positionable';
        var source = node2;
        var target = node1;
        var _link3 = new AskomicsPositionableLink(linkbase, source, target);
        _link3.setCommonPosAttr();
        _link3.id = new AskomicsGraphBuilder().getId();
        this.links.push(_link3);
      }
    }
  }, {
    key: 'removeLinkSvgInformation',
    value: function removeLinkSvgInformation(l) {
      $('#' + l.getSvgLabelId()).remove();
      $('#start-marker-' + l.id).parent().remove();
      $('#end-marker-' + l.id).parent().remove();
    }
    /* Remove all nodes and links suggestion */

  }, {
    key: 'removeSuggestions',
    value: function removeSuggestions() {

      var removeL = [];
      for (var idx in this.links) {
        var l = this.links[idx];
        if (l.suggested) {
          removeL.push(idx);
          l.source.nlink[l.target.id]--; // decrease the number of link
          l.target.nlink[l.source.id]--; // decrease the number of link
          if (l.source.nlink[l.target.id] <= 0) delete l.source.nlink[l.target.id];
          if (l.target.nlink[l.source.id] <= 0) delete l.source.nlink[l.target.id];
        }
      }
      for (var j = removeL.length - 1; j >= 0; j--) {
        /* remove label, and arraow start/end */
        this.removeLinkSvgInformation(this.links[removeL[j]]);
        this.links.splice(removeL[j], 1);
      }
      var removeN = [];
      // remove suggested node
      for (var node in this.nodes) {
        if (this.nodes[node].suggested) {
          removeN.push(node);
        }
      }
      for (var n2 = removeN.length - 1; n2 >= 0; n2--) {
        var idxn = removeN[n2];
        this.nodes.splice(idxn, 1);
      }
    } /* user want a new relation contraint betwwenn two node*/

    // take a string and return an entity with a sub index

  }, {
    key: 'selectListLinksUser',
    value: function selectListLinksUser(links, node) {
      /* fix the first link associted with the new instanciate node TODO: propose an interface to select the link */
      for (var il in links) {
        var l = links[il];
        if (l.suggested && (l.source.id == node.id || l.target.id == node.id)) {
          return [links[il]];
        }
      }
    }
  }, {
    key: 'update',
    value: function update() {
      console.log('---> update graph!');

      var link = this.vis.selectAll(".link").data(this.links, function (d) {
        return d.id;
      });

      var arrow = this.vis.selectAll(".arrow").data(this.links, function (d) {
        return d.id;
      });
      var currentFL = this;
      // Link labels
      link.enter().append("text").attr("style", "text-anchor:middle; font: 10px sans-serif; cursor: pointer;").attr("dy", "-5").attr('id', function (d) {
        return d.getSvgLabelId();
      }).style("opacity", function (d) {
        return d.getTextOpacity();
      }).append("textPath").attr("xlink:href", function (d) {
        return "#" + d.id;
      }).attr("startOffset", "35%").attr('fill', function (d) {
        return d.getTextFillColor();
      }).text(function (d) {
        return d.label;
      }).style('display', currentFL.optionsView.relationsName ? 'block' : 'none').on('click', function (d) {
        // Mouse down on a link label
        if (d != currentFL.selectLink) {
          //if link is not selected
          /* user want a new relation contraint betwwenn two node*/
          //deselect all nodes and links
          currentFL.unSelectNodes();
          currentFL.unSelectLink();

          //select link
          currentFL.setSelectLink(d);
          if (d.suggested) {
            var ll = [d];
            new AskomicsGraphBuilder().instanciateLink(ll);

            currentFL.updateInstanciateLinks(ll);

            if (d.source.suggested || d.target.suggested) {
              var node = d.source.suggested ? d.source : d.target;
              new AskomicsGraphBuilder().instanciateNode(node);
              currentFL.updateInstanciatedNode(node);
              node.getPanelView().create();
              // remove old suggestion
              currentFL.removeSuggestions();
              if (currentFL.selectNodes.length <= 1) {
                currentFL.unSelectNodes();
              } else {
                // insert new suggestion
                currentFL.insertSuggestions();
              }
            }
            //linksView.create(d);
            d.getPanelView().create();
          } else {
            currentFL.removeSuggestions();
          }
          /* update link view */
          d.getPanelView().show();

          currentFL.update();
        } else {
          currentFL.unSelectNodes();
          currentFL.unSelectLink();
          currentFL.update();
          AskomicsObjectView.hideAll();
        }
      });

      /* nodes or links could be removed by other views */
      new AskomicsGraphBuilder().synchronizeInstanciatedNodesAndLinks(this.nodes, this.links);

      // Arrows
      arrow.enter().append("svg:defs").append("svg:marker").attr("id", function (d) {
        return 'end-marker-' + d.id;
      }).attr('link_id', function (d) {
        return d.id;
      }).attr("class", "arrow").style('stroke', 'grey').style('fill', 'grey').attr("viewBox", "0 -5 10 10").attr("refX", 15).attr("refY", 0).attr("markerWidth", 6).attr("markerHeight", 6).attr("orient", "auto").append("path").attr("d", "M0,-5L10,0L0,5");

      // Second arrows
      arrow.enter().append("svg:defs").append("svg:marker").attr("id", function (d) {
        return 'start-marker-' + d.id;
      }).attr('link_id', function (d) {
        return d.id;
      }).attr("class", "arrow").style('stroke', 'grey').style('fill', 'grey').attr("viewBox", "0 -5 10 10").attr("refX", -5).attr("refY", 0).attr("markerWidth", 6).attr("markerHeight", 6).attr("orient", "auto").append("path").attr("d", "M0,0L10,-5L10,5Z");

      // Links
      link.enter().append("svg:path").attr("id", function (d) {
        return d.id;
      }).attr('idlink', function (d) {
        return d.id;
      }).attr("label", function (d) {
        return d.label;
      }).attr("class", "link").attr("marker-end", function (d) {
        return "url(#end-marker-" + d.id + ")";
      }).attr("marker-start", function (d) {
        return d.type == 'overlap' ? "url(#start-marker-" + d.id + ")" : "";
      }).style('stroke', 'grey').style("stroke-dasharray", function (d) {
        return d.suggested ? "2" : "";
      }).style("opacity", function (d) {
        return d.suggested ? "0.3" : "1";
      }).style("stroke-width", "2");
      //  .on("mouseover", function(d) { this.style[2]="4";}); /* "TypeError: 2 is read-only" occurs in browser */

      var node = this.vis.selectAll("g.node").data(this.nodes, function (d) {
        return d.id;
      });

      var nodeEnter = node.enter().append("g").attr("class", "node").call(this.force.drag);

      //setup_node(nodeEnter,slt_elt,slt_data,prev_elt,prev_data);
      nodeEnter.append("svg:circle").attr("style", "cursor: pointer;").attr("r", function (d) {
        return d.getRNode();
      }).attr("id", function (d) {
        return "node_" + d.id;
      }).attr("uri", function (d) {
        return d.uri;
      }).attr("class", "nodeStrokeClass").style('stroke', function (d) {
        return d.getNodeStrokeColor();
      }).style("fill", function (d) {
        return d.getColorInstanciatedNode();
      }).style("opacity", function (d) {
        return d.getOpacity();
      }).on('click', function (d) {
        currentFL.manageSelectedNodes(d);
        currentFL.unSelectLink();
        // Mouse up on a link
        //document.body.style.cursor = 'default';
        // nothing todo for intance
        if (!new AskomicsGraphBuilder().isInstanciatedNode(d)) {
          // When selected a node is not considered suggested anymore.
          new AskomicsGraphBuilder().instanciateNode(d);
          currentFL.updateInstanciatedNode(d);
          var listOfLinksInstancied = currentFL.selectListLinksUser(currentFL.links, d);
          new AskomicsGraphBuilder().instanciateLink(listOfLinksInstancied);
          currentFL.updateInstanciateLinks(listOfLinksInstancied);
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = listOfLinksInstancied[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var ll = _step5.value;

              ll.getPanelView().create();
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }

          d.getPanelView().create();
        }
        // show attribute view only if node is not selected
        if (!$.inArray(d, currentFL.selectNodes)) {
          d.getPanelView().show();
        }

        /* remove old suggestion */
        currentFL.removeSuggestions();
        /* insert new suggestion */
        currentFL.insertSuggestions();
        /* update graph */
        currentFL.update();
      });

      nodeEnter.append("svg:text") //.append("tspan")
      .attr("class", "textClass").attr("x", 14).attr('fill', function (d) {
        return d.getTextFillColor();
      }).style('stroke', function (d) {
        return d.getTextStrokeColor();
      }).style("opacity", function (d) {
        return d.getOpacity();
      }).attr("y", ".31em").attr("id", function (d) {
        return "txt_" + d.id;
      }).text(function (d) {
        return d.label;
      }).append("tspan").attr("font-size", "7").attr("baseline-shift", "sub").text(function (d) {
        return d.getLabelIndex();
      }).append("tspan").attr("constraint_node_id", function (d) {
        return d.id;
      }).style('display', currentFL.optionsView.attributesFiltering ? 'block' : 'none').attr("font-size", "8").attr("dy", "10").attr("x", 14).text(function (d) {
        return d.getAttributesWithConstraintsString();
      });

      link.exit().remove();
      node.exit().remove();

      this.force.on("tick", function () {
        node.attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        });

        link.attr("d", function (d) {
          var nlinks = d.source.nlink[d.target.id]; // same as d.target.nlink[d.source.id]

          /* diminution of arc to improve display of links */
          var penteX = d.target.x - d.source.x;
          var penteY = d.target.y - d.source.y;
          /* arrondi a une decimale */
          penteX = Math.round(penteX * 10) / 10;
          penteY = Math.round(penteY * 10) / 10;

          var XT = 0,
              YT = 0,
              XS = 0,
              YS = 0;
          var dim = d.source.getRNode() / 3.0;
          if (penteX > 0 && penteY > 0) {
            XT = -dim;
            YT = -dim;
            XS = dim;
            YS = dim;
          } else if (penteX > 0 && penteY < 0) {
            XT = -dim;
            YT = dim;
            XS = dim;
            YS = -dim;
          } else if (penteX < 0 && penteY > 0) {
            XT = dim;
            YT = -dim;
            XS = -dim;
            YS = dim;
          } else if (penteX < 0 && penteY < 0) {
            XT = dim;
            YT = dim;
            XS = -dim;
            YS = -dim;
          }
          var Xsource = d.source.x + XS;
          var Ysource = d.source.y + YS;
          var Xtarget = d.target.x + XT;
          var Ytarget = d.target.y + YT;
          /* Manage a line if weigth = 1 */
          if (nlinks <= 1) {
            return "M" + Xsource + "," + Ysource + "L" + Xtarget + "," + Ytarget;
          } else {
            /* sinon calcul d une courbure */
            var dx = Xtarget - Xsource,
                dy = Ytarget - Ysource,
                dr = Math.sqrt(dx * dx + dy * dy);

            // if there are multiple links between these two nodes, we need generate different dr for each path
            dr = dr / (1 + 1 / nlinks * (d.linkindex - 1));

            // generate svg path
            return "M" + Xsource + "," + Ysource + "A" + dr + "," + dr + " 0 0 1," + Xtarget + "," + Ytarget + "A" + dr + "," + dr + " 0 0 0," + Xsource + "," + Ysource;
          }
        });
      });

      // Ensure the nodes are in front and the links on the back
      $(".nodeStrokeClass").each(function (index) {
        var gnode = this.parentNode;
        gnode.parentNode.appendChild(gnode);
      });

      this.updateInstanciedNode();

      // Restart the force layout.
      this.force.charge(this.charge).linkDistance(this.distance).friction(this.friction)
      //.alpha(1)
      .size([this.w, this.h]).start();
    }
  }]);

  return AskomicsForceLayoutManager;
}();
"use strict";

/*jshint esversion: 6 */

/* Manage theses variables with a Singleton Classes */
var askomicsInitialization = false;
var forceLayoutManager;

function startVisualisation() {
  //Following code is automatically executed at start or is triggered by the action of the user
  startRequestSessionAskomics();
  forceLayoutManager.start();
}

function startRequestSessionAskomics() {

  if (askomicsInitialization) return;
  // Initialize the graph with the selected start point.
  $("#init").hide();
  $("#queryBuilder").show();
  d3.select("svg").remove();

  /* To manage construction of SPARQL Query */
  //graphBuilder = new AskomicsGraphBuilder(new AskomicsUserAbstraction());

  /* To manage the D3.js Force Layout  */
  forceLayoutManager = new AskomicsForceLayoutManager();

  askomicsInitialization = true;

  AskomicsObjectView.defineClickMenu();
}

function resetGraph() {
  if (!askomicsInitialization) return;

  // hide graph
  $("#queryBuilder").hide();

  // hide results table
  $("#results").empty();

  //remove all rightviews
  AskomicsObjectView.removeAll();

  //FL
  forceLayoutManager.reset();
  new AskomicsGraphBuilder().reset();

  // delete the svg
  d3.select("svg").remove();

  // show the start point selector
  $("#init").show();
  loadStartPoints();

  askomicsInitialization = false;
}

function loadStartPoints() {

  $("#btn-down").prop("disabled", true);
  $("#showNode").hide();
  $("#deleteNode").hide();

  var spq = $.sparql(new TriplestoreParametersView().configuration('endpoint'));

  spq.prefix("rdfs", new AskomicsUserAbstraction().getPrefix("rdfs")).prefix("rdf", new AskomicsUserAbstraction().getPrefix("rdf")).prefix("owl", new AskomicsUserAbstraction().getPrefix("owl")).select(["?entitySelect", "?label"]).distinct().filter("isIRI(?entitySelect)").filter("!regex(?entitySelect, \"^" + new AskomicsUserAbstraction().getPrefix("owl") + "\", \"i\")").filter("!regex(?entitySelect, \"^http://purl.obolibrary.org/obo/GO_\", \"i\")").where("?entitySelect", "rdf:type", "?entType").where("?entType", "rdfs:subClassOf*", "?genClass").values("?genClass", ['owl:Class']).optional().where("?entitySelect", "rdfs:label", "?label");

  spq.execute(function (results) {

    $("#startpoints").empty();
    for (var elt in results) {
      var value = results[elt];

      if (value.label !== undefined && $.trim(value.label) !== "") {
        //console.log("*"+JSON.stringify(value.label)+"*");
        $("#startpoints").append($("<option></option>").attr("data-value", JSON.stringify(value.entitySelect)).text(value.label));
      } else {
        var label = new AskomicsUserAbstraction().shortRDF(value.entitySelect.uri);
        $("#startpoints").append($("<option></option>").attr("data-value", JSON.stringify(value.entitySelect)).text(label));
      }
    }
    $("#starter").prop("disabled", true);
    $("#startpoints").click(function () {
      if ($("#starter").prop("disabled")) {
        $("#starter").prop("disabled", false);
      }
    });
  });
}

function loadNamedGraphs() {

  new AskomicsUserAbstraction().loadUserAbstraction();

  var select = $('#dropNamedGraphSelected');
  select.empty();
  manageDelGraphButton();

  var serviceNamedGraphs = new RestServiceJs('list_named_graphs');
  serviceNamedGraphs.getAll(function (namedGraphs) {
    if (namedGraphs.length === 0) {
      disableDelButton();
      return;
    } else {
      enableDelButton();
    }
    for (var graphName in namedGraphs) {
      select.append($("<option></option>").attr("value", namedGraphs[graphName]).append(formatGraphName(namedGraphs[graphName])));
    }
  });
}

function unselectGraphs() {
  $('#dropNamedGraphSelected option:selected').removeAttr("selected");
  manageDelGraphButton();
}

function manageDelGraphButton() {
  var graphs = $('#dropNamedGraphSelected').val();
  if (graphs === null) {
    $('#btn-empty-graph').prop('disabled', true);
  } else {
    $('#btn-empty-graph').prop('disabled', false);
  }
}

function disableDelButton() {
  $('#btn-empty').prop('disabled', true);
}

function enableDelButton() {
  $('#btn-empty').prop('disabled', false);
}

function formatGraphName(name) {
  /*
  Transform the name of the graph into a readable string
  */
  var date = name.substr(name.lastIndexOf('/') + 1);
  var new_name = name.substr(0, name.lastIndexOf('/'));
  return new_name + " (" + date + ")";
}

function loadStatistics() {

  displayModal('Please Wait', '', 'Close');

  new AskomicsUserAbstraction().loadUserAbstraction();

  var service = new RestServiceJs("statistics");
  service.getAll(function (stats) {
    $('#statistics_div').empty();
    $('#statistics_div').append($("<p></p>").text("Number of triples  : " + stats.ntriples)).append($("<p></p>").text("Number of entities : " + stats.nentities)).append($("<p></p>").text("Number of classes : " + stats.nclasses)).append($("<p></p>").text("Number of graphs: " + stats.ngraphs));

    var table = $("<table></table>").addClass('table').addClass('table-bordered');
    var th = $("<tr></tr>").addClass("table-bordered").attr("style", "text-align:center;");
    th.append($("<th></th>").text("Graph"));
    th.append($("<th></th>").text("Load Date"));
    th.append($("<th></th>").text("Username"));
    th.append($("<th></th>").text("Server"));
    th.append($("<th></th>").text("AskOmics Version"));
    table.append(th);

    $.each(stats.metadata, function (key) {

      var d = new Date(stats.metadata[key].loadDate * 1000);
      var date = d.toLocaleString();

      var tr = $("<tr></tr>").append($("<td></td>").text(stats.metadata[key].filename)).append($("<td></td>").text(date)).append($("<td></td>").text(stats.metadata[key].username)).append($("<td></td>").text(stats.metadata[key].server)).append($("<td></td>").text(stats.metadata[key].version));
      table.append(tr);
    });

    $('#statistics_div').append(table);

    table = $("<table></table>").addClass('table').addClass('table-bordered');
    th = $("<tr></tr>").addClass("table-bordered").attr("style", "text-align:center;");
    th.append($("<th></th>").text("Class"));
    th.append($("<th></th>").text("Nb"));
    table.append(th);

    $.each(stats['class'], function (key, value) {
      var tr = $("<tr></tr>").append($("<td></td>").text(key)).append($("<td></td>").text(value.count));
      table.append(tr);
    });
    $('#statistics_div').append(table);

    var entities = new AskomicsUserAbstraction().getEntities();

    table = $("<table></table>").addClass('table').addClass('table-bordered');
    th = $("<tr></tr>").addClass("table-bordered").attr("style", "text-align:center;");
    th.append($("<th></th>").text("Class"));
    th.append($("<th></th>").text("Relations"));
    table.append(th);

    for (var ent1 in entities) {
      var tr = $("<tr></tr>").append($("<td></td>").text(new AskomicsUserAbstraction().getAttribEntity(entities[ent1], new AskomicsUserAbstraction().longRDF('rdfs:label'))));
      var rels = "";
      var t = new AskomicsUserAbstraction().getRelationsObjectsAndSubjectsWithURI(entities[ent1]);
      var subjectTarget = t[0];
      for (var ent2 in subjectTarget) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = subjectTarget[ent2][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var rel = _step.value;

            rels += new GraphObject({ uri: entities[ent1] }).removePrefix() + " ----" + new GraphObject({ uri: rel }).removePrefix() + "----> " + new GraphObject({ uri: ent2 }).removePrefix() + "</br>";
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      tr.append($("<td></td>").html(rels));
      table.append(tr);
    }

    $('#statistics_div').append(table);

    table = $("<table></table>").addClass('table').addClass('table-bordered');
    th = $("<tr></tr>").addClass("table-bordered").attr("style", "text-align:center;");
    th.append($("<th></th>").text("Class"));
    th.append($("<th></th>").text("Attributes"));
    table.append(th);

    for (var _ent in entities) {
      //$.each(stats['class'], function(key, value) {
      var _tr = $("<tr></tr>").append($("<td></td>").text(new AskomicsUserAbstraction().getAttribEntity(entities[_ent], new AskomicsUserAbstraction().longRDF('rdfs:label'))));
      var attrs = "";
      var cats = "";
      var listAtt = new AskomicsUserAbstraction().getAttributesEntity(entities[_ent]);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = listAtt[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var att = _step2.value;

          attrs += '- ' + att.label + "</br>";
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      _tr.append($("<td></td>").html(attrs));
      table.append(_tr);
      //});
    }

    hideModal();
    $('#statistics_div').append(table);
  });
}

function emptyDatabase(value) {
  if (value == 'confirm') {
    $("#btn-del").empty();
    $("#btn-del") //.append('Confirm')
    .append($('<button></button>').attr('type', 'button').attr('class', 'btn btn-danger').attr('onclick', 'emptyDatabase(\"yes\")').append('Yes')).append($('<button></button>').attr('type', 'button').attr('class', 'btn btn-default').attr('onclick', 'emptyDatabase(\"no\")').append('No'));
    return;
  }

  if (value == 'no') {
    $("#btn-del").empty();
    $("#btn-del").append("<button id='btn-empty' onclick='emptyDatabase(\"confirm\")' class='btn btn-danger'>Delete all</button>");
    return;
  }

  if (value == 'yes') {
    displayModal('Please wait ...', '', 'Close');
    var service = new RestServiceJs("empty_database");
    service.getAll(function (empty_db) {
      hideModal();
      if ('error' in empty_db) {
        alert(empty_db.error);
      }
      $('#statistics_div').empty();
      $('#btn-del').empty();
      $("#btn-del").append("<button id='btn-empty' onclick='emptyDatabase(\"confirm\")' class='btn btn-danger'>Delete all</button>");
      $('#btn-del').append(' All triples deleted!');
      resetGraph();
      resetStats();
      loadNamedGraphs();
    });
  }
}

function deleteNamedGraph(graphs) {
  displayModal('Please Wait', '', 'Close');
  var service = new RestServiceJs("delete_graph");
  var data = { 'namedGraphs': graphs };
  service.post(data, function () {
    resetGraph();
    resetStats();
    hideModal();
    loadNamedGraphs();
  });
}

function resetStats() {
  $('#btn-del').empty();
  $("#btn-del").append("<button id='btn-empty' onclick='emptyDatabase(\"confirm\")' class='btn btn-danger'>Delete all</button>");
  $('#statistics_div').empty();
}

function displayModal(title, message, button) {
  $('#modalTitle').text(title);
  if (message === '') {
    $('.modal-body').hide();
    $('.modal-sm').css('width', '300px');
  } else {
    $('.modal-sm').css('width', '700px');
    $('.modal-body').show();
    $('#modalMessage').text(message);
  }
  $('#modalButton').text(button);
  $('#modal').modal('show');
}

function displayModalHtml(title, message, button) {
  $('#modalTitle').html(title);
  if (message === '') {
    $('.modal-body').hide();
    $('.modal-sm').css('width', '300px');
  } else {
    $('.modal-sm').css('width', '700px');
    $('.modal-body').show();
    $('#modalMessage').html(message);
  }
  $('#modalButton').html(button);
  $('#modal').modal('show');
}

function hideModal() {
  $('#modal').modal('hide');
}

function downloadTextAsFile(filename, text) {
  // Download text as file
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function setUploadForm(content, titleForm, route_overview, callback) {
  var service = new RestServiceJs("up/");
  service.getAll(function (formHtmlforUploadFiles) {
    formHtmlforUploadFiles.html = formHtmlforUploadFiles.html.replace("___TITLE_UPLOAD___", titleForm);

    $(content).html(formHtmlforUploadFiles.html);
    /*
           MAIN UPLOAD Third party => copy from /static/js/third-party/upload/main.js (thi file is disbale in askomics)
     */
    // Initialize the jQuery File Upload widget
    $(content).find('#fileupload').fileupload({
      // Uncomment the following to send cross-domain cookies:
      //xhrFields: {withCredentials: true},
      url: '/up/file/'
    });

    // Enable iframe cross-domain access via redirect option
    $(content).find('#fileupload').fileupload('option', 'redirect', window.location.href.replace(/\/[^\/]*$/, '/cors/result.html?%s'));

    // Load existing files
    $(content).find('#fileupload').addClass('fileupload-processing');
    $.ajax({
      // Uncomment the following to send cross-domain cookies:
      //xhrFields: {withCredentials: true},
      url: $(content).find('#fileupload').fileupload('option', 'url'),
      dataType: 'json',
      context: $(content).find('#fileupload')[0]
    }).always(function () {
      $(this).removeClass('fileupload-processing');
    }).done(function (result) {
      $(this).fileupload('option', 'done').call(this, $.Event('done'), { result: result });
    });

    // Integrate button
    $('.integrate-button').click(function () {
      var service = new RestServiceJs(route_overview);
      service.getAll(function (data) {
        callback(data);
      });
    });
  });
}

$(function () {
  // TODO: move inside AskomicsMenuFile
  // Startpoints definition
  loadStartPoints();

  // Loading a sparql query file
  $(".uploadBtn").change(function (event) {
    var uploadedFile = event.target.files[0];
    if (uploadedFile) {
      var fr = new FileReader();
      fr.onload = function (e) {
        var contents = e.target.result;
        startRequestSessionAskomics();
        forceLayoutManager.startWithQuery(contents);
      };
      fr.readAsText(uploadedFile);
    }
  });

  /*
     Click general GU Interface of Askomics :
    - manage navbar
    - show/hide content_{section}
   */

  // Get the overview of files to integrate
  $("#integration").click(function () {
    setUploadForm('div#content_integration', "Upload User CSV/TSV Files", "source_files_overview", displayTableTabularFile);
  });

  $("#integration_ttl").click(function () {
    setUploadForm('div#content_integration_ttl', "Upload User TTL Files", "insert_files_rdf", displayTableRDF);
  });

  // Visual effect on active tab (Ask! / Integrate / Credits)
  $('.nav li').click(function (e) {

    $('.nav li.active').removeClass('active');

    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
    }

    if (!($(this).attr('id') in { 'help': '', 'admin': '', 'userdata': '' })) {
      $('.container').hide();
      $('.container#navbar_content').show();
      $('.container#content_' + $(this).attr('id')).show();
    } else {
      $('.container#navbar_content').show();
    }

    e.preventDefault();
  });

  // A helper for handlebars
  Handlebars.registerHelper('nl2br', function (text) {
    var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
    return new Handlebars.SafeString(nl2br);
  });
});