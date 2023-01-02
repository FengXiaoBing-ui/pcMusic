<template>
  <div class="text-white">
    <h1 class="text-xl">推荐</h1>

    <modTitle class="margin-tb" title="你好 xxx 今日为你推荐" />
    <div class="flex align-center justify-between recommend w100">
      <hoverBox
        isPlayIcon
        mode="top"
        style="width: 40%; border-radius: 10px; overflow: hidden"
      >
        <div class="recommendBox1"></div>
      </hoverBox>
      <hoverBox
        isPlayIcon
        mode="top"
        style="width: 19%; border-radius: 10px; overflow: hidden"
      >
        <div class="recommendBox2"></div>
      </hoverBox>
      <hoverBox
        isPlayIcon
        mode="top"
        style="width: 19%; border-radius: 10px; overflow: hidden"
      >
        <div class="recommendBox3"></div>
      </hoverBox>
      <hoverBox
        isPlayIcon
        mode="top"
        style="width: 19%; border-radius: 10px; overflow: hidden"
      >
        <div class="recommendBox4"></div>
      </hoverBox>
    </div>

    <modTitle class="margin-tb" title="你的歌单宝藏库" />
    <div class="flex align-center treasure w100"></div>
  </div>
</template>
<script>
export default {
  name: "musicRecommend",
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let res = await this.$request.getRecommend();
      console.log(res);
    },
  },
};
</script>
<style lang="scss" scoped>
.recommend {
  .recommendBox1 {
    height: 200px;
    background-color: antiquewhite;
  }

  .recommendBox2 {
    height: 200px;
    background-color: rgb(218, 169, 107);
  }

  .recommendBox3 {
    height: 200px;
    background-color: rgb(114, 75, 25);
  }

  .recommendBox4 {
    height: 200px;
    background-color: rgb(80, 114, 25);
  }
}

.treasure {
}
</style>