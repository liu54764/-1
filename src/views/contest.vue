<template>
  <top />
  <side />
  <div class="main">
    <Toolbar>
      <template #start>
        <Button label="新增" icon="pi pi-plus" class="mr-2 p-button-sm" @click="uploadDialogVisible = true" />
      </template>
      <template #end>
        <Button label="导出" icon="pi pi-upload" class="p-button-help p-button-sm font-bold" @click="exportCSV($event)" />
      </template>
    </Toolbar>
    <div class="grid gap-3" style="margin-left: 0px;">
      <div>
        <h2 class="text-2xl font-bold mb-1">实习经历</h2>
        <DataView :value="internship1" :paginator="true" :rows="2" class="w-full md:w-1/2">
          <template #list="slotProps">
            <div class="bg-gray-50 rounded-lg shadow-md p-4 mb-4">
              <div class="font-bold text-lg text-blue-500 text-left">实习名称： {{ slotProps.data.name }}</div>
              <div class="text-gray-500 font-bold text-left">开始时间：{{ slotProps.data.startTime }}</div>
              <div class="text-gray-500 font-bold text-left">结束时间：{{ slotProps.data.endTime }}</div>
              <div class="font-bold text-gray-500 text-left" style="width: 265px;height: 70px;">描述：{{
                slotProps.data.description }}</div>

              <div class="mt-4">
                <img v-if="slotProps.data.image" :src="slotProps.data.image" class="w-full  rounded-lg shadow-md"
                  style="height: 150px;">
              </div>
              <div class="mt-4">
                <Tag v-if="slotProps.data.status === '已批阅'" value="已批阅" severity="success"></Tag>
                <Tag v-else="slotProps.data.status === '待批阅'" value="待批阅" severity="warning"></Tag>
              </div>
            </div>
          </template>
        </DataView>
      </div>
      <div>
        <h2 class="text-2xl font-bold mb-1">竞赛经历</h2>
        <DataView :value="internship2" :paginator="true" :rows="2" class="w-full md:w-1/2">
          <template #list="slotProps">
            <div class="bg-gray-50 rounded-lg shadow-md p-4 mb-4">
              <div class="font-bold text-lg text-blue-500 text-left">竞赛名称： {{ slotProps.data.name }}</div>
              <div class="text-gray-500 font-bold text-left">开始时间：{{ slotProps.data.startTime }}</div>
              <div class="text-gray-500 font-bold text-left">结束时间：{{ slotProps.data.endTime }}</div>
              <div class="font-bold text-gray-500 text-left" style="width: 265px;height: 70px;">描述：{{
                slotProps.data.description }}</div>

              <div class="mt-4">
                <img v-if="slotProps.data.image" :src="slotProps.data.image" class="w-full  rounded-lg shadow-md"
                  style="height: 150px;">
              </div>
              <div class="mt-4">
                <Tag v-if="slotProps.data.status === '已批阅'" value="已批阅" severity="success"></Tag>
                <Tag v-else="slotProps.data.status === '待批阅'" value="待批阅" severity="warning"></Tag>
              </div>
            </div>
          </template>
        </DataView>
      </div>
    </div>
  </div>

  <Dialog v-model:visible="uploadDialogVisible" header="上传" :visible="uploadDialogVisible" :closable="true">
    <div class="p-fluid" style="width: 400px;">
      <div class="mb-2 mt-1">
        <label class="mr-2">类型:</label>
        <RadioButton v-model="uploadForm.type" value="internship" label="实习" class="mr-2" />
        <label class="mr-5">实习</label>
        <RadioButton v-model="uploadForm.type" value="competition" label="竞赛" class="mr-2" />
        <label>竞赛</label>
      </div>
      <div class="mb-2">
        <label class="mr-2">名称:</label>
        <InputText v-model="uploadForm.name" class="p-inputtext-sm mt-2" />
      </div>
      <div class="mb-2">
        <div style="float: left;">
          <label class="mr-2">开始日期:</label>
          <Calendar v-model="uploadForm.date" dateFormat="yy-mm-dd" class="p-inputtext-sm mt-2 " style="width: 190px;" />
        </div>
        <div style="float: left; margin-left: 20px;">
          <label class="mr-2">结束日期:</label>
          <Calendar v-model="uploadForm.date" dateFormat="yy-mm-dd" class="p-inputtext-sm mt-2 " style="width: 190px;" />
        </div>
      </div>
      <div class="mb-3 mt-7">
        <label class="mr-2">描述:</label>
        <Textarea type="text" rows="4" v-model="uploadForm.description"
          class="mt-2 text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"></Textarea>
      </div>
      <div class="mb-3">
        <label class="mr-2">证明:</label>
        <FileUpload mode="basic" accept=".pdf,.png,.jpg,.jpeg" maxFileSize="1000000" @upload="handleUpload" class="mt-2"
          chooseLabel="请选择">
          <template #header>
            <div class="p-d-flex p-ai-center">
              <Button icon="pi pi-plus" class="p-button-rounded p-button-outlined p-mr-2 p-button-sm" />
              <span>选择文件</span>
            </div>
          </template>
        </FileUpload>
      </div>
    </div>
    <template #footer>
      <div class="p-d-flex p-jc-end">
        <Button label="取消" class="mr-2 p-button-sm" @click="uploadDialogVisible = false" />
        <Button label="上传" class="p-button-success p-button-sm" :disabled="uploading" @click="upload" />
      </div>
    </template>
  </Dialog>
</template>
  
<script>

import top from '../components/top.vue'
import side from '../components/side.vue'
import Tag from 'primevue/tag';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import FileUpload from 'primevue/fileupload';
import DataView from 'primevue/dataview';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';
import RadioButton from 'primevue/radiobutton'
import Calendar from 'primevue/calendar';
import Textarea from 'primevue/textarea';
import request from '@/utils/request';
export default {
  components: {
    DataView,
    Tag,
    FileUpload,
    Button,
    Dialog,
    InputText,
    side,
    top,
    Toolbar,
    Calendar,
    RadioButton,
    Textarea
  },
  data() {
    return {
      uploadDialogVisible: false,
      uploadForm: [],
      internship1: [],
      internship2: [],
      internships: [
        //   {
        //     company: 'ABC公司',
        //     date: '2022年1月-2022年4月',
        //     description: '在ABC公司进行了为氛围氛围氛围氛围服务而分为范围分为三个月的前端',
        //     image: 'fwefewfef'
        //   }
        //   , {
        //     company: 'ABC公司',
        //     date: '2022年1月-2022年4月',
        //     description: '在ABC公司进行了为期三个月的前端',
        //     image: 'fwefewfef'
        //   },
        //   {
        //     company: 'ABC公司',
        //     date: '2022年1月-2022年4月',
        //     description: '在ABC公司进行了为期三个月的前端',
        //     image: 'fwefewfef'
        //   }
        //   , {
        //     company: 'ABC公司',
        //     date: '2022年1月-2022年4月',
        //     description: '在ABC公司进行了为期三个月的前端',
        //     image: 'fwefewfef'
        //   },
        //   {
        //     company: 'ABC公司',
        //     date: '2022年1月-2022年4月',
        //     description: '在ABC公司进行了为期三个月的前端',
        //     image: 'fwefewfef'
        //   }
        //   , {
        //     company: 'ABC公司',
        //     date: '2022年1月-2022年4月',
        //     description: '在ABC公司进行了为期三个月的前端',
        //     image: 'fwefewfef'
        //   },
        //   {
        //     company: 'ABC公司',
        //     date: '2022年1月-2022年4月',
        //     description: '在ABC公司进行了为期三个月的前端',
        //     image: 'fwefewfef'
        //   }
        //   , {
        //     company: 'ABC公司',
        //     date: '2022年1月-2022年4月',
        //     description: '在ABC公司进行了为期三个月的前端',
        //     image: 'fwefewfef'
        //   }
        // ],
        // competitions: [
        //   {
        //     company: 'ABC公司',
        //     date: '2022年1月-2022年4月',
        //     description: '在ABC公司进行了为期三个月的前端',
        //   }
        //   , {
        //     company: 'ABC公司',
        //     date: '2022年1月-2022年4月',
        //     description: '在ABC公司进行了为期三个月的前端',
        //   }
      ],
    };
  },
  created() {
     this.GetInformation()
     this.GetExper()
  },
  methods: {
    GetInformation() {
      let userinfo = JSON.parse(localStorage.getItem('userinfo'))
      this.id = userinfo.data.id
    },
    GetExper() {
      let url = "/experience/all" + "?sid=" + this.id
      request.get(url).then(res => {
        this.internships = res.data.data
        this.judge()
      })
    },
    judge() {
      if (this.internships) {
        for (let internship of this.internships) {
          if (internship.type === "实习") {
            this.internship1.push(internship)
          }
          else {
            this.internship2.push(internship)
          }
        }
      }
      return total;
    },
    upload(event) {
      // const uploadedFiles = event.files;
      // // 上传文件到服务器
      // axios.post('/upload', uploadedFiles)
      //   .then(response => {
      //     const uploadedFiles = response.data.files;
      //     // 在页面上显示上传的文件
      //     this.uploadedFiles = uploadedFiles;
      //     this.$toast.add({ severity: 'info', summary: 'Success', detail: '文件已上传', life: 3000 });
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });
      this.uploadDialogVisible = false;
    },
  },
  // clearUploadForm() {

  // },
  exportCSV() {
    this.$refs.dt.exportCSV();
  },
}
</script>
<style scoped> .main {
   margin-top: 20px;
   margin-left: 20px;
   width: 1270px;
   height: 85vh;
   float: left;



 }
</style>