import clienteAxios from '../../config/axios';

export const newStudent = async (student) => {
    const response = await clienteAxios.post('/api/secretaria/alumno/', student);
    return response;
}

export const editStudent = async (student) => {
    const response = await clienteAxios.put(`/api/secretaria/alumno/${student.id}/`, student);
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

export const generateRegularCertificate = async (formData) => {
    const response = await clienteAxios.post('/api/secretaria/alumno/generate_regular_certificate/', formData);
    return response;
}

export const getPaymentsByStudent = async (studentId) => {
    const response = await clienteAxios.get(`/api/pagos-completos/payments_by_student/?student_id=${studentId}`);
    return response;
}

export const getCurrentCourse = async (studentId) => {
    const response = await clienteAxios.get(`/api/secretaria/curso_alumno/current_course/${studentId}/`);
    return response;
}