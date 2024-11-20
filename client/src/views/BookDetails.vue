<template>
  <div class="page book-details container py-4">
    <!-- Hiển thị khi dữ liệu đang tải -->
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

    <!-- Hiển thị chi tiết sách -->
    <div 
      v-else 
      class="card mt-4"
    >
      <div class="row g-2">
        <!-- Hình ảnh sách -->
        <div class="col-md-4">
          <img
            :src="book.imageURL || 'https://via.placeholder.com/200x300?text=No+Image'"
            class="img-fluid rounded"
            alt="Book cover"
          >
        </div>

        <!-- Nội dung chi tiết -->
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">
              {{ book.name }}
            </h5>

            <p class="card-text">
              <strong>Tác giả:</strong> {{ book.author }}
            </p>

            <p class="card-text">
              <strong>Nhà xuất bản:</strong> {{ book.publisherID || 'Unknown' }}
            </p>
            
            <p class="card-text">
              <strong>Ngày xuất bản:</strong>
              {{ new Date(book.publicationDate).toLocaleDateString() }}
            </p>
            
            <p class="card-text">
              <strong>Nguồn gốc:</strong> {{ book.origin }}
            </p>

            <p class="card-text">
              <strong>Giá:</strong> {{ book.price }}₫
            </p>

            <p class="card-text">
              <strong>Số lượng:</strong> {{ book.bookNumber }}
            </p>

            <p class="card-text">
              <strong>Mô tả:</strong> {{ book.description }}
            </p>

            <div class="actions d-flex gap-2 mt-4">
              <!-- Nút Thích -->
              <button
                class="btn btn-outline-danger"
                :class="{ active: liked }"
                @click="toggleLike"
              >
                {{ liked ? 'Đã thích' : 'Thích' }}
              </button>

              <!-- Nút Theo dõi -->
              <button
                class="btn btn-outline-primary"
                :class="{ active: followed }"
                @click="toggleFollow"
              >
                Theo dõi
              </button>

              <!-- Nút Đăng ký mượn -->
              <button
                class="btn"
                :class="{
                  'btn-success': book.bookNumber > 0,
                  'btn-outline-secondary': book.bookNumber <= 0,
                }"
                :disabled="book.bookNumber <= 0"
                @click="registerBorrow"
              >
                Đăng ký mượn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from '../config/axios.config';

export default {
  name: 'BookDetails',

  props: {
    slug: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      book: null,
      loading: true,
    };
  },

  computed: {
    ...mapState(['favorites']), // Lấy danh sách yêu thích từ Vuex Store

    // Kiểm tra sách có trong danh sách yêu thích hay không
    liked() {
      return this.favorites.some((fav) => fav._id === this.book?._id);
    },
  },

  async created() {
    await this.fetchBookData();
    if (this.book != null) {
      document.title = this.book.name ?? 'Unknown book';
    }
    this.loading = false;
  },

  methods: {
    ...mapActions(['toggleFavorites']), // Gọi action để thêm/xóa sách khỏi danh sách yêu thích

    async fetchBookData() {
      try {
        const response = await axios.get(`http://localhost:3000/books/${this.slug}`);
        this.book = response.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Chuyển hướng đến trang 404 nếu sách không tìm thấy
          this.$router.push({
            name: 'NotFound',
            params: {
              pathMatch: this.$route.path.split('/').slice(1),
            },
            query: this.$route.query,
            hash: this.$route.hash,
          });
        } else {
          console.error('Lỗi khi tải dữ liệu sách:', error);
        }
      }
    },

    // Xử lý thêm/xóa sách khỏi danh sách yêu thích
    async toggleLike() {
      if (this.book) {
        await this.toggleFavorites(this.book._id); // Gọi action trong Vuex
      }
    },
  },
};

</script>

<style scoped>
.book-details {
  max-width: 800px;
  margin: auto;
}
</style>
