import axios from 'axios'


export default class GroupService{
    public static createGroup(group) {
        return axios.post(process.env.API_URL + "/groups/create", group);
    }
}