import * as React from 'react';
import { PersistedGroup, UserService, GroupService } from "../services/interfaces";
import { Button, Li, OpenLi, Div, Ul } from '../UI'
import { Row, Col, Card, Switch, Icon } from "antd";
import WSGroupsService from '../services/WSGroupsService';
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
    private WSGroupsService: WSGroupsService;
    private UserServiceCookies: UserServiceCookies;

    public constructor(props: RouteComponentProps & Props) {
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

  public renderCompleteButton() {
    // Check if the group is not full => return
    if(this.props.group.maxSize > this.props.group.users.length){
      return (<div />);
    }

    // Else return the button, because the group is full.
    return (
      <div>
        <antd.Button block={true} type="primary" style={{height: 80}} color="green">
          <a target="_blank" href="https://goo.gl/forms/mgfeqcDUE3P8lSsz2">Complete</a>
        </antd.Button>
      </div>
    );
  }

  public renderDeleteButton() {
    const user : User = this.props.userService.getUserInfo(); 

    if(user.ownerGroupId === this.props.group._id){
      return (
        <Route render={routeComponentProps => (
          <RemoveGroupComponent userService={this.props.userService} 
                                groupService={this.props.groupService}
                                {...routeComponentProps}                      
          />
        )} />
      )
    }
    
    return (<div />);
  }

  public render() {
    return (
        <div>
        <Row>
            <Col span={5} />
            <Col span={14}>
                <Card title={"Group name: " + this.state.name}  >
                    <h1><b>Game:</b> {this.state.game}</h1>
                    {this.renderCompleteButton()}
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
                    {this.renderDeleteButton()}
                </Col>
                <Col span={5} />
            </Row>

        </div>
        );
    }
    private updateVisibility = async () => {
        await this.WSGroupsService.updateVisibility(this.state, this.onVisibilityChanged)
    }

    private onVisibilityChanged = (group: PersistedGroup) => {
        this.setState(group);
    }

    private onGroupChanged = (response: { group: PersistedGroup, caller: string }) => {
        this.setState(response.group);
    }
}

export default withRouter(GroupList);
