import { ISharedContext } from 'src/services/interfaces';
import { User } from './User';
import * as IOClient from 'socket.io-client';
import { RouteComponentProps } from 'react-router-dom';
import * as React from 'react';
import {IWSGroupsService} from '../services/interfaces';
import WSGroupsService from '../services/WSGroupsService';
import { UserServiceCookies } from 'src/services/userServiceCookies';

export class SharedContext implements ISharedContext{
    public UserService: UserServiceCookies = new UserServiceCookies(); 
    public Client : SocketIOClient.Socket = IOClient('http://localhost:3000');
    public WSGroupsService : WSGroupsService = new WSGroupsService();
    // public WSUserService : WSUserService = new WSUserService();
}

export const GlobalContext = React.createContext(new SharedContext());