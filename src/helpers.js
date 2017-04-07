import request from 'request'
import Store from './reduxStore.js'
import hljs from 'highlightjs'
import * as globals from './globals.js'
import * as Actions from './redux-actions.js'


export var alertMessage = function (message, type=globals.INFO, visible=true) {
  Store.dispatch(Actions.actionSetAlert({type: type, visible: visible, message: message}))
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
export var navigateToElement = function(id) {
  let el = document.getElementById(id)
  el.style.animation = null
  el.scrollToCenter()
  el.style.animation = "ag-bg-transition-nav 1s"
}

export var sleep = function(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
/* jQuery function, to keep Navigation always on top */
export var jQsetOnScroll = function(params={}) {
  if (params.init === true) {
       // eslint-disable-next-line
       $("#Navigation").css({"maxHeight": 300});
       //$("#Navigation").height(300);
       // eslint-disable-next-line
       var checklistMarginTop = $("#Checklist").css("margin-top")
       // eslint-disable-next-line
       let offset = parseFloat(checklistMarginTop.replace(/[^0-9.]+/g,''));
       // eslint-disable-next-line
       $("#Navigation").css({"margin-top": offset})
       // eslint-disable-next-line
       $(window).off('scroll')
  } else {
     // eslint-disable-next-line
     $("#Navigation").css({"maxHeight": $(window).height() - 30});
     // eslint-disable-next-line
     $(window).scroll(function(){
     // eslint-disable-next-line
     $("#Navigation").css({"maxHeight": $(window).height() - 30});
     //$("#Navigation").height($(window).height() - 30);
     // eslint-disable-next-line
     var checklistTop = $("#Checklist").offset().top
     // eslint-disable-next-line
     var checklistHeight = $("#Checklist").height()
     // eslint-disable-next-line
     var checklistMarginTop = $("#Checklist").css("margin-top")
     // eslint-disable-next-line
     let offset = parseFloat(checklistMarginTop.replace(/[^0-9.]+/g,''));
     // eslint-disable-next-line
     var windowTop = $(window).scrollTop();
     (windowTop < checklistTop) ? offset += 0 : offset += windowTop-checklistTop
     // eslint-disable-next-line
     if (offset > checklistTop + checklistHeight - $("#Navigation").height() ) { return }
     // eslint-disable-next-line
       $("#Navigation")
              .stop()
              // eslint-disable-next-line
              .animate({"marginTop": (offset + "px")}, 0 );
     })
  }
}
