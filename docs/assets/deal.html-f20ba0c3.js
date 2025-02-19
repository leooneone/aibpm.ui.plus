import{_ as a,W as e,X as i,a1 as r}from"./framework-cb8f0348.js";const h={},d=r('<h3 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h3><p>人工节点主要用于填写/补全表单。人工节点和审批节点配置项非常类似，主要区别是审批节点有审批意见和审批结果，而人工节点只负责提交。</p><h3 id="路径" tabindex="-1"><a class="header-anchor" href="#路径" aria-hidden="true">#</a> 路径</h3><p>人工节点可以有多个入向连线，也可以有一条或多条出向连线。</p><h3 id="属性页" tabindex="-1"><a class="header-anchor" href="#属性页" aria-hidden="true">#</a> 属性页</h3><p>审批节点包含参与人配置页面和表单权限配置页面</p><h4 id="参与人配置" tabindex="-1"><a class="header-anchor" href="#参与人配置" aria-hidden="true">#</a> 参与人配置</h4><p>用于配置审核节点的参与人，本系统实现了多种参与人选择规则，包括</p><ol><li>指定人员</li><li>指定角色</li><li>发起人自己</li><li>表单内联系人：指表单内组织单元组组件所选择的人员</li><li>组织负责人: 指发起人所在组织的负责人，组织类型在数据字典中定义，如：组、部门、公司、区域、集团等等</li><li>上级主管： 发起人所在的指定类型的组织单元内的主管逐级审批或者直接上级（1人） 进行审批</li><li>发起人自选：发起人在提交的时候弹出选择对话框选择射来审核，系统支持设定选择范围。</li></ol><div class="hint-container info"><p class="hint-container-title">Info</p><p>部分选项多人情况可以选择串签、并签和或签</p></div><h4 id="表单权限配置" tabindex="-1"><a class="header-anchor" href="#表单权限配置" aria-hidden="true">#</a> 表单权限配置</h4><p>配置表单数据权限</p>',12),n=[d];function t(l,c){return e(),i("div",null,n)}const o=a(h,[["render",t],["__file","deal.html.vue"]]);export{o as default};
