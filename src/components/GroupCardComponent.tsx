import * as React from "react";
import Response from '../Response/Response';
import { Button, Card } from 'antd'
import WSGroupsService from 'src/services/WSGroupsService';
import { GroupResponse } from 'src/services/interfaces';
// import { UserServiceCookies } from "src/services/userServiceCookies";
import { RouteComponentProps, withRouter } from "react-router";
import { SharedContext, GlobalContext } from 'src/models/SharedContext';

class GroupCardComponent extends React.Component<
    RouteComponentProps & {
        group: GroupResponse,
        onGroupChangeCallback: (response: { group: GroupResponse, caller: string }) => void
    },
    Response<GroupResponse>
    >{
    // THIS VARIABLE *IS* IN FACT USED! DO NOT REMOVE!!!
    private static contextType = GlobalContext;

    private WSGroupsService: WSGroupsService;
    constructor(props:
        RouteComponentProps & {
            group: GroupResponse,
            onGroupChangeCallback: (response: { group: GroupResponse, caller: string }) => void
        }) {
        super(props);

        this.state = { data: props.group, error: "", statuscode: 0 };
        console.log("Name: " + props.group.name + " -- State: " + JSON.stringify(this.state) + " -- Props (group): " + JSON.stringify(this.props.group));
    }

    public componentWillMount() {
        this.WSGroupsService = (this.context as SharedContext).WSGroupsService;
        this.WSGroupsService.registerEventHandler('groupChanged', this.onGroupChanged);
    }

    public render() {
        const disableJoinButton = this.state.data.maxSize > this.state.data.users.length ? false : true;
        if (disableJoinButton || this.state.data.visible === false) {
            // Don't render the card if the group is full
            return null;
        }
        const availableSlots = this.state.data.maxSize - this.state.data.users.length;
        return (
            <GlobalContext.Consumer>
                {context => (
                    <Card
                        title={'Group name: ' + this.state.data.name}
                        extra={
                            <Button
                                disabled={disableJoinButton}
                                type='primary'
                                icon="usergroup-add"
                                onClick={() => this.joinGroup(context.UserService.getUserInfo().userId)}>
                                Join
                        </Button>
                        }
                        style={{ width: '100%' }}>
                        <p>Available slots: {availableSlots}</p>
                        <p><b>Users in this group:</b></p>
                        {this.state.data.users.length !== 0 ? (
                            <ul>
                                {this.state.data.users.map((userid: string) =>
                                    <li key={userid}>{userid}</li>
                                )}
                            </ul>
                        ) : (
                                <li>No users in this group!</li>
                            )}
                    </Card>
                )}
            </GlobalContext.Consumer>

        );
    }

    private redir = (group: GroupResponse) => {

        this.props.history.push(`/groups/${group._id}`);
    }

    private onGroupChanged = (response: { group: GroupResponse, caller: string }) => {
        // Each time a group is changed, this method is invoked *on all GroupCardComponents*
        // As such, we need to check the ID of the group being changed and only update the state
        // if the group being changed is *this* group
        if (response.group._id !== this.state.data._id) {
            return;
        }

        /*
            TEST FOR ERRORS IN THE REPONSE HERE!
        */

        // handle the change
        this.setState({ data: response.group });
        // 

        // Inform the parent of changes
        this.props.onGroupChangeCallback(response);

    }

    private async joinGroup(userId: string) {
        await this.WSGroupsService.joinGroup(
            this.state.data._id,
            userId,
            this.redir
        );

    }
}

//   private joinGroup = async () => {
//     try {
//       const groupId = this.state.data._id;
//       const response = await Axios.post("/groups/join", {
//         group_id: groupId,
//         user_id: new UserServiceCookies().getUserInfo().userId,
//       });
//       console.log("Join Response:", response);
//       this.props.history.push(`/groups/${groupId}`);
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }

export default withRouter(GroupCardComponent);
