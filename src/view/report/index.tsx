import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import Dayjs from 'dayjs'
import { getTestListByBapp } from '../../apis/report/bapp'
import { getTestListByStudio } from '../../apis/report/studio'
import { ChartItemRules } from '../../types/components/pos_charts'
import { FiancoRules } from '../../types/components/fianco_contrast'
import { setRegisterShare } from '../../utils/register_share'
import { getUserInfos } from '../../utils/get_user_info'
import ReportStyle from './index.module.scss'
import UserInfos from '../components/user_info'
import PerfectCircumference from './components/perfect_circumference'
import BodyComposition from './components/body_composition'
import FitnessAssessment from './components/fitness_assessment'
import StaticEvaluation from './components/static_evaluation'
import AthleticPerformance from './components/athletic_performance'

interface tabsTyps {
    name?: string
    id: number
}

@inject('reportStore')
@observer
export default class Report extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            tabs: [],
            tabsId: 0,
            chartData: [],
            fiancoData: [],
            circleData: [
                { name: '平衡', val: 100, index: 0, bgColor: '#242630', color: '#21b8c5' },
                { name: '敏捷', val: 100, index: 1, bgColor: '#242630', color: '#eab807' },
                { name: '力量', val: 50, index: 2, bgColor: '#242630', color: '#fe5d47' },
            ],
        }
    }
    // 获取体侧数据
    getFiancoContrastData = () => {
        const { memberId, coachId, tabsId } = this.props.reportStore
        getTestListByBapp({
            types: tabsId + 1, // 1.围度，2.运动表现 3.体态测试，4.动态表现 5体适能表现 6人体成分测试
            coachId: coachId ? coachId : '',
            memberId: memberId,
            pageNum: 1,
            pageSize: 999,
        }).then(res => {
            // 处理测试列表数据
            this.handleTestListData(res.data.records)
        })
    }
    // 处理测试列表数据
    handleTestListData(data: any) {
        const testList: ChartItemRules[] = []
        const fiancoData: FiancoRules[] = []
        data.forEach((itm: any, idx: number) => {
            // 图表数据
            testList.push({
                time: Dayjs(itm.timeLong).format('MM.DD'),
                grade: itm.grade,
                sort: idx,
                type: itm.type,
                id: itm.wdId,
            })
            // 对比数据
            fiancoData.push({
                id: itm.wdId,
                times: Dayjs(itm.timeLong).format('YYYY年MM月DD日'),
                score: itm.grade,
                selected: 0,
            })
        })
        this.setState({
            chartData: testList,
            fiancoData,
        })
    }
    // 切换tab
    changePage = (id: number) => {
        this.props.history.replace({ pathname: `/report/${id}`, search: this.props.history.location.search })
        this.props.reportStore.setTabsId(id)
        this.setState({ tabsId: id })
        this.getFiancoContrastData()
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
        }).then(res => {
            alert(JSON.stringify(res))
        })
    }
    componentDidMount() {
        // 禁止body滚动
        disableBodyScroll(this.refs.reportContentBox)
        // 获取url query 参数
        const queryParams = new URLSearchParams(this.props.location.search)
        // 获取菜单ID
        const tabsId = Number(this.props.match.params.type) === 99 ? 5 : Number(this.props.match.params.type)
        this.props.reportStore.setTabsId(tabsId)
        // 获取会员ID
        this.props.reportStore.setMemberId(queryParams.get('memberId'))
        // 获取是否为独立教练
        this.props.reportStore.setIsDlCoach(Number(queryParams.get('isDlCoach')))
        // 获取教练ID
        this.props.reportStore.setCoachId(queryParams.get('coachId'))
        // 获取当前是否为分享打开的页面
        this.props.reportStore.setIsShare(Number(queryParams.get('isshare')))
        // 获取当前是否为工作室
        this.props.reportStore.setIsFromStudio(Number(queryParams.get('fromstudio')))
        // 获取当前版本
        this.props.reportStore.setVersion(queryParams.get('version'))
        const tabs: tabsTyps[] = [
            { name: '人体成分', id: 5 },
            { name: '完美围度', id: 0 },
            { name: '体适能评估', id: 4 },
            { name: '静态评估', id: 2 },
            { name: '运动评估', id: 3 },
            { name: '运动表现', id: 1 },
        ]
        // 获取用户信息
        getUserInfos({
            memberId: this.props.reportStore.memberId,
            isFromStudio: this.props.reportStore.isFromStudio,
            isshare: this.props.reportStore.isShare,
        }).then((res: any) => {
            // 设置用户信息
            this.props.reportStore.setUserInfos(res.data)
            // 分享设置
            let pm = {
                name: res.data.name,
                grander: res.data.grander,
                urlParams: {
                    tabsId,
                    memberId: this.props.reportStore.memberId,
                    isDlCoach: this.props.reportStore.isDlCoach,
                    fromstudio: this.props.reportStore.fromstudio,
                    version: this.props.reportStore.version,
                    isshare: this.props.reportStore.isshare,
                },
            }
            this.configRegisterShare(pm)
        })
        this.getFiancoContrastData()
        this.setState({
            tabs,
            tabsId,
        })
    }
    /**
     * 根据tab值显示对应页面
     */
    showPageFun(curPage: any) {
        switch (curPage) {
            case 0: // 完美围度
                return <PerfectCircumference />
            case 1:
                return <AthleticPerformance />
            case 2:
                return <StaticEvaluation />
            case 3:
                return <div>3</div>
            case 4:
                return <FitnessAssessment />
            case 5:
                return <BodyComposition chartData={this.state.chartData} fiancoData={this.state.fiancoData} />
            default:
                return <BodyComposition />
        }
    }
    componentWillUnmount() {
        clearAllBodyScrollLocks() //释放body滚动
    }
    render() {
        const { tabsId, userInfos } = this.props.reportStore
        return (
            <div className={ReportStyle.App}>
                <UserInfos params={userInfos} />
                <div className={ReportStyle.tabsContain}>
                    <div className={ReportStyle.tabs}>
                        {this.state.tabs.map((itm: tabsTyps, idx: number) => {
                            return (
                                <div
                                    key={idx}
                                    className={`${ReportStyle.tab} ${tabsId === itm.id ? ReportStyle.active : ''}`}
                                    onClick={this.changePage.bind(this, itm.id)}
                                >
                                    <p>{itm.name}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={ReportStyle.appContent} ref='reportContentBox'>
                    {this.showPageFun(tabsId)}
                </div>
            </div>
        )
    }
}
