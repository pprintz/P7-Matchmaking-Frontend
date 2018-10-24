import * as React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import GroupsPageContainer from './Group/GroupsPageContainer';
import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Router>
          {/* <Switch>           */}
          {/* The commented routes below should be un-commented and modified to point to the correct component
            once the components are implemented. */}
          {/* <Route path="/groups/:group_id/:invite_id" component={GroupPageContainer} /> */}
          {/* <Route path="/groups/" component={GroupPageContainer} /> */}
          <Route path="/groups" component={GroupsPageContainer} />

          {/* </Switch> */}
        </Router>
      </div>
    );
  }
}

export default App;
