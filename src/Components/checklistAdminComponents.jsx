import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as globals from '../globals.js'
import * as helpers from '../helpers.js'
import * as Actions from '../redux-actions.js'

import loading from './loading.jsx'


class AdminModifyCklstTitel extends Component {
  constructor(props) {
    super(props);
  }
  
  render() { 
    
    var WindowSize = {width:"300px", height:"200px"}

    return (
       
       <div style={WindowSize} className="card darken-1" id="Checklist">
            <div className="card-content">
               I will modify your Titel and description
            </div>
          </div>
      )

  }
}


class AdminModifyBodyText extends Component {
  constructor(props) {
    super(props);
  }
  
  render() { 
    
    return (
       
       <div className="card darken-1" id="Checklist">
            <div className="card-content">
               I will modify your Checklist Body
            </div>
          </div>
      )

  }
}

export {
	AdminModifyCklstTitel,
	AdminModifyBodyText
}