<template>
  <div v-html="modelValue" v-if="$attrs.disabled" style="width: 100%"></div>
  <textarea v-else :id="tinymceId" style="visibility: hidden; width: 100%" />
</template>

<script   lang="ts" >
import loadTinymce from '/@/utils/bpm/loadTinymce'
import { plugins, toolbar } from './config'
import { debounce } from 'throttle-debounce'

let num = 1
export default {
  props: {
    id: {
      type: String,
      default: () => {
        num === 10000 && (num = 1)
        return `tinymce${+new Date()}${num++}`
      },
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tinymceId: this.id,
    }
  },
  mounted() {
    if (this.$attrs.disabled) return
    var that = this
    loadTinymce((tinymce) => {
      // eslint-disable-next-line global-require
      import.meta.glob('./zh_CN.js')
      let conf = {
        selector: `#${this.tinymceId}`,
        language: 'zh_CN',
        menubar: 'file edit insert view format table',
        plugins,
        toolbar,
        height: 300,
        readonly: that.$attrs.disabled ? 1 : 0,
        branding: false,
        object_resizing: false,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true,
      }
      conf = Object.assign(conf, this.$attrs)
      conf.init_instance_callback = (editor) => {
        if (that.modelValue) editor.setContent(that.modelValue)
        that.vModel(editor)
      }
      tinymce.init(conf)
    })
  },
  unmounted() {
    this.destroyTinymce()
  },

  methods: {
    vModel(editor) {
      var that = this
      // 控制连续写入时setContent的触发频率
      const debounceSetContent = debounce(250, editor.setContent)
      this.$watch('modelValue', (val, prevVal) => {
        if (editor && val !== prevVal && val !== editor.getContent()) {
          if (typeof val !== 'string') val = val.toString()
          debounceSetContent.call(editor, val)
        }
      })

      editor.on('change keyup undo redo', () => {
        this.$emit('update:modelValue', editor.getContent())
      })
      ///增加黏贴自动上传文件功能
      editor.on('paste', function (e) {
        // 业务逻辑是单张图片的上传，所以取的1
        const file = e.clipboardData.files[0]

        // if (file) {
        //   const reader = new FileReader()

        //   reader.readAsDataURL(file)
        //   // 监听读取完成
        //   reader.onload = async function (e: any) {
        //     const src = e.target.result
        //     const blob = that.base64ToBlob(src)
        //     const data = new FormData()
        //     data.append('file', blob, 'why.png')
        //     // uploadImg 自定义的一个图片上传的方法
        //     const { url } = await uploadImg(data)
        //     editor.execCommand('mceInsertContent', false, `<img src="${url}" />`)
        //   }
        // }
      })
    },
    base64ToBlob(base64Buf) {
      const arr = base64Buf.split(',')
      const typeItem = arr[0]
      const mime = typeItem.match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: mime })
    },
    destroyTinymce() {
      if (!window.tinymce) return
      const tinymce = window.tinymce.get(this.tinymceId)
      if (tinymce) {
        tinymce.destroy()
      }
    },
  },
}
</script>
