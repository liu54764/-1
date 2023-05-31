<template>
   <top />
   <side />
   <Toast style="font-weight: 600;" />
   <div class="card">
      <Toolbar class=" p-toolbar-sm mb-2">
         <template #start>
            <Button label="新增" icon="pi pi-plus" class="p-button-sm mr-2 font-bold" @click="openNew" />
            <Button label="删除" icon="pi pi-trash" class="p-button-danger p-button-sm mr-2 font-bold"
               @click="confirmDeleteSelected" :disabled="!selectedscore || !selectedscore.length" />
            <Button type="button" icon="pi pi-filter-slash" label="清空" outlined @click="clearFilter()"
               class="p-button-sm" />
            <div class="table-header flex flex-column md:flex-row md:justify-content-between ml-2">
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

      <DataTable ref="dt" v-model:value="Scores" v-model:selection.sync="selectedscore" class="p-datatable-sm"
         filterDisplay="menu" :paginator="true" :rows="8" v-model:editingRows="editingRows" editMode="row"
         v-model:filters="filters" :scrollable="true" scrollHeight="450px"
         paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
         :rowsPerPageOptions="[8, 15, 20]" currentPageReportTemplate=" {first}  至  {last} " responsiveLayout="scroll">

         <Column selectionMode="multiple" style="min-width: 40px;"></Column>
         <Column field="snum" header="学号" sortField="snum" style="min-width: 80px;"
            class="text-indigo-600 text-center font-bold">
            <template #filter="{ filterModel }">
               <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="关键字" />
            </template>
         </Column>
         <Column field="name" header="姓名" style="min-width: 90px;" class="text-indigo-600  font-bold">
            <template #filter="{ filterModel }">
               <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="关键字" />
            </template>
         </Column>
         <Column field="major" header="专业" style="min-width: 90px;" class="text-indigo-600  font-bold">
            <template #filter="{ filterModel }">
               <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="关键字" />
            </template>
         </Column>
         <Column field="cid" header="课程号" style="min-width: 100px;" class="text-green-600  font-bold">
            <template #filter="{ filterModel }">
               <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="关键字" />
            </template>
         </Column>

         <Column field="cname" header="课程" style="min-width: 120px;" class="text-green-600  font-bold">
            <template #filter="{ filterModel }">
               <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="关键字" />
            </template>
         </Column>

         <Column field="type" header="课程类型" style="min-width: 120px;" class="text-orange-600  text-center font-bold">
            <template #filter="{ filterModel }">
               <Dropdown v-model="filterModel.value" :options="cnameOptions" placeholder="选择课程类型" class="p-column-filter">
                  <template #option="slotProps">
                     <span v-if="slotProps.option === null">所有</span>
                     <span v-else-if="slotProps.option === '选修'">选修</span>
                     <span v-else-if="slotProps.option === '必修'">必修</span>
                  </template>
               </Dropdown>
            </template>
         </Column>
         <Column field="credit" header="学分" :sortable="true" style="min-width: 80px;" class="text-center"></Column>
         <Column field="time" header="考试时间" :sortable="true" style="min-width: 120px;" class="text-center">
         </Column>
         <Column field="score" header="分数" :sortable="true" style="min-width: 90px;" class="text-center"></Column>
         <Column field="gpa" header="绩点" :sortable="true" style="min-width: 90px;" class="text-center"></Column>
         <!-- <Column field="data2" header="上传时间" data-type="date" style="min-width: 120px;" :sortable="true"
            class="text-center"></Column> -->
         <!-- <Column :rowEditor="true" style="min-width: 50px;" bodyStyle="text-align:center"></Column> -->
         <Column style="min-width: 100px;">
            <template #body="slotProps">
               <Button :rowEditor="true" icon="pi pi-pencil" outlined rounded severity="success"
                  style="height: 35px;width: 35px;margin-right: 10px;" @click="editScore(slotProps.data)" />
               <Button icon="pi pi-trash" outlined rounded severity="danger" style="height: 35px;width: 35px;"
                  @click="confirmDeleteScore(slotProps.data)" />
            </template>
         </Column>
      </DataTable>


   </div>

   <Dialog v-model:visible="ScoreDialog" :style="{ width: '450px' }" header="成绩信息" modal class="p-fluid">
      <div class="p-field">
         <label for="snum">学号</label>
         <InputText v-model="Score.snum" class="p-inputtext-sm mt-1" />
      </div>
      <div class="p-field">
         <label for="cid">姓名</label>
         <InputText v-model="Score.name" class="p-inputtext-sm mt-1" />
      </div>
      <div class="p-field mt-1" style="width: 190px;float: left;">
         <label for="major">专业</label>
         <InputText v-model="Score.major" id="major" class="p-inputtext-sm mt-1" />
      </div>
      <div class="p-field mt-1" style="width: 190px;float: left; margin-left: 20px;">
         <label for="cid">课程号</label>
         <InputText v-model="Score.cid" id="cid" class="p-inputtext-sm mt-1" />
      </div>
      <div class="p-field mt-1" style="width: 190px;float: left;">
         <label for="cname">课程</label>
         <InputText v-model="Score.cname" id="cname" class="p-inputtext-sm mt-1" />
      </div>
      <div class="p-field mt-1" style="width: 190px;float: left;margin-left: 20px;">
         <label for="type">课程类型</label>
         <Dropdown v-model="Score.type" :options="cnameOptions" placeholder="选择课程类型" id="type"
            class="p-inputtext-sm mt-1" />
      </div>
      <div class="p-field mt-1" style="width: 190px;float: left;">
         <label for="credit">学分</label>
         <InputText v-model="Score.credit" id="credit" class="p-inputtext-sm mt-1" />
      </div>
      <div class="p-field mt-1" style="width: 190px;float: left;margin-left: 20px;">
         <label for="time">考试时间</label>
         <Calendar v-model="Score.time" id="time" date-format="yy-mm-dd" class="p-inputtext-sm mt-1" />
      </div>
      <div class="p-field mt-1" style="width: 190px;float: left;">
         <label for="score">分数</label>
         <InputNumber v-model="Score.score" id="score" :minFractionDigits="1" :maxFractionDigits="3"
            class="p-inputtext-sm mt-1" />
      </div>
      <div class="p-field mt-1" style="width: 190px;float: left;margin-left: 20px;">
         <label for="Score">绩点</label>
         <InputNumber v-model="Score.gpa" id="Score" :minFractionDigits="2" :maxFractionDigits="4"
            class="p-inputtext-sm mt-1" />
      </div>
      <!-- 其他输入框 -->
      <template #footer>
         <Button label="取消" class="mr-2 p-button-sm" @click="hideDialog" />
         <Button label="保存" class="p-button-success p-button-sm" :disabled="uploading" @click="saveScore()" />
      </template>
   </Dialog>

   <Dialog v-model:visible="deleteScoreDialog" :styles="{ width: '450px' }" header="确认" :modal="true">
      <div class="confirmation-content">
         <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
         <span v-if="Score">你 确 认 删 除 吗?</span>
      </div>
      <template #footer>
         <Button label="否" icon="pi pi-times" class="p-button-text" @click="deleteScoreDialog = false" />
         <Button label="是" icon="pi pi-check" class="p-button-text" @click="deleteScore" />
      </template>
   </Dialog>

   <Dialog v-model:visible="deletescoreDialog" :styles="{ width: '450px' }" header="确认" :modal="true" :closable="true">
      <div class="confirmation-content">
         <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
         <span style="font-weight: 500; font-size: large;" v-if="Score">你 确 认 删 除 吗?</span>
      </div>
      <template #footer>
         <Button label="否" icon="pi pi-times" class="p-button-text" @click="deletescoreDialog = false" />
         <Button label="是" icon="pi pi-check" class="p-button-text" @click="deleteSelectedscore" />
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
import Dropdown from 'primevue/dropdown';
import request from "@/utils/request";
export default {

   name: 'ScoreRevision',
   components: {
      top, side, mainout, Dialog, Button, InputNumber, Toolbar, FileUpload, InputText, Column, RadioButton, DataTable, Textarea, Chart, FilterMatchMode
      , Toast, FilterOperator, Calendar, Dropdown
   },
   data() {
      return {
         cnameOptions: ['选修', '必修'],
         Scores: [
         ],
         ScoreDialog: false,
         deleteScoreDialog: false,
         deletescoreDialog: false,
         Score: {},
         selectedscore: null,
         filters: {},
         submitted: false,
      }
   },
   created() {
      this.GetScores();
      this.initFilters();
   },
   mounted() {
      // this.scoreervice.getscore().then(data => this.score = data);
   },
   methods: {
      GetScores() {
            let url = "/student/scoreInfo" 
            request.get(url).then(res => {
                if (res.data.code == 0) {
                    this.Scores = res.data.data
                }
            })
        },
      openNew() {

         this.Score = {};
         this.submitted = false;
         this.ScoreDialog = true;
      },
      hideDialog() {
         this.ScoreDialog = false;
         this.submitted = false;
      },
      saveScore() {
         this.submitted = true;
         if (this.Score.id) {
            this.Scores[this.findIndexById(this.Score.snum)] = this.Score;
            this.ScoreDialog = false;
            this.Score = {};
            this.$toast.add({ severity: 'success', summary: 'Successful', detail: '成 绩 更 新 成 功', life: 3000 });
         }
         else {
            // this.Score.time = this.Score.time.toLocaleDateString();
            this.Scores.push(this.Score);
            let url = "/student/addScore"
            request.post(url, this.Score).then(res => {
               if (res.data.code === "0") {
                  console.log(this.Score)
                  this.ScoreDialog = false;
                  this.Score = {};
                  this.$toast.add({ severity: 'success', summary: 'Successful', detail: '成 绩 创 建 成 功', life: 3000 });
               }
            })

         }

      },
      addScore() {
         let url = "/student/addScore"
         request.post(url, this.student).then(res => {
            console.log(res)
            if (res.data.code === "0") {
               this.studentDialog = false;
               this.student = {};
               this.$message({
                  type: "success",
                  message: "新增成功"
               })
            }
         })
         // console.log(this.student)
      },
      editScore(Score) {
         this.Score = { ...Score };
         this.ScoreDialog = true;
      },
      confirmDeleteScore(Score) {
         this.Score = Score;
         this.deleteScoreDialog = true;
      },
      deleteScore() {
         this.Scores = this.Scores.filter(val => val.id !== this.Score.id);
         this.deleteScoreDialog = false;
         this.Score = {};
         this.$toast.add({ severity: 'success', summary: 'Successful', detail: '成 绩 删 除 成 功', life: 3000 });
      },
      exportCSV() {
         this.$refs.dt.exportCSV();
      },
      confirmDeleteSelected() {
         this.deletescoreDialog = true;
      },
      deleteSelectedscore() {
         this.Scores = this.Scores.filter(val => !this.selectedscore.includes(val));
         this.deletescoreDialog = false;
         this.selectedscore = null;
         this.$toast.add({ severity: 'success', summary: 'Successful', detail: '成 绩 删 除 成 功', life: 3000 });
      },
      initFilters() {
         this.filters = {
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            snum: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            cid: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            major: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            cname: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            //  Score: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            type: { value: null, matchMode: FilterMatchMode.EQUALS },
         }
      },
      findIndexById(snum) {
         let index = -1;
         for (let i = 0; i < this.Scores.length; i++) {
            if (this.Scores[i].snum === snum) {
               index = i;
               break;
            }
         }
         return index;
      },
      clearFilter() {
         this.initFilters();
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

 .Score-image {
    width: 100px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
 }

 .p-dialog .Score-image {
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