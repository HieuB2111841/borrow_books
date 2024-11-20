<template>
  <div class="profile-borrow-book container py-4">
    <h2 class="text-center my-4">
      Danh sách sách đã mượn
    </h2>

    <!-- Hiển thị khi đang tải -->
    <div 
      v-if="loading" 
      class="text-center"
    >
      <div 
        class="spinner-border" 
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Hiển thị khi không có sách đã mượn -->
    <div 
      v-else-if="borrowedBooks.length === 0" 
      class="text-center"
    >
      Bạn chưa mượn sách nào.
    </div>

    <!-- Hiển thị danh sách sách đã mượn -->
    <div 
      v-else 
      class="list-group"
    >
      <div 
        v-for="(borrow, index) in borrowedBooks" 
        :key="index" 
        class="list-group-item d-flex align-items-center gap-3"
      >
        <!-- Ảnh bìa sách -->
        <img 
          :src="borrow?.book?.imageURL || 'https://via.placeholder.com/100x150?text=No+Image'" 
          alt="Book cover" 
          class="img-thumbnail" 
          style="width: 100px; height: 150px;"
        >

        <!-- Nội dung chi tiết sách -->
        <div>
          <h5 class="mb-1">
            {{ borrow?.book?.name || 'Tên sách không xác định' }}
          </h5>
          <p class="mb-0 text-muted">
            <strong>Ngày mượn:</strong> {{ formatDate(borrow?.borrowDate) }}
          </p>
          <p class="mb-0 text-muted small">
            (Đã mượn: {{ calculateBorrowDays(borrow?.borrowDate) }} ngày)
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from '../../config/axios.config';

export default {
  name: 'ProfileBorrowBook',
  data() {
    return {
      borrowedBooks: [], // Danh sách sách đã mượn
      loading: true,     // Trạng thái đang tải
    };
  },
  computed: {
    readerIndex() {
      return this.$store.state.reader?.index; // Lấy index người dùng từ Vuex
    },
  },
  async created() {
    // Lấy danh sách sách đã mượn khi component được tạo
    await this.fetchBorrowedBooks();
  },
  methods: {
    // Lấy danh sách sách đã mượn từ server
    async fetchBorrowedBooks() {
      try {
        if (!this.readerIndex) {
          console.warn('Người dùng chưa đăng nhập');
          this.loading = false;
          return;
        }

        const response = await axios.get(`/borrow/${this.readerIndex}`);
        if (response.data.success) {
          this.borrowedBooks = response.data.data; // Gán danh sách sách đã mượn
        } else {
          console.warn(response.data.message);
        }
      } catch (error) {
        console.error('Lỗi khi tải danh sách sách đã mượn:', error);
      } finally {
        this.loading = false;
      }
    },

    // Định dạng ngày (YYYY-MM-DD -> DD/MM/YYYY)
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN');
    },

    // Tính số ngày đã mượn
    calculateBorrowDays(borrowDate) {
      const startDate = new Date(borrowDate);
      const today = new Date();
      const diffTime = today - startDate;
      return Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Chuyển đổi sang ngày
    },
  },
};

</script>

<style scoped>
.profile-borrow-book .list-group-item {
  display: flex;
  align-items: center;
  padding: 15px;
}
.profile-borrow-book img {
  object-fit: cover;
}
</style>
