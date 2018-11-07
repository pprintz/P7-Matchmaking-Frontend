import * as React from 'react';
// import GroupsResponse from './GroupsResponse';
import Response from '../Response/Response';
import { Button, Card } from 'antd'
import WSGroupService from 'src/services/WSGroupsService';
import { GroupResponse } from 'src/services/interfaces';

export default class GroupCardComponent extends React.Component<{ 
        group: GroupResponse, 
        WSGroupService : WSGroupService,
        onGroupChangeCallback : (group : GroupResponse) => void
    }, Response<GroupResponse>>{

    constructor(props: { group: GroupResponse, WSGroupService : WSGroupService, onGroupChangeCallback : (group : GroupResponse) => void }) {
        super(props);
        this.props.WSGroupService.registerCallback('groupChanged', this.onGroupChanged);
        this.state = { data: props.group, error: "", statuscode: 0 };
        console.log("Name: " + props.group.name + " -- State: " + JSON.stringify(this.state) + " -- Props (group): " + JSON.stringify(this.props.group));
    }

    public render() {
        const flag = this.state.data.maxSize > this.state.data.users.length ? false : true
        const availableSlots = this.state.data.maxSize - this.state.data.users.length;
        return (
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                <Card
                    title={'Group name: ' + this.state.data.name}
                    extra={<Button disabled={flag} type='primary' icon="usergroup-add" onClick={this.joinGroup.bind(this)}>Join</Button>}
                    style={{ width: '100%' }}>
                    <p>Available slots: {availableSlots}</p>
                    <p><b>Users in this group:</b></p>
                    {this.state.data.users.length !== 0 ? (
                        <ul>
                            {this.state.data.users.map((userid: string) => <li key={userid}>{userid}</li>)}
                        </ul>
                    ) : (<li>No users in this group!</li>)}
                </Card>
            </div>
        );
    }

    private onGroupChanged = (group : GroupResponse) =>{
        // Each time a group is changed, this method is invoked *on all GroupCardComponents*
        // As such, we need to check the ID of the group being changed and only update the state
        // if the group being changed is *this* group
        if(group._id !== this.state.data._id){
            return;
        }

        // handle the change
        this.setState({data : group});
        
        // Inform the parent of changes
        this.props.onGroupChangeCallback(group);
    }

    private async joinGroup() {
        await this.props.WSGroupService.joinGroup(this.state.data._id, "5bdc42e94d5a1c10426582fd", this.onGroupChanged);
        // return;

        // console.log("IN JOIN GROUP!!!!!!");
        // const userID = "5bd4d2b69d946e75d10ff1be";// get this info from coolie
        // const gropupID = this.state.data._id;

        // const result: AxiosResponse<IGroup> =
        //     await Axios.post('http://localhost:3000/groups/join',
        //         { "user_id": userID, "group_id": gropupID } );
        
        // if (result === null || result.data === null) {
        //     alert("Not good: " + JSON.stringify(result.data));
        //     return;
        // }
        // console.log("RESULT: " + JSON.stringify(result));
        // this.setState({data : result.data});
        // console.log("State has been set: " + JSON.stringify(this.state));
        
    }
}