import adminService from '../../src/service/Secretaria/AdminService';
import CountryService from '../../src/service/CountryService';

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
    students: {},
    countries: [],
};

const getters = {
    getStudent: (state) => {
        return state.student;
    },
};

const actions = {
    async fetchCountries({ commit }) {
        try {
            let service = new CountryService();
            const response = await service.getCountries();
            commit('SET_COUNTRIES', response);
        } catch (error) {
            console.error('Error al obtener los países:', error);
        }
    },
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
    setStudentData (state, payload) {
        state.student = { ...state.student, ...payload }
    },
    setStudents (state, students) {
        state.students = students;
    },
    clearStudent(state) {
        state.student = {};
    },
    SET_CONFIRMATION_INFO(state, payload) {
        state.studentInfo.confirmation = payload;
    },
    SET_COUNTRIES(state, countries) {
        state.countries = countries;
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
