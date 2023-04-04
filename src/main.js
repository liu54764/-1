import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/style.css'
import '@/filter/index.js'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-indigo/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }
app.use(router).use(ToastService).use(ElementPlus).use(PrimeVue).use(PrimeVue,{ripple:true}).mount('#app'); // 设置为中文;
app.directive('tooltip', Tooltip);
app.use(PrimeVue, {
  locale: {
      accept: '接受',
      reject: '拒绝',
      matchAll:'全部匹配',
      matchAny:'匹配任何',  
  },
   ripple: true,
   inputStyle: "filled",
});

