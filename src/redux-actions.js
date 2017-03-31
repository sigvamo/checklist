export const SET_CURRENT_CHECKLIST = 'SET_CURRENT_CHECKLIST'
export const CHANGE_CHECKLIST_TITEL = 'CHANGE_CHECKLIST_TITEL'
export const SET_ALERT = 'SET_ALERT'

export function actionSetCurrentChecklist(checklist) {
  return { type: SET_CURRENT_CHECKLIST, checklist: checklist }
}

export function actionChangeChecklistTitel(titel) {
  return { type: CHANGE_CHECKLIST_TITEL, titel: titel }
}

export function actionSetAlert(alert) {
  return { type: SET_ALERT, alert: alert }
}
