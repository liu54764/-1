import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/style.css'
import '@/filter/index.js'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/mira/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import Tooltip from 'primevue/tooltip';

import ToastService from 'primevue/toastservice';
 
import Chart from 'primevue/chart';

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router).use(ToastService).use(ElementPlus).use(PrimeVue, {ripple: true}).use(PrimeVue).mount('#app');
app.directive('tooltip', Tooltip);

