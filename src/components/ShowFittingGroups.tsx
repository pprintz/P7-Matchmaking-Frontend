import * as React from "react";
import axios from 'axios';
import { GroupResponse, UserService, GroupService } from "../services/interfaces";
import { Li, Div, Ul } from '../UI'
import MergeGroups from './MergeGroups';
import { RouteComponentProps, withRouter, Route } from 'react-router';
import { Group } from 'antd/lib/radio';
// import MergeGroups from '../components/MergeGroups'


interface GroupProps {
    group: GroupResponse,
    //groupService : GroupService,
}

export default class ShowFittingGroups extends React.Component<RouteComponentProps & GroupProps, { groups: GroupResponse[]}> {

    constructor(props: any) {
        super(props)
        this.state = { groups: [] };
    }

    public async componentDidMount() {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + `/api/groups/fitting/${this.props.group.maxSize - this.props.group.users.length}/${this.props.group.game}`);
            const data = response.data;
            this.setState({ groups: data });
            this.setState({groups: this.state.groups.filter(group => this.props.group._id !== group._id)});
        } catch (error) {
            console.error(error)
        }
    }
    
    public render() {
        return (
            <Div>
                <Ul>
                    <h1>Group that are posible too join as a group</h1>
                    {this.state.groups.map(group => <Li key={group._id}>{group.name} <Route render={RouteComponentProps => (
                        <MergeGroups 
                        fromGroupid={this.props.group._id} 
                        toGroupid={group._id} 
                        {...RouteComponentProps}
                        />
                    )}/> </Li>)}
                </Ul>
            </Div>
        )
    }
}

