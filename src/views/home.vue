<template>
  <div class="homeIndex">
    <systemTitle></systemTitle>
    <div class="flex">
      <leftList></leftList>
      <div style="width:100%">
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

</style>
  