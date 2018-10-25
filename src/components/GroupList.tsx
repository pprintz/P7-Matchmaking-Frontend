import * as React from 'react';
import styled from 'styled-components';
import IGroup from 'src/models/IGroup';


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

export default class GroupList extends React.Component<{ group: IGroup }> {

  public constructor(props: { group: IGroup }) {
    super(props)
  }

  public render() {
    return (
      <Wrapper>
        <h1>{this.props.group.name}</h1>
        <UnList>
          {this.props.group.users.map((member) =>  {
            return  <LItem key={member}>
              {member}</LItem>
          })}
          {
          Array.from({length: (this.props.group.maxSize - this.props.group.users.length)},() =><LItem>Open</LItem> )
          
          }
        </UnList>
      </Wrapper>
    );
  }
}
