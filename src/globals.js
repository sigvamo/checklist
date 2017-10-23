
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

/* Entry types of checklist */
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

