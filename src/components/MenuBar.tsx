import * as React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { GlobalContext, SharedContext } from "../models/SharedContext";
import { Button } from 'antd';
import { UserService } from '../services/interfaces'
import { User } from 'src/models/User';

export class MenuBar extends React.Component<RouteComponentProps> {
    private user: User;

    // THIS VARIABLE *IS* IN FACT USED! DO NOT REMOVE!!!
    private static contextType = GlobalContext;

    public componentWillMount() {
        console.log("CONTEXT IS")
        console.log(this.context)
        this.user = (this.context as SharedContext).UserService.getUserInfo();
    }

    private handleMyGroupClicked = () => {
        const usersGroupId = "groups/" + this.user.groupId;
        this.props.history.push(usersGroupId);
      };

    public render() {

        let myGroupButton;
        if (this.user.groupId !== "") {
            myGroupButton = <Button type={"primary"} size={"large"} onClick={this.handleMyGroupClicked}> My group! </Button >
        }


        return (
            <header className="App-header">
                <GlobalContext.Consumer>
                    {(context: SharedContext) => (
                        <div id="wrap">
                            {/* <div>
                <div id="wrap">
                  <h1>
                    <Link to="/">F-LAN Matchmaking</Link>
                  </h1>
                </div>
                <div id="wrap">
                  <div id="left"><p><b>UserID:</b> {context.user.userId} - </p></div>
                  <div id="left"><p><b>DiscordID:</b> {context.user.discordId} - </p></div>
                  <div id="left"><p><b>Name:</b> {context.user.name}</p></div>
                </div>
              </div>
              <div id="menu-item"><Button ghost>GROUPS</Button></div> */}
                            <div id="item">
                                <h1><Link to="/">F-LAN Matchmaking</Link></h1>
                                <div id="wrap">
                                    <div id="item"><p><b>UserID:</b> {context.UserService.getUserInfo().userId} - </p></div>
                                    <div id="item"><p><b>DiscordID:</b> {context.UserService.getUserInfo().discordId} - </p></div>
                                    <div id="item"><p><b>Name:</b> {context.UserService.getUserInfo().name}</p></div>
                                </div>
                            </div>
                            <div id="menuitem">
                                <div id="wrap">


                                    <div id="button">
                                        {myGroupButton}
                                    </div>


                                    <div id="button">
                                        <Button.Group size={"large"}>
                                            <Button ghost><Link to={"/"}>Home</Link></Button>
                                            <Button ghost><Link to={"/groups"}>Groups</Link></Button>
                                            <Button ghost><Link to={"/create"}>Create a group</Link></Button>
                                        </Button.Group>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </GlobalContext.Consumer>
            </header>
        );
    }
}

export default withRouter(MenuBar);