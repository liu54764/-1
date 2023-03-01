<template>
  <div class="container">
    <div class="main">
      <!-- 整个注册盒子 -->
      <div class="loginbox">
        <!-- 左侧的注册盒子 -->
        <div class="loginbox-in">
          <div style="margin-top: 50px;font-size: 25px;font-weight: bold">
            注&emsp;册
          </div>
          <div class="userbox">
            <el-icon :size="20" color="#055d0c" ><User /></el-icon>
            <input   v-model="userName" placeholder="用户名" maxlength="10">
          </div>
          <br>
          <div class="pwdbox">
            <el-icon size="20" color="#055d0c"><Lock /></el-icon>
            <input    v-model="password" type="password"  placeholder="密码" maxlength="15">
          </div>
          <br>
          <div class="pwdbox">
            <el-icon  size="20" color="#055d0c"><Check /></el-icon>
            <input     v-model="Repassword" type="password"  placeholder="确认密码" maxlength="15">
          </div>
          <br>
          <div style="font-size:10px;width: 155px;margin-left: 55px;text-align: left;height: 70px">
            <el-radio-group v-model="role">
              <el-radio label="1" style="font-weight: bold">学生</el-radio>
              <el-radio label="2" style="font-weight: bold">其他</el-radio>
            </el-radio-group>
            <br>
            <div style="width: 155px;">
              <button   class="login_btn"  @click="register">注册</button>
              <button   class="login_btn" style="margin-left: 15px" @click="login">返回</button>
            </div>
          </div>


        </div>

        <!-- 右侧的注册盒子 -->
        <div class="background">
          <div class="title">
            学生学业信息系统
          </div>
          <div class="title1">Welcome</div>
        </div>

      </div>
    </div>
  </div>
</template>



<script>

export default{
  name:'register',
  data(){
    return{
      userName:'',
      password :'',
      Repassword :'',
      role:'',
    }
  },
  methods: {
    register() {

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
.loginbox{
  display:flex;
  position:absolute;
  width:800px;
  height:400px;
  top:40%;
  left:50%;
  transform:translate(-50%,-50%);
  box-shadow: 0 12px 16px 0  rgba(0,0,0,0.24), 0 17px 50px 0 #4E655D;
}
.loginbox-in{
  background-color:#89AB9E;
  width:240px;
}
.userbox{
  margin-top:50px ;
  height:30px;
  width:200px;
  display: flex;
  margin-left:25px;
}
.pwdbox{
  height:30px;
  width:200px;
  display: flex;
  margin-left:25px;
}

.background{
  width:570px;
  /*background-image:url('./img/Christmas_Trees.png');*/
  background-size:cover;
  font-family: "Arial Black";
}
.title1{
  margin-top:220px;
  font-weight:bold;
  font-size:20px;
  color:#4E655D;

}
.title{
  margin-top:50px;
  font-weight:bold;
  font-size:30px;
  color:#4E655D;

}
.title:hover{
  font-size:40px;
  transition: all 0.4s ease-in-out;
  cursor: pointer;
}

input{
  outline-style: none ;
  border: 0;
  border-bottom:2px solid #ffffff;
  background-color:transparent;
  width: 150px;
  height:20px;
  font-family: cursive;
  font-size:17px;
  color:#445b53;
  font-weight:bold;
  margin-left: 10px;
}

input:focus{
  border-bottom:2px solid #1d694b;
  background-color:transparent;
  transition: all 0.2s ease-in;
  font-family:cursive;
  font-size:17px;
  color:#445b53;
  font-weight:bold;

}
input:hover{
  border-bottom:2px solid #445b53;
  background-color:transparent;
  transition: all 0.2s ease-in;
  font-family:cursive;
  font-size:17px;
  color:#445b53;
  font-weight:bold;

}

input:-webkit-autofill {
  /* 修改默认背景框的颜色 */
  box-shadow: 0 0 0px 1000px  #89AB9E inset !important;
  /* 修改默认字体的颜色 */
  -webkit-text-fill-color: #445b53;
}

input:-webkit-autofill::first-line {
  /* 修改默认字体的大小 */
  font-size: 15px;
  /* 修改默认字体的样式 */
  font-weight:bold;
}
.login_btn{
  background-color: #5f8276; /* #055d0c */
  border: none;
  color: #FAFAFA;
  padding: 7px 20px;
  text-align: center;
  text-decoration: none;
  font-size: 15px;
  border-radius: 10px;
  font-family: cursive;
  font-weight: bold;
  /*outline:none;*/
}
.login_btn:hover{
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  cursor: pointer;
  background-color: #0b5137;
  transition: all 0.2s ease-in;
}
</style>