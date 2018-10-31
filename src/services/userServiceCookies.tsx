import Cookies from "universal-cookie";

import { UserService } from './interfaces';
import { User } from 'src/models/User';

export class UserServiceCookies implements UserService{
    private cookies : Cookies;

    
    constructor(){
        // Get the information form the existing cookies
        this.cookies = new Cookies();
    }
    
    public getUserInfo() : User {
        const groupId = this.cookies.get("group_id");
        const userId = this.cookies.get("user_id");
        return new User(groupId, userId);
    }

    public setUserId(userId: string): void {
        this.cookies.set("user_id", userId);
    }

    public setGroupId(groupId: string): void {
        this.cookies.set("group_id", groupId);
    }

    public setUserInfo(groupId: string, userId: string) : void {
        this.cookies.set("group_id", groupId);
        this.cookies.set("user_id", userId);
    }
}