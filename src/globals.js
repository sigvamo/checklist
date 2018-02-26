
export var WARN = 'WARN'
export var INFO = 'INFO'
export var ERRO = 'ERRO'

export var apiReqRetry = 30

/* Used to get wait timeouts for getting data from API */
export var apiReqTimeout = function (r=0) {
      if (r < 3) {
      	 return 3000
      } else if (r < 6) {
      	 return 7000
      } else if (r < 10) {
      	 return 15000
      } else if (r < 20) {
      	 return 60000
      } else if (r > 20) {
      	 return 180000
      }
}

/* Popup IDs. Group of Popups has the same ID, it prevents opening two popups with same Id in parallel */
export var POPUP_ID_VARIABLES = 'VARS'
export var POPUP_ID_CKLSTEDITOR = 'CKLSTEDITOR'

/* Entry types of checklist */
export var CKLST_TITEL = 101
export var CKLST_BODY_CONTENT = 102
export var ENTRY_BODY_CONTENT = 0
export var ENTRY_STEP = 1
export var ENTRY_INPUT = 2
export var ENTRY_GOTO = 3
export var ENTRY_REPEAT = 4

export var ENTRY_BODY_CONTENT_NAME = 'BODY CONTENT'
export var ENTRY_STEP_NAME = 'STEP'
export var ENTRY_INPUT_NAME = 'INPUT ENTRY'
export var ENTRY_GOTO_NAME = 'GOTO ENTRY'
export var ENTRY_REPEAT_NAME = 'REPEAT ENTRY'


export var getEntryName = function (entryType) {
  switch (entryType) {
      case ENTRY_BODY_CONTENT:
           return ENTRY_BODY_CONTENT_NAME
           break;
      case ENTRY_STEP:
           return ENTRY_STEP_NAME
           break;
      case ENTRY_INPUT:
           return ENTRY_INPUT_NAME
           break;
      case ENTRY_GOTO:
           return ENTRY_GOTO_NAME
           break;
      case ENTRY_REPEAT:
           return ENTRY_REPEAT_NAME
           break;
      default:
           return "UNKNOWN"
           break;
    }

}

/* Placeholder for new Checklist */ 
const newChecklistTemplate = {
  id : -1,
  version : '1.0.0',
  titel : '',
  description : '',
  variables : [],
  body : [],
  sections : [
    {
      pos : 1,
          titel : '',
          conditions : [],
          contentmeta: [],
          contentdata: [] 
        }
   ]
}

// Freeze the newCkecklistTemplate
Object.freeze(newChecklistTemplate)

export {newChecklistTemplate}


// Metadata  used in interface
export var metadata = {
   options: {
     ck_max_titel_length: 150,
     ck_max_desc_length: 700
   },
   text: {
     ck_set_titel: "Set Checklist title and description",
     ck_titel: "Checklist titel",
     ck_desc: "Checklist description",
     save: "Save",
     cancel: "Cancel",
     err_missing_val: "This field is required. Please enter some value.",
     msg_max_size: "Maximum allowed length is ",
     err_input_vali_msg: "Entered value do not match requirements, please verify.",
     ck_add: "add",
     ck_modify: "modify",
     ck_entry: "entry"
   }
}


// CKEDITOR config. Must be passed to CKEDITOR.replace function as second argument
export var CKconfig = {
      width: '100%'     
}
