import { IUserWSService, SocketResponse } from './interfaces';
import WSService from './WSService';
import {GameSettings} from "../components/QueueUsers";

export default class UserWSService extends WSService implements IUserWSService {
    constructor() {
        super('/queues'); 
        console.log("Works!");
    }

    public joinQueue = async (userId: string, gameSettings: GameSettings): Promise<void> => {
        let requestObj = new Object({
            "userId": userId,
            "gameSettings": gameSettings
        });

        console.log(requestObj);    
                

        await this.IO.emit("joinQueue", requestObj);
    }

    public leaveQueue = async (userId: string): Promise<void> =>{
        await this.IO.emit("leaveQueue", {"userId": userId});
    }
}