import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Switch, Link, Route } from 'react-router-dom'
import * as globals from '../globals.js'
import * as helpers from '../helpers.js'

import ViewChecklistPage from './ViewChecklistPage.jsx'

class ViewChecklistLayout extends Component {
   constructor(props) {
    super(props);
  }

   
  render() {

   return ( 
       <div>
         <Switch>
          <Route path={this.props.match.path} exact component={ViewChecklistPage} />
          {/*<Route path={props.match.path + "/:cklId"} component={UserProfilePage} /> */}
         </Switch>
       </div>          
    )

  }
}



export default ViewChecklistLayout