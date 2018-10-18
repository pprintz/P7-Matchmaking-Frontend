import * as React from 'react';

import LeaveGroup from './components/leave_group/LeaveGroup';

import "./components/leave_group/LeaveGroup"

import './App.css';

import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <LeaveGroup groupName="PeterErSejGruppen"/>
      </div>
    );
  }
}

export default App;
