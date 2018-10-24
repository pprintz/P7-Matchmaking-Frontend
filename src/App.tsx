import * as React from 'react';
import './App.css';
import CreateGroupForm from "./CreateGroupForm";
import { Card } from 'antd'


import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
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
