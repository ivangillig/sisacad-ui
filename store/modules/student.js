import CourseStudentService from '../../src/service/Secretaria/CurseByYear';
import adminService from '../../src/service/Secretaria/AdminService';
import CountryService from '../../src/service/CountryService';

const state = {
    student: {
        id: null,
        confirmation: {},
        nationality: null,
    },
    studentsByGrade: [],
    paymentsByStudent: [],
    studentInfo: {
        personal: {},
        institutional: {},
        medAuth: {},
    },
    countries: [],
};

const getters = {
    getStudentData: (state) => state.student,
    getStudentsByGrade: (state) => state.studentsByGrade,
    getPaymentsByStudent: (state) => state.paymentsByStudent,
};

const actions = {
    async loadStudentsForCourse({ commit }, courseId) {
        let service = new CourseStudentService();
        try {
            let response = await service.getStudentsInCourse(courseId);
            let students = response.data.map(student => ({
                document: student.student.doc_number,
                name: `${student.student.first_name} ${student.student.first_lastname}`,
                created_at: student.add_date,
            }));
            commit('setStudentsByGrade', students);
        } catch (error) {
            console.error('Error al obtener los estudiantes del curso:', error);
        }
    },
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
        state.student = payload
    },
    clearStudent(state) {
        state.student = {};
    },
    clearPayments(state) {
        state.paymentsByStudent = [];
    },
    setStudentsByGrade(state, students) {
        state.studentsByGrade = students;
    },
    setPaymentsByStudent(state, payments) {
        state.paymentsByStudent = payments;
    },
    SET_PERSONAL_INFO(state, payload) {
        state.studentInfo.personal = payload;
    },
    SET_INSTITUTIONAL_INFO(state, payload) {
        state.studentInfo.institutional = payload;
    },
    SET_MEDAUTH_INFO(state, payload) {
        state.studentInfo.medAuth = payload;
    },
    SET_CONFIRMATION_INFO(state, payload) {
        state.studentInfo.confirmation = payload;
    },
    SET_COUNTRIES(state, countries) {
        state.countries = countries;
    },
    SET_NATIONALITY(state, code) {
        state.studentInfo.nationality = code;
    },
    SET_GENDER(state, value) {
        state.studentInfo.gender = value;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
