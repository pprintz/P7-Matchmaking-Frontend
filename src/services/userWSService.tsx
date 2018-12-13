import { IUserWSService, SocketResponse, PersistedGroup, QueueEntry, PersistedQueueEntry } from './interfaces';
import WSService from './WSService';
import {GameSettings} from "../components/QueueUsers";

export default class UserWSService extends WSService implements IUserWSService {
    constructor(id: string) {
        super('/queues', id); 
    }

    public joinQueue = async (queueEntry : QueueEntry, ackFn : (response: SocketResponse<PersistedQueueEntry>) => void): Promise<void> => {
        console.log(queueEntry);    
                

        await this.IO.emit("enqueue", queueEntry, ackFn);
    }

    public leaveQueue = async (queueEntry : PersistedQueueEntry, ackFn : (response: SocketResponse<PersistedQueueEntry>) => void): Promise<void> => {
        await this.IO.emit("dequeue", queueEntry, ackFn);
    }
}