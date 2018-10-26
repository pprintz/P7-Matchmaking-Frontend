import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { GroupServiceApi } from './services/groupServiceApi';
import { UserServiceCookies } from './services/userServiceCookies';
import JoinGroup from './components/JoinGroup';
import GroupPageContainer from './components/GroupPageContainer';
import GroupsPageContainer from './components/GroupsPageContainer';
import LeaveGroup from './components/LeaveGroup';
import CreateGroupForm from './components/CreateGroupForm';
import MenuBar from './components/MenuBar';
import Axios from 'axios';

// The LeaveGroup Component's properties should be set through a "userSettings.xxxx" file, in order for it to be globally updated.
class App extends React.Component<{}, { userId: string }> {

  private groupServiceApi: GroupServiceApi;
  private userServiceCookies: UserServiceCookies;

  constructor(props: any) {
    super(props);

    this.groupServiceApi = new GroupServiceApi();
    this.userServiceCookies = new UserServiceCookies();
    this.state = { userId: "" }

  }

  public async componentDidMount() {
    const userInfo = this.userServiceCookies.getUserInfo();
    this.setState({ userId: userInfo.userId });
    // Visitor is not a user or has deleted cookie
    if(userInfo.userId === undefined) {
      await this.createUserAndSaveInCookie();
    }
  }
  
  // The LeaveGroup Component reads the cookie fields of "group_id" and "user_id"
  public render() {
    return (
      <Router>
        <div className="App">
          <MenuBar userId={this.state.userId} />
          <Switch>
            <Route path="/groups/:group_id/:invite_id" render={(props) => <JoinGroup userServiceCookies={this.userServiceCookies} {... props} />} />
            <Route path="/groups/:group_id" component={GroupPageContainer} />
            <Route path="/groups" component={GroupsPageContainer} />
            <Route path="/leave" render={() => <LeaveGroup groupService={this.groupServiceApi} userService={this.userServiceCookies} />} />
            <Route path="/" component={CreateGroupForm} />
          </Switch>
        </div>
      </Router>
    );
  }

  private async createUserAndSaveInCookie() {
    try {
      const response = await Axios.post("/users/create", { username: "Automatically generated from frontend" });
      const user = response.data;
      this.userServiceCookies.setUserId(user._id);
      this.setState({ userId: user._id });
    }
    catch (error) {
      console.error("ERROR:", error);
    }
  }
}

export default App;
