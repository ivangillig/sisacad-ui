import clienteAxios from '../../config/axios';

export const getLevels = async () => {
  const response = await clienteAxios.get('/api/secretaria/nivel/');
  return response;
}

export const newLevel = async (level) => {
  const response = await clienteAxios.post('/api/secretaria/nivel/', level);
  return response;
}

export const updateLevel = async (id, level) => {
  const response = await clienteAxios.put(`/api/secretaria/nivel/${id}/`, level);
  return response;
}

export const deleteLevel = async (id) => {
  const response = await clienteAxios.delete(`/api/secretaria/nivel/${id}/`);
  return response;
}

export const deleteMultipleLevels = async (levelList) => {
  const response = await clienteAxios.post('/api/secretaria/nivel/delete_multiple/', { level_ids: levelList })
  return response;
}