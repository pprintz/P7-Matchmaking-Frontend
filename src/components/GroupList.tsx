import * as React from 'react';
import { GroupResponse } from "../services/interfaces";
import { Button, Li, OpenLi, Div, Ul } from '../UI'
import { Switch } from "antd";
import WSGroupService from '../services/WSGroupsService';

export default class GroupList extends React.Component<{ group: GroupResponse }, GroupResponse> {
  private WSGroupService: WSGroupService;

  public constructor(props: { group: GroupResponse }) {
    super(props)
    this.WSGroupService = new WSGroupService();
    this.state = this.props.group;
    this.WSGroupService.registerEventHandler('groupChanged', this.onGroupChanged);
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
      </Div>
    );
  }
  private updateVisibility = async () => {
    await this.WSGroupService.updateVisibility(this.state, this.onVisibilityChanged)
  }

  private onVisibilityChanged = (group: GroupResponse) => {
    this.setState(group);
  }

  private onGroupChanged = (response: { group: GroupResponse, caller: string }) => {
    this.setState(response.group);
  }
}
