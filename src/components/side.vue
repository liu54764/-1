<template>
  <div class="side bg-blue-100 p-4 shadow-2 border-round-2xl ">

   
        <Button  label="首页" icon="pi pi-home" class="p-button-text w-12 mt-5 font-bold" @click="this.$router.push('/home')"/>
        <Button v-if="role" label="学生信息" icon="pi pi-user" class="p-button-text w-12 mt-2 font-bold" @click="this.$router.push('/student')"/>
        <Button v-else="role" label="机构信息" icon="pi pi-user-plus" class="p-button-text w-12 mt-2 font-bold" />
        <Button v-if="role" label="学分情况" icon="pi pi-check-square" class="p-button-text w-12 mt-2 font-bold"  @click="this.$router.push('/credits')"/>
        <Button v-else="role" label="查询" icon="pi pi-search" class="p-button-text w-12 mt-2 font-bold" />
        <Button v-if="role" label="课程成绩" icon="pi pi-chart-bar" class="p-button-text w-12 mt-2 font-bold"  @click="this.$router.push('/grade')"/>
        <Button v-if="role" label="科研竞赛" icon="pi pi-chart-line" class="p-button-text w-12 mt-2 font-bold"  @click="this.$router.push('/contest')"/>
        <Button v-if="role" label="实习情况" icon="pi pi-flag-fill" class="p-button-text w-12 mt-2 font-bold"  @click="this.$router.push('/exercitation')"/>
        <!-- <Button v-if="role" label="学业情况" icon="pi pi-user" class="p-button-text w-12 mt-2" />
        <Button v-if="role" label="学业情况" icon="pi pi-user" class="p-button-text w-12 mt-2" /> -->
        <ConfirmDialog></ConfirmDialog>
        <Button label="退出" icon="pi pi-upload" iconPos="right" class="p-button-danger p-button-text mt-8 font-bold" @click="loginout()"/>
        

  </div>

</template>
  
  <script>

import Button from 'primevue/button';
import ConfirmDialog from 'primevue/confirmdialog';
  export default {
    name: "side",
    components:{
      Button,ConfirmDialog
    },
    data(){
      return{
        role:1,
      }
    },
    methods: {
        loginout() {
          setTimeout(()=>{
        this.$router.push('/login');
      },300)
          // this.$confirm.require({
          //       message: 'Are you sure you want to proceed?',
          //       header: 'Confirmation',
          //       icon: 'pi pi-exclamation-triangle',
          //       accept: () => {
          //           this.$router.push('/login');
          //       },
          //       reject: () => {
          //           //callback to execute when user rejects the action
          //       }
          //   });
        }
      }
  }
  </script>
  
  <style scoped>
  .side{
    margin-top: 20px;
    margin-left: 20px;
    height: 85vh;
    width: 200px;
    float: left;
  }
  </style>