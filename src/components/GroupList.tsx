import * as React from 'react';
import { PersistedGroup, UserService, GroupService, IWSGroupService } from "../services/interfaces";
import { Button, Li, OpenLi, Div, Ul } from '../UI'
import { Row, Col, Card, Switch, Icon } from "antd";
import WSGroupService from '../services/WSGroupService';
import { GlobalContext, SharedContext } from 'src/models/SharedContext';
import { RouteComponentProps, withRouter, Route } from 'react-router';
import NotAllowedHere from '../components/NotAllowedHere';
import LeaveGroup from './LeaveGroup';
import { UserServiceCookies } from 'src/services/userServiceCookies';
import { GroupServiceApi } from 'src/services/groupServiceApi';
import * as antd from "antd";
import { User } from 'src/models/User';
import RemoveGroupComponent from './RemoveGroupComponent';
import ActionButton from 'antd/lib/modal/ActionButton';
import InviteUrlComponent from './InviteUrlComponent';
import DiscordUrlComponent from './DiscordUrlComponent';
import { string } from 'prop-types';
import { toast } from 'react-toastify';

interface Props {
    group: PersistedGroup,
    userService: UserService,
    groupService: GroupService
}

export class GroupList extends React.Component<
    RouteComponentProps & Props,
    PersistedGroup> {
    // THIS VARIABLE *IS* IN FACT USED! DO NOT REMOVE!!!
    private static contextType = GlobalContext;
    private WSGroupService: IWSGroupService;
    private UserServiceCookies: UserService;

    public constructor(props: RouteComponentProps & Props) {
        super(props)
        this.state = this.props.group;
        console.log("INSIDE GROUPLIST")
        console.log(JSON.stringify(this.props.group));
    }

    public componentWillMount() {
        this.WSGroupService = (this.context as SharedContext).WSGroupService;
        this.UserServiceCookies = (this.context as SharedContext).UserService;
        this.WSGroupService.registerEventHandler('groupChanged', this.onGroupChanged);
    }

    public renderDeleteButton() {
        const user: User = this.props.userService.getUserInfo();

        if (user.ownerGroupId === this.props.group._id) {
            return (
                <Route render={routeComponentProps => (
                    <RemoveGroupComponent userService={this.props.userService}
                        groupService={this.props.groupService}
                        {...routeComponentProps}
                    />
                )} />
            )
        } else {
            return (<Route render={routeComponentProps => (
                <LeaveGroup {...routeComponentProps} />
            )} />)
        }
    }

    public render() {
        return (
            <div>
                <Row>
                    <Col span={5} />
                    <Col span={14}>
                        <Card title={"Group name: " + this.state.name}  >
                            <h1><b>Game:</b> {this.state.game}</h1>
                            <p><b>Users in this group:</b></p>
                            <ul>
                                {this.state.userList.map((member) => {
                                    return <li key={member._id}>{member.name}</li>
                                })}
                                {
                                    Array.from({ length: (this.state.maxSize - this.state.users.length) }, (v: {}, k: number) =>
                                        <li key={k}>This spot i still open - invite a friend!</li>)
                                }
                            </ul>
                            <div id="wrapper">
                                <div id="left">
                                    <InviteUrlComponent invite_id={this.state.invite_id} />
                                    <DiscordUrlComponent />
                                </div>
                            </div>
                            {/* <div id="wrapper">
                                <div id="left">
                                    <p>Make group visible to others: <p>&#32;&#32;</p> </p>
                                </div>
                                <div id="right"><Switch onChange={this.updateVisibility} defaultChecked={this.state.visible} /></div>
                            </div> */}
                            {this.renderDeleteButton()}
                        </Card>
                    </Col>
                    <Col span={5} />
                </Row>

            </div>
        );
    }
    private updateVisibility = async () => {
        await this.WSGroupService.updateVisibility(this.state, this.onVisibilityChanged)
    }

    private onVisibilityChanged = (group: PersistedGroup) => {
        this.setState(group);
    }

    private onGroupChanged = (response: { group: PersistedGroup, caller: string }) => {
        this.getUserChange(response.group)
        this.setState(response.group);
    }

    private getUserChange = (group: PersistedGroup): void => {
        const self = this.UserServiceCookies.getUserInfo()
        const change: string = this.state.userList.length > group.userList.length ? "Left" : "Joined";
        const toaster = change == "Joined" ? toast.success : toast.warn;

        const largest = this.state.userList.length > group.userList.length ? this.state.userList : group.userList;
        const smallest = this.state.userList.length > group.userList.length ? group.userList : this.state.userList;
        const diff = largest.filter(user => smallest.find(userobj => userobj._id == user._id) == undefined)

        for (const user of diff) {
            toaster((user.name == self.name ? "You" : user.name) + " " + change.toLowerCase() + " the group!")
        }
    }
}

export default withRouter(GroupList);
