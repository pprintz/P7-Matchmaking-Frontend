import { ISharedContext, GroupService, UserService, IUserWSService } from 'src/services/interfaces';
import { User } from './User';
import * as IOClient from 'socket.io-client';
import { RouteComponentProps } from 'react-router-dom';
import * as React from 'react';
import {IWSGroupService} from '../services/interfaces';
import WSGroupService from '../services/WSGroupService';
import UserWSService from "../services/userWSService";
import { UserServiceCookies } from 'src/services/userServiceCookies';
import Group from 'antd/lib/input/Group';
import { GroupServiceApi } from 'src/services/groupServiceApi';

export class SharedContext implements ISharedContext{
    public UserService: UserService = new UserServiceCookies(); 
    public Client : SocketIOClient.Socket = IOClient('http://localhost:3000');
    public WSGroupService : IWSGroupService = new WSGroupService();
    public GroupServiceApi  : GroupService = new GroupServiceApi();
    public UserWSService : IUserWSService = new UserWSService();
    // public WSUserService : WSUserService = new WSUserService();
}

export const GlobalContext = React.createContext(new SharedContext());