import * as React from 'react';
import { GroupResponse } from "../services/interfaces";
import { Button, Li, OpenLi, Div, Ul } from '../UI'
import { Row, Col, Card, Switch, Icon } from "antd";
import WSGroupsService from '../services/WSGroupsService';
import { GlobalContext, SharedContext } from 'src/models/SharedContext';
import { RouteComponentProps, withRouter, Route } from 'react-router';
import NotAllowedHere from '../components/NotAllowedHere';
import LeaveGroup from './LeaveGroup';
import { UserServiceCookies } from 'src/services/userServiceCookies';
import { GroupServiceApi } from 'src/services/groupServiceApi';
import ActionButton from 'antd/lib/modal/ActionButton';
import InviteUrlComponent from './InviteUrlComponent';
import DiscordUrlComponent from './DiscordUrlComponent';

export class GroupList extends React.Component<
    RouteComponentProps & { group: GroupResponse },
    GroupResponse> {
    // THIS VARIABLE *IS* IN FACT USED! DO NOT REMOVE!!!
    private static contextType = GlobalContext;
    private WSGroupsService: WSGroupsService;
    private UserServiceCookies: UserServiceCookies;

    public constructor(props: RouteComponentProps & { group: GroupResponse }) {
        super(props)
        this.state = this.props.group;
        console.log("INSIDE GROUPLIST")
        console.log(JSON.stringify(this.props.group));
    }

    public componentWillMount() {
        this.WSGroupsService = (this.context as SharedContext).WSGroupsService;
        this.UserServiceCookies = (this.context as SharedContext).UserService;
        this.WSGroupsService.registerEventHandler('groupChanged', this.onGroupChanged);
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
                                {this.state.users.map((member) => {
                                    return <li key={member}>{member}</li>
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
                            <div id="wrapper">
                                <div id="left">
                                    <p>Make group visible to others: <p>&#32;&#32;</p> </p>
                                </div>
                                <div id="right"><Switch onChange={this.updateVisibility} defaultChecked={this.state.visible} /></div>
                            </div>
                        </Card>
                    </Col>
                    <Col span={5} />
                </Row>

            </div>


            // <Div>
            //     <h1>{this.state.name}</h1>
            //     <div id="wrapper">
            //         <div id="left">
            //             <p>Make group visible to others:</p>
            //         </div>
            //         <div id="right"><Switch onChange={this.updateVisibility} defaultChecked={this.state.visible} /></div>
            //     </div>
            //     <br />
            //     <Ul>
            //         {this.state.users.map((member) => {
            //             return <Li key={member}>
            //                 {member}</Li>
            //         })}
            //         {
            //             Array.from({ length: (this.state.maxSize - this.state.users.length) }, (v: {}, k: number) => <OpenLi key={k}>Open<Button>Invite player</Button></OpenLi>)
            //         }
            //     </Ul>
            //     <LeaveGroup />
            // </Div>


        );
    }
    private updateVisibility = async () => {
        await this.WSGroupsService.updateVisibility(this.state, this.onVisibilityChanged)
    }

    private onVisibilityChanged = (group: GroupResponse) => {
        this.setState(group);
    }

    private onGroupChanged = (response: { group: GroupResponse, caller: string }) => {
        this.setState(response.group);
    }
}

export default withRouter(GroupList);
