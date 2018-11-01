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
import Axios, { AxiosResponse } from "axios";
import { User } from "./models/User";
import RegisterUser from "./components/RegisterUser";
import FrontPage from "./components/FrontPage";
import { Menu, Layout } from "antd";
import CreateOrFindGroup from "./components/CreateOrFindGroup";
import LandingPage from "./components/LandingPage";

const { Header } = Layout;

interface UserState {
  user: User;
}

export const UserContext = React.createContext({
  user: new User(),
});

// The LeaveGroup Component's properties should be set through a "userSettings.xxxx" file, in order for it to be globally updated.
// tslint:disable-next-line:max-classes-per-file
class App extends React.Component<{}, UserState> {
  private groupServiceApi: GroupServiceApi;
  private userServiceCookies: UserServiceCookies;

  constructor(props: any) {
    super(props);

    this.groupServiceApi = new GroupServiceApi();
    this.userServiceCookies = new UserServiceCookies();
    this.state = { user: new User() };
    // this.createUserAndSaveInCookie = this.createUserAndSaveInCookie.bind(this);
  }

  public async componentDidMount() {
    const userInfo = this.userServiceCookies.getUserInfo();
    this.setState({ user: userInfo });
  }

  // The LeaveGroup Component reads the cookie fields of "group_id" and "user_id"
  public render() {
    let HomePage;
    if (isLoggedIn(this.state.user)) {
      HomePage = <CreateOrFindGroup />;
    } else {
      HomePage = <LandingPage />;
    }
    return (
      <Router>
        <div className="App">
          <UserContext.Provider value={this.state}>
            <MenuBar />
            <Switch>
              <Route
                path="/groups/:group_id/:invite_id"
                render={routeComponentProps => (
                  <JoinGroup
                    userServiceCookies={this.userServiceCookies}
                    {...routeComponentProps}
                  />
                )}
              />
              <Route path="/groups/:group_id" component={GroupPageContainer} />
              <Route path="/groups" component={GroupsPageContainer} />
              <Route
                path="/leave"
                render={() => (
                  <LeaveGroup
                    groupService={this.groupServiceApi}
                    userService={this.userServiceCookies}
                  />
                )}
              />
              <Route path="/create" component={CreateGroupForm} />
              <Route
                path="/register"
                render={() => (
                  <RegisterUser doIt={this.createUserAndSaveInCookie} />
                )}
              />
              <Route path="/" render={() => HomePage} />
            </Switch>
          </UserContext.Provider>
        </div>
      </Router>
    );
  }

  public async createUserAndSaveInCookie() {
    try {
      console.log("createUserAndSaveInCookie");
      console.log(this);
      const response = await Axios.post("/users/create", {
        name: "Automatically generated from frontend",
      });
      console.log("CreatedUser", response);
      const userState = { user: new User("groupId", response.data._id) };
      this.userServiceCookies.setUserId(userState.user.userId);
      this.setState(userState);
    } catch (error) {
      console.error("ERROR:", error);
    }
  }
}

// Not sure where to put "helper" functions
export function isLoggedIn(user: User): boolean {
  return user.userId !== "";
}

export default App;
