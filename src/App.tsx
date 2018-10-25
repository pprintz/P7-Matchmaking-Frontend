import * as React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import GroupPageContainer from './Group/GroupPageContainer';
import CreateGroupForm from "./CreateGroupForm";
import LeaveGroup from './components/leave_group/LeaveGroup';
import logo from './logo.svg';
import {UserServiceCookies} from "./services/users/userServiceCookies";
import {GroupServiceApi} from "./services/groups/groupServiceApi";
import "./components/leave_group/LeaveGroup"
import './App.css';
import { Card } from 'antd'


// The LeaveGroup Component's properties should be set through a "userSettings.xxxx" file, in order for it to be globally updated.
class App extends React.Component {

  private groupServiceApi : GroupServiceApi;
  private userServiceCookies : UserServiceCookies;

  constructor(props : any){
    super(props);  

    this.groupServiceApi = new GroupServiceApi();
    this.userServiceCookies = new UserServiceCookies();

  }

  // The LeaveGroup Component reads the cookie fields of "group_id" and "user_id"
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
            <Route path="/groups/:group_id" component={GroupPageContainer} />
          {/* </Switch> */}
        </Router>
        <LeaveGroup groupService={this.groupServiceApi} userService={this.userServiceCookies}/>
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
