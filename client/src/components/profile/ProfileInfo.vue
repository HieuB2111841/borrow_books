<template>
  <div class="p-3">
    <h2 class="text-center mb-4">
      Thông tin cá nhân
    </h2>
    
    <!-- Hiển thị loading khi đang tải dữ liệu -->
    <div 
      v-if="loading" 
      class="text-center"
    >
      <p>Loading...</p>
    </div>

    <!-- Hiển thị thông báo lỗi nếu không lấy được thông tin -->
    <div v-else-if="error" class="text-center text-danger">
      <p>{{ error }}</p>
    </div>

    <!-- Hiển thị thông tin người dùng nếu có -->
    <div v-else>
      <div 
        class="mb-auto"
      >
        <div class="row mb-3">
          <div class="col-md-6">
            <strong>Tên:</strong>
            <p>{{ user.firstName }}</p>
          </div>
          <div class="col-md-6">
            <strong>Họ:</strong>
            <p>{{ user.lastName }}</p>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <strong>Ngày sinh:</strong>
            <p>{{ user.birthday }}</p>
          </div>
          <div class="col-md-6">
            <strong>Giới tính:</strong>
            <p>{{ user.isMale ? 'Male' : 'Female' }}</p>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <strong>Số điện thoại:</strong>
            <p>{{ user.phoneNumber }}</p>
          </div>
          <div class="col-md-6">
            <strong>Địa chỉ:</strong>
            <p>{{ user.address }}</p>
          </div>
        </div>
      </div>

      <!-- Button Edit Profile -->
      <div class="text-center mt-3">
        <button 
          class="btn btn-primary" 
          @click="editProfile"
        >
          Sửa thông tin cá nhân
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../config/axios.config';  // Đảm bảo axios được cấu hình chính xác
import { mapState } from 'vuex';

export default {
  name: 'ProfileInfo',

  data() {
    return {
      user: null,      // Dữ liệu người dùng
      loading: true,   // Trạng thái đang tải
      error: null,     // Lỗi khi lấy thông tin người dùng
    };
  },

  computed: {
    ...mapState(['reader']),  // Truy cập thông tin reader từ Vuex store
  },    
  
  watch: {
    // Khi reader thay đổi (đăng nhập hoặc thông tin người dùng được cập nhật)
    reader(newReader) {
      if (newReader && newReader.index) {
        this.fetchUserData();  // Lấy lại dữ liệu khi thông tin người dùng thay đổi
      }
    },
  },

  created() {
    this.fetchUserData(); // Khi component được tạo, gọi hàm để lấy dữ liệu người dùng
  },

  methods: {
    editProfile() {
      alert('Edit profile functionality is under development.');
    },

    // Hàm để lấy thông tin người dùng từ API
    async fetchUserData() {
      if (!this.reader || !this.reader.index) {
        this.error = 'User not logged in.';
        this.loading = false;
        return;
      }

      try {
        const response = await axios.get(`/readers/index/${this.reader.index}`);
        if (response.data.success) {
          this.user = response.data.data; // Lưu thông tin người dùng vào state
        } else {
          this.error = response.data.message || 'Failed to fetch user data';
        }
      } catch (error) {
        this.error = 'Error fetching user data: ' + error.message;
      } finally {
        this.loading = false;  // Hoàn thành việc lấy dữ liệu
      }
    },
  },

};
</script>

<style scoped>
h2 {
  font-size: 24px;
  font-weight: bold;
}
strong {
  font-weight: bold;
}
</style>
