<template>
  <div class="container">
    <div class="page row row-cols-1 row-cols-md-2 col-md-12 gx-4 py-4 ">
      <div class="col-lg-3 col-md-4">
        <profile-side-bar />
      </div>

      <div class="col-lg-9 col-md-8">
        <router-view />
        <!--  -->
      </div>
    </div>
  </div>
</template>

<script>
import ProfileSideBar from '@/components/profile/ProfileSideBar.vue';

export default {
  name: 'ProfilePage',

  components: {
    ProfileSideBar,
  },
};

</script>

<style scoped>

</style>
