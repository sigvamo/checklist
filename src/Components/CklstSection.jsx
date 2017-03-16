import React, { Component } from 'react';
import { connect } from 'react-redux'
import loading from './loading.jsx'
import CklstStep from './CklstStep.jsx'



class CklstSection extends Component {

  componentDidMount() {
    // eslint-disable-next-line
    this.stepsCollaps ? $(this.stepsCollaps).collapsible() : null
  }

  componentDidUpdate() {
    // eslint-disable-next-line
     $(this.stepsCollaps).collapsible();
  }

  render() {
    
    if (this.props.section) {
      var section = this.props.section

      var steps =  section.steps.reduce( function (prev, step){
          prev[step.pos] = <CklstStep step={step} collapsActive={false} key={step.pos}/>
          return prev
      }, [])

    return (

      <div className="card">
                
        <div className="w3-container grey lighten-2 w3-large blue-grey-text lighten-2-text">{section.titel || '[No titel]' }</div> {/* section header */}
        <div className="w3-container">
          <ul className="collapsible" data-collapsible="expandable" ref={ (input) => { this.stepsCollaps = input; } }>
             {steps} 
          </ul>
        </div>
    
      </div>

    )} else { return loading }

  }
}

export default CklstSection