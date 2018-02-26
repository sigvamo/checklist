import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import * as globals from '../globals.js'
import * as helpers from '../helpers.js'
import * as Actions from '../redux-actions.js'

import Checklist from './Checklist.jsx'
import CklstAdmin from './CklstAdmin.jsx'

class AddChecklistPage extends Component {
   constructor(props) {
    super(props);
  }

  componentDidMount() {
     this.props.setCurrChecklist(globals.newChecklistTemplate)
  }
   
  render() {

   return ( 
       <div>
       Add Checklist!
         <CklstAdmin />
         <Checklist />
       </div>          
    )

  }
}


const mapDispatchToProps$AddChecklistPage = function(dispatch) {
  return {
    setCurrChecklist: function(checklist) {
      dispatch(Actions.actionSetCurrentChecklist(checklist))
    }
  }
}


export default connect(null,mapDispatchToProps$AddChecklistPage)(AddChecklistPage)
