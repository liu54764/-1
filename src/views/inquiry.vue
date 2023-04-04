<template>
    <top />
    <side />
    <div class="card">
        <DataTable ref="dt" v-model:filters="filters" :value="customers" paginator showGridlines :rows="8" dataKey="id"
            filterDisplay="menu" class="p-datatable-sm" scrollable scrollHeight="450px">
            <template #header>
                <div class="flex justify-content-start">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()"
                        class="p-button-sm" />

                    <Button label="导出" icon="pi pi-upload" class="p-button-help p-button-sm font-bold"
                        style="margin-left: 20px;" @click="exportCSV($event)" />

                    <span class="p-input-icon-left" style="margin-left: 850px;">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="关键字" class="p-inputtext-sm" />
                    </span>
                </div>
            </template>
            <Column field="code" header="学号" style="width:10% ;" class="text-center  text-indigo-600">
            </Column>
            <Column field="name" header="姓名" style="width:20% ;" class="text-center  text-indigo-600">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
                <template #filter="{ filterModel}">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                        class="p-column-filter p-inputtext-sm" placeholder="Search by name" />
                </template>
            </Column>
            <Column field="category" header="年龄" :sortable="true" style="width:10% ;"></Column>
            <Column field="category" header="性别"  style="width:5% ;"></Column>
            <Column field="price" header="平均绩点" :sortable="true" style="width:5% ;"></Column>
            <Column field="quantity" header="总学分" :sortable="true" style="width:5% ;">
                <template #body="{ data }">
                    <Button class="p-button-link" :label="data.quantity" @mouseover="toggle" style="width: 50px;" />
                </template>
            </Column>
            <Column field="activity" header="竞赛情况" :sortable="true" style="width:15% ;">
                <template #body="{ data }">
                    <Rating :modelValue="data.activity" readonly :cancel="false" @mouseover="toggle" class="p-rating" />
                </template>
            </Column>
            <Column field="activity" header="实习情况" :sortable="true" style="width:15% ;">
                <template #body="{ data }">
                    <Rating :modelValue="data.activity" readonly :cancel="false" @mouseover="toggle" />
                </template>
            </Column>
            <Column field="status" header="年级状态" style="width:15% ;">
                <template #body="{ data }">
                    <Tag :value="data.status" :severity="getSeverity(data.status)" />
                </template>
            </Column>


            <!-- <Column field="name" header="Name" style="min-width: 12rem">
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                        placeholder="Search by name" />
                </template>
            </Column>
            <Column header="Country" filterField="country" field="country" style="min-width: 12rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <img alt="flag" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                            :class="`flag flag-${data.country.code}`" style="width: 24px" />
                        <span>{{ data.country }}</span>
                    </div>
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                        placeholder="Search by country" />
                </template>
                <template #filterclear="{ filterCallback }">
                    <Button type="button" icon="pi pi-times" @click="filterCallback()" severity="secondary"></Button>
                </template>
                <template #filterapply="{ filterCallback }">
                    <Button type="button" icon="pi pi-check" @click="filterCallback()" severity="success"></Button>
                </template>
                <template #filterfooter>
                    <div class="px-3 pt-0 pb-3 text-center">Customized Buttons</div>
                </template>
            </Column>
            <Column header="Agent" filterField="representative" field="name" :showFilterMatchModes="false"
                :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <img :alt="data.representative.name"
                            :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`"
                            style="width: 32px" />
                        <span>{{ data.representative.name }}</span>
                    </div>
                </template>
                <template #filter="{ filterModel }">
                    <MultiSelect v-model="filterModel.value" :options="representatives" optionLabel="name" placeholder="Any"
                        class="p-column-filter">
                        <template #option="slotProps">
                            <div class="flex align-items-center gap-2">
                                <img :alt="slotProps.option.name"
                                    :src="`https://primefaces.org/cdn/primevue/images/avatar/${slotProps.option.image}`"
                                    style="width: 32px" />
                                <span>{{ slotProps.option.name }}</span>
                            </div>
                        </template>
                    </MultiSelect>
                </template>
            </Column>
            <Column header="Date" filterField="date" field="date" dataType="date" style="min-width: 10rem">
                <template #filter="{ filterModel }">
                    <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy"
                        mask="99/99/9999" />
                </template>
            </Column>
            <Column header="Balance" filterField="balance" dataType="numeric" field="name" style="min-width: 10rem">
                <template #filter="{ filterModel }">
                    <InputNumber v-model="filterModel.value" mode="currency" field="name" currency="USD" locale="en-US" />
                </template>
            </Column>
            <Column header="Status" field="status" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                <template #body="{ data }">
                    <Tag :value="data.status" :severity="getSeverity(data.status)" />
                </template>
                <template #filter="{ filterModel }">
                    <Dropdown v-model="filterModel.value" :options="statuses" placeholder="Select One"
                        class="p-column-filter" showClear>
                        <template #option="slotProps">
                            <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                        </template>
                    </Dropdown>
                </template>
            </Column>
            <Column field="activity" header="Activity" :showFilterMatchModes="false" style="min-width: 12rem">
            
                <template #filter="{ filterModel }">
                    <Slider v-model="filterModel.value" range class="m-3"></Slider>
                    <div class="flex align-items-center justify-content-between px-2">
                        <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
                        <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
                    </div>
                </template>
            </Column>
            <Column field="verified" header="Verified" dataType="boolean" bodyClass="text-center" style="min-width: 8rem">
                <template #body="{ data }">
                    <i class="pi"
                        :class="{ 'pi-check-circle text-green-500 ': data.verified, 'pi-times-circle text-red-500': !data.verified }"></i>
                </template>
                <template #filter="{ filterModel }">
                    <label for="verified-filter" class="font-bold"> Verified </label>
                    <TriStateCheckbox v-model="filterModel.value" inputId="verified-filter" />
                </template>
            </Column> -->
        </DataTable>
    </div>


    <OverlayPanel ref="op">
        <img src="https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg" alt="Bamboo Watch" />
    </OverlayPanel>
</template>
    

<script>
import Rating from 'primevue/rating';
import Tag from 'primevue/tag';
import Toolbar from 'primevue/toolbar';
import OverlayPanel from 'primevue/overlaypanel';
import top from '../components/top.vue'
import side from '../components/side.vue'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import { FilterMatchMode, FilterOperator } from 'primevue/api/';
import FileUpload from 'primevue/fileupload';
import InputText from 'primevue/inputtext';
import RadioButton from 'primevue/radiobutton';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
//   import MultiSelect from 'primevue/multiSelect';
export default {
    name: "inqury",
    components: {
        top, side, Dialog, Button, InputNumber, FileUpload, InputText, Column, RadioButton, DataTable, Textarea, FilterMatchMode
        , FilterOperator, Dropdown, OverlayPanel, Toolbar, Tag, Rating
    },
    data() {
        return {
            customers: [{
                id: 1000,
                name: 'James Butt',
                country: 'Algeria',
                company: 'Benton, John B Jr',
                date: '2015-09-13',
                status: 'unqualified',
                verified: true,
                activity: 1,
                representative: {
                    name: 'Ioni Bowcher',
                    image: 'ionibowcher.png'
                },
                balance: 70663
            },],
            filters: null,
            statuses: ['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'],
        };
    },
    created() {
        this.initFilters();
    },
    mounted() {
        // CustomerService.getCustomersMedium().then((data) => {
        //     this.customers = this.getCustomers(data);
        //     this.loading = false;
        // });
    },
    methods: {
        // formatDate(value) {
        //     return value.toLocaleDateString('en-US', {
        //         day: '2-digit',
        //         month: '2-digit',
        //         year: 'numeric'
        //     });
        // },
        // formatCurrency(value) {
        //     return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        // },
        clearFilter() {
            this.initFilters();
        },
        initFilters() {
            this.filters = {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                'country': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                representative: { value: null, matchMode: FilterMatchMode.IN },
                date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
                balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                activity: { value: [0, 100], matchMode: FilterMatchMode.BETWEEN },
                verified: { value: null, matchMode: FilterMatchMode.EQUALS }
            };
        },
        getCustomers(data) {
            return [...(data || [])].map((d) => {
                d.date = new Date(d.date);

                return d;
            });
        },
        getSeverity(status) {
            switch (status) {
                case 'unqualified':
                    return 'danger';

                case 'qualified':
                    return 'success';

                case 'new':
                    return 'info';

                case 'negotiation':
                    return 'warning';

                case 'renewal':
                    return null;
            }
        },
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
    }
}
</script>
    
<style scoped>
.body {
    margin-top: 20px;
    margin-left: 240px;
    height: 85vh;
    width: 80%;
    background-color: rgb(29, 27, 24);
}

.card {
    margin-top: 20px;
    margin-left: 240px;
    height: 85vh;
    width: 1280px;
}

.p-rating .p-rating-icon {
    color: #6f5b1e;
    /* 更改星星的颜色 */
}
</style>