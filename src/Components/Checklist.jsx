import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as globals from '../globals.js'
import * as helpers from '../helpers.js'

import loading from './loading.jsx'
import CklstSection from './CklstSection.jsx'
import Navigation from './Navigation.jsx'
import Variables from './Variables.jsx'


/*
  Checklist component.
  All sections and steps will be assigned "id" attribute in form: 
     For section SEC:X where X is the number of the section
     For entries    ENTRY:X where X is the step id
*/


class Checklist extends Component {
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

    if (this.props.checklist) {
      var checklist = Object.assign({}, this.props.checklist)
      // Placeholder variable for mixing checklist.body and checklist.steps
      var st = []
      // Checklist body content div element class
      var chklstBodyClass = "ag-panel"

      /* We will set the content of the body as innerHTML of the div element with class ckeditorview */
      var createContentMarkup = function(content) {
                 return {__html: helpers.showVariables(content)};
      }
      
      /* Parse the sections of the checklist. It is then assigned to Array which index is the "pos" attribute of the
      // section object, it is needed to sort sections by pos. Same principle used for steps in CklstStep component class.
      var sections =  checklist.sections.reduce( function (prev, section){
          prev[section.pos] = <CklstSection section={section} key={section.pos}/>
          return prev
      }, []) */

      /* This function will generate div container for body content. It will have class ckeditorview to display content created with CKEDITOR.
         ref property function will push each div element into ckeditorViews array. */
      var generateBodyContent = function(bodyContent) {
         return <div className="ckeditorview" ref={ (e) => { this_.ckeditorViews.push(e); } } dangerouslySetInnerHTML={createContentMarkup(bodyContent)}/>
      }

      // Checking if checklist object has "body" property at all. If it has it, then we must
      // mix body with sections.
      if (checklist.hasOwnProperty('body')) {
            // Check if body array has Object with "beforesec" property equal to 0, this body peace must come very first
            // That is why we assign it to index 0 i.e. st[0]
            checklist.body.find((b) => { 
               if (b.beforesec == 0) {
                  st[0] = <div className={chklstBodyClass} key="0">{generateBodyContent(b.content)}</div>
               } 
            })        
      } 

      // Here we are sorting step Objects in steps array by step.pos key value
      checklist.sections.sort((a, b) => {
         return a.pos - b.pos
      })

      // shift variable will be used to insert body content between steps.
      var shift = 0
      // We providing st array to this reduce function, here we will mix body and steps
      var chklstContent = checklist.sections.reduce( function (prev, section){
          // If body for this checklist exists and there is body content that must come before the specified section, then 
          // we will add it. Increase shift variable after to insert section after body content, then all other elements will be also shifted.
          if (checklist.hasOwnProperty('body')) {
               checklist.body.find((b) => { 
                   if (b.beforesec == section.pos) {
                      prev[section.pos+shift] = <div className={chklstBodyClass} key={section.pos+shift}>{generateBodyContent(b.content)}</div>
                      shift++
                   }
               })
          } 
          // Add section itself
          prev[section.pos+shift] = <CklstSection section={section} key={section.pos+shift}/>
          return prev
      }, st)
    

      if (checklist.hasOwnProperty('body')) {
            // Check if body array has Object with "beforesec" property equal to -1, this body peace must come at the end.
            // That is why we push it to setContent array
            checklist.body.find((b) => { 
               if (b.beforesec == -1) {
                  chklstContent.push(<div className={chklstBodyClass} key="-1">{generateBodyContent(b.content)}</div>)
               } 
            })        
      } 

    
    return (
       
       <div className="card darken-1" id="Checklist">
            <div className="card-content">
              <span className="card-title">{checklist.titel}</span>
              <p>{checklist.description}</p>
            </div>
            <div className="card-action">
              <div className="ag-section-header"><span>Variables</span></div>
              <Variables />
            </div>
            <div className="ag-cklst-body">
               
               <div className="card-action">{chklstContent}</div>
            </div>
          </div>

       

    )} else { return loading }

  }
}


const mapStateToProps$Checklist = function (state) {
   return { checklist: state.checklist }
}

export default connect(mapStateToProps$Checklist)(Checklist)
