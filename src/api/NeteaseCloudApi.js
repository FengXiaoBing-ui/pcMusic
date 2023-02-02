import axiosApi from "@/api/axios";

function getNewSong(params){
    return axiosApi('/personalized/newsong',params,'get');
}

function getSongUrl(params){
    return axiosApi('/song/url/v1',params,'get');
}

function getPersonalized(params){
    return axiosApi('/personalized',params,'get');
}

function getPersonalizedMV(params){
    return axiosApi('/personalized/mv',params,'get');
}

function getSearchHot(params){
    return axiosApi('/search/hot/detail',params,'get');
}

function getSearchKey(params){
    return axiosApi('/search/default',params,'get');
}

function getCloudSearch(params){
    return axiosApi('/cloudsearch',params,'get');
}

function getSearchSuggest(params){
    return axiosApi('/search/suggest',params,'get');
}

function search(params){
    return axiosApi('/search',params,'get');
}

function getSongDetail(params){
    return axiosApi('/song/detail',params,'get');
}

function phoneLogin(params){
    return axiosApi('/login/cellphone',params,'get');
}

function emailLogin(params){
    return axiosApi('/login',params,'get');
}

function loginStatus(params){
    return axiosApi('/login/status',params,'get');
}

function logOut(params){
    return axiosApi('/logout',params,'get');
}

function getLyric(params){
    return axiosApi('/lyric',params,'get');
}

function getSongSheetDetails(params){
    return axiosApi('/playlist/detail',params,'get');
}

function getTrackAll(params){
    return axiosApi('/playlist/track/all',params,'get');
}

function fName(params){
    return axiosApi('',params,'get');
}

export default {
    getNewSong,//获取推荐最新音乐，我把他放在了最刚开始的播放列表
    getSongUrl,//获取音乐URL
    getPersonalized,//获取推荐歌单
    getPersonalizedMV,//获取推荐MV
    getSearchHot,//获取热门搜索
    getSearchKey,//获取默认搜索关键字
    getCloudSearch,//获取搜索结果
    getSearchSuggest,//调用此接口 , 传入搜索关键词可获得搜索建议 , 搜索结果同时包含单曲 , 歌手 , 歌单信息
    search,//搜索
    getSongDetail,//获取歌曲详情
    phoneLogin,//手机号登录
    emailLogin,//邮箱登录
    loginStatus,//登录状态
    logOut,//推出登录
    getLyric,//获取歌词
    getSongSheetDetails,//获取歌单详情
    getTrackAll,//获取歌单所有歌曲
}