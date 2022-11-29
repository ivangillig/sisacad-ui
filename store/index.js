import { createStore } from 'vuex'

export default createStore({
    state: {
        token: '',
        isAuthenticated: false,
        student: {}
    },
    mutations: {
        initializeStore(state){
            if (localStorage.getItem('token')){
                state.token = localStorage.getItem('token')
                state.isAuthenticated = true
            } else {
                state.token = ''
                state.isAuthenticated = false
            }
        },
        setToken(state,token){
            state.token = token
            state.isAuthenticated = true
        },
        removeToken(state){
            localStorage.clear()
            state.token = ''
            state.isAuthenticated = false
        },
        studentData (state, payload) {
            state.student = payload
          }
        
    },
    actions: {

    },
    modules: {

    },
})