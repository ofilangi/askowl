/*jshint esversion: 6 */

/*
  Manage Information Link View With a current selected link
*/
const LINKVIEW_NEGATIVE_COLOR_TEXT = 'red';
const LINKVIEW_TRANSITIVE_COLOR_TEXT = 'purple';
const LINKVIEW_TRANSITIVE_NEGATIVE_COLOR_TEXT = 'orange';
const LINKVIEW_SUBPROPERTY_COLOR_TEXT = 'bleue';

class AskomicsLinkView extends AskomicsObjectView {

  constructor(link) {
    super(link);
    this.link = link ;
  }
  display_help() {
    let help_title = 'Link "'+this.link.label+'"';
    let help_str = 'There is a relation between '+this.link.source.label+' and '+this.link.target.label+'.';
    help_str += ' This mean that attribute '+this.link.target.label+' of '+this.link.source.label+' is an entity.';
    $('#help_figure').addClass( "hidden" );
    displayModal(help_title, help_str, 'ok');
  }

  getTextColorLabel() {
    if ( this.link.negative && this.link.transitive ) return LINKVIEW_TRANSITIVE_NEGATIVE_COLOR_TEXT;
    if ( this.link.negative ) return LINKVIEW_NEGATIVE_COLOR_TEXT;
    if ( this.link.transitive ) return LINKVIEW_TRANSITIVE_COLOR_TEXT;
    if ( this.link.subProperty ) return LINKVIEW_SUBPROPERTY_COLOR_TEXT;
    return this.link.getTextFillColor();
  }

  getTextLabel() {
    if ( this.link.negative && this.link.transitive ) return 'NOT '+this.link.label+"+";
    if ( this.link.negative ) return 'NOT '+this.link.label;
    if ( this.link.transitive ) return this.link.label+"+";
    if ( this.link.subProperty ) return "SUBPROPERTY OF "+this.link.label+"";
    return this.link.label;
  }

  makeNegativeCheckBox() {
    let inpNeg = $('<input>')
    .attr('type', 'checkbox')
    .attr('linkid', this.link.id);

    let mythis = this;

    inpNeg.click(function(d) {
      let linkid = $(this).attr('linkid');
      let link = new AskomicsGraphBuilder().getInstanciedLink(linkid);
      if ($(this).is(':checked')) {
        link.negative = true;
      } else {
        link.negative = false;
      }
      $('#'+mythis.link.getSvgLabelId()).find('textPath').attr('fill',mythis.getTextColorLabel());
      $('#'+mythis.link.getSvgLabelId()).find('textPath').text(mythis.getTextLabel());
    });

    if (this.link.negative) {
      inpNeg.attr('checked', 'checked');
    }

    return inpNeg ;
  }
  makeTransitiveCheckBox() {
    let inpTrans = $('<input>')
    .attr('type', 'checkbox')
    .attr('linkid', this.link.id);

    let mythis = this;

    inpTrans.click(function(d) {
      let linkid = $(this).attr('linkid');
      let link = new AskomicsGraphBuilder().getInstanciedLink(linkid);
      if ($(this).is(':checked')) {
        link.transitive = true;
      } else {
        link.transitive = false;
      }
      $('#'+mythis.link.getSvgLabelId()).find('textPath').attr('fill',mythis.getTextColorLabel());
      $('#'+mythis.link.getSvgLabelId()).find('textPath').text(mythis.getTextLabel());
    });

    if (this.link.transitive) {
      inpTrans.attr('checked', 'checked');
    }

    return inpTrans ;
  }

  makeSubPropertyCheckBox() {
    let inpSubProp = $('<input>')
    .attr('type', 'checkbox')
    .attr('linkid', this.link.id);

    let mythis = this;

    inpSubProp.click(function(d) {
      let linkid = $(this).attr('linkid');
      let link = new AskomicsGraphBuilder().getInstanciedLink(linkid);
      if ($(this).is(':checked')) {
        link.subProperty = true;
      } else {
        link.subProperty = false;
      }
      $('#'+mythis.link.getSvgLabelId()).find('textPath').attr('fill',mythis.getTextColorLabel());
      $('#'+mythis.link.getSvgLabelId()).find('textPath').text(mythis.getTextLabel());
    });

    if (this.link.subProperty) {
      inpSubProp.attr('checked', 'checked');
    }

    return inpSubProp ;
  }

  create() {
    this.divPanel() ;
    let inpNeg = this.makeNegativeCheckBox();
    let inpTrans = this.makeTransitiveCheckBox();
    let inpSubProp = this.makeSubPropertyCheckBox();

    let listProperties = $('<div></div>')
                                .append($("<label></label>").html("Relations properties"))
                                .append($('<br>'))
                                .append($('<label></label>').append(inpTrans).append('Transitive relation'))
                                .append($('<br>'))
                                .append($('<label></label>').append(inpNeg).append('Negative relation'))
                                //.append($('<br>'))
                                //.append($('<label></label>').append(inpSubProp).append('rdfs:SubProperty relation'))
                                ;
    this.details.append($('<hr>'))
                .append(listProperties)
                .append($('<hr>'));

    $("#viewDetails").append(this.details);
  }

}
