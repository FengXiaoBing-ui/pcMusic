<template>
    <div class="ballBox">
        <div style="background:red">123</div>
        <button @click="close">关闭悬浮窗</button>
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
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    color: black;
}
</style>