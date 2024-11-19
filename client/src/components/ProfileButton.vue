<template>
  <div>
    <!-- Hiển thị nút Log in nếu chưa đăng nhập -->
    <router-link 
      v-if="!isLoggedIn" 
      class="" 
      :to="{ name: 'login' }"
    >
      Log in
    </router-link>

    <!-- Hiển thị nút Profile nếu đã đăng nhập -->
    <div 
      v-else 
      class="btn-group"
    >
      <button 
        type="button" 
        class="btn btn-secondary dropdown-toggle" 
        data-bs-toggle="dropdown" 
        aria-expanded="false"
      >
        {{ reader.name }}
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li>
          <button 
            class="dropdown-item text-danger" 
            @click="logout"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from '../config/axios.config';

export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    reader() {
      return this.$store.state.reader;
    },
  },

  methods: {
    async logout() {
      try {
        const response = await axios.post('/auth/logout');

        if (response.status === 200) {
          // Gọi Vuex action để cập nhật trạng thái
          this.$store.dispatch('logout');
          this.$router.push({ name: 'home' });
        } else {
          console.error('Logout failed:', response.data.message || 'Unknown error');
        }
      } catch (error) {
        console.error('Error logging out:', error.response?.data?.message || error.message);
      }
    },
  },
};
</script>
