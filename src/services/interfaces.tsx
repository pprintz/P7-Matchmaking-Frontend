import { User } from '../models/User';
import { RouteComponentProps } from 'react-router-dom';
import WSGroupService from './WSGroupsService';
import { UserServiceCookies } from './userServiceCookies';

export interface GroupService {
    leaveGroup(groupId: string, userId: string): Promise<PersistentGroup |  boolean>,
    createGroup(group: any),
    getGameList(): Promise<IGame[]>,
    deleteGroup(groupId: string): Promise<IGroup |  boolean>,
    getAllGroups(): Promise<PersistentGroup[]>,
    getGroupById(groupId: string): Promise<IGroup | boolean>
    joinGroup(groupId: string, userId: string): Promise<PersistentGroup>;
}

export interface UserService {
    setUserInfo(user: User): void;
    getUserInfo(): User;
    updateGroupIdUserInfo(groupId: string): User;
    setUserOwnerGroup(groupId: string): User;
    isLoggedIn(): boolean;
}

export interface PersistentUserService {
    getUserById(userId: string): Promise<IUser |  boolean>;
}

export interface IWSGroupsService {
    joinGroup(groupID: string, userID: string, ackFn?: (args: PersistentGroup) => void): Promise<void>,
    leaveGroup(groupId: string, userId: string, ackFn: (error: boolean) => void): Promise<void>,
    getGroup(groupId: string): PersistentGroup,
    getGroups(): PersistentGroup[],
    updateVisibility(group, ackFn: (args: PersistentGroup) => void): any
    createGroup(group: IGroup, ackFn: (group: PersistentGroup) => void): Promise<any>,
    // verifyInvite()
    // registerGroupChanged() 
};

interface Persistent {
    _id: string
}

export interface PersistentGroup extends IGroup, Persistent { };

export interface IUser {
    _id: string,
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