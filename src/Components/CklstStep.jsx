import React, { Component } from 'react';
import { connect } from 'react-redux'
import loading from './loading.jsx'


class CklstStep extends Component {
  render() {
    
    if (this.props.step) {
      var step = this.props.step
    return (

      <div className="card">
         
        <div className="w3-container grey lighten-2 w3-large blue-grey-text lighten-2-text">{step.titel || '[No titel]'}</div> {/* step header */}
        
        <div className="w3-container">
          {step.content}
        </div>
        
      </div>

    )} else { return loading }

  }
}

export default CklstStep