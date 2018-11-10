import * as React from 'react';
import {GroupResponse} from "../services/interfaces";
import { Button, Li, OpenLi, Div, Ul } from '../UI'
import LeaveGroup from './LeaveGroup';
import { UserServiceCookies } from 'src/services/userServiceCookies';
import { GroupServiceApi } from 'src/services/groupServiceApi';
import {Route} from "react-router-dom";
import * as antd from "antd";
import { User } from 'src/models/User';
import RemoveGroupComponent from './RemoveGroupComponent';

interface Props {
  userService: UserServiceCookies,
  groupService: GroupServiceApi,
  group: GroupResponse
}

export default class GroupList extends React.Component<Props> {

  public constructor(props : Props) {
    super(props);
  }

  public renderCompleteButton() {
    // Check if the group is not full => return
    if(this.props.group.maxSize > this.props.group.users.length){
      return (<div />);
    }

    // Else return the button, because the group is full.
    return (
      <div>
        <antd.Button block={true} type="primary" style={{height: 80}} color="green">
          <a target="_blank" href="http://www.google.dk/">Complete</a>
        </antd.Button>
      </div>
    );
  }

  public renderDeleteButton() {
    const user : User = this.props.userService.getUserInfo(); 

    if(user.ownerGroupId === this.props.group._id){
      return (
        <Route render={routeComponentProps => (
          <RemoveGroupComponent userService={this.props.userService} 
                                groupService={this.props.groupService}
                                {...routeComponentProps}                      
          />
        )} />
      )
    }
    
    return (<div />);
  }

  public render() {
    return (
      <Div>
        <h1>{this.props.group.name}</h1>
        <h3>{this.props.group.game}</h3>
        {this.renderCompleteButton()}
        <Ul>
          {this.props.group.users.map((member) =>  {
            return  <Li key={member}>
              {member}</Li>
          })}
          {
            Array.from({length: (this.props.group.maxSize - this.props.group.users.length)},(v: {}, k: number) =><OpenLi key={k}>Open<Button>Invite player</Button></OpenLi> )
          }
        </Ul>
        {this.renderDeleteButton()}
      </Div>
    );
  }
}
