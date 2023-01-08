<template>
  <div class="musicDetails">
    <div>123</div>
    <i class="icon iconfont icon-down1 no-drag" @click="hide"></i>
  </div>
</template>

<script>
export default {
  name: "musicDetails",
  data() {
    return {
      bottom: '-100vh'
    }
  },
  props: {
    showMusicDetails: {
      type: String
    }
  },
  watch: {
    showMusicDetails(newVal,oldVal) {
      console.log(newVal,oldVal)
      this.bottom = newVal
      console.log(this.bottom)
    },
    bottom(newVal,oldVal){

    }
  },
  methods: {
    hide() {
      this.bottom = '-100vh'
    }
  }
}
</script>

<style lang="scss" scoped>
.musicDetails {
  position: fixed;
  bottom: v-bind(bottom);
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: red;
  transition: all 0.3s;
}
</style>