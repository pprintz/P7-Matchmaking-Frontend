import { IUser, PersistentUserService } from "./interfaces"
import axios from 'axios';

export default class UserServiceApi implements PersistentUserService {
    public async getUserById(userId: string): Promise<IUser | boolean> {
        const request = await axios.get(process.env.REACT_APP_API_URL + `/api/users/${userId}`);
        return request.data;
    }
}