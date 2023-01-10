import axios from "axios";
import { mapState } from "vuex";
import qs from "qs";

const isDev = process.env.NODE_ENV === 'development'
axios.defaults.baseURL = 'http://127.0.0.1:3200'
axios.defaults.withCredentials = true
//post请求头
//设置超时
axios.defaults.timeout = 10000;

axios.interceptors.request.use(
    config => {
        
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
        // console.log('response', response);
        return response;
    },
    error => {
        console.log('error', error);
    }
);

export default function axiosApi(type, params, method) {
    // let sign = process.env.VUE_APP_SIGN
    // if (process.env.NODE_ENV === 'production') {
    //     sign = localStorage.getItem("wx_sign")
    // } else {
    //     sign = 'crm:user:sign:f0c8cbe468f6a34463d198268290903f'
    // }
    // var value = {
    //     sign: sign
    // }
    // var data = method == "post" ? qs.stringify(Object.assign(value, params)) : Object.assign(value, params)
    if (method==='post') {
        return new Promise((resolve, reject) => {
            axios({
                method: "post",
                url: type,
                data:params
            })
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                });
        })
    }
    if (method==='get') {
        return new Promise((resolve, reject) => {
            axios({
                method:"get",
                url: type,
                params:params
            })
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                });
        })
    }
};
