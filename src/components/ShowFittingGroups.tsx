import * as React from "react";
import axios from 'axios';
import { GroupResponse, UserService, GroupService } from "../services/interfaces";
import { Li, Div, Ul } from '../UI'
import MergeGroups from './MergeGroups';
import { RouteComponentProps, withRouter } from 'react-router';
// import MergeGroups from '../components/MergeGroups'


interface GroupProps {
    group: GroupResponse,
    onMergeHandler : (group : GroupResponse) => void,
    // groupService : GroupService,
}

export class ShowFittingGroups extends React.Component<RouteComponentProps & GroupProps, { groups: GroupResponse[]}> {

    constructor(props: any) {
        super(props)
        this.state = { groups: [] };
    }

    public async componentDidMount() {
        try {
            const response = await axios.get(`fitting/${this.props.group.maxSize - this.props.group.users.length}/${this.props.group.game}`)
            const data = response.data;
            this.setState({ groups: data });
        } catch (error) {
            console.error(error)
        }
    }

    public render() {
        return (
            <Div>
                <Ul>
                    <h1>group</h1>
                    {this.state.groups.map(group => <Li key={group._id}>{group.name} -- <MergeGroups fromGroupid={this.props.group._id} toGroupid={group._id} onMergeHandler={this.props.onMergeHandler}/> </Li>)}
                </Ul>
            </Div>
        )
    }
}
//  <MergeGroups fromGroupid = {this.props.userService.getUserInfo().groupId} toGroupid = {group._id}/>

export default withRouter(ShowFittingGroups);