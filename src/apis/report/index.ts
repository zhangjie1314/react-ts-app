// 体测API接口
import { fetchGet, fetchPost } from '../../utils/request'

// 获取学员信息 （工作室）
export const HttpInfoByStudio = (params: any) => {
    const url = `${process.env.REACT_APP_STUDIO_API_URL}/coach/side/fuzzy/user/userShareSelect`
    return fetchGet(url, params)
}
// 获取微信分享信息
export const HttpWechatShareParams = (params: any) => {
    const url = `${process.env.REACT_APP_BWEB_API_URL}/pt/group/bapp/share`
    return fetchPost(url, params)
}
