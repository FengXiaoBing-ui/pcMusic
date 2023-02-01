import Vuex from "vuex";
import musicInfo from "./musicInfo";
import axios from "axios";

const store = new Vuex.Store({
    modules: {
        musicInfo,
    },
    state: {
        leftListWidth:0,//左侧选项列表宽度
        musicInfoWidth:0,//底部音乐信息宽度
        isMusicList:false,//是否显示右侧播放列表
        musicTypeApi:0,//0:网易云api，1:QQ音乐api,2:其他音乐api
        userInfo:null,//用户信息
        showMusicDetail:'-100vh',//显示歌曲详情
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
        },
        setMusicTypeApi(state,val){
            if (val==0){
                axios.defaults.baseURL = 'http://127.0.0.1:3000'
            }
            if (val==1){
                axios.defaults.baseURL = 'http://127.0.0.1:3300'
            }
            state.musicTypeApi = val
        },
        setUserInfo(state,val){
            state.userInfo = val
            console.log(666,state.userInfo)
        },
        setShowMusicDetail(state,val){
            state.showMusicDetail = val
        }
    },
    actions: {}
});

export default store;
