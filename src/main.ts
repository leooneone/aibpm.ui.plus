import { createApp } from 'vue'
import pinia from '/@/stores/index'
import App from '/@/App.vue'
import router from '/@/router'
import { directive } from '/@/directive/index'
import { i18n } from '/@/i18n/index'
import other from '/@/utils/other'

import ElementPlus from 'element-plus'
import '/@/theme/index.scss'
import VueGridLayout from 'vue-grid-layout'
import globalProperties from '/@/globalProperties'
import AiForm from 'ai-form'
import 'ai-form/lib/style.css'
//import AiBPM from 'ai-bpm'
//import 'ai-bpm/lib/style.css'

import AiWorkflow from './views/bpm/components/FlowSetting/index.ts'
const app = createApp(App)

directive(app)
other.elSvg(app)

app.use(pinia).use(router).use(ElementPlus).use(i18n)
.use(VueGridLayout).use(globalProperties)
app.use(AiForm)
//app.use(AiBPM)
app.use(AiWorkflow)
app.mount('#app')
