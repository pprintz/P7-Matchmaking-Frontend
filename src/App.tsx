import * as React from "react";
import * as IOClient from 'socket.io-client';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { GroupServiceApi } from "./services/groupServiceApi";
import { UserServiceCookies } from "./services/userServiceCookies";
import {GroupPageContainer, GroupsPageContainer, LeaveGroup, CreateGroupForm, MenuBar, CreateOrFindGroup, LandingPage, JoinPage} from "./components"
import Axios, { AxiosResponse } from "axios";
import { User } from "./models/User";
import RegisterUser, { IFormUser } from "./components/RegisterUser";
import { Menu, Layout } from "antd";
import UserServiceApi from './services/userServiceApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WSGroupService from './services/WSGroupService';
import { QueueUsers } from "./components/QueueUsers";

const { Header } = Layout;

interface UserState {
  user: User;
}

export const UserContext = React.createContext({
  user: new User("", "", "", "", "")
});

// The LeaveGroup Component's properties should be set through a "userSettings.xxxx" file, in order for it to be globally updated.
// tslint:disable-next-line:max-classes-per-file
class App extends React.Component<{}, UserState> {
  private groupServiceApi: GroupServiceApi;
  private userServiceCookies: UserServiceCookies;
  private userServiceApi: UserServiceApi;

  constructor(props: any) {
    super(props);
    
    this.groupServiceApi = new GroupServiceApi();
    this.userServiceCookies = new UserServiceCookies();
    this.userServiceApi = new UserServiceApi();
    this.state = { user: new User("", "", "", "", "") };
    this.groupServiceApi.getGameList();
  }

  public render() {
    let HomePage;
    if (this.userServiceCookies.isLoggedIn()) {
      HomePage = <CreateOrFindGroup />;
    } else {
      HomePage = <LandingPage />;
    }
    return (
      <Router>
        <div className="App">
          <UserContext.Provider value={this.state}>
          <Route render={renderProps => <MenuBar  {...renderProps}/>} /> 
            <ToastContainer/>
            <Switch>
              <Route
                path="/groups/:group_id/:invite_id"
                render={routeComponentProps => (
                  <JoinPage
                    userServiceCookies={this.userServiceCookies}
                    {...routeComponentProps}
                  />
                )}
              />
              <Route path="/groups/:group_id" render={routeComponentProps => (
                <GroupPageContainer 
                    userService={this.userServiceCookies}
                    groupService={this.groupServiceApi}
                    {...routeComponentProps}
                />
              )} />
              <Route path="/groups" render={routeComponentProps => (
                <GroupsPageContainer
                  userService={this.userServiceApi}
                  groupService={this.groupServiceApi}
                  {...routeComponentProps}
                />
              )} />
              <Route
                path="/leave"
                render={routeComponentProps => (
                  <LeaveGroup
                    groupService={this.groupServiceApi}
                    {...routeComponentProps}
                  />
                )}
              />
              <Route
                path="/create"
                render={() => (
                  <CreateGroupForm/>
                )}
              />
              <Route
                path="/register"
                render={() => (
                  <RegisterUser
                    createUserAndSaveInCookie={this.createUserAndSaveInCookie}
                  />
                )}
              />
              <Route
                path="/queue"
                render={routeComponentProps => (
                  <QueueUsers
                    {...routeComponentProps}
                  />
                )}
              />
              <Route path="/" render={() => HomePage} />
            </Switch>
          </UserContext.Provider>
        </div>
      </Router>
    );
  }



  public createUserAndSaveInCookie = async (user: IFormUser) => {
    try {
      const response = await Axios.post(
        process.env.REACT_APP_API_URL + "/api/users/create",
        user
      );
      const createdUser = response.data;
      const userState = {
        user: new User(
          createdUser._id,
          createdUser.name,
          createdUser.discordId,
          "groupId"
          , ""
        )
      };
      this.userServiceCookies.setUserInfo(userState.user);
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

}
  // Not sure where to put "helper" functions


  export default App;
