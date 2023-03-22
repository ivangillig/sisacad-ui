import clienteAxios from "../config/axios";

export default class StudentsApi {

  getStudents() {
    return clienteAxios.get('/api/alumnos/')
      .then(res => res.data);
  }

  async newStudent(student) {
    return clienteAxios.post('/secretaria/alumno/', student)
      .then(res => res.data);
  }

  async updateStudent(id, student) {
    return clienteAxios.put(`/secretaria/alumno/${id}/`, student)
      .then(res => res.data);
  }

  async deleteStudent(id) {
    return clienteAxios.delete(`/secretaria/alumno/${id}/`)
      .then(res => res.data);
  }


    // getProductsWithOrdersSmall() {
    //     return clienteAxios.get('assets/demo/data/products-orders-small.json').then(res => res.data.data);
    // }
}