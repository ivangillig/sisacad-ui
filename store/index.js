// index.js
import { createStore } from 'vuex';
import auth from './modules/auth';
import student from './modules/student';
import course from './modules/course';
import grade from './modules/grade';
import person from './modules/person';
import payment from './modules/payment';

export default createStore({
    modules: {
        auth,
        course,
        grade,
        payment,
        person,
        student,
    },
});
