import axios from "axios";

const state = {
  token: '',
  isAuthenticated: false,
  user: null,
  posts: null,
};

const getters = {
  isAuthenticated: (state) => state.isAuthenticated,
  StatePosts: (state) => state.posts,
  StateUser: (state) => state.user,
  Token: (state) => state.token,
};

const actions = {
  async Register({dispatch}, form) {
    await axios.post('register', form)
    let UserForm = new FormData()
    UserForm.append('username', form.username)
    UserForm.append('password', form.password)
    await dispatch('LogIn', UserForm)
  },

  async LogIn({commit}, user) {
    await axios.post("login", user);
    await commit("setUser", user.get("username"));
  },

  async CreatePost({ dispatch }, post) {
    await axios.post("post", post);
    return await dispatch("GetPosts");
  },

  async GetPosts({ commit }) {
    let response = await axios.get("posts");
    commit("setPosts", response.data);
  },

  async LogOut({ commit }) {
    let user = null;
    commit("logout", user);
  },

  initializeStore({commit}) {
    if (localStorage.getItem('token')){
      commit("setToken", localStorage.getItem('token'))
    } else {
      commit("removeToken")
    }
  }
};

const mutations = {
  setUser(state, username) {
    state.user = username;
  },

  setPosts(state, posts) {
    state.posts = posts;
  },

  logout(state) {
    localStorage.clear()
    state.user = null;
    state.token = '';
    state.isAuthenticated = false;
  },

  setToken(state,token){
    state.token = token
    state.isAuthenticated = true
  },

  removeToken(state){
    state.token = ''
    state.isAuthenticated = false
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};