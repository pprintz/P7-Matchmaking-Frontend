import axios from "axios";

import { GroupService, IGame, GroupResponse, IGroup } from "./interfaces";

export class GroupServiceApi implements GroupService{
    public async getGroupById(groupId: string) : Promise<IGroup | boolean> {
        try {
            const result = await axios.get(process.env.REACT_APP_API_URL + `/api/groups/` + groupId);

            return result.data;
        }catch(error){
            console.log(error);
        }

        return false;
    }

    public async getAllGroups() : Promise<IGroup[] | boolean>{
        try{
            const result = await axios.get(process.env.REACT_APP_API_URL + "/api/groups");
        
            return result.data;
        }catch(error){
            console.log(error);
        }

        return false;
        
    }

    public async leaveGroup(groupId : string, userId : string) : Promise<GroupResponse | boolean>{
        try {
            // Axios Request - Takes a group_id and user_id
            const request = await axios.post(process.env.REACT_APP_API_URL + "/api/groups/leave", {
                "group_id": groupId,
                "user_id": userId
            });

            console.log(request);

            return request.data;
        } catch (error) {
            return false;
        }
    }

    public async deleteGroup(groupId : string) : Promise<IGroup | boolean>{
        console.log("true");
        try{
            console.log("PATH:", process.env.REACT_APP_API_URL + "/api/groups/remove");
            const request = await axios.post(process.env.REACT_APP_API_URL + "/api/groups/remove", {
                "group_id": groupId
            });

            console.log(request.data);
            return request.data;
        }catch(error){
            console.log("Error:", error);
            return false;
        }
    }

    public async createGroup(group : IGroup) {
        return axios.post(process.env.REACT_APP_API_URL + "/api/groups/create", group); 
    }

    public async getGameList(): Promise<IGame[]> {
        const request = await axios.get(process.env.REACT_APP_API_URL + "/api/groups/game");

        const games: IGame[] = [];
        request.data.forEach(game => {
            games.push(game);
        });

        return games;
    }
}
