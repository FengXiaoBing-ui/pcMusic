<template>
  <div class="home" @click="overall">
    <systemTitle class="systemTitle"></systemTitle>
    <div class="flex">
      <leftList ref="leftList" class="leftList"></leftList>
      <div style="width:88vw" class="content">
        <mainContent class="mainContent"></mainContent>
        <musicInfo ref="musicInfo" class="musicInfo"></musicInfo>
      </div>
    </div>
  </div>
</template>
  
<script>
import systemTitle from "/src/views/topSystemTitle/systemTitle";
import leftList from "/src/views/leftList/leftList";
import mainContent from "/src/views/midContent/mainContent";
import musicInfo from "/src/views/botMusic/musicInfo";
import { mapMutations } from "vuex"
export default {
  name: "homeIndex",
  components: {
    systemTitle,
    leftList,
    mainContent,
    musicInfo
  },
  data(){
    return{
    }
  },
  mounted() {
    this.setLeftListWidth(this.$refs.leftList.$el.offsetWidth+18)
    this.setMusicInfoWidth(this.$refs.musicInfo.$el.offsetWidth-35)
    window.onresize = () => {
      this.setLeftListWidth(this.$refs.leftList.$el.offsetWidth+18)
      this.setMusicInfoWidth(this.$refs.musicInfo.$el.offsetWidth-35)
    }
  },
  methods:{
    ...mapMutations(['setLeftListWidth','setMusicInfoWidth','setIsMusicList']),
    overall(){
      this.setIsMusicList(false)
    },
  }
};
</script>
  
<style lang="scss" scoped>
.home {
  @include background_image("homeBackground");
  @include font_color("font_color1")
}

.systemTitle {

  @include background_color("systemTitleBackground");
}

.leftList {

  @include background_color("leftListBackground");
}

.content {
  .mainContent{
  height: 92vh;
  overflow-y: auto;
  position: relative;
  z-index: 1;
  padding-bottom: 10vh;
  @include background_color("mainContentBackground");
  }
  .musicInfo{
    @include background_color("mainContentBackground");
    position: fixed;
    z-index: 9;
  }
}

::-webkit-scrollbar {
  width: 10px;
  background-color: transparent;
}

::-webkit-scrollbar-track {
  background-color: transparent;
  //border: 1px solid #f1f5fa;
}

::-webkit-scrollbar-thumb {
  width: 10px;
  background-color: rgba($color: #eeeeee, $alpha: 0.7);
  border-radius: 5px;
}
</style>
  