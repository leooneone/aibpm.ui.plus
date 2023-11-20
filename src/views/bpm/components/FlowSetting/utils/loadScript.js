/**
 *Copyright: Copyright (c) 2020
 *Author:JakHuang
 *Version 1.0 
 *Title: form-generator/Element UI表单设计及代码生成器 
 *GitHub: https://github.com/JakHuang/form-generator
 */
function loadScript ( src, callback ) {
  const cb = callback || ( () => { } )
  const $script = document.createElement( 'script' )
  $script.src = src
  $script.id = src
  document.body.appendChild( $script )
   
 
}

export default loadScript
