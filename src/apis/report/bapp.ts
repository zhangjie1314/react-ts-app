/**
 * Bapp API 合集
 */
import { fetchGet, fetchPost } from '../../utils/request'

// 获取用户信息(非登陆)
export const getMemberInfoByBappShare = (params: any) => {
    const url = `${process.env.REACT_APP_BWEBAPP_API_URL}/coach/side/fuzzy/user/userShareSelect`
    return fetchGet(url, params, 'bapp')
}
// 获取学员信息
export const getMemberInfoByBapp = (params: any) => {
    const url = `${process.env.REACT_APP_BWEBAPP_API_URL}/coach/side/fuzzy/user/userSelect`
    return fetchGet(url, params, 'bapp')
}
// 获取微信分享信息
export const getWechatShareParams = (params: any) => {
    const url = `${process.env.REACT_APP_BWEBAPP_API_URL}/pt/group/bapp/share`
    return fetchPost(url, params, 'bapp')
}
