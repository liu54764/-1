<template>
    <top />
    <side />
    <div class="main  shadow-2 border-round-2xl">

    </div>


  </template>
  
  <script>
  
  import top from '../components/top.vue'
  import side from '../components/side.vue'
  import mainout from '../components/main.vue'
  import Toast from 'primevue/toast';
  import Toolbar from 'primevue/toolbar';
  import FileUpload from 'primevue/fileupload';
  import InputText  from 'primevue/inputtext';
  import RadioButton from 'primevue/radiobutton';
  import Column from 'primevue/column';
  import DataTable from 'primevue/datatable';
  import Textarea from 'primevue/textarea';
  import Chart from 'primevue/chart';
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
      width:900px;
      height: 85vh;
      float: left;
 
    }
  
  </style>