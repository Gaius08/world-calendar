import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/dist/vuetify.css'
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

//setting vutify 3
const vuetify = createVuetify({
    components,
    directives,
    icons : {
        iconfont: 'fa' || 'md' || 'mdiSvg',
    }
  })

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify);
app.use(VCalendar, {})
app.mount('#app')
