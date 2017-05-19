import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as globals from '../globals.js'
import * as helpers from '../helpers.js'
import * as Actions from '../redux-actions.js'

import loading from './loading.jsx'

// This component is content of the popup when move moved on variable
// It listens to Store, for the id2stepidMapping object which is the mapping of entry IDs to StepIDs. It is populated by CklstSection component
class VarsPopup extends Component {

constructor(props) {
    super(props);
  }

handleMLeav() {
  this.props.removePopup(this.props.popupID)
  console.log('D4', 'Out')
}

handleClick(eID) {
  helpers.navigateToElement(eID)
}

render() {
   var this_ = this
  
   var Style = {maxWidth:"150px"}

   console.log('D1', this.props.props_.varsTree)
   console.log('D1', this.props.id2stepidMapping)

   var varsTree = this.props.props_.varsTree
   var id2stepidMapping = this.props.id2stepidMapping

   console.log('D1', varsTree.sections)

   function content() {
    var ret = []
    for (var key in varsTree.sections) {
       var secPos = key
       if (varsTree.sections.hasOwnProperty(key)) {
        var a = ( <div key={key}> {varsTree.sections[key].map((entry) => {
                     var stepID = helpers.getStepIDbyEntryID(id2stepidMapping, secPos, entry.id)
                     return (<li key={secPos + ":" + entry.id}>
                      <a onClick={this_.handleClick.bind(this_, 'STP:' + secPos + ':' + entry.id)} className="ag-cur-pointer">
                        <div style={{display: "table-cell"}}>
                          <span className="ag-badge ag-sec-color">{'Section' + ' ' + secPos}</span>
                          <span className="ag-badge ag-step-color">{'Step' + ' ' + stepID}</span>
                          <span>{entry.titel}</span></div></a></li>) }) } 
                  </div>)
        ret.push(a) 
         }} 
    return ret
   }
    
   return (
      <div className="card" style={Style} onMouseLeave={this.handleMLeav.bind(this)}>
          <ul>{content()}</ul>
      </div>
      )
}

}


const mapStateToProps$VarsPopup = function (state) {
   if (! "id2stepidMapping" in state) { return {} }

   return { id2stepidMapping: state.id2stepidMapping }
}

const mapDispatchToProps$VarsPopup = function(dispatch) {
  return {
    removePopup: function(id) {
      dispatch(Actions.actionRemovePopup(id))
    }
  }
}

const VarsPopup_ = connect(mapStateToProps$VarsPopup, mapDispatchToProps$VarsPopup)(VarsPopup)


class Variables extends Component {

constructor(props) {
    super(props);
    this.curX = 0
    this.curY = 0
    this.triggerPopup = true
    this.var = null
  }

handleMOut() {
  this.triggerPopup = true
  /* console.log('D1', helpers.findVariables(variable)) */
}

handleMOver() {
  this.props.removePopup('VARS')
}

/* Track the position of the cursor */
handleMove(variable, e) {
  this.var = variable
  this.curX = e.pageX
  this.curY = e.pageY
  if ( this.triggerPopup ) {
    this.props.addPopup({
              id:'VARS', 
              visible: true, 
              style: {},
              component: VarsPopup_,
              componentProps: {content: 'TTTEST '+ variable, varsTree: helpers.findVariables(variable)},
              position: {x: this.curX + 10, y: this.curY - 10} })
    this.triggerPopup = false
  }
}

render () {

   if (! this.props.variables) { return loading }

   var variables = Object.assign([], this.props.variables)

   /* Sort variables by id */
   variables.sort((a, b) => {
         return a.id - b.id
      })
   
   var VarsContent = variables.map( (variable) => {
        return ( <div key={variable.id} onMouseOut={this.handleMOut.bind(this)} 
          onMouseOver={this.handleMOver.bind(this)} onMouseMove={this.handleMove.bind(this, variable.name)}><span>{variable.name}</span></div> ) 
      }
    )

   return (
       <div ref={ (e) => { this.VariablesDiv=e; } } id="Variables">
          {VarsContent}
       </div>
    )
}

}

const mapStateToProps$Variables = function (state) {
   if (! state.checklist) { return {} }

   return { variables: state.checklist.variables }
}

const mapDispatchToProps$Variables = function(dispatch) {
  return {
    addPopup: function(popup) {
      dispatch(Actions.actionAddPopup(popup))
    },
     removePopup: function(id) {
      dispatch(Actions.actionRemovePopup(id))
    }
  }
}


export default connect(mapStateToProps$Variables, mapDispatchToProps$Variables)(Variables)
