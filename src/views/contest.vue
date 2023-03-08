<template>
    <top />
    <side />
  <div class="main  p-4 shadow-2 border-round-2xl">
  
      
  </div>
 <div class="main  p-4 shadow-2 border-round-2xl">

 </div>

  
  </template>
  
  <script>
  
  import top from '../components/top.vue'
  import side from '../components/side.vue'
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Toolbar from 'primevue/toolbar';
  import Dialog from 'primevue/dialog';
  import Button from 'primevue/button';
  import InputText  from 'primevue/inputtext';
  export default {
    name:'contest',
   components:{
    top,side,Column,DataTable,Toolbar,Dialog,Button,InputText
   },
   data() {
        return {
            customers: [

        ],
        }
    },
    created() {
        // this.customerService = new CustomerService();
    },
    mounted() {
        // this.customerService.getCustomersLarge().then(data => {
        //     this.customers = data;
        //     this.customers.forEach(customer => customer.date = new Date(customer.date));
        //     this.loading = false;
        // });
    },
    methods: {
       
    }
}
  </script>
  
  <style scoped> 
   .main{
      margin-top: 20px;
      margin-left: 20px;
      width:630px;
      height: 85vh;
      float: left;
    }


  </style>