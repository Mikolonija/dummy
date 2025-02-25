import { createApp } from 'vue';
import App from '@/view/App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import 'vue3-toastify/dist/index.css';
import '@/styles/fonts.scss';
import '@/styles/layouts.scss';
import '@/styles/loader.scss';
import '@/styles/reset.scss';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount('#app');
