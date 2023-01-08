<template>
  <div class="searchResult text-white">searchResult</div>
</template>

<script>
export default {
  name: "searchResult",
  data(){
    return{
        
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
        let res = await this.$request.getSearchByKey({'key':this.$route.query.key})
        console.log(res);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>