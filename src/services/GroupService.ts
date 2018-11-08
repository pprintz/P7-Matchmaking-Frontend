import axios from 'axios'


export default class GroupService{
    public static createGroup(group) {
        return axios.post(process.env.REACT_APP_API_URL + "/groups/create", group);
    }
}