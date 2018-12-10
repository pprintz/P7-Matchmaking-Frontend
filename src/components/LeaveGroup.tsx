import * as React from 'react';
import { LeaveBtn } from '../UI'
import { User } from 'src/models/User';
import { RouteComponentProps, withRouter } from 'react-router';
import { GlobalContext, SharedContext } from 'src/models/SharedContext';
import WSGroupService from '../services/WSGroupService';
import { UserServiceCookies } from 'src/services/userServiceCookies';
import { GroupService, PersistedGroup, Group, UserService, IWSGroupService, SocketResponse } from "../services/interfaces";
import { GroupServiceApi } from 'src/services/groupServiceApi';
import { toast } from 'react-toastify';
import { Button } from 'antd';




// Interface for States
// The groupId is saved to state
interface GroupStates {
    groupId: string,
    message: string
}


// interface GroupProps {
//     groupService: GroupService,
//     userService: UserService,
// }

class LeaveGroup extends React.Component<RouteComponentProps, GroupStates> {
    private static contextType = GlobalContext;
    private groupId: string;
    private userId: string;
    private WSGroupService: IWSGroupService;
    private UserService: UserService;
    // THIS VARIABLE *IS* IN FACT USED! DO NOT REMOVE!!!


    constructor(props: RouteComponentProps) {
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    public componentWillMount() {
        this.WSGroupService = (this.context as SharedContext).WSGroupService;
        this.UserService = (this.context as SharedContext).UserService;
        // Set properties based on cookies
        this.groupId = this.UserService.getUserInfo().groupId;
        this.userId = this.UserService.getUserInfo().userId;

        // Initial State
        this.state = {
            groupId: this.groupId,
            message: ""
        };
    }

    // When the leave button is clicked
    public handleOnClick = async () => {
        try {
            // Make the leave group request
            await this.WSGroupService.leaveGroup(this.state.groupId, this.userId, this.onGroupLeftCallback);
        }
        catch (error) {
            toast.error("Cannot establish connection");
        }
    }

    public render() {
        return (
            <div className="LeaveGroupComponent">
                <Button onClick={this.handleOnClick}>Leave group</Button>
            </div>
        );
    }

    private onGroupLeftCallback = async (res: SocketResponse<void>) => {
        // Update state, if the request was successfull
        if (res.error) {
            toast.error("Sorry, you cannot leave this group");
            return;
        }

        this.UserService.updateGroupIdUserInfo("", this.context);
        this.props.history.push("/");
    }

}

export default withRouter(LeaveGroup);