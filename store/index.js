// index.js
import { createStore } from 'vuex';
import auth from './modules/auth';
import student from './modules/student';
import course from './modules/course';
import grade from './modules/grade';
import person from './modules/person';

export default createStore({
    modules: {
        auth,
        student,
        course,
        grade,
        person
    },
});
