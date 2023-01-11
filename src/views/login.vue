<template>
<div class="w100 drag" style="height: 100vh">
  <div class="flex justify-between">
    <img class="brcodeImg no-drag" src="https://img.xjishu.com/img/zl/2018/6/30/1241359458913.gif" alt="">
    <i @click="close" style="font-size: 20px" class="no-drag padding-xs icon iconfont icon-close"></i>
  </div>
  <div class="loginBox flex flex-direction align-center">
    <img class="logo" src="https://p2.music.126.net/xzT367CVsZuyIwp6fvaTxA==/109951168146153029.jpg?param=180y180" alt="">
    <div class="no-drag flex flex-direction align-center">
      <input class="phoneInput" type="number">
      <input class="passwordInput" type="password">
    </div>

  </div>
</div>
</template>

<script>
import { ipcRenderer } from "electron";
export default {
  name: "myLogin",
  methods:{
    close(){
      ipcRenderer.send('close-suspension')
    }
  }
}
</script>

<style lang="scss" scoped>
.brcodeImg{
  cursor: pointer;
  border: 1px gray solid;
  width: 40px;
  height: 40px;
  clip-path: polygon(0 0, 100% 0, 100% 0px, 0 100%);
  background-color: rgba(0,0,0,0.5);
  margin: 4px 0 0 4px;
}
.logo{
  width: 100px;
  height: 100px;
}
input{
  outline: none;
}
.phoneInput{
  width: 200px;
}
.passwordInput{
  width: 200px;
}
</style>