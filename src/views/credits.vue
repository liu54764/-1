<template>
    <top />
    <side />
    <div class="main">
      <div class="card">
        <DataTable v-model:expandedRowGroups="expandedRowGroups" :value="customers" tableStyle="min-width: 50rem"  showGridlines  v-model:editingRows="editingRows" editMode="row" 
                @row-edit-save="onRowEditSave"
                expandableRowGroups rowGroupMode="subheader" groupRowsBy="representative" @rowgroup-expand="onRowGroupExpand" @rowgroup-collapse="onRowGroupCollapse"
                sortMode="single" sortField="representativ" :sortOrder="1" class="p-datatable-sm">
            <template #groupheader="slotProps">
                <span class="vertical-align-middle ml-2 font-bold line-height-3">{{ slotProps.data.representative}}</span>
            </template>
            <Column field="representative" header="representative"></Column>
            <Column field="name" :header="major" style="width: 170px" class="text-purple-500 font-bold text-center" ></Column>
            <Column field="id" header="课程号" style="width: 100px" class="text-center text-green-500 font-bold"></Column>
            <Column field="date" header="修读时间" style="width: 150px" class="text-center text-yellow-500 font-bold">
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" style="width: 150px"/>
                </template>
            </Column>
            <Column field="credits" header="学分" style="width: 100px" class="text-center text-blue-500 font-bold"></Column>
            <Column field="time" header="学时" style="width: 100px" class="text-center font-bold"></Column>
            <Column field="style" header="课程类型" style="width: 100px" class="text-center font-bold text-red-500"></Column>
            <Column field="grade" header="最大成绩" style="width: 100px" class="text-center font-bold text-indigo-500">
            <template #editor="{ data, field }">
                    <InputText v-model="data[field]" style="width: 100px"/>
            </template>
            </Column>
            <Column field="grades" header="绩点" style="width: 70px" class="text-center font-bold">
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" style="width: 70px"/>
                </template>
            </Column>
            <Column field="status" header="修读状态" style="width: 100px" class="text-center font-bold">
                <template #editor="{ data, field }">
                    <Dropdown v-model="data[field]" :options="statuses" optionLabel="label" optionValue="value" placeholder="Select a Status" class="font-bold">
                        <template #option="slotProps">
                            <Tag :value="slotProps.option.value" :severity="getStatusLabel(slotProps.option.value)" />
                        </template>
                    </Dropdown>
                </template>
                <template #body="slotProps">
                    <Tag :value="slotProps.data.status" :severity="getStatusLabel(slotProps.data.status)" />
                </template>
            </Column>
            <Column :rowEditor="true" style="width: 100px;" bodyStyle="text-align:center" header="操作"></Column>
            <template #groupfooter="slotProps">
                <td colspan="10">
                    <div class="flex justify-content-end font-bold">总共获得学分: {{ calculateCustomerTotal(slotProps.data.representative) }}</div>
                    <div class="flex justify-content-end font-bold">还需获得学分: {{ 35-calculateCustomerTotal(slotProps.data.representative) }}</div>
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
  export default {
    name:'grade',
    components:{
    top,side,Column,RadioButton,DataTable,Chart,Toast,Tag,InputText,Dropdown 
  },
  data() {
        return {
          major:"计算机科学与技术",
          editingRows: [],
          statuses: [
                { label: '已修', value: '已修' },
                { label: '未修', value: '未修' },
                { label: '未通过', value: '未通过' }
            ],
            customers: [
            {
    id: 1000,
    name: '高数',
    credits: 5,
    time:'32h',
    date: '2022-09-13',
    status: '未通过',
    style:'专业课',
    grade:54,
    grades:1.0,
    representative: '实践必修 要求学分35',
},
{
    id: 1000,
    name: '线代',
    credits: 4,
    time:'32h',
    date: '2022-09-13',
    status: '已修',
    style:'专业课',
    grade:54,
    grades:1.0,
    representative: '实践必修 要求学分35',
},
{
    id: 1000,
    name: '数据结构',
    credits: 4,
    time:'32h',
    date: '2022-09-13',
    status: '已修',
    style:'专业课',
    grade:54,
    grades:1.0,
    representative: '专业必修 要求学分35',
},
{
    id: 1000,
    name: '操作系统',
    credits: 4,
    time:'32h',
    date: '',
    status: '未修',
    style:'专业课',
    grade:'',
    grades:'',
    representative: '专业必修 要求学分35',
},
            ],
            expandedRowGroups: null
        };
    },
    mounted() {
        // CustomerService.getCustomersMedium().then((data) => (this.customers = data));
    },
    methods: {
        onRowGroupExpand(event) {
            this.$toast.add({ severity: 'info', summary: '行组已展开', detail:  event.data, life: 3000 });
        },
        onRowGroupCollapse(event) {
            this.$toast.add({ severity: 'success', summary: '行组已折叠', detail:  event.data, life: 3000 });
        },
        calculateCustomerTotal(name) {
            let total = 0;
            if (this.customers) {
                for (let customer of this.customers) {
                    if (customer.representative === name&&customer.status=="已修") {
                        total=total+customer.credits;
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
            this.customers[index] = newData;
        },
    },
}
  </script>
  
  <style scoped> 
   .main{
      margin-top: 20px;
      margin-left: 30px;
      width:80%;
      height: 85vh;
      float: left;
 
    }
  
  </style>