import { ref, toRefs } from 'vue';
 
import { DictionaryApi as DictApi } from '/@/api/admin/Dictionary'
/**
 * 获取字典数据
 */
export function getDict(...args) {
    const res = ref({});
    return (() => {
        args.forEach((d, index) => {
            var key=d.replace('-','_')
            res.value[key] = [];
            var dicKey='dic_'+key
            res.value[dicKey] = {};
          new  DictApi().getList(
            {
            
              name: d
            
          }  )
          //. getDictList(d)
          .then(result => {
                res.value[key] = result.data.map(p => { 
                    res.value[dicKey][p.value]=p.name
                    return ({ label: p.name, value: p.value, elTagType: p.dictType })});
                 
            })
        })
        return toRefs(res.value);
    })()
}