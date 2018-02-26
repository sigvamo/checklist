import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as globals from '../globals.js'
import * as helpers from '../helpers.js'
import * as Actions from '../redux-actions.js'

import loading from './loading.jsx'


class CklstAdminModifyTitel extends Component {
  constructor(props) {
    super(props);
    var cklstCurrTitel
    var cklstCurrDesc
  }

  componentWillMount() {
     let cklstTitel = helpers.getCklstCurrent(globals.CKLST_TITEL)
     this.cklstCurrTitel = cklstTitel[0]
     this.cklstCurrDesc = cklstTitel[1]
  }

  handleClickCANCEL(e) {
    this.props.removePopup(globals.POPUP_ID_CKLSTEDITOR)
  }
  

  handleClickSAVE(e) {
    if (this.chkTitelInput.checkValidity()) {
        helpers.cklstAdminEngine('ADD', globals.CKLST_TITEL, [this.chkTitelInput.value, this.chkDescInput.value])
    	  this.chkTitelInput.className = ''
        this.props.removePopup(globals.POPUP_ID_CKLSTEDITOR)
    } else {
    	if (this.chkTitelInput.validity.valueMissing) {this.chkTitelInputLabel.setAttribute('data-error', globals.metadata['text']['err_missing_val'])}
    		else
    	 {this.chkTitelInputLabel.setAttribute('data-error', globals.metadata['text']['err_input_vali_msg'])}
    	this.chkTitelInput.className = 'invalid'
    }
  }
  
  render() { 
    
    var wHeight = window.innerHeight;
    var wWidth  = window.innerWidth;
    
    var WindowStyle = {width: wWidth*0.9, height: wHeight*0.5}
 
    return (
       
       <div style={WindowStyle} className="card darken-1 ag-popup" >
       <div className="ag-grid ag-card-grid-standard-popup">

            {/*TITEL*/}
            <div className="card-title ag-grid-item-popup-header">
               {globals.metadata['text']['ck_set_titel']}
            </div>
            
            {/*BODY*/}
            <div className="card-content ag-grid-item-popup-body">
                   
            {/*Input fields*/}
           
             <div className="input-field col-centered">
               <input id="chk_titel_input" ref={ (el) => { this.chkTitelInput = el; } } type="text" autoComplete="off" 
                    autoFocus maxLength={globals.metadata['options']['ck_max_titel_length']} 
                    title={globals.metadata['text']['msg_max_size']+globals.metadata['options']['ck_max_titel_length']} 
                    defaultValue={this.cklstCurrTitel} required />
               <label htmlFor="chk_titel_input" ref={ (el) => { this.chkTitelInputLabel = el; } } >{globals.metadata['text']['ck_titel']}</label>
             </div>
             <div className="input-field col-centered">
               <textarea style={{maxHeight:"300px"}} className="materialize-textarea" id="chk_desc_input" ref={ (el) => { this.chkDescInput = el; } }
                    autoFocus type="text" rows="5" maxLength={globals.metadata['options']['ck_max_desc_length']}
                    title={globals.metadata['text']['msg_max_size']+globals.metadata['options']['ck_max_desc_length']}
                    defaultValue={this.cklstCurrDesc}/>
               <label htmlFor="chk_desc_input" >{globals.metadata['text']['ck_desc']}</label>
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

const mapDispatchToProps$CklstAdminModifyTitel = function(dispatch) {
  return {
    removePopup: function(id) {
      dispatch(Actions.actionRemovePopup(id))
    }
  }
}



export default connect(null, mapDispatchToProps$CklstAdminModifyTitel)(CklstAdminModifyTitel)

