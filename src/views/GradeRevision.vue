<template>
   <top />
   <side />
   <Toast style="font-weight: 600;" />
   <div class="card">
      <Toolbar class=" p-toolbar-sm mb-2">
         <template #start>
            <Button label="新增" icon="pi pi-plus" class="p-button-sm mr-2 font-bold" @click="openNew" />
            <Button label="删除" icon="pi pi-trash" class="p-button-danger p-button-sm mr-2 font-bold"
               @click="confirmDeleteSelected" :disabled="!selectedScores || !selectedScores.length" />
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

      <DataTable ref="dt" v-model:value="Scores" v-model:selection.sync="selectedScores" class="p-datatable-sm"
         filterDisplay="menu" :paginator="true" :rows="8" v-model:editingRows="editingRows" editMode="row"
         v-model:filters="filters" :scrollable="true" scrollHeight="450px"
         paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
         :rowsPerPageOptions="[8, 15, 20]" currentPageReportTemplate=" {first}  至  {last} " responsiveLayout="scroll">

         <Column selectionMode="multiple" style="min-width: 40px;"></Column>
         <Column field="code" header="学号" sortField="code" style="min-width: 80px;"
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
         <Column field="coursecode" header="课程号" style="min-width: 100px;" class="text-green-600  font-bold">
            <template #filter="{ filterModel }">
               <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="关键字" />
            </template>
         </Column>

         <Column field="course" header="课程" style="min-width: 120px;" class="text-green-600  font-bold">
            <template #filter="{ filterModel }">
               <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="关键字" />
            </template>
         </Column>

         <Column field="type" header="课程类型" style="min-width: 120px;" class="text-orange-600  text-center font-bold">
            <template #filter="{ filterModel }">
               <Dropdown v-model="filterModel.value" :options="courseOptions" placeholder="选择课程类型" class="p-column-filter">
                  <template #option="slotProps">
                     <span v-if="slotProps.option === null">所有</span>
                     <span v-else-if="slotProps.option === '选修'">选修</span>
                     <span v-else-if="slotProps.option === '必修'">必修</span>
                  </template>
               </Dropdown>
            </template>
         </Column>
         <Column field="credit" header="学分" :sortable="true" style="min-width: 80px;" class="text-center"></Column>
         <Column field="date1" header="考试时间" :sortable="true" style="min-width: 120px;" class="text-center">
         </Column>
         <Column field="Scores" header="分数" :sortable="true" style="min-width: 90px;" class="text-center"></Column>
         <Column field="Score" header="绩点" :sortable="true" style="min-width: 90px;" class="text-center"></Column>
         <Column field="data2" header="上传时间" data-type="date" style="min-width: 120px;" :sortable="true"
            class="text-center"></Column>
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
         <label for="code">学号</label>
         <InputText v-model="Score.code" class="p-inputtext-sm mt-1" />
      </div>
      <div class="p-field">
         <label for="coursecode">姓名</label>
         <InputText v-model="Score.name" class="p-inputtext-sm mt-1" />
      </div>
      <div class="p-field mt-1" style="width: 190px;float: left;">
         <label for="major">专业</label>
         <InputText v-model="Score.major" id="major" class="p-inputtext-sm mt-1" />
      </div>
      <div class="p-field mt-1" style="width: 190px;float: left; margin-left: 20px;">
         <label for="coursecode">课程号</label>
         <InputText v-model="Score.coursecode" id="coursecode" class="p-inputtext-sm mt-1" />
      </div>
      <div class="p-field mt-1" style="width: 190px;float: left;">
         <label for="course">课程</label>
         <InputText v-model="Score.course" id="course" class="p-inputtext-sm mt-1" />
      </div>
      <div class="p-field mt-1" style="width: 190px;float: left;margin-left: 20px;">
         <label for="type">课程类型</label>
         <Dropdown v-model="Score.type" :options="courseOptions" placeholder="选择课程类型" id="type"
            class="p-inputtext-sm mt-1" />
      </div>
      <div class="p-field mt-1" style="width: 190px;float: left;">
         <label for="credit">学分</label>
         <InputText v-model="Score.credit" id="credit" class="p-inputtext-sm mt-1" />
      </div>
      <div class="p-field mt-1" style="width: 190px;float: left;margin-left: 20px;">
         <label for="date1">考试时间</label>
         <Calendar v-model="Score.date1" id="date1" date-format="yy-mm-dd" class="p-inputtext-sm mt-1" />
      </div>
      <div class="p-field mt-1" style="width: 190px;float: left;">
         <label for="Scores">分数</label>
         <InputNumber v-model="Score.Scores" id="Scores" :minFractionDigits="1" :maxFractionDigits="3"
            class="p-inputtext-sm mt-1" />
      </div>
      <div class="p-field mt-1" style="width: 190px;float: left;margin-left: 20px;">
         <label for="Score">绩点</label>
         <InputNumber v-model="Score.Score" id="Score" :minFractionDigits="2" :maxFractionDigits="4"
            class="p-inputtext-sm mt-1" />
      </div>
      <!-- 其他输入框 -->
      <template #footer>
         <Button label="取消" class="mr-2 p-button-sm" @click="hideDialog" />
         <Button label="保存" class="p-button-success p-button-sm" :disabled="uploading" @click="saveScore" />
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

   <Dialog v-model:visible="deleteScoresDialog" :styles="{ width: '450px' }" header="确认" :modal="true" :closable="true">
      <div class="confirmation-content">
         <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
         <span style="font-weight: 500; font-size: large;" v-if="Score">你 确 认 删 除 吗?</span>
      </div>
      <template #footer>
         <Button label="否" icon="pi pi-times" class="p-button-text" @click="deleteScoresDialog = false" />
         <Button label="是" icon="pi pi-check" class="p-button-text" @click="deleteSelectedScores" />
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
export default {

   name: 'ScoreRevision',
   components: {
      top, side, mainout, Dialog, Button, InputNumber, Toolbar, FileUpload, InputText, Column, RadioButton, DataTable, Textarea, Chart, FilterMatchMode
      , Toast, FilterOperator, Calendar, Dropdown
   },
   data() {
      return {
         courseOptions: ['选修', '必修'],
         Scores: [
            {
               code: '20210101',
               name: '张三',
               coursecode: 'C001',
               major: '计算机科学与技术',
               course: '计算机基础',
               type: '必修',
               credit: 3,
               date1: ('2022-05-15'),
               Scores: 85,
               Score: 3.0,
               data2: ('2022-05-16')
            },
            {
               code: '20210102',
               name: '李四',
               coursecode: 'C001',
               major: '软件工程',
               course: '数据结构',
               type: '必修',
               credit: 4,
               date1: '2022-06-20',
               Scores: 90,
               Score: 3.3,
               data2: ('2022-06-21')
            },
            {
               code: '20210103',
               name: '王五',
               coursecode: 'C002',
               major: '网络安全',
               course: '软件工程',
               type: '必修',
               credit: 5,
               date1: ('2022-07-25'),
               Scores: 92,
               Score: 3.7,
               data2: ('2022-07-26')
            },
            {
               code: '20210104',
               name: '赵六',
               coursecode: 'C002',
               major: '智能科学与技术',
               course: '人工智能',
               type: '选修',
               credit: 3,
               date1: ('2022-08-10'),
               Scores: 88,
               Score: 3.3,
               data2: ('2022-08-11')
            },
            {
               code: '20210105',
               name: '钱七',
               coursecode: 'C003',
               major: '数据处理',
               course: '数据库',
               type: '选修',
               credit: 4,
               date1: ('2022-09-05'),
               Scores: 85,
               Score: 3.0,
               data2: ('2022-09-06')
            }
         ],
         ScoreDialog: false,
         deleteScoreDialog: false,
         deleteScoresDialog: false,
         Score: {},
         selectedScores: null,
         filters: {},
         submitted: false,
      }
   },
   created() {
      // this.ScoreService = new ScoreService();
      this.initFilters();
   },
   mounted() {
      // this.ScoreService.getScores().then(data => this.Scores = data);
   },
   methods: {
      // onRowEditSave(event) {
      //    let { newData, index } = event;

      //    this.Scores[index] = newData;
      // },
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
         if (this.Score.code) {
            this.Scores[this.findIndexById(this.Score.code)] = this.Score;
            this.$toast.add({ severity: 'success', summary: 'Successful', detail: '成绩  更新成功', life: 3000 });
         }
         else {
            this.Score.date1 = this.Score.date1.toLocaleDateString();
            this.Scores.push(this.Score);
            this.$toast.add({ severity: 'success', summary: 'Successful', detail: '成绩  创建成功', life: 3000 });
         }
         this.ScoreDialog = false;
         // console.log(this.Score.date1);
         this.Score = {};
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
         this.Scores = this.Scores.filter(val => val.code !== this.Score.code);
         this.deleteScoreDialog = false;
         this.Score = {};
         this.$toast.add({ severity: 'success', summary: 'Successful', detail: '成绩   删除成功', life: 3000 });
      },
      exportCSV() {
         this.$refs.dt.exportCSV();
      },
      confirmDeleteSelected() {
         this.deleteScoresDialog = true;
      },
      deleteSelectedScores() {
         this.Scores = this.Scores.filter(val => !this.selectedScores.includes(val));
         this.deleteScoresDialog = false;
         this.selectedScores = null;
         this.$toast.add({ severity: 'success', summary: 'Successful', detail: '成绩   删除', life: 3000 });
      },
      initFilters() {
         this.filters = {
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            code: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            coursecode: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            major: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            course: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            //  Score: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            type: { value: null, matchMode: FilterMatchMode.EQUALS },
            //  major: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
         }
      },
      findIndexById(code) {
            let index = -1;
            for (let i = 0; i < this.Scores.length; i++) {
                if (this.Scores[i].code === code) {
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