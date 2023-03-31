import clienteAxios from '../../config/axios';

export const getGrades = async () => {
  const response = await clienteAxios.get('/api/secretaria/grado/');
  return response;
}

export const newGrade = async (grade) => {
  const response = await clienteAxios.post('/api/secretaria/grado/create_grade/', grade);
  return response;
}

export const updateGrade = async (id, grade) => {
  const response = await clienteAxios.put(`/api/secretaria/grado/${id}/`, grade);
  return response;
}

export const deleteGrade = async (id) => {
  const response = await clienteAxios.delete(`/api/secretaria/grado/${id}/`);
  return response;
}

export const deleteMultipleGrades = async (gradeList) => {
  const response = await clienteAxios.post('/api/secretaria/grado/delete_multiple/', { grade_ids: gradeList })
  return response;
}