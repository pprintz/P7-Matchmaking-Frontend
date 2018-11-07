import {IWSGroupService, GroupResponse} from './interfaces';
import WSService from './WSService';

export default class WSGroupService extends WSService implements IWSGroupService {
    constructor(){
        super('/groups');
    }

    public joinGroup = async (groupID: string, userID: string, ackFn? : (args : GroupResponse) => void) : Promise<void> => {
        await this.IO.emit('joinGroup', { "user_id": userID, "group_id": groupID }, ackFn);
    }    
    
    public leaveGroup(groupID: string, userID: string): void {
        throw new Error("Method not implemented.");
    }

    public getGroup(groupID: string): GroupResponse {
        throw new Error("Method not implemented.");
    }

    public getGroups(): GroupResponse[] {
        throw new Error("Method not implemented.");
    }

    public incTimer(count : number) : void {
        console.log('IncTimer invoked');
        this.IO.emit('incTimer', count);
    }

    public subscribeToTimer(count : number) : void{
        this.IO.emit('subscribeToTimer', count);
    }
}