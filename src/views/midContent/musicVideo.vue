<template>
  <div>
    <button class="padding-xs" @click="play">播放</button>
    <button class="padding-xs" @click="pause">暂停</button>
    <ul class="waveUl flex justify-between align-end">
      <li class="waveLi" v-for="(item,index) in output" :key="index" :style="'--height:'+(item/2)+'px'"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name:"musicVideo",
  data(){
    return{
      url:"http://m801.music.126.net/20230209113505/6466449c05f15684432d38a360da73a8/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/24656835361/6b41/a1d6/e0f3/5765076062c7217029ed3b21eb82b650.mp3",
      audio:"",
      output:[],
      analyser:"",
      isPlay:false,
    }
  },
  mounted() {
    this.loadMusic()
  },
  methods:{
    play(){
      this.audio.play()
      this.isPlay = true
      this.bolang()
    },
    pause(){
      this.audio.pause()
      setTimeout(() => {
        this.isPlay = false
      },1000)
    },
    loadMusic(){
      var context = new AudioContext;
      //加载媒体
      this.audio = new Audio(this.url);
      //创建节点
      var source = context.createMediaElementSource(this.audio);
      this.analyser = context.createAnalyser();
      //连接：source → analyser → destination
      source.connect(this.analyser);
      this.analyser.connect(context.destination);
    },
    bolang(){
      if (!this.isPlay){
        return
      }
      let _this = this;
      (function drawSpectrum() {
        //创建数据
        _this.output = new Uint8Array(100);
        _this.analyser.getByteFrequencyData(_this.output);//获取频域数据
        //请求下一帧
        if (_this.isPlay){
          requestAnimationFrame(drawSpectrum);
        }
      })();
    }
  }
}
</script>

<style lang="scss" scoped>
div{
    width: 100%;
    height: 90vh;
}
.waveUl{
  position: absolute;
  left: 0;
  bottom: 10vh;
  height: 200px;
  width: 100%;
  .waveLi{
    position: relative;
    width: 4px;
    border-radius: 2px;
    height: var(--height);
    background-color: red;
  }
}

</style>