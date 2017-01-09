/*jshint esversion: 6 */

class AskomicsLink extends GraphLink {


  constructor(link,sourceN,targetN) {
    super(link,sourceN,targetN);
    this._transitive = false ;
    this._negative   = false ;
    this._subProperty= true ;
  }

  set transitive (transitive) { this._transitive = transitive; }
  get transitive () { return this._transitive; }

  set negative (negative) { this._negative = negative; }
  get negative () { return this._negative; }

  set subProperty (subp) { this._subProperty = subp; }
  get subProperty () { return this._subProperty; }

  setjson(obj) {
    super.setjson(obj);

    this._transitive = obj._transitive ;
    this._negative = obj._negative ;
    this._subProperty = obj._subProperty ;

  }

  getPanelView() {
    return new AskomicsLinkView(this);
  }

  buildConstraintsSPARQL() {
    let blockConstraintByNode = [];
    let rel = this.URI();

    let addSC = "";
    if ( this.transitive ) addSC = "+";

    if ( this.subProperty ) {
      let propertyId = "?subProperty" + this.id;
      blockConstraintByNode.push("?"+this.source.SPARQLid+" " + propertyId + addSC +" "+"?"+this.target.SPARQLid);
      blockConstraintByNode.push(propertyId+" rdfs:subPropertyOf* "+rel);
    } else {
      blockConstraintByNode.push("?"+this.source.SPARQLid+" " + rel + addSC +" "+"?"+this.target.SPARQLid);
    }

    if ( this.negative ) {
      blockConstraintByNode = [blockConstraintByNode,'FILTER NOT EXISTS'];
    }

    let service = "";
    if ( this.source.service === this.target.service && this.target.service !== new AskomicsUserAbstraction().endpoint) {
      service = this.target.service;
    }

    if ( service !== '' ) {
      //service = new TriplestoreParametersView().config.endpoint;
      service = 'SERVICE <'+service+'>';
    }

    return [blockConstraintByNode,service];
  }

  instanciateVariateSPARQL(variates) {

  }

  getLinkStrokeColor() { return super.getLinkStrokeColor(); }

}
