import axios from "axios";

export class LeaveGroupService {
    private groupId: string;
    private userId: string;
    
    constructor(groupId: string, userId: string){
        this.groupId = groupId;
        this.userId = userId;
    }

    public async leaveGroup() : Promise<boolean>{
        // Axios Request - Takes a group_id and user_id
        const request = axios.post("http://www.localhost:3000/groups/leave", {
                "group_id": this.groupId,
                "user_id": this.userId
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
}