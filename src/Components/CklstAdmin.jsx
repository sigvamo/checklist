import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as globals from '../globals.js'
import * as helpers from '../helpers.js'
import * as Actions from '../redux-actions.js'

import loading from './loading.jsx'
import CklstSection from './CklstSection.jsx'
import Navigation from './Navigation.jsx'
import Variables from './Variables.jsx'

import CklstAdminModifyTitel from './CklstAdminModifyTitel.jsx'
import CklstAdminModifyTextEntry from './CklstAdminModifyTextEntry.jsx'


class CklstAdmin extends Component {
  constructor(props) {
    super(props);
    this.PopupId = globals.POPUP_ID_CKLSTEDITOR
  }

  addTitel() {
     // Here display:table is required to make popup change size when innere element grows, like textarea. Innere div must be display:inline-table
     this.props.addPopup({
         id: this.PopupId, 
         visible: true, 
         style: {display: "table"},
         component: CklstAdminModifyTitel,
         componentProps: {},
         position: {x: window.innerWidth*0.1/2, y: window.innerHeight*0.5/2} })
  }

  addTextEntry() {
     this.props.addPopup({
         id: this.PopupId, 
         visible: true, 
         style: {display: "table"},
         component: CklstAdminModifyTextEntry,
         componentProps: {action: "MODIFY", position: 0, entryType: globals.CKLST_BODY_CONTENT},
         position: {x: window.innerWidth*0.1/2, y: window.innerHeight*0.5/2} })

  }
  
  render() { 
    
    return (
       
       <div className="card darken-1" id="Checklist">
            <div className="card-content">
               <span className="ag-link" onClick={this.addTitel.bind(this)}>[Add Titel]</span>
               <span className="ag-link" onClick={this.addTextEntry.bind(this)}>[Add Body Text]</span>
            </div>
          </div>
      )

  }
}


const mapDispatchToProps$CklstAdmin = function(dispatch) {
  return {
    addPopup: function(popup) {
      dispatch(Actions.actionAddPopup(popup))
    },
     removePopup: function(id) {
      dispatch(Actions.actionRemovePopup(id))
    }
  }
}


export default connect(null,mapDispatchToProps$CklstAdmin)(CklstAdmin)
