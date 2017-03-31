import { createStore } from 'redux';
import update from 'immutability-helper'
import * as Actions from './redux-actions.js'


const Reducer = function (state={}, action) {
  let newState = {}
  switch(action.type) {

    case Actions.SET_CURRENT_CHECKLIST:
         newState = update(state, {checklist: {$set: action.checklist }} )
         return newState    
      break;

    case Actions.CHANGE_CHECKLIST_TITEL:
         if (!state.checklist) { return state }
         newState = update(state, {checklist: {titel: {$set: action.titel }}} )
         return newState    
      break;
  
    case Actions.SET_ALERT:
         newState = update(state, {alert: {$set: action.alert }} )
         return newState    
      break;

    default:
        return state
  }
}

var Store = createStore(Reducer)

export default Store
