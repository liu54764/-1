<template>
  <div class="side bg-gray-100 p-4 shadow-2 border-round-2xl ">


    <Button label="首页" icon="pi pi-home" class="p-button-text w-12 mt-5 font-bold" @click="this.$router.push('/home')" />

    <Button v-if="role === '1'" label="学分情况" icon="pi pi-check-square" class="p-button-text w-12 mt-3 font-bold"
      @click="this.$router.push('/credits')" />
    <Button v-if="role === '3'" label="机构查询" icon="pi pi-search" class="p-button-text w-12 mt-3 font-bold"
      @click="this.$router.push('/inquiry')" />
    <Button v-if="role === '1'" label="课程成绩" icon="pi pi-chart-bar" class="p-button-text w-12 mt-3 font-bold"
      @click="this.$router.push('/grade')" />
    <Button v-if="role === '1'" label="实习竞赛" icon="pi pi-chart-line" class="p-button-text w-12 mt-3 font-bold"
      @click="this.$router.push('/contest')" />


    <!-- <Button v-if="role === '1'" label="实习情况" icon="pi pi-flag-fill" class="p-button-text w-12 mt-3 font-bold"
      @click="this.$router.push('/exercitation')" /> -->
    <Button v-if="role === '2'" label="学生管理" icon="pi pi-user-edit" class="p-button-text w-12 mt-3 font-bold"
      @click="this.$router.push('/StudentManage')" />
    <Button v-if="role === '2'" label="成绩修改" icon="pi pi-pencil" class="p-button-text w-12 mt-3 font-bold"
      @click="this.$router.push('/GradeRevision')" />


    <!-- <Button v-if="role" label="学业情况" icon="pi pi-user" class="p-button-text w-12 mt-2" />
        <Button v-if="role" label="学业情况" icon="pi pi-user" class="p-button-text w-12 mt-2" /> -->
    <ConfirmDialog></ConfirmDialog>
    <Button label="退出" icon="pi pi-upload" iconPos="right" class="p-button-danger p-button-text mt-8 font-bold"
      style="width: 100px;" @click="loginout()" />


  </div>
</template>
  
<script>

import Button from 'primevue/button';
import ConfirmDialog from 'primevue/confirmdialog';
export default {
  name: "side",
  components: {
    Button, ConfirmDialog
  },
  data() {
    return {
      role: 1,
    }
  },
  created() {
    this.GetInformation()
  },
  methods: {
    loginout() {
      setTimeout(() => {
        localStorage.removeItem('userinfo')
        this.$router.push('/login');
      }, 300)
    },
    GetInformation() {
      let userinfo = JSON.parse(localStorage.getItem('userinfo'))
      this.role = userinfo.data.identity
      console.log(userinfo.data.identity)
    },
  }
}
</script>
  
<style scoped>
.side {
  margin-top: 20px;
  margin-left: 20px;
  height: 85vh;
  width: 200px;
  float: left;
}</style>