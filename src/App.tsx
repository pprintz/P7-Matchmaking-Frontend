import * as React from "react";
import * as IOClient from 'socket.io-client';
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
import RegisterUser, { IFormUser } from "./components/RegisterUser";
import FrontPage from "./components/FrontPage";
import { Menu, Layout } from "antd";
import CreateOrFindGroup from "./components/CreateOrFindGroup";
import LandingPage from "./components/LandingPage";
import { SharedContext, GlobalContext } from './models/SharedContext';
const { Header } = Layout;
import { IGame } from "./services/interfaces";

// The LeaveGroup Component's properties should be set through a "userSettings.xxxx" file, in order for it to be globally updated.
// tslint:disable-next-line:max-classes-per-file
class App extends React.Component<{}, SharedContext> {
    private groupServiceApi: GroupServiceApi;
    private userServiceCookies: UserServiceCookies;

    constructor(props) {
        super(props);
        console.log(process.env);
        this.groupServiceApi = new GroupServiceApi();
        this.state = new SharedContext();
        this.groupServiceApi.getGameList();
        this.userServiceCookies = this.state.UserService;
    }

    public render() {
        let HomePage;
        if (isLoggedIn(this.state.UserService.getUserInfo())) {
            HomePage = <CreateOrFindGroup />;
        } else {
            HomePage = <LandingPage />;
        }
        return (
            <Router>
                <div className="App">
                    <GlobalContext.Provider value={this.state}>
                        <MenuBar />
                        <Switch>
                            <Route // TODO
                                path="/groups/:group_id/:invite_id"
                                // render={routeComponentProps => (
                                //     <JoinGroup
                                //         userServiceCookies={this.userServiceCookies}
                                //         {...routeComponentProps}
                                //     />
                                // )}
                                component={JoinGroup}
                            />
                            <Route path="/groups/:group_id" component={GroupPageContainer} />
                            <Route path="/groups" component={GroupsPageContainer} />
                            {/* <Route
                                path="/leave"
                                render={() => (
                                    <LeaveGroup
                                        groupService={this.groupServiceApi}
                                        userService={this.userServiceCookies}
                                    />
                                )}
                            /> */}
                            <Route path="/create" render={() => ( // TODO
                                <CreateGroupForm groupService={this.groupServiceApi} />
                            )} />
                            <Route
                                path="/register"
                                render={() => (
                                    <RegisterUser createUserAndSaveInCookie={this.createUserAndSaveInCookie} />
                                )}
                            />
                            <Route path="/" render={() => HomePage} />
                        </Switch>
                    </GlobalContext.Provider>
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
                )
            };
            this.userServiceCookies.setUserInfo(userState.user);
            this.setState({ UserService: this.state.UserService });
        } catch (error) {
            console.error("ERROR:", error);
        }
    };
}

// Not sure where to put "helper" functions
export function isLoggedIn(user: User): boolean {
    return user.userId !== "";
}

export default App;
