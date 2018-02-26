import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as helpers from '../helpers.js'
import * as Actions from '../redux-actions.js'

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = { chkTitelInputValue: '' };
    this.chkTitelInputErrorMsg = 'You must enter some value before.'
  }

  handleChkTitelInputClick(e) {
  	 this.setState({ chkTitelInputValue: e.target.value })
  }

  handleClick(e) {
    if (this.chkTitelInput.checkValidity()) {
    	  this.props.updateCklstTitel(this.state.chkTitelInputValue)
          this.chkTitelInput.value = null
          this.chkTitelInput.className = ''
          this.setState({ chkTitelInputValue: '' })
    } else {
    	this.chkTitelInputLabel.setAttribute('data-error', this.chkTitelInputErrorMsg)
    	this.chkTitelInput.className = 'invalid'
    }
  }

  render() {

    return (

      <div className="row">
          <div className="col s10 offset-s2 col-centered">
             <a className="waves-effect waves-light btn blue accent-4" onClick={this.handleClick.bind(this)} >Button</a>
          </div>
          
          <div className="row">
             <div className="input-field col s10 offset-s2 col-centered">
               <input id="chk_titel_input" ref={ (el) => { this.chkTitelInput = el; } } type="text" onChange={this.handleChkTitelInputClick.bind(this)} required />
               <label htmlFor="chk_titel_input" ref={ (el) => { this.chkTitelInputLabel = el; } } >Checklist titel</label>
             </div>
             <div className="input-field col s10 offset-s2 col-centered">
               <input id="chk_titel_input2" type="text" required />
               <label htmlFor="chk_titel_input2" >Checklist titel</label>
             </div>
          </div>

      </div>

    )
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    updateCklstTitel: function(titel) {
      dispatch(Actions.actionChangeChecklistTitel(titel));
    }
  }
}

export default connect(null, mapDispatchToProps)(Footer)

