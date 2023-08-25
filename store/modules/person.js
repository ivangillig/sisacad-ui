import AdminService from '../../src/service/Secretaria/AdminService';

const state = {
    personData: null,
};

const getters = {
    getPersonData: (state) => state.personData,
};

const actions = {
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
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};