import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import * as globals from '../globals.js'
import * as helpers from '../helpers.js'

class MainPage extends Component {
   constructor(props) {
    super(props);
  }

   
  render() {

   return ( 
       <div>
       Main Page
         <div> <Link to="/viewckl">View Checklist</Link> </div>
         <div> <Link to="/addckl">Add Checklist</Link> </div>
       </div>          
    )

  }
}



export default MainPage