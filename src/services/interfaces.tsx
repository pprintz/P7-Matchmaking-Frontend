import { User } from '../models/User';
import Group from 'antd/lib/input/Group';

export interface GroupService {
    leaveGroup(groupId : string, userId: string): Promise<GroupResponse | boolean>,
    mergeGroups(fromGroup: string, toGroup:string): Promise<GroupResponse>,
    createGroup(group : any),
    getGameList() : Promise<IGame[]>
}

export interface UserService {
    setUserInfo(user: User) : void;
    getUserInfo() : User;
    updateGroupIdUserInfo(groupId : string) : User;
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