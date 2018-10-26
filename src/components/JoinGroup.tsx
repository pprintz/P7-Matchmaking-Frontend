import * as React from 'react'
import Axios from 'axios';
import { notification, Icon, Button, Card } from 'antd';
// import { UserService } from './services/interfaces';

export class JoinGroup extends React.Component<any, any> {
  
  constructor(props: any) {
    super(props);
    this.state = { group: { name: "", users: [] } };
  }

  public openNotification = () => {
    notification.open({
      message: 'Success!',
      description: 'You have joined the group!',
      icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
    });
  };

  public async componentDidMount() {
    await this.getAndSetGroup();
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

  private async getAndSetGroup() {
    const group_id = this.props.match.params.group_id;
    try {
      const response = await Axios.get(`/groups/${group_id}`);
      const groupToJoin = response.data.data;
      this.setState({ group: groupToJoin });
    }
    catch (error) {
      console.error("ERROR:", error);
    }
  }

  private handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const groupId = this.props.match.params.group_id;
      await Axios.post("/groups/join", { group_id: groupId, 
                                   user_id: this.props.userServiceCookies.getUserInfo().userId 
                                 });
      this.props.history.push(`/groups/${groupId}`);
      this.props.userServiceCookies.setGroupId(groupId);
    } catch (error) {
      console.error(error);
    }
  };
}

export default JoinGroup
