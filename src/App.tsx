import * as React from 'react';

import LeaveGroup from './components/leave_group/LeaveGroup';

import "./components/leave_group/LeaveGroup"

import './App.css';

import logo from './logo.svg';

// The LeaveGroup Component's properties should be set through a "userSettings.xxxx" file, in order for it to be globally updated.
class App extends React.Component {
  constructor(props : any){
    super(props);  
  }

  // The LeaveGroup Component reads the cookie fields of "group_id" and "user_id"
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <LeaveGroup />
      </div>
    );
  }
}

export default App;
