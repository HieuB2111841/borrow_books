import { createApp } from 'vue';
import App from './App.vue';
import Router from './router.js';
import './assets/style/global.css';

createApp(App).use(Router).mount('#app');
