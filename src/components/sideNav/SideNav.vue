<template>
    <nav class="sidenav">
      <!-- Side navigation content goes here -->
      <ul>
        <li><router-link to="/dashboard">Dashboard</router-link></li>
        <li><router-link to="/profile">Profile</router-link></li>
        <!-- Add more navigation links as needed -->
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    // SideNav component logic goes here
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
    margin-bottom: 10px;
  }
  
  .router-link-active {
    font-weight: bold;
  }
  </style>
  