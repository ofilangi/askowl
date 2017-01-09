/*jshint esversion: 6 */

/* Manage theses variables with a Singleton Classes */
var askomicsInitialization = false;
var forceLayoutManager ;

function startVisualisation() {
    //Following code is automatically executed at start or is triggered by the action of the user
    startRequestSessionAskomics();
    forceLayoutManager.start();
}

function startRequestSessionAskomics() {

  if ( askomicsInitialization ) return ;
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
  if ( ! askomicsInitialization ) return ;

  // hide graph
  $("#queryBuilder").hide();

  // hide results table
  $("#results").empty();

  //remove all rightviews
  AskomicsObjectView.removeAll();

  //FL
  forceLayoutManager.reset() ;
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

  let spq = $.sparql(new TriplestoreParametersView().configuration('endpoint'));

  spq.prefix("rdfs",new AskomicsUserAbstraction().getPrefix("rdfs"))
      .prefix("rdf",new AskomicsUserAbstraction().getPrefix("rdf"))
      .prefix("owl",new AskomicsUserAbstraction().getPrefix("owl"))
      .select(["?entitySelect","?label"])
                .distinct()
                .filter("isIRI(?entitySelect)")
                .filter("!regex(?entitySelect, \"^"+new AskomicsUserAbstraction().getPrefix("owl")+"\", \"i\")")
                .filter("!regex(?entitySelect, \"^http://purl.obolibrary.org/obo/GO_\", \"i\")")
                .where("?entitySelect","rdf:type","?entType")
                .where("?entType","rdfs:subClassOf*", "?genClass")
                .values("?genClass",['owl:Class'])
                .optional()
                   .where("?entitySelect","rdfs:label","?label");

    spq.execute(function(results) {

      $("#startpoints").empty();
      for ( let elt in results ) {
        let value = results[elt];

        if ( value.label !== undefined && $.trim(value.label) !== "" ) {
          //console.log("*"+JSON.stringify(value.label)+"*");
          $("#startpoints").append($("<option></option>").attr("data-value", JSON.stringify(value.entitySelect)).text(value.label));
        } else {
          let label = new AskomicsUserAbstraction().shortRDF(value.entitySelect.uri);
          $("#startpoints").append($("<option></option>").attr("data-value", JSON.stringify(value.entitySelect)).text(label));
        }
      }
      $("#starter").prop("disabled", true);
      $("#startpoints").click(function(){
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
    serviceNamedGraphs.getAll(function(namedGraphs) {
        if (namedGraphs.length === 0) {
          disableDelButton();
          return;
        }else{
          enableDelButton();
        }
        for (let graphName in namedGraphs){
            select.append($("<option></option>").attr("value", namedGraphs[graphName])
                                                .append(formatGraphName(namedGraphs[graphName])));
        }
    });
}

function unselectGraphs() {
  $('#dropNamedGraphSelected option:selected').removeAttr("selected");
  manageDelGraphButton();
}

function manageDelGraphButton() {
  let graphs = $('#dropNamedGraphSelected').val();
  if (graphs === null) {
    $('#btn-empty-graph').prop('disabled', true);
  }else{
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
  let date = name.substr(name.lastIndexOf('/') + 1);
  let new_name = name.substr(0,name.lastIndexOf('/'));
  return new_name+" ("+date+")";
}

function loadStatistics() {


  displayModal('Please Wait', '', 'Close');

  new AskomicsUserAbstraction().loadUserAbstraction();

  var service = new RestServiceJs("statistics");
  service.getAll(function(stats) {
    $('#statistics_div').empty();
    $('#statistics_div')
    .append($("<p></p>").text("Number of triples  : "+stats.ntriples))
    .append($("<p></p>").text("Number of entities : "+stats.nentities))
    .append($("<p></p>").text("Number of classes : "+stats.nclasses))
    .append($("<p></p>").text("Number of graphs: "+stats.ngraphs));

    let table=$("<table></table>").addClass('table').addClass('table-bordered');
    let th = $("<tr></tr>").addClass("table-bordered").attr("style", "text-align:center;");
    th.append($("<th></th>").text("Graph"));
    th.append($("<th></th>").text("Load Date"));
    th.append($("<th></th>").text("Username"));
    th.append($("<th></th>").text("Server"));
    th.append($("<th></th>").text("AskOmics Version"));
    table.append(th);

    $.each(stats.metadata, function(key) {

      let d = new Date(stats.metadata[key].loadDate*1000);
      let date = d.toLocaleString();

        let tr = $("<tr></tr>")
            .append($("<td></td>").text(stats.metadata[key].filename))
            .append($("<td></td>").text(date))
            .append($("<td></td>").text(stats.metadata[key].username))
            .append($("<td></td>").text(stats.metadata[key].server))
            .append($("<td></td>").text(stats.metadata[key].version));
        table.append(tr);
    });

    $('#statistics_div').append(table);

    table=$("<table></table>").addClass('table').addClass('table-bordered');
    th = $("<tr></tr>").addClass("table-bordered").attr("style", "text-align:center;");
    th.append($("<th></th>").text("Class"));
    th.append($("<th></th>").text("Nb"));
    table.append(th);

    $.each(stats['class'], function(key, value) {
      let tr = $("<tr></tr>")
            .append($("<td></td>").text(key))
            .append($("<td></td>").text(value.count));
      table.append(tr);
    });
    $('#statistics_div').append(table);

    var entities = new AskomicsUserAbstraction().getEntities() ;

    table=$("<table></table>").addClass('table').addClass('table-bordered');
    th = $("<tr></tr>").addClass("table-bordered").attr("style", "text-align:center;");
    th.append($("<th></th>").text("Class"));
    th.append($("<th></th>").text("Relations"));
    table.append(th);

    for (let ent1 in entities ) {
      let tr = $("<tr></tr>")
            .append($("<td></td>").text(new AskomicsUserAbstraction().getAttribEntity(entities[ent1],new AskomicsUserAbstraction().longRDF('rdfs:label'))));
            let rels = "";
            var t = new AskomicsUserAbstraction().getRelationsObjectsAndSubjectsWithURI(entities[ent1]);
            var subjectTarget = t[0];
            for ( var ent2 in subjectTarget) {
              for (var rel of subjectTarget[ent2]) {
                rels += new GraphObject({ uri : entities[ent1]}).removePrefix() +
                " ----" + new GraphObject({ uri : rel}).removePrefix() +
                "----> " + new GraphObject({ uri : ent2}).removePrefix() + "</br>";
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

    for (let ent1 in entities ) {
    //$.each(stats['class'], function(key, value) {
      let tr = $("<tr></tr>")
            .append($("<td></td>").text(new AskomicsUserAbstraction().getAttribEntity(entities[ent1],new AskomicsUserAbstraction().longRDF('rdfs:label'))));
            let attrs = "";
            let cats = "";
            var listAtt = new AskomicsUserAbstraction().getAttributesEntity(entities[ent1]);
            for (var att of listAtt) {
                attrs += '- '+att.label +"</br>";
            }
            tr.append($("<td></td>").html(attrs));
      table.append(tr);
    //});
    }

    hideModal();
    $('#statistics_div').append(table);
  });
}

function emptyDatabase(value) {
    if (value == 'confirm') {
        $("#btn-del").empty();
        $("#btn-del")//.append('Confirm')
                      .append($('<button></button>')
                            .attr('type', 'button')
                            .attr('class', 'btn btn-danger')
                            .attr('onclick', 'emptyDatabase(\"yes\")')
                            .append('Yes')
                      ).append($('<button></button>')
                            .attr('type', 'button')
                            .attr('class', 'btn btn-default')
                            .attr('onclick', 'emptyDatabase(\"no\")')
                            .append('No')
                          );
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
            service.getAll(function(empty_db){
              hideModal();
              if ('error' in empty_db ) {
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
    let data = {'namedGraphs':graphs };
        service.post(data, function(){
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
    }else{
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
    }else{
      $('.modal-sm').css('width', '700px');
      $('.modal-body').show();
      $('#modalMessage').html(message);
    }
    $('#modalButton').html(button);
    $('#modal').modal('show');
}

function hideModal(){
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


function setUploadForm(content,titleForm,route_overview,callback) {
  var service = new RestServiceJs("up/");
  service.getAll(function(formHtmlforUploadFiles) {
    formHtmlforUploadFiles.html = formHtmlforUploadFiles.html.replace("___TITLE_UPLOAD___",titleForm);

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
    $(content).find('#fileupload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(
            /\/[^\/]*$/,
            '/cors/result.html?%s'
        )
    );

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
        $(this).fileupload('option', 'done')
            .call(this, $.Event('done'), {result: result});
    });

    // Integrate button
    $('.integrate-button').click(function() {
        var service = new RestServiceJs(route_overview);
        service.getAll(function(data) {
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
    $(".uploadBtn").change( function(event) {
      var uploadedFile = event.target.files[0];
      if (uploadedFile) {
          var fr = new FileReader();
          fr.onload = function(e) {
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
    $("#integration").click(function() {
        setUploadForm('div#content_integration',"Upload User CSV/TSV Files","source_files_overview",displayTableTabularFile);
    });

    $("#integration_ttl").click(function() {
        setUploadForm('div#content_integration_ttl',"Upload User TTL Files","insert_files_rdf",displayTableRDF);
    });

    // Visual effect on active tab (Ask! / Integrate / Credits)
    $('.nav li').click(function(e) {

        $('.nav li.active').removeClass('active');

        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
        }


        if (  ! ( $(this).attr('id') in { 'help' : '','admin':'','userdata':'' }) ) {
          $('.container').hide();
          $('.container#navbar_content').show();
          $('.container#content_' + $(this).attr('id')).show();
        } else {
          $('.container#navbar_content').show();
        }

        e.preventDefault();

    });

    // A helper for handlebars
    Handlebars.registerHelper('nl2br', function(text) {
        var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
        return new Handlebars.SafeString(nl2br);
    });
});
