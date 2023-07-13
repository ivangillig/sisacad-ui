import clienteAxios from '../../config/axios';

export const getCourses = async () => {
  const response = await clienteAxios.get('/api/secretaria/curso/');
  return response;
}

export const newCourse = async (course) => {
  const response = await clienteAxios.post('/api/secretaria/curso/create_course/', course);
  return response;
}

export const updateCourse = async (id, course) => {
  const response = await clienteAxios.put(`/api/secretaria/curso/${id}/`, course);
  return response;
}

export const deleteCourse = async (id) => {
  const response = await clienteAxios.delete(`/api/secretaria/curso/${id}/`);
  return response;
}

export const deleteMultipleCourses = async (courseList) => {
  const response = await clienteAxios.post('/api/secretaria/curso/delete_multiple/', { course_ids: courseList })
  return response;
}
