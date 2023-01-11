<template>
  <div class="searchResult text-white">
    <playMusicList :dataList="dataList"></playMusicList>
  </div>
</template>

<script>
export default {
  name: "searchResult",
  data(){
    return{
        dataList:[]
    }
  },
  created(){
    console.log(this.$route.query);
    this.getSearchResult()
  },
  mounted() {
  },
  methods:{
    async getSearchResult(){
        let res = await this.$NeteaseCloudrequest.search({'keywords':this.$route.query.key})
        console.log(res.result.songs);
        this.dataList = res.result.songs
    }
  }
};
</script>

<style lang="scss" scoped>
</style>