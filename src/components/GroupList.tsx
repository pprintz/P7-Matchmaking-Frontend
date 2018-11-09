import * as React from 'react';
import { GroupResponse } from "../services/interfaces";
import { Button, Li, OpenLi, Div, Ul } from '../UI'
import { Switch } from "antd";
import WSGroupsService from '../services/WSGroupsService';
import LeaveGroup from './LeaveGroup';
import { GlobalContext, SharedContext } from 'src/models/SharedContext';
import { RouteComponentProps, withRouter } from 'react-router';
import { UserServiceCookies } from 'src/services/userServiceCookies';
import NotAllowedHere from '../components/NotAllowedHere';

export class GroupList extends React.Component<
  RouteComponentProps & { group: GroupResponse },
  GroupResponse> {
  // THIS VARIABLE *IS* IN FACT USED! DO NOT REMOVE!!!
  private static contextType = GlobalContext;
  private WSGroupsService: WSGroupsService;
  private UserServiceCookies: UserServiceCookies;

  public constructor(props: RouteComponentProps & { group: GroupResponse }) {
    super(props)
    this.state = this.props.group;
    console.log("INSIDE GROUPLIST")
    console.log(JSON.stringify(this.props.group));
  }

  public componentWillMount() {
    this.WSGroupsService = (this.context as SharedContext).WSGroupsService;
    this.WSGroupsService.registerEventHandler('groupChanged', this.onGroupChanged);
    this.UserServiceCookies = (this.context as SharedContext).UserService;
  }

  public render() {

    return (
      <Div>
        <h1>{this.state.name}</h1>
        <div id="wrapper">
          <div id="left">
            <p>Make group visible to others:</p>
          </div>
          <div id="right"><Switch onChange={this.updateVisibility} defaultChecked={this.state.visible} /></div>
        </div>
        <br />
        <Ul>
          {this.state.users.map((member) => {
            return <Li key={member}>
              {member}</Li>
          })}
          {
            Array.from({ length: (this.state.maxSize - this.state.users.length) }, () => <OpenLi>Open<Button>Invite player</Button></OpenLi>)

          }
        </Ul>
        <LeaveGroup />
      </Div>
    );
  }
  private updateVisibility = async () => {
    await this.WSGroupsService.updateVisibility(this.state, this.onVisibilityChanged)
  }

  private onVisibilityChanged = (group: GroupResponse) => {
    this.setState(group);
  }

  private onGroupChanged = (response: { group: GroupResponse, caller: string }) => {
    this.setState(response.group);
  }
}

export default withRouter(GroupList);
