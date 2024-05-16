<template>
    <header class="header">
      <div class="user-info">
        <img :src="user.photo" :alt="user.name" class="user-photo">
        <span class="user-name">{{ user.name }}</span>
      </div>
      <div class="dropdown">
        <button class="dropbtn">Menu</button>
        <div class="dropdown-content">
          <router-link to="/profile">Profile</router-link>
          <button @click="logout">Logout</button>
        </div>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {
          name: "John Doe",
          photo: "https://example.com/user/image.png",
        },
      };
    },
    methods: {
      logout() {
        // Your logout logic here
        console.log("Logout");
      },
    },
  };
  </script>
  
  <style scoped>
  .header {
    background-color: #333;
    color: #fff;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .user-info {
    display: flex;
    align-items: center;
  }
  
  .user-photo {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .dropdown {
    position: relative;
    display: inline-block;
  }
  
  .dropbtn {
    background-color: #333;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 120px;
    z-index: 1;
  }
  
  .dropdown-content button, .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  
  .dropdown-content button:hover, .dropdown-content a:hover {
    background-color: #f1f1f1;
  }
  
  .dropdown:hover .dropdown-content {
    display: block;
  }
  
  .dropdown:hover .dropbtn {
    background-color: #555;
  }
  </style>
  