// 对比结果页面
import React from 'react'
import { observer, inject } from 'mobx-react'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { createBrowserHistory } from 'history'
import UserInfos from '../../components/user_info'
import ContrastStyle from './index.module.scss'
import { getUserInfos } from '../../utils/get_user_info'
import { setRegisterShare } from '../../utils/register_share'
import PerfectCircumference from './components/perfect_circumference'
import ActionEvaluation from './components/action_evaluation'
import BodyComposition from './components/body_composition'
import FitnessAssessment from './components/fitness_assessment'
import StaticEvaluation from './components/static_evaluation'
import AthleticPerformance from './components/athletic_performance'
import { getBodyCompositionResult } from '@apis/report/bapp'

const cbh = createBrowserHistory()
@inject('reportStore')
@observer
export default class Contrast extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            tabs: [],
            tabsId: 0,
            chartData: [],
            fiancoData: [],
            coachInfo: {},
            circleData: [
                { name: '平衡', val: 100, index: 0, bgColor: '#242630', color: '#21b8c5' },
                { name: '敏捷', val: 100, index: 1, bgColor: '#242630', color: '#eab807' },
                { name: '力量', val: 50, index: 2, bgColor: '#242630', color: '#fe5d47' },
            ],
            params: {},
            constrastArr: [],
            id1: '',
            id2: '',
        }
    }
    // 获取接口
    async getHttpReqFn(fn: Function, id1: string, id2: string) {
        try {
            let h1 = (await fn({ rtcfId: id1 })).data
            let h2 = (await fn({ rtcfId: id2 })).data
            this.setState({ params: { h1, h2 } })
        } catch (err) {
            console.log(err)
        }
    }
    // 显示对应的页面
    showPageFn(type: string) {
        const { id1, id2, params } = this.state
        switch (type) {
            case '0':
                // 完美围度
                return <div>运动表现</div>
            case '1':
                // 运动表现
                return <div>运动表现</div>
            case '2':
                // 静态评估
                return <div>静态评估</div>
            case '3':
                // 动作评估
                return <div>动作评估</div>
            case '4':
                // 体适能评估
                return <div>体适能评估</div>
            case '5':
                // 人体成分
                if (id1 && id2) {
                    this.getHttpReqFn(getBodyCompositionResult, id1, id2)
                }
                console.log(1111111111111)
                return <BodyComposition params={params} />
            default:
                // 人体成分
                if (id1 && id2) {
                    this.getHttpReqFn(getBodyCompositionResult, id1, id2)
                }
                return <BodyComposition params={params} />
        }
    }
    // 整理微信返回url
    getShareContentUrl = (params: any) => {
        let url = `https://${window.location.host}/#/report/${params.tabsId}?memberId=${params.memberId}&isDlCoach=${params.isDlCoach}&isshare=1`
        let fromstudio = params.fromstudio ? `&fromstudio=${params.fromstudio}` : ''
        let version = params.version ? `&version=${params.version}` : ''
        let res = `${url}${fromstudio}${version}`
        return res
    }
    // 分享配置
    configRegisterShare = (params: any) => {
        // 调用分享
        setRegisterShare({
            title: `${params.name.slice(0, 1)}${params.grander === 1 ? '先生' : '女士'}的体测报告`, // 分享标题
            details: `快去查看${params.name.slice(0, 1)}${params.grander === 1 ? '先生' : '女士'}的详细报告吧`, // 分享内容
            pic: `${process.env.REACT_APP_FILE_URL}/app/pos/pos_logo.png`, // 分享图片
            url: `${this.getShareContentUrl(params.urlParams)}`, // 分享链接
        }).then((res) => {
            alert(JSON.stringify(res))
        })
    }
    componentDidMount() {
        disableBodyScroll(this.refs.reportContentBox) // 禁止body滚动
        const queryParams = new URLSearchParams(this.props.location.search)
        const tabsId = this.props.location.pathname.split('contrast/')[1]
        const type = Number(queryParams.get('type'))
        console.log(this.props.history.location.search)
        const memberId: any = queryParams.get('memberId')
        const isDlCoach = Number(queryParams.get('isDlCoach'))
        const isFromStudio = Number(queryParams.get('fromstudio'))
        const version = Number(queryParams.get('version'))
        const isshare = Number(queryParams.get('isshare'))
        const id1 = queryParams.get('id1')
        const id2 = queryParams.get('id2')
        this.setState({ id1, id2 })
        if (type === 0) {
            // 从报告页面跳转进来
            // 获取用户信息
            getUserInfos({
                memberId,
                isFromStudio,
                isshare,
            }).then((res: any) => {
                // 分享设置
                let pm = {
                    name: res.data.name,
                    grander: res.data.grander,
                    urlParams: { tabsId, memberId, isDlCoach, fromstudio: isFromStudio, version, isshare },
                }
                this.configRegisterShare(pm)
            })
        }
    }
    componentWillUnmount() {
        clearAllBodyScrollLocks() //释放body滚动
    }
    render() {
        const { type } = this.props.match.params
        const { userInfos } = this.props.reportStore
        return (
            <div className={ContrastStyle.App} ref='reportContentBox'>
                <UserInfos params={userInfos} />
                <div className={ContrastStyle.appContent}>{this.showPageFn(type)}</div>
            </div>
        )
    }
}
