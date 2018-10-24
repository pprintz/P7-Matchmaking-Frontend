import * as React from 'react';

interface IGroup{
    id: number,
    name: string,
    members: IMember[]
}

interface IMember{
    id: number,
    name: string
}

export default class GroupList extends React.Component<IGroup> {
  constructor(props: IGroup){
    super(props)

    let members: IMember[] = [
      {id: 1, name: "Teitur"},
      {id: 2, name: "Peter"},
      {id: 3, name: "Casper"},
      {id: 4, name: "Dennis"},
      {id: 5, name: "Christian"},
      {id: 6, name: "Lau"}
    ]
      
    let group: IGroup = {
      id: 1,
      name: "Peterogco",
      members: members} 
  }

    public render() {
      return(
        <ul>
          {this.props.members.map((member)=> {
            return <li  key={member.id}>
                  {member.name}></li>
          })}
        </ul> 
      );
  }
}
