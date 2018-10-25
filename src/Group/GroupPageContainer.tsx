import * as React from 'react';
import {RouteComponentProps} from 'react-router-dom';
// import {ITeam} from './Teamlist'; 
import GroupResponse from './GroupResponse';
import Response from '../Response/Response';
import axios, { AxiosResponse } from 'axios';
import InviteUrlComponent from './InviteUrlComponent';
import GroupList from './GroupList';

// IMatchParams and IProps are used for Route/Routing
// in order to encapsulate the match data we get from routing groups/:group_id
// IMatchParams is a RouteMatch type wrapper (populated in App.tsx when routing groups/:group_id)
// interface IMatchParams { group_id : string }; 
// interface IProps extends RouteComponentProps<IMatchParams>{}

export default class GroupPageContainer extends React.Component<
    RouteComponentProps<{group_id : string, invite_id : string}> /*RouteComponentProps<IMatchParams>*/ /*IProps*/, 
    Response<GroupResponse>
  > {
    // Each time the component is loaded we check the backend for a group with grouo_id == :group_id
    public componentDidMount(){
      axios.get('http://localhost:3000/groups/' + this.props.match.params.group_id)
      .then((res : AxiosResponse) => {
        this.setState(res.data);
      });
    }

    public render() {
      // Basicly we have 3 render cases:
      // 1) No state has yet been set (i.e. we have not gotten any response from the backend yet through componentDidMount)
      // 2) We have gotten a response and it is valid (statuscode === 0)
      // 3) Response from backend has errors (statuscode !== 0)

      // Case 1)
      if(this.state === null){
        return (<div><h3>LOADING</h3></div>);
      }
      else{
        // Case 2)
        if(this.state.statuscode === 0){
          return this.ShowGroup();
        }
        // Case 3)
        else {
          return this.InvalidIDModal();
        }
      }
    }

    // HTML to be shown when the :group_id does not correspond to a group
    private InvalidIDModal = () => (
      <div>
      <p>Error string: {this.state.error} -- Status code: {this.state.statuscode}</p>
      <p>Url ID: {this.props.match.params.group_id}</p>
      </div>
    );

    // HTML to be shown when the :group_id is valid and corresponds to a group
    private ShowGroup = () => (
      <div>
        <GroupList group={this.state.data}/>
        <InviteUrlComponent invite_id={this.state.data.invite_id}/>
      </div>
    );
}
