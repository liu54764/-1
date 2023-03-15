<template>
  <top />
  <side />
  <Toast style="font-weight: 600;"/>
<div class="main  shadow-2 border-round-2xl">
  <div style="margin-top: 30px;margin-left: 20px;width:50px;font-size: x-large;font-weight: 600;float: left;" class="text-blue-600">
    简介
  </div>
 
    <Button label="修改" class="p-button-text font-bold p-button-success" style="margin-top: 20px;margin-left: 320px;font-size: large;font-weight: 600;float: left;" @click="editinfo"/>
    <div class="card" style="">
      <!-- <div style="height: 60px;width: 100%;">
        <div style="width: 100px;margin-left: 0px;float: left;">
        <svg t="1678169263842" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1487" data-spm-anchor-id="a313x.7781069.0.i4" width="70" height="70"><path d="M512 148.5c49.1 0 96.7 9.6 141.5 28.5 43.3 18.3 82.2 44.5 115.6 77.9 33.4 33.4 59.6 72.3 77.9 115.6 18.9 44.8 28.5 92.4 28.5 141.5s-9.6 96.7-28.5 141.5c-18.3 43.3-44.5 82.2-77.9 115.6-33.4 33.4-72.3 59.6-115.6 77.9-44.8 18.9-92.4 28.5-141.5 28.5s-96.7-9.6-141.5-28.5c-43.3-18.3-82.2-44.5-115.6-77.9-33.4-33.4-59.6-72.3-77.9-115.6-18.9-44.8-28.5-92.4-28.5-141.5s9.6-96.7 28.5-141.5c18.3-43.3 44.5-82.2 77.9-115.6s72.3-59.6 115.6-77.9c44.8-18.9 92.4-28.5 141.5-28.5m0-50C283.6 98.5 98.5 283.6 98.5 512S283.6 925.5 512 925.5 925.5 740.4 925.5 512 740.4 98.5 512 98.5z" p-id="1488" fill="#c4dae6"></path><path d="M512 401m-106 0a106 106 0 1 0 212 0 106 106 0 1 0-212 0Z" p-id="1489" fill="#c4dae6"></path><path d="M514.5 540.8c-105.1 0-195 68.8-231.6 166.2 28.2 27.9 60.4 50.1 95.9 65.9 40.2 18 83 27.1 127.1 27.1s86.9-9.1 127.1-27.1c38.9-17.4 73.8-42.3 103.8-74.1 1.4-1.5 2.7-3 4.1-4.4-39.2-90.6-125.8-153.6-226.4-153.6z" p-id="1490" fill="#c4dae6"></path></svg>
      </div>
      <div style="float: left;margin-top: 30px;font-weight: 700;font-size:20px ;">
        学号: {{ info.number }}  <br>
      </div>
      </div>
      <div style="width: 100px;margin-left: 0px;font-size: 18px;font-weight: 500;" class="text-blue-300">
      <p class="">
        姓名: {{ info.name }}
      </p>
      <p  class="">
        年龄: {{ info.name }}
      </p>
      <p  class="">
        年级: {{ info.name }}
      </p>
      <p  class="">
        班级: {{ info.name }}
      </p>
       <p>
        联系方式：{{  }}
       </p>
       <p>
        QQ:{{  }}
       </p>
       <p>
        手机：{{  }}
       </p>

      </div> -->
   
    </div>
 
 
</div>
<div class="main" style="width: 750px;"></div>

<Dialog :visible.sync="infoDialog" :style="{width: '450px'}" header="学生信息" :modal="true" class="p-fluid">
    <div class="field">
  
    </div>
    <div class="field">
        
    </div>
    <template #footer>
        <Button label="取消" icon="pi pi-times" class="p-button-text font-bold" @click="this.infoDialog=false"/>
        <Button label="保存" icon="pi pi-check" class="p-button-text font-bold" @click="saveinfo" />
    </template>
</Dialog>

</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import Toast from 'primevue/toast';
import top from '../components/top.vue'
import side from '../components/side.vue'
import mainout from '../components/main.vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputNumber from 'primevue/inputnumber'
import InputText  from 'primevue/inputtext';
import RadioButton from 'primevue/radiobutton';
import Calendar from 'primevue/calendar'
export default {
  name:'student',
 components:{
  top,side,mainout,Button,Dialog,InputNumber,InputText,RadioButton,Toast,DataTable,Column,ColumnGroup,Row,Calendar
 },
 data() {
        return {
         
          infoDialog:false,
          info:{
            number:20070117,
            name:"null",
            createtime:null,
          },
        };
    },
    created() {
        // this.productService = new ProductService();
        // this.initFilters();
    },
    mounted() {
        // this.productService.getProducts().then(data => this.products = data);
    },
    methods:{
      editinfo() {
            this.infoDialog = true;
        },
        saveinfo() {
         
            this.$toast.add({severity:'success', summary: '成功', detail: '信息   更新', life: 3000});
            this.infoDialog = false;
            
        },
    }

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
.card{
  width: 400px;
  height: 500px;
  margin-top: 80px;
  margin-left: 40px;
}
.field{
  height: 50px;
  width: 100%;
}
</style>