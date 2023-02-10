<template>
  <div class="musicDetails">
    <i class="icon iconfont icon-down1 no-drag backIcon" @click="hide"></i>
    <img class="musicImg" :src="musicInfo.picUrl" alt="">
    <div ref="lyric" class="lyric flex flex-direction align-center">
      <p class="text-white" :class="lyricHandle(index)?'text-red':''" v-for="(item,index) in musicInfo.lyric" :key="item[0]">{{ item[1] }}</p>
    </div>
    <musicWave ref="musicWave" :url="musicUrl" :key="musicUrl"></musicWave>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
import musicWave from "@/components/musicWave";
export default {
  name: "musicDetails",
  components:{
    musicWave
  },
  data() {
    return {
    }
  },
  computed:{
    ...mapState(['showMusicDetail']),
    ...mapState('musicInfo',['musicInfo','musicUrl']),
    singerId() {
      return this.musicInfo.singerId
    },
    playState(){
      return this.musicInfo.playState
    }
  },
  watch:{
    singerId(newValue, oldValue) {
      this.getLyric()
    },
    playState(newValue, oldValue){
      if (newValue){
        this.$refs.musicWave.play()
      }else {
        this.$refs.musicWave.pause()
      }
    }
  },
  methods: {
    ...mapMutations(['setShowMusicDetail']),
    ...mapMutations('musicInfo',['setMusicInfo']),
    hide() {
      this.setShowMusicDetail('-100vh')
    },
    async getLyric(){
      let res = await this.$NeteaseCloudrequest.getLyric({id:this.musicInfo.singerId})
      let lrc = res.lrc.lyric
      let arr = lrc.split('[')
      let lyric = []
      arr.forEach(item => {
        lyric.push(item.split(']'))
      })
      this.setMusicInfo({lyric:lyric})
    },
    lyricHandle(index){
      let show = this.$utils?.time_to_sec(this.musicInfo?.lyric[index][0])<this.musicInfo?.lyricCurrentTime&&this.musicInfo?.lyricCurrentTime<this.$utils?.time_to_sec(this.musicInfo?.lyric[index+1][0])
      if (show && this.$refs.lyric){
        this.$refs.lyric.scrollTop = (19*(index+1))
      }
      return show
    }
  }
}
</script>

<style lang="scss" scoped>
.musicDetails {
  position: fixed;
  bottom: v-bind(showMusicDetail);
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: red;
  transition: all 0.3s;
  .backIcon{
    position: absolute;
    top: 30px;
    left: 30px;
    font-size: 30px;
    z-index: 9;
  }
  .musicImg{
    width: 100%;
    min-height: 100vh;
  }
  .lyric{
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translateX(-50%);
    width: 50%;
    height: 100px;
    padding: 100px 0;
    box-sizing:border-box;
    overflow-y: auto;
    z-index: 9;
    transition: all 0.5s;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
}

</style>