import * as React from 'react';
import {GroupResponse} from "../services/interfaces";
import { Button, Li, OpenLi, Div, Ul } from '../UI'


export default class GroupList extends React.Component<{ group: GroupResponse }> {

  public constructor(props: { group: GroupResponse }) {
    super(props)
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
          Array.from({length: (this.props.group.maxSize - this.props.group.users.length)},() =><OpenLi>Open<Button>Invite player</Button></OpenLi> )
          
          }
        </Ul>
      </Div>
    );
  }
}
