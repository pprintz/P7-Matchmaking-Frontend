import axios from "axios";

import {GroupService, GroupResponse, IGame} from "./interfaces";

export class GroupServiceApi implements GroupService{
    public async leaveGroup(groupId : string, userId : string) : Promise<boolean>{
        // Axios Request - Takes a group_id and user_id
        const request = axios.post("http://localhost:3000/groups/leave", {
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
    public async mergeGroups(fromGroupid: string, toGroupid:string): Promise<GroupResponse>{
        console.log("Inside mergeGroup service");
        const request = await axios.post("/groups/merge", {
            "from_id": fromGroupid,
            "to_id": toGroupid
        });
        //const result = await request.then((response) => {return response.data})
    console.log("Returned data: " + JSON.stringify(request));
        return request.data;
    }

    public async createGroup(group : any) {
        return axios.post("http://localhost:3000/groups", group); 
    }

    public async getGameList() : Promise<IGame[]>{
        const request = await axios.get("http://localhost:3000/groups/game");
        
        const games : IGame[] = [];
        request.data.forEach(game => {
            games.push(game);
        });

        return games;
    }
}
