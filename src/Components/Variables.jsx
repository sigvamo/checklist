import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as globals from '../globals.js'
import * as helpers from '../helpers.js'

import loading from './loading.jsx'

class Variables extends Component {

constructor(props) {
    super(props);
  }

handleClick(variable) {
  console.log('D1', helpers.findVariables(variable))
}

render () {

   if (! this.props.variables) { return loading }

   var variables = Object.assign([], this.props.variables)

   /* Sort variables by id */
   variables.sort((a, b) => {
         return a.id - b.id
      })
   
   var VarsContent = variables.map( (variable) => {
        return ( <div key={variable.id} onClick={this.handleClick.bind(this, variable.name)}>{variable.name}</div> ) 
      }
    )

   return (
       <div ref={ (e) => { this.VariablesDiv=e; } } id="Variables">
          {VarsContent}
       </div>
    )
}

}

const mapStateToProps$Variables = function (state) {
   if (! state.checklist) { return {} }

   return { variables: state.checklist.variables }
}

export default connect(mapStateToProps$Variables)(Variables)
