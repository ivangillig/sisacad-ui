import AdminService from '../../src/service/Secretaria/AdminService';
import CourseStudentService from '../../src/service/Secretaria/CurseByYear';

const state = {
    course: {
        id: null,
    },
    courses: [],
    studentsByCourse: []
};

const getters = {
    getCourseData: (state) => state.course,
    getStudentsByCourse: (state) => state.studentsByCourse,

};

const actions = {
    async getCourses({ commit }, year = null) {
        let service = new AdminService();
        try {
            let response = await service.getCourses(year);
            let course = response.data.map(course => ({
                id: course.id,
                name: `${course.grade.name} "${course.grade.division}"${course.grade.speciality !== 'No aplica' ? ' - ' + course.grade.speciality : ''}`,
                shift: course.shift,
                academic_year: course.academic_year,
                created_at: course.created_date,
            }));
            commit('setCoursesData', course);
        } catch (error) {
            console.error('Error al obtener los cursos:', error);
        }
    },
    async loadStudentsForCourse({ commit }, courseId) {
        let service = new CourseStudentService();
        try {
            let response = await service.getStudentsInCourse(courseId);
            let students = response.data.map(student => ({
                document: student.student.doc_number,
                name: `${student.student.first_name} ${student.student.first_lastname}`,
                created_at: student.add_date,
            }));
            commit('setStudentsByCourse', students);
        } catch (error) {
            console.error('Error al obtener los estudiantes del curso:', error);
        }
    },
};

const mutations = {
    setCoursesData(state, courses) {
        state.courses = courses;
    },
    setStudentsByCourse(state, students) {
        state.studentsByCourse = students;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
