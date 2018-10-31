import * as React from 'react';
// import GroupsResponse from './GroupsResponse';
import Response from '../Response/Response';
import Axios, { AxiosResponse } from 'axios';
import GroupCardComponent from './GroupCardComponent'
import { Row, Col } from 'antd'
import {GroupResponse} from "../services/interfaces";


export default class GroupPageContainer extends React.Component<any, Response<GroupResponse[]>>{

    constructor(props: any) {
        super(props)
        this.state = { data: [], statuscode: 0, error: "" };
    }

    public componentDidMount() {
        Axios.get('/groups')
            .then((res: AxiosResponse) => {
                this.setState({ data: res.data});
            });
    }

    public render() {
        if (this.state === null) {
            return (<p>Loading</p>);
        }
        else if (this.state.statuscode === 0) {
            const sorted = this.state.data.sort((x, y): any => {
                if (x.maxSize - x.users.length < y.maxSize - y.users.length) {
                    return -1
                }
                if (x.maxSize - x.users.length > y.maxSize - y.users.length) {
                    return 1
                }
                return 0

            });
            const groups = sorted.map((element) => {
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
            return (<p>Ooops, no groups!</p>)
        }
    }
}