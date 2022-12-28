<template>
  <div class="leftList">
    <div class="flex flex-direction align-start">
      <div class="w100 padding">在线音乐</div>
      <router-link class="padding" to="/home/musicVideo">推荐</router-link>
      <router-link class="padding" to="/home/musicHome">音乐厅</router-link>
      <router-link class="padding" to="/home/musicVideo">MV</router-link>
      <router-link class="padding" to="/home/musicHome">电台</router-link>
    </div>
    <div class="flex flex-direction align-start">
      <div class="w100 padding">我的音乐</div>
      <router-link class="padding" to="/home/musicVideo">我喜欢</router-link>
      <router-link class="padding" to="/home/musicHome">本地和下载</router-link>
      <router-link class="padding" to="/home/musicVideo">最近播放</router-link>
      <router-link class="padding" to="/home/musicHome">试听列表</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "leftList",
  methods: {
    home() {

    },
    video() {

    }
  }
}
</script>

<style lang="scss" scoped>
.leftList {
  width: 12vw;
  height: 92vh;
  overflow-y: auto;
  padding: 20px 0;
  position: relative;
  z-index: 1;
  a{
    color: white;
  }
}
::-webkit-scrollbar{
  width: 6px;
  background-color: transparent;
}
::-webkit-scrollbar-track{
  background-color: transparent;
  border-right: 1px solid #f1f5fa;
  //border: 1px solid #f1f5fa;
}
::-webkit-scrollbar-thumb{
  width: 6px;
  background-color: #00000010;
}
</style>