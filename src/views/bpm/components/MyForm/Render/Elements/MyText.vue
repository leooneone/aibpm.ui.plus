<template>


  <div :style="$attrs.fontSize ? `font-size: ${$attrs.fontSize};`: ''">
      <pre :style="{'white-space':$attrs.preWrap ? 'pre-wrap' : 'pre', 'text-align': $attrs.textAlign ? $attrs.textAlign : 'left','line-height':$attrs.fontSize}">{{$attrs.defaultValue}}</pre>
    </div>

</template> 