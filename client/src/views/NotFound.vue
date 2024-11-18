<template>
  <div class="container page d-flex justify-content-center align-items-center">
    <div class="col-md-12 text-center">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>
        Sorry, the page you are looking
        for does not exist.
      </p>
      <router-link :to="{ name: 'home' }">
        Home
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
    name: 'NotFound'
};

</script>

<style scoped>
h1 {
    color: red;
}
</style>
