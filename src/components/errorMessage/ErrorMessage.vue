<template>
    <div class="invalid-feedback">
      {{ message }}
    </div>
  </template>
  
  <script>
  export default {
    props: {
      message: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .invalid-feedback {
    color: #dc3545;
    padding-top: 0.25rem;
    font-size: 0.875rem;
  }
  </style>
  