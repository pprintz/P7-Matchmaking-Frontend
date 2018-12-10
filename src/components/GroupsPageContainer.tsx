import * as React from 'react';
// import GroupsResponse from './GroupsResponse';
import Response from '../Response/Response';
import GroupCardComponent from './GroupCardComponent'
import { Row, Col, Card } from 'antd'
import WSGroupService from '../services/WSGroupService';
import { PersistedGroup, PersistentUserService, Group, GroupService, IWSGroupService, UserService } from "../services/interfaces";
import { GlobalContext, SharedContext } from 'src/models/SharedContext';
import img from '../images/cs-header.jpg'
import { toast } from 'react-toastify';
import { UserServiceCookies } from '../services/userServiceCookies';
import { RouteComponentProps } from 'react-router';


export default class GroupPageContainer extends React.Component<RouteComponentProps, Response<PersistedGroup[]>>{
    // THIS VARIABLE *IS* IN FACT USED! DO NOT REMOVE!!!
    private static contextType = GlobalContext;
    private WSGroupService: IWSGroupService;
    private groupService : GroupService
    private userService : UserService
    private sortFlag: boolean = false;

    constructor(props: any) {
        super(props);
        this.state = { data: [], statuscode: 0, error: "" };
    }

    public componentWillMount() {
        this.WSGroupService = (this.context as SharedContext).WSGroupService;
        this.groupService = (this.context as SharedContext).GroupServiceApi;
        this.userService = (this.context as SharedContext).UserService;
        this.WSGroupService.registerEventHandler('groupChanged', this.onGroupChanged);
    }

    public componentDidMount() {
        try {
            this.groupService.getAllGroups().then((grps: PersistedGroup[]) => this.setState({data:grps})) 
            this.setState({statuscode:1});   
        } catch (error) {
            this.setState({statuscode: 0});
            toast.error("something went wrong")
        }
    }

    public render() {
        if (this.state.statuscode === 0) {
            return (<p>Loading</p>);
        }
        else {
            const remainingSpots = (g: PersistedGroup) : number => g.maxSize - g.users.length;
            const sorted = this.state.data.sort((x,y) => (remainingSpots(x)) - (remainingSpots(y)));

            const groups = sorted.map((element: PersistedGroup) => {
                return (<GroupCardComponent key={element._id} group={element} onGroupChangeCallback={this.onGroupChanged} />)
            });
            return (
                <div>
                    <Row>
                        <Col span={4} />
                        <Col span={16}>
                            <Card cover={<img src={img} />}>
                                <Row>
                                    <Col span={4} />
                                    <Col span={16}>
                                        {groups}
                                    </Col>
                                    <Col span={4} />
                                </Row>
                            </Card>
                        </Col>
                        <Col span={4} />
                    </Row>
                </div>
            )
        }
    }

    private onGroupChanged = (response: { group: PersistedGroup, caller: string }): void => {
        if (!this.sortFlag && response.caller !== "createGroup" && response.caller !== "deleteGroup") { return };

        const oldData = this.state.data;
        const groupIndex = oldData.findIndex((value: PersistedGroup, index: number, obj: PersistedGroup[]) => {
            return value._id === response.group._id;
        });
        if (groupIndex === -1) {
            oldData.push(response.group);
        }
        else {
            oldData[groupIndex] = response.group;
        }

        this.setState({data: oldData});
    }
}
