<template>
  <div>
    <button @click="isRecording ? endRecorder() : startRecorder()">{{ isRecording ? '说话中……点击说话完毕' : '开始识别' }}</button>
  </div>
</template>

<script>
import Recorder from "../utils/recorder";

export default {
  mounted() {
    this.recorder = new Recorder({
      appKey: 'RTlRBe1tjkn449K9',
      appId: '1000206',
      appsecret: '7649Mn766Lhj3Eqv',
    });
  },

  data() {
    return {
        isRecording: false,
        recorder: null,
    };
  },
  methods: {
    startRecorder() {
        this.recorder.start().then(() => {
            console.log('开始识别，请说话')
            this.isRecording = true
        }).catch(err => {
            console.error('startRecorder fail: ', err)
        })
    },
    endRecorder() {
        this.recorder.stop().then(res => {
            console.log('识别成功', res)
            this.isRecording = false
        }).catch(err => {
            console.error('识别失败: ', err)
        })
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
