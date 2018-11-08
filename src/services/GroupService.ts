import axios from 'axios'


export default class GroupService{
    public static createGroup(group) {
        return axios.post("http://localhost:3000/groups/create", group);
    }
}