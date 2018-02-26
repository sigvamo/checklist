export const SET_CURRENT_CHECKLIST = 'SET_CURRENT_CHECKLIST'
export const REMOVE_CURRENT_CHECKLIST = 'REMOVE_CURRENT_CHECKLIST'
export const CHANGE_CHECKLIST = 'CHANGE_CHECKLIST'
export const SET_ALERT = 'SET_ALERT'
export const SET_NAV_HIGHLIGHT = 'SET_NAV_HIGHLIGHT'
export const ADD_POPUP = 'ADD_POPUP'
export const REMOVE_POPUP = 'REMOVE_POPUP'
export const UPDATE_ID2STEPID = 'UPDATE_ID2STEPID'


export function actionSetCurrentChecklist(payload) {
  return { type: SET_CURRENT_CHECKLIST, checklist: payload }
}

export function actionRemoveCurrentChecklist() {
  return { type: REMOVE_CURRENT_CHECKLIST }
}

export function actionChangeChecklist(payload) {
  return { type: CHANGE_CHECKLIST, checklist: payload }
}

export function actionSetAlert(payload) {
  return { type: SET_ALERT, alert: payload }
}

export function actionSetNavHighlight(payload) {
  return { type: SET_NAV_HIGHLIGHT, what: payload }
}

export function actionAddPopup(payload) {
  return { type: ADD_POPUP, what: payload }
}

export function actionRemovePopup(payload) {
  return { type: REMOVE_POPUP, what: payload }
}

export function actionUpdateId2StepID(payload) {
  return { type: UPDATE_ID2STEPID, what: payload }
}
