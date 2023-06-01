<template>
    <top />
    <side />
    <Toast style="font-weight: 600;" />
    <div class="card">
        <Toolbar class="mb-2">
            <template #start>
                <div class="table-header flex flex-column md:flex-row md:justify-content-between">
                    <Button type="button" icon="pi pi-filter-slash" label="清空" outlined @click="clearFilter()"
                        class="p-button-sm" style="margin-right:10px ;"/>
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

        <DataTable ref="dt" :value="internships" v-model:selection.sync="selectedstudents" class="p-datatable-sm"
            :scrollable="true" scrollHeight="450px" :paginator="true" :rows="8" v-model:filters="filters"
            filter-display="menu"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[8, 15, 20]" currentPageReportTemplate=" {first}  至  {last} " responsiveLayout="scroll">
            <Column selectionMode="multiple" headerStyle="min-width: 40px"></Column>
            <Column field="sid" header="学号" style="min-width: 100px;" class="text-indigo-600  font-bold">
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="关键字" />
                </template>
            </Column>
            <Column field="name" header="姓名" style="min-width: 100px;" class="text-indigo-600 font-bold">
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="关键字" />
                </template>
            </Column>
            <Column field="name" header="项目名称" style="min-width: 100px;" class="text-green-600  font-bold">
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="关键字" />
                </template>
            </Column>
            <Column field="startTime" :sortable="true" header="开始时间" style="min-width: 140px;"></Column>
            <Column field="endTime" :sortable="true" header="结束时间" style="min-width: 140px;"></Column>
            <Column field="type" header="类型" style="min-width: 100px;" class="font-bold text-orange-600">
                <template #filter="{ filterModel }">
                    <Dropdown v-model="filterModel.value" :options="type" placeholder="选择类型" class="p-column-filter">
                        <template #option="slotProps">
                            <span v-if="slotProps.option === null">所有</span>
                            <span v-else-if="slotProps.option === '实习'">实习</span>
                            <span v-else-if="slotProps.option === '竞赛'">竞赛</span>
                        </template>
                    </Dropdown>
                </template>

            </Column>
            <Column field="status" header="状态" style="min-width: 100px;">
                <template #body="{ data }">
                    <Tag v-if="data.status === '已批阅'" value="已批阅" severity="success"></Tag>
                    <Tag v-else="data.status === '未批阅'" value="未批阅" severity="warning"></Tag>
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
            <Column field="filename" header="证明材料" style="min-width: 100px;">
                <template #body="{ data }">
                    <img :src="data.filename" class="w-full rounded-lg shadow-md zoomable-image"
                        style="height: 70px; cursor: pointer;" @click="openLightbox(data.filename)">
                </template>
            </Column>
            <Column :exportable="false" :styles="{ 'min-width': '50px' }">
                <template #body="slotProps">
                    <Button icon="pi pi-check" severity="success" text raised rounded aria-label="Filter"
                        style="height: 35px;width: 35px;" @click="PassConfirm(slotProps.data)" />
                    <Button icon="pi pi-times" severity="danger" text raised rounded aria-label="Cancel"
                        style="margin-left: 10px;height: 35px;width: 35px;" @click="DisPassConfirm(slotProps.data)
                            " />
                </template>
            </Column>
        </DataTable>
    </div>
    <div v-if="lightboxVisible" class="lightbox-overlay" @click="closeLightbox">
        <div class="lightbox-content">
            <img :src="lightboxImage" alt="放大图片">
        </div>
    </div>
    <Dialog v-model:visible.sync="PassDialog" :styles="{ width: '450px' }" header="确认" :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span>你 确 认 批 阅 通 过 吗 ？</span>
        </div>
        <template #footer>
            <Button label="否" icon="pi pi-times" class="p-button-text" @click="PassDialog = false" />
            <Button label="是" icon="pi pi-check" class="p-button-text" @click="Pass()" />
        </template>
    </Dialog>
    <Dialog v-model:visible.sync="DisPassDialog" :styles="{ width: '450px' }" header="确认" :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span>你 确 认 批 阅 不 通 过 吗 ？</span>
        </div>
        <template #footer>
            <Button label="否" icon="pi pi-times" class="p-button-text" @click="DisPassDialog = false" />
            <Button label="是" icon="pi pi-check" class="p-button-text" @click="DisPass" />
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
import request from '@/utils/request';
import Textarea from 'primevue/textarea';
export default {

    name: 'review',
    components: {
        top, side, mainout, Dialog, Button, InputNumber, Toolbar, FileUpload, InputText, Column, RadioButton, DataTable, Textarea, Chart, FilterMatchMode
        , FilterOperator, Tag, Dropdown,Toast
    },
    data() {
        return {
            url: "http://localhost:9000/api/file/files/",
            statuses: ['已批阅', '未批阅'],
            type: ['实习', '竞赛'],
            // student: null,
            // studentDialog: false,
            PassDialog: false,
            DisPassDialog: false,
            internship: {},
            selectedstudents: null,
            filters: {},
            // submitted: false,
            // deletestudentDialog: false,
            internships: [],
            lightboxVisible: false,
            lightboxImage: '',
        };
    },
    created() {
        this.initFilters();
        this.GetExper()
    },
    methods: {
        clearFilter() {
            this.initFilters();
        },
        GetExper() {
            let url = "/experience/notAudit"
            request.get(url).then(res => {
                this.internships = res.data.data
                this.judge()
            })
        },
        judge() {
            if (this.internships) {
                for (let internship of this.internships) {
                    internship.filename = this.url + internship.filename
                }
            }
        },
        initFilters() {
            this.filters = {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                sid: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                status: { value: null, matchMode: FilterMatchMode.EQUALS },
                type: { value: null, matchMode: FilterMatchMode.EQUALS },
            }
        },
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
        openLightbox(imageUrl) {
            this.lightboxImage = imageUrl;
            this.lightboxVisible = true;
        },
        closeLightbox() {
            this.lightboxVisible = false;
            this.lightboxImage = '';
        },
        PassConfirm(data)
        {
           this.internship=data;
           this.PassDialog = true;
        },
        Pass() {
            let url = "/experience/audit"+"?id="+this.internship.id+"&pass=1"
            request.post(url).then(res => {
                if (res.data.code === "0") {
                    this.PassDialog = false;
                this.$toast.add({ severity: 'success', summary: 'Successful', detail: '批 阅 通 过', life: 3000 });
                }
            })
        },
       
        DisPassConfirm(data)
        {
           this.internship=data;
           this.DisPassDialog = true;
        },
        DisPass() {
            let url = "/experience/audit"+"?id="+this.internship.id+"&pass=0"
            request.post(url).then(res => {
                if (res.data.code === "0") {
                    this.DisPassDialog = false;
                this.$toast.add({ severity: 'warn', summary: 'Warning', detail: '批 阅 不 通 过', life: 3000 });
                }
            })
        },
        getSeverity(status) {
            switch (status) {
                case '已批阅':
                    return 'success';

                case '未批阅':
                    return 'warning';
            }
        },
    },

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

 .zoomable-image {
     cursor: pointer;
 }

 .lightbox-overlay {
     position: fixed;
     top: 0;
     bottom: 0;
     left: 0;
     right: 0;
     width: 100%;
     height: 100%;
     background-color: rgba(0, 0, 0, 0.8);
     display: flex;
     justify-content: center;
     align-items: center;
     z-index: 9999;
 }

 .lightbox-content {
     max-width: 70%;
     max-height: 70%;
 }

 .lightbox-content img {
     max-width: 70%;
     max-height: 70%;
 }
</style>