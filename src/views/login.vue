<template>
  <div
    class="w100 drag loginBallBox flex align-center"
    style="height: 100vh; background-color: white"
  >
    <video
      class="video"
      loop
      :autoplay="true"
      src="../assets/images/Redial.mp4"
    ></video>
    <div style="width: 50vw">
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
          <input class="phoneInput" type="number" placeholder="请输入账号" />
          <input class="passwordInput" type="password" placeholder="请输入密码" />
          <div class="loginBtn margin-top flex align-center justify-center text-white">login</div>
          <div class="w100 margin-top flex justify-between">
            <span>忘记密码？</span>
            <span>去注册</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
export default {
  name: "myLogin",
  data(){
    return{
      jiaodu: 0
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
  },
};
</script>

<style lang="scss" scoped>
.loginBallBox {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  .video {
    width: 100%;
    position: absolute;
    left: -40%;
    top: 0;
    transform-origin: top left;
    transform: scale(1, 1.25);
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
    right: 10px;
    top: 10px;
  }
  .loginBox{
    position: absolute;
    right: 8%;
    top: 100px;
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
  }
  input {
    outline: none;
  }
  .phoneInput,.passwordInput{
    width: 200px;
    border: none;
    border-bottom: 1px solid rgb(132, 132, 132);
    padding: 10px 0;
  }
  .phoneInput {
    
  }
  .passwordInput {

  }
}
</style>