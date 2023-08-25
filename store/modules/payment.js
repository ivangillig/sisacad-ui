import adminService from '../../src/service/Secretaria/AdminService';

const state = {
    paymentsByStudent: [],
};

const getters = {
    getPaymentsByStudent: (state) => state.paymentsByStudent,
};

const actions = {
    async loadPaymentsByStudent({ commit }, studentId) {
        let service = new adminService();
        const filePrefix = process.env.VUE_APP_FILE_PREFIX || 'http://localhost:8000';
        try {
            let response = await service.getPaymentsByStudent(studentId);
            let students = response.data.map(item => ({
                id: item.id,
                student: `${item.student_details.first_name} ${item.student_details.first_lastname}`,
                created_at: item.created_date,
                payment: {
                    ...item.payment_details,
                    file: filePrefix + item.payment_details.file
                }
            }));
            commit('setPaymentsByStudent', students);
        } catch (error) {
            console.error('Error al obtener los pagos del estudiante:', error);
        }
    },
};

const mutations = {
    clearPayments(state) {
        state.paymentsByStudent = [];
    },
    setPaymentsByStudent(state, payments) {
        state.paymentsByStudent = payments;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
