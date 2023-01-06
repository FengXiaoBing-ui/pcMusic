<template>
  <div class="text-white">
    <h1 class="text-xl">推荐</h1>

    <modTitle class="margin-tb-sm" title="你好 謨 今日为你推荐" />
    <div class="grid recommend w100" :class="col">
      <div class="padding-tb-xs padding-right-sm" v-for="(item,index) in recommend.slice(0,col==='col-5'?10:12)" :key="item.content_id">
        <hoverBox isPlayIcon mode="top">
          <img class="img" @error="imgError(index)" :src="item.cover" alt="" />
        </hoverBox>
        <p class="margin-top-xs text-cut2">{{ item.title }}</p>
      </div>
    </div>

    <modTitle class="margin-tb" title="官方推荐歌单" />
    <div class="grid recommend w100" :class="col">
      <div class="padding-tb-xs padding-right-sm" v-for="item in officialRecommend.slice(0,col==='col-5'?10:12)" :key="item.content_id">
        <hoverBox isPlayIcon mode="top">
          <img class="img" :src="item.cover_url_big" alt="" />
        </hoverBox>
        <p class="margin-top-xs text-cut2">{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "musicRecommend",
  data() {
    return {
      recommend: [],
      officialRecommend:[],
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
    async getData() {
      let res = await this.$request.getRecommend();
      this.recommend = res.data.list
      let res2 = await this.$request.getRecommendPlaylist();
      this.officialRecommend = res2.data.list
      // let res2 = await this.$request.getUserDetail();
      // let res3 = await this.$request.getUserSonglist();
      // let res4 = await this.$request.getUserCollectSonglist();
      // let res5 = await this.$request.getUserCollectAlbum();
    },
    imgError(index){
      this.recommend[index].cover = 'https://img1.baidu.com/it/u=2105206925,2773939527&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=501'
    },
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