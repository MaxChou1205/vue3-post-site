import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
dayjs.extend(isoWeek)

import 'virtual:windi-devtools'
import 'virtual:windi.css'
import './style.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')