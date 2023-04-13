import clienteAxios from "../config/axios";

export default class StudentsApi {

  async getStudents() {
    const response = await clienteAxios.get('/api/secretaria/alumno/');
    return response.data;
  }

  async deleteStudent(id) {
    const response = await clienteAxios.delete(`/api/secretaria/alumno/${id}/`);
    return response;
  }


    // getProductsWithOrdersSmall() {
    //     return clienteAxios.get('assets/demo/data/products-orders-small.json').then(res => res.data.data);
    // }
}