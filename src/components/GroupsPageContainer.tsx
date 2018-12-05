import * as React from 'react';
// import GroupsResponse from './GroupsResponse';
import Response from '../Response/Response';
import GroupCardComponent from './GroupCardComponent'
import { Row, Col, Card } from 'antd'
import WSGroupsService from '../services/WSGroupsService';
import { PersistedGroup, PersistentUserService, Group, GroupService } from "../services/interfaces";
import { GlobalContext, SharedContext } from 'src/models/SharedContext';
import img from '../images/cs-header.jpg'
import { toast } from 'react-toastify';
import { UserServiceCookies } from '../services/userServiceCookies';

interface Props  {
    groupService: GroupService
    userService: PersistentUserService
}

export default class GroupPageContainer extends React.Component<Props, Response<PersistedGroup[]>>{
    // THIS VARIABLE *IS* IN FACT USED! DO NOT REMOVE!!!
    private static contextType = GlobalContext;
    private WSGroupsService: WSGroupsService;
    private sortFlag: boolean = false;

    constructor(props: any) {
        super(props)
        this.state = { data: [], statuscode: 0, error: "" };
    }

    public componentWillMount() {
        this.WSGroupsService = (this.context as SharedContext).WSGroupsService;
        this.WSGroupsService.registerEventHandler('groupChanged', this.onGroupChanged);
    }

    public componentDidMount() {
        try {
            this.props.groupService.getAllGroups().then((grps: PersistedGroup[]) => this.setState({data: grps}))    
        } catch (error) {
            console.log(error)
            toast.error("something went wrong")
        }
    }

    public render() {
        if (this.state === null) {
            return (<p>Loading</p>);
        }
        else if (this.state.statuscode === 0) {
            const remainingSpots = (g: PersistedGroup) : number => g.maxSize - g.users.length;
            const sorted = this.state.data.sort((x,y) => (remainingSpots(x)) - (remainingSpots(y)));

            const groups = sorted.map((element: PersistedGroup) => {
                return (<GroupCardComponent userService={new UserServiceCookies()} groupService={this.props.groupService} key={element._id} group={element} onGroupChangeCallback={this.onGroupChanged} />)
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
        else {
            return (<p>Ooops, no groups!</p>)
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

        this.setState({ data: oldData });
    }
}
