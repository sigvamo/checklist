import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as globals from '../globals.js'
import * as helpers from '../helpers.js'
import * as Actions from '../redux-actions.js'

import loading from './loading.jsx'
import CklstStep from './CklstStep.jsx'
import CklstInput from './CklstInput.jsx'
import CklstGoto from './CklstGoto.jsx'
import CklstRepeat from './CklstRepeat.jsx'



class CklstSection extends Component {
  constructor(props) {
    super(props);
    /* This array ckeditorViews will contain */
    this.ckeditorViews = []
    this.section = null
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

  refBodyContent(e) {
     if (e != null) {
       this.ckeditorViews.push(e)
     }; 
  }

  render() {
    var this_ = this
    this.ckeditorViews = []
    // Section body content div element class
    var secBodyClass = "ag-panel"

   
    if (this.props.section) {
      var section = Object.assign({}, this.props.section);      
      
      this.section = section.pos

      // this function will check if section.contentmeta has duplicate ids or non-existent ids
      function hasDuplicates() {
        let valuesSoFar = [];
        for (var i = 0; i < section.contentmeta.length; ++i) {
            if (!section.contentmeta[i].id) { return true }
            let value = section.contentmeta[i].id;
            // Check if value is in valuesSoFar array
            if (valuesSoFar.indexOf(value) > -1) {
              return true;
            }
            valuesSoFar.push(value);
        }
        return false;
      }


      // If there is no meta for the section then we must exit with empty div
      if ( section.contentmeta.length === 0 ) {
         console.log('ERROR', 'Section has zero length ')
         return <div></div>
      }

      // check for duplicate or non-existent ids
      if (hasDuplicates()) {
         console.log('ERROR', 'Section has duplicate or non-existant ids')
         return <div></div>  
      }

    
      /* We will set the content of the body as innerHTML of the div element with class ckeditorview */
      var createContentMarkup = function(content) {
                 return {__html: helpers.showVariables(content)};
      }

      /* This function will generate div container for body content. It will have class ckeditorview to display content created with CKEDITOR.
         ref property function will push each div element into ckeditorViews array. */
      var generateBodyContent = function(bodyContent) {
         return <div className="ckeditorview" ref={this_.refBodyContent.bind(this_)} dangerouslySetInnerHTML={createContentMarkup(bodyContent)}/>
      }

      var stepID = 0
      var secContent = section.contentmeta.map((entry, ind)=>{
            let currData = helpers.getContentEntryData(section, entry.id)
            if (entry.type === 0) {
               return <div className={secBodyClass} id={'ENTRY:' + section.pos + ':' + entry.id} key={entry.id}>{generateBodyContent(currData.content)}</div>
            }
            if (entry.type === 1) {
               stepID++ 
               return <CklstStep stepId={stepID} cId={entry.cid} stepData={currData} collapsActive={true} section={section} key={entry.id}/>
            }
            if (entry.type === 2) {
               return <CklstInput entry={entry} section={section} key={entry.id}/>
            }
            if (entry.type === 3) {
               return <CklstGoto entry={entry} section={section} key={entry.id}/>
            }
            if (entry.type === 4) {
               return <CklstRepeat entry={entry} section={section} key={entry.id}/>
            }
            return <div key={entry.id}/>
      })

      // We providing st array to this reduce function, here we will mix body and steps
     /* var secContent = section.steps.reduce( function (prev, step){
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
      }, st) */
    

      /*if (section.hasOwnProperty('body')) {
            // Check if body array has Object with "beforestep" property equal to -1, this body peace must come at the end.
            // That is why we push it to setContent array
            section.body.find((b) => { 
               if (b.beforestep == -1) {
                  secContent.push(<div className={secBodyClass} key="-1">{generateBodyContent(b.content)}</div>)
               } 
            })        
      } */

    return (

      <div className="card ag-sec-body" id={'SEC:' + section.pos}>
                
        <div className="w3-large blue-grey-text lighten-2-text">
          <span className="ag-header-badge ag-sec-color">{section.pos}</span>
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

const mapDispatchToProps$CklstSection = function(dispatch) {
  return {
    setId2StepIDMapping: function(checklist) {
      dispatch(Actions.actionUpdateId2StepID({checklist: checklist}))
    }
  }
}

export default connect(null, mapDispatchToProps$CklstSection)(CklstSection)

