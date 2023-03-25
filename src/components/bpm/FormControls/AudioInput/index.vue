<template>
  <audio  :src="state.recordedAudio" ref="playerRef" type="audio/mpeg" class="mx-auto" @timeupdate="updateTime">
    Your browser does not support the
    <code>audio</code> element.
  </audio>
  <el-button-group style="border: 1px solid #ccc; background-color: white; width: 100%; display: flex; justify-content: flex-start">
    <el-button style="width: 100%" text type="primary" @click="audioClick"
    
      > 
     
          <el-icon size="20px" style="cursor: pointer; font-size: 22px !important"  @click.stop="audioClick">
            <ele-VideoPause v-if="state.played" />
            <ele-VideoPlay v-else></ele-VideoPlay>
           
          </el-icon>

        
    </el-button> <el-button text> <span v-if="state.played" >{{ state.currentTime.toFixed(0) }}</span></el-button>
    <el-button text>
      {{ recordedTime() }}
      <el-icon style="cursor: pointer; color: var(--el-color-primary); font-size: 22px !important" size="20px" @click="onMicClick">
        <ele-VideoPause v-if="state.recording" /><ele-Microphone v-else></ele-Microphone> </el-icon
    ></el-button>
  </el-button-group>
 <!-- <el-input>
    <template #prefix
      ><el-icon style="cursor: pointer; color: var(--el-color-primary)" size="20px">
        <ele-VideoPause v-if="state.playing" />
        <ele-VideoPlay></ele-VideoPlay></el-icon
    ></template>
    <template #suffix>
      {{ recordedTime() }}
      <el-icon style="cursor: pointer; color: var(--el-color-primary)" size="20px" @click="onMicClick">
        <ele-VideoPause v-if="state.recording" /><ele-Microphone v-else></ele-Microphone>
      </el-icon>

      <el-icon style="cursor: pointer; color: var(--el-color-danger)" size="20px" @click="sendData"><ele-Promotion /></el-icon>
    </template>
  </el-input>-->
  <el-dialog v-model="state.showRecorder" width="350px">
    <div style="text-align: center" class="font-sans w-96 mx-auto rounded-lg shadow-lg border-solid border-2 p-8">
      <section v-if="!props.isReadOnly">
        <!-- <h2 class="font-bold text-2xl">Record Audio Message</h2>-->

        <div v-if="!props.isAllowMic">
          Mic is not allowed. If you are using chrome, you can type URL: chrome://flags/#unsafely-treat-insecure-origin-as-secure and add this website
          url into the list. You need restart the browser to apply it.
        </div>
        <div v-else>
          <el-button
            :style="{ 'border-color': 'var(--el---el-color-primary)', 'font-size': '30px', width: '80px', height: '80px' }"
            class="fa fa-stop"
            circle
            v-if="state.recording"
            name="stop"
            @click="toggleRecording"
          />
          <el-button
            :style="{ 'border-color': 'var(--el---el-color-primary)', 'font-size': '40px', width: '80px', height: '80px' }"
            circle
            v-else
            icon="ele-Microphone"
            name="mic"
            @click="toggleRecording"
          />
        </div>
        <div>{{ recordedTime() }}</div>
        <div class="text-sm font-bold">{{ state.successMessage }}</div>
        <div class="text-sm" v-if="showInstruction">{{ state.instructionMessage }}</div>
        <div class="text-sm text-red-400">{{ state.errorMessage }}</div>
      </section>
      <figure class="mt-8">
        <figcaption class="text-sm mt-2" v-if="props.showInstruction && !props.isReadOnly">Listen to your recording before submitting.</figcaption>
      </figure>
      <el-button v-if="!props.isReadOnly" @click="sendData" :color="state.buttonColor">上传</el-button>
    </div>
  </el-dialog>
</template>
  
  <script lang="ts" setup name="AudioInput">
import { reactive, watch, computed, onBeforeUnmount, ref } from 'vue'
import input from './lib/input'
import convertTimeMMSS from './lib/Utils'
import dayjs from 'dayjs'

import { FileApi } from '/@/api/admin/File'
import { SpeechApi } from '/@/api/edu/Speech'
const INSTRUCTION_MESSAGE = 'Click icon to start recording message.'
const INSTRUCTION_MESSAGE_STOP = 'Click icon again to stop recording.'
const ERROR_MESSAGE = 'Failed to use microphone. Please refresh and try again and permit the use of a microphone.'
const SUCCESS_MESSAGE = 'Successfully recorded message!'
const SUCCESS_MESSAGE_SUBMIT = 'Successfully submitted audio message! Thank you!'
const ERROR_SUBMITTING_MESSAGE = 'Error submitting audio message! Please try again later.'
const playerRef = ref()
const props = defineProps({
  //是否直接识别语音
  isTextRecon: { type: Boolean, default: true },
  isReadOnly: { type: Boolean, default: true },
  showInstruction: { type: Boolean, default: true },
  // in minutes
  time: { type: Number, default: 1 },
  bitRate: { type: Number, default: 128 },
  sampleRate: { type: Number, default: 44100 },
  backendEndpoint: { type: String },
  headers: { type: Object },
  buttonColor: { type: String, default: 'green' },

  // callback functions
  afterRecording: { type: Function },
  successfulUpload: { type: Function },
  failedUpload: { type: Function },
  customUpload: { type: Function, default: null },
})

const state = reactive({
  played: false,
  currentTime: 0,
  showRecorder: false,
  recording: false,
  playing: false,
  recordedAudio: null,
  recordedBlob: null,
  input: null,
  successMessage: null,
  errorMessage: null,
  instructionMessage: INSTRUCTION_MESSAGE,
})

const isAllowMic = () => {
  return navigator.mediaDevices
}

const recordedTime = () => {
  if (props.time && state.input?.duration >= props.time * 60) {
    toggleRecording()
  }
  return convertTimeMMSS(state.input?.duration)
}
const buttonClass = () => {
  return 'mx-auto h-14 w-14 fill-current text-black cursor-pointer rounded-50 border-2 m-4 p-2'
}

onBeforeUnmount(() => {
  if (state.recording) {
    stopinput()
  }
})

/**
 * 操作audio
 */
const audioClick = () => {
  let audio = playerRef.value //获取组件
  if (state.audioStatus && state.audioStatus == 'playing') {
    //当前组件正在播放 则暂停播放
    state.played = false //记录播放还是暂停的状态
    state.audioStatus = 'pause' //
    audio.pause()
  } else {
    //如果没有播放状态 则开始播放
    state.played = true
    state.audioStatus = 'playing'
    audio.play()
    audio.addEventListener('ended', function () {
      //监听播放播放结束后 重置播放状态为初始状态
      state.played = false
      state.audioStatus = 'pause'
      audio.pause()
    })
  }
}

const updateTime = () => {
  state.currentTime = playerRef?.value?.currentTime //获取audio当前播放时间
}
const onMicClick = () => {
  if (props.isTextRecon) toggleRecording()
  else state.showRecorder = true
}
const toggleRecording = async () => {
  state.recording = !state.recording
  if (state.recording) {
    initinput()
  } else {
    await stopRecording()
  }
}
const initinput = () => {
  state.input = new input({
    micFailed: micFailed,
    bitRate: props.bitRate,
    sampleRate: props.sampleRate,
  })
  state.input.start()
  state.successMessage = null
  state.errorMessage = null
  state.instructionMessage = INSTRUCTION_MESSAGE_STOP
}
const stopRecording = async () => {
  state.input.stop()
  const recordList = state.input.recordList()
  state.recordedAudio = recordList[0].url
  state.recordedBlob = recordList[0].blob
  if (props.isTextRecon) {
    //直接提交后台
    
    var res = await new SpeechApi().speechToText({ file: state.recordedBlob })
    console.log('res', res)
  }
  if (state.recordedAudio) {
    state.successMessage = SUCCESS_MESSAGE
    state.instructionMessage = null
  }
  if (props.afterRecording) {
    props.afterRecording()
  }
}
const sendData = async () => {
  if (!state.recordedBlob) {
    return
  }
  let result = null
  if (customUpload) {
    result = await customUpload(state.recordedBlob)
  } else {
    var fileName = dayjs().format('YYYYMMDDhhmmss') + '.wav'

    let file = new File([state.recordedBlob], fileName)

    result = await new FileApi().uploadFile({ file: file }, props.headers)
  }

  if (result) {
    state.errorMessage = null
    state.successMessage = SUCCESS_MESSAGE_SUBMIT
    if (successfulUpload) {
      successfulUpload()
    }
  } else {
    // error uploading
    state.successMessage = null
    state.errorMessage = ERROR_SUBMITTING_MESSAGE
    if (failedUpload) {
      failedUpload()
    }
  }
}
const micFailed = () => {
  state.recording = false
  state.instructionMessage = INSTRUCTION_MESSAGE
  state.errorMessage = ERROR_MESSAGE
}
watch(
  () => props.modelValue,
  (value) => {
    // const userInput =  state.userInput
    // const newValue =  value
    // if (!isNumber(userInput) && (!userInput || userInput !== newValue)) {
    //   data.currentValue = newValue
    //   data.userInput = null
    // }
  },
  { immediate: true }
)
</script>
  