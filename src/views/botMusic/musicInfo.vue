<template>
  <div class="musicInfo padding-lr-lg">
    <div @click="clickSlider" class="">
      <div ref="slider" class="sliderBot">
        <div class="sliderTop" :style="'width: '+progressX+'%'">
          <div class="sliderBtn" @mousedown="mousedown"></div>
        </div>
      </div>
    </div>
    <audio ref="audio" @ended="ended" @loadeddata="loadeddata" @timeupdate="update" @canplay="canplay"
           :currentTime="currentTime"
           :src="musicUrl"></audio>
    <div class="musicInfoBox grid col-3 padding-tb-xs padding-lr">
      <div class="flex align-stretch">
        <img @click="unfoldedDetails" class="musicImg" :src="musicInfo.picUrl" alt="">
        <div class="w100 flex flex-direction justify-between margin-left-sm">
          <div class="flex align-center text-white margin-right">
            <p class="text-sm text-cut">{{ musicInfo.songName }}-{{ musicInfo.singerName }}</p>
            <i class="icon iconfont icon-bofangMV margin-left-xs text-sm"></i>
          </div>
          <div class="flex align-center text-white">
            <i class="icon iconfont icon-like1 text-df margin-right-xs"></i>
            <i class="icon iconfont icon-download text-df margin-right-xs"></i>
            <i class="icon iconfont icon-more text-df margin-right-xs"></i>
            <i class="icon iconfont icon-comment text-df"></i>
          </div>
        </div>
      </div>
      <div class="flex justify-center align-center text-white">
        <i class="icon iconfont icon-loop text-lg margin-right-xs"></i>
        <i @click="backPlay" class="icon iconfont icon-back text-lg"></i>
        <i @click="play" class="icon iconfont text-xl margin-lr-xs" :class="musicInfo.playState?'icon-pausecircle-fill':'icon-play-filling'"></i>
        <i @click="nextPlay" class="icon iconfont icon-next text-lg"></i>
        <i class="icon iconfont icon-volume margin-left-xs"></i>
      </div>
      <div class="flex justify-end align-center">
        <p>{{ musicInfo.currentTime }}/{{ musicInfo.duration }}</p>
        <i @click.stop="showMusicList" class="icon margin-left-xs flex align-center">
          <i class="iconfont icon-menu"></i>
          <p class="margin-right">{{ recommendDaily.length }}</p>
        </i>
      </div>
    </div>
    <div @click.stop="" class="tabMusicList text-white" :class="isMusicList?'rightShow':'rightHide'">
      <div class="padding-sm">
        <p class="text-lg">播放列表</p>
        <div class="flex align-center justify-between text-gray margin-top-xs">
          <p>{{ recommendDaily.length }}首歌曲</p>
          <div class="flex align-center">
            <i class="icon iconfont icon-icon-piliangcaozuo"></i>
            <i class="margin-left-xs icon iconfont icon-delete"></i>
          </div>
        </div>
      </div>
      <div class="scroll-y">
        <div @dblclick.stop="playMusic(item,index)" class="padding-sm flex flex-direction listBox"
             v-for="(item,index) in recommendDaily" :key="item.id+index" :class="musicInfo.songName===item.name?'activeColor':''">
          <div>
            <p class="text-cut">{{ item.name }}</p>
            <span class="text-cut text-gray" v-for="(child,childIndex) in item.song?.artists||item.ar" :key="child.id">{{ child.name+((childIndex+1)===(item.song?.artists?.length||item.ar?.length)?'':' / ') }}</span>
          </div>
          <div class="flex align-center justify-end text-gray">
            <i @click.stop="playMusic(item,index)" class="icon iconfont icon-play margin-left-xs"></i>
            <i class="icon iconfont icon-like1 margin-left-xs"></i>
            <i class="icon iconfont icon-link margin-left-xs"></i>
            <i class="icon iconfont icon-more margin-left-xs"></i>
          </div>
        </div>
      </div>
      <div class="padding-sm flex justify-end">
        <i @click="setIsMusicList(false)" class="icon padding-xs flex align-center">
          <i class="iconfont icon-shouqi margin-right-xs"></i>
          <p>收起</p>
        </i>
      </div>
    </div>
    <musicDetails></musicDetails>
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex"
import musicDetails from "@/views/botMusic/components/musicDetails";
export default {
  name: "musicInfo",
  components:{
    musicDetails
  },
  data() {
    return {
      imgUrl: "https://qpic.y.qq.com/music_cover/1AjH2a7JmX5NmyoAoeF4nicXO1EFQcGnlVx4ickyiaUQPIp7apdQWdzoA/300?n=1",
      progressX: 0,
      domWidth: 0,
      touchesX: 0,
      currentTime: 0,
      duration: 0,
      playIndex:0
    }
  },
  computed: {
    ...mapState(['leftListWidth', 'musicInfoWidth', 'isMusicList','showMusicDetail','recommendDaily']),
    ...mapState('musicInfo',['musicList','musicUrl','isAutoPlay','musicInfo'])
  },
  created() {
    this.getData();
  },
  mounted() {
  },
  methods: {
    ...mapMutations(['setIsMusicList','setShowMusicDetail','setPlayList']),
    ...mapMutations('musicInfo',['setMusicUrl','setIsAutoPlay','setMusicInfo']),
    async getData() {
      let res = await this.$NeteaseCloudrequest.getNewSong();
      console.log(res.result)
      this.setPlayList(res.result)

      this.playIndex = Math.floor(Math.random()*(this.recommendDaily.length-1))
      this.getAudioObj(this.recommendDaily[this.playIndex].name,this.recommendDaily[this.playIndex].song?.artists||this.recommendDaily[this.playIndex].ar,this.recommendDaily[this.playIndex].id,this.recommendDaily[this.playIndex].picUrl||this.recommendDaily[this.playIndex].al?.picUrl,false)
    },
    //展开歌曲详情
    unfoldedDetails(){
      this.setShowMusicDetail('0')
    },
    showMusicList() {
      this.setIsMusicList(true)
    },
     playMusic(info,index) {
      this.playIndex = index
      this.getAudioObj(info.name,info.song?.artists||info.ar,info.id,info.picUrl||info.al?.picUrl)
    },
    async getAudioObj(songName, singerName, id, imgUrl, isPlay = true) {
      let name = ''
      singerName.forEach((item,index) => {
        name += (singerName.length===(index+1)?item.name:item.name+' / ')
      })
      this.setMusicInfo({songName:songName,singerName:name,singerId:id})
      if (!id) {
        console.log(id);
        alert('暂无歌曲信息')
        return
      }
      let data = await this.$NeteaseCloudrequest.getSongUrl({'id':id,'level':'standard'})
      this.setMusicUrl(data.data[0].url)
      this.setIsAutoPlay(isPlay)
      this.setMusicInfo({picUrl: imgUrl})
    },
    play() {
      this.setMusicInfo({playState:!this.musicInfo.playState})
      if (this.musicInfo.playState) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    backPlay(){
      this.playIndex--;
      if (this.playIndex<0){
        this.playIndex = this.recommendDaily.length-1
      }
      this.getAudioObj(this.recommendDaily[this.playIndex].name,this.recommendDaily[this.playIndex].song.artists[0].name,this.recommendDaily[this.playIndex].id,this.recommendDaily[this.playIndex].picUrl)
    },
    nextPlay(){
      this.playIndex++;
      if (this.playIndex>this.recommendDaily.length-1){
        this.playIndex = 0
      }
      this.getAudioObj(this.recommendDaily[this.playIndex].name,this.recommendDaily[this.playIndex].song.artists[0].name,this.recommendDaily[this.playIndex].id,this.recommendDaily[this.playIndex].picUrl)
    },
    clickSlider(e) {
      this.touchesX = e.pageX - this.leftListWidth;
      let move = parseInt(this.touchesX / ((this.musicInfoWidth) / 100))
      this.currentTime = parseInt((this.duration / 100) * move)
      // let move = this.currentTime / ((this.duration) / 100).toFixed(1);
      setTimeout(() => {
        this.$refs.audio.play()
        this.setMusicInfo({playState:true})
      },500)
    },
    mousedown() {
      removeEventListener('mouseup', this.mouseup, false)
      window.addEventListener('mouseup', this.mouseup, false)
      window.addEventListener('mousemove', this.mousemove, false)
    },
    mouseup() {
      removeEventListener('mousemove', this.mousemove, false)
    },
    mousemove(e) {
      this.touchesX = e.clientX - this.leftListWidth;
      let move = this.touchesX / ((this.musicInfoWidth) / 100).toFixed(1)
      if (move < 0 || move > 100) {
        return
      }
      this.currentTime = parseInt((this.duration / 100) * move)
    },
    //当目前的播放位置已更改时
    update(e) {
      let move = e.target.currentTime / ((e.target.duration) / 100).toFixed(1);
      if (move < 0 || move > 100) {
        return
      }
      this.setMusicInfo({currentTime:this.$utils.realFormatSecond(e.target.currentTime),lyricCurrentTime:e.target.currentTime})
      this.progressX = move;
    },
    //当浏览器可以播放音频时
    canplay(e) {
      this.duration = e.target.duration
      this.setMusicInfo({currentTime:this.$utils.realFormatSecond(e.target.currentTime),duration:this.$utils.realFormatSecond(e.target.duration),lyricCurrentTime:e.target.currentTime})
    },
    loadeddata(){
      if (this.isAutoPlay){
        this.$refs.audio.play()
        this.setMusicInfo({playState:true})
      }
      this.progressX = 0
    },
    ended(){
      this.nextPlay()
    },
  }
}
</script>

<style lang="scss" scoped>
.musicInfo {
  width: 88vw;
  height: 10vh;
  position: fixed;
  bottom: 0;
  right: 0;

  .tabMusicList {
    position: fixed;
    top: 0;
    width: 25vw;
    height: 100vh;
    transition: all 0.3s;
    @include background_color("rightMustList");
    box-shadow: -3px 1px 15px rgba(50, 50, 50, 0.7);

    .scroll-y {
      overflow-y: auto;
      height: 80vh;
      .activeColor{
        transition: all 0.2s;
        @include background_color("border_color1");
        border-radius: 0 10px 10px 0;
        p{
          @include font_color("rightMustList");
        }
      }
      .listBox {
        &:hover {
          transition: all 0.2s;
          @include background_color("border_color1");
          cursor: pointer;
          border-radius: 0 10px 10px 0;
        }
      }
    }
  }

  .rightHide {
    right: -26vw;
  }

  .rightShow {
    right: 0;
  }

  .musicInfoBox {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    .musicImg {
      width: 50px;
      height: 50px;
      border-radius: 10px;
      &:hover{
        cursor: pointer;
        opacity: 0.8;
      }
    }
  }

  .sliderBot {
    width: 100%;
    height: 4px;
    background: #F7F7FB;
    border-radius: 2px;
    position: relative;

    .sliderTop {
      height: 4px;
      background: linear-gradient(90deg, #FFD8D5 0%, #FF5C50 100%);
      border-radius: 2px;
      position: relative;

      .sliderBtn {
        position: absolute;
        right: -10px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        background: #FFFFFF;
        border-radius: 50%;
        border: 1px solid #E54D42;
        text-align: center;
        color: #E54D42;
      }
    }
  }
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