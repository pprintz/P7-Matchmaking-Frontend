import { User } from '../models/User';
import { RouteComponentProps } from 'react-router-dom';
import WSGroupService from './WSGroupsService';
import { UserServiceCookies } from './userServiceCookies';

export interface GroupService {
    leaveGroup(groupId : string, userId : string) : Promise<GroupResponse | boolean>,
    createGroup(group : any),
    getGameList() : Promise<IGame[]>,
    deleteGroup(groupId : string) : Promise<IGroup | boolean>,
    getAllGroups() : Promise<IGroup[] | boolean>,
    getGroupById(groupId: string) : Promise<IGroup | boolean>
}

export interface UserService {
    setUserInfo(user: User) : void;
    getUserInfo() : User;
    updateGroupIdUserInfo(groupId : string) : User;
    setUserOwnerGroup(groupId : string) : User;
    isLoggedIn() : boolean;
}

export interface IUserServiceApi {
    getUserById(userId : string) : Promise<IUser | boolean>;
}

export interface IWSGroupsService {
    joinGroup(groupID: string, userID: string, ackFn?: (args: GroupResponse) => void): Promise<void>,
    leaveGroup(groupId: string, userId: string, ackFn: (error: boolean) => void): Promise<void>,
    getGroup(groupId: string): GroupResponse,
    getGroups(): GroupResponse[],
    updateVisibility(group, ackFn: (args: GroupResponse) => void): any
    createGroup(group: IGroup, ackFn: (group: GroupResponse) => void): Promise<any>,
    // verifyInvite()
    // registerGroupChanged() 
};

export interface GroupResponse {
    _id: string,
    name: string,
    maxSize: number,
    game: string,
    invite_id: string,
    users: string[],
    visible: boolean
};

export interface IUser {
    _id : string,
    name: string,
    created: string,
    discordId: string
}

export interface IGroup {
    name: string,
    maxSize: number,
    game: string,
    invite_id: string,
    users: string[],
    visible: boolean
}

export interface ISharedContext {
    UserService: UserServiceCookies,
    Client: SocketIOClient.Socket,
    WSGroupsService: IWSGroupsService
}

export interface IGame {
    name: string,
    maxSize: number
}