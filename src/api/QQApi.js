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
    undateCookie,//??????cookie
    getCookie,//??????cookie
    useCookie,//????????????cookie
    setCookie,//??????cookie
    getRecommend,//????????????
    getUserDetail,//??????????????????
    getUserSonglist,//?????????????????????
    getUserCollectSonglist,//?????????????????????
    getUserCollectAlbum,//?????????????????????
    getRecommendPlaylist,//???????????????????????????????????????
    getRecommendDaily,//??????
    getSongUrl,//????????????????????????
    getSong,//????????????????????????
    getDearchHot,//???????????????
    getSearch,//?????????????????????
    getSearchByKey,//??????????????????
}