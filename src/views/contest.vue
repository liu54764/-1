<!-- <template>
    <top />
    <side />
  <div class="main  p-4 shadow-2 border-round-2xl">
  
      
  </div>
 <div class="main  p-4 shadow-2 border-round-2xl">

 </div>

  
  </template>
  
  <script>
  
  import top from '../components/top.vue'
  import side from '../components/side.vue'
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Toolbar from 'primevue/toolbar';
  import Dialog from 'primevue/dialog';
  import Button from 'primevue/button';
  import InputText  from 'primevue/inputtext';
  export default {
    name:'contest',
   components:{
    top,side,Column,DataTable,Toolbar,Dialog,Button,InputText
   },
   data() {
        return {
            customers: [

        ],
        }
    },
    created() {
        // this.customerService = new CustomerService();
    },
    mounted() {
        // this.customerService.getCustomersLarge().then(data => {
        //     this.customers = data;
        //     this.customers.forEach(customer => customer.date = new Date(customer.date));
        //     this.loading = false;
        // });
    },
    methods: {
       
    }
}
  </script>
  
  <style scoped> 
   .main{
      margin-top: 20px;
      margin-left: 20px;
      width:630px;
      height: 85vh;
      float: left;
    }


  </style> -->

  <template>
    <top />
    <side />
    <div class="container">
      <h1>学生信息</h1>
      <Card>
        <template v-slot:title>
          {{ mockData.name }}
        </template>
        <template v-slot:subtitle>
          {{ mockData.major }}
        </template>
        <template v-slot:footer>
          {{ mockData.date }}
        </template>
        <div class="p-fluid">
          <div class="p-field p-col-12">
            <label for="competitions">参加的竞赛</label>
            <Listbox :options="mockData.competitions" multiple v-model="selectedCompetitions"></Listbox>
          </div>
          <div class="p-field p-col-12">
            <label for="internships">参加的实习</label>
            <Listbox :options="mockData.internships" multiple v-model="selectedInternships"></Listbox>
          </div>
        </div>
      </Card>
    </div>
  </template>
  
  <script>
  import Card from 'primevue/card';
  import  Listbox  from 'primevue/listbox';
  import top from '../components/top.vue'
  import side from '../components/side.vue'
  export default {
    name: 'StudentInformation',
    components: {
      Card,
      Listbox,top
      ,side
    },
    data() {
      return {
        mockData: {
          name: '张三',
          major: '计算机科学与技术',
          date: '2023年4月6日',
          competitions: [
            { label: '2021全国大学生物联网竞赛', value: 'bio-iot' },
            { label: '2022年全国电子设计大赛', value: 'ele-design' },
            { label: '2022年全国数学建模竞赛', value: 'math-model' },
            { label: '2020年全国大学生机器人竞赛', value: 'robot' },
          ],
          internships: [
            { label: '2020年深圳市某科技公司', value: 'sz-tech' },
            { label: '2021年上海某互联网公司', value: 'sh-internet' },
            { label: '2021年北京某创业公司', value: 'bj-startup' },
            { label: '2022年上海某外企', value: 'sh-foreign' },
            { label: '2021年北京某金融公司', value: 'bj-finance' },
          ],
        },
        selectedCompetitions: [],
        selectedInternships: [],
      };
    },
  };
  </script>
  
  <style scoped>
  .container {
    margin: 20px;
  }
  </style>
  