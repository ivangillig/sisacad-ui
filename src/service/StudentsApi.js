// import axios from 'axios';
import clienteAxios from "../config/axios";

export default class StudentsApi {

    // getProductsSmall() {
    //     return clienteAxios.get('assets/demo/data/products-small.json').then(res => res.data.data);
    // }

    getStudents() {
        return clienteAxios.get('/alumno/').then(res => res.data);
    }

    newStudent(student) {
        return clienteAxios.post('/alumno/', student);
    }

    updateStudent(id, student) {
        return clienteAxios.put(`/alumno/${id}/`, student);
    }

    deleteStudent(id) {
        return clienteAxios.delete(`/alumno/${id}/`);
    }

    // getProductsWithOrdersSmall() {
    //     return clienteAxios.get('assets/demo/data/products-orders-small.json').then(res => res.data.data);
    // }
}