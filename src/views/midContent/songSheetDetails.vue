<template>
  <div>
    <div class="flex">
      <img class="songSheetImg" :src="songSheetInfo.coverImgUrl" alt="">
      <div class="flex flex-direction margin-left-xs">
        <h1 class="text-xl">{{ songSheetInfo.name }}</h1>
        <div class="flex align-center margin-tb-xs">
          <img width="30" height="30" class="round" :src="songSheetInfo.creator?.avatarUrl" alt="">
          <p class="margin-left-xs">{{ songSheetInfo.creator?.nickname }}</p>
        </div>
        <p>{{ songSheetInfo.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "songSheetDetails",
  data(){
    return{
      songSheetInfo:{}
    }
  },
  created() {
    this.getSongSheetDetails()
  },
  methods:{
    async getSongSheetDetails(){
      let res = await this.$NeteaseCloudrequest.getSongSheetDetails({id:this.$route.query.id})
      console.log(res)
      this.songSheetInfo = res.playlist
    }
  }
}
</script>

<style lang="scss" scoped>
.songSheetImg{
  width: 200px;
  height: 200px;
  border-radius: 10px;
}
</style>