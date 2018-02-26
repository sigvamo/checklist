import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

/* Load CSS */
import './index.css';
import './agstyles.css';
import './ckeditorview.css'
/* Defines the style of the codesnippets in view mode */
import '../public/ckeditor/plugins/codesnippet/lib/highlight/styles/default.css'

import * as Actions from './redux-actions.js'
import * as globals from './globals.js'
import * as helpers from './helpers.js'
import Store from './reduxStore.js'

import App from './App';



/* All elements will have the property function to scroll them to the "center" of the page */
HTMLElement.prototype.scrollToCenter = function(){
    window.scrollBy(0, this.getBoundingClientRect().top - ((window.innerHeight/2) >> 1));
}

/* Will set scroll event to the window, to keep Navigator  */
// eslint-disable-next-line
$().ready(function() {
      helpers.jQsetOnScroll()
});

// eslint-disable-next-line
$(window).resize(function() {
	  // eslint-disable-next-line
      if ($(window).width() < 600) {
      	  helpers.jQsetOnScroll({init: true})
      } else {
          helpers.jQsetOnScroll()
      }
});

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






