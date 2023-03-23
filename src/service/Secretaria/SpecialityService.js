import clienteAxios from '../../config/axios';

export const getSpecialities = async () => {
  const response = await clienteAxios.get('/api/secretaria/modalidad/');
  return response;
}

export const newSpeciality = async (speciality) => {
  const response = await clienteAxios.post('/api/secretaria/modalidad/', speciality);
  return response;
}

export const updateSpeciality = async (id, speciality) => {
  const response = await clienteAxios.put(`/api/secretaria/modalidad/${id}/`, speciality);
  return response;
}

export const deleteSpeciality = async (id) => {
  const response = await clienteAxios.delete(`/api/secretaria/modalidad/${id}/`);
  return response;
}

export const deleteMultipleSpecialities = async (specialityList) => {
  const response = await clienteAxios.post('/api/secretaria/modalidad/delete_multiple/', { speciality_ids: specialityList })
  return response;
}