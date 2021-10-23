<template>
  <div class="wrapper">
    <in-call v-if="joinedRoom" :roomkit="roomkit" :hangup="hangupHandler" />
  </div>
</template>

<script>
import { Guest } from 'vce-sdk-web';
import inCall from './inCall.vue';

  export default {
    components: {
      inCall,
    },
    props: {
      hangup: {
        default() {
          return () => {}
        },
        type: Function,
      }
    },
    async mounted() {
      this.guest = Guest.getInstance()
      this.guest.init({
        appKey: 'mbf4ae496d1bf45e3e82a4bccc50',
        debug: true,
        roomkitDomain: 'https://meeting-api-test.netease.im',
        baseDomain: 'https://meeting-api-test.netease.im',
      });

      try {
        await this.guest.login({
          account: 'anonymous_account_145219534217814016_2_99',
          token: 'anonymous_account_145219534217814016_2_99',
        })
        const groups = await this.guest.queryGroupList()
        if (groups.categoryList.length) {
          await this.guest.call(groups.categoryList[0])
        }
      } catch (error) {
        throw error
      }

      // 接通成功事件，可以在此时进入房间
      this.guest.on('onInviteGuestJoinRoom', async (roomId) => {
        await this.guest.joinRoom(roomId)
        this.joinedRoom = true;
        this.roomkit = this.guest.getRoomKit()
      })

      // 客服转接事件
      this.guest.on('onTransfered', () => {

      })

      // 客户登录状态改变事件
      this.guest.on('onLoginStateChange', (loginState) => {

      })

      // 客户排队状态改变事件
      this.guest.on('onQueueStateChange', (params) => {

      })

      // 客户呼叫状态改变事件
      this.guest.on('onCallStateChange', (callState) => {

      })

    },
    data() {
      return {
        guest: null,
        joinedRoom: false,
        roomkit: null,
      }
    },
    async destroyed() {
      if (this.guest) {
        await this.guest.logout()
        this.guest.removeAllListeners()
        this.guest.destroy()
      }
    },
    methods: {
      async hangupHandler() {
        try {
          await this.guest.hangup()
          await this.guest.leaveRoom()
          this.hangup()
        } catch (error) {
          throw error
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.wrapper {
  width: 0;
  height: 0;
}
</style>
