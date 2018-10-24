import axios from 'axios'

export default class GroupService {
    public static createGroup(group) {
        return axios.post("/groups", group);
    }
}