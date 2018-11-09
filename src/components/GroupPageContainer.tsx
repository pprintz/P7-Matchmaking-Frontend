import * as React from "react";
import { RouteComponentProps, Route } from "react-router-dom";
import { GroupResponse, UserService, GroupService } from "../services/interfaces";
import axios from "axios";
import InviteUrlComponent from "./InviteUrlComponent";
import GroupList from "./GroupList";
import { UserServiceCookies } from 'src/services/userServiceCookies';
import { GroupServiceApi } from 'src/services/groupServiceApi';
import LeaveGroup from './LeaveGroup';
import DiscordUrlComponent from './DiscordUrlComponent';
import ShowFittingGroups from "../components/ShowFittingGroups";

// IMatchParams and IProps are used for Route/Routing
// in order to encapsulate the match data we get from routing groups/:group_id
// IMatchParams is a RouteMatch type wrapper (populated in App.tsx when routing groups/:group_id)
// interface IMatchParams { group_id : string };
// interface IProps extends RouteComponentProps<IMatchParams>{}
/*
interface GroupStates {
  groupId: string,
}
*/

interface Props {
  userService: UserServiceCookies,
  groupService: GroupService
}

export default class GroupPageContainer extends React.Component<
  RouteComponentProps<{
    group_id: string;
    invite_id: string;
  }> & Props, GroupResponse> {

  constructor(props : RouteComponentProps<{
    group_id: string;
    invite_id: string;
  }> & Props){
    super(props);
  }
  // Each time the component is loaded we check the backend for a group with grouo_id == :group_id
  public async componentDidMount() {
    let result;
    try {
      result = await axios.get(process.env.REACT_APP_API_URL + "/api/groups/" + this.props.match.params.group_id);
      this.setState(result.data);
    } catch (error) {
      console.error(error);
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
        
    return (<div>
      <GroupList group={this.state} />
      <InviteUrlComponent invite_id={this.state.invite_id} />
      <DiscordUrlComponent />
      <Route render={routeComponentProps => (
          <ShowFittingGroups group={this.state}
                            {...routeComponentProps} 
                            />
      )} />
      <Route render={routeComponentProps => (
        <LeaveGroup 
        userService={this.props.userService} 
        groupService={this.props.groupService}
        {...routeComponentProps}
        />
      )} />
      
    </div>)
  }
}
