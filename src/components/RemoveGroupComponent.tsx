import * as React from 'react';
import {GroupService, PersistedGroup, Group, UserService} from "../services/interfaces";
import { LeaveBtn } from '../UI'
import { Button } from "antd";
import { UserServiceCookies } from 'src/services/userServiceCookies';
import { RouteComponentProps } from 'react-router';
import { User } from 'src/models/User';



// Interface for States
// The groupId is saved to state
interface GroupProps {
    groupService: GroupService,
    userService: UserService,
}

class RemoveGroupComponent extends React.Component<RouteComponentProps & GroupProps> {

    constructor(props : GroupProps & RouteComponentProps){
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    // When the Remove button is clicked
    public handleOnClick = async () => {
        // Make the leave group request
        const user : User = this.props.userService.getUserInfo();

        try{
            if(user.ownerGroupId === ""){
                console.log("No owner groups!");
                throw new Error("User doesn't own any groups!");
            }

            const request : Group | boolean = await this.props.groupService.deleteGroup(user.ownerGroupId);

            if(request === false){
                console.log(request);
                this.setState({message: "Group was not deleted"});
            }else{  
                // Update the cookie
                this.props.userService.setUserOwnerGroup("");

                this.setState({message: "Succesfully deleted the group"});
                console.log("All good");
                this.props.history.push("/");
            }
        }catch(error){
            console.log("catch error");
            this.setState({message: "Group was not deleted"})
        }
    }

    // Simple Rendering, self explanatory
    public render() {
        return (
            <div className="RemoveGroup">
                <Button type="danger" onClick={this.handleOnClick}>Remove group</Button>
            </div>
        );
  }
}

export default RemoveGroupComponent;
