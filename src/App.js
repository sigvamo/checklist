import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './w3.css/w3.css'

import Checklist from './Components/Checklist.jsx'
import Footer from './Components/Footer.jsx'
import MessageBar from './Components/MessageBar.jsx'

class App extends Component {
  render() {
    return (
      <div>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </div>

        <MessageBar alert={{visible: false}}/>

        <div className="row">
          <div className="col s10 offset-s2">
            <Checklist />
          </div>
        </div>

       
       <Footer />


      </div>
    );
  }
}

export default App;
