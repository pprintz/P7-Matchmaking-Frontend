import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { GroupResponse } from "../services/interfaces";
import axios from "axios";
import InviteUrlComponent from "./InviteUrlComponent";
import GroupList from "./GroupList";

export class GroupPageContainer extends React.Component<
    RouteComponentProps<{
        group_id: string;
        invite_id: string;
    }>,
    GroupResponse
    > {
    // Each time the component is loaded we check the backend for a group with grouo_id == :group_id
    public async componentDidMount() {
        let result;
        try {
            console.log("TRYING TO GET GROUP WITH ID " + this.props.match.params.group_id);
            result = await axios.get("/groups/" + this.props.match.params.group_id);
            this.setState(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    public render() {
        if (this.state === null) {
            return (
                <div>
                    <h3>Loading..</h3>
                </div>
            );
        }
        return (<div>
            <GroupList group={this.state} />
            <InviteUrlComponent invite_id={this.state.invite_id} />
        </div>)
    }
}

export default withRouter(GroupPageContainer);