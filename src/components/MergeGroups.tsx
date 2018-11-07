import * as React from "react";
import axios from 'axios';
import { Button } from '../UI'
import { GroupService, UserService, GroupResponse } from "../services/interfaces";
import { __await } from 'tslib';

interface GroupStates {
    fromGroupid: string,
    toGroupid: string,
}

interface GroupProps {
    fromGroupid: string,
    toGroupid: string,

}

export default class MergeGroups extends React.Component<GroupProps, GroupStates> {
    private groupService;
    constructor(props: any){
        super(props);
        // this.fromGroupid = this.props.userService.getUserInfo().groupId;
        // this.toGroupid = this.props.userService.getUserInfo().groupId;
        this.groupService = this.groupService
        this.state = { fromGroupid: this.props.fromGroupid,
                       toGroupid: this.props.toGroupid,
                        };
    }

    private handleClick = () => {
       const request: Promise<GroupResponse> = this.groupService.mergeGroups(this.props.fromGroupid, this.props.toGroupid);
        request.then((response) => {

        //    this.props.history.push("/groups/" + response._id);
        });
    };
    public render() {
        return (
            <div>
                <ul>
                    <Button onClick={this.handleClick}> Join as a team </Button>
                </ul>
            </div>
        )
    }
}
