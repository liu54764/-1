<template>
  <el-config-provider :locale="locale">
    <router-view/>
  </el-config-provider>
</template>

<script>
import { ElConfigProvider } from 'element-plus'
  import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default {
  name: 'App',
  components:{
    [ElConfigProvider.name]: ElConfigProvider
  },
  setup() {
      
      // 切换为中文
      let locale = zhCn

      return {
        locale
      }
    }

}
</script>

<style>
#app{

  font-family: 'Courier New', Courier, monospace;
  text-align: center;
  color:rgb(87, 59, 23);
}
body {
    font-family: (--font-family);
} 
</style>
