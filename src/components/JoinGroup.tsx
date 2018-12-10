import * as React from 'react'
import { notification, Icon, Button, Card } from 'antd';
import { User } from 'src/models/User';
import { UserServiceCookies } from 'src/services/userServiceCookies';
import { GlobalContext, SharedContext } from 'src/models/SharedContext';
import { RouteComponentProps, withRouter } from 'react-router';
import { string } from 'prop-types';
import { toast } from 'react-toastify';
import { GroupServiceApi } from '../services/groupServiceApi';
import Axios from 'axios';
import { UserService } from 'src/services/interfaces';

interface Props  {
    groupService: GroupServiceApi
}

export class JoinGroup extends React.Component<RouteComponentProps<{ group_id: string, invite_id: string }>, any> {
    // THIS VARIABLE *IS* IN FACT USED! DO NOT REMOVE!!!
    private static contextType = GlobalContext;
    private UserService: UserService;
    constructor(props) {
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

    public async componentWillMount() {
        this.UserService = (this.context as SharedContext).UserService;
        await this.getAndSetGroup();
    }

    public render() {
        return (
            <Card style={{ maxWidth: 500, margin: '0 auto' }}>
                <p>Group name: {this.state.group.name}</p>
                <p>Game: {this.state.group.game}</p>
                <p>Members: {this.state.group.users.length}/{this.state.group.maxSize}</p>
                <Button type="primary" onClick={this.joinGroup}>
                    Join Group
        </Button>
            </Card>
        )
    }

    private async getAndSetGroup() {
        const group_id = this.props.match.params.group_id;
        try {
            const response = await Axios.get(`/groups/${group_id}`);
            const groupToJoin = response.data;

            this.UserService.updateGroupIdUserInfo(groupToJoin, this.context as SharedContext);

            this.setState({ group: groupToJoin });
        }
        catch (error) {
            console.error("ERROR:", error);
        }
    }

    private joinGroup = async (event: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const groupId = this.props.match.params.group_id;
            await Axios.post(process.env.REACT_APP_API_URL + "/api/groups/join", {
                group_id: groupId,
                user_id: this.UserService.getUserInfo().userId
            });

            this.props.history.push(`/groups/${groupId}`);
            this.UserService.updateGroupIdUserInfo(groupId, this.context as SharedContext);
        } catch (error) {
            toast.error("Sorry, you can't join this group. Leave your current group");
        }
    };
}

export default withRouter(JoinGroup);
