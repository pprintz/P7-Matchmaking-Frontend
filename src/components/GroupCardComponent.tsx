import * as React from "react";
// import GroupsResponse from './GroupsResponse';
import { Button, Card } from "antd";
import { PersistedGroup, IUser, PersistentUserService, UserService, IWSGroupService, SocketResponse } from "../services/interfaces";
import { RouteComponentProps, withRouter } from "react-router";
import { toast } from 'react-toastify';
import { GroupService } from '../services/interfaces';
import { SharedContext, GlobalContext } from 'src/models/SharedContext';

interface Props {
  group: PersistedGroup,
}

interface State {
  data: PersistedGroup,
  users: IUser[],
}

class GroupCardComponent extends React.Component<
  RouteComponentProps & Props & { onGroupChangeCallback: (response: { group: PersistedGroup, caller: string }) => void}, State>
  {
  private static contextType = GlobalContext;
  private WSGroupService: IWSGroupService
  private userService: UserService;

  constructor(props: RouteComponentProps & Props & {
    onGroupChangeCallback: (response: { group: PersistedGroup, caller: string }) => void
  }) {
    super(props);
    this.joinGroup = this.joinGroup.bind(this);
    this.state = { data: props.group, users: [] };
  }

  public componentWillMount(){
    this.WSGroupService = (this.context as SharedContext).WSGroupService;
    this.userService = (this.context as SharedContext).UserService;
  }

  public render() {
    const disableJoinButton =
      this.state.data.maxSize > this.state.data.users.length ? false : true;
    if (disableJoinButton) {
      // Don't render the card if the group is full
      return null;
    }
    const availableSlots =
      this.state.data.maxSize - this.state.data.users.length;
    return (
      <div style={{ paddingTop: 10, paddingBottom: 10 }}>
        <Card
          title={"Group name: " + this.state.data.name}
          extra={
            <Button
              disabled={disableJoinButton}
              type="primary"
              icon="usergroup-add"
              onClick={this.joinGroup}>
              Join
            </Button>
          }
          style={{ width: "100%" }}>
          <p>Game: {this.state.data.game}</p>
          <p>Available slots: {availableSlots}</p>
          <p>
            <b>Users in this group:</b>
          </p>
          {this.state.data.users.length !== 0 ? (
            <ul>
              {this.state.data.users.map((userid: string) => (
                <li key={userid}>{userid}</li>
              ))}
            </ul>
          ) : (
              <li>No users in this group!</li>
            )}
        </Card>
      </div>
    );
  }

  private joinGroup = async () => {
    try {
      const groupId = this.state.data._id;
      console.log(this.context);
      await this.context.WSGroupService.joinGroup(groupId, this.userService.getUserInfo().userId, this.onGroupJoinedCallback)
    } catch (error) {
      toast.error("Can not establish a connection");
      console.log(error)
    }
  }
  private onGroupJoinedCallback = async (res: SocketResponse<PersistedGroup>) => {
    // Update state, if the request was successfull
    if (res.error) {
        toast.error("Sorry, you can't join this group. Leave your current group");
        return;
    }

    this.userService.updateGroupIdUserInfo(res.data._id, this.context);
    this.props.history.push(`/groups/${res.data._id}`);
}
}

export default withRouter(GroupCardComponent);
