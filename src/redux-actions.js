export const SET_CURRENT_CHECKLIST = 'SET_CURRENT_CHECKLIST'
export const CHANGE_CHECKLIST_TITEL = 'CHANGE_CHECKLIST_TITEL'
export const SET_ALERT = 'SET_ALERT'
export const SET_NAV_HIGHLIGHT = 'SET_NAV_HIGHLIGHT'

export function actionSetCurrentChecklist(payload) {
  return { type: SET_CURRENT_CHECKLIST, checklist: payload }
}

export function actionChangeChecklistTitel(payload) {
  return { type: CHANGE_CHECKLIST_TITEL, titel: payload }
}

export function actionSetAlert(payload) {
  return { type: SET_ALERT, alert: payload }
}

export function actionSetNavHighlight(payload) {
  return { type: SET_NAV_HIGHLIGHT, what: payload }
}