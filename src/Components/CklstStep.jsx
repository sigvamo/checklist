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

  componentDidMount() {
    // eslint-disable-next-line
    CKEDITOR.replace( 'editor_cklst_' + this.props.section + '_' + this.props.step.pos, {
		codeSnippet_theme: 'ir_black',
		readOnly: true,
		removePlugins: 'autosave,notification',
		autoGrow_onStartup: true,
		autoGrow_minHeight: 0
	} );


  }

  render() {
    
    if (this.props.step) {
      var step = this.props.step

    return (

      <li>
          <div className="ag-collapsible-header" >
             
              <i className="material-icons ag-collapsible-header-click" onClick={this.handleClick.bind(this)}>{this.state.headerIcon}</i>
              <span className="ag-badge blue lighten-2">{step.pos}</span>
              <span>{step.titel}</span>
              
          </div>
          <div className="ag-collapsible-body" style={this.state.bodyStyle} >
              <textarea id={'editor_cklst_' + this.props.section + '_' + step.pos} value={step.content}/>
          </div>
      </li>

    )} else { return loading }

  }
}



export default CklstStep