import * as React from "react";
// import GroupsResponse from './GroupsResponse';
import Response from "../Response/Response";
import { Button, Card } from "antd";
import Axios, { AxiosResponse } from "axios";
import { GroupResponse } from "../services/interfaces";
import { UserServiceCookies } from "src/services/userServiceCookies";
import { RouteComponentProps, withRouter } from "react-router";

class GroupCardComponent extends React.Component<
  RouteComponentProps & { group: GroupResponse },
  Response<GroupResponse>
> {
  constructor(props) {
    super(props);
    this.joinGroup = this.joinGroup.bind(this);
    this.state = { data: props.group, error: "", statuscode: 0 };
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
      const response = await Axios.post(process.env.REACT_APP_API_URL + "/api/groups/join", {
        group_id: groupId,
        user_id: new UserServiceCookies().getUserInfo().userId,
      });
      console.log("Join Response:", response);
      this.props.history.push(`/groups/${groupId}`);
    } catch (error) {
      console.error(error);
    }
  }
}

export default withRouter(GroupCardComponent);
