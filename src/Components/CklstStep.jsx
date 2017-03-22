import React, { Component } from 'react';
import { connect } from 'react-redux'
import loading from './loading.jsx'


class CklstStep extends Component {
  constructor(props) {
    super(props);
    this.state = {collapsActive: this.props.collapsActive,
    	          headerIcon: this.props.collapsActive ? 'arrow_drop_up' : 'arrow_drop_down',
                  collapsClass: this.props.collapsActive ? 'collapsible-header active' : 'collapsible-header' };
  }

  handleClick() {
  	if (this.state.collapsActive) {
  	   this.setState({collapsActive: ! this.state.collapsActive,
    	              headerIcon: 'arrow_drop_down',
                      collapsClass: 'collapsible-header' })	
  	} else {
  		this.setState({collapsActive: ! this.state.collapsActive,
    	              headerIcon: 'arrow_drop_up',
                      collapsClass: 'collapsible-header active' })	
  	}
  	
  }

  render() {
    
    if (this.props.step) {
      var step = this.props.step

    return (

      <li>
          <div className={this.state.collapsClass} onClick={this.handleClick.bind(this)}>
              <i className="material-icons collapsible-header-click">{this.state.headerIcon}</i>
              <span>{step.titel || '[No titel]'}</span>
              
          </div>
          <div className="collapsible-body">
              {step.content}
          </div>
      </li>

    )} else { return loading }

  }
}



export default CklstStep