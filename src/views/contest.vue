<template>
  <top />
  <side />
  <div class="main">
    <Toolbar>
      <template #start>
        <Button label="新增" icon="pi pi-plus" class="mr-2 p-button-sm" @click="uploadDialogVisible = true" />
      </template>

      <!-- <template #end>
        <Button label="导出" icon="pi pi-upload" class="p-button-help p-button-sm font-bold" @click="exportCSV($event)" />
      </template> -->
    </Toolbar>
    <div class="grid gap-3" style="margin-left: 0px;">
      <div style="width: 600px;">
        <h2 class="text-2xl font-bold mb-1">实习经历</h2>
        <DataView v-if="refresh" :value="internship1" :paginator="true" :rows="2" class="w-full md:w-1/2">
          <template #list="slotProps">
            <div class=" rounded-lg shadow-md p-4 mb-4">
              <div class="font-bold text-lg text-blue-500 text-left">实习名称： {{ slotProps.data.name }}</div>
              <div class="text-gray-500 font-bold text-left">开始时间：{{ slotProps.data.startTime }}</div>
              <div class="text-gray-500 font-bold text-left">结束时间：{{ slotProps.data.endTime }}</div>
              <div class="font-bold text-gray-500 text-left" style="width: 250px;height: 70px;">描述：{{
                slotProps.data.description }}</div>

              <div class="mt-4">
                <img v-if="slotProps.data.filename" :src="slotProps.data.filename" class="w-full  rounded-lg shadow-md"
                  style="height: 150px;width:50px">
              </div>
              <div class="mt-4">
                <Tag v-if="slotProps.data.status === '已批阅'" value="已批阅" severity="success"></Tag>
                <Tag v-else="slotProps.data.status === '待批阅'" value="待批阅" severity="warning"></Tag>
              </div>
            </div>
          </template>
        </DataView>
      </div>
      <div style="width: 600px;">
        <h2 class="text-2xl font-bold mb-1">竞赛经历</h2>
        <DataView ref="dt" v-if="refresh" :value="internship2" :paginator="true" :rows="2" class="w-full md:w-1/2">
          <template #list="slotProps">
            <div class=" rounded-lg shadow-md p-4 mb-4">
              <div class="font-bold text-lg text-blue-500 text-left">竞赛名称： {{ slotProps.data.name }}</div>
              <div class="text-gray-500 font-bold text-left">开始时间：{{ slotProps.data.startTime }}</div>
              <div class="text-gray-500 font-bold text-left">结束时间：{{ slotProps.data.endTime }}</div>
              <div class="font-bold text-gray-500 text-left" style="width: 250px;height: 70px;">描述：{{
                slotProps.data.description }}</div>

              <div class="mt-4">
                <img :src="slotProps.data.filename" class="w-full  rounded-lg shadow-md"
                  style="height: 150px;width:50px">
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
        <RadioButton v-model="uploadForm.type" value="实习" label="实习" class="mr-2" />
        <label class="mr-5">实习</label>
        <RadioButton v-model="uploadForm.type" value="竞赛" label="竞赛" class="mr-2" />
        <label>竞赛</label>
      </div>
      <div class="mb-2">
        <label class="mr-2">名称:</label>
        <InputText v-model="uploadForm.name" class="p-inputtext-sm mt-2" />
      </div>
      <div class="mb-2">
        <div style="float: left;">
          <label class="mr-2">开始日期:</label>
          <Calendar v-model="uploadForm.startdate" dateFormat="yy-mm-dd" class="p-inputtext-sm mt-2 "
            style="width: 190px;" />
        </div>
        <div style="float: left; margin-left: 20px;">
          <label class="mr-2">结束日期:</label>
          <Calendar v-model="uploadForm.enddate" dateFormat="yy-mm-dd" class="p-inputtext-sm mt-2 "
            style="width: 190px;" />
        </div>
      </div>
      <div class="mb-3 mt-7">
        <label class="mr-2">描述:</label>
        <Textarea type="text" rows="4" v-model="uploadForm.description"
          class="mt-2 text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"></Textarea>
      </div>
      <div class="mb-3">
        <label class="mr-2">证明:</label>
        <div class="card">
          <Toast />
          <FileUpload name="file" url="http://localhost:9000/api/file/upload" @upload="onAdvancedUpload($event)"
            :multiple="true" accept="image/*" :maxFileSize="1000000" class="p-button-sm">
            <template #empty>
              <p>将文件拖放到此处进行上传</p>
            </template>
          </FileUpload>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="p-d-flex p-jc-end">
        <Button label="取消" class="mr-2 p-button-sm" @click="uploadDialogVisible = false" />
        <Button label="上传" class="p-button-success p-button-sm" @click="PutExper" />
      </div>
    </template>
  </Dialog>
</template>
  
<script>
import Toast from 'primevue/toast';
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
    Textarea,
    Toast
  },
  data() {
    return {
      url:"http://localhost:9000/api/file/files/",
      refresh: true,
      uploadDialogVisible: false,
      uploadForm: {},
      internship1: [],
      internship2: [],
      internships: [],
    };
  },
  created() {
    this.GetInformation()
    this.GetExper()
  },
  mounted() {
  },
  methods: {
    onAdvancedUpload(event) {
      const files = event.files;
      files.forEach((file) => {
        const fileName = file.name;
        this.uploadForm.filename=fileName;
      });
      this.$toast.add({ severity: 'success', summary: 'Success', detail: '文件上传成功', life: 3000 });
    },
    GetInformation() {
      let userinfo = JSON.parse(localStorage.getItem('userinfo'))
      this.id = userinfo.data.id
      this.uploadForm.sid = userinfo.data.id

    },
    GetExper() {
      let url = "/experience/all" + "?sid=" + this.id
      request.get(url).then(res => {
        this.internships = res.data.data
        this.judge()
      })
    },
    PutExper() {
      console.log(this.uploadForm)
      request.post("/experience/add", this.uploadForm).then(res => {
        console.log(res)
        this.uploadDialogVisible = false
        if (res.data.code === "0") {
          this.$message({
            type: "success",
            message: "上传成功"
          })
          setTimeout(() => {
            this.refresh = false
            this.$nextTick(() => {
              this.refresh = true
            })
          }, 300)
        }
        else {
          this.$message({
            type: "error",
            message: "上传失败"
          })
        }
      })
    },
    judge() {
      if (this.internships) {
        for (let internship of this.internships) {
        internship.filename=this.url+internship.filename
          if (internship.type === "实习") {
            this.internship1.push(internship)
          }
          else {
            this.internship2.push(internship)
          }
        }
      }
    },
    handleUpload(event) {
      const file = event.files[0];

      const formData = new FormData();
      formData.append('file', file);

      fetch(this.uploadUrl, {
        method: 'POST',
        body: formData,
      })
        .then(response => response.text())
        .then(result => {
          console.log(result); // 处理上传结果
        })
        .catch(error => {
          console.error('文件上传失败:', error);
        });
    },
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