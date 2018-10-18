import React, { Component } from 'react';
import CreateGroupForm from './CreateGroupForm.js';
import './App.css';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <div className="header-right">
          <a className="active" href="#home">Home</a>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
        </div>
        </header>
        <CreateGroupForm />
        {/* <MyComponent hello="Thomsen"/> */}
      </div>
    );
  }
}

export default App;
