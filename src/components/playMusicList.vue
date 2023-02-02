<template>
  <div class="flex flex-direction">
    <div class="flex align-center">
      <div class="w10 text-center">操作</div>
      <div class="flex-treble padding">标题</div>
      <div class="flex-sub padding">歌手</div>
      <div class="flex-twice padding">专辑</div>
      <div class="padding">时间</div>
    </div>
    <div class="flex align-center hover-lightBlue" @dblclick="playMusic(item)" v-for="(item,index) in dataList" :key="item.id">
      <div class="w10 text-center">
        <span>{{ index<9?('0'+(index+1)):index+1 }}</span>
        <i class="icon iconfont icon-like1 margin-lr-xs"></i>
        <i class="icon iconfont icon-download"></i>
      </div>
      <div class="flex-treble padding text-cut">{{ item.name }}</div>
      <div class="flex-sub padding text-cut">
        <span v-for="(child,childIndex) in item.artists||item.ar" :key="child.id">{{ child.name+((childIndex+1)===(item.artists?.length||item.ar?.length)?'':' / ') }}</span>
      </div>
      <div class="flex-twice padding text-cut">{{ item.album?.name||item.al?.name }}</div>
      <div class="padding">{{ $utils.realFormatSecond((item.duration||item.dt)/1000) }}</div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: "playMusicList",
  props:{
    dataList:{
      type:Array,
      default:() => {
        return []
      }
    }
  },
  mounted() {
    setTimeout(() => {
      console.log(this.dataList)
    },1500)
  },
  methods:{
    ...mapMutations('musicInfo',['setMusicUrl','setIsAutoPlay','setMusicInfo']),
    async playMusic(item){
      let data = await this.$NeteaseCloudrequest.getSongDetail({ids:item.id})
      this.setMusicInfo({songName: item.name,singerName: item.artists[0].name,picUrl: data.songs[0].al.picUrl,singerId:item.id})
      let res = await this.$NeteaseCloudrequest.getSongUrl({id:item.id,level:"standard"})
      if (res.data[0].url){
        this.setMusicUrl(res.data[0].url)
        this.setIsAutoPlay(true)
      }else {
        alert('播放失败，没有音源')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>