/**
 * 时间戳相互转换
 * @description: timestamp是时间或者时间戳，type是0的话，时间戳转换时间type是1的时候时间转换时间戳
 * @param {String} timestamp 时间
 * @param {Number} type 类型，type===0:时间转时间戳 type===1:时间戳转时间
 */
function timestampToTime(timestamp, type = 0) {
    if (type === 1) {
        const date = new Date(timestamp);
        const time1 = date.getTime();
        return time1
    }

    if (type === 0) {
        const date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        const Y = date.getFullYear() + "-";
        const M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
        const D = date.getDate() + " ";
        // const h = date.getHours() + ":";
        // const m = date.getMinutes() + ":";
        // const s = date.getSeconds();
        return Y + M + D;
    }
}

/**
 *
 * @description: 秒转换为时分秒
 * @param {Number,String} second 秒数
 */
function realFormatSecond(second){
    let secondType = typeof second
    if (secondType === 'number' || secondType === 'string') {
        second = parseInt(second)
        let hours = Math.floor(second / 3600)
        second = second - hours * 3600
        let mimute = Math.floor(second / 60)
        second = second - mimute * 60
        return (hours<=0?'': (hours+ ':') )+ ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
    } else {
        return '00:00:00'
    }
}

function time_to_sec(time) {
    if (time !== null) {
        let s = "";
        let min = time.split(":")[0];
        let sec = time.split(":")[1];
        s = Number(min * 60) + Number(sec);
        return s;
    }
}

/**
 *
 * @description: (用于歌词滚动)秒转换为时分秒
 * @param {Number,String} second 秒数
 */
function lyricRealFormatSecond(second){
    let secondType = typeof second
    if (secondType === 'number' || secondType === 'string') {
        second = second.toFixed(2)
        let hours = Math.floor(second / 3600)
        second = second - hours * 3600
        let mimute = Math.floor(second / 60)
        second = second - mimute * 60
        return (hours<=0?'': (hours+ ':') )+ ('0' + mimute).slice(-2) + ':' + (second<10.00?('0' + second):second)
    } else {
        return '00:00:00'
    }
}

/**
 * 
 * @description: 防抖函数
 * @param {Function} func 执行函数
 * @param {Number} wait 时间
 * @param {Boolean} immediate 不知道
 */
function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result;

    const later = function () {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp;

        // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };

    return function (...args) {
        context = this;
        timestamp = +new Date();
        const callNow = immediate && !timeout;
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };
}

export default {
    timestampToTime,
    debounce,
    realFormatSecond,
    lyricRealFormatSecond,
    time_to_sec
}