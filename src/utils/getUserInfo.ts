// 获取用户信息
import { getShareContentUrl } from '../utils'
import { HttpInfoByStudio, HttpWechatShareParams } from '../apis/report'
interface getUserInfosType {
    tabsId: number //tab切换
    memberId: string //会员ID
    isDlCoach: number //是否为独立教练 1 是 0 否
    isshare?: number // 是否通过分享的连接打开 1 是 0 否
    isFromStudio?: number // 是否为工作室
    version?: string //版本号
}
// 获取用户信息（分享）
const getUserInfoByShare = (memberId: string, fromstudio?: number) => {
    const studio = fromstudio === 1
    if (studio) {
        // 工作室
        return HttpInfoByStudio({ memberId })
    } else {
        // 非工作室
        return
    }
}
// 获取用户信息（非分享）
const getUserInfo = (memberId: string, fromstudio?: number) => {}
// 获取用户微信信息
const getWechatShareParams = (params: getUserInfosType) => {
    const url_1 = window.location.href.split('#')[0]
    return HttpWechatShareParams({ url: url_1 })
}

export const getUserInfos = (params: getUserInfosType) => {
    const tabsId = params.tabsId
    const isDlCoach = params.isDlCoach
    const isshare = params.isshare
    const isFromStudio = params.isFromStudio
    const memberId = params.memberId
    const version = params.version
    if (isshare === 1) {
        // 分享
        getUserInfoByShare(memberId, isFromStudio)?.then(() => {
            getWechatShareParams(params).then((res) => {
                if (res.code !== 0 || !res.data) {
                    console.log('查询出错')
                } else {
                    // this.setShareContent(res.data, getShareContentUrl(params))
                }
            })
        })
    } else {
        // 非分享
        getUserInfo(memberId, isFromStudio)
    }
}
