import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as globals from '../globals.js'
import * as helpers from '../helpers.js'
import loading from './loading.jsx'
import CStepTitel from './CStepTitel.jsx'


class CklstGoto extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(eID) {
     helpers.navigateToElement(eID)
  }
   
  render() {

    var entry=this.props.entry
    var section=this.props.section

    function conditionalStep() {
      if (entry.cid) {
        return <CStepTitel condition={helpers.getCondition(section.conditions, entry.cid)} />
      } 
    }
    
    var gotoEntry = helpers.getContentEntryMeta(section, entry.goto)
    
    return ( 
                 
            <div className="ag-panel">
               {conditionalStep()}
               <div className="ag-goto-container" id={'ENTRY:' + section.pos + ':' + entry.id}>
  
                          <div className="ag-goto-marker ag-goto-color">GoTo</div>
                          <div className="ag-goto-body">
                              <div className="ag-goto-" style={{borderWidth: 0}}>Goto entry: 
                                 <span className="ag-link" onClick={this.handleClick.bind(this, 'ENTRY:' + section.pos + ':' + gotoEntry.id)}>{globals.getEntryName(gotoEntry.type)}</span>
                              </div>
                          </div>
  
                </div>
           </div>)

  }
}



export default CklstGoto