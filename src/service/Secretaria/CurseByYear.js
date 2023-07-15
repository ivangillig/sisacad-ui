// import axios from 'axios';
import clienteAxios from '../../config/axios'

export default class CourseStudentService {

    // Method to get all Course_Student
    getAllCourseStudents() {
        return clienteAxios.get('/api/secretaria/curso_alumno/');
    }

    // Method to get details of a specific Course_Student
    getCourseStudentDetail(id) {
        return clienteAxios.get(`/api/secretaria/curso_alumno/${id}/`);
    }

    // Method to create a new Course_Student
    createCourseStudent(courseStudent) {
        return clienteAxios.post('/api/secretaria/curso_alumno/', courseStudent);
    }

    // Method to update an existing Course_Student
    updateCourseStudent(id, courseStudent) {
        return clienteAxios.put(`/api/secretaria/curso_alumno/${id}/`, courseStudent);
    }

    // Method to delete a Course_Student
    deleteCourseStudent(id) {
        return clienteAxios.delete(`/api/secretaria/curso_alumno/${id}/`);
    }

    // Method to get all students in a specific course
    getStudentsInCourse(course_id) {
        return clienteAxios.get(`/api/secretaria/curso_alumno/curso/${course_id}/`);
    }
}
