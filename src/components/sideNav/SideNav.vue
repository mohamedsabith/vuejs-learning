<template>
  <nav class="sidenav">
    <ul>
      <li
        :class="{ selected: selectedItem === 'dashboard' }"
        @click="selectItem('dashboard')"
      >
        USERS
      </li>
      <li
        :class="{ selected: selectedItem === 'posts' }"
        @click="selectItem('posts')"
      >
        POSTS
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      selectedItem: "dashboard",
    };
  },
  methods: {
    selectItem(item) {
      console.log(item);
      if (this.selectedItem !== item) {
        this.selectedItem = item;
        if (item === "dashboard") {
          this.$router.push("/dashboard");
        } else if (item === "posts") {
          this.$router.push("/posts");
        }
      }
    },
  },
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
  margin-bottom: 20px; 
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
}

.selected {
  font-weight: bold;
  background-color: #007bff; /* Change background color for selected item */
  color: #fff; /* Change text color for selected item */
  text-transform: uppercase;
}
</style>
