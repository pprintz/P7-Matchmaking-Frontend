import * as React from 'react';
import {GroupResponse} from "../services/interfaces";
import { Button, Li, OpenLi, Div, Ul } from '../UI'
import LeaveGroup from './LeaveGroup';
import { UserServiceCookies } from 'src/services/userServiceCookies';
import { GroupServiceApi } from 'src/services/groupServiceApi';


interface Props {
  userService: UserServiceCookies,
  groupService: GroupServiceApi,
  group: GroupResponse
}

export default class GroupList extends React.Component<Props> {

  public constructor(props : Props) {
    super(props);
  }

  public render() {
    return (
      <Div>
        <h1>{this.props.group.name}</h1>
        <Ul>
          {this.props.group.users.map((member) =>  {
            return  <Li key={member}>
              {member}</Li>
          })}
          {
            Array.from({length: (this.props.group.maxSize - this.props.group.users.length)},(v: {}, k: number) =><OpenLi key={k}>Open<Button>Invite player</Button></OpenLi> )
          }
        </Ul>
      </Div>
      

    );
  }
}
