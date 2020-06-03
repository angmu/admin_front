import axios from 'axios';

const FRONT_SERVICE_URL = "http://localhost:8181/";

class ApiService{
    fetchUsers(){
        return axios.get(FRONT_SERVICE_URL+"admin/mlist");
    }
}

export default new ApiService();