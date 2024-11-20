<template>
  <div 
    class="d-flex flex-column p-3 bg-light w-100 h-100"
  >
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link 
          :to="{name: 'profile-info'}" 
          class="nav-link" 
          active-class="active"
        >
          Thông tin cá nhân
        </router-link>
      </li>

      <li>
        <router-link 
          :to="{name: 'profile-borrowed'}" 
          class="nav-link" 
          active-class="active"
        >
          Mượn sách
        </router-link>
      </li>

      <li>
        <router-link 
          :to="{name: 'profile-favorite'}"  
          class="nav-link" 
          active-class="active"
        >
          Yêu thích
        </router-link>
      </li>

      <li>
        <router-link 
          :to="{name: 'profile-following'}"  
          class="nav-link" 
          active-class="active"
        >
          Theo dõi
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ProfileSideBar',
};
</script>

<style scoped>
.d-flex {
  height: 100%;
  border-right: 1px solid #ddd;
}
.nav-link.active {
  background-color: #0d6efd;
  color: #fff;
}
</style>
