
// store/index.js
import { createStore } from 'vuex';
import axios from '../config/axios.config';

export default createStore({
  state: {
    isLoggedIn: false,
    reader: null,
    favorites: [],
  },
  
  mutations: {
    async setLoginState(state, payload) {
      state.isLoggedIn = payload.isLoggedIn;
      state.reader = payload.reader;

      const response = await axios.get(`/readers/favorite/${ state.reader.index }`);
      if(response.data.success) {
        state.favorites = response.data.data;
      }
      else {
        console.log('response error:', response.data.message);
        state.favorites = [];
      }
    },

    logout(state) {
      state.isLoggedIn = false;
      state.reader = null;
    },

    updateFavorites(state, favorites) {
      if (state.reader) {
        state.favorites = favorites; // Cập nhật danh sách yêu thích mới
      }
    },
  },

  actions: {
    login({ commit }, reader) {
      commit('setLoginState', { isLoggedIn: true, reader });
    },

    logout({ commit }) {
      commit('logout');
    },

    async toggleFavorites({ commit, state }, bookId) {
      if (!state.isLoggedIn || !state.reader) {
        return;
      }

      const { index } = state.reader;

      let isFavorite = false;
      state.favorites.forEach((item) => { 
        if(item._id == bookId) isFavorite = true; 
      });

      try {
        // Nếu đã yêu thích, gọi API xóa khỏi danh sách yêu thích
        if (isFavorite) {
          console.log(`delete ${bookId}`);
          await axios.delete(`/readers/favorite/${index}/${bookId}`);
        } 
        // Nếu chưa yêu thích, gọi API thêm vào danh sách yêu thích
        else {
          console.log(`add ${bookId}`);
          await axios.post(`/readers/favorite/${index}`, { bookId });
        }

        // Lấy lại danh sách yêu thích mới từ server và cập nhật vào state
        const response = await axios.get(`/readers/favorite/${index}`);
        commit('updateFavorites', response.data.data); // Cập nhật danh sách yêu thích mới
      } 
      catch (error) {
        console.error('Failed to toggle favorite:', error);
      }
    },
  },
});
