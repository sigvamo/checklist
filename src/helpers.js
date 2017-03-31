import request from 'request'
import Store from './reduxStore.js'
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


