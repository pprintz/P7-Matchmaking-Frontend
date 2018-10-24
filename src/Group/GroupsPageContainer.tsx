import * as React from 'react';
// import GroupsResponse from './GroupsResponse';
import Response from '../Response/Response';
import IGroupResponse from './GroupResponse';
import Axios, { AxiosResponse } from 'axios';
import GroupCardComponent from './GroupCardComponent'
import { Row, Col } from 'antd'


export default class GroupPageContainer extends React.Component<any, Response<IGroupResponse[]>>{

    public componentDidMount() {

        Axios.get('http://localhost:3000/groups')
            .then((res: AxiosResponse) => {
                this.setState(res.data);
            });
    }

    public render() {
        if (this.state === null) {
            return (<p>Loading</p>)
        }
        else if (this.state.statuscode === 0) {
            const groups = this.state.data.map((element) => {
                return (<GroupCardComponent key={element._id} group={element} />)
            })
            return (
                <div>
                    <Row>
                        <Col span={8} />
                        <Col span={8}> {groups} </Col>
                        <Col span={8} />
                    </Row>
                </div>
            )
        }
        else {
            return (<p>Ooops, something went wrong!</p>)
        }
    }
}