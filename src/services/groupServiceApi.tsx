import axios from "axios";
import {GroupService, IGame, GroupResponse, IGroup} from "./interfaces";


export class GroupServiceApi implements GroupService{
    public async leaveGroup(groupId : string, userId : string) : Promise<GroupResponse | boolean>{
        try{
            // Axios Request - Takes a group_id and user_id
            const request = await axios.post(process.env.REACT_APP_API_URL + "/api/groups/leave", {
                "group_id": groupId,
                "user_id": userId
            });
            
            console.log(request);

            return request.data;
        }catch(error){
            return false;
        }
    }

    public async mergeGroups(fromGroupid: string, toGroupid:string): Promise<GroupResponse>{
        console.log("Inside mergeGroup service");
        const request = await axios.post(process.env.REACT_APP_API_URL + "/api/groups/merge", {
            "from_id": fromGroupid,
            "to_id": toGroupid
        });
        //const result = await request.then((response) => {return response.data})
    console.log("Returned data: " + JSON.stringify(request));
        return request.data;
    }

   

    public async createGroup(group : IGroup) {
        return axios.post(process.env.REACT_APP_API_URL + "/api/groups/create", group); 

    }

    public async getGameList() : Promise<IGame[]>{
        console.log("i'm in game api call");
        const request = await axios.get(process.env.REACT_APP_API_URL + "/api/groups/game");
        
        const games : IGame[] = [];
        request.data.forEach(game => {
            games.push(game);
        });
        console.log("gameresults", games);
        return games;
    }
}
