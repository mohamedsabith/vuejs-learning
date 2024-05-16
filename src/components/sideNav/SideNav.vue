<template>
  <nav class="sidenav">
    <ul>
      <li :class="{ 'selected': selectedItem === 'dashboard' }" @click="selectItem('dashboard')">USERS</li>
      <li :class="{ 'selected': selectedItem === 'profile' }" @click="selectItem('profile')">PROFILE</li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      selectedItem: 'dashboard'
    };
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item;
    }
  }
};
</script>

<style scoped>
.sidenav {
  width: 200px;
  background-color: #f0f0f0;
  padding: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 20px; /* Added some space above each list item */
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
}

.selected {
  font-weight: bold;
  background-color: #007bff; /* Change background color for selected item */
  color: #fff; /* Change text color for selected item */
}
</style>
