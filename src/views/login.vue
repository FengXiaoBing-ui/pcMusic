<template>
  <div
    class="w100 drag loginBallBox flex align-center justify-between"
    style="height: 100vh;"
  >
    <video
      class="video"
      loop
      :autoplay="true"
      muted
      src="https://vdn3.vzuu.com/SD/1731734e-dd8a-11eb-88fa-c61b84202143.mp4?disable_local_cache=1&bu=078babd7&c=avc.0.0&f=mp4&expiration=1673492727&auth_key=1673492727-0-0-a5cb5325e5f481e29d45052ecb32c728&v=tx&pu=078babd7"
    ></video>
    <div style="width: 50vw;height: 100vh;position: relative">
      <div class="close">
        <i
          @click="close"
          style="font-size: 20px"
          class="no-drag padding-xs icon iconfont icon-close"
        ></i>
      </div>
      <div class="loginBox flex flex-direction align-center">
        <img
          class="logo"
          src="https://p2.music.126.net/xzT367CVsZuyIwp6fvaTxA==/109951168146153029.jpg?param=180y180"
          alt=""
        />
        <div class="no-drag margin-top-sm flex flex-direction align-center">
          <div class="inputBox">
            <input class="phoneInput" v-model="phone" type="number" />
            <div v-show="phone===''" class="inputTips flex align-center">
              <i class="text-white margin-right-xs icon iconfont icon-link"></i>
              <span class="text-white">请输入手机号</span>
            </div>
          </div>
          <div class="inputBox margin-top">
            <input class="passwordInput" v-model="password" type="password" />
            <div v-show="password===''" class="inputTips flex align-center">
              <i class="text-white margin-right-xs icon iconfont icon-link"></i>
              <span class="text-white">请输入密码</span>
            </div>
          </div>

          <div @click="login" class="loginBtn margin-top-xl flex align-center justify-center text-white">login</div>
          <div class="w100 margin-top flex justify-between">
            <span class="text-white">忘记密码？</span>
            <span class="text-white">去注册</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ipcRenderer, remote} from "electron";
export default {
  name: "myLogin",
  data(){
    return{
      jiaodu: 0,
      phone:"",
      password:"",
      email:""
    }
  },
  created(){
    let count = 10
    setInterval(() => {
      if (count>=360) {
        count = 0
      }
      this.jiaodu = count+"deg"
      count+=10
    }, 100);
  },
  methods: {
    close() {
      ipcRenderer.send("close-suspension");
    },
    async login(){
      if (this.phone===""){
        remote.dialog.showErrorBox("登录失败","请输入手机号")
        return
      }
      let res = await this.$NeteaseCloudrequest.phoneLogin({phone:this.phone,password:this.password})
      if (res.code==200){
        const cookie = { url: 'http://localhost', name: 'MUSIC_U', value: res.token }
        ipcRenderer.send('cookie',cookie)
        ipcRenderer.send("close-suspension");
      }else {
        remote.dialog.showErrorBox("登录失败",res.msg)
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.loginBallBox {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background-image: linear-gradient(90deg,rgba(23,28,62,1),rgba(23,28,62,1),rgba(23,28,62,1),rgba(23,28,62,0.1));
  .video {
    width: 50vw;
    height: 100vh;
    position: absolute;
    transform: scale(1.2,1.2);
    left: 0;
    top: 0;
  }
  .brcodeImg {
    cursor: pointer;
    border: 1px gray solid;
    width: 40px;
    height: 40px;
    clip-path: polygon(0 0, 100% 0, 100% 0px, 0 100%);
    background-color: rgba(0, 0, 0, 0.5);
    margin: 4px 0 0 4px;
  }
  .close{
    position: absolute;
    right: -50vw;
    top: 10px;
    color: white;
  }
  .loginBox{
    position: absolute;
    right: -50%;
    transform: translateX(50%);
    top: 80px;
  }
  .loginBtn{
    cursor: pointer;
    width: 200px;
    height: 30px;
    background-image: linear-gradient(v-bind(jiaodu), rgb(25, 153, 232), rgb(146, 9, 130),rgb(146, 9, 9));
    border-radius: 10px;
  }
  .logo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  input {
    outline: none;
    border: none;
    overflow: auto;
  }
  .inputBox{
    width: 200px;
    position: relative;
    border-bottom: 1px solid rgb(255, 255, 255);
    .inputTips{
      position: absolute;
      left: 0;
      top: 10px;
      transition: all 0.3s;
      i,span{
        transition: all 0.3s;
      }
    }
    .phoneInput,.passwordInput{
      position: relative;
      z-index: 1;
      color: white;
      padding: 10px 0;
      background-color: rgba(255,255,255,0);
      &:focus+.inputTips{
        top: -1px;
        transform: scale(0.8) translate(-16px,-15px);
        i,span{
          color: #dbdbdb;
        }
      }
    }
  }
}
</style>