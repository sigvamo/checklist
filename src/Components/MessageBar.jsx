import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as Actions from '../redux-actions.js'
import * as globals from '../globals.js'

class MessageBar extends Component {

render() {
 
 
 if (! this.props.alert) {
 	return null
 }

 let ClassColor
 let barStyle = {position: "fixed", marginTop: "0px", zIndex: 1001, width: "100%"}

 if (this.props.alert.visible) {
      barStyle = Object.assign(barStyle, {display: 'block'})
 } else {
 	  barStyle = Object.assign(barStyle, {display: 'none'})
 }

 switch(this.props.alert.type) {
 	case globals.ERRO:
 	     ClassColor = 'red lighten-1'
 	     break;
 	case globals.INFO:
 	     ClassColor = 'light-green'
 	     break;
 	case globals.WARN:
 	     ClassColor = 'orange lighten-1'
 	     break;
 	default:
 	     ClassColor = 'light-green'
 }


  return (

      <div className="row" style={barStyle}>
          <div className="col s12">

             <div className={'w3-panel w3-display-container' + ' ' + ClassColor}>
                <span onClick={this.props.clearAlert.bind(this)} className={'w3-button w3-display-right' + ' ' + ClassColor}>&times;</span>
                <p>{this.props.alert.message}</p>
             </div> 

          </div>
      </div>

    )

}

}

const mapStateToProps$MessageBar = function (state) {
   return { alert: state.alert }
}

const mapDispatchToProps$MessageBar = function(dispatch) {
  return {
    clearAlert: function() {
      dispatch(Actions.actionSetAlert({visible: false }))
    }
  }
}

export default connect(mapStateToProps$MessageBar, mapDispatchToProps$MessageBar)(MessageBar)
