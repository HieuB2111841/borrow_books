<template>
  <footer class="py-3 bg-light">
    <div class="container">
      <ul class="nav justify-content-center border-bottom pb-3 mb-3">
        <li class="nav-item">
          <router-link 
            :to="{ name: 'home' }"
            class="nav-link px-2 text-muted"
          >
            Home
          </router-link> 
        </li>

        <li class="nav-item">
          <router-link 
            :to="{ name: 'books' }"
            class="nav-link px-2 text-muted"
          >
            Books
          </router-link> 
        </li>
      </ul>
      <p class="text-center text-muted">
        {{ companyInc }}
      </p>
    </div>
  </footer>
</template>

<script>

export default {
  name: 'MainFooter',

  props: {
    companyInc: {
      type: String,
      default: '© 2024 Company, Inc'
    }
  }

};

</script>