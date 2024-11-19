<template>
  <div class="page container d-flex justify-content-center align-items-center">
    <div 
      class="card p-4 shadow-sm" 
      style="width: 350px;"
    >
      <h3 class="text-center mb-4">
        Login
      </h3>

      <form @submit.prevent="handleSubmit">
        <!-- Phone Number -->
        <div class="form-group mb-3">
          <label 
            for="phoneNumber" 
            class="form-label"
          >
            Phone Number
          </label>
          <input
            id="phoneNumber"
            v-model="form.phoneNumber"
            type="text"
            class="form-control"
            placeholder="Enter your phone number"
            required
          >
        </div>

        <!-- Password -->
        <div class="form-group mb-3">
          <label 
            for="password" 
            class="form-label"
          >
            Password
          </label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="form-control"
            placeholder="Enter your password"
            required
          >
        </div>

        <!-- Error Message -->
        <div 
          v-if="errorMessage" 
          class="alert alert-danger py-2 mt-3"
        >
          {{ errorMessage }}
        </div>

        <!-- Submit Button -->
        <button 
          type="submit" 
          class="btn btn-primary w-100"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '../config/axios.config';

export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        phoneNumber: '',
        password: '',
      },
      errorMessage: null,
    };
  },

  methods: {
    async handleSubmit() {
      try {
        this.errorMessage = null;

        // API call to login
        const response = await axios.post('/auth/login/', this.form);
        
        // Simulating successful login
        if (response.data.success) {
          // Cập nhật trạng thái đăng nhập vào Vuex
          this.$store.dispatch('login', response.data.reader);

          this.$router.push({ name: 'home' }); // Redirect to home
        } 
        else {
          this.errorMessage = response.data.message;
        }
      } 
      catch (error) {
        this.errorMessage = error.response?.data?.message || 'Login failed!';
      }
    },
  },
};

</script>

<style>
body {
  background-color: #f8f9fa;
}
</style>
