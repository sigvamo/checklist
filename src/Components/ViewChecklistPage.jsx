import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import * as globals from '../globals.js'
import * as helpers from '../helpers.js'

import Navigation from './Navigation.jsx'
import Checklist from './Checklist.jsx'

class ViewChecklistPage extends Component {
   constructor(props) {
    super(props);
  }

   
  render() {

   return ( 
     <div>
       <div className="row">
          <div className="col s12 l3 m2">
            <Navigation />
          </div>
          <div className="col s12 l9 m10">
            <Checklist />
          </div>
        </div>
     </div>
    )

  }
}



export default ViewChecklistPage