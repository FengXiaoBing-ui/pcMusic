<template>
  <div>
    <img class="position-center" v-if="!dataList" src="https://loading.io/mod/spinner/typing/index.svg" alt="">
    <template v-else>
      <div class="flex align-stretch">
        <img class="songSheetImg" :src="songSheetInfo?.coverImgUrl" alt="">
        <div class="flex flex-direction margin-left-xs">
          <h1 class="text-xl">{{ songSheetInfo?.name }}</h1>
          <div class="flex align-center margin-tb-xs">
            <img width="30" height="30" class="round" :src="songSheetInfo?.creator?.avatarUrl" alt="">
            <p class="margin-left-xs">{{ songSheetInfo?.creator?.nickname }}</p>
          </div>
          <div class="flex align-center margin-bottom">
            <div @click="playAll" class="playAllBtn cursor-pointer"><i class="icon iconfont icon-play"></i> 播放全部</div>
            <div class="collectionBtn margin-lr-sm cursor-pointer">收藏</div>
            <div class="more cursor-pointer round text-center">···</div>
          </div>
          <div class="flex align-end">
            <p :class="showDescription?'':'text-cut3'" class="w100">{{ songSheetInfo?.description }}</p>
            <p class="w10 text-right cursor-pointer" @click="showDescription = !showDescription">
              {{ showDescription ? '收起' : '详情' }}</p>
          </div>
        </div>
      </div>
      <playMusicList :dataList="dataList"></playMusicList>
    </template>
  </div>
</template>

<script>
import { mapMutations } from "vuex"
export default {
  name: "songSheetDetails",
  data() {
    return {
      songSheetInfo: {},
      showDescription: false,
      dataList: null
    }
  },
  created() {
    this.getSongSheetDetails()
  },
  methods: {
    ...mapMutations(['setPlayList']),
    async getSongSheetDetails() {
      let res = await this.$NeteaseCloudrequest.getSongSheetDetails({id: this.$route.query.id})
      let allTracks = await this.$NeteaseCloudrequest.getTrackAll({id: this.$route.query.id})
      console.log(allTracks)
      this.songSheetInfo = res.playlist
      this.dataList = allTracks.songs
    },
    playAll(){
      this.setPlayList(this.dataList)
    }
  }
}
</script>

<style lang="scss" scoped>
.songSheetImg {
  width: 200px;
  height: 200px;
  border-radius: 10px;
}

.playAllBtn, .collectionBtn {
  border-radius: 20px;
  padding: 5px 10px;
  min-width: 100px;
  text-align: center;
  color: white;
}

.playAllBtn {
  background-color: #02c61c;
}

.collectionBtn {
  background-color: #9c9c9c;
}

.more {
  min-width: 29px;
  padding: 5px;
  background-color: #0077aa;
}
</style>