import AdminService from '../../src/service/Secretaria/AdminService';

const state = {
    course: {
        id: null,
    },
    courses: [],
};

const getters = {
    getCourseData: (state) => state.student,
};

const actions = {
    async getCourses({ commit }) {
        let service = new AdminService();
        try {
            let response = await service.getCourses();
            let course = response.data.map(course => ({
                id: course.id,
                name: `${course.grade.name} - "${course.grade.division}"`,
                shift: course.shift,
                academic_year: course.academic_year,
                created_at: course.created_date,
            }));
            commit('setCoursesData', course);
        } catch (error) {
            console.error('Error al obtener los cursos:', error);
        }
    },
};

const mutations = {
    setStudentData (state, payload) {
        state.student = payload
    },
    clearStudent(state) {
        state.student = {};
    },
    setCoursesData(state, courses) {
        state.courses = courses;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
