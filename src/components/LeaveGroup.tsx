import * as React from 'react';
import { UserService, GroupService } from 'src/services/interfaces';

// Interface for States
// The groupId is saved to state
interface GroupStates {
    groupId: string,
    message: string
}

interface GroupProps {
    groupService: GroupService,
    userService: UserService,
}

class LeaveGroup extends React.Component<GroupProps, GroupStates> {
    // This is the Axios link to the backend, for leave group functionality   and userService  
    private groupId : string;
    private userId : string;

    constructor(props : GroupProps){
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
    public handleOnClick() : void {
        // Make the leave group request
        const request : Promise<boolean> = this.props.groupService.leaveGroup(this.state.groupId, this.userId);
        request.then((response) => {
            // Update state, if the request was successfull
            if(response){
                // This is returned if the group is left successfully!
                // We should update the state of the "userConfig.xxxx" file here!
                this.setState({groupId: ""});

                // Update the cookie
                this.props.userService.setUserInfo(this.userId, "");
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
