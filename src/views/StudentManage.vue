<template>
    <top />
    <side />
    <Toast style="font-weight: 600;" />
    <div class="card">
        <Toolbar class="mb-2">
            <template #start>
                <Button label="新增" icon="pi pi-plus" class="p-button-sm mr-2 font-bold" @click="openNew" />
                <Button label="删除" icon="pi pi-trash" class="p-button-danger p-button-sm mr-2 font-bold"
                    @click="confirmDeleteSelected" :disabled="!selectedstudents || !selectedstudents.length" />
                <Button type="button" icon="pi pi-filter-slash" label="清空" outlined @click="clearFilter()"
                    class="p-button-sm"  style="margin-right:10px ;"/>
                <div class="table-header flex flex-column md:flex-row md:justify-content-between">
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="查找..." class="p-inputtext-sm" />
                    </span>
                </div>
            </template>

            <template #end>
                <!-- <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="导入" chooseLabel="导入"
                    class="mr-2 inline-block p-button-sm font-bold" /> -->
                <Button label="导出" icon="pi pi-upload" class="p-button-help p-button-sm font-bold"
                    @click="exportCSV($event)" />
            </template>

        </Toolbar>

        <DataTable ref="dt" :value="students" v-model:selection.sync="selectedstudents" class="p-datatable-sm"
            :scrollable="true" scrollHeight="450px" :paginator="true" :rows="8" v-model:filters="filters"
            filter-display="menu"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[8, 15, 20]" currentPageReportTemplate=" {first}  至  {last} " responsiveLayout="scroll">
            <Column selectionMode="multiple" headerStyle="min-width: 40px"></Column>
            <Column field="code" header="学号" style="min-width: 100px;" class="text-indigo-600  font-bold">
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="关键字" />
                </template>
            </Column>
            <Column field="name" header="姓名" style="min-width: 100px;" class="text-indigo-600 font-bold">
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="关键字" />
                </template>
            </Column>
            <Column field="gender" header="性别" style="min-width: 80px;" class="text-indigo-600  font-bold">
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
            <Column field="major" header="专业" style="min-width: 100px;" class="text-green-600  font-bold">
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="关键字" />
                </template>
            </Column>
            <Column field="grade" header="年级" style="min-width: 100px;">
                <template #body="{ data }">
                    <Tag :value="data.grade" :severity="getSeverity(data.grade)" />
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
            <Column field="birt" header="出生日期" :sortable="true" style="min-width: 140px;"></Column>
            <Column field="email" header="邮箱" style="min-width: 140px;"></Column>
            <Column field="phone" header="电话" style="min-width: 140px;"></Column>
            <Column field="address" header="住址" style="min-width: 160px;"></Column>
            <Column :exportable="false" :styles="{ 'min-width': '50px' }">
                <template #body="slotProps">
                    <Button icon="pi pi-trash" outlined rounded severity="danger" style="height: 35px;width: 35px;"
                        class="p-button-sm" @click="confirmDeletestudent(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
    </div>


    <Dialog v-model:visible.sync="studentDialog" :style="{ width: '400px' }" header="学生信息" :modal="true" class="p-fluid">
        <div class="p-fluid">
            <div class="p-field">
                <label for="code">学号</label>
                <InputText id="code" v-model="student.code" class="p-inputtext-sm" />
            </div>
            <div class="p-field  mt-2">
                <label for="name">用户名</label>
                <InputText id="name" v-model="student.name" class="p-inputtext-sm" />
            </div>
            <div class="p-field mt-2">
                <label for="gender">性别</label>
                <Dropdown id="gender" v-model="student.gender" :options="genderOptions" class="p-inputtext-sm" />
            </div>
            <div class="p-field mt-2">
                <label for="major">专业</label>
                <InputText id="major" v-model="student.major" class="p-inputtext-sm" />
            </div>
            <div class="p-field mt-2">
                <label for="grade">年级</label>
                <Dropdown id="grade" v-model="student.grade" :options="statuses" class="p-inputtext-sm">
                    <template #option="slotProps">
                        <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                    </template>
                </Dropdown>
            </div>
        </div>
        <template v-slot:footer>
            <Button label="取消" class="mr-2 p-button-sm" @click="hideDialog" />
            <Button label="保存" class="p-button-success p-button-sm" :disabled="uploading" @click="savestudent" />
        </template>

    </Dialog>

    <Dialog v-model:visible.sync="deletestudentDialog" :styles="{ width: '450px' }" header="确认" :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="student">你 确 认 删 除 <b>{{ student.name }} </b> 吗?</span>
        </div>
        <template #footer>
            <Button label="否" icon="pi pi-times" class="p-button-text" @click="deletestudentDialog = false" />
            <Button label="是" icon="pi pi-check" class="p-button-text" @click="deletestudent" />
        </template>
    </Dialog>

    <Dialog v-model:visible.sync="deletestudentsDialog" :styles="{ width: '450px' }" header="确认" :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span style="font-weight: 500; font-size: large;" v-if="student">你 确 认 删 除 吗?</span>
        </div>
        <template #footer>
            <Button label="否" icon="pi pi-times" class="p-button-text" @click="deletestudentsDialog = false" />
            <Button label="是" icon="pi pi-check" class="p-button-text" @click="deleteSelectedstudents" />
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
import Chart from 'primevue/chart';
import Tag from 'primevue/tag';
import Dropdown from 'primevue/dropdown';

import Textarea from 'primevue/textarea';
export default {

    name: 'StudentManage',
    components: {
        top, side, mainout, Dialog, Button, InputNumber, Toolbar, FileUpload, InputText, Column, RadioButton, DataTable, Textarea, Chart, FilterMatchMode
        , Toast, FilterOperator, Tag, Dropdown,
    },
    data() {
        return {
            genderOptions: ['男', '女'],
            statuses: ['大一', '大二', '大三', '大四', '已毕业'],
            students: [
                {
                    code: '001',
                    name: '张三',
                    gender: '男',
                    major: '计算机科学与技术',
                    grade: '大一',
                    birt: '2000-01-01',
                    email: 'zhangsan@example.com',
                    phone: '12345678901',
                    address: '中国广州市天河区'
                },
                {
                    code: '002',
                    name: '李四',
                    gender: '女',
                    major: '英语',
                    grade: '大二',
                    birt: '1999-02-01',
                    email: 'lisi@example.com',
                    phone: '12345678902',
                    address: '中国江苏省南京市鼓楼区'
                },
                {
                    code: '003',
                    name: '王五',
                    gender: '男',
                    major: '人工智能',
                    grade: '大三',
                    birt: '1998-03-01',
                    email: 'wangwu@example.com',
                    phone: '12345678903',
                    address: '中国北京市海淀区'
                },
                {
                    code: '004',
                    name: '赵六',
                    gender: '女',
                    major: '工商管理',
                    grade: '大四',
                    birt: '1997-04-01',
                    email: 'zhaoliu@example.com',
                    phone: '12345678904',
                    address: '中国上海市浦东新区'
                },
                {
                    code: '005',
                    name: '钱七',
                    gender: '男',
                    major: '机械工程',
                    grade: '已毕业',
                    birt: '1996-05-01',
                    email: 'qianqi@example.com',
                    phone: '12345678905',
                    address: '中国重庆市渝中区'
                },
                {
                    code: '006',
                    name: '孙八',
                    gender: '女',
                    major: '化学',
                    grade: '已毕业',
                    birt: '1995-06-01',
                    email: 'sunba@example.com',
                    phone: '12345678906',
                    address: '中国湖南省长沙市岳麓区'
                },
                {
                    code: '005',
                    name: '钱七',
                    gender: '男',
                    major: '机械工程',
                    grade: '已毕业',
                    birt: '1996-05-01',
                    email: 'qianqi@example.com',
                    phone: '12345678905',
                    address: '中国重庆市渝中区'
                },
                {
                    code: '006',
                    name: '孙八',
                    gender: '女',
                    major: '化学',
                    grade: '已毕业',
                    birt: '1995-06-01',
                    email: 'sunba@example.com',
                    phone: '12345678906',
                    address: '中国湖南省长沙市岳麓区'
                },
                {
                    code: '001',
                    name: '张三',
                    gender: '男',
                    major: '计算机科学与技术',
                    grade: '大一',
                    birt: '2000-01-01',
                    email: 'zhangsan@example.com',
                    phone: '12345678901',
                    address: '中国广州市天河区'
                },
                {
                    code: '002',
                    name: '李四',
                    gender: '女',
                    major: '英语',
                    grade: '大二',
                    birt: '1999-02-01',
                    email: 'lisi@example.com',
                    phone: '12345678902',
                    address: '中国江苏省南京市鼓楼区'
                },

            ],
            student: null,
            studentDialog: false,
            deletestudentDialog: false,
            deletestudentsDialog: false,
            student: {},
            selectedstudents: null,
            filters: {},
            submitted: false,
        }
    },
    created() {
        // this.studentService = new studentService();
        this.initFilters();
    },
    mounted() {
        // this.studentService.getstudents().then(data => this.students = data);
    },
    computed: {
    },
    methods: {
        clearFilter() {
            this.initFilters();
        },
        openNew() {
            this.student = {};
            this.submitted = false;
            this.studentDialog = true;
        },
        hideDialog() {
            this.studentDialog = false;
            this.submitted = false;
        },
        confirmDeletestudent(student) {
            this.student = student;
            this.deletestudentDialog = true;
        },
        deletestudent() {
            this.students = this.students.filter(val => val.code !== this.student.code);
            this.deletestudentDialog = false;
            this.student = {};
            this.$toast.add({ severity: 'success', summary: '成功', detail: '学生   删除', life: 3000 });
        },
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
        confirmDeleteSelected() {
            this.deletestudentsDialog = true;
        },
        deleteSelectedstudents() {
            this.students = this.students.filter(val => !this.selectedstudents.includes(val));
            this.deletestudentsDialog = false;
            this.selectedstudents = null;
            this.$toast.add({ severity: 'success', summary: '成功', detail: '学生   删除', life: 3000 });
        },
        savestudent() {
            this.submitted = true;
            this.students.push(this.student);
            this.studentDialog = false;
            this.student = {};

        },
        initFilters() {
            this.filters = {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                code: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                age: { value: null, matchMode: "equals" },
                name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                grade: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                gender: { value: null, matchMode: FilterMatchMode.EQUALS },

                major: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            }
        },
        getSeverity(status) {
            switch (status) {
                case '大一':
                    return 'danger';

                case '大二':
                    return 'secondary';

                case '大三':
                    return 'info';

                case '大四':
                    return 'warning';

                case '已毕业':
                    return 'success';
            }
        },
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

 .student-image {
     width: 100px;
     box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
 }

 .p-dialog .student-image {
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