<template>
  <footer class="py-3 mt-4 bg-light">
    <div class="container">
      <ul class="nav justify-content-center border-bottom pb-3 mb-3">
        <li class="nav-item">
          <a 
            href="#" 
            class="nav-link px-2 text-muted"
          > Home </a>
        </li>

        <li class="nav-item">
          <a 
            href="#" 
            class="nav-link px-2 text-muted"
          > Books </a>
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