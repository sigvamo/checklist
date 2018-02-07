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

  /* In the next code we reduce this.props.popups to eliminate invisible popups, we build the array of visible popups.
     We used here JQuery.extend to extend the popup.style with popupStyle and positioning CSS properties. It is important to
     extend existing popup.style and to not use Object.assign, because in this case styles of all components in resulting array
     will be equal to the style of the last component added to the array! */
  var popups = this.props.popups.reduce((next, popup, ind) => { 
     var Component = popup.component
     if ("style" in popup) {
        // eslint-disable-next-line
        jQuery.extend(popup.style, popupStyle)  
     } else {
        popup.style = popupStyle
     }
     
     if (popup.visible) {
           if ( "position" in popup ) {
              // eslint-disable-next-line
              jQuery.extend(popup.style, {left: popup.position.x, top: popup.position.y})
           } else {
              // eslint-disable-next-line
              jQuery.extend(popup.style, {left: 0, top: 0})
           }
           
           next.push(<div style={popup.style} id={popup.id} key={popup.id}><Component popupID={popup.id} props_={popup.componentProps}/></div>)     
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
   return { popups: state.popups }
}

export default connect(mapStateToProps$PopupManager)(PopupManager)
