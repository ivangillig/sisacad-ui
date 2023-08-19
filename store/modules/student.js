import CourseStudentService from '../../src/service/Secretaria/CurseByYear';
import adminService from '../../src/service/Secretaria/AdminService';

const state = {
    student: {
        id: null,
    },
    studentsByGrade: [],
    paymentsByStudent: []
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
        try {
            let response = await service.getPaymentsByStudent(studentId);
            let students = response.data.map(item => ({
                id: item.id,
                student: `${item.student.first_name} ${item.student.first_lastname}`,
                created_at: item.created_date,
                payment: item.payment
            }));
            commit('setPaymentsByStudent', students);
        } catch (error) {
            console.error('Error al obtener los pagos del estudiante:', error);
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
    setStudentsByGrade(state, students) {
        state.studentsByGrade = students;
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
