/* eslint-disable no-useless-escape */
/* eslint-disable no-prototype-builtins */  
import {  UserApi } from '/@/api/admin/User'
import {  MyRoleApi as RoleApi } from '/@/api/bpm/MyRole'
import { listToTree } from '/@/utils/tree' 
import { cloneDeep } from 'lodash-es'

const toHump = name => name.replace( /\_(\w)/g, function ( all, letter ) {
  return letter.toUpperCase()
} )

export async function getRoles(params){
  var roleTreeData = [] 
  var  roleFormTreeData = []

  const res = await new RoleApi().getListByParentId(params)
  console.log('getRoles')

  return res.data
  if (res.data && res.data.length > 0) {
      roleTreeData = listToTree(cloneDeep(res.data))
     // roleFormTreeData = listToTree(cloneDeep(res.data).filter((a) => a.parentId === 0))
    // if ( roleTreeData[0].children?.length > 0) {
    //   nextTick(() => {
    //     roleTableRef.value!.setCurrentRow( roleTreeData[0].children[0])
    //   })
    // }
  }  
 
  return  roleTreeData //,roleFormTreeData}
}

// 需要自行设置nodeID  重要！！！
async function getRoleChildNode ( parentId ) {

  
  const res = await new RoleApi().getPage({
    currentPage: 1,
    pageSize: 20, id:parentId
  }).data?.iist
  //const promises = [GET_ROLE_TREE_REAL( {parentId  } )]
  // let res = []
  // // loadUser && promises.push( GET_USER_BY_OU( { deptId: orgId } ) )
  // try {
  //   res = await Promise.all( promises )
  // } catch ( error ) {/* this.$message.error('获取子节点数据出错')*/ }
  const nodes = res.reduce( ( p, c ) => {
    var roles=c.data.map(function(item){
      return   {
        "id": item.id,
        "name": item.name,
        "parentId": item.parentId,
        
        "type": 'role'
      }
    })
    return [...p, ...roles]
  }, [] )
  return nodes
}
// 需要自行设置nodeID  重要！！！
async function getOUChildNode ( parentId ) {
 
  
  const res = await new RoleApi().getPage({
    currentPage: 1,
    pageSize: 20, id:parentId
  }).data?.iist
  const nodes = res.reduce( ( p, c ) => {
    var orgs=c.data.map(function(item){
      return   {
        "id": item.id,
        "name": item.name,
        "parentId": item.parentId,
        
        "type": 'org'
      }
    })
    return [...p, ...orgs]
  }, [] )
  return nodes
}
// 需要返回一个promise
async function loadUnit ( node, unit = 'org' ) {
  let nodeData = []
  var parentId=0
  if(node.data!==undefined)
   parentId=node.data.id
  if(unit==='role')
  {  
    nodeData = await getRoleChildNode( parentId )  // 获取组织节点
   
     
  }else {
   
    nodeData = await getOUChildNode( parentId )  // 获取组织节点
    if ( unit==='user'  ) {
      window.console.log(node)
    // var users =( await new UserApi.getPage({
   
    //     id:parentId
      
    // }) ).data

    
  const res = await new UserApi().getPage({
    currentPage: 1,
    pageSize: 20, id:parentId
  })
  var users = res?.data
    users=users.map(function(item){
      return   {
        
          "id": item.id,
          "name": item.name,   
          "parentId": parentId,
          "type": 'user'
        
         
      }
    }) 
   nodeData= nodeData.concat(users)  // 获取组织下人员
     
  }
  } 

  return nodeData
}
// 获取组织结构根节点
// 需要自行设置nodeID  重要！！！
async function getRootDept () {
  let res = []
  try {
    res = ( await GET_OU_ROOT() ).data
  } catch ( err ) { }
  return res
}

function loadOUData ( node ) {
  return loadUnit( node,'org' ) // 返回的promise
}

function loadUserData ( node ) {
  return loadUnit( node, 'user' )  // 返回的promise
}
function loadRoleData ( node ) {
  return loadUnit( node, 'role' )  // 返回的promise
} 
 