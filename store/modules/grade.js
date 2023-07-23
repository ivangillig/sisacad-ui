import AdminService from '../../src/service/Secretaria/AdminService';

const state = {
    grade: {
        id: null,
    },
    grades: [],
};

const getters = {
    //getGradeData: (state) => state.student,
};

const actions = {
    async getGrades({ commit }) {
        let service = new AdminService();
        try {
            let response = await service.getGrades();
            let grade = response.data.map(grade => ({
                id: grade.id,
                name: grade.name,
                created_date: grade.created_date,
                division: grade.division,
                level: grade.level,
                speciality: grade.speciality,
                largeName: `${grade.name} ${grade.level} - División: ${grade.division}`
            }));
            commit('setGradesData', grade);
        } catch (error) {
            console.error('Error al obtener los grados:', error);
        }
    },
};

const mutations = {
    setGradesData(state, grades) {
        state.grades = grades;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
