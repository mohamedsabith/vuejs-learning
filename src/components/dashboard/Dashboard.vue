<template>
  <div class="dashboard">
    <Header />
    <div class="main-content">
      <SideNav />
      <div class="content">
        <!-- Your main content goes here -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../header/Header.vue';
import SideNav from '../sideNav/SideNav.vue';

export default {
  components: {
    Header,
    SideNav,
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  display: flex;
  flex: 1;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto; /* Enable scrolling if content exceeds container height */
}
</style>
