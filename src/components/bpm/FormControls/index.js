import Amount from './Amount/index.vue'
import Calculation from './Calculation/index.vue'
import TimeDuration from './TimeDuration/index.vue'
import DateDuration from './DateDuration/index.vue'
import OrgTransfer from './OrgTransfer/index.vue'
//import OrgSelect from './OrgSelect/index.vue'
import MobileOrgSelect from './MobileOrgSelect/index.vue'
import InputTable from './InputTable/index.vue'
import TagInput from './TagInput/index.vue' 
import OUSelect from './OUSelect/index.vue'



//import Tinymce from './Tinymce'
const components = [
  Amount,
  Calculation,
  TimeDuration,
  DateDuration,
  OrgTransfer,
 /// OrgSelect,
  MobileOrgSelect,
  OUSelect,
  InputTable,
  TagInput,
 

  //Tinymce 已经注册 不需要这里再加载
]

const install = function ( Vue ) {
  components.map( component => {
    window.console.log('注册：'+component.name)
    Vue.component( component.name, component )
  } )
}

export default {
  install
}