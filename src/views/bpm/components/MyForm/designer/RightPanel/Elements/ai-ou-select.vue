<template>
        
            <el-form-item label="弹框名称" v-if="props.data.title !== undefined">
              <el-input v-model="props.data.title" placeholder="请输入弹框名称" />
            </el-form-item>

            <el-form-item label="可选数量" v-if="props.data.maxNum !== undefined">
                <el-input-number v-model="props.data.maxNum" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="按钮类型" >
              <el-select v-model="props.data.buttonType" size="small">
                <el-option label="Button" value="button" />
                <el-option label="Input" value="input" />
              </el-select>
            </el-form-item>
            <el-form-item label="类型" >
              <el-select v-model="props.data.tabs" size="small" multiple>
                <el-option label="组织(org)" value="org" />
                <el-option label="用户(user)" value="user" />
                <el-option label="角色(role)" value="role" />
              </el-select>
            </el-form-item>
         
         
    
</template>


<script lang="ts" setup> 


const props=defineProps(['data']     )

 

 
 
</script>