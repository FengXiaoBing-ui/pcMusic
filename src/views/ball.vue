<template>
    <div class="ballBox flex justify-end">
        <div style="color:black" class="no-drag icon iconfont icon-close" @click="close"></div>
    </div>
</template>
  
<script>
import { ipcRenderer } from "electron";
export default {
    name: "ballBox",
    methods: {
        close(){
            ipcRenderer.send('close-suspension')
        }
    },
};
</script>
<style lang="scss" scoped>
.ballBox {
    overflow: hidden;
    width: 360px;
    height: 160px;
    border-radius: 10px;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    color: black;
    background: white;
    -webkit-app-region: drag;
}
</style>