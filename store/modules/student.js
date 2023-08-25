import adminService from '../../src/service/Secretaria/AdminService';
import CountryService from '../../src/service/CountryService';

const state = {
    studentData: {
        id: null,
        confirmation: {},
        nationality: null,
    },
    // studentInfo: {
    //     personal: {},
    //     institutional: {},
    //     medAuth: {},
    // },
    countries: [],
};

const getters = {
    getStudentData: (state) => state.studentData,
    mappedStudent: (state) => {
        return state.studentData;
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
        state.studentData = { ...state.studentData, ...payload }
    },
    clearStudent(state) {
        state.studentData = {};
    },
    // SET_PERSONAL_INFO(state, payload) {
    //     state.studentInfo.personal = payload;
    // },
    // SET_INSTITUTIONAL_INFO(state, payload) {
    //     state.studentInfo.institutional = payload;
    // },
    // SET_MEDAUTH_INFO(state, payload) {
    //     state.studentInfo.medAuth = payload;
    // },
    SET_CONFIRMATION_INFO(state, payload) {
        state.studentInfo.confirmation = payload;
    },
    SET_COUNTRIES(state, countries) {
        state.countries = countries;
    },
    SET_NATIONALITY(state, code) {
        state.studentData.nationality = code;
    },
    SET_GENDER(state, value) {
        state.studentData.gender = value;
    },
    UPDATE_STUDENT_FIELD(state, { field, value }) {
        // eslint-disable-next-line no-prototype-builtins
        if (state.studentData.hasOwnProperty(field)) {
            state.studentData[field] = value;
        }
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
