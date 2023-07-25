<template>


  <div :style="$attrs.fontSize ? `font-size: ${$attrs.fontSize};`: ''">
     <div v-if="$attrs.isHtml" v-html="$attrs.defaultValue"></div>
      <pre v-else :style="{'white-space':$attrs.preWrap ? 'pre-wrap' : 'pre', 'text-align': $attrs.textAlign ? $attrs.textAlign : 'left','line-height':$attrs.fontSize}">{{$attrs.defaultValue}}</pre>
    </div>

</template> 