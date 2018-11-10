import * as React from 'react';
import { LeaveBtn } from '../UI'
import { User } from 'src/models/User';
import { RouteComponentProps, withRouter } from 'react-router';
import { GlobalContext, SharedContext } from 'src/models/SharedContext';
import WSGroupsService from '../services/WSGroupsService';
import { UserServiceCookies } from 'src/services/userServiceCookies';
import { GroupService, GroupResponse } from "../services/interfaces";




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
    // This is the Axios link to the backend, for leave group functionality   and userService  
    private groupId: string;
    private userId: string;
    private WSGroupsService: WSGroupsService;
    private UserService: UserServiceCookies;
    // THIS VARIABLE *IS* IN FACT USED! DO NOT REMOVE!!!
    private static contextType = GlobalContext;

    constructor(props) {
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    public componentWillMount() {
        this.WSGroupsService = (this.context as SharedContext).WSGroupsService;
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
            await this.WSGroupsService.leaveGroup(this.state.groupId, this.userId, (error: boolean) => {
                // Update state, if the request was successfull
                if (!error) {
                    // This is returned if the group is left successfully!
                    // We should update the state of the "userConfig.xxxx" file here!
                    this.setState({ groupId: "" });

                    // Update the cookie




                    this.setState({ message: "Succesfully left the group" });
                } else {
                    this.setState({ groupId: "Error" });
                    this.setState({ message: "You are not in a group" });
                }
            });
        }
        catch (error) {
            this.setState({ message: "Group was not changed" })
        }
        const user = this.UserService.getUserInfo();
        user.groupId = "";
        this.UserService.setUserInfo(user);
    }

    // Simple Rendering, self explanatory
    public render() {
        return (
            <div className="LeaveGroupComponent">
                <LeaveBtn onClick={this.handleOnClick}>Leave group</LeaveBtn>
            </div>
        );
    }
}

export default withRouter(LeaveGroup);