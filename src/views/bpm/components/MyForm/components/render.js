/**
 *Copyright: Copyright (c) 2020
 *Author:JakHuang
 *Version 1.0 
 *Title: form-generator/Element UI表单设计及代码生成器 
 *GitHub: https://github.com/JakHuang/form-generator
 */

 import { makeMap } from '../utils'
import {h as hh} from 'vue'
 // 参考https://github.com/vuejs/vue/blob/v2.6.10/src/platforms/web/server/util.js
 const isAttr = makeMap(
   'accept,accept-charset,accesskey,action,align,alt,async,autocomplete,'
   + 'autofocus,autoplay,autosave,bgcolor,border,buffered,challenge,charset,'
   + 'checked,cite,class,code,codebase,color,cols,colspan,content,http-equiv,'
   + 'name,contenteditable,contextmenu,controls,coords,data,datetime,default,'
   + 'defer,dir,dirname,disabled,download,draggable,dropzone,enctype,method,for,'
   + 'form,formaction,headers,height,hidden,high,href,hreflang,http-equiv,'
   + 'icon,id,ismap,itemprop,keytype,kind,label,lang,language,list,loop,low,'
   + 'manifest,max,maxlength,media,method,GET,POST,min,multiple,email,file,'
   + 'muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,'
   + 'preload,radiogroup,readonly,rel,required,reversed,rows,rowspan,sandbox,'
   + 'scope,scoped,seamless,selected,shape,size,type,text,password,sizes,span,'
   + 'spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,'
   + 'target,title,type,usemap,value,width,wrap'
 )
 
 function vModel ( self, dataObject, defaultValue ) {
   dataObject.props.value = defaultValue
   dataObject.on.input = val => {
     self.$emit( 'input', val )
   }
 }
 
 const componentChild = {
   
 }
 
 export default {
   render (   ) {
     const dataObject = {
       attrs: {},
       props: {},
       on: {},
       style: {}
     }
     const confClone = JSON.parse( JSON.stringify( this.conf ) )
     const children = []
 
     const childObjs = componentChild[confClone.tag]
     if ( childObjs ) {
       Object.keys( childObjs ).forEach( key => {
         const childFunc = childObjs[key]
         if ( confClone[key] ) {
           children.push( childFunc( h, confClone, key ) )
         }
       } )
     }
 
     Object.keys( confClone ).forEach( key => {
       const val = confClone[key]
       if ( key === 'vModel' ) {
         vModel( this, dataObject, confClone.defaultValue )
       } else if ( dataObject[key] ) {
         dataObject[key] = val
       } else if ( !isAttr( key ) ) {
         dataObject.props[key] = val
       } else {
         dataObject.attrs[key] = val
       }
     } )
     return hh( this.conf.tag, dataObject, children )
   },
   props: ['conf']
 }