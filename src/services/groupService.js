import axios from 'axios'

export default class GroupService {

    //TODO: Implement these CRUD methods
    static createGroup(group) {
        console.log(group);
        axios.post("/groups", group);
    }

    static setupDefaults() {
        axios.defaults.baseURL = "http://localhost:3000";
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