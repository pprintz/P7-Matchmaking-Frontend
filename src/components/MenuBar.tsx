import * as React from "react";
import { Link } from "react-router-dom";
import { GlobalContext, SharedContext } from "../models/SharedContext";

export class MenuBar extends React.Component {
    public render() {
        return (
            <header className="App-header">
                <h1>
                    <Link to="/">F-LAN Matchmaking</Link>
                </h1>
                <GlobalContext.Consumer>
                    {(context: SharedContext) => (
                        <div>
                            <p>UserID: {context.User.userId}</p>
                            <p>DiscordID: {context.User.discordId}</p>
                            <p>Name: {context.User.name}</p>

                        </div>
                    )}
                </GlobalContext.Consumer>
            </header>
        );
    }
}

export default MenuBar;