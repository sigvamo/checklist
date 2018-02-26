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
}

handleClick(eID) {
  helpers.navigateToElement(eID)
}

render() {
   var this_ = this
  
   var Style = {width:"400px", maxWidth:"450px", padding:"3px"}

   var varsTree = this.props.varsTree
   var foundCnt = Object.keys(varsTree.sections).length
   var id2stepidMapping = this.props.id2stepidMapping

   function content() {
    var ret = []
    var show = ''
    for (var key in varsTree.sections) {
       var secPos = key
       if (varsTree.sections.hasOwnProperty(key)) {
         var a = varsTree.sections[key].map((entry) => {
                     var stepID = helpers.getStepIDbyEntryID(id2stepidMapping, secPos, entry.id)
                     var label = 'ENTRY:'
                     switch (entry.type) {
                      case 0: 
                        show = 'Section body'
                        break;
                      case 1:
                        show = 'Step' + ' ' + stepID
                        break;
                      case 2:
                        show = 'Input'
                        break;
                     }
  
                     return (<tr key={secPos + ":" + entry.id} onClick={this_.handleClick.bind(this_, label + secPos + ':' + entry.id)} className="ag-cur-pointer">
                                <td style={{width:"10%",whiteSpace:"nowrap"}}><span>{'Section' + ' ' + secPos}</span></td>
                                <td style={{width:"10%",whiteSpace:"nowrap",backgroundColor:"#f4f5f7"}}><span>{show}</span></td>
                                <td style={{width:"80%"}}><span>{entry.titel}</span></td>
                             </tr>) })
       }                  
        ret.push(a) 
         } 
    return <table className="ag-variables-links"><tbody>{ret}</tbody></table>
   }
    
   if (foundCnt === 0) {
     var message = 'not used in any entity.'
   } else {
     var message = 'used in next entities:'
   }

   return (
      <div className="card" style={Style} onMouseLeave={this.handleMLeav.bind(this)}>
          <div><span className="ag-variables-title">Variable <b>$${this.props.content}$$</b> {message}</span></div>
          {content()}
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
  this.props.removePopup(globals.POPUP_ID_VARIABLES)
}

/* Track the position of the cursor */
handleMove(variable, e) {
  this.var = variable
  this.curX = e.pageX
  this.curY = e.pageY
  if ( this.triggerPopup ) {
    this.props.addPopup({
              id:globals.POPUP_ID_VARIABLES, 
              visible: true, 
              style: {},
              component: VarsPopup_,
              componentProps: {content: variable, varsTree: helpers.findVariables(variable)},
              position: {x: this.curX + 10, y: this.curY - 20} })
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
        return ( <tr key={variable.id}><td><div onMouseOut={this.handleMOut.bind(this)} 
          onMouseOver={this.handleMOver.bind(this)} onMouseMove={this.handleMove.bind(this, variable.name)}><pre><code>{variable.name}</code></pre></div>
           </td>
           <td>
             <pre><code>{variable.default}</code></pre>
           </td>
           </tr>) 
      }
    )

   return (
       <div ref={ (e) => { this.VariablesDiv=e; } } id="Variables">
        <table className="ag-variables-list"><tbody>
        <tr className="ag-variables-list-title"><td><b>Variable</b></td><td><b>Default value</b></td></tr>
          {VarsContent}
        </tbody></table>
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
