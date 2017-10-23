import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect, Switch, BrowserRouter, Link, Route } from 'react-router-dom'
import * as globals from '../globals.js'
import * as helpers from '../helpers.js'

import MainPage from './MainPage.jsx'
import ViewChecklistLayout from './ViewChecklistLayout.jsx'
import AddChecklistPage from './AddChecklistPage.jsx'

class MainPageLayout extends Component {
   constructor(props) {
    super(props);
  }

   
  render() {

   return ( 
       <div>
        <BrowserRouter>
         <Switch>
           <Route path="/" exact component={MainPage} />
           <Route path="/viewckl" component={ViewChecklistLayout} />
           <Route path="/addckl" component={AddChecklistPage} />
           <Redirect to="/" />
         </Switch>
        </BrowserRouter>
       </div>          
    )

  }
}



export default MainPageLayout