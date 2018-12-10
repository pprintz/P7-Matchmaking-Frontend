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
    public UserService: UserService;
    public Client : SocketIOClient.Socket;
    public WSGroupService : IWSGroupService;
    public GroupServiceApi  : GroupService;
    public User : User;
    public UserWSService : IUserWSService = new UserWSService();
}


export const GlobalContext = React.createContext(new SharedContext());