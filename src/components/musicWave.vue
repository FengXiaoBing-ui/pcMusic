<template>
<div>
  <ul class="waveUl flex justify-between align-end">
    <li :class="isPlay?'waveLi':''" v-for="(item,index) in output" :key="index" :style="'--height:'+(item/2)+'px'"></li>
  </ul>
</div>
</template>

<script>
export default {
  name: "musicWave",
  props:{
    url:{
      type:String,
      default:""
    }
  },
  data(){
    return{
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
      this.wave()
    },
    pause(){
      this.audio.pause()
      setTimeout(() => {
        this.isPlay = false
      },1000)
    },
    loadMusic(){
      if (this.url===""){
        return
      }
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
    wave(){
      if (!this.isPlay){
        return
      }
      let _this = this;
      (function drawSpectrum() {
        //创建数据
        _this.output = new Uint8Array(80);
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
.waveUl{
  position: absolute;
  left: 0;
  bottom: 10vh;
  height: 200px;
  width: 100%;
  .waveLi{
    position: relative;
    width: 0.1%;
    border-radius: 100px;
    height: var(--height);
    background-color: rgba(255,255,255,0.2);
    box-shadow: 0px 0px 3px 2px rgba(255,255,255,0.3);
  }
}
</style>