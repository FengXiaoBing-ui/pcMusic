<template>
  <div id="appChild" class="titleBar flex justify-between align-center">
    <div class="leftBox flex align-center">Music</div>
    <div class="midBox">
      <div class="searchBox">
        <i class="icon iconfont icon-search searchIcon"></i>
        <input @focus="focus" @blur="blur" class="btn input" type="text" placeholder="搜索" placeholderClass="placeholder text-sm">
        <div class="" :class="searchResutBoxShow?'searchResutBoxShow':'searchResutBox'">
          
        </div>
      </div>
    </div>
    <div class="rightBox flex align-center">
      <view class="btn"><i style="font-size: 26px" class="icon iconfont icon-user"></i></view><!-- 用户头像 -->
      <view class="btn flex align-end">
        <p class="text-sm">未登录</p>
        <i style="font-size: 10px; margin-left: 4px" class="icon iconfont icon-arrow-down-filling"></i>
      </view><!-- 登录 -->
      <view class="btn"><i class="icon iconfont icon-yooxi"></i></view><!-- vip -->
      <view class="btn"><i class="icon iconfont icon-down1"></i></view><!-- 下拉框 -->
      <view class="btn" @click="$router.push('/home/theme')"><i class="icon iconfont icon-skin"></i></view><!-- 皮肤 -->
      <view @click="mainMenu" class="btn">
        <mainMenu ::key="mainMenuShow" :mainMenuShow="mainMenuShow" /> <i class="icon iconfont icon-menu"></i>
      </view><!-- 主菜单 -->
      <view class="border"></view>
      <div class="btn" @click="ball">
        <i style="font-size: 20px" class="icon iconfont icon-minimize"></i>
      </div>
      <div class="btn" @click="min">
        <i class="icon iconfont icon-2zuixiaohua-1"></i>
      </div>
      <div class="btn" @click="max">
        <i class="icon iconfont" :class="restore ? 'icon-restore' : 'icon-3zuidahua-1'"></i>
      </div>
      <div class="btn" @click="close">
        <i class="icon iconfont icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
import mainMenu from "/src/views/topSystemTitle/components/mainMenu";
export default {
  name: "systemTitle",
  components: {
    mainMenu
  },
  data() {
    return {
      restore: false,
      mainMenuShow: false,
      searchResutBoxShow:false,
    };
  },
  methods: {
    mainMenu() {
      this.mainMenuShow = !this.mainMenuShow
    },
    min() {
      ipcRenderer.send("min-app");
    },
    max() {
      this.restore = !this.restore;
      if (this.restore) {
        ipcRenderer.send("max-app");
      } else {
        ipcRenderer.send("show");
      }
    },
    close() {
      ipcRenderer.send("window-close");
    },
    ball() {
      ipcRenderer.send("ball");
    },
    focus(){
      this.searchResutBoxShow = true
      console.log(this.$utils.debounce);
    },
    blur(){
      this.searchResutBoxShow = false
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#appChild {
  -webkit-app-region: drag;
  width: 100%;
  height: 8vh;
  padding: 0 10px;
  @include font_color("systemTitlefont_color")
}

.titleBar {
  .leftBox {
    color: white;
    font-style: oblique;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  }

  .midBox {
    .searchBox{
      position: relative;
      .searchResutBox{
        position: absolute;
        left: 0;
        top: 40px;
        widows: 0;
        height: 0;
        transform-origin: left top;
        opacity: 0;
        transform: scale(0);
      }
      .searchResutBoxShow{
        position: absolute;
        -webkit-app-region: no-drag;
        transform-origin: left top;
        transition: all 0.3s;
        left: 0;
        transform: scale(1);
        opacity: 1;
        top: 40px;
        width: 200%;
        height: 200px;
        background-color: white;
        box-shadow: 1px 1px 10px rgb(77, 77, 77);
        border-radius: 10px;
        z-index: 2;
      }
      .input {
        outline: none;
        border: none;
        background-color: rgb(214, 214, 214);
        padding: 8px 10px;
        padding-left: 30px;
        border-radius: 20px;
      }
  
      .placeholder {
        font-size: 10px;
      }
  
      .searchIcon {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: gray;
        z-index: 1;
      }
    }
    
  }

  .rightBox {}
}

.btn {
  padding: 0 10px;
  -webkit-app-region: no-drag;
  position: relative;
  cursor: pointer;

  i,
  p {
    transition: all 0.3s;
  }
}

.btn:hover>i,
.btn:hover>p {
  color: white;
}

.border {
  margin: 10px;
  width: 1px;
  height: 20px;
  border-right: 1px solid rgb(230, 230, 230);
}
</style>
