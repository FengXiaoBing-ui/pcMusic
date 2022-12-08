<template>
    <div class="mainMenu" :class="mainMenuShow?'mainMenuShow':''">
        <div style="padding: 5px 0;" class="flex align-center justify-center" v-for="item in 6" :key="item">{{ item }}</div>
    </div>
</template>
  
<script>
export default {
    name: "mainMenu",
    props: {
        mainMenuShow:{
            type:Boolean,
            default:false
        }
    },
    methods: {},
};
</script>
  
<style lang="scss" scoped>
.mainMenu {
    position: absolute;
    top: 40px;
    left: -10px;
    width: 200px;
    border-radius: 10px;
    background-color: rgb(198, 47, 47);
    opacity: 0;
    transform: scale(1,0);
    transform-origin: top;
    transition: all 0.1s;
    &::before {
        content: '';
        display: block;
        position: absolute;
        top: -10px;
        left: 16px;
        width: 0px;
        height: 0px;
        border-bottom: 10px solid rgb(198, 47, 47);
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
    }
}
.mainMenuShow{
    opacity: 1;
    transform: scale(1);
}
</style>
  