// index.js
import { createStore } from 'vuex';
import auth from './modules/auth';
import student from './modules/student';

export default createStore({
    modules: {
        auth,
        student,
    },
});
