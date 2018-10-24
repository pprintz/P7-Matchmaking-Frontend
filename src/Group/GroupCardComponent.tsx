import * as React from 'react';
// import GroupsResponse from './GroupsResponse';
import Response from '../Response/Response';
import IGroupResponse from './GroupResponse';
import { Button, Card } from 'antd'

interface IWhatever {
    group: IGroupResponse
}

export default class GroupCardComponent extends React.Component<IWhatever, Response<IGroupResponse[]>>{
    public render() {
        return (
            // <div>
            //     <p>{this.props.group.name}</p>
            //     <p>{this.props.group.maxSize}</p>
            //     <Button type='primary' icon="usergroup-add" onClick={this.joinGroup}>Join</Button>
            // </div>
            <div style={{ paddingTop: 20 }}>
                <Card
                    title={'Group name: ' + this.props.group.name}
                    extra={<Button type='primary' icon="usergroup-add" onClick={this.joinGroup}>Join</Button>}
                    style={{ width: '100%' }}>
                    <p><b>Users in this group:</b></p>
                    {this.props.group.users !== undefined ? (
                        <ul>
                            {this.props.group.users.map((userid: number) => <li key={userid}>{userid}</li>)}
                        </ul>
                    ) : (<li>No users in this group!</li>)}

                </Card>
            </div>

        )
    }



    private joinGroup() {
        return alert('Du trykkede på mig!')
    }
}