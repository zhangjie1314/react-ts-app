import defAvatar from '../assets/img/normal.png'
/**
 * 替换头像地址
 */
export function handleHandImg(str: string, fromStudio: number): string {
    if (!str) return defAvatar
    const reg = /^http(s)?/g
    if (!reg.test(str)) {
        return `${fromStudio ? process.env.REACT_APP_STUDIO_IMG_URL : process.env.REACT_APP_IMG_URL}${str}`
    }
    return str
}
/**
 * 获取手机系统类型
 * 0: 代表android; 1: 代表ios, -1 未知
 */
export function getPhoneType(): number {
    const u = navigator.userAgent
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    let type = -1
    if (isAndroid) {
        type = 0
    } else if (isIOS) {
        type = 1
    } else {
        type = -1
    }
    return type
}
/**
 * 调用app方法
 * @param funcName 调用app方法名称
 * @param params 传给app方法的参数
 */
export const callAppMenthd: (code: string, params: object) => void = (funcName, params) => {
    const phoneType = getPhoneType()
    const data = {
        code: funcName,
        params,
    }
    console.log('传递给APP的参数：', data)
    if (phoneType === 1) {
        try {
            window.webkit.messageHandlers.bPOSMethod.postMessage(JSON.stringify(data))
        } catch (e) {
            console.log('调用IOS方法出错：', e)
        }
    }
    if (phoneType === 0) {
        try {
            window.bMatch.bPOSMethod(JSON.stringify(data))
        } catch (e) {
            console.log('调用Android方法出错：', e)
        }
    }
}
