import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/style.css";
import "@/filter/index.js";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-light-indigo/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import Tooltip from "primevue/tooltip";
import ToastService from "primevue/toastservice";


const app = createApp(App);

app.use(router).use(ToastService).use(ElementPlus).mount("#app"); // 设置为中文;
app.directive("tooltip", Tooltip);
app.use(PrimeVue, {
  ripple: true,
  // inputStyle: "filled",
  locale: {
    startsWidth: "以……开始",
    contains: "包含",
    notContains: "不包含",
    endsWith: "以……结尾",
    equals: "等于",
    notEquals: "不等于",
    noFilter: "无过滤",
    lt: "小于",
    lte: "小于等于",
    gt: "大于",
    gte: "大于等于",
    dateIs: "日期为",
    dateIsNot: "日期不为",
    dateBefore: "日期早于",
    dateAfter: "日期晚于",
    clear: "清空",
    apply: "应用",
    matchAll: "全部匹配",
    matchAny: "任意匹配",
    addRule: "添加规则",
    removeRule: "删除规则",
    accept: "是",
    reject: "否",
    choose: "选择",
    upload: "上传",
    cancel: "取消",
    dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
    monthNames: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
    ],
    monthNamesShort: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
    ],
    today: "今天",
    weekHeader: "周",
    firstDayOfWeek: 0,
    dateFormat: "mm/dd/yy",
    weak: "弱",
    medium: "中",
    strong: "强",
    passwordPrompt: "输入密码",
    emptyFilterMessage: "没有找到符合条件的数据",
    emptyMessage: "暂无可用选项",
    empty: "空",
  },
});
