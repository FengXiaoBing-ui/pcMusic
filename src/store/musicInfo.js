export default {
    namespaced: true,
    state: {
        musicUrl:"",//音乐播放地址
        isAutoPlay:false,//是否自动播放
        musicList:[],//播放列表
        musicInfo:{
            playState: false,
            currentTime: '00:00:00',
            lyricCurrentTime:'00:00:00',
            duration: '00:00:00',
            songName: "",
            singerName: "",
            picUrl:"",
            singerId:"",
            lyric:[]
        },//歌曲信息
    },
    mutations: {
        setMusicUrl(state,val){
            state.musicUrl = val
        },
        setMusicList(state,val){
            state.musicList = val
        },
        setIsAutoPlay(state,val){
            state.isAutoPlay = val
        },
        setMusicInfo(state,val){
            state.musicInfo = {...state.musicInfo,...val}
        }
    },
    actions: {},
    getters: {}
}
