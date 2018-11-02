import * as React from "react";
import { Link } from "react-router-dom";
import { UserContext } from 'src/App';

export class MenuBar extends React.Component {
  public render() {
    return (
      <header className="App-header">
        <h1>
          <Link to="/">F-LAN Matchmaking</Link>
        </h1>
        <UserContext.Consumer>
          {context => 
          <p>UserID: {context.user.userId}</p>
          }
        </UserContext.Consumer>
        {/* <ul>
          <li>
            <Link to="/">Create Group / Home</Link>
          </li>
          <li>
            <Link to="/leave">Leave</Link>
          </li>
        </ul> */}
      </header>
    );
  }
}

export default MenuBar;
