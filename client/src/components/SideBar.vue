<template>
  <div class="d-flex flex-column p-3 bg-light w-100 h-100">
    <!-- Tìm kiếm theo tên sách -->
    <div class="mb-3">
      <h5 class="mb-2">
        Tìm kiếm
      </h5>
      <input 
        v-model="searchQuery"
        type="text" 
        class="form-control"
        placeholder="Nhập tên sách..."
        @input="handleSearch"
      >
    </div>

    <!-- Lọc theo giá -->
    <div class="mb-3">
      <h5 class="mb-2">
        Giá
      </h5>
      <div class="d-flex align-items-center mb-2">
        <span class="me-auto">0₫</span>
        <span class="ms-auto">{{ priceMax }}₫</span>
      </div>
      <input
        v-model="priceMax"
        type="range"
        class="form-range"
        min="0"
        :max="maxPrice"
        step="1000"
        @input="handleFilter"
      >
    </div>

    <div class="mb-3">
      <h5 class="mb-2">
        Lọc
      </h5>
      
      <!-- Lọc theo thể loại -->
      <!-- <div class="mb-3">
        <span 
          id="inputGroup-sizing-default"
          class="" 
        >
          Thể loại
        </span>
        <input 
          id="genreBooks"
          v-model="genre"
          type="text" 
          class="form-control" 
          @change="handleFilter"
        >
      </div> -->

      <!-- Lọc theo số lượng -->
      <div class="form-check">
        <input 
          id="outOfStockBooks"
          v-model="filterOutOfStock"
          type="checkbox" 
          class="form-check-input"
          @change="handleFilter"
        >
        <label 
          for="outOfStockBooks" 
          class="form-check-label"
        >
          Đã hết
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  
  props: {
    maxPrice: {
      type: Number,
      default: 500000, // Giá tối đa
    },
  },
  
  emits: ['search', 'filter'],
  data() {
    return {
      searchQuery: '', // Dùng để tìm kiếm theo tên sách
      priceMax: 0, // Thanh trượt giá
      genre: '',
      filterOutOfStock: false, // Lọc sách hết số lượng
    };
  },

  methods: {
    handleSearch() {
      this.$emit('search', this.searchQuery);
    },

    handleFilter() {
      const filters = {
        priceMax: this.priceMax,
        genre: this.genre,
        outOfStock: this.filterOutOfStock,
      };
      this.$emit('filter', filters);
    },
  },
};

</script>

<style scoped>

</style>
