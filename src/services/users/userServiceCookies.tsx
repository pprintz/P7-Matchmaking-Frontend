import Cookies from "universal-cookie";

import {User} from "./user";

export class UserServiceCookies {
    private cookies : Cookies;

    private groupId : string;
    private userId : string;
    
    constructor(){
        // Get the information form the existing cookies
        this.cookies = new Cookies();

        this.groupId = this.cookies.get("group_id");
        this.userId = this.cookies.get("user_id");
    }
    
    public getUserInfo() : User {
        return new User(this.groupId, this.userId);
    }

    public setUserInfo(groupId: string, userId: string) : void {
        this.cookies.set("group_id", groupId);
        this.cookies.set("user_id", userId);
    }
}