/* eslint-disable no-useless-escape */
/* eslint-disable no-prototype-builtins */
import { GET_OU_ROOT,  GET_OU_TREE,  GET_USER_BY_OU, GET_PAGE_EMPLOYEE } from '/@/api/bpm/mock.js'
import { getList as GET_OU_TREE_REAL} from '/@/api/organization/ou.js'
import { User as UserApi } from '/@/api/admin/User'
import { Role as RoleApi } from '/@/api/admin/Role'
import { Org as OrgApi } from '/@/api/admin/Org'
import { getList as GET_ROLE_TREE_REAL } from '/@/api/organization/role.js'


const toHump = name => name.replace( /\_(\w)/g, function ( all, letter ) {
  return letter.toUpperCase()
} )


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
  const promises = [GET_OU_TREE_REAL( { parentId } )]
  let res = []
  // loadUser && promises.push( GET_USER_BY_OU( { deptId: orgId } ) )
  try {
    res = await Promise.all( promises )
  } catch ( error ) {/* this.$message.error('获取子节点数据出错')*/ }
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
const defaultOption = {
  tabName: '组织',  // 选项卡名称
  tabKey: 'org', //选项卡键值 传入的selected要和键值保持一致 eg: {org: [], role: []}
  children: 'children', // 子节点标志
  // 生成每个节点的id 保证唯一
  nodeId: function ( data ) {
    return data.id//data.hasOwnProperty( 'userId' ) ? data.userId : data.deptId
  },
  // 生成节点的名称 可选值 string | function
  label: function ( data, node ) {
    return  data.name//data.hasOwnProperty( 'userId' ) ? data.userName : data.deptName
  },
  // 判断是否为叶子节点 可选值 string | function
  isLeaf: function ( data, node ) { 
    if(node.level===2&&data.type==='role')
    return true
    return !data.hasOwnProperty( 'parentId' ) // 含有empID为人员  且为叶子节点
  },
  // 搜索后的结果如果需要展示一些提示文字 例如搜索人员 提示人员所属组织  可以使用该属性
  // function
  searchResTip: function ( data ) {
    return '' +data.parentName===null?'-':data.parentName
  },
  // 判断该节点是否可选 例如同时选择组织和组织下的人
  disabled: function ( data, node ) {
    return false
  },
  // 动态请求后台拿到节点数据 返回一个promise
  onload: loadOUData,
  // 搜索节点方法 
  onsearch: async function ( searchString,tabKey, resolve, reject ) {
    // const param = { page: 1, limit: 200, searchName: searchString }
      if(tabKey==='org')
    {
      var datas =( await GET_OU_TREE_REAL({ key: searchString    }) ).data
      var role=datas.map(function(item){
        return   {
          
            "id": item.id,
            "name": item.name,
            "parentName": item.parentName,
            "type": 'org'
          
           
        }
      })
    
    resolve( role )
  }

    
   else  if(tabKey==='user')
    {
    // var datas =( await SEARCH_EMPLOYEE({pageSize: 10, currentPage: 1,
    //   dynamicFilter:{
    //     "field": "name",
    //     "operator": "Contains",
    //     "value":searchString
    //   }
    // }) ).data.list

    const res = await new UserApi().getPage({
      currentPage: 1,
      pageSize: 20,dynamicFilter:{
            "field": "name",
            "operator": "Contains",
            "value":searchString
          }
    })
    var datas = res?.data?.list
    var users=datas.map(function(item){
      return   {
        
          "id": item.id,
          "name": item.name,
          "parentName": '角色:'+item.roleNames+',所属组织:'+item.ouNames,
          "type":'user'
          //"deptId": item.organizationName
        
         
      }
    })
    
    resolve( users )
  }else if(tabKey==='role')
  {
    //var datas =( await GET_ROLE_TREE_REAL({ key: searchString    }) ).data

    
  const datas = await new RoleApi().getList({
    currentPage: 1,
    pageSize: 20, name: searchString   
  })
  const res=datas.data
    var role=res.map(function(item){
      return   {
        
          "id": item.id,
          "name": item.name,
          "parentName": item.parentName,
          "type": 'role'
        
         
      }
    })
  
  resolve( role )
}
  }
}

export const DEP_CONFIG = Object.assign( {}, defaultOption )
//export const ROLE_CONFIG = Object.assign( {}, defaultOption, { tabKey: 'role', tabName: '角色' } )
export const USER_CONFIG = Object.assign( {}, defaultOption, { tabKey: 'user', tabName: '指定人员', onload: loadUserData, disabled: ( data, node ) => data.type!==( 'user' ) } )
const DEP_USER_CONFIG = Object.assign( {}, defaultOption, { tabKey: 'org&user', tabName: '组织和人员', onload: loadUserData, disabled: () => false } )
export const ROLE_CONFIG = Object.assign( {}, defaultOption, { tabKey: 'role', tabName: '角色' , onload: loadRoleData, disabled: ( data, node ) =>{
  return node.level ===1
}   } )
export const CONFIG_LIST = [DEP_CONFIG, ROLE_CONFIG, USER_CONFIG, DEP_USER_CONFIG, ROLE_CONFIG]
