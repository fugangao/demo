import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/main.css";
import 'element-plus/theme-chalk/el-loading.css';
import 'element-plus/theme-chalk/el-message.css';
import * as echarts from 'echarts'
import router from "./router/index.ts";

const app = createApp(App);
app.config.globalProperties.$echarts = echarts

app.use(router);

app.mount("#app");
