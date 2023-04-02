import clienteAxios from '../../config/axios';

export const newStudent = async (student) => {
    const response = await clienteAxios.post('/api/secretaria/alumno/', student);
    return response;
}
   
