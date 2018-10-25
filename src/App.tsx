import * as React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import GroupPageContainer from './Group/GroupPageContainer';
import CreateGroupForm from "./CreateGroupForm";
import JoinGroup from "./JoinGroup";
import LeaveGroup from './components/leave_group/LeaveGroup';
import { UserServiceCookies } from "./services/users/userServiceCookies";
import { GroupServiceApi } from "./services/groups/groupServiceApi";
import "./components/leave_group/LeaveGroup"
import './App.css';

// The LeaveGroup Component's properties should be set through a "userSettings.xxxx" file, in order for it to be globally updated.
class App extends React.Component {

  private groupServiceApi: GroupServiceApi;
  private userServiceCookies: UserServiceCookies;

  constructor(props: any) {
    super(props);

    this.groupServiceApi = new GroupServiceApi();
    this.userServiceCookies = new UserServiceCookies();

  }

  // The LeaveGroup Component reads the cookie fields of "group_id" and "user_id"
  public render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>Awesome Matchmaking</h1>
            <ul>
              <li><Link to="/join">Join</Link></li>
              <li><Link to="/">Create Group / Home</Link></li>
              <li><Link to="/leave">Leave</Link></li>
            </ul>
          </header>
          {/* <Switch>           */}
          {/* The commented routes below should be un-commented and modified to point to the correct component
            once the components are implemented. */}
          {/* <Route path="/groups/:group_id/:invite_id" component={GroupPageContainer} /> */}
          {/* <Route path="/groups/" component={GroupPageContainer} /> */}
          {/* </Switch> */}
          <Switch>
            <Route path="/groups/:group_id" component={GroupPageContainer} />
            <Route path="/join" component={JoinGroup} />
            <Route path="/leave" render={() => <LeaveGroup groupService={this.groupServiceApi} userService={this.userServiceCookies} />} />
            <Route path="/" component={CreateGroupForm} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
