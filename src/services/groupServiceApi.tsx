import axios from "axios";

import {GroupService} from "./interfaces";

export class GroupServiceApi implements GroupService{
    public async leaveGroup(groupId : string, userId : string) : Promise<boolean>{
        // Axios Request - Takes a group_id and user_id
        const request = axios.post("/groups/leave", {
                "group_id": groupId,
                "user_id": userId
            });
        
        // The request data is being processed - Returns true if the data is modified, else false
        return await request
        .then((response) => {
            if(response.data.nModified === 1){
                return true;
            }else{
                return false;
            }
        })
        .catch((e) => {
            return false
        });
    }
    
    public async createGroup(group : any) {
        return axios.post("/groups/create", group);
    }
}