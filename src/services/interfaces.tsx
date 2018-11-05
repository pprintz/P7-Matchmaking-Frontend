import { User } from '../models/User';
import IGroup from '../models/IGroup';

export interface GroupService {
    leaveGroup(groupId : string, userId: string): Promise<boolean>,
}

export interface UserService {
    setUserInfo(userId : string, groupId : string) : void;
    getUserInfo() : User;
    setUserId(userId: string): void;
}

export interface IWSGroupService {
    joinGroup(groupId : string, userId : string) : void,
    leaveGroup(groupId : string, userId : string) : void,
    getGroup(groupId : string) : IGroup,
    getGroups() : IGroup[],
    // createGroup()
    // verifyInvite()
    // registerGroupChanged() 
}