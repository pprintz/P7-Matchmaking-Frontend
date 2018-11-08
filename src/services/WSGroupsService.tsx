import { IWSGroupsService, GroupResponse } from './interfaces';
import WSService from './WSService';
import GroupService from './GroupService';

export default class WSGroupService extends WSService implements IWSGroupsService {
    constructor() {
        super('/groups');
    }

    public joinGroup = async (groupID: string, userID: string, ackFn?: (args: GroupResponse) => void): Promise<void> => {
        await this.IO.emit('joinGroup', { "user_id": userID, "group_id": groupID }, ackFn);
    }

    public leaveGroup = async (groupID: string, userID: string, ackFn: (args: any) => void): Promise<void> => {
        await this.IO.emit('leaveGroup', { "user_id": userID, "group_id": groupID }, (args: any) => {

            // 

            // Finish off by invoking the supplied callback acknowledge function
            ackFn(args);
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