import * as React from "react";
import { RouteComponentProps, Route, withRouter } from "react-router-dom";
import { PersistedGroup, UserService, GroupService, IWSGroupService, IUserWSService, IUser } from "../services/interfaces";
import GroupList from "./GroupList";
import { UserServiceCookies } from 'src/services/userServiceCookies';
import { SharedContext, GlobalContext } from 'src/models/SharedContext';
import NotAllowedHere from '../components/NotAllowedHere';
import { GroupServiceApi } from 'src/services/groupServiceApi';
import LeaveGroup from './LeaveGroup';
import DiscordUrlComponent from './DiscordUrlComponent';
import { toast } from 'react-toastify';
import UserWSService from 'src/services/userWSService';
import { User } from 'src/models/User';
import QueueUsers from "../components/QueueUsers";

interface State {
    queueUsers: Array<string>
}

export class GroupPageContainer extends React.Component<RouteComponentProps<{ group_id: string; invite_id: string; }>, PersistedGroup & State> {

    // THIS VARIABLE *IS* IN FACT USED! DO NOT REMOVE!!!
    private static contextType = GlobalContext;
    private groupService: GroupService;
    private userService: UserService;
    private queueService: IUserWSService;
    private user: User

    constructor(props: any) {
        super(props);

        this.setState({
            queueUsers: []
        });

        this.handleQueueClick = this.handleQueueClick.bind(this);
    }
    public async componentWillMount() {
        this.groupService = (this.context as SharedContext).GroupServiceApi;
        this.userService = (this.context as SharedContext).UserService;
        this.queueService = (this.context as SharedContext).UserWSService;
        this.user = (this.context as SharedContext).User;
        this.queueService.registerEventHandler("groupEnqueued", this.groupJoinedQueue);
        this.queueService.registerEventHandler("groupDequeued", this.groupLeftQueue);
    }

    // Each time the component is loaded we check the backend for a group with grouo_id == :group_id
    public async componentDidMount() {
        let result: PersistedGroup;
        try {
            result = await this.groupService.getGroupById(this.props.match.params.group_id);
            this.setState(result);
        } catch (error) {
            toast.error(error)
        }
    }

    private groupJoinedQueue = (group: any, caller: string) : void => {
        if(group == null){
            return;
        }
    
        if(this.user.ownerGroupId === ""){
            toast.success("You joined the queue...")
        }
        
    }

    private groupLeftQueue = (group: any, caller: string) : void => {
        if(group == null){
            return;
        }
        console.log("asdasdasd");
        
        if(this.user.ownerGroupId === ""){
            toast.success("You left the queue...")
        }
}

    public async handleQueueClick() : Promise<Array<string>> {
        const users = await this.renderQueueUsers();
        return users === undefined ? [] : users;
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

        return (
            <div>
                <GroupList group={this.state} userService={this.userService} groupService={this.groupService} />

                {this.user.ownerGroupId == "" ? <div /> : <QueueUsers users={this.state.users} callback={this.handleQueueClick} />}
            </div>
        )
    }

    private async renderQueueUsers() : Promise<Array<string>> {
        if (this.user.ownerGroupId != "") {
            try {
                const persistedGroup = await this.groupService.getGroupById(this.user.ownerGroupId);

                this.setState({ queueUsers: persistedGroup.users });

                return persistedGroup.users;
            } catch (error) {
                toast.error("This group could not be queued");
                return [];
            }
        }else{
            return [];
        }
    }
}

export default withRouter(GroupPageContainer);