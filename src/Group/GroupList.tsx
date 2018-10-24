import * as React from 'react';
import GroupResponse from './GroupResponse';

interface IMember{
    id: number,
    name: string
}

export default class GroupList extends React.Component<{group : GroupResponse}, GroupResponse> {
  private members : IMember[];

  public constructor(props: {group : GroupResponse}){
    super(props)

    const members: IMember[] = [
      {id: 1, name: "Teitur"},
      {id: 2, name: "Peter"},
      {id: 3, name: "Casper"},
      {id: 4, name: "Dennis"},
      {id: 5, name: "Christian"},
      {id: 6, name: "Lau"}
    ]
    this.members = members;
  }


    public render() {
      return(
        <div>
        <h1>{this.props.group.name}</h1>
        <ul>
          {this.members.map((member)=> {
            return <li  key={member.id}>
                  {member.name}</li>
          })}
        </ul>
        </div> 
      );
  }
}
