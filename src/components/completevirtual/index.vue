<template>
  <div class="complete-page">
    <!-- <iframe ref="iframe" :src="virtualUrl" frameborder="0" width="100%" style="min-height: 80vh" scrolling="yes"></iframe> -->
    <!-- <div class="button-wrap">
      <img class="button-image" src="../../assets/images/record.png" alt="">
    </div> -->
    <!-- <div class="textarea">
      <label for="chat"></label>
      <textarea id="chat" name="story" rows="5" cols="33" v-model="chatDetail"></textarea>
    </div> -->
    <div class="chat-content-box" id="chatContentBox">
      <div v-for="(it, index) in chatList" :key="index">
        <div v-if="it.senderId != chatUserId">
          <p class="sender-name" v-text="it.senderName"></p>
          <div class="sender-box">
            <div>
              <img src="../../assets/images/people.png">
            </div>
            <p v-text="it.content"></p>
          </div>
        </div>

        <div v-if="it.senderId == chatUserId">
          <p class="sender-name-self" v-text="it.senderName"></p>
          <div class="sender-box-self">
            <div>
              <img src="../../assets/images/people.png">
            </div>
            <p v-text="it.content"></p>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-content" id="footerContent">
      <div class="voice-icon" id="voiceIconBox" style="display: block;">
        <img src="../../assets/images/mic.png">
      </div>
      <div class="input-content">
        <textarea name="msgContent" id="messageCon" cols="20" rows="2" v-model="chatDetail"></textarea>
        <button type="button" id="holdToSpeak" class="mui-btn mui-btn-outlined hold-to-speak" style="display: none;">按住说话</button>
      </div>
      <div class="more-menu" id="sendBtn" @click="handleSendMsg">
        <span>发送</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      id: null,
      type: 'complete',
      chatList: [],
      chatDetail: '你好你好',
      chatUserId: 1,
      chatUserName: "客服",
      chatList: [{
          senderName: "我",
          senderId:1,
          content: "你好啊"
        }, {
          senderName: "客服",
          senderId: 2,
          content: "你猜"
        }
      ],
      virtualUrl: 'https://kefu-h5.apps-qa.danlu.netease.com/',
      halfVirtualUrl: 'https://kefu-h5.apps-qa.danlu.netease.com/?fov=20&target={%22x%22:0,%22y%22:1.5,%22z%22:0}&camera={%22x%22:0,%22y%22:1.5,%22z%22:2.61}'
    }
  },
  created () {
    this.id = this.$route.query.id
  },
  mounted () {
    // this.$refs.iframe.contentWindow.postMessage({
    //   fn: "report",
    //   params: "你好你好你好"
    // })
    this.sendMsg()
  },
  methods: {
    handleSendMsg () {
      var obj = {
        senderId: 1,
        senderName: '我',
        content: this.chatDetail
      };
      this.chatList.push(obj);
    },
    sendMsg () {
      const data = {
        "game_id": "GA-900432536377765888",
        "agent_id": "AG-900432830293606400",
        "robot_id": "RT-900432830398464000",
        "user_id": "uesr_1",
        "uuid": "user_1-RT-1-1558682253263",
        "dialogue_type": 1,
        "utterance": "你好你好你好444",
        "timestamp": 1558682253263,
        "command": {},
        "utterance_type": 0,
        "response_type": 0
      }
      const url = 'https://agent-proxy-7462-80.apps-hp.danlu.netease.com:80/api/v1/dialogue'

      this.$post(url, data)
      .then((response) => {
        console.log(response)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.button-wrap {
  text-align: center;
  .button-image {
    width: 100px;
    margin: auto;
    position: relative;
    z-index: 1;
    top: 0;
  }
}
#chat {
  width: 100%;
}
.chat-content-box{
  width: 100%;
  padding-left: 5%;
  padding-right: 5%;
  overflow: scroll;
}

.footer-content{
  height: 50px;
  line-height: 50px;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: #e4e4e4;
  border-top: 1px solid #33CCCC;
}
.voice-icon{
  width: 40px;
  text-align: center;
  img {
    width: 100%;
    margin-top: 10px;
  }
}
.input-content{
  width: 100%;
}
.more-menu{
  width: 50px;
  text-align: center;
}
.input-content textarea{
  height: 40px;
  margin: 5px 0 0 0;
  width: 100%;
}
.hold-to-speak{
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
  width: 100%;
  background: white;
  margin-top: 5px;
  padding: 0;
}

.more-menu span{
  font-size: 14px;
  color: #0066FF;
}

.more-box{
  background: #e4e4e4;
  width: 100%;
  height: 120px;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  bottom: 0;
}

.item-box{
  width: 25%;
}
.item-icon-box{
  background: white;
  width: 50px;
  height: 50px;
  text-align: center;
  margin-left: calc(50% - 25px);
  margin-top: 10px;
  border-radius: 10px;
}
.item-box img{
  width: 30px;
  margin-top: 10px;
}
.item-box p{
  font-size: 14px;
  text-align: center;
  line-height: 40px;
}

.item-icon{
  height: 50px;
    width: 50px;
    border-radius: 10px;
    border: 0;
  padding: 0;
    margin: 0;
}

.mui-table-view:before{
  height: 0;
  top: 0;
}
.mui-table-view:after{
  height: 0;
}
.mui-active{
  background: #669999!important;
}

.microphone{
  width: 100px;
  height: 100px;
  background: black;
  opacity: 0.5;
  z-index: 999;
  position: absolute;
  top: 200px;
  left: calc(50% - 50px);
  border-radius: 10px;
  text-align: center;
}
.microphone img{
  width: 40px;
  margin-top: 10px;
}
.microphone p{
  font-size: 24px;
  color: white;
  margin-top: 10px;
}

/* 聊天内容界面 */
.sender-box{
  display: flex;
}
.sender-box-self{
  display: flex;
  flex-direction: row-reverse;
}

.sender-name{
  font-size: 13px;
  margin: 5px 0 0 5px;
  padding: 0;
}
.sender-name-self{
  font-size: 13px;
  margin: 5px 5px 0 0;
  padding: 0;
  text-align: right;
}
.sender-box div{
  width: 50px;
}
.sender-box img{
  width: 40px;
}

.sender-box p{
  max-width: calc(100% - 100px);
    line-height: 40px;
    font-size: 14px;
    background: gray;
    border-radius: 10px;
    color: white;
    height: 40px;
    padding: 0 10px 0 10px;
}

.sender-box-self div{
  width: 50px;
  text-align: right;
}
.sender-box-self img{
  width: 40px;
}
.sender-box-self p{
  max-width: calc(100% - 100px);
    line-height: 40px;
    font-size: 14px;
    background: gray;
    border-radius: 10px;
    color: white;
    height: 40px;
    padding: 0 10px 0 10px;
}
</style>
