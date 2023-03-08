<template>
    <top />
    <side />
  <mainout ></mainout>
  <mainout style="height: 41vh;width: 700px;"></mainout>
  <mainout style="height: 41vh;width: 700px;"></mainout>
  
  
  
  </template>
  
  <script>
  
  import top from '../components/top.vue'
  import side from '../components/side.vue'
  import mainout from '../components/main.vue'
  export default {
    name:'grade',
   components:{
    top,side,mainout
   },
  
  }
  
  </script>
  
  <style scoped> 
   .main{
      margin-top: 20px;
      margin-left: 20px;
      width:500px;
      height: 85vh;
      float: left;
 
    }
  
  </style>