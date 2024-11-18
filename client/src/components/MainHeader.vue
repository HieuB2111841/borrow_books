<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a 
        class="navbar-brand" 
        href="#"
      > {{ brand }} </a>
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarSupportedContent" 
        aria-controls="navbarSupportedContent" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>

      <div 
        id="navbarSupportedContent"
        class="collapse navbar-collapse" 
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link 
              class="nav-link active" 
              :to="{ name: 'home' }" 
              aria-current="page"
            > 
              Home 
            </router-link>
          </li>

          <li class="nav-item">
            <router-link  
              class="nav-link" 
              :to="{ name: 'books' }" 
            > 
              Books 
            </router-link>
          </li>
        </ul>

        <search-form />
      </div>
    </div>
  </nav>
</template>

<script>
import SearchForm from './SearchForm.vue';

export default {
  name: 'MainHeader',

  components: {
    SearchForm,
  },

  props: {
    brand: {
      type: String,
      default: 'Navbar',
    },
  },

  data() {
    return { };
  }

};

</script>

