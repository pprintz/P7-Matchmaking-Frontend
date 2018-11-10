import {IUserServiceApi, IUser} from "./interfaces"
import axios from 'axios';

export default class UserServiceApi implements IUserServiceApi {
    public async getUserById(userId : string) : Promise<IUser | boolean>{
        try{
            const request = await axios.get(process.env.REACT_APP_API_URL + `/api/users/${userId}`);

            return request.data;
        }catch(error){
            console.log(error.message);
            return false;
        }
    }
}