
// store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoggedIn: false,
    reader: null,
  },
  
  mutations: {
    setLoginState(state, payload) {
      state.isLoggedIn = payload.isLoggedIn;
      state.reader = payload.reader;
    },

    logout(state) {
      state.isLoggedIn = false;
      state.reader = null;
    },
  },

  actions: {
    login({ commit }, reader) {
      commit('setLoginState', { isLoggedIn: true, reader });
    },

    logout({ commit }) {
      commit('logout');
    },
  },
});
