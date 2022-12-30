<template>
  <div class="home">
    <systemTitle class="systemTitle"></systemTitle>
    <div class="flex">
      <leftList class="leftList"></leftList>
      <div style="width:88vw" class="content">
        <mainContent></mainContent>
        <musicInfo></musicInfo>
      </div>
    </div>
  </div>
</template>
  
<script>
import systemTitle from "/src/views/topSystemTitle/systemTitle";
import leftList from "/src/views/leftList/leftList";
import mainContent from "/src/views/midContent/mainContent";
import musicInfo from "/src/views/botMusic/musicInfo";
export default {
  name: "homeIndex",
  components: {
    systemTitle,
    leftList,
    mainContent,
    musicInfo
  },
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
  height: 92vh;
  overflow-y: auto;
  position: relative;
  z-index: 1;
  @include background_color("mainContentBackground");
}

::-webkit-scrollbar {
  width: 6px;
  background-color: transparent;
}

::-webkit-scrollbar-track {
  background-color: transparent;
  border-right: 1px solid #f1f5fa;
  //border: 1px solid #f1f5fa;
}

::-webkit-scrollbar-thumb {
  width: 6px;
  background-color: #00000010;
}
</style>
  