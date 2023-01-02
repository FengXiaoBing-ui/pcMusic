import axios from "axios";
import qs from "qs";

axios.defaults.baseURL = 'http://localhost:3200'

//post请求头
axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded;charset=UTF-8";
//设置超时
axios.defaults.timeout = 10000;

axios.interceptors.request.use(
    config => {
        // console.log('config', config);
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
    let sign = process.env.VUE_APP_SIGN
    if (process.env.NODE_ENV === 'production') {
        sign = localStorage.getItem("wx_sign")
    } else {
        sign = 'crm:user:sign:f0c8cbe468f6a34463d198268290903f'
    }
    var value = {
        sign: sign
    }
    var data = method == "post" ? qs.stringify(Object.assign(value, params)) : Object.assign(value, params)
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: type,
            data: data
        })
            .then(res => {
                if (res.status == 200) {
                    resolve(res.data)
                } else {
                    // 接口错误提示
                    console.log(res);
                    reject(res)
                }
            })
            .catch(err => {
                reject(err)
            });
    })
};
