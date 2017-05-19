import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as globals from '../globals.js'
import * as helpers from '../helpers.js'

import loading from './loading.jsx'

class Navigation extends Component {

constructor(props) {
    super(props);
  }

componentDidMount() {
  if (this.NavigationDiv) {
     this.NavigationDiv.style.maxHeight = (window.innerHeight - 30) + "px"
  }
}

componentDidUpdate() {
  if (this.NavigationDiv) {
     this.NavigationDiv.style.maxHeight = (window.innerHeight - 30) + "px"
  } 
}

handleClick(eID) {
  helpers.navigateToElement(eID)
}

render () {
   var meta = []
   var stepClass
   var stepDescTitel

   if (! this.props.checklistSkeleton) { return loading }

   var checklistSkeleton = Object.assign({}, this.props.checklistSkeleton)

   var treeContent = ( <ul id="cklstNavigationTree">
     {checklistSkeleton.sections.map( (section) => {
        var stepID = 0
        return ( <li key={section.pos}><a onClick={this.handleClick.bind(this, 'SEC:'+section.pos)} className="ag-cur-pointer">
                 <div style={{display: "table-cell"}}><span className="ag-badge ag-sec-color">{'Section' + ' ' + section.pos}</span></div>
                          <div style={{display: "table-cell"}}>{section.titel}</div></a><ul>

                 {section.contentmeta.map((entry) => {
                     if ( entry.type === 1 ) 
                          { stepID++ } else { return null }
                     if ( entry.cid ) {
                        stepClass = "ag-badge ag-cstep-color"
                        stepDescTitel = "Conditional step." + " " + "Condition:" + " " + helpers.getCondition(section.conditions, entry.cid)
                     } else
                     {  stepClass = "ag-badge ag-step-color" 
                        stepDescTitel = ""
                        }
                     return (<li key={entry.id} title={stepDescTitel}><a onClick={this.handleClick.bind(this, 'STP:' + section.pos + ':' + entry.id)} className="ag-cur-pointer">
                        <div style={{display: "table-cell"}}><span className={stepClass}>{'Step' + ' ' + stepID}</span></div>
                               <div style={{display: "table-cell"}}>{helpers.getContentEntryData(section, entry.id).titel}</div></a></li>)
                 }) } 

                 </ul></li> ) 
         }) 
      }
    </ul> )

   return (
       <div className="card cklstNavigationContainer" ref={ (e) => { this.NavigationDiv=e; } } id="Navigation">
          {treeContent}
       </div>
    )
}

}

const mapStateToProps$Navigation = function (state) {
   if (! state.checklist) { return {} }

   var checklistSkeleton = state.checklist.sections.map((section) => {
           let meta = section.contentmeta
           let titels = section.contentdata.map((data) => {return {id: data.id, titel: data.titel}; })
           return {
              titel: section.titel,
              pos: section.pos,
              conditions: section.conditions,
              contentmeta: meta,
              contentdata: titels}
      })
   
   // Next construction not used, it is just reserved for highlighting if required
   if (state.navigationHighlights) {
       return { checklistSkeleton: {sections: checklistSkeleton}, highlights: state.navigationHighlights }
   } else {
       return { checklistSkeleton: {sections: checklistSkeleton} }
   }
}

export default connect(mapStateToProps$Navigation)(Navigation)
