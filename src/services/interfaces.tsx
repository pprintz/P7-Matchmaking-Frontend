import { User } from '../models/User';

export interface GroupService {
    leaveGroup(groupId : string, userId: string): Promise<boolean>,
}

export interface UserService {
    setUserInfo(userId : string, groupId : string) : void;
    getUserInfo() : User;
    setUserId(userId: string): void;
}

export interface IWSGroupService {
    joinGroup(groupID: string, userID: string, ackFn? : (args : GroupResponse) => void) : Promise<void>,
    leaveGroup(groupId : string, userId : string) : void,
    getGroup(groupId : string) : GroupResponse,
    getGroups() : GroupResponse[],
    // createGroup()
    // verifyInvite()
    // registerGroupChanged() 
}
export interface GroupResponse {
    _id : string,
    name : string,
    maxSize : number,
    game : string,
    invite_id : string,
    users : string[]
};

