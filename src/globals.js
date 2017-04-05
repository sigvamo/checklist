
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
