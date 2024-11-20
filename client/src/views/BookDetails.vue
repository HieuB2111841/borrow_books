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
                @click="openBorrowForm"
              >
                Đăng ký mượn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <teleport to="body">
    <div 
      v-if="showBorrowForm" 
      class="borrow-form-modal"
    >
      <div 
        class="modal-overlay" 
        @click="closeBorrowForm" 
      />
      <div class="modal-content">
        <h5>Đăng ký mượn sách</h5>
        <p class="text-danger small">
          Đến nhận sách trước <strong>3 ngày</strong> từ ngày bắt đầu đăng ký mượn.
        </p>
        <form @submit.prevent="submitBorrowRequest">
          <div class="mb-3">
            <label 
              for="borrowStartDate" 
              class="form-label"
            >
              Ngày bắt đầu
            </label>

            <input
              id="borrowStartDate"
              v-model="borrowStartDate"
              type="date"
              class="form-control"
              :min="currentDate"
              :value="currentDate"
            >
          </div>

          <button 
            type="submit" 
            class="btn btn-success"
          >
            Xác nhận
          </button>
          <button 
            type="button" 
            class="btn btn-outline-secondary" 
            @click="closeBorrowForm"
          >
            Hủy
          </button>
        </form>
      </div>
    </div>
  </teleport>
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
      showBorrowForm: false, // Điều khiển hiển thị form
      borrowStartDate: null, // Ngày bắt đầu mượn
    };
  },

  computed: {
    ...mapState(['favorites', 'reader']), // Lấy danh sách yêu thích từ Vuex Store

    // Kiểm tra sách có trong danh sách yêu thích hay không
    liked() {
      return this.favorites.some((fav) => fav._id === this.book?._id);
    },

    currentDate() {
      const today = new Date();
      return today.toISOString().split('T')[0]; // Định dạng yyyy-MM-dd
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
        const response = await axios.get(`/books/${this.slug}`);
        this.book = response.data;
      } 
      catch (error) {
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
        } 
        else {
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

    openBorrowForm() {
      // Kiểm tra trạng thái đăng nhập
      if (!this.$store.state.isLoggedIn) {
        this.$router.push({ name: 'login' }); // Chuyển hướng nếu chưa đăng nhập
      } 
      else {
        this.showBorrowForm = true; // Hiển thị form đăng ký mượn
      }
    },

    closeBorrowForm() {
      this.showBorrowForm = false; // Ẩn form
      this.borrowStartDate = null;
    },

    async submitBorrowRequest() {
      // Kiểm tra ngày nhập
      if (!this.borrowStartDate) {
        alert('Vui lòng chọn ngày mượn');
        return;
      }

      try {
        // Gửi yêu cầu mượn sách
        const response = await axios.post('/borrow', {
          readerId: this.reader._id,
          bookId: this.book._id,
          borrowtDate: this.borrowStartDate,
        });

        if (response.data.success) {
          alert('Đăng ký mượn sách thành công!');
          this.book.bookNumber -= 1; // Cập nhật số lượng sách
          this.closeBorrowForm();
        } 
        else {
          alert(response.data.message || 'Lỗi không xác định!');
        }
      } 
      catch (error) {
        console.error('Lỗi khi gửi yêu cầu mượn sách:', error);
        alert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
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
.borrow-form-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.modal-content {
  position: relative;
  z-index: 2;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
}
</style>
