import React, { Component } from 'react';
import { connect } from 'react-redux'
import loading from './loading.jsx'
import CklstSection from './CklstSection.jsx'

class Checklist extends Component {
  
  render() {
    

    if (this.props.checklist) {
      var checklist = this.props.checklist
      
      // Parse the sections of the checklist. It is then assigned to Array which index is the "pos" attribute of the
      // section object, it is needed to sort sections by pos. Same principle used for steps in CklstStep component class.
      var sections =  checklist.sections.reduce( function (prev, section){
          prev[section.pos] = <CklstSection section={section} key={section.pos}/>
          return prev
      }, [])

    return (

      <div className="card w3-margin">

       <div className="w3-container w3-xlarge grey-text darken-4-text"> {/* Checklist header */}
          {checklist.titel}
       </div>
       <div className="w3-container">
          {sections}
       </div>
      
    </div>

    )} else { return loading }

  }
}


const mapStateToProps$Checklist = function (state) {
   return { checklist: state.checklist }
}



export default connect(mapStateToProps$Checklist)(Checklist)
