import axios from 'axios'
c
const REST_URL = 'http://loalhost:8080';


class UserService{
    getUsers(){
        axios.get(REST_URL);
    }
}


export default new UserService();