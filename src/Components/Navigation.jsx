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

handleClick(entry, secpos) {
  if (entry.type == 1) {
     helpers.navigateToElement('STP:' + secpos + ':' + entry.id)
  }
}

render () {
   var meta = []
  
   if (! this.props.checklistSkeleton) { return loading }

   var checklistSkeleton = Object.assign({}, this.props.checklistSkeleton)
   
   // Create array "meta" with id and pos of the content from contentmeta per section and sort each by pos
   checklistSkeleton.sections.forEach((section) => {
      meta.push(
          section.contentmeta.reduce((prev, curr) => {
            if (curr.pid === 0) { prev.push({id: curr.id, pos: curr.pos}) }
            return prev
          }, [])
          .sort((a, b) => {
              return a.pos - b.pos })
      ) 
   })
   
   console.log('D1', meta)

   var treeContent = ( <ul id="cklstNavigationTree">
     {checklistSkeleton.sections.map( (section) => {
        return ( <li key={section.pos}><a onClick={this.handleClick.bind(this, 'SEC:'+section.pos)} className="ag-cur-pointer">
                 <div style={{display: "table-cell"}}><span className="ag-badge ag-sec-color">{'Section' + ' ' + section.pos}</span></div>
                          <div style={{display: "table-cell"}}>{section.titel}</div></a><ul>

                 {section.contentmeta.map((entry) => {
                     return (<li key={entry.id}><a onClick={this.handleClick.bind(this, entry, section.pos)} className="ag-cur-pointer">
                        <div style={{display: "table-cell"}}><span className="ag-badge ag-step-color">{'Step' + ' ' + entry.pos}</span></div>
                               <div style={{display: "table-cell"}}>{entry.titel}</div></a></li>)
                 }) } 

                 </ul></li> ) 
         }) 
      }
    </ul> )

   return (
       <div className="card cklstNavigationContainer" ref={ (e) => { this.NavigationDiv=e; } } id="Navigation">
          {/*treeContent*/}
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
