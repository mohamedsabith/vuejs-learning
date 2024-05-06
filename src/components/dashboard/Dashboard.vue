<template>
    <div class="dashboard-container">
      <h1>Welcome to the Dashboard</h1>
      <div>
        <p>Email: {{ email }}</p>
        <p>Phone Number: {{ phoneNumber }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        phoneNumber: ''
      };
    },
    mounted() {
      this.email = JSON.parse(localStorage.getItem('email'));
      this.phoneNumber = JSON.parse(localStorage.getItem('phoneNumber'));
    }
  };
  </script>
  
  <style scoped>
  .dashboard-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  </style>
  