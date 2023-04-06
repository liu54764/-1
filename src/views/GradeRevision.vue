<template>
   <top />
   <side />
   <Toast style="font-weight: 600;" />
   <div class="card">
      <Toolbar class=" p-toolbar-sm mb-2">
         <template #start>
            <Button label="新增" icon="pi pi-plus" class="p-button-sm mr-2 font-bold" @click="openNew" />
            <Button label="删除" icon="pi pi-trash" class="p-button-danger p-button-sm mr-2 font-bold"
               @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
            <div class="table-header flex flex-column md:flex-row md:justify-content-between">
               <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText v-model="filters['global'].value" placeholder="查找..." class="p-inputtext-sm" />
               </span>
            </div>
         </template>

         <template #end>
            <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="导入" chooseLabel="导入"
               class="mr-2 inline-block p-button-sm font-bold" />
            <Button label="导出" icon="pi pi-upload" class="p-button-help p-button-sm font-bold"
               @click="exportCSV($event)" />
         </template>

      </Toolbar>

      <DataTable ref="dt" :value="products" v-model:selection.sync="selectedProducts" class="p-datatable-sm"
         filterDisplay="menu" :paginator="true" :rows="8" v-model:editingRows="editingRows" editMode="row"
         @row-edit-save="onRowEditSave" v-model:filters="filters" :scrollable="true" scrollHeight="450px"
         paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
         :rowsPerPageOptions="[8, 15, 20]" currentPageReportTemplate=" {first}  至  {last} " responsiveLayout="scroll">

         <Column selectionMode="multiple" style="min-width: 40px;"></Column>
         <Column field="code" header="学号" sortField="code" style="min-width: 90px;">
            <template #filter="{ filterModel }">
               <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name" />
            </template>
         </Column>
         <Column field="name" header="姓名" style="min-width: 90px;">
            <template #filter="{ filterModel }">
               <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name" />
            </template>
         </Column>
         <Column field="code" header="班号" style="min-width: 90px;"></Column>
         <Column field="code" header="课程号" style="min-width: 90px;"></Column>
         <Column field="image" header="课程" style="min-width: 90px;"></Column>
         <Column field="image" header="课程类型" style="min-width: 100px;"></Column>
         <Column field="category" header="学分" :sortable="true" style="min-width: 100px;"></Column>
         <Column field="date" header="考试时间" :sortable="true" filterField="date" dataType="date" style="min-width: 150px;">
            <template #filter="{ filterModel }">
               <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
            </template>
         </Column>

         <Column field="quantity" header="分数" :sortable="true" style="min-width: 100px;"></Column>
         <Column field="description" header="绩点" :sortable="true" style="min-width: 100px;"></Column>
         <Column field="image" header="上传时间" style="min-width: 130px;"></Column>
         <!-- <Column :rowEditor="true" style="min-width: 50px;" bodyStyle="text-align:center"></Column> -->
         <Column style="min-width: 100px;">
            <template #body="slotProps">
               <Button :rowEditor="true" icon="pi pi-pencil" class="p-button-success mr-2 p-button-rounded" style="height: 35px;width: 35px;"
                  @click="editProduct(slotProps.data)" />
               <Button icon="pi pi-trash" class="p-button-warning p-button-rounded" style="height: 35px;width: 35px;"
                  @click="confirmDeleteProduct(slotProps.data)" />
            </template>
         </Column>
      </DataTable>


   </div>

   <Dialog :visible.sync="productDialog" :style="{ width: '450px' }" header="成绩信息" :modal="true" class="p-fluid">
      <img :src="'demo/images/product/' + product.image" :alt="product.image" class="product-image" v-if="product.image" />
      <div class="field">
         <label for="name">Name</label>
         <InputText id="name" v-model.trim="product.name" required="true" autofocus
            :class="{ 'p-invalid': submitted && !product.name }" />
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
            <label for="date">date</label>
            <InputNumber id="date" v-model="product.date" mode="currency" currency="USD" locale="en-US" />
         </div>
         <div class="field col">
            <label for="quantity">Quantity</label>
            <InputNumber id="quantity" v-model="product.quantity" integeronly />
         </div>
      </div>
      <template #footer>
         <Button label="取消" icon="pi pi-times" class="p-button-text font-bold" @click="hideDialog" size="small" />
         <Button label="保存" icon="pi pi-check" class="p-button-text font-bold" @click="saveProduct" size="small" />
      </template>
   </Dialog>

   <Dialog :visible.sync="deleteProductDialog" :styles="{ width: '450px' }" header="确认" :modal="true">
      <div class="confirmation-content">
         <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
         <span v-if="product">你 确 认 删 除 <b>{{ product.name }} </b> 吗?</span>
      </div>
      <template #footer>
         <Button label="否" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false" />
         <Button label="是" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
      </template>
   </Dialog>

   <Dialog :visible.sync="deleteProductsDialog" :styles="{ width: '450px' }" header="确认" :modal="true">
      <div class="confirmation-content">
         <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
         <span style="font-weight: 500; font-size: large;" v-if="product">你 确 认 删 除 吗?</span>
      </div>
      <template #footer>
         <Button label="否" icon="pi pi-times" class="p-button-text" @click="deleteProductsDialog = false" />
         <Button label="是" icon="pi pi-check" class="p-button-text" @click="deleteSelectedProducts" />
      </template>
   </Dialog>
</template>



<script>
import Toast from 'primevue/toast';
import top from '../components/top.vue'
import side from '../components/side.vue'
import mainout from '../components/main.vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import Toolbar from 'primevue/toolbar';
import FileUpload from 'primevue/fileupload';
import InputText from 'primevue/inputtext';
import RadioButton from 'primevue/radiobutton';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Textarea from 'primevue/textarea';
import Calendar from 'primevue/calendar';
import Chart from 'primevue/chart';
import { locale } from 'primevue/config';
export default {

   name: 'GradeRevision',
   components: {
      top, side, mainout, Dialog, Button, InputNumber, Toolbar, FileUpload, InputText, Column, RadioButton, DataTable, Textarea, Chart, FilterMatchMode
      , Toast, FilterOperator, Calendar, locale
   },
   data() {
      return {
         editingRows: [],
         products: [
            { "id": "1000", "code": "4275", "name": "tch", "description": "Prodion", "image": "bamch.jpg", "date": '2015-09-13', "category": "Accessories", "quantity": 24, "inventoryStatus": "INSTOCK", "rating": 5 },
            { "id": "10", "code": "4275", "name": "tch", "description": "Protion", "image": "bamch.jpg", "date": '2015-09-13', "category": "Accessories", "quantity": 24, "inventoryStatus": "INSTOCK", "rating": 5 },
            { "id": "1010", "code": "4275", "name": "tch", "description": "Prion", "image": "bamch.jpg", "date": '2015-09-13', "category": "Accessories", "quantity": 24, "inventoryStatus": "INSTOCK", "rating": 5 },


         ],
         product: null,
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
      onRowEditSave(event) {
            let { newData, index } = event;

            this.products[index] = newData;
        },
      // formatDate(value) {
      //       return value.toLocaleDateString('zh', {
      //           day: '2-digit',
      //           month: '2-digit',
      //           year: 'numeric'
      //       });
      //   },
      openNew() {
         this.product = {};
         this.submitted = false;
         this.productDialog = true;
      },
      hideDialog() {
         this.productDialog = false;
         this.submitted = false;
      },
      saveProduct() {
         this.submitted = true;

         if (this.product.name.trim()) {
            if (this.product.id) {
               this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
               this.products[this.findIndexById(this.product.id)] = this.product;
               this.$toast.add({ severity: 'success', summary: '成功', detail: '成绩   更新', life: 3000 });
            }
            else {
               this.product.id = this.createId();
               this.product.code = this.createId();
               this.product.image = 'product-placeholder.svg';
               this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
               this.products.push(this.product);
               this.$toast.add({ severity: 'success', summary: '成功', detail: '成绩   创建', life: 3000 });
            }

            this.productDialog = false;
            this.product = {};
         }
      },
      editProduct(product) {
         this.product = { ...product };
         this.productDialog = true;
      },
      confirmDeleteProduct(product) {
         this.product = product;
         this.deleteProductDialog = true;
      },
      deleteProduct() {
         this.products = this.products.filter(val => val.id !== this.product.id);
         this.deleteProductDialog = false;
         this.product = {};
         this.$toast.add({ severity: 'success', summary: '成功', detail: '成绩   删除', life: 3000 });
      },
      findIndexById(id) {
         let index = -1;
         for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
               index = i;
               break;
            }
         }

         return index;
      },
      createId() {
         let id = '';
         var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
         for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
         }
         return id;
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
         this.$toast.add({ severity: 'success', summary: '成功', detail: '成绩   删除', life: 3000 });
      },
      initFilters() {
         this.filters = {
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            representative: { value: null, matchMode: FilterMatchMode.IN },
            status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }


         }

      }
   }

}

</script>
 
<style  scoped> .card {
    margin-top: 20px;
    margin-left: 25px;
    width: 1270px;
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