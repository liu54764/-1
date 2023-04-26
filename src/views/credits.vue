<template>
    <top />
    <side />
    <div class="main">
        <div class="card">
            <DataTable v-model:expandedRowGroups="expandedRowGroups" :value="Courses" tableStyle="min-width: 50rem"
                showGridlines v-model:editingRows="editingRows" editMode="row" @row-edit-save="onRowEditSave"
                expandableRowGroups rowGroupMode="subheader" groupRowsBy="type"
                @rowgroup-expand="onRowGroupExpand" @rowgroup-collapse="onRowGroupCollapse" sortMode="single"
                sortField="type" :sortOrder="1" class="p-datatable-sm">
                <template #groupheader="slotProps">
                    <span class="vertical-align-middle ml-2 font-bold line-height-3">{{
                        slotProps.data.type }}</span>
                </template>
                <Column field="type" header="type"></Column>
                <Column field="name" :header="major" style="width: 170px" class="text-indigo-500 font-bold text-center">
                </Column>
                <Column field="id" header="课程号" style="width: 100px" class="text-center text-green-500 font-bold"></Column>
                <!-- <Column field="date" header="修读时间" style="width: 150px" class="text-center text-yellow-500 font-bold"> -->
                    <!-- <template #editor="{ data, field }">
                    <InputText v-model="data[field]" style="width: 150px"/>
                </template> -->
                <!-- </Column> -->
                <Column field="credit" header="学分" style="width: 100px" class="text-center text-blue-500 font-bold">
                </Column>
                <Column field="hour" header="学时" style="width: 100px" class="text-center font-bold"></Column>
                <!-- <Column field="style" header="课程类型" style="width: 100px" class="text-center font-bold text-red-500">
                </Column> -->
                <!-- <Column field="grade" header="最大成绩" style="width: 100px" class="text-center font-bold text-indigo-500">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" style="width: 100px" />
                    </template>
                </Column> -->
                <!-- <Column field="grades" header="绩点" style="width: 70px" class="text-center font-bold">
                </Column> -->
                <Column field="status" header="修读状态" style="width: 100px" class="text-center font-bold">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.status" :severity="getStatusLabel(slotProps.data.status)" />
                    </template>
                </Column>
                <!-- <Column :rowEditor="true" style="width: 100px;" bodyStyle="text-align:center" header="操作"></Column> -->
                <template #groupfooter="slotProps">
                    <td colspan="10">
                        <div class="flex justify-content-end font-bold">总共获得学分: {{
                            calculateCourseTotal(slotProps.data.type) }}</div>
                        <div class="flex justify-content-end font-bold">还需获得学分: {{
                            35 - calculateCourseTotal(slotProps.data.type) }}</div>
                    </td>
                </template>
            </DataTable>
            <Toast />
        </div>
    </div>
</template>
  
<script>

import top from '../components/top.vue'
import side from '../components/side.vue'
import Toast from 'primevue/toast';
import RadioButton from 'primevue/radiobutton';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Chart from 'primevue/chart';
import Tag from 'primevue/tag';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown'
import request from '@/utils/request';
export default {
    name: 'grade',
    components: {
        top, side, Column, RadioButton, DataTable, Chart, Toast, Tag, InputText, Dropdown
    },
    data() {
        return {
            id:null,
            major:"机械",
            editingRows: [],
            statuses: [
                { label: '已修', value: '已修' },
                { label: '未修', value: '未修' },
            ],
            Courses: [

            ],
            expandedRowGroups: null
        };
    },
    created() {
        this.GetInformation()
        this.GetStudent()
        this.GetCourses()
    },
    mounted() {
        // CourseService.getCoursesMedium().then((data) => (this.Courses = data));
    },
    methods: {
        GetInformation() {
            let userinfo = JSON.parse(localStorage.getItem('userinfo'))
            this.id = userinfo.data.id
        },
        GetStudent() {
            let url = "/student/information" + "?id=" + this.id
            request.get(url).then(res => {
                this.major = res.data.data.major
            })
        },
        GetCourses() {
            // let url = "/student/totalCourse?major=机械"
            let url = "/student/totalCourse"+ "?major=" + this.major
            request.get(url).then(res => {
                this.Courses = res.data.data
                console.log(res)
            })
        },
        onRowGroupExpand(event) {
            this.$toast.add({ severity: 'info', summary: '行组已展开', detail: event.data, life: 3000 });
        },
        onRowGroupCollapse(event) {
            this.$toast.add({ severity: 'success', summary: '行组已折叠', detail: event.data, life: 3000 });
        },
        calculateCourseTotal(name) {
            let total = 0;
            if (this.Courses) {
                for (let Course of this.Courses) {
                    if (Course.type === name && Course.status == "已修") {
                        total = total + Course.credits;
                    }
                }
            }
            return total;
        },
        getStatusLabel(status) {
            switch (status) {
                case '已修':
                    return 'success';

                case '未修':
                    return 'secondary';

                case '未通过':
                    return 'danger';

                default:
                    return null;
            }
        },
        onRowEditSave(event) {
            let { newData, index } = event;
            this.Courses[index] = newData;
        },
    },
}
</script>
  
<style scoped> .main {
     margin-top: 20px;
     margin-left: 30px;
     width: 80%;
     height: 85vh;
     float: left;

 }
</style>