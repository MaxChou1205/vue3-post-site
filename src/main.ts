import { createApp } from 'vue'
import App from './App.vue'

import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
dayjs.extend(isoWeek)

import 'virtual:windi-devtools'
import 'virtual:windi.css'
import './style.css'

createApp(App).mount('#app')
