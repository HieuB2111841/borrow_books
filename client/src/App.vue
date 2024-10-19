<template>
  <main-header brand="Borrow Books" />
  <router-view />
  <main-footer />
</template>

<script>
import MainFooter from './components/MainFooter.vue';
import MainHeader from './components/MainHeader.vue';

export default {
  name: 'App',

  components: {
    MainHeader,
    MainFooter,
  },

  data() {
    return { };
  },
  
  methods: {
    
  },
};
</script>
