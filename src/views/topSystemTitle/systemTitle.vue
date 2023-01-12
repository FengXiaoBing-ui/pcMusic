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
            class="input no-drag"
            type="text"
            placeholder="搜索"
            placeholderClass="placeholder text-sm"
        />
        <div
            class="padding-tb-sm text-black"
            :class="searchResutBoxShow ? 'searchResutBoxShow' : 'searchResutBox'"
        >
          <div style="max-height: 300px; overflow-y: auto;overflow-x: hidden">
            <h3 v-show="searchResultInfo.songs.length < 1" class="margin-left-xs margin-bottom-xs text-df text-red">
              热搜榜</h3>
            <div
                v-show="searchResultInfo.songs.length < 1"
                class="padding-lr-xs searchHotList flex align-center"
                v-for="(item,rankIndex) in searchHotList"
                :key="item.score"
                @click.stop="jumpSearchResult(item.searchWord)"
            >
              <div class="margin-right" :class="rankIndex<3?'text-red':'text-grey'">{{ rankIndex + 1 }}</div>
              <div class="flex flex-direction justify-center">
                <div class="flex align-center">
                  <p>{{ item.searchWord }}</p>
                  <span class="margin-lr-xs text-grey">{{ item.score }}</span>
                  <img
                      height="18"
                      v-if="item.iconUrl"
                      :src="item.iconUrl"
                      alt=""
                  />
                </div>
                <p v-if="item.content" class="text-grey">{{ item.content }}</p>
              </div>
            </div>
            <div v-show="searchResultInfo.songs.length > 0" class="flex flex-direction w100">
              <div v-show="searchResultInfo.songs">
                <h3 class="padding-left-xs text-sm margin-tb-xs">单曲</h3>
                <div class="padding-left-sm padding-tb-xs text-cut hover-grey" @click.stop="jumpSearchResult(item.name)"
                     v-for="item in searchResultInfo.songs" :key="item.id">
                  {{ item.name }}
                  <span v-if="item.transNames" class="text-gray"
                  >({{ item.transNames[0] }}) -
                  </span>
                  <span v-for="child in item.artists" :key="child.id"> {{
                      child.name + " "
                    }} </span>
                </div>
              </div>
              <div v-show="searchResultInfo.artists">
                <h3 class="padding-left-xs text-sm margin-tb-xs">歌手</h3>
                <div class="padding-left-sm padding-tb-xs text-cut hover-grey" @click.stop="jumpSearchResult(item.name)"
                     v-for="item in searchResultInfo.artists" :key="item.id">
                  {{ item.name }}
                </div>
              </div>
              <div v-show="searchResultInfo.albums">
                <h3 class="padding-left-xs text-sm margin-tb-xs">专辑</h3>
                <div class="padding-left-sm padding-tb-xs text-cut hover-grey" @click.stop="jumpSearchResult(item.name)"
                     v-for="item in searchResultInfo.albums" :key="item.id">
                  {{ item.name }}
                  <span v-for="child in item.artists" :key="child.id"> {{
                      child.name + " "
                    }} </span>
                </div>
              </div>
              <div v-show="searchResultInfo.playlists">
                <h3 class="padding-left-xs text-sm margin-tb-xs">歌单</h3>
                <div class="padding-left-sm padding-tb-xs text-cut hover-grey" @click.stop="jumpSearchResult(item.name)"
                     v-for="item in searchResultInfo.playlists" :key="item.id">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="rightBox flex align-center">
      <view @click="login" class="btn">
        <img v-if="getUserInfo" class="userImg" :src="getUserInfo?.avatarUrl"/>
        <i v-else style="font-size: 26px" class="icon iconfont icon-user"></i>
      </view>
      <!-- 用户头像 -->
      <view class="btn flex align-end">
        <p v-if="getUserInfo">{{ getUserInfo?.nickname }}</p>
        <p v-else>未登录</p>
        <!--        <i-->
        <!--          style="font-size: 10px; margin-left: 4px"-->
        <!--          class="icon iconfont icon-arrow-down-filling"-->
        <!--        ></i> -->
      </view
      ><!-- 登录 -->
      <view class="btn"><i class="icon iconfont icon-yooxi"></i></view
      ><!-- vip -->
      <view class="btn"><i class="icon iconfont icon-down1"></i></view
      ><!-- 下拉框 -->
      <view class="btn" @click="$router.push('/home/theme')"
      ><i class="icon iconfont icon-skin"></i></view
      ><!-- 皮肤 -->
      <view @click="mainMenu" class="btn">
        <mainMenu :key="mainMenuShow" :mainMenuShow="mainMenuShow"/>
        <i class="icon iconfont icon-menu"></i></view
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
import {mapState} from "vuex"
import {ipcRenderer} from "electron";

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
      keyWord: "",
      isFocus: false,
      searchResultInfo: {
        albums: [],
        artists: [],
        playlists: [],
        songs: [],
      },
      searchHotList: [],
      getUserInfo: {
        nick: "未登录",
        headpic: "",
      },
      debounce: ""
    };
  },
  watch: {
    keyWord() {
      if (this.isFocus && this.keyWord !== "") {
        this.debounce();
      } else {
        this.searchResultInfoInit();
      }
    },
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created() {
    this.debounce = this.$utils.debounce(this.searchKeyWord, 1000);
    setTimeout(() => {
      this.getUserDetail();
    }, 3000);
  },
  mounted() {
  },
  methods: {
    async getUserDetail() {
      this.getUserInfo = this.userInfo;
    },
    jumpSearchResult(name) {
      this.searchResutBoxShow = false;
      this.keyWord = name;
      this.$router.push(`/home/searchResult?key=${this.keyWord}`);
    },
    login() {
      if (this.getUserInfo) {
        alert("打开用户详情")
        return
      }
      ipcRenderer.send('login');
      // window.open(
      //   "https://graph.qq.com/oauth2.0/authorize?client_id=101558818&response_type=token&scope=all&redirect_uri=http://www.jixueit.cn%2Fqq%2Fcallback",
      //   "oauth2Login_10021",
      //   "height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes"
      // );
    },
    mainMenu() {
      this.mainMenuShow = !this.mainMenuShow;
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
    focus() {
      this.isFocus = true;
      if (this.keyWord !== "") {
        this.searchKeyWord();
        console.log(this.$utils.debounce);
      } else {
        this.getSearchHot();
      }
    },
    blur() {
      setTimeout(() => {
        this.isFocus = false;
        this.searchResultInfoInit();
        this.searchResutBoxShow = false;
      }, 300);
    },
    searchResultInfoInit() {
      this.searchResultInfo = {
        albums: [],
        artists: [],
        playlists: [],
        songs: [],
      };
    },
    async getSearchHot() {
      let res = await this.$NeteaseCloudrequest.getSearchHot();
      this.searchHotList = res.data;
      this.searchResutBoxShow = true;
    },
    async searchKeyWord() {
      let searchResutBoxShow = false;
      let res = await this.$NeteaseCloudrequest.getSearchSuggest({
        keywords: this.keyWord,
      });
      this.searchResultInfo = {...res.result};
      for (const key in this.searchResultInfo) {
        if (this.searchResultInfo[key].length > 0) {
          searchResutBoxShow = true;
        }
      }
      if (!this.isFocus) {
        searchResutBoxShow = false
      }
      this.searchResutBoxShow = searchResutBoxShow;
    },
    async search() {
    },
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
        width: 20vw;
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

      .searchHotList {
        cursor: pointer;
        min-height: 50px;
        transition: all 0.2s;

        &:hover {
          background-color: rgb(246, 246, 246);
        }
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
