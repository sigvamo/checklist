import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as globals from '../globals.js'
import * as helpers from '../helpers.js'
import * as Actions from '../redux-actions.js'

import loading from './loading.jsx'


/*

Accepted properties:
  action - Which action will be done 'ADD' or 'MODIFY'
  entryType - Integer type of the entry
  position - Position of the entry to be modified or added after

*/

class CklstAdminModifyTextEntry extends Component {
  constructor(props) {
    super(props);
    var currEntryData
  }

  componentWillMount() {
    if (this.props.action === 'MODIFY') {
     this.currEntryData = helpers.getCklstCurrent(this.props.entryType, this.props.position)
     }
  }

  componentDidMount() { /* eslint-disable */
    CKEDITOR.replace('entryEditor', globals.CKconfig);
  }

  handleClickCANCEL(e) {
    this.props.removePopup(globals.POPUP_ID_CKLSTEDITOR)
  }
  

  handleClickSAVE(e) { /* eslint-disable */
    helpers.cklstAdminEngine('ADD', this.props.entryType, CKEDITOR.instances.entryEditor.getData())
    this.props.removePopup(globals.POPUP_ID_CKLSTEDITOR)
  }
  
  render() { 
    var action = this.props.action;
    var wHeight = window.innerHeight;
    var wWidth  = window.innerWidth;
    
    var WindowStyle = {width: wWidth*0.9, height: wHeight*0.5}

    console.log('DEBUG1', this.currEntryData)
 
    return (
       
       <div style={WindowStyle} className="card darken-1 ag-popup" >
       <div className="ag-grid ag-card-grid-standard-popup">

            {/*TITEL*/}
            <div className="card-title ag-grid-item-popup-header ag-capitalize">
               {(() => {
                 if (action == 'ADD') {
                      return globals.metadata['text']['ck_add'] + ' ' + globals.metadata['text']['ck_entry']     
                 } else {
                      return globals.metadata['text']['ck_modify'] + ' ' + globals.metadata['text']['ck_entry']
                 }})()                  
               }
            </div>
            
            {/*BODY*/}
            <div className="card-content ag-grid-item-popup-body">
                   
            {/*Input fields*/}
           
             <div className="input-field col-centered">
               {/*Placeholder element for CKEDITOR*/}
               <div name="entryEditor" id="entryEditor" dangerouslySetInnerHTML={{__html:this.currEntryData}}/>
             </div>
       
            </div>

            {/*FOOTER*/}
            <div className="ag-grid-item-popup-footer">
               {/*CANCEL button*/}
               <a className="waves-effect waves-light btn red accent-2" onClick={this.handleClickCANCEL.bind(this)} >{globals.metadata['text']['cancel']}</a>
               <div style={{width:"10px"}} />
               {/*SAVE button*/}
               <a className="waves-effect waves-light btn blue accent-2" onClick={this.handleClickSAVE.bind(this)} >{globals.metadata['text']['save']}</a>
               
            </div>
       </div>
       </div>
       
      )

  }
}

const mapDispatchToProps$CklstAdminModifyTextEntry = function(dispatch) {
  return {
    removePopup: function(id) {
      dispatch(Actions.actionRemovePopup(id))
    }
  }
}



export default connect(null, mapDispatchToProps$CklstAdminModifyTextEntry)(CklstAdminModifyTextEntry)

