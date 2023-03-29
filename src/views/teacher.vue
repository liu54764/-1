<template>
    <top />
    <side />
     <div class="body surface-card p-4 shadow-2 border-round-2xl">
       
teacher
     </div>
  </template>
     
  
  <script>
  import top from '../components/top.vue'
  import side from '../components/side.vue'
     export default {
       name: "teacher",
       components:{
    top,side,
   },
     }
  </script>
     
  <style scoped>
  .body{
     margin-top: 20px;
     margin-left: 240px;
     height: 85vh;
     width: 900px;
     background-color: rgb(29, 27, 24);
  }
  </style>