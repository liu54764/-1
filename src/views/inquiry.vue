<template>
   <top />
   <side />
    <!-- <div class="body ">     
        <div class="card">
            <DataTable :value="customers2" :paginator="true" class="p-datatable-customers" :rows="10"
                dataKey="id" :filters.sync="filters2" filterDisplay="row"  responsiveLayout="scroll"
                :globalFilterFields="['name','country.name','representative.name','status']">
                <template #header>
                    <div class="flex justify-content-end">
                        <span class="p-input-icon-left ">
                            <i class="pi pi-search" />
                            <InputText v-model="filters2['global'].value" placeholder="Keyword Search" />
                        </span>
                    </div>
                </template>
                <template #empty>
                    No customers found.
                </template>
                <Column field="name" header="Name" :styles="{'min-width':'12rem'}">
                    <template #body="{data}">
                        {{data.name}}
                    </template>
                    <template #filter="{filterModel,filterCallback}">
                        <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" :placeholder="`Search by name - ${filterModel.matchMode}`" v-tooltip.top.focus="'Hit enter key to filter'"/>
                    </template>
                </Column>
                <Column header="Country" filterField="country.name" :styles="{'min-width':'12rem'}">
                    <template #body="{data}">
                        <img src="../../assets/images/flag_placeholder.png" :class="'flag flag-' + data.country.code" width="30" />
                        <span class="image-text">{{data.country.name}}</span>
                    </template>
                    <template #filter="{filterModel,filterCallback}">
                        <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" placeholder="Search by country" v-tooltip.top.focus="'Filter as you type'"/>
                    </template>
                </Column>
                <Column header="Agent" filterField="representative" :showFilterMenu="false" :styles="{'min-width':'14rem'}">
                    <template #body="{data}">
                        <img :alt="data.representative.name" :src="'demo/images/avatar/' + data.representative.image" width="32" style="vertical-align: middle" />
                        <span class="image-text">{{data.representative.name}}</span>
                    </template>
                    <template #filter="{filterModel,filterCallback}">
                        <MultiSelect v-model="filterModel.value" @change="filterCallback()" :options="representatives" optionLabel="name" placeholder="Any" class="p-column-filter">
                            <template #option="slotProps">
                                <div class="p-multiselect-representative-option">
                                    <img :alt="slotProps.option.name" :src="'demo/images/avatar/' + slotProps.option.image" width="32" style="vertical-align: middle" />
                                    <span class="image-text">{{slotProps.option.name}}</span>
                                </div>
                            </template>
                        </MultiSelect>
                    </template>
                </Column>
                <Column field="status" header="Status" :showFilterMenu="false" :styles="{'min-width':'12rem'}">
                    <template #body="{data}">
                        <span :class="'customer-badge status-' + data.status">{{data.status}}</span>
                    </template>
                    <template #filter="{filterModel,filterCallback}">
                        <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="statuses" placeholder="Any" class="p-column-filter" :showClear="true">
                            <template #value="slotProps">
                                <span :class="'customer-badge status-' + slotProps.value" v-if="slotProps.value">{{slotProps.value}}</span>
                                <span v-else>{{slotProps.placeholder}}</span>
                            </template>
                            <template #option="slotProps">
                                <span :class="'customer-badge status-' + slotProps.option">{{slotProps.option}}</span>
                            </template>
                        </Dropdown>
                    </template>
                </Column>
                <Column field="verified" header="Verified" dataType="boolean" :styles="{'min-width':'6rem'}">
                    <template #body="{data}">
                        <i class="pi" :class="{'true-icon pi-check-circle': data.verified, 'false-icon pi-times-circle': !data.verified}"></i>
                    </template>
                    <template #filter="{filterModel,filterCallback}">
                        <TriStateCheckbox v-model="filterModel.value" @change="filterCallback()"/>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div> -->
</template>
    

<script>
  import top from '../components/top.vue'
  import side from '../components/side.vue'
  import Dialog from 'primevue/dialog';
  import Button from 'primevue/button';
  import InputNumber from 'primevue/inputnumber';
  import {FilterMatchMode,FilterOperator} from 'primevue/api/';
  import FileUpload from 'primevue/fileupload';
  import InputText  from 'primevue/inputtext';
  import RadioButton from 'primevue/radiobutton';
  import Column from 'primevue/column';
  import DataTable from 'primevue/datatable';
  import Textarea from 'primevue/textarea';
  import Dropdown from 'primevue/dropdown';
//   import MultiSelect from 'primevue/multiSelect';
    export default {
      name: "inqury",
      components:{
    top,side,Dialog,Button,InputNumber,FileUpload,InputText,Column,RadioButton,DataTable,Textarea,FilterMatchMode
,FilterOperator,Dropdown
},
    }
</script>
    
<style scoped>
.body{
    margin-top: 20px;
    margin-left: 240px;
    height: 85vh;
    width: 80%;
    background-color: rgb(29, 27, 24);
}
</style>