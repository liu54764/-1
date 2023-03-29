<template>
   <top />
   <side />
   <div class="card">
    <Toolbar class=" p-toolbar-sm mb-2">
        <template #start>
            <!-- <Button label="新增" icon="pi pi-plus" class="p-button-sm mr-2 font-bold" @click="openNew" />
            <Button label="删除" icon="pi pi-trash" class="p-button-danger p-button-sm mr-2 font-bold" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" /> -->
            <div class="table-header flex flex-column md:flex-row md:justify-content-between">
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="filters['global'].value" placeholder="查找..." class="p-inputtext"/>
                </span>
            </div> 
        </template>

        <template #end>
            <!-- <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="导入" chooseLabel="导入" class="mr-2 inline-block p-button-sm font-bold" /> -->
            <Button label="导出" icon="pi pi-upload" class="p-button-help p-button-sm font-bold" @click="exportCSV($event)"  />
        </template>

    </Toolbar>
    <DataTable ref="dt" :value="products" v-model:selection.sync="selectedProducts" dataKey="id"
    class="p-datatable-sm"
    showGridlines
        :scrollable="true" scrollHeight="480px"
        :paginator="true" :rows="8" :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[8,15,20]"
        currentPageReportTemplate=" {first}  至  {last} " responsiveLayout="scroll">

        <!-- <Column selectionMode="multiple" headerStyle="width: 3em"></Column> -->
                <Column field="code" header="学号" :sortable="true" style="width:10% ;" class="text-center"></Column>
                <Column field="name" header="姓名" style="width:10% ;"></Column>
                <Column field="category" header="年龄" :sortable="true" style="width:10% ;"></Column>
                <Column field="category" header="性别" :sortable="true" style="width:5% ;"></Column>
                <Column field="price" header="总绩点" :sortable="true" style="width:5% ;"></Column>
                <Column field="quantity" header="总学分" :sortable="true" style="width:5% ;">
                    <template #body="{data}">
                      <Button class="p-button-link"  :label="data.quantity"   @mouseover="toggle" style="width: 50px;"/>
                    </template>
                </Column>
                <Column field="description" header="竞赛情况" :sortable="true" style="width:15% ;">
                    <template #body="{data}">
                         <Rating :modelValue="data.description" readonly :cancel="false" @mouseover="toggle" class="p-rating"/>
                    </template>
                </Column>
                <Column field="description" header="实习情况" :sortable="true" style="width:15% ;">
                    <template #body="{data}">
                         <Rating :modelValue="data.description" readonly :cancel="false" @mouseover="toggle" />
                    </template>
                </Column>
                <Column field="status" header="年级状态" style="width:15% ;">
                    <template #body="{ data }">
                             <Tag :value="data.status" :severity="getSeverity(data.status)" />
                    </template>
                </Column>
                <!-- <Column :exportable="false" :styles="{'min-width':'8rem'}" style="width:100px ;">
                    <template #body="slotProps">
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>  -->
        </DataTable>
    </div>
   

<OverlayPanel ref="op">
    <img src="https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg" alt="Bamboo Watch" />
</OverlayPanel>

</template>
    

<script>
 import Rating from 'primevue/rating';
 import Tag from 'primevue/tag';
 import Toolbar from 'primevue/toolbar';
import OverlayPanel from 'primevue/overlaypanel';
  import top from '../components/top.vue'
  import side from '../components/side.vue'
  import Dialog from 'primevue/dialog';
  import Button from 'primevue/button';
  import InputNumber from 'primevue/inputnumber';
  import {FilterMatchMode,FilterOperator} from 'primevue/api/';
  import FileUpload from 'primevue/fileupload';
  import InputText  from 'primevue/inputtext';
  import RadioButton from 'primevue/radiobutton';
  import Column from 'primevue/column';
  import DataTable from 'primevue/datatable';
  import Textarea from 'primevue/textarea';
  import Dropdown from 'primevue/dropdown';
//   import MultiSelect from 'primevue/multiSelect';
    export default {
      name: "inqury",
      components:{
    top,side,Dialog,Button,InputNumber,FileUpload,InputText,Column,RadioButton,DataTable,Textarea,FilterMatchMode
,FilterOperator,Dropdown,OverlayPanel,Toolbar,Tag,Rating
},
data() {
        return {
            products:  [
            {"id": "1000","rating":"5","code": "200101111","name": "李明","description": 5,"status": "unqualified","price": 65,"category": "Accessories","quantity": 24,"inventoryStatus": "INSTOCK","rating": 5},
            {"id": "1000","rating":"5","code": "200101111","name": "李明","description": 5,"status": "unqualified","price": 65,"category": "Accessories","quantity": 24,"inventoryStatus": "INSTOCK","rating": 5},
            {"id": "1000","rating":"5","code": "200101111","name": "李明","description": 5,"status": "unqualified","price": 65,"category": "Accessories","quantity": 24,"inventoryStatus": "INSTOCK","rating": 5},
            {"id": "1000","rating":"5","code": "200101111","name": "李明","description": 5,"status": "unqualified","price": 65,"category": "Accessories","quantity": 24,"inventoryStatus": "INSTOCK","rating": 5},
            {"id": "1000","rating":"5","code": "200101111","name": "李明","description": 5,"status": "unqualified","price": 65,"category": "Accessories","quantity": 24,"inventoryStatus": "INSTOCK","rating": 5},
            {"id": "1000","rating":"5","code": "200101111","name": "李明","description": 5,"status": "unqualified","price": 65,"category": "Accessories","quantity": 24,"inventoryStatus": "INSTOCK","rating": 5},

       {"id": "1000","rating":"5","code": "200101111","name": "李明","description": 5,"status": "unqualified","price": 65,"category": "Accessories","quantity": 24,"inventoryStatus": "INSTOCK","rating": 5},
   ],
            product:null,
            filters: null,
            selectedProducts: null,
            statuses: ['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal']
        };
    },
    created(){
        this.initFilters();
    },
    mounted() {
        // ProductService.getProductsSmall()
        //     .then((data) => (this.products = data))
        //     .then(() => (this.selectedProduct = this.products[0]));
    },
    methods: {
        toggle(event) {
            this.$refs.op.toggle(event);
        },
        // onProductSelect(event) {
        //     this.$refs.op.hide();
        //     this.$toast.add({ severity: 'info', summary: 'Product Selected', detail: event.data.name, life: 3000 });
        // }
        initFilters() {
            this.filters = {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                representative: { value: null, matchMode: FilterMatchMode.IN },
                status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
            };
        },
        getSeverity(status) {
            switch (status) {
                case 'unqualified':
                    return 'danger';

                case 'qualified':
                    return 'success';

                case 'new':
                    return 'info';

                case 'negotiation':
                    return 'warning';

                case 'renewal':
                    return null;
            }
        },
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
    }
    }
</script>
    
<style scoped>
.body{
    margin-top: 20px;
    margin-left: 240px;
    height: 85vh;
    width: 80%;
    background-color: rgb(29, 27, 24);
}
.card{
    margin-top: 20px;
    margin-left: 240px;
    height: 85vh;
    width: 1280px;
}
.p-rating .p-rating-icon {  color: #6f5b1e; /* 更改星星的颜色 */}
</style>