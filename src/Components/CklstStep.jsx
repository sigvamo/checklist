import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as helpers from '../helpers.js'
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

  componentDidMount () {
  	helpers.applyHLJS(this.ckeditorView)
  }

  componentDidUpdate () {
    helpers.applyHLJS(this.ckeditorView, true)
  }

  /* We will set the content of the step as innerHTML of the div element with class ckeditorview */
  createContentMarkup() {
    return {__html: helpers.showVariables(this.props.step.content)};
  }

  render() {
    
    if (this.props.step) {
      var step = Object.assign({}, this.props.step)

    return (

      <div className="ag-step-body" id={'STP:' + step.id}>
          <div className="ag-collapsible-header" >
             
              <i className="material-icons ag-cur-pointer" onClick={this.handleClick.bind(this)}>{this.state.headerIcon}</i>
              <span className="ag-header-badge ag-step-color">{'Step' + ' ' + step.pos}</span>
              <span>{step.titel}</span>
              
          </div>
          <div className="ag-collapsible-body" style={this.state.bodyStyle} >
              <div className="ckeditorview" ref={ (e) => { this.ckeditorView=e; } } dangerouslySetInnerHTML={this.createContentMarkup()}/>
          </div>
      </div>

    )} else { return loading }

  }
}



export default CklstStep