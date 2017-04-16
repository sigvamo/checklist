import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as globals from '../globals.js'
import * as helpers from '../helpers.js'

import loading from './loading.jsx'
import CklstStep from './CklstStep.jsx'



class CklstSection extends Component {
  constructor(props) {
    super(props);
    /* This array ckeditorViews will contain */
    this.ckeditorViews = []
  }

  componentDidMount () {
    this.ckeditorViews.forEach((ckeditorView) => {
       helpers.applyHLJS(ckeditorView)   
    })
    
  }

  componentDidUpdate () {
    this.ckeditorViews.forEach((ckeditorView) => {
       helpers.applyHLJS(ckeditorView, true)   
    })
  }

  
  render() {
    var this_ = this
    this.ckeditorViews = []

    if (this.props.section) {
      var section = Object.assign({}, this.props.section)

      // Placeholder variable for mixing section.body and section.steps
      var st = []
      // Section body content div element class
      var secBodyClass = "ag-panel"

      /* We will set the content of the body as innerHTML of the div element with class ckeditorview */
      var createContentMarkup = function(content) {
                 return {__html: helpers.showVariables(content)};
      }

      /* This function will generate div container for body content. It will have class ckeditorview to display content created with CKEDITOR.
         ref property function will push each div element into ckeditorViews array. */
      var generateBodyContent = function(bodyContent) {
         return <div className="ckeditorview" ref={ (e) => { this_.ckeditorViews.push(e); } } dangerouslySetInnerHTML={createContentMarkup(bodyContent)}/>
      }

      // Checking if section object has "body" property at all. If it has it, then we must
      // mix body with steps.
      if (section.hasOwnProperty('body')) {
            // Check if body array has Object with "beforestep" property equal to 0, this body peace must come very first
            // That is why we assign it to index 0 i.e. st[0]
            section.body.find((b) => { 
               if (b.beforestep == 0) {
                  st[0] = <div className={secBodyClass} key="0">{generateBodyContent(b.content)}</div>
               } 
            })        
      } 

      // Here we are sorting step Objects in steps array by step.pos key value
      section.steps.sort((a, b) => {
         return a.pos - b.pos
      })


      // shift variable will be used to insert body content between steps.
      var shift = 0
      // We providing st array to this reduce function, here we will mix body and steps
      var secContent = section.steps.reduce( function (prev, step){
          // If body for this section exists and there is body content that must come before the specified step, then 
          // we will add it. Increase shift variable after to insert step after body content, then all other elements will be also shifted.
          if (section.hasOwnProperty('body')) {
               section.body.find((b) => { 
                   if (b.beforestep == step.pos) {
                      prev[step.pos+shift] = ( 
                          <div className={secBodyClass} key={step.pos+shift}>{generateBodyContent(b.content)}</div>
                          )
                      shift++
                   }
               })
          } 
          // Add step itself
          prev[step.pos+shift] = <CklstStep step={step} collapsActive={true} key={'STP:' + step.id}/>
          return prev
      }, st)
    

      if (section.hasOwnProperty('body')) {
            // Check if body array has Object with "beforestep" property equal to -1, this body peace must come at the end.
            // That is why we push it to setContent array
            section.body.find((b) => { 
               if (b.beforestep == -1) {
                  secContent.push(<div className={secBodyClass} key="-1">{generateBodyContent(b.content)}</div>)
               } 
            })        
      } 

    return (

      <div className="card ag-sec-body" id={'SEC:' + section.pos}>
                
        <div className="w3-large blue-grey-text lighten-2-text">
          <span className="ag-header-badge ag-sec-color">{'Section' + ' ' + section.pos}</span>
               <span>{section.titel}</span></div> {/* section header */}
        <div className="w3-container">
          <div className="ag-collapsible">
             {secContent} 
          </div>
        </div>
    
      </div>

    )} else { return loading }

  }
}

export default CklstSection