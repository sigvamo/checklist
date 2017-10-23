import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as helpers from '../helpers.js'
import loading from './loading.jsx'
import CStepTitel from './CStepTitel.jsx'


class CklstInput extends Component {
  constructor(props) {
    super(props);
    this.entryData={}
  }

  componentDidMount () {
    helpers.applyHLJS(this.ckeditorView)
  }

  componentDidUpdate () {
    helpers.applyHLJS(this.ckeditorView, true)
  }

  /* We will set the content of the step as innerHTML of the div element with class ckeditorview */
  createContentMarkup() {
    if (this.entryData.content) {
         return {__html: helpers.showVariables(this.entryData.content)};
    } else {
         return {__html: '<div></div>'};
    }
  }

  
  render() {

    var entry=this.props.entry
    var section=this.props.section

    this.entryData=helpers.getContentEntryData(this.props.section, this.props.entry.id)

    function conditionalStep() {
      if (entry.cid) {
        return <CStepTitel condition={helpers.getCondition(section.conditions, entry.cid)} />
      } 
    }
    
    let inputVariables = entry.vars.map((_var) => {
           return <div className="ag-input-var" key={_var}><code>{helpers.getVariableById(_var)}</code></div>
        })
               
    return ( 
                 
            <div className="ag-panel">
               {conditionalStep()}
               <div className="ag-input-container" id={'ENTRY:' + section.pos + ':' + entry.id}>
  
                          <div className="ag-input-marker ag-input-color">Input</div>
                          <div className="ag-input-body">
                              <div className="ag-input-var" style={{borderWidth: 0}}>Variables to input:</div>{inputVariables}
                              </div>
                          <div className="ag-input-body ckeditorview" ref={ (e) => { this.ckeditorView=e; } } dangerouslySetInnerHTML={this.createContentMarkup()} />
                </div>
           </div>)

  }
}



export default CklstInput