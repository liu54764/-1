<template>
   <top />
   <side />
   <div class="card">
   <div class="surface-ground px-4 py-4 md:px-4 lg:px-4  border-round-2xl">
    <div class="grid">
        <div class="col-12 md:col-3 lg:col-3">
            <div class="surface-card shadow-2 p-3 border-round">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3 font-bold">学生数量</span>
                        <div class="text-900 font-medium text-xl">1520</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width:2.5rem;height:2.5rem">
                        <i class="pi pi-user text-blue-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">24 new </span>
                <span class="text-500">since last visit</span>
            </div>
        </div>
        <div class="col-12 md:col-6 lg:col-3">
            <div class="surface-card shadow-2 p-3 border-round">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3 font-bold">机构数量</span>
                        <div class="text-900 font-medium text-xl">100</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width:2.5rem;height:2.5rem">
                        <i class="pi pi-users text-orange-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">52 </span>
                <span class="text-500">since last week</span>
            </div>
        </div>
        <div class="col-12 md:col-6 lg:col-3">
            <div class="surface-card shadow-2 p-3 border-round">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3 font-bold">登录次数</span>
                        <div class="text-900 font-medium text-xl">28441</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-cyan-100 border-round" style="width:2.5rem;height:2.5rem">
                        <i class="pi pi-inbox text-cyan-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">520 </span>
                <span class="text-500">newly registered</span>
            </div>
        </div>
        <div class="col-12 md:col-6 lg:col-3">
            <div class="surface-card shadow-2 p-3 border-round">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3 font-bold">查询次数</span>
                        <div class="text-900 font-medium text-xl">152</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-purple-100 border-round" style="width:2.5rem;height:2.5rem">
                        <i class="pi pi-search text-purple-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">85 </span>
                <span class="text-500">responded</span>
            </div>
        </div>
    </div>
</div>
<div style="width: 800px;margin-top: 15px;float: left;font-weight: 700;font-size: larger;">
   <div style="margin-bottom: 10px;margin-top: 10px;">用户活跃度</div>
      <Chart type="bar" :data="chartData" :options="chartOptions" width="650" height="300"/>
    </div>


    <div style="float: left;margin-top: 20px;width: 400px;height: 410px;margin-left: 28px;font-weight: 700;padding: 20px;" class="bg-blue-50 border-round-2xl">
      <el-calendar v-model="value" class="test">
      </el-calendar>

    </div>  
</div>
</template>

<script>
import Chart from 'primevue/chart';
import top from '../components/top.vue'
import side from '../components/side.vue'
import Column from 'primevue/column';
  import DataTable from 'primevue/datatable';
export default {
  components:{
   top,side,Column,DataTable, Chart
  },
  data() {
        return {
         date: "",
         week: "",
         chartData: {
                labels: null,
                datasets: [{
                    type: 'line',
                    label: '总活跃',
                    borderColor: '#9c27b0',
                    borderWidth: 2,
                    fill: true,
                    data: [50,25,12,48,56,76,42]
                }, {
                    type: 'bar',
                    label: '学生',
                    backgroundColor: '#4b81ad',
                    data: [21,84,24,75,37,65,34],
                    borderColor: 'white',
                    borderWidth: 2
                }, {
                    type: 'bar',
                    label: '机构',
                    backgroundColor: '#b37873',
                    data: [41,52,24,74,23,21,32]
                }]
            },chartOptions: {
                plugins: {
                    legend: {
                        labels: {
                           
                        }
                    }
                },
                scales: {
                  //   x: {
                  //       ticks: {
                  //           color: ''
                  //       },
                  //       grid: {
                  //           color: '#ebedef'
                  //       }
                  //   },
                  //   y: {
                  //       ticks: {
                  //           color: '#495057'
                  //       },
                  //       grid: {
                  //           color: '#ebedef'
                  //       }
                  //   }
                }
               }
            
            
        }
    },
    productService: null,
    created() {
     
      value: new Date()
      //   this.productService = new ProductService();
      this.chartData.labels=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
    },
    mounted() {
      //   this.productService.getProductsSmall().then(data => this.products = data);
    },
    methods: {
      getday2() {
         for(var i=0;i<7;i++)
           {
            var weekDayArr=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]//星期映射数组
            var myDate = new Date()
            var milliseconds=myDate.getTime()+1000*60*60*24*i; //当i为0代表当前日期，为1时可以得到明天的日期，以此类推
            var newMyDate = new Date(milliseconds);
            var weekDay=newMyDate.getDay(); //获取当前星期X(0-6,0代表星期天)
           this.chartData.labels[i]=weekDayArr[weekDay];
           console.log(weekDayArr[weekDay]);
           }	
	},
      //   onRowSelect(event) {
      //       this.$toast.add({severity: 'info', summary: 'Product Selected', detail: 'Name: ' + event.data.name, life: 3000});
      //   },
      //   onRowUnselect(event) {
      //       this.$toast.add({severity: 'warn', summary: 'Product Unselected', detail: 'Name: ' + event.data.name, life: 3000});
      //   }
    }
}


</script>

<style scoped> 
 .card{
    margin-top: 20px;
      margin-left: 40px;
      width:80%;
      height: 85vh;
      float: left;
  }
  .test /deep/  .el-calendar-table .el-calendar-day{
    width: 20px;
    height: 45px;
  }

</style>