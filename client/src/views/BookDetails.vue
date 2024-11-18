<template>
  <div class="container page">
    <div v-if="book">
      <h1>{{ book.name }}</h1>
      <p><strong>Tác giả:</strong> {{ book.author }}</p>
      <p><strong>Giá:</strong> {{ book.price }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {

  props: {
    'slug': { 
      type: String,
      required: true 
    },
  },

  data() {
    return {
      book: null,
    };
  },
  
  async created() {
      await this.fetchBookData();
      if(this.book != null) {
        document.title = this.book.name ?? 'Unknown book';
      }
  },

  methods: {
    async fetchBookData() {
      try {
        const response = await axios.get(`http://localhost:3000/books/${this.slug}`);
        this.book = response.data;
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
