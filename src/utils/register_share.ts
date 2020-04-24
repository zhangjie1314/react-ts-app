// 注册分享信息
import { Toast } from 'antd-mobile'
import { fetchGet } from './request'
import { getPhoneType } from '../utils/index'
// 微信端获取js-sdk注册
function getWxAuthorization(params: any) {
    let pm = window.location.href
    let url = `${process.env.REACT_APP_BWEBAPP_API_URL}/cp-game-biz/getJsApiSignature`
    return fetchGet(url, { url: pm }, '').then((res) => {
        const data = res.data
        const wx = window.wx
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'chooseWXPay'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
        wx.error((res: any) => {
            Toast.info('error', res)
        })
        wx.ready(() => {
            const config = {
                title: params.title,
                desc: params.details,
                link: params.url,
                imgUrl: params.pic,
                // type: '',
                // dataUrl: '',
                success() {
                    params.callback && params.callback()
                },
                cancel() {},
            }
            wx.onMenuShareAppMessage(config)
            wx.onMenuShareTimeline(config)
        })
        wx.ready()
    })
}

// 设置App端分享信息
function setShareInfosByApp() {}

export function setRegisterShare(params: object) {
    return new Promise((res, rej) => {
        // 判断 0安卓/ios1 为app端
        if (getPhoneType() === 0 || getPhoneType() === 1) {
            setShareInfosByApp()
        } else {
            getWxAuthorization(params)
        }
    })
}
