import axiosApi from './axios'

function undateCookie(){
    return new Promise((resolve,reject) => {
        axiosApi('/user/refresh',{},'get').then( res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
function getCookie(){
    return new Promise((resolve,reject) => {
        axiosApi('/user/getCookie?id=1064041527',{},'get').then( res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
function useCookie(){
    return new Promise((resolve,reject) => {
        axiosApi('/user/cookie',{},'get').then( res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
function setCookie(){
    return new Promise((resolve,reject) => {
        axiosApi('/user/setCookie',{
            "data":"uin=1583446461;qm_keyst=Q_H_L_5nV_XlgRc93ouNr88HwEK8olNtcgInTZf56xQLrKiux-wYfEfraWdGw;qqmusic_key=Q_H_L_5nV_XlgRc93ouNr88HwEK8olNtcgInTZf56xQLrKiux-wYfEfraWdGw;ts_last=y.qq.com/n/ryqq/profile"
        },'post').then( res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
function getRecommend(){
    return new Promise((resolve,reject) => {
        axiosApi('/getRecommend',{},'get').then( res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
function getUserDetail(){
    return new Promise((resolve,reject) => {
        axiosApi('/user/detail',{id:'1583446461'},'get').then( res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
function getUserSonglist(){
    return new Promise((resolve,reject) => {
        axiosApi('/user/songlist',{id:'1583446461'},'get').then( res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
function getUserCollectSonglist(){
    return new Promise((resolve,reject) => {
        axiosApi('/user/collect/songlist',{id:'1583446461'},'get').then( res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
function getUserCollectAlbum(){
    return new Promise((resolve,reject) => {
        axiosApi('/user/collect/album',{id:'1583446461'},'get').then( res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
function getRecommendPlaylist(){
    return new Promise((resolve,reject) => {
        axiosApi('/recommend/playlist',{},'get').then( res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
function getRecommendDaily(){
    return new Promise((resolve,reject) => {
        axiosApi('/recommend/daily',{},'get').then( res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
function getSongUrl(params){
    return new Promise((resolve,reject) => {
        axiosApi('/getMusicPlay',params,'get').then( res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
function getSong(params){
    return new Promise((resolve,reject) => {
        axiosApi('/getSongInfo',params,'get').then( res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
function getDearchHot(params = {}){
    return new Promise((resolve,reject) => {
        axiosApi('/search/hot',params,'get').then( res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
function getSearch(params = {}){
    return new Promise((resolve,reject) => {
        axiosApi('/getSmartbox',params,'get').then( res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
function getSearchByKey(params = {}){
    return new Promise((resolve,reject) => {
        axiosApi('/getSearchByKey',params,'get').then( res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
export default {
    undateCookie,//刷新cookie
    getCookie,//获取cookie
    useCookie,//查看当前cookie
    setCookie,//设置cookie
    getRecommend,//获取推荐
    getUserDetail,//用户主页信息
    getUserSonglist,//用户创建的歌单
    getUserCollectSonglist,//用户收藏的歌单
    getUserCollectAlbum,//用户收藏的专辑
    getRecommendPlaylist,//分类歌单，默认官方推荐歌单
    getRecommendDaily,//日推
    getSongUrl,//获取歌曲播放链接
    getSong,//获取单个歌曲信息
    getDearchHot,//获取热搜词
    getSearch,//获取搜索关键词
    getSearchByKey,//获取搜索结果
}