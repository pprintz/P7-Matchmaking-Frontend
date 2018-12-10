import { IWSGroupService, PersistedGroup, Group, SocketResponse } from './interfaces';
import WSService from './WSService';

export default class WSGroupService extends WSService implements IWSGroupService {
    constructor() {
        super('/groups');
    }

    public joinGroup = async (groupID: string, userID: string, ackFn?: (res: SocketResponse<PersistedGroup>) => void): Promise<void> => {

        await this.IO.emit('joinGroup', { "user_id": userID, "group_id": groupID }, ackFn);
    }

    public leaveGroup = async (groupID: string, userID: string, ackFn: (res: SocketResponse<void>) => void): Promise<void> => {
        await this.IO.emit('leaveGroup', { "user_id": userID, "group_id": groupID }, ackFn);
    }

    public createGroup = async (group: Group, ackFn: (res: SocketResponse<PersistedGroup>) => void): Promise<any> => {
        await this.IO.emit('createGroup', group, ackFn);
    }

    public getGroup(groupID: string): PersistedGroup {
        throw new Error("Method not implemented.");
    }

    public getGroups(): PersistedGroup[] {
        throw new Error("Method not implemented.");
    }

    public incTimer(count: number): void {
        console.log('IncTimer invoked');
        this.IO.emit('incTimer', count);
    }

    public subscribeToTimer(count: number): void {
        this.IO.emit('subscribeToTimer', count);
    }

    public updateVisibility = async (group, ackFn: (args: PersistedGroup) => void): Promise<void> => {
        await this.IO.emit('updateVisibility', group, ackFn);
    }

}