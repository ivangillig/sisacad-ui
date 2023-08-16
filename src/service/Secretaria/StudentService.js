import clienteAxios from '../../config/axios';

export const newStudent = async (student) => {
    const response = await clienteAxios.post('/api/secretaria/alumno/', student);
    return response;
}

export const getStudents = async () => {
    const response = await clienteAxios.get('/api/secretaria/alumno/');
    return response.data;
}

export const deleteStudent = async (id) => {
    const response = await clienteAxios.delete(`/api/secretaria/alumno/${id}/`);
    return response;
}

export const deleteMultipleStudents = async  (studentsList) => {
    const response = await clienteAxios.post('/api/secretaria/alumno/delete_multiple/', { students_ids: studentsList })
    return response;
}

export const createNewPaymentAndPaymentStudent = async (formData) => {
    const response = await clienteAxios.post('/api/pagos-completos/', formData);
    return response;
}
