<template>
    <top />
    <side />
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

        <DataTable ref="dt" :value="products" v-model:selection.sync="selectedProducts" dataKey="id" class="p-datatable-sm"
            :paginator="true" :rows="9" v-model:filters="filters" :scrollable="true" scrollHeight="450px" filter-display="menu"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 15, 20]" currentPageReportTemplate=" {first}  至  {last} " responsiveLayout="scroll">

            <Column selectionMode="multiple" headerStyle="min-width: 40px"></Column>
            <Column field="coursecode" header="课程号" style="min-width: 100px;"
                class="text-indigo-600 font-bold">
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="关键字" />
                </template>
            </Column>
            <Column field="course" header="课程" style="min-width: 100px;" class="text-indigo-600 font-bold">
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="关键字" />
                </template>
            </Column>
            <Column field="type" header="课程类型" style="min-width: 100px;" class="text-green-600 font-bold">
                <template #filter="{ filterModel }">
                    <Dropdown v-model="filterModel.value" :options="courseOptions" placeholder="选择课程类型"
                        class="p-column-filter">
                        <template #option="slotProps">
                            <span v-if="slotProps.option === null">所有</span>
                            <span v-else-if="slotProps.option === '选修'">选修</span>
                            <span v-else-if="slotProps.option === '必修'">必修</span>
                        </template>
                    </Dropdown>
                </template>
            </Column>
            <Column field="credit" header="学分" :sortable="true" style="min-width: 100px;" class="text-green-600 font-bold">
            </Column>
            <Column field="date1" header="考试时间" :sortable="true" style="min-width: 130px;"></Column>
            <!-- <Column field="quantity" header="考试类型" style="min-width: 100px;"></Column> -->
            <Column field="Scores" header="分数" :sortable="true" style="min-width: 100px;"></Column>
            <Column field="Score" header="绩点" :sortable="true" style="min-width: 10px;"></Column>
            <Column field="status" header="状态" style="min-width: 100px;">
                <template #body="slotProps">
                    <Tag :value="slotProps.data.status" :severity="getStatusLabel(slotProps.data.status)" />
                </template>
            </Column>
        </DataTable>
    </div>
    <div style="float: left;width: 230px;height: 85vh;margin-top: 20px;margin-left: 20px;">
        <Chart type="pie" :data="chartData" :options="chartOptions" style="margin-top: 30px;" />
        <Chart type="doughnut" :data="chartData1" :options="chartOptions" style="margin-top: 40px;" />
    </div>
</template>



<script>
import Toast from 'primevue/toast';
import top from '../components/top.vue'
import side from '../components/side.vue'
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
import Chart from 'primevue/chart';
import Tag from 'primevue/tag';
export default {

    name: 'grade',
    components: {
        top, side, Dialog, Button, InputNumber, Toolbar, FileUpload, InputText, Column, RadioButton, DataTable, Textarea, Chart, FilterMatchMode
        , Toast, Tag, FilterOperator
    },
    data() {
        return {
            products: [
                {

                    coursecode: 'C001',
                    course: '计算机基础',
                    type: '必修',
                    credit: 3,
                    date1: ('2022-05-15'),
                    Scores: 85,
                    Score: 3.0,
                    status: '优秀'

                },
                {

                    coursecode: 'C001',
                    major: '软件工程',
                    course: '数据结构',
                    type: '必修',
                    credit: 4,
                    date1: '2022-06-20',
                    Scores: 90,
                    Score: 3.3,
                    status: '良好'
                },
                {

                    coursecode: 'C002',
                    course: '软件工程',
                    type: '必修',
                    credit: 5,
                    date1: ('2022-07-25'),
                    Scores: 92,
                    Score: 3.7,
                    status: '不及格'
                },],
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
                // console.log(res)
            })
        },
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
        initFilters() {
            this.filters = {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
                coursecode: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                course: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                //  Score: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                type: { value: null, matchMode: FilterMatchMode.EQUALS },
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
  
<style  scoped> .card {
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