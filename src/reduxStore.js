import { createStore } from 'redux';
import update from 'immutability-helper'
import * as Actions from './redux-actions.js'
import * as helpers from './helpers.js'

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

    case Actions.SET_NAV_HIGHLIGHT:
       newState = update(state, {navigationHighlights: {$set: action.what }} )
       return newState    
    break;

    case Actions.ADD_POPUP:
       /* Here we will check if there was no popups then we will set it. If there is already popup object then we will check it by id
          and if popup with requested id already exists then new one will not be added. */

       let id_exists = false
       if (! state.popups) { 
             newState = update(state, {popups: {$set: [action.what] }} )
         } else {
         	 state.popups.find((b) => { 
             if (b.id == action.what.id) {
                id_exists = true
                return
               } })
             
             if ( ! id_exists ) {
             	 newState = update(state, {popups: {$push: [action.what] }} )
              } else {
              	   return state
              }
        }

       return newState
    break;


    case Actions.REMOVE_POPUP:
       
       if (! state.popups) { 
             return state
         } else {
         	 // Just generate new object from existing one, then we will manipulate it and return
             newState = update(state, {popups: {$merge: {} }} )
             helpers.delElement(newState.popups, action.what, "id")
        }
       return newState
    break;



    case Actions.UPDATE_ID2STEPID:
       // This action will set or update the id2stepidMapping of the state. If id2stepidMapping do not exists then it will be created. If exists then will be updated.
       
       if (! state.id2stepidMapping) { 
       	     newState = update(state, {id2stepidMapping: {$set: [{section: action.what.section, mapping: action.what.mapping}] }} )
         } else {
         	 helpers.delElement(state.id2stepidMapping, action.what.section, "section")
         	 newState = update(state, {id2stepidMapping: {$push: [{section: action.what.section, mapping: action.what.mapping}] }} )
        }
       return newState
    break;    

    default:
        return state
  }
}

var Store = createStore(Reducer)

export default Store
