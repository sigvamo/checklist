import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as Actions from '../redux-actions.js'
import * as globals from '../globals.js'

class PopupManager extends Component {

render() {
 
  
 if (! this.props.popups) {
 	return null
 }

  console.log('DEBUG4.2', this.props.popups)
  console.log('DEBUG4.2', this.props.popups.length)
  console.log('DEBUG4.2', this.props.popups[0])

  var popupMgrStyle = {position: "absolute"}
  var popupStyle  = {position: "absolute", zIndex: 1000}
  
  var popups = this.props.popups.reduce((next, popup) => {
     console.log('DEBUG4.3', popup)
     var Component = popup.component
     if ("style" in popup) {
        var popupCurrentStyle = Object.assign(popupStyle, popup.style)  
     } else {
        var popupCurrentStyle = popupStyle  
     }
     
     if (popup.visible) {
           if ( "position" in popup ) {
              popupCurrentStyle["left"] = popup.position.x
              popupCurrentStyle["top"]  = popup.position.y
           }
           console.log('DEBUG4', popup.id)
           next.push(<div style={popupCurrentStyle} key={popup}><Component popupID={popup.id} props_={popup.componentProps}/></div>)
     }
     return next
  }, [])

  


  return (

      <div style={popupMgrStyle}>
          {popups}
      </div>

    )

}

}

const mapStateToProps$PopupManager = function (state) {
   if ( state.popups ) { console.log('DEBUG4.1', state.popups[0]) }
   return { popups: state.popups }
}

const mapDispatchToProps$PopupManager = function(dispatch) {
  return {
    clearAlert: function() {
      dispatch(Actions.actionSetPopup({visible: false }))
    }
  }
}

export default connect(mapStateToProps$PopupManager, mapDispatchToProps$PopupManager)(PopupManager)
