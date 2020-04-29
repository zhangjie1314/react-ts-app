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
// 获取体测数据列表
export const getTestListByBapp = (params: any) => {
    const url = `${process.env.REACT_APP_BWEBAPP_API_URL}/coach/side/fuzzy/getTestList`
    return fetchGet(url, params, 'bapp')
}
// 获取动作评估接口
export const getActionEvaluationInfo = (params: any) => {
    const url = `${process.env.REACT_APP_BWEBAPP_API_URL}/coach/side/fuzzy/getDtValue`
    return fetchGet(url, params, 'bapp')
}
// 获取人体成分数据
export function getBodyCompositionResult(params = {}) {
    const url = `${process.env.REACT_APP_BWEBAPP_API_URL}/coach/side/fuzzy/getRtcfValue`
    return fetchGet(url, params, 'bapp')
}
// 获取教练信息
export function getCoachInfo(params = {}) {
    const url = `${process.env.REACT_APP_BWEBAPP_API_URL}/coach/side/fuzzy/getSideCoachInfo`
    return fetchGet(url, params, 'bapp')
}
// 获取完美围度数据
export function getPerfectCircumferenceResult(params = {}) {
    const url = `${process.env.REACT_APP_BWEBAPP_API_URL}/coach/side/fuzzy/getWDId`
    return fetchGet(url, params, 'bapp')
}
// 获取体适能评估数据
export function getfitnessAssessmentResult(params = {}) {
    const url = `${process.env.REACT_APP_BWEBAPP_API_URL}/coach/side/fuzzy/getTnValue`
    return fetchGet(url, params, 'bapp')
}
