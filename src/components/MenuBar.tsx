import * as React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "src/App";

export class MenuBar extends React.Component {
  public render() {
    return (
      <header className="App-header">
        <h1>
          <Link to="/">F-LAN Matchmaking</Link>
        </h1>
        <UserContext.Consumer>
          {context => (
            <div>
              <p>UserID: {context.user.userId}</p>
              <p>DiscordID: {context.user.discordId}</p>
              <p>Name: {context.user.name}</p>
            </div>
          )}
        </UserContext.Consumer>
      </header>
    );
  }
}

export default MenuBar;
