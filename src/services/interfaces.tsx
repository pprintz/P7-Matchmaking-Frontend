import { User } from '../models/User';
import { RouteComponentProps } from 'react-router-dom';
import WSGroupService from './WSGroupsService';
import { UserServiceCookies } from './userServiceCookies';

export interface GroupService {
    leaveGroup(groupId: string, userId: string): Promise<PersistedGroup |  boolean>,
    createGroup(group: any),
    getGameList(): Promise<IGame[]>,
    deleteGroup(groupId: string): Promise<Group |  boolean>,
    getAllGroups(): Promise<PersistedGroup[]>,
    getGroupById(groupId: string): Promise<PersistedGroup>;
    joinGroup(groupId: string, userId: string): Promise<PersistedGroup>;
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
    joinGroup(groupID: string, userID: string, ackFn?: (args: PersistedGroup) => void): Promise<void>,
    leaveGroup(groupId: string, userId: string, ackFn: (error: boolean) => void): Promise<void>,
    getGroup(groupId: string): PersistedGroup,
    getGroups(): PersistedGroup[],
    updateVisibility(group, ackFn: (args: PersistedGroup) => void): any
    createGroup(group: Group, ackFn: (group: PersistedGroup) => void): Promise<any>,
    // verifyInvite()
    // registerGroupChanged() 
};

interface Persisted {
    _id: string
}

export interface PersistedGroup extends Group, Persisted { };

export interface IUser {
    _id: string,
    name: string,
    created: string,
    discordId: string
}

export interface Group {
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