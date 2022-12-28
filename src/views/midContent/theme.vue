<template>
    <div class="theme">
        <div>主题</div>
        <div class="flex flex-wrap">
            <div 
        @click="selectTheme(item.key)"
        :style="'cursor: pointer;'+(item.type==='color'?('background:'+item.color):('background-image: url('+item.url+')'))" 
        class="padding themeBox" 
        v-for="item in themesList" 
        :key="item.name">{{ item.name }}</div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "themeIndex",
    data() {
        return {
            themesList:[
                {
                    name:"red",
                    color:"red",
                    key:"red",
                    type:"color"
                },
                {
                    name:"green",
                    color:"green",
                    key:"green",
                    type:"color"
                },
                {
                    name:"blue",
                    color:"blue",
                    key:"blue",
                    type:"color"
                },
                {
                    name:"yellow",
                    color:"yellow",
                    key:"yellow",
                    type:"color"
                },
                {
                    name:"哪吒",
                    key:"home",
                    url:"https://pic4.zhimg.com/v2-600c82fc53786a2f489c60e237ef18a5_b.jpg",
                    type:"image"
                }
            ]
        }
    },
    methods:{
        selectTheme(color){
            window.document.documentElement.setAttribute( "data-theme", color);
        }
    }
}
</script>
  
<style lang="scss" scoped>
.theme {
    width: 100%;
    height: 90vh;
}
.themeBox{
    width: 18%;
    height: 100px;
    margin: 16px 16px 0 0;
    border-radius: 10px;
    background-size: 100%;
    &:nth-child(5n){
        margin-right: 0;
    }
}
</style>