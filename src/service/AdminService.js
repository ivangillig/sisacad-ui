// import axios from 'axios';
import clienteAxios from '../config/axios'


export default class AdminService {


    getNiveles() {
        return clienteAxios.get('/secretaria/nivel/').then(res => res.data);
    }

    newNivel(nivel) {
        return clienteAxios.post('/secretaria/nivel/', nivel);
    }

    updateNivel(id, nivel) {
        return clienteAxios.put(`/secretaria/nivel/${id}/`, nivel);
    }

    deleteNivel(id) {
        return clienteAxios.delete(`/secretaria/nivel/${id}/`);
    }

    newStudent(student) {
        return clienteAxios.post('/secretaria/alumno/', student);
    }


    // API Persons
    getPerson(id) {
        return clienteAxios.get(`/secretaria/person/${id}/`).then(res => res);
    }

    getPersonEmail(email) {
        return clienteAxios.post('/secretaria/checkemail/', email).then(res => res);
    }


}