import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './permission'
import router from './router'
// import store from './store/store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
createApp(App).use(router).use(Antd).mount('#app')
