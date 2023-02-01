<template>
  <div class="text-white">
    <h1 class="text-xl">推荐</h1>

    <modTitle class="margin-tb-sm" title="你好 謨 今日为你推荐" />
    <div class="grid recommend w100" :class="col">
      <div @click="gotoDetails(item.id)" class="padding-tb-xs padding-right-sm" v-for="(item,index) in recomPlaylist.slice(0,col==='col-5'?10:12)" :key="item.content_id">
        <hoverBox isPlayIcon mode="top">
          <img class="img" @error="imgError(index)" :src="item.picUrl" alt="" />
        </hoverBox>
        <p class="margin-top-xs text-cut2">{{ item.name }}</p>
      </div>
    </div>

    <modTitle class="margin-tb" title="最新热门MV推荐" />
    <div class="grid recommend col-4 w100">
      <div class="padding-tb-xs padding-right-sm" v-for="item in playlist" :key="item.tid">
        <hoverBox isPlayIcon mode="top">
          <img class="img" :src="item.picUrl" alt="" />
        </hoverBox>
        <p class="margin-top-xs text-cut2">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
  name: "musicRecommend",
  data() {
    return {
      recomPlaylist: [],
      playlist:[],
      col:"col-5",
      isImgError:false
    }
  },
  created() {
    this.getData();
  },
  mounted(){
    window.onresize = () => {
      if (document.body.clientWidth>=1300) {
        this.col = 'col-6'
      }else{
        this.col = 'col-5'
      }
    }
  },
  methods: {
    ...mapMutations('musicInfo',['setMusicList']),
    async getData() {
      let res = await this.$NeteaseCloudrequest.getPersonalized({limit:12});
      this.recomPlaylist = res.result
      let data = await this.$NeteaseCloudrequest.getPersonalizedMV({limit:12});
      this.playlist = data.result
    },
    imgError(index){
      this.recommend[index].cover = 'https://img1.baidu.com/it/u=2105206925,2773939527&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=501'
    },
    gotoDetails(id){
      this.$router.push('/home/songSheetDetails?id='+id)
    }
  },
};
</script>
<style lang="scss" scoped>
.img{
  display: inline-block;
  height: auto;
  max-width: 100%;
  border-radius: 10px;
}
</style>