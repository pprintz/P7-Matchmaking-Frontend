import { ISharedContext, GroupService, UserService } from 'src/services/interfaces';
import { User } from './User';
import * as IOClient from 'socket.io-client';
import { RouteComponentProps } from 'react-router-dom';
import * as React from 'react';
import {IWSGroupService} from '../services/interfaces';
import WSGroupService from '../services/WSGroupService';
import { UserServiceCookies } from 'src/services/userServiceCookies';
import Group from 'antd/lib/input/Group';
import { GroupServiceApi } from 'src/services/groupServiceApi';

export class SharedContext implements ISharedContext{
    public UserService: UserService = new UserServiceCookies(); 
    public Client : SocketIOClient.Socket = IOClient(process.env.REACT_APP_API_URL + "/api");
    public WSGroupService : IWSGroupService = new WSGroupService();
    public GroupServiceApi  : GroupService = new GroupServiceApi();
    // public WSUserService : WSUserService = new WSUserService();
}


export const GlobalContext = React.createContext(new SharedContext());