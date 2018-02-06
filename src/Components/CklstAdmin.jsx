import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as globals from '../globals.js'
import * as helpers from '../helpers.js'
import * as Actions from '../redux-actions.js'

import loading from './loading.jsx'
import CklstSection from './CklstSection.jsx'
import Navigation from './Navigation.jsx'
import Variables from './Variables.jsx'

import {AdminModifyCklstTitel, AdminModifyBodyText} from './checklistAdminComponents.jsx'


class CklstAdmin extends Component {
  constructor(props) {
    super(props);
    this.PopupId = globals.POPUP_ID_CKLSTEDITOR
  }

  addTitel() {
     console.log('OK')
     this.props.addPopup({
              id: this.PopupId, 
              visible: true, 
              style: {},
              component: AdminModifyCklstTitel,
              componentProps: {},
              position: {x: 200, y: 200} })
  }

  addBodyText() {
     console.log('OK')
  }
  
  render() { 
    
    return (
       
       <div className="card darken-1" id="Checklist">
            <div className="card-content">
               <span className="ag-link" onClick={this.addTitel.bind(this)}>[Add Titel]</span>
               <span className="ag-link" onClick={this.addBodyText.bind(this)}>[Add Body Text]</span>
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
