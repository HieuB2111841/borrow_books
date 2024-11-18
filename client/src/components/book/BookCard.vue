<template>
  <router-link
    :to="{ name: 'book-detail', params: { slug: book.slug } }"
    class="card-link text-decoration-none"
  >
    <div class="card p-2 h-100">
      <!-- Ảnh sách -->
      <img 
        :src="book.imageURL" 
        class="card-img-top book-image"
        alt="Book Cover"
      >
      <!-- Nội dung sách -->
      <div class="card-body">
        <h5 class="card-title text-dark text-center h-75 mb-2">
          {{ book.name }}
        </h5>
        <p class="card-text text-truncate m-0">
          {{ book.description }}
        </p>
      </div>
      <div class="card-footer bg-transparent d-flex flex-md-row flex-column justify-content-between p-2">
        <p 
          class="price text-secondary p-0"
        >
          Số lượng: {{ book.bookNumber }}
        </p>

        <!-- Giá sách -->
        <p 
          :class="book.price === 0 ? 'text-success fw-bold' : 'text-primary fw-bold'"
          class="price text-end p-0"
        >
          {{ book.price === 0 ? 'Miễn phí' : book.price + '₫' }}
        </p>
      </div>
    </div>
  </router-link>
</template>


<script>

export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
};

</script>

<style scoped>
/* Đặt chiều cao cố định cho hình ảnh */
.book-image {
  height: 180px; /* Chiều cao cố định */
  object-fit: contain; /* Giữ tỷ lệ, cắt gọn phần dư */
  border-radius: 8px; /* Bo góc nhẹ */
}

.card-body {
  height: 100px;
}

/* Loại bỏ mặc định của router-link */
.card-link {
  color: inherit; /* Kế thừa màu sắc */
}

/* Đặt khoảng cách và định dạng */
.card-title {
  overflow: hidden;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.card-text {
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.price {
  margin: 0;
  font-size: 1rem;
}

/* Tạo hiệu ứng hover đẹp */
.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
  transition: all 0.15s ease-in-out;
}
</style>

