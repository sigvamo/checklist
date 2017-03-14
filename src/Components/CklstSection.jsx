import React, { Component } from 'react';
import { connect } from 'react-redux'
import loading from './loading.jsx'
import CklstStep from './CklstStep.jsx'


class CklstSection extends Component {
  render() {
    
    if (this.props.section) {
      var section = this.props.section

      var steps =  section.steps.reduce( function (prev, step){
          prev[step.pos] = <CklstStep step={step} key={step.pos}/>
          return prev
      }, [])


    return (

      <div className="card">
                
        <div className="w3-container grey lighten-2 w3-large blue-grey-text lighten-2-text">{section.titel || '[No titel]' }</div> {/* section header */}
        <div className="w3-container">
             {steps} 
        </div>
    
      </div>

    )} else { return loading }

  }
}

export default CklstSection