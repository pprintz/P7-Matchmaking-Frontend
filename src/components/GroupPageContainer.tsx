import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { GroupResponse } from "../services/interfaces";
import Response from '../Response/Response';
import axios from 'axios';
import InviteUrlComponent from './InviteUrlComponent';
import GroupList from './GroupList';
import ShowFittingGroups from './ShowFittingGroups';


// IMatchParams and IProps are used for Route/Routing
// in order to encapsulate the match data we get from routing groups/:group_id
// IMatchParams is a RouteMatch type wrapper (populated in App.tsx when routing groups/:group_id)
// interface IMatchParams { group_id : string };
// interface IProps extends RouteComponentProps<IMatchParams>{}
/*
interface GroupStates {
  groupId: string,
}
*/



export class GroupPageContainer extends React.Component<
    RouteComponentProps & {
        group_id: string;
        invite_id: string;
    } /*RouteComponentProps<IMatchParams>*/ /*IProps*/,
    GroupResponse
    > {
    // Each time the component is loaded we check the backend for a group with grouo_id == :group_id
    public async componentDidMount() {
        let result;
        try {
            result = await axios.get("/groups/" + (this.props.match.params as { group_id: string }).group_id);//this.props.match.params.group_id);
            this.setState(result.data);

        } catch (error) {
            console.error(error);
        }
    }

    private forceRender = (group: GroupResponse) => {
        if (group && group !== undefined && group._id !== this.state._id) {
            this.setState(group);
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
            <ShowFittingGroups group={this.state} onMergeHandler={this.forceRender} />
        </div>)
    }
}

export default withRouter(GroupPageContainer);