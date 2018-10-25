import * as React from 'react';
import GroupResponse from './GroupResponse';
import styled from 'styled-components'

interface IMember{
    id: number,
    name: string
}

const Wrapper = styled.div`
background-color: bisque;
margin: 20px;
`

const UnList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  background-color: blueviolet;
`
const LItem = styled.li`
margin: 10px;
flex-basis: 5%;
background-color: orange;
`

export default class GroupList extends React.Component<{group : GroupResponse}, GroupResponse> {
  private members : IMember[];

  public constructor(props: {group : GroupResponse}){
    super(props)

    const members: IMember[] = [
      {id: 1, name: "Teitur"},
      {id: 2, name: "Peter"},
      {id: 3, name: "Casper"},
      {id: 4, name: "Dennis"},
      {id: 5, name: "Lau"}
    ]
    this.members = members;
  }


    public render() {
      return(
        <Wrapper>
        <h1>{this.props.group.name}</h1>
        <UnList>
          {this.members.map((member)=> {
            return <LItem key={member.id}>
                  {member.name}</LItem>
          })}
        </UnList>
        </Wrapper> 
      );
  }
}
