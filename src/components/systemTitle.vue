<template>
  <div id="title" style="display:flex">
    <div @click="min">最小化</div>
    <div @click="max">最大化</div>
    <div @click="close">关闭</div>
  </div>
</template>

<script>
import { remote } from 'electron';
export default {
  name: "systemTitle",
  methods:{
    min(){
      console.log(remote);
      remote.getCurrentWindow().minimize();
    },
    max(){

    },
    close(){

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#title {
  width: 100vw;
  height: 52px;
  background-color: rgb(198, 47, 47);
  -webkit-app-region: drag;
}
</style>
