<template>
    <div class="mainContent">
        <router-view />
    </div>
  </template>
  
  <script>
  export default {
      name: "mainContent",
  }
  </script>
  
  <style lang="scss" scoped>
  .mainContent{
      width: 100%;
      height: 90vh;
      background: blue;
  }
  </style>