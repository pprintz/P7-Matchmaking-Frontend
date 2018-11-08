import * as React from 'react';
import {GroupService, GroupResponse} from "../services/interfaces";
import { LeaveBtn } from '../UI'
import { UserServiceCookies } from 'src/services/userServiceCookies';
import { RouteComponentProps } from 'react-router';


// Interface for States
// The groupId is saved to state
interface GroupStates {
    groupId: string,
    message: string
}

interface GroupProps {
    groupService: GroupService,
    userService: UserServiceCookies,
}

class LeaveGroup extends React.Component<RouteComponentProps & GroupProps, GroupStates> {
    // This is the Axios link to the backend, for leave group functionality   and userService  
    private groupId : string;
    private userId : string;

    constructor(props : GroupProps & RouteComponentProps){
        super(props);

        // Set properties based on cookies
        this.groupId = this.props.userService.getUserInfo().groupId;
        this.userId = this.props.userService.getUserInfo().userId;

        // Initial State
        this.state = {groupId: this.groupId,
                      message: ""
                     };

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    // When the leave button is clicked
    public handleOnClick = async () => {
        // Make the leave group request
        try{
            const request : Promise<GroupResponse | boolean> = this.props.groupService.leaveGroup(this.state.groupId, this.userId);

            if(await request === false){
                this.setState({message: "You are not in a group"});
                
                
            }else{  
                // Update the cookie
                this.props.userService.updateGroupIdUserInfo("");

                this.setState({message: "Succesfully left the group"});

                console.log("Redirect!");
                this.props.history.push("/");
            }
        }catch(error){
            this.setState({message: "Group was not changed"})
        }
    }

    // Simple Rendering, self explanatory
    public render() {
        return (
            <div className="LeaveGroupComponent">
                <LeaveBtn onClick={this.handleOnClick}>Leave group</LeaveBtn>
                <p>{this.state.message}</p>
            </div>
        );
  }
}

export default LeaveGroup;
