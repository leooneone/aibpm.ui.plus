<template>
    <div class="recorder">
      <el-button
        v-if="!recording"
        type="primary"
        icon="el-icon-microphone"
        @click="startRecord"
      >
        开始录音
      </el-button>
      <el-button
        v-else
        type="danger"
        icon="el-icon-close"
        @click="stopRecord"
      >
        停止录音
      </el-button>
      <audio v-if="audioUrl" :src="audioUrl" controls></audio>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  
  export default defineComponent({
    name: "Recorder",
    setup() {
      const recording = ref(false); // 是否正在录音
      const audioUrl = ref(""); // 录音文件的URL
      let mediaRecorder: MediaRecorder | null = null; // 媒体录制器对象
  
      // 开始录音
      const startRecord = async () => {
        try {
          // 获取用户媒体设备权限（浏览器兼容性问题）
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          // 创建媒体录制器对象，并绑定数据可用事件
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.addEventListener("dataavailable", handleDataAvailable);
          // 开始录制（传入时间片参数，控制ondataavailable事件频率）
          mediaRecorder.start(10);
          recording.value = true;
        } catch (error) {
          console.error(error);
          alert("无法获取麦克风权限，请检查设置");
        }
      };
  
      // 处理数据可用事件，将数据存入Blob对象，并生成URL
      const handleDataAvailable = (event: BlobEvent) => {
        if (event.data && event.data.size > 0) {
          const blob = new Blob([event.data], { type: "audio/mp3" });
          audioUrl.value = URL.createObjectURL(blob);
        }
      };
  
      // 停止录音
      const stopRecord = () => {
        if (mediaRecorder) {
          mediaRecorder.stop();
          recording.value = false;
        }
      };
  
      return { recording, audioUrl, startRecord, stopRecord };
    },
  });
  </script>
  
  <style scoped>
  .recorder {
    display: flex;
    align-items: center;
  }
  </style>