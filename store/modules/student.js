import CourseStudentService from '../../src/service/Secretaria/CurseByYear';

const state = {
    student: {
        id: null,
    },
    studentsByGrade: [],
};

const getters = {
    getStudentData: (state) => state.student,
    getStudentsByGrade: (state) => state.studentsByGrade,
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
};

export default {
    state,
    getters,
    actions,
    mutations,
};
