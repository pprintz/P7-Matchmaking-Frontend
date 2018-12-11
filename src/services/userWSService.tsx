import { IUserWSService, SocketResponse } from './interfaces';
import WSService from './WSService';
import {GameSettings} from "../components/QueueUsers";
import ColumnGroup from 'antd/lib/table/ColumnGroup';

export enum Level {
    SILVER1 = 0,
    SILVER2,
    SILVER3,
    SILVER4,
    SILVERELITE,
    SILVERELITEMASTER,
    GOLDNOVA1,
    GOLDNOVA2,
    GOLDNOVA3,
    GOLDNOVAMASTER,
    MASTERGUARDIAN1,
    MASTERGUARDIAN2,
    MASTERGUARDIANELITE,
    DESTINGUISHEDMASTERGUARDIAN,
    LEGENDARYEAGLE,
    LEGENDARYEAGLEMASTER,
    SUPREMEMASTERFIRSTCLASS,
    GLOBALELITE
}

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