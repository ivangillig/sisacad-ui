// index.js
import { createStore } from 'vuex';
import auth from './modules/auth';
import student from './modules/student';
import course from './modules/course';
import grade from './modules/grade';

export default createStore({
    modules: {
        auth,
        student,
        course,
        grade
    },
});
