// import axios from 'axios';
import clienteAxios from "../config/axios";

export default class AdministracionApi {

    getProductsSmall() {
        return clienteAxios.get('assets/demo/data/products-small.json').then(res => res.data.data);
    }

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

    getProductsWithOrdersSmall() {
        return clienteAxios.get('assets/demo/data/products-orders-small.json').then(res => res.data.data);
    }
}