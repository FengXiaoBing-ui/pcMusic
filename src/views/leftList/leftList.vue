<template>
  <div class="leftList padding">
    <div class="flex flex-direction align-start">
      <template v-for="(item,index) in linkList" :key="index">
        <div v-if="item.title" class="w100 title" style="color: #e3e3e3;">{{ item.title }}</div>
        <router-link @click="selectTab(childIndex,item.title)" v-for="(child,childIndex) in item.children" :key="childIndex" class="routerLink" :class="activeIndex===(childIndex+item.title)?'active':''" :to="child.link">{{ child.name }}</router-link>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "leftList",
  data() {
    return {
      activeIndex:0+"在线音乐",
      linkList: [
        {
          title: "在线音乐",
          children: [
            {
              name: "推荐",
              link: "/home/recommend"
            },
            {
              name: "音乐厅",
              link: "/home/musicHome"
            },
            {
              name: "MV",
              link: "/home/musicVideo"
            },
            {
              name: "电台",
              link: "/home/musicHome"
            },
          ]
        },
        {
          title: "我的音乐",
          children: [
            {
              name: "我喜欢",
              link: "/home/musicVideo"
            },
            {
              name: "本地和下载",
              link: "/home/musicHome"
            },
            {
              name: "最近播放",
              link: "/home/musicVideo"
            },
            {
              name: "试听列表",
              link: "/home/musicHome"
            }
          ]
        }
      ]
    }
  },
  methods: {
    selectTab(childIndex,title){
      this.activeIndex = childIndex+title
    }
  }
}
</script>

<style lang="scss" scoped>
.leftList {
  width: 12vw;
  height: 92vh;
  overflow-y: auto;
  padding: 20px 0;
  position: relative;
  z-index: 1;
  @include font_color("systemTitlefont_color");
  .title{
    padding: 10px 0;
  }
  .routerLink{
    width: 100%;
    padding: 8px 10px;
    margin: 6px 0;
    border-radius: 4px;
    box-sizing: border-box;
    &:hover{
      background-color: rgba(0,0,0,0.1);
    }
  }
  a {
    color: white;
  }
}
.active{
  @include background_color("leftListBackground");
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