export const SET_CURRENT_CHECKLIST = 'SET_CURRENT_CHECKLIST'

export function actionSetCurrentChecklist(checklist) {
  return { type: SET_CURRENT_CHECKLIST, checklist: checklist }
}

