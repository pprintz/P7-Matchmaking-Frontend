import * as React from "react";
import * as IOClient from 'socket.io-client';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { GroupServiceApi } from "./services/groupServiceApi";
import { UserServiceCookies } from "./services/userServiceCookies";
import { GroupPageContainer, GroupsPageContainer, LeaveGroup, CreateGroupForm, MenuBar, CreateOrFindGroup, JoinPage, HomePage } from "./components"
import Axios, { AxiosResponse } from "axios";
import { User } from "./models/User";
import RegisterUser, { IFormUser } from "./components/RegisterUser";
import { Menu, Layout } from "antd";
import UserServiceApi from './services/userServiceApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WSGroupService from './services/WSGroupService';
import { QueueUsers } from "./components/QueueUsers";
import { SharedContext, GlobalContext } from './models/SharedContext';
import UserWSService from './services/userWSService';

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
        this.state = { user: this.userServiceCookies.getUserInfo() };
        this.groupServiceApi.getGameList();
    }

    public render() {

        return (
            <Router>
                <div className="App">
                    <GlobalContext.Provider value={
                        {
                            WSGroupService: new WSGroupService(this.userServiceCookies.getUserInfo().userId),
                            GroupServiceApi: new GroupServiceApi(),
                            UserService: new UserServiceCookies(),
                            Client: IOClient(process.env.REACT_APP_API_URL + "", { path: '/api/socket.io', query: { id: this.userServiceCookies.getUserInfo().userId } }),
                            User: this.userServiceCookies.getUserInfo(),
                            UserWSService: new UserWSService(this.userServiceCookies.getUserInfo().userId)
                        }}>
                        <Route render={renderProps => <MenuBar  {...renderProps} />} />
                        <ToastContainer />
                        <Switch>
                            <Route
                                path="/groups/:group_id/:invite_id"
                                render={routeComponentProps => (
                                    <JoinPage
                                        {...routeComponentProps}
                                    />
                                )}
                            />
                            <Route path="/groups/:group_id" render={routeComponentProps => (
                                <GroupPageContainer
                                    {...routeComponentProps}
                                />
                            )} />
                            <Route path="/groups" render={routeComponentProps => (
                                <GroupsPageContainer
                                    {...routeComponentProps}
                                />
                            )} />
                            <Route
                                path="/leave"
                                render={routeComponentProps => (
                                    <LeaveGroup
                                        {...routeComponentProps}
                                    />
                                )}
                            />
                            <Route
                                path="/create"
                                render={() => (
                                    <CreateGroupForm />
                                )}
                            />
                            <Route
                                path="/register"
                                render={() => (
                                    <RegisterUser />
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
                            <Route
                                path="/"
                                render={() => (
                                    <HomePage />
                                )}
                            />
                        </Switch>
                    </GlobalContext.Provider>
                </div>
            </Router>
        );
    }
}
export default App;
