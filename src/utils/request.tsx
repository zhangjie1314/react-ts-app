import { Toast } from 'antd-mobile'
import { getCookieByName } from '../utils/index'

function getToken(type: string) {
    let tk = ''
    switch (type) {
        // 教练
        case 'bapp':
            tk = getCookieByName('bapp_token')
            break
        // 工作室
        case 'studio2':
            tk = getCookieByName('bapp_token')
            break
        // 用户
        case 'capp':
            tk = JSON.parse(getCookieByName('cUserInfo')).token
            break
        // 俱乐部
        case 'studio':
            tk = getCookieByName('studio_token')
            break
    }
    return tk
}

const request = (url: string, config: object) => {
    return fetch(url, config)
        .then((res: any) => {
            if (!res.ok) {
                // 服务器异常返回
                throw Error('')
            }
            return res.json()
        })
        .then((resJson: any) => {
            if (resJson.code !== 0) {
                Toast.info(resJson.msg)
                return resJson
            }
            return resJson
        })
        .catch((error: any) => {
            Toast.info('error')
            console.log('error:', error)
        })
}

// get 请求
export const fetchGet = (url: string, params: any, token: string) => {
    // 参数处理
    if (params) {
        let paramsArray: any = []
        //拼接参数
        Object.keys(params).forEach(key => paramsArray.push(`${key}=${encodeURIComponent(params[key])}`))
        if (paramsArray.length > 0) {
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
    }
    return request(url, {
        method: 'GET',
        headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            token: getToken(token),
        }),
    })
}

// post 请求
export const fetchPost = (url: string, params: object | any, token: string) => {
    let formData = new FormData()
    if (params) {
        for (let key in params) {
            formData.append(key, params[key])
        }
    }

    return request(url, {
        method: 'POST',
        body: formData,
        mode: 'cors',
        headers: new Headers({
            Accept: 'application/json',
            token: getToken(token),
        }),
    })
}
