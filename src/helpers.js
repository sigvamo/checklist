import request from 'request'
import Store from './reduxStore.js'
import hljs from 'highlightjs'
import * as globals from './globals.js'
import * as Actions from './redux-actions.js'


export var alertMessage = function (message, type=globals.INFO, visible=true) {
  Store.dispatch(Actions.actionSetAlert({type: type, visible: visible, message: message}))
}

export var closeMessage = function () {
  Store.dispatch(Actions.actionSetAlert({visible: false}))
}

// getAPI is function used to get data from API, all data passed in JSON format.
// Function gets as argument "action" which is objects of next form:
//   {func: function(data) { actions with data}, uri: 'some uri'}
// For each new action handler must be added in this function.
export var getAPI = function (action, rCounter=0, retryCount=globals.apiReqRetry, retryTimeOut=globals.apiReqTimeout) {
	if (rCounter < retryCount) {
	console.log('Getting data from ' + action.uri +', try:', rCounter);
	request
           .get({uri: action.uri, json: true},
           	   function (error, response, data) {
           	   	  if (error) { 
           	   	  	   console.log('Cannot get data from API, Error: ', error);
                       alertMessage('Cannot get data from the server, will try after ' + retryTimeOut(rCounter)/1000 + ' sec. Try number: ' + rCounter, globals.ERRO)
                       rCounter++
                       // Executing recursively loadChecklist with timeout. Passing arguments in setTimeout
                       setTimeout(getAPI, retryTimeOut(rCounter), action, rCounter, retryCount, retryTimeOut)
           	   	  	   return false;
           	   	  	}

           	   	  if (response.statusCode === 200 && typeof data === "object") {
           	   	  	   Store.dispatch(Actions.actionSetAlert({visible: false }))
           	   	  	   action.func(data)
                       return true
                  } else {
                       console.log('Cannot get data from API: ', response.body)
                       alertMessage('Cannot get data from the server, will try after ' + retryTimeOut(rCounter)/1000 + ' sec. Try number: ' + rCounter, globals.ERRO)
                       rCounter++
                       // Executing recursively loadChecklist with timeout. Passing arguments in setTimeout
                       setTimeout(getAPI, retryTimeOut(rCounter), action, rCounter, retryCount, retryTimeOut)
                       return false
                  }
           	   })
      
    } else
      {
           alertMessage('Cannot get data from the server after all ' + retryCount + ' tries! Please try to comeback later.', globals.ERRO)
           console.log('RETRIES FINISHED!')
       }
    
}

/* This function used to apply code highlighting using highlightBlock function of the highlight.js.
   It receives DOM element and scans all children it will find <pre><code> pair and apply highlighting
   on <code> element. If second parameter is true then initHighlighting.called = false will be executed. */
export var applyHLJS = function(element, update) {
  if (element == null) { console.log('WARNING', 'applyHLJS', 'element argument cannot be null'); return; }
  let el;
    for (var i = 0; i < element.children.length; i++) {
        el = element.children[i]
      if ( el.tagName == 'PRE' ) {
           if ( el.children[0].tagName == 'CODE' ) {
            update ? hljs.initHighlighting.called = false : null
            hljs.highlightBlock(el.children[0])
          } 
      }
    }
}

/* This function will get id of the element and will scroll it to the screen center and make blink effect.
   Was create to navigate on Sections and Steps */
export var navigateToElement = function(id, blink=true) {
  let el = document.getElementById(id)
  el.style.animation = null
  el.scrollToCenter()
  if (blink == true) {
     el.style.animation = "ag-bg-transition-nav 1s"
  }
}

export var sleep = function(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


export var findVariables = function (variable) {
  var checklist = Store.getState().checklist
  
  var res = {}

  res.sections = checklist.sections.reduce((prev, curr) => {
      
      var contentIncludesVAR = curr.contentdata.reduce((prv, cr) => {
         if (cr.content.search(new RegExp('\\$\\$' + variable + '\\$\\$', 'g')) != -1) {
              prv.push(Object.assign(cr, getContentEntryMeta(curr, cr.id)))
             }
         return prv     
      }, [])
      
      if (contentIncludesVAR.length > 0 ) {
         prev[curr.pos] = contentIncludesVAR
      }

      return prev
  }, {})

 return res

}


export var getSectionByPos = function (checklist, sectionPos) {
  
  let res
   checklist.sections.find((section) => { 
             if (section.pos == sectionPos) {
                res = section
             }
         })

   return res || "undef"

}


export var getVariableById = function (id) {
  var checklist = Store.getState().checklist
  
  let res
   checklist.variables.find((b) => { 
             if (b.id == id) {
                res = b.name
             }
         })

   return res || "undef"

}


// Function to highlit variables
export var showVariables = function (text) {
   function replacer(match) {
     return '<span class="ag-variable" title="Placeholder for variable ' + match + '"><code>' + match.replace(/\$/g, '') + '</code></span>'
   }
   return text.replace(/\$\$([A-Za-z0-9_]+)\$\$/g, replacer)
} 


/* jQuery function, to keep Navigation always on top */
export var jQsetOnScroll = function(params={}) {
  /* eslint-disable */
  if (params.init === true) {
       $("#Navigation").css({"maxHeight": 300});
       //$("#Navigation").height(300);
       var checklistMarginTop = $("#Checklist").css("margin-top")
       let offset = parseFloat(checklistMarginTop.replace(/[^0-9.]+/g,''));
       $("#Navigation").css({"margin-top": offset})
       $(window).off('scroll')
  } else {
     $("#Navigation").css({"maxHeight": $(window).height() - 30});
     $(window).scroll(function(){
     $("#Navigation").css({"maxHeight": $(window).height() - 30});
     //$("#Navigation").height($(window).height() - 30);
     var checklistTop = $("#Checklist").offset().top
     var checklistHeight = $("#Checklist").height()
     var checklistMarginTop = $("#Checklist").css("margin-top")
     let offset = parseFloat(checklistMarginTop.replace(/[^0-9.]+/g,''));
     var windowTop = $(window).scrollTop();
     (windowTop < checklistTop) ? offset += 0 : offset += windowTop-checklistTop
     if (offset > checklistTop + checklistHeight - $("#Navigation").height() ) { return }
       $("#Navigation")
              .stop()      
              .animate({"marginTop": (offset + "px")}, 0 );
     })
  }
}



// Manage Checklist section object. Function to get metadata Object for specific id
export var getContentEntryMeta = function (section, id){
   let retVal
   section.contentmeta.find((b) => { 
             if (b.id == id) {
                retVal = b
             }
         })
   return retVal || -1
}

// Manage Checklist section object. Function to get content Object for specific id
export var getContentEntryData = function (section, id){
   let retVal
   section.contentdata.find((b) => { 
             if (b.id == id) {
                retVal = b
             }
         })
   return retVal || -1
 }

// Checklist condition selector. Provide conditions object and id of the condition it will return the condition (string)
export var getCondition = function (conditions, cid){
   let retVal
   conditions.find((b) => { 
             if (b.id == cid) {
                retVal = b.condition
             }
         })
   return retVal || -1
 }

// Function to evaluate condition. Input is string condition, which will be evaluated and returned true or false
export var evalCondition = function (condition){
  function evaluate(cond) {
     let fBody = 'if (' + cond + ') { return true } else { return false }'
     return new Function(fBody)();
  }
   return evaluate(condition)
 }

// Remove element from array by value.
export var delElement = function (arr, val, key=null){
  
  if ( key != null ) {
     for(var i = arr.length - 1; i >= 0; i--) {
        if(arr[i][key] === val) {
          arr.splice(i, 1);
        }
     }
  }
  
}

// Find StepID by entry id in specified mapping object
export var getStepIDbyEntryID = function (obj, section, id){
   let retVal
   obj.find((b) => { 
             if (b.section == section) {
                retVal = b.mapping[id]
             }
         })
   return retVal || -1
 }


// Find StepID by entry id frm current REDUX Store
export var getStepIDbyEntryIDfromStore = function (section, id){
   let obj = Store.getState().id2stepidMapping
   let retVal
   obj.find((b) => { 
             if (b.section == section) {
                retVal = b.mapping[id]
             }
         })
   return retVal || -1
 }

export var genId2StepIdMapping = function (checklist){
  if (! checklist) {return null}
  if (checklist.sections.length == 0) {return null}
      var id2stepId = checklist.sections.map((section, ind)=>{
         var stepID = 0
         let tmpObj={}
         section.contentmeta.map((entry, ind) => {
           if (entry.type === 1) {
               stepID++ 
               tmpObj[entry.id] = stepID
             }
           })
           return {section: section.pos, mapping: tmpObj}
         })
  return id2stepId
}

// This function used to get current values of different entries in checklist
export var getCklstCurrent = function (what, pos) {
  let checklist = Store.getState()['checklist']
  let retVal
   switch (what) {
     case globals.CKLST_TITEL:
       retVal = [checklist.titel, checklist.description]
       break;
     case globals.CKLST_BODY_CONTENT:
       retVal = checklist.body[pos].content
       break;
   }
  return retVal
}


export var cklstAdminEngine = function (action, what, desc) {
   let tmpChecklist = Object.assign({}, Store.getState()['checklist'])
   switch (action) {
     case 'ADD':
         switch (what) {
            case globals.CKLST_TITEL:
                tmpChecklist['titel']=desc[0]
                tmpChecklist['description']=desc[1]
              break;
            case globals.CKLST_BODY_CONTENT:
                /* We will not add body content if the last entry is body content. We will add it only 
                   after section or to the empty body*/  
                // Check if body not exists or has zero length
                if (! ('body' in tmpChecklist) || tmpChecklist['body'].length===0 ) {
                  tmpChecklist['body'].push({content: desc})
                }
              break;    
         }

       break;
   }
  Store.dispatch(Actions.actionChangeChecklist(tmpChecklist))
}


export var printREDUXStore = function () {
  Store.dispatch(Actions.actionRemoveCurrentChecklist())
  console.log(Store.getState())
}

