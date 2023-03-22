import clienteAxios from '../config/axios';

export default class AdminService {
  async getLevels() {
    const response = await clienteAxios.get('/api/secretaria/nivel/');
    return response;
  }

  async newLevel(level) {
    const response = await clienteAxios.post('/api/secretaria/nivel/', level);
    return response;
  }

  async updateLevel(id, level) {
    const response = await clienteAxios.put(`/api/secretaria/nivel/${id}/`, level);
    return response;
  }

  async deleteLevel(id) {
    const response = await clienteAxios.delete(`/api/secretaria/nivel/${id}/`);
    return response;
  }

  async deleteMultipleLevels(levelList) {
    const response = await clienteAxios.post('/api/secretaria/nivel/delete_multiple/', { level_ids: levelList })
    return response;
  }

  async getDivisiones() {
    const response = await clienteAxios.get('/api/secretaria/division/');
    return response.data;
  }

  async newDivision(division) {
    const response = await clienteAxios.post('/api/secretaria/division/', division);
    return response;
  }

  async updateDivision(id, division) {
    const response = await clienteAxios.put(`/api/secretaria/division/${id}/`, division);
    return response;
  }

  async deleteDivision(id) {
    const response = await clienteAxios.delete(`/api/secretaria/division/${id}/`);
    return response;
  }

  async deleteMultipleDivisions(divisionList) {
    const response = await clienteAxios.post('/api/secretaria/division/delete_multiple/', { division_ids: divisionList })
    return response;
  }

  async newStudent(student) {
    const response = await clienteAxios.post('/api/secretaria/alumno/', student);
    return response;
  }

  async getPerson(id) {
    const response = await clienteAxios.get(`/api/administracion/person/${id}/`);
    return response;
  }

  async getPersonEmail(email) {
    const response = await clienteAxios.post('/api/administracion/checkemail/', email);
    return response;
  }
}