import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../App.css';

class Checklist extends Component {
  render() {
    let loading = <div><span>Loading ...</span></div>

    if (this.props.checklist) {
      var checklist = this.props.checklist
    return (

      <div>
         <span>{checklist.titel}</span>
         
      
      <table className="CklContainer">
       <tbody>
        {/* Checklist header */}
        <tr>
            <td>{checklist.id}</td><td>{checklist.version}</td><td>{checklist.titel}</td>
        </tr>

      
      </tbody>
      </table>
      </div>

    )} else { return loading }

  }
}


const mapStateToProps$Checklist = function (state) {
   return { checklist: state.checklist }
}


export default connect(mapStateToProps$Checklist)(Checklist)
