<template>
    <top />
    <side />
    <div class="card">
        <DataTable ref="dt" v-model:filters="filters" :value="customers" paginator :rows="10" dataKey="id"
            :rowsPerPageOptions="[10, 15, 20]" currentPageReportTemplate=" {first}  至  {last} " filterDisplay="menu"
            class="p-datatable-sm" scrollable scrollHeight="480px">
            <template #header>
                <div class="flex justify-content-start">
                    <Button type="button" icon="pi pi-filter-slash" label="清空" outlined @click="clearFilter()"
                        class="p-button-sm" />
                    <Button label="导出" icon="pi pi-upload" class="p-button-help p-button-sm font-bold"
                        style="margin-left: 20px;" @click="exportCSV($event)" />
                    <span class="p-input-icon-left" style="margin-left: 850px;">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="关键字" class="p-inputtext-sm" />
                    </span>
                </div>
            </template>
            <Column field="code" header="学号" style="width:100px ;" class="text-indigo-600 text-center font-bold">
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="关键字" />
                </template>
            </Column>
            <Column field="name" header="姓名" style="width:100px ;" class="text-indigo-600 text-center font-bold">
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="关键字" />
                </template>
            </Column>
            <Column field="gender" header="性别" style="width:50px ;" class="text-indigo-600 text-center font-bold">
                <template #filter="{ filterModel }">
                    <Dropdown v-model="filterModel.value" :options="genderOptions" placeholder="选择性别"
                        class="p-column-filter">
                        <template #option="slotProps">
                            <span v-if="slotProps.option === null">所有</span>
                            <span v-else-if="slotProps.option === '男'">男</span>
                            <span v-else-if="slotProps.option === '女'">女</span>
                        </template>
                    </Dropdown>
                </template>
            </Column>
            <Column field="age" header="年龄" style="width:60px ;" :sortable="true"
                class="text-indigo-600 text-center font-bold"></Column>
            <Column field="major" header="专业" style="width:60px ;" class="text-green-600 text-center font-bold">
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="关键字" />
                </template>
            </Column>
            <Column field="grade" header="平均绩点" style="width:110px ;" dataType="numeric"
                class="text-green-600 text-center font-bold" :sortable="true">
                <template #filter="{ filterModel }">
                    <InputNumber v-model="filterModel.value" type="text" class="p-column-filter" :minFractionDigits="2"
                        :maxFractionDigits="4" placeholder="关键字" />
                </template>
            </Column>
            <Column field="credits" header="获得学分" style="width:110px ;" dataType="numeric"
                class="text-green-600 text-center font-bold" :sortable="true">
                <!-- <template #body="{ data }">
                    <Button class="p-button-link" :label="data.credits" @mouseover="toggle" style="width: 50px;" />
                </template> -->
                <template #filter="{ filterModel }">
                    <InputNumber v-model="filterModel.value" type="text" :minFractionDigits="1" :maxFractionDigits="2"
                        class="p-column-filter" placeholder="关键字" />
                </template>
            </Column>
            <Column field="contest" header="竞赛情况" style="width:100px ;" :sortable="true">
                <template #body="slotProps">
                    <rating :modelValue="slotProps.data.contest" readonly :cancel="false" />
                </template>
            </Column>
            <Column field="activity" header="实习情况" style="width:100px ;" :sortable="true">
                <template #body="slotProps">
                    <rating :modelValue="slotProps.data.activity" readonly :cancel="false" />
                </template>
            </Column>
            <Column field="status" header="年级" style="width:50px ;" class="text-center">
                <template #body="{ data }">
                    <Tag :value="data.status" :severity="getSeverity(data.status)" />
                </template>
                <template #filter="{ filterModel }">
                    <Dropdown v-model="filterModel.value" :options="statuses" placeholder="请选择" class="p-column-filter"
                        showClear>
                        <template #option="slotProps">
                            <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                        </template>
                    </Dropdown>
                </template>
            </Column>
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
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import FileUpload from 'primevue/fileupload';
import InputText from 'primevue/inputtext';
import RadioButton from 'primevue/radiobutton';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';

//   import MultiSelect from 'primevue/multiSelect';
export default {
    name: "inqury",
    components: {
        top, side, Dialog, Button, InputNumber, FileUpload, InputText, Column, RadioButton, DataTable, Textarea, FilterMatchMode
        , FilterOperator, Dropdown, OverlayPanel, Toolbar, Tag, Rating,
    },
    data() {
        return {
            value: 4,
            customers: [
                {
                    code: 707,
                    name: '李小明',
                    gender: '男',
                    grade: 4.555,
                    age: 20,
                    credits: 6,
                    status: '大一',
                    contest: 2,
                    activity: 1,
                    major: "计算机"
                }, {
                    code: 200,
                    name: '李',
                    gender: '女',
                    grade: 5.555,
                    age: 21,
                    credits: 167,
                    status: '已毕业',
                    contest: 5,
                    activity: 1,
                    major: "计算机"
                }, {
                    code: 27,
                    name: '小明',
                    gender: '男',
                    age: 19,
                    grade: 4.00,
                    credits: 76,
                    status: '大二',
                    contest: 2,
                    activity: 5,
                    major: "机械"
                }, {
                    code: 11,
                    name: '小',
                    gender: '男',
                    age: 20,
                    grade: 2.555,
                    credits: 60,
                    status: '大三',
                    contest: 2,
                    activity: 3,
                    major: "人工智能"
                },
                {
                    code: 207,
                    name: '李明',
                    gender: '男',
                    age: 20,
                    grade: 3.555,
                    credits: 77,
                    status: '大四',
                    contest: 1,
                    activity: 4,
                    major: "自动化"
                }, {
                    code: 11,
                    name: '小',
                    gender: '男',
                    age: 20,
                    grade: 2.555,
                    credits: 60,
                    status: '大三',
                    contest: 2,
                    activity: 3,
                    major: "人工智能"
                },
                {
                    code: 207,
                    name: '李明',
                    gender: '男',
                    age: 20,
                    grade: 3.555,
                    credits: 77,
                    status: '大四',
                    contest: 1,
                    activity: 4,
                    major: "自动化"
                }, {
                    code: 11,
                    name: '小',
                    gender: '男',
                    age: 20,
                    grade: 2.555,
                    credits: 60,
                    status: '大三',
                    contest: 2,
                    activity: 3,
                    major: "人工智能"
                },
                {
                    code: 207,
                    name: '李明',
                    gender: '男',
                    age: 20,
                    grade: 3.555,
                    credits: 77,
                    status: '大四',
                    contest: 1,
                    activity: 4,
                    major: "自动化"
                }, {
                    code: 11,
                    name: '小',
                    gender: '男',
                    age: 20,
                    grade: 2.555,
                    credits: 60,
                    status: '大三',
                    contest: 2,
                    activity: 3,
                    major: "人工智能"
                },
                {
                    code: 207,
                    name: '李明',
                    gender: '男',
                    age: 20,
                    grade: 3.555,
                    credits: 77,
                    status: '大四',
                    contest: 1,
                    activity: 4,
                    major: "自动化"
                },
            ],
            filters: null,
            genderOptions: ['男', '女'],
            statuses: ['大一', '大二', '大三', '大四', '已毕业'],
        };
    },
    created() {
        this.initFilters();
    },
    mounted() {
        // CustomerService.getCustomersMedium().then((data) => {
        //     this.customers = this.getCustomers(data);
        //     this.loading = false;
        // });
    },
    methods: {
        // formatDate(value) {
        //     return value.toLocaleDateString('en-US', {
        //         day: '2-digit',
        //         month: '2-digit',
        //         year: 'numeric'
        //     });
        // },
        // formatCurrency(value) {
        //     return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        // },

        clearFilter() {
            this.initFilters();
        },
        initFilters() {
            this.filters = {


                global: { value: null, matchMode: FilterMatchMode.CONTAINS },

                code: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                // name: { value: null, matchMode: "equals" },
                age: { value: null, matchMode: "equals" },
                name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                gender: { value: null, matchMode: FilterMatchMode.EQUALS },
                grade: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                credits: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                major: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            };
        },
        getCustomers(data) {
            return [...(data || [])].map((d) => {
                d.date = new Date(d.date);

                return d;
            });
        },
        getSeverity(status) {
            switch (status) {
                case '大一':
                    return 'danger';

                case '大二':
                    return 'primary';

                case '大三':
                    return 'info';

                case '大四':
                    return 'warning';

                case '已毕业':
                    return 'success';
            }
        },
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
    }
}
</script>
    
<style scoped>
.card {

    margin-top: 20px;
    margin-left: 240px;
    height: 85vh;
    width: 1280px;
}

.p-rating .p-rating-icon {
    color: #6f5b1e;
    /* 更改星星的颜色 */
}
</style>