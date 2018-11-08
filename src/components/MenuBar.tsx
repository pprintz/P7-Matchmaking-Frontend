import * as React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "src/App";
import { Button } from 'antd';
import { UserService } from '../services/interfaces'

interface GroupProps {
  userService: UserService,
}

export class MenuBar extends React.Component<GroupProps>  {
  public render() {

    const user = this.props.userService.getUserInfo()
    let myGroupButton;
    let disVal = false;

    const usersGroupId = "groups/" + user.groupId;
    console.log("##############################" + user.groupId.length)
    if (user.groupId !== "") {

      myGroupButton = <Button type={"primary"} size={"large"}><Link to={usersGroupId}> My group!</Link></Button >
    }


    return (
      <header className="App-header">
        <UserContext.Consumer>
          {context => (
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
                  <div id="item"><p><b>UserID:</b> {context.user.userId} - </p></div>
                  <div id="item"><p><b>DiscordID:</b> {context.user.discordId} - </p></div>
                  <div id="item"><p><b>Name:</b> {context.user.name}</p></div>
                </div>
              </div>
              <div id="menuitem">
                <div id="wrap">


                  <div id="button">
                    {myGroupButton}
                  </div>


                  <div id="button">
                    <Button.Group size={"large"}>
                      <Button ghost disabled={disVal}><Link to={"/"}>Home</Link></Button>
                      <Button ghost disabled={disVal}><Link to={"/groups"}>Groups</Link></Button>
                      <Button ghost disabled={disVal}><Link to={"/create"}>Create a group</Link></Button>
                    </Button.Group>
                  </div>
                </div>
              </div>
            </div>
          )}
        </UserContext.Consumer>
      </header>
    );
  }
}

export default MenuBar;
