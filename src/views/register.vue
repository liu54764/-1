
<template>
  <div class="bg-blue-200 bg-repeat-round" style=" position: absolute;width: 100%;height: 100%;">
    <div class="card">
    <div class="surface-card p-4  shadow-2 border-round-left-2xl  box">
    <div class="text-center mb-5">
        <div class="text-800 text-2xl font-medium mb-3 font-bold">Register</div>
    </div>
    <div>
        <label for="email1" class="block text-800 font-medium mb-2 " style="text-align: left;font-weight: 300;font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">用户名/学号</label>
        <InputText  v-model="userName" id="email1" type="text" v-tooltip.bottom="'请输入您的用户名或学号'" class="w-full mb-3"  maxlength="20"/>

        <label for="password1" class="block text-800 font-medium mb-2 " style="text-align: left;font-weight: 300;font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">密码</label>
        <InputText  v-model="password" id="password1" type="password" v-tooltip.bottom="'请输入您的密码'" class="w-full mb-3"  maxlength="20"/>

        <label for="password1" class="block text-800 font-medium mb-2 " style="text-align: left;font-weight: 300;font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">确认密码</label>
        <InputText  v-model="Repassword" id="password1" type="password" v-tooltip.bottom="'请确认您的密码'" class="w-full mb-3"  maxlength="20"/>

        <div style="width: 200px;height: 40px;" class="relative">

        <RadioButton value='1'  v-model="identity" class="absolute  left-0 "/>
        <label for="rb1" class="absolute" style="left: 25px;">学生</label>

        <RadioButton value='0'  v-model="identity" class="absolute  left-2"/>
        <span id="rb2" class="absolute" style="left: 125px;">其他</span>


        </div>
        <div class="flex align-items-center justify-content-between" style="margin-bottom: 24px;">
            <a class="no-underline ml-2 text-teal-500 text-right cursor-pointer font-bold" @click="login">Go Back</a>
        </div>

        <Button label="Register" icon="pi pi-user-plus" class="w-full" @click="register"></Button>
    </div>
    </div>
    <div class="surface-card p-4  shadow-2 border-round-right-2xl box1">
        <section>
          <span class="block text-4xl font-bold mb-1">学分证明信用体制</span>
            <div class="text-1xl text-primary font-bold mb-3">在校学生的课程成绩、学分、项目、科研情况等各种学习数据查询.</div>
            <p class="mt-0 mb-4 text-500 line-height-3">在校学生的课程成绩、学分、项目、科研情况等各种学习数据先经标注时间戳标签，并分布式存储在学分证明区块链节点中，经授权的第三方机构或用人单位可以在任意区块链节点中查看学生的学习情况，一方面可以保证学生履历的权威性，一方面利用分布式结构可以降低各高校信息化建设成本，同时保障数据的安全性。</p>
            <br>
            <br>
           

            <Button label="Learn More" type="button" class="mr-3 p-button-raised"></Button>
            <Button label="Live Demo" type="button" class="p-button-outlined"></Button>
        </section>
    </div>
  </div>
  </div>
 


</template>


<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import Checkbox from 'primevue/checkbox'; 
import RadioButton from 'primevue/radiobutton';
import request from "@/utils/request";
export default{
  name:'register',
  components:{
    Button,InputText,Password,Checkbox,RadioButton
  },
  data(){
    return{
      userName:'',
      password :'',
      Repassword :'',
      identity:'',
    }
  },
  methods: {
    register() {
      if (!this.password || !this.Repassword || !this.userName) {
        this.$message({
          type: 'error',
          message: '请完成所有信息的输入！',
        })
      } else {
        if (this.password !== this.Repassword) {
          this.$message({
            type: 'error',
            message: '两次密码输入不一致！',
          })
          return
        } else {
              request.post("/user/register", {
                username:this.userName,
                password:this.password,
                identity:this.identity,
              }).then(res => {
                if (res.data.code === "0") {
                  this.$message({
                    type: "success",
                    message: "注册成功"
                  })
                  setTimeout(()=>{
        this.$router.push('/login');
      },300)
                } else {
                  this.$message({
                    type: "error",
                    message: res.errorMsg
                  })
                }
              })
        }
      }
    },
    login() {
      setTimeout(()=>{
        this.$router.push('/login');
      },300)
    }
  }

}
</script>

<style scoped>
.card{
  margin-top:6rem;
  margin-left: auto;
  margin-right: auto;
  width:700px;

}
.box{
  /* height: 400px; */
  margin-left: 0;
  width:350px;
  float: left;
}
.box1{
  margin-left: 350px;
  width:350px;
  height: 485px;
}
</style>