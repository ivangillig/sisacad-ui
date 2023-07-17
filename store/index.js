// index.js
import { createStore } from 'vuex';
import auth from './modules/auth';
import student from './modules/student';
import course from './modules/course';

export default createStore({
    modules: {
        auth,
        student,
        course
    },
});
