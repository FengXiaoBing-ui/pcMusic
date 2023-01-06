export default {
    namespaced: true,
    state: {
        musicUrl:"",
    },
    mutations: {
        setMusicUrl(state,val){
            state.musicUrl = val
        }
    },
    actions: {},
    getters: {}
}
