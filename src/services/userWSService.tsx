import { IUserWSService, SocketResponse } from './interfaces';
import WSService from './WSService';
import {GameSettings} from "../components/QueueUsers";
import ColumnGroup from 'antd/lib/table/ColumnGroup';

export enum Level {
    UNSET = -1,
    SILVER1 = 0,
    SILVER2 = 1,
    SILVER3 = 2,
    SILVER4 = 3,
    SILVERELITE = 4,
    SILVERELITEMASTER = 5,
    GOLDNOVA1 = 6,
    GOLDNOVA2 = 7,
    GOLDNOVA3 = 8,
    GOLDNOVAMASTER = 9,
    MASTERGUARDIAN1 = 10,
    MASTERGUARDIAN2 = 11,
    MASTERGUARDIANELITE = 12,
    DESTINGUISHEDMASTERGUARDIAN = 13,
    LEGENDARYEAGLE = 14,
    LEGENDARYEAGLEMASTER = 15,
    SUPREMEMASTERFIRSTCLASS = 16,
    GLOBALELITE = 17
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