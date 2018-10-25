import * as React from 'react';

import {UserService} from "../../services/users/userService";

import {LeaveGroupService} from "../../services/groups/groupService"

// Interface for States
// The groupId is saved to state
interface IGroupStates {
    groupId: string,
    message: string
}

class LeaveGroup extends React.Component<any, IGroupStates> {
    // This is the Axios link to the backend, for leave group functionality   and userService  
    private leaveGroupService: LeaveGroupService;
    private userService : UserService;

    private groupId : string;
    private userId : string;

    constructor(props : any){
        super(props);

        // Get access to cookie functions
        this.userService = new UserService();

        // Set properties based on cookies
        this.groupId = this.userService.getUserInfo().groupId;
        this.userId = this.userService.getUserInfo().userId;

        this.leaveGroupService = new LeaveGroupService(this.groupId, this.userId);
        
        // Initial State
        this.state = {groupId: this.groupId,
                      message: ""
                     };

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    // When the leave button is clicked
    public handleOnClick() : void {
        // Make the leave group request
        const request : Promise<boolean> = this.leaveGroupService.leaveGroup();
        request.then((response) => {
            // Update state, if the request was successfull
            if(response){
                // This is returned if the group is left successfully!
                // We should update the state of the "userConfig.xxxx" file here!
                this.setState({groupId: ""});

                // Update the cookie
                this.userService.setUserInfo(this.userId, "");
                this.setState({message: "Succesfully left the group"});
            }else{
                this.setState({groupId: "Error"});  
                this.setState({message: "You are not in a group"});
            }
        });
    }

    // Simple Rendering, self explanatory
    public render() {
        return (
            <div className="LeaveGroupComponent">
                <button onClick={this.handleOnClick}>Leave</button>
                <p>{this.state.message}</p>
            </div>
        );
  }
}

export default LeaveGroup;
