/**
 * 俱乐部工作室API合集
 */
import { fetchGet, fetchPost } from '../../utils/request'

// 获取分享学员信息
export const getMemberInfoByStudioShare = (params: any) => {
    const url = `${process.env.REACT_APP_STUDIO_API_URL}/coach/side/fuzzy/user/userShareSelect`
    return fetchGet(url, params, 'studio')
}
// 获取学员信息
export const getMemberInfoByStudio = (params: any) => {
    const url = `${process.env.REACT_APP_STUDIO_API_URL}/coach/side/fuzzy/user/userSelect`
    return fetchGet(url, params, 'studio')
}
