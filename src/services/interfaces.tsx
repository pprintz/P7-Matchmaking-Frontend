import { User } from '../models/User';
import Group from 'antd/lib/input/Group';

export interface GroupService {
    leaveGroup(groupId : string, userId: string): Promise<boolean>,
    mergeGroups(fromGroup: string, toGroup:string): Promise<GroupResponse>

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

