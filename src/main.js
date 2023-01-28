import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import BootstrapVue3 from 'bootstrap-vue-3'
import { FontAwesomeIcon } from './plugins/font-awesome'
import 'virtual:svg-icons-register'
import svgIcon from '@/icons/SvgIcon.vue'

const app = createApp(App)

import './permission';

app.use(createPinia())
app.use(router)
app.use(BootstrapVue3);

app.component('SvgIcon', svgIcon)
app.component('fa', FontAwesomeIcon);

app.mount('#app')
