// install.js 

    
import * as svg from '@element-plus/icons-vue' 
 
//import AiForm from 'ai-form'
//import 'ai-form/lib/style.css'
 
 //import AiWorkflowDesigner from './AiWorkflowDesigner/index.vue'
/**
 * 导出全局注册 element plus svg 图标
 * @param app vue 实例
 * @description 使用：https://element-plus.gitee.io/zh-CN/component/icon.html
 */
  function elSvg(app) {
    const icons = svg 
    for (const i in icons) {
      app.component(`${icons[i].name}`, icons[i])
    }
  
  }
  
  const myComs = import.meta.globEager('./Ai*/index.vue') 

 // const myComs = import.meta.globEager('./packages/ai-form/components/Ai*/index.vue') 
const AiWorkflow = {
    install(app) {
 
      
    //app.use(AiForm)
            
    for (const path in myComs) {

      let cname = myComs[path].default.name

      console.log('install',cname)
     app.component(cname, myComs[path].default)
    }
 
 
        // for (const path in myComs) {

        //     let cname = myComs[path].default.name

        //     console.log('install com',cname)
        //    app.component(cname, myComs[path].default)
        //   }

        // myComs.forEach((item) => {
        //     console.log('install',item.name)
        //     App.component(item.name, item)
        //     //App.component(item.name, MyButton);
        // });
    },
};
 
export default AiWorkflow;

 