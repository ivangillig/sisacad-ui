// import axios from 'axios';
import clienteAxios from '../config/axios'


export default class AuthService {
    newUser(user) {
        return clienteAxios.post('/auth/registration/', user);
    }
}