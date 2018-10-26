import * as React from 'react'
import Axios from 'axios';
import { notification, Icon, Button, Card } from 'antd';
// import { UserService } from './services/interfaces';

export class JoinGroup extends React.Component<any, any> {
  
  constructor(props: any) {
    super(props);
    this.state = { group: { name: "", users: [] } };
  }

  public handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const groupId = this.props.match.params.group_id;
      await Axios.post("/groups/join", { group_id: groupId, 
                                   user_id: this.props.userServiceCookies.getUserInfo().userId 
                                 });
      this.props.history.push(`/groups/${groupId}`);
      // TODO: Save group_id in cookie
    } catch (error) {
      console.error(error);
    }
  };

  public openNotification = () => {
    notification.open({
      message: 'Success!',
      description: 'You have joined the group!',
      icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
    });
  };

  public async componentDidMount() {
    const group_id = this.props.match.params.group_id
    const response = await Axios.get(`/groups/${group_id}`)
    const groupToJoin = response.data.data;
    this.setState({group: groupToJoin});
    console.log("Mounted: Params:", this.props.match.params);
  }

  public render() {
    return (
      <Card style={{maxWidth: 500, margin: '0 auto'}}>
        <p>Group name: {this.state.group.name}</p>
        <p>Game: {this.state.group.game}</p>
        <p>Members: {this.state.group.users.length}/{this.state.group.maxSize}</p>
        <Button type="primary" onClick={this.handleClick}>
          Join Group
        </Button>
      </Card>
    )
  }
}

export default JoinGroup
