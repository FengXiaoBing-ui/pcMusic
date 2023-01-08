export default {
    namespaced: true,
    state: {
        musicUrl:"",
        musicList:[]
    },
    mutations: {
        setMusicUrl(state,val){
            state.musicUrl = val
        },
        setMusicList(state,val){
            state.musicList = val
        }
    },
    actions: {},
    getters: {}
}
