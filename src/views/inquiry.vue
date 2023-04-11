<template>
    <top />
    <side />
    <div class="card">
        <DataTable ref="dt" v-model:filters="filters" :value="customers" paginator showGridlines :rows="8" dataKey="id"
            filterDisplay="menu" class="p-datatable-sm" scrollable scrollHeight="450px">
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
            <Column field="code" header="学号" style="width:100px ;" class="text-indigo-600"></Column>
            <Column field="name" header="姓名" style="width:100px ;" class="text-indigo-600">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                        placeholder="Search by name" />
                </template>
            </Column>
            <Column field="gender" header="性别" style="width:100px ;" class="text-indigo-600">
                <template #body="{ data }">
                    {{ data.gender }}
                </template>
                <template #filter="{ filterModel }">
                    <Dropdown v-model="filterModel.value" :options="genderOptions" optionLabel="label" placeholder="选择性别"
                        class="p-column-filter">
                        <template #option="{ option }">
                            <span v-if="option.value === null">所有</span>
                            <span v-else-if="option.value === '男'">男</span>
                            <span v-else-if="option.value === '女'">女</span>
                        </template>
                    </Dropdown>
                </template>
            </Column>
            <Column field="age" header="年龄" style="width:60px ;"></Column>
            <Column field="code" header="专业" style="width:60px ;" class="text-indigo-600">
            </Column>
            <Column field="grade" header="平均绩点" style="width:80px ;"></Column>
            <Column field="credits" header="获得学分" style="width:80px ;">
                <template #body="{ data }">
                    <Button class="p-button-link" :label="data.credits" @mouseover="toggle" style="width: 50px;" />
                </template>
            </Column>
            <Column field="activity" header="竞赛情况" style="width:100px ;">
                <!-- <template #body="{ data }">
                    <Rating :modelValue="data.activity"  />
                </template> -->
            </Column>
            <Column field="activity" header="实习情况" style="width:100px ;">
                <!-- <template #body="slotProps">
                    <rating :modelValue="slotProps.data.activity" readonly :cancel="false" />
                </template> -->
            </Column>
            <Column field="status" header="年级" style="width:50px ;">
                <template #body="{ data }">
                    <Tag :value="data.status" :severity="getSeverity(data.status)" />
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
        , FilterOperator, Dropdown, OverlayPanel, Toolbar, Tag, Rating
    },
    data() {
        return {
            value:4,
            customers: [
                {
                    code: 707,
                    name: '李小明',
                    gender: '男',
                    grade: 4.555,
                    age: 20,
                    credits: 6,
                    status: '大一',
                    verified: true,
                    activity: 1,
                }, {
                    code: 200,
                    name: '李',
                    gender: '男',
                    grade: 4.555,
                    credits: 6,
                    status: '已毕业',
                    verified: true,
                    activity: 1,
                }, {
                    code: 27,
                    name: '小明',
                    gender: '男',
                    grade: 4.555,
                    credits: 6,
                    status: '大二',
                    verified: true,
                    activity: 1,
                }, {
                    code: 11,
                    name: '小',
                    gender: '男',
                    grade: 4.555,
                    credits: 6,
                    status: '大三',
                    verified: true,
                    activity: 1,
                },
                {
                    code: 207,
                    name: '李明',
                    gender: '男',
                    grade: 4.555,
                    credits: 6,
                    status: '大四',
                    verified: true,
                    activity: 1,
                },
            ],
            filters: null,
            genderOptions: [
                { label: '男', value: '男' },
                { label: '女', value: '女' },
            ],
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

                code: { value: null, matchMode: "startsWith" },
                name: { value: null, matchMode: "startsWith" },
                age: { value: null, matchMode: "equals" },
                name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                gender: { value: null, matchMode: "equals" },
                grade: { value: null, matchMode: "equals" },
                credits: { value: null, matchMode: "equals" },
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