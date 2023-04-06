<template>
  <div class="login-background">
    <div class="card ">
    <div class="surface-card p-4 shadow-2 border-round-left-2xl   box">
    <div class="text-center mb-5">
        <div class="text-900 text-3xl font-medium mb-3 font-bold">Welcome Back</div>
        <span class="text-600 font-medium line-height-3">Don't have an account?</span>
        <a class="font-medium no-underline ml-2 text-teal-500 cursor-pointer font-bold" @click="register">Create today!</a>
    </div>

    <div>
        <label for="email1" class="block text-900 font-medium mb-2 " style="text-align: left;font-weight: 300;font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">学号/用户名</label>
        <InputText  v-model="username" id="email1" type="text" v-tooltip.bottom="'请输入您的用户名或学号'" class="w-full mb-3" maxlength="20"/>

        <label for="password1" class="block text-900 font-medium mb-2 " style="text-align: left;font-weight: 300;font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">密码</label>
        <InputText  v-model="password" id="password1" type="password" v-tooltip.bottom="'请输入您的密码'" class="w-full mb-3"  maxlength="20"/>

        <div style="width: 300px;height: 40px;">
          <div style="width: 260px;height: 40px; float: left;" class="relative" >

            <RadioButton value='1'  v-model="identity" class="absolute  left-0 "/>
            <label for="rb1" class="absolute" style="left: 25px;">学生</label>

            <RadioButton value='2'  v-model="identity"/>
            <span id="rb2" class="absolute" style="left: 145px;">老师</span>

            <RadioButton value='3'  v-model="identity" class="absolute right-0"/>
            </div>
            <div style="width: 40px;height: 40px;float: left;">
            <span>机构</span>
            </div>

        </div>
       

        <div class="flex align-items-center justify-content-between" style="margin-bottom: 19px;">
            <div class="flex align-items-center">
                <Checkbox id="rememberme1" :binary="true" v-model="checked" class="mr-2"></Checkbox>
                <label for="rememberme1 font-bold">Remember me</label>
            </div>
            <a class="font-medium no-underline ml-2 text-teal-500 text-right cursor-pointer font-bold">Forgot password?</a>
        </div>

        <Button label="Sign In" icon="pi pi-user" @click="login" class="w-full p-button-sm"></Button>
    </div>

    </div>

    <div class="surface-card p-4  shadow-2 border-round-right-2xl box1">
        <section>
            <span class="block text-4xl font-bold mb-1">学分证明信用体制</span>
            <div class="text-1xl text-primary font-bold mb-3">在校学生的课程成绩、学分、项目、科研情况等各种学习数据查询.</div>
            <p class="mt-0 mb-4 text-500 line-height-3">在校学生的课程成绩、学分、项目、科研情况等各种学习数据先经标注时间戳标签，并分布式存储在学分证明区块链节点中，经授权的第三方机构或用人单位可以在任意区块链节点中查看学生的学习情况，一方面可以保证学生履历的权威性，一方面利用分布式结构可以降低各高校信息化建设成本，同时保障数据的安全性。</p>
            <br>
            <br>
            
            <Button label="Learn More" type="button" class="mr-3 p-button-raised p-button-sm"></Button>
            <Button label="Live Demo" type="button" class="p-button-outlined p-button-sm"></Button>
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
  name:'login',
  components:{
    Button,InputText,Password,Checkbox,RadioButton,
  },
  data(){
    return{
      username:'',
      password :'',
      identity:'',
      checked:'',
    }
  },
  methods:{
    register() {
      setTimeout(()=>{
        this.$router.push('/register');
      },300)
    },
    login() {
          if (!this.username||!this.password) {
            this.$message.error("请填写用户名和密码")
            return
          }
          if (!this.identity) {
            this.$message.error("请填选择角色")
            return
          }
          // console.log(this.identity)
          request.post("/user/login",{
            username:this.username,
        password :this.password,
        identity:this.identity,
          }).then(res => {
            console.log(res.data.code)
            if (res.data.code === "0") {
              this.$message({
                type: "success",
                message: "登录成功"
              })
              localStorage.setItem("userinfo", JSON.stringify(res.data))  // 缓存用户信息
              console.log(res.data)
              setTimeout(()=>{
                this.$router.push('/home');
              },300)
            }
            else {
              this.$message({
                type: "error",
                message: "用户名或密码错误"
              })
            }
          })
  
    }
  }
}

</script>

<style scoped>
.login-background {
  background-color: #f5f5f5;
  background-image: linear-gradient(10deg, #296938 0%, #5fbd75 50%, #548cc8 50%, #02438a 100%);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card{
  margin-left: auto;
  margin-right: auto;
  width:700px;
}
.box{
 
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