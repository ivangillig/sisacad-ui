import clienteAxios from '../../config/axios';

export const getDivisions = async () => {
  const response = await clienteAxios.get('/api/secretaria/division/');
  return response;
}

export const newDivision = async (division) => {
  const response = await clienteAxios.post('/api/secretaria/division/', division);
  return response;
}

export const updateDivision = async (id, division) => {
  const response = await clienteAxios.put(`/api/secretaria/division/${id}/`, division);
  return response;
}

export const deleteDivision = async (id) => {
  const response = await clienteAxios.delete(`/api/secretaria/division/${id}/`);
  return response;
}

export const deleteMultipleDivisions = async (divisionList) => {
  const response = await clienteAxios.post('/api/secretaria/division/delete_multiple/', { division_ids: divisionList })
  return response;
}