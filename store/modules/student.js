import adminService from '../../src/service/Secretaria/AdminService';
import { getCurrentCourse } from '../../src/service/Secretaria/StudentService';

const state = {
    student: {
        id: null,
        confirmation: {},
        nationality: null,
        trips_auth: false,
        medical_auth: false,
        public_auth: false,
        leave_auth: false,
    },
    currentCourse: null,
    students: {},
    countries: [],
};

const getters = {
    getStudent: (state) => {
        return state.student;
    },
    fullName: (state) => {
        let parts = [];
        if (state.student.first_name) parts.push(state.student.first_name);
        if (state.student.middle_name) parts.push(state.student.middle_name);
        if (state.student.first_lastname) parts.push(state.student.first_lastname);
        if (state.student.second_lastname) parts.push(state.student.second_lastname);
        return parts.join(' ');
    },
    currentCourseDescription: (state) => {
        let parts = [];
        if (state.currentCourse?.name) parts.push(state.currentCourse.name);
        if (state.currentCourse?.division) parts.push(`"${state.currentCourse.division}"`);
        if (state.currentCourse?.level) parts.push(state.currentCourse.level);
        return parts.join(' - ');
    }
};

const actions = {
    async getStudents({ commit }) {
        let service = new adminService();
        try{
            const response = await service.getStudents();
            let students = response.map(student => ({
                id: student.id,
                name: `${student.first_name} ${student.first_lastname}`,
            }));
            commit('setStudents', students);
        } catch (error) {
            console.error('Error al obtener los pagos del estudiante:', error);
        }
    },
    async checkStudentByDNI(dni) {
        try {
            const response = await adminService.getPerson(dni);
            return response.data.success;
        } catch (error) {
          // Manejar errores
        }
    },
    async getCurrentCourseByStudent({commit}, id) {
        try{
            const response = await getCurrentCourse(id);

            let courseData = response.data.course;
            let course = {
                academic_year: courseData.academic_year,
                name: courseData.grade.name,
                division: courseData.grade.division,
                level: courseData.grade.level,
                speciality: courseData.grade.speciality,
                shift: courseData.shift,
            };
            commit('SET_CURRENT_COURSE_DATA', course);
        } catch (error) {
            commit('CLEAR_CURRENT_COURSE_DATA');
        }
    },
    setStudentData({ commit }, student) {
        commit('SET_STUDENT_DATA', student)
    },
    updatePersonalInfo({ commit }, info) {
        commit('SET_PERSONAL_INFO', info);
    },
    updateInstitutionalInfo({ commit }, info) {
        commit('SET_INSTITUTIONAL_INFO', info);
    },
    updateMedAuthInfo({ commit }, info) {
        commit('SET_MEDAUTH_INFO', info);
    },
    updateConfirmationInfo({ commit }, info) {
        commit('SET_CONFIRMATION_INFO', info);
    }
};

const mutations = {
    SET_STUDENT_DATA (state, payload) {
        state.student = { ...state.student, ...payload }
    },
    setStudents (state, students) {
        state.students = students;
    },
    clearStudent(state) {
        state.student = {};
    },
    SET_CURRENT_COURSE_DATA (state, payload) {
        state.currentCourse = { ...state.currentCourse, ...payload}
    },
    CLEAR_CURRENT_COURSE_DATA (state) {
        state.currentCourse = null;
    },
    SET_CONFIRMATION_INFO(state, payload) {
        state.studentInfo.confirmation = payload;
    },
    SET_NATIONALITY(state, code) {
        state.student.nationality = code;
    },
    SET_GENDER(state, value) {
        state.student.gender = value;
    },
    UPDATE_STUDENT_FIELD(state, { field, value }) {
        // eslint-disable-next-line no-prototype-builtins
        if (state.student.hasOwnProperty(field)) {
            state.student[field] = value;
        }
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
