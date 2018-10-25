import Cookies from "universal-cookie";

import {User} from "./user";
import { UserService } from '../interfaces';

export class UserServiceCookies implements UserService{
    public groupId : string;
    public userId : string;
    private cookies : Cookies;

    
    constructor(){
        // Get the information form the existing cookies
        this.cookies = new Cookies();

        this.groupId = this.cookies.get("group_id");
        this.userId = this.cookies.get("user_id");
    }
    
    public getUserInfo() : User {
        return new User(this.groupId, this.userId);
    }

    public setUserId(userId: string): void {
        this.cookies.set("user_id", userId);
    }

    public setUserInfo(groupId: string, userId: string) : void {
        this.cookies.set("group_id", groupId);
        this.cookies.set("user_id", userId);
    }
}