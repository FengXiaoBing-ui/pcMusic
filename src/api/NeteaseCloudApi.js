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
}