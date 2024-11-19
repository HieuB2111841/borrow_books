<template>
  <div class="container">
    <div class="page row row-cols-1 row-cols-md-2 col-md-12 gx-4 py-4 ">
      <div class="col-lg-3 col-md-4">
        <side-bar />
      </div>

      <div class="col-lg-9 col-md-8">
        <!-- Hiển thị trạng thái đang tải -->
        <div 
          v-if="isLoading" 
          class="text-center"
        >
          <div 
            class="spinner-border text-primary" 
            role="status"
          >
            <span class="visually-hidden">Đang tải...</span>
          </div>
        </div>

        <!-- Hiển thị lỗi -->
        <div 
          v-if="error" 
          class="alert alert-danger" 
          role="alert"
        >
          {{ error }}
        </div>

        <!-- Hiển thị danh sách sách -->
        <div 
          v-if="!isLoading && books.length"
          class="row g-3" 
        >
          <div 
            v-for="book in books" 
            :key="book.id"
            class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6" 
          >
            <book-card :book="book" />
          </div>
        </div>

        <!-- Hiển thị thông báo nếu không có sách -->
        <div 
          v-if="!isLoading && books.length === 0" 
          class="alert alert-info" 
          role="alert"
        >
          Không có sách nào để hiển thị.
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import SideBar from '@/components/SideBar.vue';
import BookCard from '@/components/book/BookCard.vue';

export default {
  name: 'BooksPage',

  components: {
    SideBar,
    BookCard,
  },

  data() {
    return {
      books: [], 
      isLoading: true, 
      error: null, 
    };
  },

  async created() {
    await this.fetchBookData(); 
  },

  methods: {
    async fetchBookData() {
      try {
        const response = await axios.get('http://localhost:3000/books/');
        this.books = response.data;
        this.isLoading = false;
      } 
      catch (error) {
        if (error.response && error.response.status === 404) {
          // Route to 404
          this.$router.push({
            name: 'NotFound',
            params: {
              pathMatch: this.$route.path.split('/').slice(1)
            },
            query: this.$route.query,
            hash: this.$route.hash,
          });
        } else {
          console.error('Lỗi khi tải dữ liệu sách:', error);
        }
      }
    }
  }
};

</script>

<style scoped>

</style>
