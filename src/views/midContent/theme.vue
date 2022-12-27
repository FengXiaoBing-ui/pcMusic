<template>
    <div class="theme">
        <div>主题</div>
        <div @click="selectTheme(item)" style="cursor: pointer;" class="padding" v-for="item in list" :key="item">{{ item }}</div>
    </div>
</template>
  
<script>
export default {
    name: "themeIndex",
    data() {
        return {
            list:[
                "red","green","blue","yellow"
            ]
        }
    },
    methods:{
        selectTheme(color){
            
        }
    }
}
</script>
  
<style lang="scss" scoped>
.theme {
    width: 100%;
    height: 90vh;
    background: rgb(180, 101, 55);
}
</style>