import * as React from "react";
import { RouteComponentProps, Route, withRouter } from "react-router-dom";
import { PersistedGroup, UserService, GroupService, IWSGroupService } from "../services/interfaces";
import GroupList from "./GroupList";
import { UserServiceCookies } from 'src/services/userServiceCookies';
import { SharedContext, GlobalContext } from 'src/models/SharedContext';
import NotAllowedHere from '../components/NotAllowedHere';
import { GroupServiceApi } from 'src/services/groupServiceApi';
import LeaveGroup from './LeaveGroup';
import DiscordUrlComponent from './DiscordUrlComponent';
import { toast } from 'react-toastify';


export class GroupPageContainer extends React.Component<RouteComponentProps<{group_id: string;invite_id: string;}>,PersistedGroup> {

    // THIS VARIABLE *IS* IN FACT USED! DO NOT REMOVE!!!
    private static contextType = GlobalContext;
    private groupService : GroupService
    private userService : UserService


    constructor(props: any) {
        super(props);

    }
    public async componentWillMount(){
        this.groupService = (this.context as SharedContext).GroupServiceApi;
        this.userService = (this.context as SharedContext).UserService;
    }

    // Each time the component is loaded we check the backend for a group with grouo_id == :group_id
    public async componentDidMount() {
        let result : PersistedGroup;
        try {

            result = await this.groupService.getGroupById(this.props.match.params.group_id);
            this.setState(result);
        } catch (error) {
            toast.error(error)
        }
    }

    public render() {
        if (this.state === null) {
            return (
                <div>
                    <h3>Loading..</h3>
                </div>
            );
        }

        const user = this.userService.getUserInfo();
        const userIsInGroup = (this.state.users.indexOf(user.userId) > -1);
        if (!userIsInGroup) {
            return (
                <NotAllowedHere />
            )
        }

        return (<div>
            <GroupList group={this.state} userService={this.userService} groupService={this.groupService} />
            <Route render={routeComponentProps => (
                <LeaveGroup {...routeComponentProps}/>
            )} />

        </div>)
    }
}

export default withRouter(GroupPageContainer);