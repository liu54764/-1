<template>
    <top />
    <side/>
    <Toast style="font-weight: 600;" />
 
        <div class="card">
            <Toolbar class=" p-toolbar-sm mb-2">
                <template #start>
                    <Button type="button" icon="pi pi-filter-slash" label="清空" outlined @click="clearFilter()"
                        class="p-button-sm" />

                    <div class="table-header flex flex-column md:flex-row md:justify-content-between"
                        style="margin-left: 10px;">
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="查找..." class="p-inputtext-sm" />
                        </span>
                    </div>
                </template>

                <template #end>
                    <Button label="导出" icon="pi pi-upload" class="p-button-help p-button-sm font-bold"
                        @click="exportCSV($event)" />
                </template>

            </Toolbar>

            <DataTable ref="dt" :value="products" v-model:selection.sync="selectedProducts" dataKey="id"
                class="p-datatable-sm" :paginator="true" :rows="9" :filters="filters" :scrollable="true"
                scrollHeight="450px"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[10, 15, 20]" currentPageReportTemplate=" {first}  至  {last} "
                responsiveLayout="scroll">

                <Column selectionMode="multiple" headerStyle="min-width: 40px"></Column>
                <Column field="code" header="课程号" :sortable="true" style="min-width: 100px;"></Column>
                <Column field="name" header="课程" style="min-width: 100px;"></Column>
                <Column field="name" header="课程类型" style="min-width: 100px;"></Column>
                <Column field="category" header="学分" :sortable="true" style="min-width: 100px;"></Column>
                <Column field="price" header="考试时间" :sortable="true" style="min-width: 130px;"></Column>
                <!-- <Column field="quantity" header="考试类型" style="min-width: 100px;"></Column> -->
                <Column field="quantity" header="分数" :sortable="true" style="min-width: 100px;"></Column>
                <Column field="description" header="绩点" :sortable="true" style="min-width: 10px;"></Column>
                <Column field="status" header="状态" style="min-width: 100px;">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.status" :severity="getStatusLabel(slotProps.data.status)" />
                    </template>
                </Column>
            </DataTable>
        </div>
        <div style="float: left;width: 230px;height: 85vh;margin-top: 20px;margin-left: 20px;">
            <Chart type="pie" :data="chartData" :options="chartOptions"    style="margin-top: 30px;"/>
            <Chart type="doughnut" :data="chartData1" :options="chartOptions"  style="margin-top: 40px;"/>
        </div>
  
</template>



<script>
import Toast from 'primevue/toast';
import top from '../components/top.vue'
import side from '../components/side.vue'
import { FilterMatchMode } from 'primevue/api';
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
import Chart from 'primevue/chart';
import Tag from 'primevue/tag';
export default {

    name: 'grade',
    components: {
        top, side, Dialog, Button, InputNumber, Toolbar, FileUpload, InputText, Column, RadioButton, DataTable, Textarea, Chart, FilterMatchMode
        , Toast, Tag
    },
    data() {
        return {
            products: [
                { "id": "1000", "code": "f230fh0g3", "name": "Bamboo Watch", "description": "Protion", "image": "bpg", "price": 65, "category": "Accessories", "quantity": 24, "inventoryStatus": "INSTOCK", "status": "优秀" },
                { "id": "1001", "code": "nvklal433", "name": "Black Watch", "description": "Prption", "image": ".jpg", "price": 72, "category": "Accessories", "quantity": 61, "inventoryStatus": "INSTOCK", "status": "不及格" },
                { "id": "1002", "code": "zz21cz3c1", "name": "Blue Band", "description": "Proption", "image": "blupg", "price": 79, "category": "Fitness", "quantity": 2, "inventoryStatus": "LOWSTOCK", "status": "良好" },
                { "id": "1003", "code": "244wgerg2", "name": "Blue T-Shirt", "description": "Pption", "image": "bl.jpg", "price": 29, "category": "Clothing", "quantity": 25, "inventoryStatus": "INSTOCK", "status": "优秀" },
                { "id": "1004", "code": "h456wer53", "name": "Bracelet", "description": "Ption", "image": "bg", "price": 15, "category": "Accessories", "quantity": 73, "inventoryStatus": "INSTOCK", "status": "及格" },
                { "id": "1005", "code": "av2231fwg", "name": "Brown Purse", "description": "Pron", "image": "bracele.jpg", "price": 120, "category": "Accessories", "quantity": 0, "inventoryStatus": "OUTOFSTOCK", "status": "良好" },
                { "id": "1006", "code": "bib36pfvm", "name": "Chakra Bracelet", "description": "Prtion", "image": "chakra-bracelet.jpg", "price": 32, "category": "Accessories", "quantity": 5, "inventoryStatus": "LOWSTOCK", "status": "良好" },
                { "id": "1007", "code": "mbvjkgip5", "name": "Galaxy Earrings", "description": "Prion", "image": "galgs.jpg", "price": 34, "category": "Accessories", "quantity": 23, "inventoryStatus": "INSTOCK", "status": "优秀" },
                { "id": "1008", "code": "vbb124btr", "name": "Game Controller", "description": "Pron", "image": "gamer.jpg", "price": 99, "category": "Electronics", "quantity": 2, "inventoryStatus": "LOWSTOCK", "status": "良好" },
                { "id": "1009", "code": "cm230f032", "name": "Gaming Set", "description": "Proon", "image": "gaminpg", "price": 299, "category": "Electronics", "quantity": 63, "inventoryStatus": "INSTOCK", "status": "及格" }
            ],
            product: {},
            selectedProducts: null,
            filters: {},
            submitted: false,
            chartData: {
                labels: ['优秀', '良好', '及格', '不及格'],
                datasets: [
                    {
                        data: [300, 50, 100, 40],
                        backgroundColor: [
                            "#66BB6A",
                            "#2196f3",
                            "#FFA726",
                            "#F50101"

                        ],
                        hoverBackgroundColor: [
                            "#6ebe71",
                            "#4baaf5",
                            "#FFB74D",
                            "#F65252"
                        ]
                    }
                ]
            },
            chartData1: {
                labels: ['通过', '重修', '未通过'],
                datasets: [
                    {
                        data: [300, 50, 100],
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ]
                    }
                ]
            },
            chartOptions: {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true,
                        }
                    }
                }
            }
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
        GetInformation() {
            let userinfo = JSON.parse(localStorage.getItem('userinfo'))
            this.id = userinfo.data.id
        },
        GetStudent() {
            let url = "/student/credit" + "?id=" + this.id
            request.get(url).then(res => {
                this.gender = res.data.data.gender
                this.birthday = res.data.data.birthday
                this.phone = res.data.data.phone
                this.email = res.data.data.email
                this.address = res.data.data.address
                this.admission_date = res.data.data.admission_date
                this.graduation_date = res.data.data.graduation_date
                this.major = res.data.data.major
                this.name = res.data.data.name
                console.log(res)
            })
        },
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
        initFilters() {
            this.filters = {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            }
        },
        clearFilter() {
            this.initFilters();
        },
        getStatusLabel(status) {
            switch (status) {
                case '优秀':
                    return 'success';

                case '良好':
                    return 'secondary';

                case '及格':
                    return 'warning';

                case '不及格':
                    return 'danger';
                default:
                    return null;
            }
        },
    }

}

</script>
  
<style  scoped> 
.card {
     margin-top: 20px;
     margin-left: 25px;
     width: 1000px;
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
 }</style>