import React, { Component } from 'react';
import CreateGroupForm from './CreateGroupForm.js';
import { Card } from 'antd'
import axios from 'axios'
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
        <Card style={{
          maxWidth: 500, 
          margin: '0 auto'}}>
          <CreateGroupForm />
        </Card>
      </div>
    );
  }
}

axios.defaults.baseURL = "http://localhost:3000";

export default App;
