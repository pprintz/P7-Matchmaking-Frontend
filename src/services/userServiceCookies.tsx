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
        const abc = this.cookies.get("user");
        if (abc === undefined || abc === "" || abc == null) {
            return new User("", "","","", "");
        }
        const user: User = this.cookies.get("user") as unknown as User;

        return user;
    }

    public setUserInfo(user: User) : void {
        this.cookies.set("user", user);
    }

    public setUserOwnerGroup(groupId : string) : User {
        const abc = this.cookies.get("user");
        if (abc === undefined || abc === "" || abc == null) {
            return new User("", "", "", "", "");
        }
        const user: User = this.cookies.get("user") as unknown as User;
        user.ownerGroupId = groupId;
        this.cookies.set("user", user);

        return user;
    }

    public updateGroupIdUserInfo(groupId : string) : User {
        const abc = this.cookies.get("user");
        if (abc === undefined || abc === "" || abc == null) {
            return new User("", "","","", "");
        }
        const user: User = this.cookies.get("user") as unknown as User;
        user.groupId = groupId;
        this.cookies.set("user", user);

        return user;
    }
}