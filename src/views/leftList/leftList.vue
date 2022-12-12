<template>
  <div class="leftList">
    <router-link class="padding" to="/home/musicVideo">1</router-link>
    <router-link class="padding" to="/home/musicHome">2</router-link>
    <div class="padding">3</div>
    <div class="padding">4</div>
    <div class="padding">5</div>
  </div>
</template>

<script>
export default {
    name: "leftList",
    methods:{
        home(){

        },
        video(){
            
        }
    }
}
</script>

<style lang="scss" scoped>
.leftList{
    width: 100px;
    height: 100%;
    background: orange;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>