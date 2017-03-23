import React, { Component } from 'react';
import { connect } from 'react-redux'
import loading from './loading.jsx'


class CklstStep extends Component {
  constructor(props) {
    super(props);
    this.state = {collapsActive: this.props.collapsActive,
    	          headerIcon: this.props.collapsActive ? 'arrow_drop_up' : 'arrow_drop_down',
                  bodyStyle: this.props.collapsActive ? {display: 'block'} 
                                                      : {display: 'none'} };
  }

  handleClick() {
  	if (this.state.collapsActive) {
  	   this.setState({collapsActive: ! this.state.collapsActive,
    	              headerIcon: 'arrow_drop_down',
                      bodyStyle: {display: 'none'} })
  	} else {
  		this.setState({collapsActive: ! this.state.collapsActive,
    	              headerIcon: 'arrow_drop_up',
                      bodyStyle: {display: 'block'} })
  	}
  	
  }

  render() {
    
    if (this.props.step) {
      var step = this.props.step

    return (

      <li>
          <div className="ag-collapsible-header" >
             <div className="ag-collapsible-header-click" onClick={this.handleClick.bind(this)}>
              <i className="material-icons" >{this.state.headerIcon}</i>
              <span>{step.titel || '[No titel]'}</span>
             </div>
              
          </div>
          <div className="ag-collapsible-body" style={this.state.bodyStyle} >
              {step.content}
          </div>
      </li>

    )} else { return loading }

  }
}



export default CklstStep