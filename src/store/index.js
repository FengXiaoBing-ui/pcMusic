import Vuex from "vuex";

import index from "./musicInfo";

const store = new Vuex.Store({
    modules: {
        index,
    },
    state: {
        leftListWidth:0,//左侧选项列表宽度
        musicInfoWidth:0,//底部音乐信息宽度
        isMusicList:false,//是否显示右侧播放列表
    },
    mutations: {
        setLeftListWidth(state,val){
            state.leftListWidth = val
        },
        setMusicInfoWidth(state,val){
            state.musicInfoWidth = val
        },
        setIsMusicList(state,val){
            state.isMusicList = val
        }
    },
    actions: {}
});

export default store;
