<template>
  <div id="appChild" style="display: flex;">
    <div class="btn" @click="min">最小</div>
    <div class="btn" @click="def">中间</div>
    <div class="btn" @click="max">最大</div>
    <div class="btn" @click="close">关闭</div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: "systemTitle",
  methods: {
    min() {
      ipcRenderer.send('min-app')
    },
    max() {
      ipcRenderer.send('max-app')
    },
    def(){
      ipcRenderer.send('show')
    },
    close() {
      ipcRenderer.send('window-close')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#appChild {
  background-color: rgb(198, 47, 47);
  -webkit-app-region: drag;
  width: 100%;
  padding: 14px;
}
.btn{
  -webkit-app-region: no-drag;
}
</style>
