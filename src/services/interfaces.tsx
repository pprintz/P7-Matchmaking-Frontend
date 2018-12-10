import { User } from '../models/User';
import { RouteComponentProps } from 'react-router-dom';
import WSGroupService from './WSGroupService';
import { UserServiceCookies } from './userServiceCookies';
import { SharedContext } from 'src/models/SharedContext';

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
    setUserInfo(user: User, ctx: SharedContext): void;
    getUserInfo(): User;
    updateGroupIdUserInfo(groupId: string, ctx: SharedContext): User;
    setUserOwnerGroup(groupId: string, ctx: SharedContext): User;
    isLoggedIn(): boolean;
}

export interface PersistentUserService {
    getUserById(userId: string): Promise<IUser |  boolean>;
}

export interface SocketService {
    registerEventHandler(event : string, fn : any) : void
}
export interface IWSGroupService extends SocketService {
    joinGroup(groupID: string, userID: string, ackFn?: (res: SocketResponse<PersistedGroup>) => void): Promise<void>,
    leaveGroup(groupId: string, userId: string, ackFn: (res: SocketResponse<void>) => void): Promise<void>,
    getGroup(groupId: string): PersistedGroup,
    getGroups(): PersistedGroup[],
    updateVisibility(group, ackFn: (args: PersistedGroup) => void): any
    createGroup(group: Group, ackFn: (res: SocketResponse<PersistedGroup>) => void): Promise<any>,
};

export interface SocketResponse<T> {
    data: T;
    error: boolean
}

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
    UserService: UserService,
    Client: SocketIOClient.Socket,
    WSGroupService: IWSGroupService,
    GroupServiceApi : GroupService,
}

export interface IGame {
    name: string,
    maxSize: number
}