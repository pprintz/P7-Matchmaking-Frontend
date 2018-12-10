import Cookies from "universal-cookie";

import { UserService } from './interfaces';
import { User } from 'src/models/User';
import { SharedContext } from 'src/models/SharedContext';

export class UserServiceCookies implements UserService {
    private cookies: Cookies;

    constructor() {
        // Get the information form the existing cookies
        this.cookies = new Cookies();
    }

    public isLoggedIn() : boolean {
        const abc = this.cookies.get("user");
        if (abc === undefined || abc === "" || abc == null) {
            return false
        }
        
        return true;
    }

    public getUserInfo(): User {
        const abc = this.cookies.get("user");
        if (abc === undefined || abc === "" || abc == null) {
            return new User("", "","","", "");
        }
        const user: User = this.cookies.get("user") as unknown as User;

        return user;
    }

    public setUserInfo(user: User, ctx: SharedContext): void {
        this.cookies.set("user", user);
        ctx.User = user;
    }

    public setUserOwnerGroup(groupId : string, ctx: SharedContext) : User {
        const abc = this.cookies.get("user");
        if (abc === undefined || abc === "" || abc == null) {
            return new User("", "", "", "", "");
        }
        const user: User = this.cookies.get("user") as unknown as User;
        user.ownerGroupId = groupId;
        this.cookies.set("user", user);
        ctx.User.ownerGroupId = groupId;

        return user;
    }

    public updateGroupIdUserInfo(groupId : string, ctx: SharedContext) : User {
        const u = this.cookies.get("user");
        if (u === undefined || u === "" || u == null) {
            return new User("", "","","", "");
        }
        const user: User = this.cookies.get("user") as unknown as User;
        user.groupId = groupId;
        this.cookies.set("user", user);
        ctx.User.groupId = groupId;

        return user;
    }
}