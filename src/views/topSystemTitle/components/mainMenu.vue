<template>
    <div class="mainMenu" :class="mainMenuShow ? 'mainMenuShow' : ''">
        <div style="padding: 5px 0;" @click="clickFun(item.type)" class="flex align-center justify-center" v-for="(item,index) in funList" :key="index">{{ item.name }}
        </div>
    </div>
</template>
  
<script>
import { ipcRenderer } from 'electron'
export default {
    name: "mainMenu",
    props: {
        mainMenuShow: {
            type: Boolean,
            default: false
        }
    },
  data(){
      return{
        funList:[
          {
            name:"退出登录",
            icon:"icon-close",
            type:"logOut"
          }
        ]
      }
  },
    methods: {
      async clickFun(type){
        if (type==='logOut'){
          let state = await this.$NeteaseCloudrequest.logOut()
          if(state.code==200) ipcRenderer.send('logOut')
        }
      }
    },
};
</script>
  
<style lang="scss" scoped>
.mainMenu {
    position: absolute;
    top: 40px;
    left: -10px;
    width: 200px;
    border-radius: 10px;
    background-color: white;
    opacity: 0;
    transform: scale(1, 0);
    transform-origin: top;
    transition: all 0.1s;
    z-index: 2;

    &::before {
        content: '';
        display: block;
        position: absolute;
        top: -10px;
        left: 16px;
        width: 0px;
        height: 0px;
        border-bottom: 10px solid white;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
    }
}

.mainMenuShow {
    opacity: 1;
    transform: scale(1);
}
</style>
  