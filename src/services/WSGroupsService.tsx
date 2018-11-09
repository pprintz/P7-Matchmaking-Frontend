import { IWSGroupsService, GroupResponse, IGroup } from './interfaces';
import WSService from './WSService';

export default class WSGroupService extends WSService implements IWSGroupsService {
    constructor() {
        super('/groups');
    }

    public joinGroup = async (groupID: string, userID: string, ackFn?: (args: GroupResponse) => void): Promise<void> => {
        await this.IO.emit('joinGroup', { "user_id": userID, "group_id": groupID }, ackFn);
    }

    public leaveGroup = async (groupID: string, userID: string, ackFn: (error: boolean) => void): Promise<void> => {
        await this.IO.emit('leaveGroup', { "user_id": userID, "group_id": groupID }, ackFn);
    }

    public createGroup = async (group: IGroup, ackFn: (group: GroupResponse) => void): Promise<any> => {
        await this.IO.emit('createGroup', group, (res: { error: boolean, newGroup: GroupResponse }) => {
            console.info("Error value: " + res.error + " --- group: " + res.newGroup)
            if (!res.error) {
                ackFn(res.newGroup);
            }
        });
    }

    public getGroup(groupID: string): GroupResponse {
        throw new Error("Method not implemented.");
    }

    public getGroups(): GroupResponse[] {
        throw new Error("Method not implemented.");
    }

    public incTimer(count: number): void {
        console.log('IncTimer invoked');
        this.IO.emit('incTimer', count);
    }

    public subscribeToTimer(count: number): void {
        this.IO.emit('subscribeToTimer', count);
    }

    public updateVisibility = async (group, ackFn: (args: GroupResponse) => void): Promise<void> => {
        await this.IO.emit('updateVisibility', group, ackFn);
    }

}