import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
import auth from "@/utils/auth"
import http from "@/utils/http"

const app = createApp(App)

app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router)
app.config.globalProperties.$auth = auth
app.config.globalProperties.$http = http

app.config.globalProperties.$auth = auth

app.mount('#app')
