import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as globals from '../globals.js'
import * as helpers from '../helpers.js'
import loading from './loading.jsx'
import CStepTitel from './CStepTitel.jsx'


class CklstRepeat extends Component {
   constructor(props) {
    super(props);
  }

  handleClick(eID, eID2, eID3) {
     helpers.navigateToElement(eID)
     // Make 3 sec pause and jump to toEntry, to show range from-to
     helpers.alertMessage('Entries will be repeated from this one', globals.INFO)
     helpers.sleep(3000).then(()=>{
        helpers.navigateToElement(eID2)
        helpers.alertMessage('To this one', globals.INFO)
        helpers.sleep(3000).then(()=>{
           helpers.navigateToElement(eID3, false)
           helpers.closeMessage()
        })
     })
     
  }
   
  render() {

    var entry=this.props.entry
    var section=this.props.section

    function conditionalStep() {
      if (entry.cid) {
        return <CStepTitel condition={helpers.getCondition(section.conditions, entry.cid)} />
      } 
    }
    
    var fromEntry = helpers.getContentEntryMeta(section, entry.repeat[0])
    var toEntry = helpers.getContentEntryMeta(section, entry.repeat[entry.repeat.length-1])
    
    return ( 
                 
            <div className="ag-panel">
               {conditionalStep()}
               <div className="ag-repeat-container" id={'ENTRY:' + section.pos + ':' + entry.id}>
  
                          <div className="ag-repeat-marker ag-repeat-color">Repeat</div>
                          <div className="ag-repeat-body">
                              <div className="ag-repeat-" style={{borderWidth: 0}}>Repeat entries: 
                                 <span className="ag-link" 
                                 onClick={this.handleClick.bind(this, 'ENTRY:' + section.pos + ':' + fromEntry.id, 'ENTRY:' + section.pos + ':' + toEntry.id, 'ENTRY:' + section.pos + ':' + entry.id)}>
                                 {globals.getEntryName(fromEntry.type)} - {globals.getEntryName(toEntry.type)}</span>
                              </div>
                          </div>
  
                </div>
           </div>)

  }
}



export default CklstRepeat