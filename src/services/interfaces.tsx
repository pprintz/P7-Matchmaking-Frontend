import { User } from '../models/User';

export interface GroupService {
    leaveGroup(groupId: string, userId: string): Promise<boolean>,
    createGroup(group: any),
}

export interface UserService {
    setUserInfo(user: User): void;
    getUserInfo(): User;
    updateGroupInCookie(value: string): void;

}

export interface IWSGroupService {
    joinGroup(groupID: string, userID: string, ackFn?: (args: GroupResponse) => void): Promise<void>,
    leaveGroup(groupId: string, userId: string): void,
    getGroup(groupId: string): GroupResponse,
    getGroups(): GroupResponse[],
    updateVisibility(group, ackFn: (args: GroupResponse) => void): any
    // createGroup()
    // verifyInvite()
    // registerGroupChanged() 
}
export interface GroupResponse {
    _id: string,
    name: string,
    maxSize: number,
    game: string,
    invite_id: string,
    users: string[],
    visible: boolean
};
export interface IGroup {
    name: string,
    maxSize: number,
    game: string,
    invite_id: string,
    users: string[],
    visible: boolean
}

