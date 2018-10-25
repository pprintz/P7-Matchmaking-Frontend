import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { GroupServiceApi } from './services/groupServiceApi';
import { UserServiceCookies } from './services/userServiceCookies';
import JoinGroup from './components/JoinGroup';
import GroupPageContainer from './components/GroupPageContainer';
import LeaveGroup from './components/LeaveGroup';
import CreateGroupForm from './components/CreateGroupForm';
import MenuBar from './components/MenuBar';

// The LeaveGroup Component's properties should be set through a "userSettings.xxxx" file, in order for it to be globally updated.
class App extends React.Component {

  private groupServiceApi: GroupServiceApi;
  private userServiceCookies: UserServiceCookies;

  constructor(props: any) {
    super(props);

    this.groupServiceApi = new GroupServiceApi();
    this.userServiceCookies = new UserServiceCookies();

  }

  public componentDidMount() {
    this.userServiceCookies.setUserId("5bd04cdea1a09e9dc186bba6");
  }

  // The LeaveGroup Component reads the cookie fields of "group_id" and "user_id"
  public render() {
    return (
      <Router>
        <div className="App">
          <MenuBar />
          <Switch>
            <Route path="/groups/:group_id/:invite_id" render={(props) => <JoinGroup userServiceCookies={this.userServiceCookies} {... props} />} />
            <Route path="/groups/:group_id" component={GroupPageContainer} />
            <Route path="/leave" render={() => <LeaveGroup groupService={this.groupServiceApi} userService={this.userServiceCookies} />} />
            <Route path="/" component={CreateGroupForm} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
