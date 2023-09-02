import AdminService from '../../src/service/Secretaria/AdminService';
import CountryService from '../../src/service/CountryService';

const state = {
    personData: null,
};

const getters = {
    getPersonData: (state) => state.personData,
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
    // eslint-disable-next-line no-unused-vars
    async fetchPersonByDNI({ commit }, dni) {
        const service = new AdminService();
        try {
            const response = await service.getPerson(dni.replaceAll('.', ''));
            if (response && response.data.success) {
                commit('SET_PERSON_DATA', response.data);
            }else{
                commit('CLEAR_PERSON_DATA');
            }
        } catch (error) {
            console.error('Error al obtener datos de la persona:', error);
        }
    },
};

const mutations = {
    SET_PERSON_DATA(state, data) {
        state.personData = data;
    },
    CLEAR_PERSON_DATA(state) {
        state.personData = {};
    },
    SET_COUNTRIES(state, countries) {
        state.countries = countries;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};