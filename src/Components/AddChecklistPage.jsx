import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import * as globals from '../globals.js'
import * as helpers from '../helpers.js'

class AddChecklistPage extends Component {
   constructor(props) {
    super(props);
  }

   
  render() {

   return ( 
       <div>
       Add Checklist!
       </div>          
    )

  }
}



export default AddChecklistPage