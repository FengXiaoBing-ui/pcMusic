<template>
  <div class="hoverBox"
       :class="{'hoverBoxTop':mode==='top','hoverBoxBot':mode==='bot','hoverBoxLeft':mode==='left','hoverBoxRight':mode==='right'}">
    <slot></slot>
    <div v-if="isPlayIcon" class="icon iconfont icon-pausecircle-fill playIcon"></div>
    <div class="mask"></div>
  </div>
</template>
<script>
export default {
  name: "hoverBox",
  props: {
    mode: {
      type: String,
      default: ""
    },
    isPlayIcon: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
.hoverBox {
  transform: translate(0, 0);
  transition: all 0.3s;
  position: relative;

  .playIcon {
    opacity: 0;
    position: absolute;
    font-size: 40px;
    top: 90%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9;

    &:hover {
      @include font_color("font_color1")
    }
  }

  .mask {
    opacity: 0;
    left: 0;
    top: 0;
    position: absolute;
    width: 100%;
    height: 97.5%;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.2);
    transition: all 0.3s;
  }

  &:hover > .mask {
    opacity: 1;
  }

  &:hover > .playIcon {
    transition: all 0.3s;
    opacity: 1;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.hoverBoxTop {
  &:hover {
    transform: translate(0, -10px);
    cursor: pointer;
  }
}

.hoverBoxBot {
  &:hover {
    transform: translate(0, 10px);
    cursor: pointer;
  }
}

.hoverBoxLeft {
  &:hover {
    transform: translate(-10px, 0);
    cursor: pointer;
  }
}

.hoverBoxRight {
  &:hover {
    transform: translate(10px, 0);
    cursor: pointer;
  }
}
</style>