<template>
  <div class="profile-favorite-book">
    <h2 class="text-center my-4">
      Sách yêu thích
    </h2>
    <!-- Hiển thị loader khi danh sách đang tải -->
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

    <!-- Hiển thị danh sách sách yêu thích -->
    <div v-else>
      <div 
        v-if="favoriteBooks.length > 0" 
        class="row g-3"
      >
        <div 
          v-for="book in favoriteBooks" 
          :key="book._id" 
          class="col-12 col-md-6 col-lg-4"
        >
          <book-card :book="book" />
        </div>
      </div>
      <!-- Hiển thị thông báo nếu không có sách yêu thích -->
      <div 
        v-else 
        class="text-center"
      >
        <p>Bạn chưa có cuốn sách yêu thích nào.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import BookCard from '@/components/book/BookCard.vue'; // Đường dẫn tới BookCard.vue
import axios from '../../config/axios.config';

export default {
  name: 'ProfileFavoriteBook',

  components: { 
    BookCard 
  },

  data() {
    return {
      loading: true, // Biến để theo dõi trạng thái loading
    };
  },

  computed: {
    ...mapState(['favorites', 'reader']),
    // Lấy danh sách sách yêu thích từ Vuex
    favoriteBooks() {
      return this.favorites || [];
    },
  },

  // Lấy dữ liệu ngay khi component được khởi tạo
  created() {
    this.fetchFavoriteBooks();
  },

  methods: {
    ...mapActions(['updateFavorites']),
    // Gọi API để đồng bộ danh sách yêu thích
    async fetchFavoriteBooks() {
      if (!this.reader) return;

      try {
        const response = await axios.get(`/readers/favorite/${this.reader.index}`);
        if (response.data.success) {
          this.$store.commit('updateFavorites', response.data.data); // Cập nhật Vuex
        }
      } 
      catch (error) {
        console.error('Failed to fetch favorite books:', error);
      } 
      finally {
        this.loading = false; // Tắt trạng thái loading
      }
    },
  },
};
</script>

<style scoped>
.profile-favorite-book {
  padding: 20px;
}

.text-center {
  text-align: center;
}
</style>
