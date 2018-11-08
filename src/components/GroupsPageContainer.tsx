import * as React from 'react';
// import GroupsResponse from './GroupsResponse';
import Response from '../Response/Response';
import Axios, { AxiosResponse } from 'axios';
import GroupCardComponent from './GroupCardComponent'
import { Row, Col } from 'antd'
import WSGroupsService from '../services/WSGroupsService';
import {GroupResponse} from "../services/interfaces";
import { GlobalContext, SharedContext } from 'src/models/SharedContext';

export default class GroupPageContainer extends React.Component<any, Response<GroupResponse[]>>{
    private static contextType = GlobalContext;
    private WSGroupService : WSGroupsService;
    private sortFlag : boolean = false;

    constructor(props: any) {
        super(props)
        this.state = { data: [], statuscode: 0, error: "" };
    }

    public componentWillMount(){
        this.WSGroupService = (this.context as SharedContext).WSGroupsService;
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

            const groups = sorted.map((element : GroupResponse) => {
                return (<GroupCardComponent key={element._id} group={element} onGroupChangeCallback={this.onGroupChanged} />)
            });
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

    private onGroupChanged = (group : GroupResponse) : void =>{
        if(!this.sortFlag) {return};

        const oldData = this.state.data;
        const groupIndex = oldData.findIndex((value : GroupResponse, index : number, obj : GroupResponse[]) => {
            return value._id === group._id;
        });
        if(groupIndex === -1){
            oldData.push(group);
        }
        else {
            oldData[groupIndex] = group;
        }
        
        this.setState({data : oldData });
    }
}