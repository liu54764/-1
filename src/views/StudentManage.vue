<template>
   <top />
   <side />
   <Toast style="font-weight: 600;"/>
   <div class="card">
   <Toolbar class=" p-toolbar-sm mb-2">
       <template #start>
           <Button label="新增" icon="pi pi-plus" class="p-button-sm mr-2 font-bold" @click="openNew" />
           <Button label="删除" icon="pi pi-trash" class="p-button-danger p-button-sm mr-2 font-bold" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
           <div class="table-header flex flex-column md:flex-row md:justify-content-between">
               <span class="p-input-icon-left">
                   <i class="pi pi-search" />
                   <InputText v-model="filters['global'].value" placeholder="查找..." class="p-inputtext"/>
               </span>
           </div> 
       </template>

       <template #end>
           <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="导入" chooseLabel="导入" class="mr-2 inline-block p-button-sm font-bold" />
           <Button label="导出" icon="pi pi-upload" class="p-button-help p-button-sm font-bold" @click="exportCSV($event)"  />
       </template>

   </Toolbar>

   <DataTable ref="dt" :value="products" v-model:selection.sync="selectedProducts" dataKey="id"
   class="p-datatable-sm"  showGridlines 
       :scrollable="true" scrollHeight="480px"
       :paginator="true" :rows="8" :filters="filters"
       paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[8,15,20]"
       currentPageReportTemplate=" {first}  至  {last} " responsiveLayout="scroll">

       <Column selectionMode="multiple" headerStyle="min-width: 50px"></Column>
               <Column field="code" header="学号" :sortable="true" style="min-width: 140px;"></Column>
               <Column field="name" header="用户名" style="min-width: 140px;"></Column>
               <Column field="category" header="性别" style="min-width: 70px;"></Column>
               <Column field="price" header="专业" style="min-width: 100px;"></Column>
               <Column field="quantity" header="年级" :sortable="true" style="min-width: 100px;"></Column>
               <Column field="quantity" header="出生日期" :sortable="true" style="min-width: 140px;"></Column>
               <Column field="quantity" header="邮箱" style="min-width: 150px;"></Column>
               <Column field="description" header="电话" style="min-width: 140px;"></Column>
               <Column field="image" header="住址" style="min-width: 150px;"></Column>
               <Column :exportable="false" :styles="{'min-width':'50px'}">
           <template #body="slotProps">
               <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteProduct(slotProps.data)" />
           </template>
               </Column> 
       </DataTable>


   </div>


<Dialog :visible.sync="productDialog" :style="{width: '450px'}" header="成绩信息" :modal="true" class="p-fluid">
   <img :src="'demo/images/product/' + product.image" :alt="product.image" class="product-image" v-if="product.image" />
   <div class="field">
       <label for="name">Name</label>
       <InputText id="name" v-model.trim="product.name" required="true" autofocus :class="{'p-invalid': submitted && !product.name}" />
       <small class="p-invalid" v-if="submitted && !product.name">Name is required.</small>
   </div>
   <div class="field">
       <label for="description">Description</label>
       <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" />
   </div>

   <div class="field">
       <label class="mb-3">Category</label>
       <div class="formgrid grid">
           <div class="field-radiobutton col-6">
               <RadioButton id="category1" name="category" value="Accessories" v-model="product.category" />
               <label for="category1">Accessories</label>
           </div>
           <div class="field-radiobutton col-6">
               <RadioButton id="category2" name="category" value="Clothing" v-model="product.category" />
               <label for="category2">Clothing</label>
           </div>
           <div class="field-radiobutton col-6">
               <RadioButton id="category3" name="category" value="Electronics" v-model="product.category" />
               <label for="category3">Electronics</label>
           </div>
           <div class="field-radiobutton col-6">
               <RadioButton id="category4" name="category" value="Fitness" v-model="product.category" />
               <label for="category4">Fitness</label>
           </div>
       </div>
   </div>

   <div class="formgrid grid">
       <div class="field col">
           <label for="price">Price</label>
           <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" />
       </div>
       <div class="field col">
           <label for="quantity">Quantity</label>
           <InputNumber id="quantity" v-model="product.quantity" integeronly />
       </div>
   </div>
   <template #footer>
       <Button label="取消" icon="pi pi-times" class="p-button-text font-bold" @click="hideDialog"/>
       <Button label="保存" icon="pi pi-check" class="p-button-text font-bold" @click="saveProduct" />
   </template>
</Dialog>

<Dialog :visible.sync="deleteProductDialog" :styles="{width: '450px'}" header="确认" :modal="true">
   <div class="confirmation-content">
       <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
       <span v-if="product">你 确 认 删 除 <b>{{product.name}} </b> 吗?</span>
   </div>
   <template #footer>
       <Button label="否" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false"/>
       <Button label="是" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
   </template>
</Dialog>

<Dialog :visible.sync="deleteProductsDialog" :styles="{width: '450px'}" header="确认" :modal="true">
   <div class="confirmation-content">
       <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
       <span style="font-weight: 500; font-size: large;" v-if="product">你 确 认 删 除  吗?</span>
   </div>
   <template #footer>
       <Button label="否" icon="pi pi-times" class="p-button-text" @click="deleteProductsDialog = false"/>
       <Button label="是" icon="pi pi-check" class="p-button-text" @click="deleteSelectedProducts" />
   </template>
</Dialog>




 </template>



 <script>
 import Toast from 'primevue/toast';
 import top from '../components/top.vue'
 import side from '../components/side.vue'
 import mainout from '../components/main.vue'
 import {FilterMatchMode} from 'primevue/api';
 import Dialog from 'primevue/dialog';
 import Button from 'primevue/button';
 import InputNumber from 'primevue/inputnumber';
 import Toolbar from 'primevue/toolbar';
 import FileUpload from 'primevue/fileupload';
 import InputText  from 'primevue/inputtext';
 import RadioButton from 'primevue/radiobutton';
 import Column from 'primevue/column';
 import DataTable from 'primevue/datatable';
 import Textarea from 'primevue/textarea';
 import Chart from 'primevue/chart';
 export default {
   
   name:'StudentManage',
  components:{
   top,side,mainout,Dialog,Button,InputNumber,Toolbar,FileUpload,InputText,Column,RadioButton,DataTable,Textarea,Chart,FilterMatchMode
,Toast
  },
  data() {
       return {
            products:  [
      {"id": "1000252782","code": "20070117","name": "李华","description": "Product Description","image": "bamboo-watch.jpg","price": 65,"category": "男","quantity": 24,"inventoryStatus": "INSTOCK","rating": 5},
      {"id": "1001","code": "nvklal433","name": "Black Watch","description": "Product Description","image": "black-watch.jpg","price": 72,"category": "Accessories","quantity": 61,"inventoryStatus": "INSTOCK","rating": 4},
      {"id": "1002","code": "zz21cz3c1","name": "Blue Band","description": "Product Description","image": "blue-band.jpg","price": 79,"category": "Fitness","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 3},
      {"id": "1003","code": "244wgerg2","name": "Blue T-Shirt","description": "Product Description","image": "blue-t-shirt.jpg","price": 29,"category": "Clothing","quantity": 25,"inventoryStatus": "INSTOCK","rating": 5},
      {"id": "1004","code": "h456wer53","name": "Bracelet","description": "Product Description","image": "bracelet.jpg","price": 15,"category": "Accessories","quantity": 73,"inventoryStatus": "INSTOCK","rating": 4},
      {"id": "1005","code": "av2231fwg","name": "Brown Purse","description": "Product Description","image": "brown-purse.jpg","price": 120,"category": "Accessories","quantity": 0,"inventoryStatus": "OUTOFSTOCK","rating": 4},
      {"id": "1006","code": "bib36pfvm","name": "Chakra Bracelet","description": "Product Description","image": "chakra-bracelet.jpg","price": 32,"category": "Accessories","quantity": 5,"inventoryStatus": "LOWSTOCK","rating": 3},
      {"id": "1007","code": "mbvjkgip5","name": "Galaxy Earrings","description": "Product Description","image": "galaxy-earrings.jpg","price": 34,"category": "Accessories","quantity": 23,"inventoryStatus": "INSTOCK","rating": 5},
      {"id": "1008","code": "vbb124btr","name": "Game Controller","description": "Product Description","image": "game-controller.jpg","price": 99,"category": "Electronics","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 4},
      {"id": "1009","code": "cm230f032","name": "Gaming Set","description": "Product Description","image": "gaming-set.jpg","price": 299,"category": "Electronics","quantity": 63,"inventoryStatus": "INSTOCK","rating": 3}
  ],
           product:null,
           productDialog: false,
           deleteProductDialog: false,
           deleteProductsDialog: false,
           product: {},
           selectedProducts: null,
           filters: {},
           submitted: false,
       }
   },
   created() {
       // this.productService = new ProductService();
       this.initFilters();
   },
   mounted() {
       // this.productService.getProducts().then(data => this.products = data);
   },
   methods: {
       openNew() {
           this.product = {};
           this.submitted = false;
           this.productDialog = true;
       },
       hideDialog() {
           this.productDialog = false;
           this.submitted = false;
       },
       confirmDeleteProduct(product) {
           this.product = product;
           this.deleteProductDialog = true;
       },
       deleteProduct() {
           this.products = this.products.filter(val => val.id !== this.product.id);
           this.deleteProductDialog = false;
           this.product = {};
           this.$toast.add({severity:'success', summary: '成功', detail: '学生   删除', life: 3000});
       },
       exportCSV() {
           this.$refs.dt.exportCSV();
       },
       confirmDeleteSelected() {
           this.deleteProductsDialog = true;
       },
       deleteSelectedProducts() {
           this.products = this.products.filter(val => !this.selectedProducts.includes(val));
           this.deleteProductsDialog = false;
           this.selectedProducts = null;
           this.$toast.add({severity:'success', summary: '成功', detail: '学生   删除', life: 3000});
       },
       initFilters() {
           this.filters = {
               'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
           }
       }
   }
 
 }
 
 </script>
 
 <style  scoped> 
 .card{
   margin-top: 20px;
     margin-left: 25px;
     width:1270px;
     height: 85vh;
     float: left;
 }
 .table-header {
   display: flex;
   align-items: center;
   justify-content: space-between;

   @media screen and (max-width: 960px) {
       align-items: start;
  }
}

.product-image {
   width: 100px;
   box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
   width: 150px;
   margin: 0 auto 2rem auto;
   display: block;
}

.confirmation-content {
   display: flex;
   align-items: center;
   justify-content: center;
}

@media screen and (max-width: 960px) {
  :deep(.p-toolbar) {
     flex-wrap: wrap;


  }
}
html {
   font-size: 12px;
}
</style>