// import axios from 'axios';
import clienteAxios from '../config/axios'


export default class AdminService {


    getNiveles() {
        return clienteAxios.get('/administracion/nivel/').then(res => res.data);
    }

    newNivel(nivel) {
        return clienteAxios.post('/administracion/nivel/', nivel);
    }

    updateNivel(id, nivel) {
        return clienteAxios.put(`/administracion/nivel/${id}/`, nivel);
    }

    deleteNivel(id) {
        return clienteAxios.delete(`/administracion/nivel/${id}/`);
    }

    newStudent(student) {
        return clienteAxios.post('/secretaria/alumno/', student);
    }

}