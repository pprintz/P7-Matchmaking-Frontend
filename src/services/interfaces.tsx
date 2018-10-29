import { User } from './users/user';

export interface GroupService {
    leaveGroup(groupId : string, userId: string): Promise<boolean>,
}

export interface UserService {
    setUserInfo(userId : string, groupId : string) : void;
    getUserInfo() : User;
}

export interface GroupResponse {
    _id : string,
    name : string,
    maxSize : number,
    game : string,
    invite_id : string,
    users : string[]
};