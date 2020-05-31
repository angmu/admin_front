import axios from 'axios';

const FRONT_SERVICE_URL = "http://localhost:8080/list";

class ApiService{
    fetchUsers(){
        return axios.get(FRONT_SERVICE_URL);
    }
}

export default new ApiService();