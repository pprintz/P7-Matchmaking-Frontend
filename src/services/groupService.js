import axios from 'axios'

export default class GroupService {

    static createGroup(group) {
        return axios.post("/groups", group);
    }

    updateGroupDB() {
        axios.post()
    }
    deleteGroupDB() {
        axios.delete()
    }
    getGroupDB() {
        axios.get()
    }

}