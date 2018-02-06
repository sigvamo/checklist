import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as globals from '../globals.js'
import * as helpers from '../helpers.js'
import * as Actions from '../redux-actions.js'

import loading from './loading.jsx'
import CklstSection from './CklstSection.jsx'
import Navigation from './Navigation.jsx'
import Variables from './Variables.jsx'


/*
  Checklist component.
  All sections and steps will be assigned "id" attribute in form: 
     For section SEC:X where X is the number of the section (pos)
     For entries    ENTRY:X where X is the <SECTION>:<ENTRYID>
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
    this.props.setId2StepIDMapping(this.props.checklist)
  }

  componentDidUpdate () {
    this.ckeditorViews.forEach((ckeditorView) => {
       helpers.applyHLJS(ckeditorView, true)   
    })
    this.props.setId2StepIDMapping(this.props.checklist)
  }

  
  render() {
    var this_ = this
    this.ckeditorViews = []

    if (this.props.checklist && Object.keys(this.props.checklist).length > 0 ) {
      var checklist = Object.assign({}, this.props.checklist)
    
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
      if (checklist.hasOwnProperty('body') && checklist.body.length > 0) {
           
          var chklstContent = checklist.body.map( function (bodyEntry, ind){
           
            if (bodyEntry.hasOwnProperty('content')) {
               return <div className={chklstBodyClass} key={ind}>{generateBodyContent(bodyEntry.content)}</div>
            }
            
            if (bodyEntry.hasOwnProperty('section')) {
               return <CklstSection section={helpers.getSectionByPos(checklist, bodyEntry.section)} key={ind}/>
            }

            return <div key={ind}/>
          
          })        

      } else {
          var chklstContent = <div></div>
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


const mapDispatchToProps$Checklist = function(dispatch) {
  return {
    setId2StepIDMapping: function(checklist) {
      dispatch(Actions.actionUpdateId2StepID({checklist: checklist}))
    }
  }
}


export default connect(mapStateToProps$Checklist,mapDispatchToProps$Checklist)(Checklist)
