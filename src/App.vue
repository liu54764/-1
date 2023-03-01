<template>
  <router-view></router-view>
</template>

<script>

import { provide } from 'vue';
export default {
  name: 'App',
  setup(){
       provide("message","hello")
  
  }

}
</script>

<style>
#app{
  font-family: 'Courier New', Courier, monospace;
  text-align: center;
  color:rgb(87, 59, 23);
}
</style>
