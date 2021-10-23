<template>
  <div class="video-wrapper">
    <div class="video-container" ref="videoContainer"></div>
    <div class="footer">
      <span class="hangup-button" @click="hangup">挂断</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      roomkit: {
        default () {
          return {}
        },
        type: Object
      },
      hangup: {
        default() {
          return () => {}
        },
        type: Function,
      }
    },
    async mounted() {
      // 获取房间内服务实例
      const inRoomService = this.roomkit.getInRoomService()

      // 监听用户加入
      inRoomService.on('onRoomUserJoin', (userList) => {
        console.log('用户进入了: ', userList)
      })

      // 监听远端推流事件
      inRoomService.on('onRoomUserStreamAdded', async (event) => {
        // 订阅该流
        const avRoomUid = event.stream.getId()
        await inRoomService.getInRoomVideoController().subscribeRemoteVideo(
          event.userId || '', // userId
          true, // 是否订阅
          avRoomUid // avRoomUid
        )
      })

      // 监听远端流订阅成功事件
      inRoomService.on('onRoomUserStreamSubscribed', (event) => {
        const avRoomUid = event.stream.getId()
        // 获取远端视频渲染的dom节点
        const remoteView = this.$refs.videoContainer
        // 播放远端音视频
        inRoomService
          .getInRoomVideoController()
          .attachRendererToUserVideoStream(remoteView, event.userId, avRoomUid)
      })

    },
    data() {
      return {

      }
    },
    destroyed() {

    },
  }
</script>

<style lang="scss" scoped>
.video-wrapper {
  width: 100vw;
  height: 100vh;

  .video-container {
    width: 80vw;
    height: 80vh;
    margin: 0 auto;
  }

  .footer {
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hangup-button {
    padding: 5px 12px;
    cursor: pointer;
    background-color: red;
    color: #fff;
  }
}
</style>
