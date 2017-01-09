/*jshint esversion: 6 */

class AskomicsResultsView {
  constructor(data) {
    this.data = data ;

    this.activesAttributes      = undefined ; // Attributes id by Node Id to Display
    this.activesAttributesLabel = undefined ; // Attributes label by Node Id to Display
    this.activesAttributesUrl   = undefined ; // Url when results is clickable
  }

  is_valid() {
    if ( this.data === undefined ) throw "AskomicsResultsView :: data prototyperty in unset!";
  }

  is_activedAttribute() {
    if (this.activesAttributes === undefined ) throw "AskomicsResultsView :: activesAttributes is not set.";
  }

  setActivesAttributes() {

    this.is_valid();

    this.activesAttributes      = {} ;
    this.activesAttributesLabel = {} ;
    this.activesAttributesUrl   = {} ;
    let graphBuilder = new AskomicsGraphBuilder();

    for (let i=0;i<graphBuilder.nodes().length;i++ ) {
      let node = graphBuilder.nodes()[i];
      if ( ! node.actif ) continue;
      let attr_disp = node.getAttributesDisplaying();
      this.activesAttributes[node.id] = attr_disp.id;
      this.activesAttributesLabel[node.id] = attr_disp.label;
      if ( 'url' in attr_disp ) { //if results is clickable
        this.activesAttributesUrl[node.id] = attr_disp.url;
      } else {
         this.activesAttributesUrl[node.id] = {};
       }
      if (this.activesAttributes[node.id].length != this.activesAttributesLabel[node.id].length ) {
        throw "Devel: Error node.getAttributesDisplaying give array with different size:"+str(this.activesAttributes[node.id].length)+","+str(this.activesAttributesLabel[node.id].length);
      }
    }
  }

  displayResults() {
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
        return ;
      }

      /* new presentation by entity */
      let table = $('<table></table>')
                    .addClass('table')
                    .addClass('table-bordered')
                    .addClass('table-results');

      $("#results")
        //.append($('<table></table>').append(this.build_simple_header_results()))
        .append(table.append(this.build_simple_subheader_results(new AskomicsGraphBuilder().nodes()))
                    .append(this.build_body_results(new AskomicsGraphBuilder().nodes()))
        );
/*
        $("#results")
          .append(table.append(this.build_simple_header_results())
          .append(this.build_simple_subheader_results(new AskomicsGraphBuilder().nodes()))
          .append(this.build_body_results(new AskomicsGraphBuilder().nodes())));
*/


//https://datatables.net/extensions/buttons/examples/initialisation/export.html
      table.DataTable( {
       "paging"     : true,
       "ordering"   : true,
       "info"       : true,
       dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel'
        ]
   } );

  }

  build_simple_header_results() {
    let head = $('<thead></thead>');
    let row = $('<tr></tr>');

    this.is_valid();
    this.is_activedAttribute();

    /* set Entity Header */
    for (let i=0;i<new AskomicsGraphBuilder().nodes().length;i++ ) {
      let node = new AskomicsGraphBuilder().nodes()[i];
      if ( ! node.actif ) continue;

      let nAttributes = this.activesAttributes[node.id].length;
      /* Fomattage en indice du numero de l'entité */
      row.append($('<th></th>')
                      .addClass("table-bordered")
                      .attr("style", "text-align:center;")
                      .attr("colspan",nAttributes).append(node.formatInHtmlLabelEntity())
                    );
    }

    head.append(row);
    return head;
  }


  build_header_results() {
    let head = $('<thead></thead>');
    let row = $('<tr></tr>');

    this.is_valid();
    this.is_activedAttribute();

    /* set Entity Header */
    for (let i=0;i<new AskomicsGraphBuilder().nodes().length;i++ ) {
      let node = new AskomicsGraphBuilder().nodes()[i];
      if ( ! node.actif ) continue;

      let nAttributes = this.activesAttributes[node.id].length;
      /* Fomattage en indice du numero de l'entité */
      row.append($('<th></th>')
                      .addClass("table-bordered")
                      .addClass("active")
                      .addClass("entityHeaderResults")
                      .attr("id", node.id)
                      .attr("style", "text-align:center;")
                      .attr("colspan",nAttributes).append(node.formatInHtmlLabelEntity())
                    );
    }

    let currentView = this ;
    row.sortable({   // allow to change order of display
         placeholder: "ui-state-highlight",
         start: function (event, ui) {
           ui.item.toggleClass("highlight");
           // modify ui.placeholder however you like
           //ui.placeholder.attr("colspan",ui.item.attr("colspan"));
           //ui.placeholder.css("width",0);
         },
         stop: function (event, ui) {
                ui.item.toggleClass("highlight");
               },
         update: function (event, ui) {
           let nodeList = [];
           $(".entityHeaderResults").each(function( index ) {
             nodeList.push($(this).attr("id"));
           });
           let lNodes = new AskomicsGraphBuilder().nodes(nodeList,'id');
           $(this).parent().parent().find("thead:eq(1)").remove();
           $(this).parent().parent().find("tbody").remove();

           $(this).parent().parent().append(currentView.build_subheader_results(lNodes));
           $(this).parent().parent().append(currentView.build_body_results(lNodes));
         }
       }).disableSelection();

    head.append(row);
    return head;
  }

  build_simple_subheader_results(nodeList) {

    this.is_valid();
    this.is_activedAttribute();

    let head = $('<thead></thead>');
    let row = $('<tr></tr>');
    for (let i=0;i<nodeList.length;i++ ) {
      let node = nodeList[i];
      if ( ! node.actif ) continue;
      for (let sparqlid in this.activesAttributes[node.id]) {
        console.log(sparqlid+"="+this.activesAttributesLabel[node.id][sparqlid]);
        row.append($('<th></th>')
           .addClass("success")
           .addClass("table-bordered").html(this.activesAttributesLabel[node.id][sparqlid]+node.getLabelIndex()));
      }
    }
    head.append(row);
    return head;
  }


  build_subheader_results(nodeList) {

    this.is_valid();
    this.is_activedAttribute();

    let head = $('<thead></thead>');
    let row = $('<tr></tr>');
    for (let i=0;i<nodeList.length;i++ ) {
      let node = nodeList[i];
      if ( ! node.actif ) continue;
      for (let sparqlid in this.activesAttributes[node.id]) {
        row.append($('<th></th>')
           .addClass("success")
           .addClass("attributesHeaderResults")
           .attr("sparqlid",this.activesAttributes[node.id][sparqlid])
           .attr("nodeid",node.id)
           .addClass("table-bordered").text(this.activesAttributesLabel[node.id][sparqlid]));
      }
    }
    let currentView = this ;
    row.sortable({   // allow to change order of display
         placeholder: "ui-state-highlight",
         items: ":not(.ui-state-disabled)",
         cancel: '.ui-state-disabled',
         start: function (event, ui) {
           $(".attributesHeaderResults").css({width: $(ui.item).width()});
           // unactive cells associated with other node
           let currentCell = $(".attributesHeaderResults:eq("+ui.item.index()+")");
           let nodeid = currentCell.attr("nodeid");
           // unselcted other element
           //$('.attributesHeaderResults').not(":eq("+ui.item.index()+")").addClass('ui-state-disabled');
           //unallow to place the cell in an other node id
           $('.attributesHeaderResults[nodeid!='+nodeid+']').addClass('ui-state-disabled');
         },
         stop: function (event, ui) {
           $('.attributesHeaderResults').removeClass('ui-state-disabled');
         },
         update: function (event, ui) {

           let nodeList = [];
           $(".entityHeaderResults").each(function( index ) {
             nodeList.push($(this).attr("id"));
           });
           let lNodes = new AskomicsGraphBuilder().nodes(nodeList,'id');

           let attList = [];
           $(".attributesHeaderResults").each(function( index ) {
             let obj = {};
             obj.sparqlid = $(this).attr("sparqlid");
             obj.nodeid = $(this).attr("nodeid");
             attList.push(obj);
           });
           /*
              rebuild activesAttributesLabel activesAttributes
           */

           currentView.activesAttributes = {};
           for (let ielt in attList) {
              let elt = attList[ielt];
              if (!(elt.nodeid in currentView.activesAttributes))
                currentView.activesAttributes[elt.nodeid] = [];
              currentView.activesAttributes[elt.nodeid].push(elt.sparqlid);
           }

           $(this).parent().parent().parent().find("tbody").remove();
           $(this).parent().parent().append(currentView.build_body_results(lNodes));
         }
       }).disableSelection();

    head.append(row);
    return head;
  }

  build_body_results(nodeList) {

    this.is_valid();
    this.is_activedAttribute();

    let body = $('<tbody></tbody');
    for (let i=0;i<this.data.length;i++ ) {
      let row = $('<tr></tr>');
      for (let j=0;j<nodeList.length;j++ ) {
        let node = nodeList[j];
        if ( ! node.actif ) continue;
        for (let sparqlId in this.activesAttributes[node.id]) {
          let headerName = this.activesAttributes[node.id][sparqlId];
          let val = "";
          if ( this.data[i][this.activesAttributes[node.id][sparqlId]].value !== undefined )
            val = this.data[i][this.activesAttributes[node.id][sparqlId]].value;

          //if ( headerName in this.activesAttributesUrl[node.id] ) {
          if ( this.data[i][this.activesAttributes[node.id][sparqlId]].type === 'uri') {
            let valWithPrefix = new AskomicsUserAbstraction().shortRDF(val);
            //let url = this.activesAttributesUrl[node.id][headerName].replace("%s",this.data[i][this.activesAttributes[node.id][sparqlId]]);
            row.append($('<td></td>').html($('<a></a>').attr('href',val).attr('target','_blank').text(valWithPrefix)));
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
}
