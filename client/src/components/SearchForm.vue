<template>
  <form class="d-flex">
    <!-- Input form -->
    <input 
      class="form-control me-2" 
      type="search" 
      :placeholder="placeholder"
      aria-label="Search"
    >

    <!-- Summit Button -->
    <button 
      class="btn btn-outline-success" 
      type="submit"
    >
      {{ buttonTitle }}
    </button>
  </form>
</template>

<script>

export default {
  props: {
    buttonTitle: {
      type: String,
      default: 'Search',
    },
    placeholder: {
      type: String,
      default: 'Search here...',
    },
  },

  data() {
    return { };
  }
};

</script>
