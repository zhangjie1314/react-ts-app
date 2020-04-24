import Apis from '../apis/report'
// 获取用户信息
interface getUserInfosType {
    memberId: string //会员ID
    isshare: number // 是否通过分享的连接打开 1 是 0 否
    isFromStudio: number // 是否为工作室
}
// 获取用户信息（分享）
const getUserInfoByShare = (memberId: string, fromstudio?: number) => {
    const studio = fromstudio === 1
    if (studio) {
        // 工作室
        return Apis.getMemberInfoByStudioShare({ memberId })
    } else {
        // 非工作室
        return Apis.getMemberInfoByBappShare({ memberId })
    }
}
// 获取用户信息（非分享）
const getUserInfo = (memberId: string, fromstudio?: number): any => {
    const studio = fromstudio === 1
    if (studio) {
        // 工作室
        return Apis.getMemberInfoByStudio({ memberId })
    } else {
        // 非工作室
        return Apis.getMemberInfoByBapp({ memberId })
    }
}
export const getUserInfos = (params: getUserInfosType) => {
    const isshare = params.isshare
    const isFromStudio = params.isFromStudio
    const memberId = params.memberId
    return new Promise((res, rej) => {
        if (isshare === 1) {
            // 分享
            getUserInfoByShare(memberId, isFromStudio).then(resl => {
                res(resl)
            })
        } else {
            // 非分享
            getUserInfo(memberId, isFromStudio).then((resl: any) => {
                res(resl)
            })
        }
    })
}
