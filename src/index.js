import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as Actions from './redux-actions.js'
import update from 'immutability-helper'
import request from 'request'

import Checklist from './Components/Checklist.jsx'

const Reducer = function (state={}, action) {
  let newState = {}
  switch(action.type) {
    case Actions.SET_CURRENT_CHECKLIST:
         newState = update(state, {checklist: {$set: action.checklist }} )
         return newState    
      break;
  
    default:
        return state
  }
}


var Store = createStore(Reducer)


var loadChecklist = function (checklistID) {
	request
           .get({uri: 'http://localhost:2000/int-api/getData', json: true},
           	   function (error, response, data) {
           	   	  if (error) { 
           	   	  	   console.log('Cannot get checklist: ', error); 
           	   	  	   return false;
           	   	  	}
           	   	  console.log('response=', response)
           	   	  if (response.statusCode === 200 && typeof data === "object") {
                       Store.dispatch(Actions.actionSetCurrentChecklist(data))
                       return true
                  } else {
                       console.log('Cannot get checklist: ', response.body)
                       return false
                  }
           	   })
    
}


loadChecklist(1)

// sleep time expects milliseconds
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// Usage!
sleep(1000).then(() => {
    // Do something after the sleep!
    console.log('Store=', Store.getState())
});


ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root')
);






