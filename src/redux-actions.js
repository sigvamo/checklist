export const SET_CURRENT_CHECKLIST = 'SET_CURRENT_CHECKLIST'
export const CHANGE_CHECKLIST_TITEL = 'CHANGE_CHECKLIST_TITEL'

export function actionSetCurrentChecklist(checklist) {
  return { type: SET_CURRENT_CHECKLIST, checklist: checklist }
}

export function actionChangeChecklistTitel(titel) {
  return { type: CHANGE_CHECKLIST_TITEL, titel: titel }
}
