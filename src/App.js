import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './w3.css/w3.css'

import MainPageLayout from './Components/MainPageLayout.jsx'
import Footer from './Components/Footer.jsx'
import MessageBar from './Components/MessageBar.jsx'
import PopupManager from './Components/PopupManager.jsx'

class App extends Component {
  render() {
    return (
      <div>
      <PopupManager />
      <MessageBar alert={{visible: false}}/>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </div>

       
       <MainPageLayout />

       
       <Footer />


      </div>
    );
  }
}

export default App;
