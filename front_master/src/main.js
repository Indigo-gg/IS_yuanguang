import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import './global.css'
import 'animate.css';
import router from './router/index'
import 'ant-design-vue/dist/antd.css';
import './permission'
import './plugins'
import * as antIcons from "@ant-design/icons-vue";
const app=createApp(App)
//全局注册图标
Object.keys(antIcons).forEach(key => {
    app.component(key, antIcons[key])
})
// 添加到全局
app.config.globalProperties.$antIcons = antIcons
app.use(router)
app.use(Antd).mount('#app');

