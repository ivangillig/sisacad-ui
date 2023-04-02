import clienteAxios from '../../config/axios';

export const getPerson = async (id) => {
  const response = await clienteAxios.get(`/api/administracion/person/${id}/`);
  return response;
}

export const getPersonEmail = async (email) => {
    const response = await clienteAxios.post('/api/administracion/checkemail/', email);
    return response;
}

