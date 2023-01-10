<template>
  <div id="appChild" class="titleBar flex justify-between align-center">
    <div class="leftBox flex align-center">Music</div>
    <div class="midBox">
      <div class="searchBox">
        <i class="icon iconfont icon-search searchIcon"></i>
        <input
          @focus="focus"
          @blur="blur"
          @keydown.enter="search"
          v-model="keyWord"
          class="btn input"
          type="text"
          placeholder="搜索"
          placeholderClass="placeholder text-sm"
        />
        <div class="padding-tb-sm text-black" :class="searchResutBoxShow ? 'searchResutBoxShow' : 'searchResutBox'">
          <div class="padding-lr-sm" style="max-height: 300px;overflow-y: auto;">
            <div class="margin-tb-xs" v-for="item in searchHotList" :key="item.score">
              <div class="flex align-center">
                <p>{{ item.searchWord }}</p>
                <span class="text-gray margin-lr-xs">{{ item.score }}</span>
                <img height="18" v-if="item.iconUrl" :src="item.iconUrl" alt="">
              </div>
              <p v-if="item.content" class="text-gray">{{ item.content }}</p>
            </div>
            <p @click.stop="jumpSearchResult(item.name,item.artists[0].name)" class="text-cut" v-for="item in searchResultInfo.songs" :key="item.id">
              {{ item.name }}
              <span v-if="item.transNames" class="text-gray">({{ item.transNames[0] }}) - </span>
              <span v-for="child in item.artists" :key="child.id">{{ child.name }}</span>
            </p>
          </div>

        </div>
      </div>
    </div>
    <div class="rightBox flex align-center">
      <view @click="login" class="btn">
        <img v-if="userInfo.headpic" class="userImg" :src="userInfo.headpic" />
        <i
          v-else
          style="font-size: 26px"
          class="icon iconfont icon-user"
        ></i> </view
      ><!-- 用户头像 -->
      <view class="btn flex align-end">
        <p>{{ userInfo.nick }}</p>
        <i
          style="font-size: 10px; margin-left: 4px"
          class="icon iconfont icon-arrow-down-filling"
        ></i> </view
      ><!-- 登录 -->
      <view class="btn"><i class="icon iconfont icon-yooxi"></i></view
      ><!-- vip -->
      <view class="btn"><i class="icon iconfont icon-down1"></i></view
      ><!-- 下拉框 -->
      <view class="btn" @click="$router.push('/home/theme')"
        ><i class="icon iconfont icon-skin"></i></view
      ><!-- 皮肤 -->
      <view @click="mainMenu" class="btn">
        <mainMenu :key="mainMenuShow" :mainMenuShow="mainMenuShow" />
        <i class="icon iconfont icon-menu"></i> </view
      ><!-- 主菜单 -->
      <view class="border"></view>
      <div class="btn" @click="ball">
        <i style="font-size: 20px" class="icon iconfont icon-minimize"></i>
      </div>
      <div class="btn" @click="min">
        <i class="icon iconfont icon-2zuixiaohua-1"></i>
      </div>
      <div class="btn" @click="max">
        <i
          class="icon iconfont"
          :class="restore ? 'icon-restore' : 'icon-3zuidahua-1'"
        ></i>
      </div>
      <div class="btn" @click="close">
        <i class="icon iconfont icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
import mainMenu from "/src/views/topSystemTitle/components/mainMenu";
import { ipcRenderer } from "electron";
export default {
  name: "systemTitle",
  components: {
    mainMenu,
  },
  data() {
    return {
      restore: false,
      mainMenuShow: false,
      searchResutBoxShow: false,
      keyWord:"",
      isFocus:false,
      searchResultInfo:{
        albums:[],
        artists:[],
        playlists:[],
        songs:[],
      },
      searchHotList:[],
      userInfo: {
        nick: "未登录",
        headpic: "",
      },
    };
  },
  watch:{
    keyWord(){
      if (this.isFocus&&this.keyWord!=="") {
        this.searchKeyWord();
      }else{
        this.searchResutBoxShow = false;
      }
    }
  },
  created() {
    setTimeout(() => {
      this.getUserDetail();
    }, 3000);
  },
  mounted() {},
  methods: {
    async getUserDetail() {
      let res = await this.$request.getUserDetail();
      console.log(11, res);
      this.userInfo = res.data.creator;
      console.log(this.userInfo.nick);
    },
    jumpSearchResult(name,singer){
      this.searchResutBoxShow = false;
      this.keyWord = name+' '+singer
      this.$router.push(`/home/searchResult?key=${this.keyWord}`)
    },
    login() {
      window.open(
        "https://graph.qq.com/oauth2.0/authorize?client_id=101558818&response_type=token&scope=all&redirect_uri=http://www.jixueit.cn%2Fqq%2Fcallback",
        "oauth2Login_10021",
        "height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes"
      );
    },
    mainMenu() {
      this.mainMenuShow = !this.mainMenuShow;
    },
    min() {
      ipcRenderer.send("min-app")
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
    focus() {
      this.isFocus = true
       if (this.keyWord!=="") {
         this.searchKeyWord()
         console.log(this.$utils.debounce);
      }else {
         this.getSearchHot()
       }
     },
    blur() {
      this.isFocus = false
      setTimeout(() => {
        this.searchResutBoxShow = false;
      }, 200);
    },
    async getSearchHot(){
      let res = await this.$NeteaseCloudrequest.getSearchHot()
      console.log(res.data)
      this.searchHotList = res.data
      this.searchResutBoxShow = true;

    },
    async searchKeyWord(){
      let searchResutBoxShow = false;
      let res = await this.$NeteaseCloudrequest.getSearchSuggest({keywords:this.keyWord})
      let data = await this.$NeteaseCloudrequest.getSearchKey()
      this.searchResultInfo = {...res.result}
      console.log(this.searchResultInfo)
      for (const key in this.searchResultInfo) {
        if (this.searchResultInfo[key].length>0) {
          searchResutBoxShow = true;
        }
      }
      this.searchResutBoxShow = searchResutBoxShow;
    },
    async search(){

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
  @include font_color("systemTitlefont_color");
}
.titleBar {
  .leftBox {
    color: white;
    font-style: oblique;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  }

  .midBox {
    .searchBox {
      position: relative;

      .searchResutBox {
        position: absolute;
        left: 0;
        top: 40px;
        widows: 0;
        height: 0;
        transform-origin: left top;
        opacity: 0;
        transform: scale(0);
      }

      .searchResutBoxShow {
        position: absolute;
        -webkit-app-region: no-drag;
        transform-origin: left top;
        transition: all 0.3s;
        left: 0;
        transform: scale(1);
        opacity: 1;
        top: 40px;
        width: 200%;
        max-height: 320px;
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

  .rightBox {
    .userImg {
      border-radius: 50%;
      width: 30px;
      height: 30px;
    }
  }
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

.btn:hover > i,
.btn:hover > p {
  color: white;
}

.border {
  margin: 10px;
  width: 1px;
  height: 20px;
  border-right: 1px solid rgb(230, 230, 230);
}
::-webkit-scrollbar {
  width: 10px;
  background-color: transparent;
}

::-webkit-scrollbar-track {
  width: 10px !important;
  background-color: transparent;
  //border: 1px solid #f1f5fa;
}

::-webkit-scrollbar-thumb {
  width: 10px !important;
  background-color: rgba($color: #eeeeee, $alpha: 0.7);
  border-radius: 5px;
}
</style>
