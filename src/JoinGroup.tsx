import * as React from 'react'
import Axios from 'axios';
import { notification, Icon } from 'antd';
// import { UserService } from './services/interfaces';

export class JoinGroup extends React.Component<any> {
  
  constructor(props: any) {
    super(props);
  }

  public handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const groupId = this.props.match.params.group_id;
      Axios.post("/groups/join", { group_id: groupId, 
                                   user_id: this.props.userServiceCookies.getUserInfo().userId 
                                 });
      this.openNotification();
      // TODO: Setup group_id in cookie
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

  public componentDidMount() {
    console.log("Mounted: Params:", this.props.match.params);
  }

  public render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          JOIN GROUP!
        </button>
      </div>
    )
  }
}

export default JoinGroup
