import React, { Component } from 'react';

class CStepTitel extends Component {

render() {

	return (
          <div className="ag-cstep-marker ag-cstep-color">
    			    <div>This step is Conditional. It will be shown only if next condition will be true:</div>
    			    <div><b>{this.props.condition}</b></div>
    	  </div>
		)
}

}

export default CStepTitel