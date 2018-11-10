import { User } from '../models/User';

export interface GroupService {
    leaveGroup(groupId : string, userId : string) : Promise<GroupResponse | boolean>,
    createGroup(group : any),
    getGameList() : Promise<IGame[]>,
    deleteGroup(groupId : string) : Promise<IGroup | boolean>
    getAllGroups() : Promise<IGroup[] | boolean>;
}

export interface UserService {
    setUserInfo(user: User) : void;
    getUserInfo() : User;
    updateGroupIdUserInfo(groupId : string) : User;
    setUserOwnerGroup(groupId : string) : User;
}

export interface IUserServiceApi {
    getUserById(userId : string) : Promise<IUser | boolean>;
}

export interface IUser {
    _id : string,
    name: string,
    created: string,
    discordId: string
}

export interface GroupResponse {
    _id : string,
    name : string,
    maxSize : number,
    game : string,
    invite_id : string,
    users : string[]
};
export interface IGroup {
    name : string,
    maxSize : number,
    game : string,
    invite_id : string,
    users : string[]
}

export interface IGame {
    name: string,
    maxSize: number
}