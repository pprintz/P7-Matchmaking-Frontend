import * as React from 'react'
import { Link } from 'react-router-dom';
import { UserServiceCookies } from 'src/services/userServiceCookies';

export class MenuBar extends React.Component<{ userServiceCookies: UserServiceCookies}> {
  public render() {
    return (
        <header className="App-header">
        <h1>Awesome Matchmaking</h1>
        <ul>
          <li><Link to="/">Create Group / Home</Link></li>
          <li><Link to="/leave">Leave</Link></li>
        </ul>
        <p>Hello, {this.props.userServiceCookies.getUserInfo().userId}!</p>
      </header>
    )
  }
}

export default MenuBar
