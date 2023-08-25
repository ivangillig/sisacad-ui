import CourseStudentService from '../../src/service/Secretaria/CurseByYear';
import AdminService from '../../src/service/Secretaria/AdminService';

const state = {
    grade: {
        id: null,
    },
    grades: [],
    studentsByGrade: [],
};

const getters = {
    //getGradeData: (state) => state.student,
    getStudentsByGrade: (state) => state.studentsByGrade,
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
    setGradesData(state, grades) {
        state.grades = grades;
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
