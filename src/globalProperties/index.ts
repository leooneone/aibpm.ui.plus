import modal from './modal'
import { getDict } from './dict.js' 

export default function installGlobalProperties(app: any) {
  // 模态框对象
  app.config.globalProperties.$modal = modal

   //数据字典
   app.config.globalProperties.$dict = getDict;          // 2，引入字典封装

}
