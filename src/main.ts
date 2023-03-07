import { createApp } from 'vue'
import pinia from '/@/stores/index'
import App from './App.vue'
import router from './router'
import { directive } from '/@/directive/index'
import { i18n } from '/@/i18n/index'
import other from '/@/utils/other'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '/@/theme/index.scss'
import VueGridLayout from 'vue-grid-layout'
import globalProperties from '/@/globalProperties'
import Tinymce from '/@/components/bpm/FormControls/Tinymce/index.vue'
const app = createApp(App)



app.component('tinymce', Tinymce)

  

// 数据字典
//import dict from '/@/components/dict/index.js'
import FormControls from '/@/components/bpm/FormControls/index.js'
 

directive(app)
other.elSvg(app)

app.use(pinia).use(router).use(ElementPlus, { i18n: i18n.global.t }).use(i18n).use(VueGridLayout).use(globalProperties).use(FormControls).mount('#app')
