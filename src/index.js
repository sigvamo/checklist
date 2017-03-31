import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import './agstyles.css';
import * as Actions from './redux-actions.js'
import * as globals from './globals.js'
import * as helpers from './helpers.js'
import Store from './reduxStore.js'

import App from './App';



helpers.getAPI({func: function(data) {Store.dispatch(Actions.actionSetCurrentChecklist(data))}, uri: 'http://localhost:2000/int-api/getData'})


/* sleep time expects milliseconds
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// Usage!
sleep(1000).then(() => {
    // Do something after the sleep!
    console.log('Store=', Store.getState())
});*/


ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root')
);






