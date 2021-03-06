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
(function($){

  $.sparqlrequest = function(config,query, callback) {
    //var url = "http://query.yahooapis.com/v1/public/yql?format=json&q=" + $.URLEncode(query);
    if ( config === undefined || config.endpoint === undefined ) {
      throw "sparqlrequest : can not find endpoint in config var.";
    }
    let method = config.method===undefined?'POST':config.method;
    let output = config.output===undefined?'jsonp':config.output;
    let contentType = config.contentType===undefined?'application/sparql-query':config.contentType;

    let url = config.endpoint+"?query="+ encodeURIComponent(query) +"&format=json";//+"&callback=?";

    console.log("URL\n----------------------------\n"+url);

    var ajax = $.ajax(
      {
        type: method,
        url: url,
        dataType: output,
        success: callback,
        processData: false,
        contentType: contentType,
        crossDomain:true,
        cache: false,
        error: function (jqXHR,status,errorThrown) {
          alert(errorThrown);
          console.err(status);
          console.err(errorThrown);
        }
      });

  };

  var URI = function(uri) {
    this.uri = uri;
  };

  var Query = function(endpoint, options, parentQuery) {
    this.config = {
      "endpoint" : endpoint,
      "method" : "POST",
      "output" : "jsonp",
      'contentType' : 'application/sparql-query; charset=utf-8'//application/json; charset=utf-8
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

  Query.prototype.end = function() {
    return this._parentQuery;
  };

  Query.prototype.query = function(qstring) {
    this._storedQuery = qstring;
    return this;
  };

  Query.prototype.execute = function(callback,...args) {
    var output = this.config.output;
    var queryString = this._storedQuery;

    var _clean = function(val) {
      if(val.type == "literal") {
        return val.value;
      }
      else if(val.type == "uri") {
        return new URI(val.value);
      }
      else {
        return val.value;
      }
    };

    var _preproc = function(data) {
      if ( data.results === null ) {
        throw "jquery.sparql.js:results null";
      }
      var results = data.results.bindings;
      var cleaned_results = [];
      for(var r in results) {
        var result = results[r];
        var cleaned_obj = {};
        for(var k in result) {
          cleaned_obj[k] = _clean(result[k]);
        }
        cleaned_results.push(cleaned_obj);
      }
      callback(cleaned_results,args);
    };

    if (queryString === "") queryString = this.serialiseQuery();
    console.log("========== jquery sparql ===============");
    console.log(queryString);
    console.log("========================================");

    $.sparqlrequest(this.config,queryString, _preproc);
    return this;
  };

  Query.prototype.serialiseQuery = function() {
    var queryString = [];

    // Prefixes
    for(let i = 0; i < this.prefixes.length; i++) {
      var pfx = this.prefixes[i];
      queryString.push( "PREFIX " + pfx.prefix + ": <" + pfx.uri + ">");
    }

    // Type and projection
    queryString.push(this.queryType);
    if(this.combiner !== "") {
      queryString.push(this.combiner);
    }
    if(this.queryType === "SELECT" && this.variables.length === 0) {
      queryString.push("*"); // No variables is seen as an implicit projection over ALL variables
    }
    else {
      for(var i = 0; i < this.variables.length; i++) {
        var v = this.variables[i];
        queryString.push(v);
      }
    }

    // Add the default graphs
    for(let i = 0; i < this.defaultGraphs.length; i++) {
      var defaultGraph = this.defaultGraphs[i];
      queryString.push("FROM <" + defaultGraph + ">");
    }

    // Add the named graphs
    for(let i = 0; i < this.namedGraphs.length; i++) {
      var namedGrph = this.namedGraphs[i];
      queryString.push("FROM NAMED <" + namedGrph + ">");
    }

    // Start WHERE block
    queryString.push("WHERE {");

    // Basic triple patterns and more exotic blocks
    for(let i = 0; i < this.patterns.length; i++) {
      var pat = this.patterns[i];

      // Basic triple
      if(pat._sort == "triple") {
        queryString.push(pat.s + " " + pat.p + " " + pat.o + ".");
      }
      // Optionals
      else if(pat._sort == "optional") {
        queryString.push("OPTIONAL");
        queryString.push(pat.subquery.serialiseBlock());
      }
      // Graph blocks
      else if(pat._sort == "graph") {
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
      else if(pat._sort == "block") {
        queryString.push(pat.subquery.serialiseBlock());
      }
    }

    // Filters
    for(let i = 0; i < this.filters.length; i++) {
      let flt = this.filters[i];
      queryString.push("FILTER ( " + flt + " )");
    }

    for(let i = 0; i < this.filtersNotExist.length; i++) {
      let flt = this.filtersNotExist[i];
      queryString.push("FILTER NOT EXISTS( " + flt + " )");
    }

    // Values
    for(let i = 0; i < this._values.length; i++) {
      let flt = this._values[i];
      let stringValues = "VALUES "+ flt.var + " {";
      for (let j=0;j<flt.values.length;j++) {
        stringValues += " "+ flt.values[j];
      }
      stringValues += "}";

      queryString.push(stringValues);
    }

    // End WHERE block
    queryString.push("}");

    if(this.orders.length > 0) {
      queryString.push("ORDER BY");
      for(let i = 0; i < this.orders.length; i++) {
        var odr = this.orders[i];
        queryString.push(odr);
      }
    }

    if(this.limitCount > -1) {
      queryString.push("LIMIT " + this.limitCount);
    }

    if(this.offsetCount > 0) {
      queryString.push("OFFSET " + this.offsetCount);
    }

    return queryString.join("\n");
  };

  Query.prototype.serialiseBlock = function() {
    var queryString = [];

    // Start block
    queryString.push("{");

    // Basic triple patterns and more exotic blocks
    for(var i = 0; i < this.patterns.length; i++) {
      var pat = this.patterns[i];

      // Basic triple
      if(pat._sort == "triple") {
        queryString.push(pat.s + " " + pat.p + " " + pat.o + ".");
      }
      // Optionals
      else if(pat._sort == "optional") {
        queryString.push("OPTIONAL");
        queryString.push(pat.subquery.serialiseBlock());
      }
      // Graph blocks
      else if(pat._sort == "graph") {
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
      else if(pat._sort == "block") {
        queryString.push(pat.subquery.serialiseBlock());
      }
    }

    // Filters
    for(let i = 0; i < this.filters.length; i++) {
      let flt = this.filters[i];
      queryString.push("FILTER ( " + flt + " )");
    }

    for(let i = 0; i < this.filtersNotExist.length; i++) {
      let flt = this.filtersNotExist[i];
      queryString.push("FILTER NOT EXISTS( " + flt + " )");
    }

    // Values
    for(let i = 0; i < this._values.length; i++) {
      let flt = this._values[i];
      let stringValues = "VALUES "+ flt.var + " {";
      for (let j=0;j<flt.values.length;j++) {
        stringValues += " "+ flt.values[j];
      }
      stringValues += "}";

      queryString.push(stringValues);
    }

    // End block
    queryString.push("} .");
    return queryString.join("\n");

  };

  Query.prototype.distinct = function() {
    this.combiner = "DISTINCT";
    return this;
  };

  Query.prototype.reduced = function() {
    this.combiner = "REDUCED";
    return this;
  };

  Query.prototype.select = function(variables) {
    this.queryType = "SELECT";
    if (variables) this.variables = variables;
    return this;
  };

  Query.prototype.describe = function(variables) {
    this.queryType = "DESCRIBE";
    if (variables) this.variables = variables;
    return this;
  };

  Query.prototype.prefix = function(prefix, uri) {
    this.prefixes.push({ "prefix" : prefix, "uri" : uri});
    return this;
  };

  Query.prototype.from = function(graph, isNamed) {
    if(isNamed) {
      this.namedGraphs.push(graph);
    }
    else {
      this.defaultGraphs.push(graph);
    }
    return this;
  };

  Query.prototype.where = function(subj, prop, obj) {
    if (!obj && !prop) {
      // We're in a subj-prop repeating section, use previous subj and prop
      return this.where(this._prevSubj, this._prevProp, subj);
    }
    else if (!obj) {
      // We're in a subj repeating section, use previous subj
      this._prevProp = subj;
      return this.where(this._prevSubj, subj, prop);
    }
    else {
      // We have a full triple
      this._prevSubj = subj;
      this._prevProp = prop;
      this.patterns.push({ "_sort" : "triple", "s" : subj, "p" : prop, "o" : obj });
      return this;
    }
  };

  Query.prototype.values = function(idvar,listValues) {
    this._values.push({"var":idvar, "values": listValues });
    return this;
  };

  Query.prototype.filter = function(filter) {
    this.filters.push(filter);
    return this;
  };

  Query.prototype.filterNotExists = function(filter) {
    this.filtersNotExist.push(filter);
    return this;
  };

  Query.prototype.orderby = function(order) {
    this.orders.push(order);
    return this;
  };

  Query.prototype.limit = function(limit) {
    this.limitCount = limit;
    return this;
  };

  Query.prototype.offset = function(offset) {
    this.offsetCount = offset;
    return this;
  };

  Query.prototype.optional = function() {
    var opt = new Query(this.config.endpoint, this.config, this);
    this.patterns.push({ "_sort" : "optional", "subquery" : opt });
    return opt;
  };

  Query.prototype.graph = function(name) {
    var grph = new Query(this.config.endpoint, this.config, this);
    this.patterns.push({ "_sort" : "graph", "graphName" : name, "subquery" : grph });
    return grph;
  };

  Query.prototype.service = function(endpoint) {
    var srvc = new Query(this.config.endpoint, this.config, this);
    this.patterns.push({ "_sort" : "service", "serviceEndpoint" : endpoint, "subquery" : srvc });
    return srvc;
  };

  Query.prototype.block = function() {
    var blk = new Query(this.config.endpoint, this.config, this);
    this.patterns.push({ "_sort" : "block", "subquery" : blk });
    return blk;
  };

  $.sparql = function(endpoint, options) {
    return new Query(endpoint, options);
  };

})(jQuery);
