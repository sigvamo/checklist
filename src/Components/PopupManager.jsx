import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as Actions from '../redux-actions.js'
import * as globals from '../globals.js'

class PopupManager extends Component {

render() {
 
  
 if (! this.props.popups) {
 	return null
 }

  var popupMgrStyle = {position: "absolute"}
  var popupStyle  = {position: "absolute", zIndex: 1000}
  
  var popupCurrentStyle
  var popups = this.props.popups.reduce((next, popup) => {
  var Component = popup.component
     if ("style" in popup) {
        popupCurrentStyle = Object.assign(popupStyle, popup.style)  
     } else {
        popupCurrentStyle = popupStyle  
     }
     
     if (popup.visible) {
           if ( "position" in popup ) {
              popupCurrentStyle["left"] = popup.position.x
              popupCurrentStyle["top"]  = popup.position.y
           }
           
           next.push(<div style={popupCurrentStyle} id={popup.id} key={popup.id}><Component popupID={popup.id} props_={popup.componentProps}/></div>)
     }
     return next
  }, [])

  popupCurrentStyle={}


  return (

      <div style={popupMgrStyle}>
          {popups}
      </div>

    )

}

}

const mapStateToProps$PopupManager = function (state) {
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
