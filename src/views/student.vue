<template>
  <top />
  <side />
  <Toast style="font-weight: 600;"/>
  <div class="p-d-flex p-jc-center p-mt-6">
    <div class="card p-p-4" style="width: 30rem;">
      <div class="p-d-flex p-jc-center">
        <img src="" class="avatar p-mb-4" alt="avatar">
      </div>
      <h2 class="p-text-center p-mb-4">Your Name</h2>
      <div class="p-grid p-justify-center">
        <div class="p-col-4 p-text-center">
          <h5>Email</h5>
          <p>youremail@example.com</p>
        </div>
        <div class="p-col-4 p-text-center">
          <h5>Phone</h5>
          <p>(123) 456-7890</p>
        </div>
        <div class="p-col-4 p-text-center">
          <h5>Location</h5>
          <p>City, State</p>
        </div>
      </div>
      <hr>
      <div>
        <h4>About Me</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultricies quam vitae risus vestibulum, ac mattis eros sollicitudin. Donec blandit lectus nunc, et tincidunt tortor aliquet sit amet. In hac habitasse platea dictumst.</p>
      </div>
    </div>
  </div>
<!-- <div class="main" style="font-weight: 600;padding: 20px;">
<div class="surface-section">
    <div class="font-medium text-3xl text-900 mb-3">Movie Information</div>
    <div class="text-500 mb-5">Morbi tristique blandit turpis. In viverra ligula id nulla hendrerit rutrum.</div>
    <ul class="list-none p-0 m-0">
        <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
            <div class="text-500 w-6 md:w-2 font-medium">Title</div>
            <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">Heat</div>
            <div class="w-6 md:w-2 flex justify-content-end">
                <Button  icon="pi pi-pencil" class="p-button-text"></Button>
            </div>
        </li>
        <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
            <div class="text-500 w-6 md:w-2 font-medium">Genre</div>
            <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                <Chip label="Crime" class="mr-2"></Chip>
                <Chip label="Drama" class="mr-2"></Chip>
                <Chip label="Thriller"></Chip>
            </div>
            <div class="w-6 md:w-2 flex justify-content-end">
                <Button  icon="pi pi-pencil" class="p-button-text"></Button>
            </div>
        </li>
        <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
            <div class="text-500 w-6 md:w-2 font-medium">Director</div>
            <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">Michael Mann</div>
            <div class="w-6 md:w-2 flex justify-content-end">
                <Button  icon="pi pi-pencil" class="p-button-text"></Button>
            </div>
        </li>
        <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
            <div class="text-500 w-6 md:w-2 font-medium">Actors</div>
            <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">Robert De Niro, Al Pacino</div>
            <div class="w-6 md:w-2 flex justify-content-end">
                <Button  icon="pi pi-pencil" class="p-button-text"></Button>
            </div>
        </li>
        <li class="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 surface-border flex-wrap">
            <div class="text-500 w-6 md:w-2 font-medium">Plot</div>
            <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
                A group of professional bank robbers start to feel the heat from police
                when they unknowingly leave a clue at their latest heist.</div>
            <div class="w-6 md:w-2 flex justify-content-end">
                <Button  icon="pi pi-pencil" class="p-button-text"></Button>
            </div>
        </li>
    </ul>
</div>
 
</div> -->
<!-- <div class="p-d-flex p-flex-column p-jc-center p-ai-center">
    <Card class="p-card p-mt-5" style="width: 400px">
      <div class="p-card-header p-d-flex p-ai-center">
        <Avatar :label="student.name" size="large" class="p-mr-3"></Avatar>
        <h2 class="p-m-0">{{ student.name }}</h2>
      </div>
      <Divider></Divider>
      <div class="p-card-content">
        <DataTable :value="[student]" :paginator="false" :rows="10" class="p-datatable-striped">
          <Column field="age" header="年龄"></Column>
          <Column field="gender" header="性别"></Column>
          <Column field="address" header="地址"></Column>
          <Column field="phone" header="电话"></Column>
          <Column field="email" header="邮箱"></Column>
          <Column field="enrollment_date" header="入学时间"></Column>
          <Column field="graduation_date" header="毕业时间"></Column>
          <Column field="major" header="专业"></Column>
        </DataTable>
      </div>
    </Card>
  </div>

<Dialog :visible.sync="infoDialog" :style="{width: '450px'}" header="学生信息" :modal="true" class="p-fluid">
    <div class="field">
  
    </div>
    <div class="field">
        
    </div>
    <template #footer>
        <Button label="取消" icon="pi pi-times" class="p-button-text font-bold" @click="this.infoDialog=false"/>
        <Button label="保存" icon="pi pi-check" class="p-button-text font-bold" @click="saveinfo" />
    </template>
</Dialog> -->

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
import Avatar from 'primevue/avatar'
import Divider from 'primevue/divider'
import Chip from 'primevue/chip'
import { Card } from 'primevue/card';

export default {
  name:'student',
 components:{
  Card,
    Column,top,side,Avatar,Divider,DataTable
 },
 data() {
    return {
      student: {
        name: '张三',
        age: 22,
        gender: '男',
        address: '北京市海淀区',
        phone: '18888888888',
        email: 'zhangsan@example.com',
        enrollment_date: '2021-09-01',
        graduation_date: '2025-06-30',
        major: '计算机科学与技术',
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
.avatar {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}
</style>