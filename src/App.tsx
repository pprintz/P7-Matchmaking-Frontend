import * as React from 'react';

import CreateGroupForm from "./CreateGroupForm";

import LeaveGroup from './components/leave_group/LeaveGroup';
import logo from './logo.svg';


import "./components/leave_group/LeaveGroup"

import './App.css';
import { Card } from 'antd'


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
        <Card style={{
          margin: '0 auto',
          maxWidth: 500}}>
          <CreateGroupForm />
        </Card>
      </div>
    );
  }
}

export default App;
