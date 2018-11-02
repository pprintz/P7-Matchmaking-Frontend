import { User } from '../models/User';

export interface GroupService {
    leaveGroup(groupId : string, userId: string): Promise<boolean>,
    createGroup(group : any),
}

export interface UserService {
    setUserInfo(user: User) : void;
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

