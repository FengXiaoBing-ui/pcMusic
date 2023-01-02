import axiosApi from './axios'

function getRecommend(){
    return new Promise((resolve,reject) => {
        axiosApi('/getRecommend',{},'get').then( res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
export default {
    getRecommend,//获取推荐
}