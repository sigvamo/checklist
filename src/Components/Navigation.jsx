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

handleClick(id) {
  helpers.navigateToElement(id)
}

render () {

   if (! this.props.checklistSkeleton) { return loading }

   var checklistSkeleton = Object.assign({}, this.props.checklistSkeleton)
   
   /* Sort sections */
   checklistSkeleton.sections.sort((a, b) => {
         return a.pos - b.pos
      })
   
   /* Sort steps in sections */
   checklistSkeleton.sections.forEach( (section) => {
       section.steps.sort((a, b) => {
         return a.pos - b.pos
      }) })

   var treeContent = ( <ul id="cklstNavigationTree">
     {checklistSkeleton.sections.map( (section) => {
        return ( <li key={section.pos}><a onClick={this.handleClick.bind(this, 'SEC:'+section.pos)} className="ag-cur-pointer">
                 <div style={{display: "table-cell"}}><span className="ag-badge ag-sec-color">{'Section' + ' ' + section.pos}</span></div>
                          <div style={{display: "table-cell"}}>{section.titel}</div></a><ul>
                 {section.steps.map((step) => {
                     return (<li key={step.pos}><a onClick={this.handleClick.bind(this, 'STP:'+section.pos+':'+step.pos)} className="ag-cur-pointer">
                        <div style={{display: "table-cell"}}><span className="ag-badge ag-step-color">{'Step' + ' ' + step.pos}</span></div>
                               <div style={{display: "table-cell"}}>{step.titel}</div></a></li>)
                 }) } </ul></li> ) 
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
   if (! state.checklist) { return null }

   var checklistSkeleton = state.checklist.sections.map((section) => {
           return {
              titel: section.titel,
              pos: section.pos,
              steps : section.steps}
      })

   return { checklistSkeleton: {sections: checklistSkeleton} }
}

export default connect(mapStateToProps$Navigation)(Navigation)
