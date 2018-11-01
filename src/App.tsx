import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { GroupServiceApi } from "./services/groupServiceApi";
import { UserServiceCookies } from "./services/userServiceCookies";
import JoinGroup from "./components/JoinGroup";
import GroupPageContainer from "./components/GroupPageContainer";
import GroupsPageContainer from "./components/GroupsPageContainer";
import LeaveGroup from "./components/LeaveGroup";
import CreateGroupForm from "./components/CreateGroupForm";
import MenuBar from "./components/MenuBar";
import Axios from "axios";
import { User } from "./models/User";
import RegisterUser from "./components/RegisterUser";
import FrontPage from "./components/FrontPage";
import { Menu, Layout } from "antd";

const { Header } = Layout;

class UserState {
  public user: User = new User();
}

export const UserContext = React.createContext(new UserState());

// The LeaveGroup Component's properties should be set through a "userSettings.xxxx" file, in order for it to be globally updated.
// tslint:disable-next-line:max-classes-per-file
class App extends React.Component<{}, UserState> {
  private groupServiceApi: GroupServiceApi;
  private userServiceCookies: UserServiceCookies;

  constructor(props: any) {
    super(props);

    this.groupServiceApi = new GroupServiceApi();
    this.userServiceCookies = new UserServiceCookies();
    this.state = new UserState();
  }

  public async componentDidMount() {
    const userInfo = this.userServiceCookies.getUserInfo();
    const userState = new UserState();
    userState.user = userInfo;
    this.setState(userState);
  }

  // The LeaveGroup Component reads the cookie fields of "group_id" and "user_id"
  public render() {
    return (
      <Router>
        <div className="App">
          <UserContext.Provider value={this.state}>
            <MenuBar />
            <Switch>
              <Route
                path="/groups/:group_id/:invite_id"
                render={routeComponentProps => <JoinGroup userServiceCookies={this.userServiceCookies} {...routeComponentProps} />}
              />
              <Route path="/groups/:group_id" component={GroupPageContainer} />
              <Route path="/groups" component={GroupsPageContainer} />
              <Route path="/leave" render={() => <LeaveGroup groupService={this.groupServiceApi} userService={this.userServiceCookies} />} />
              <Route path="/create" component={CreateGroupForm} />
              <Route path="/register" component={RegisterUser} />
              <Route path="/" component={FrontPage} />
            </Switch>
          </UserContext.Provider>
        </div>
      </Router>
    );
  }

  private async createUserAndSaveInCookie() {
    try {
      const response = await Axios.post("/users/create", { name: "Automatically generated from frontend" });
      const user = response.data;
      this.userServiceCookies.setUserId(user._id);
      this.setState(user);
    } catch (error) {
      console.error("ERROR:", error);
    }
  }
}

// Not sure where to put "helper" functions
export function isLoggedIn(user: User): boolean {
  console.log("lol", user.userId !== "");
  return user.userId !== "";
}

export default App;
