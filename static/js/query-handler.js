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

    let variates              = tab[0];
    let constraintesRelations = tab[1];

    let reqPrefix = "";

    let req = "";
    req += "SELECT DISTINCT "+variates.join(" ")+"\n";
    req += "WHERE \n";
    let reqWhere = buildRecursiveBlock('',constraintesRelations);
    let re = /(\w+):\w+/gi;
    let resTab ;
    let lPref = {} ;
    while ((resTab = re.exec(reqWhere)) !== null) {
      console.log(resTab);
      if ( ! (resTab[1] in lPref) ) {
        lPref[resTab[1]] = "";
        reqPrefix += "PREFIX " + resTab[1] + ":<" + new AskomicsUserAbstraction().getPrefix(resTab[1])+">\n";
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
function buildRecursiveBlock(tabul,constraints) {
  if ( constraints.length == 2 && typeof(constraints[0])==='object' && typeof(constraints[1])=== 'string' ) {
    return tabul+constraints[1] + "{\n"+ buildRecursiveBlock(tabul+'\t',constraints[0])+tabul+"}\n";
  }
  let req = '';
  for (let elt in constraints) {
    if (typeof(constraints[elt]) === 'string') {
      req+=tabul+constraints[elt]+".\n";
    } else if ( typeof(constraints[elt]) ==='object' && constraints[elt].length == 2 && typeof(constraints[elt][0])==='object' && typeof(constraints[elt][1])==='string') {
        if ( constraints[elt][1] !== '' ) {
          req+= tabul+constraints[elt][1] + " {\n"+ buildRecursiveBlock(tabul+'\t',constraints[elt][0])+tabul+"}\n";
        } else {
          req+= buildRecursiveBlock(tabul,constraints[elt][0]);
        }
    } else {
        throw "buildRecursiveBlock:: constraint malformed :"+JSON.stringify(elt);
    }
  } // end for
  return req;
}

function viewQueryResults() {
    $("#btn-down").prop("disabled", false);
    displayModal('Please wait', '', 'Close');

    let time = $.now();
    //let service = new RestServiceJs("sparqlquery");
    let queryString = prepareQuery(false, false);

    let conf = {};
    conf.endpoint = new TriplestoreParametersView().configuration('endpoint');
    $.sparqlrequest(conf,queryString,function(data) {
      hideModal();
      let new_time = $.now();
      let exec_time = new_time - time;
      console.log('===> query executed in '+exec_time+' ms');
      var results = data.results.bindings;
      new AskomicsResultsView(results).displayResults();
    });
}
