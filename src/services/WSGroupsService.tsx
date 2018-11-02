import {IWSGroupService} from './interfaces';
import IGroup from 'src/models/IGroup';
import WSService from './WSService';

export default class WSGroupService extends WSService implements IWSGroupService {
    constructor(){
        super('/groups');
    }

    public joinGroup(groupID: string, userID: string): IGroup {
        throw new Error("Method not implemented.");
    }    
    
    public leaveGroup(groupID: string, userID: string): void {
        throw new Error("Method not implemented.");
    }

    public getGroup(groupID: string): IGroup {
        throw new Error("Method not implemented.");
    }

    public getGroups(): IGroup[] {
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