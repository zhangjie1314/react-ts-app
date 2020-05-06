// 对比结果页面
import React from 'react'
import { observer, inject } from 'mobx-react'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { createBrowserHistory } from 'history'
import UserInfos from '../../components/user_info'
import ContrastStyle from './index.module.scss'
import PerfectCircumference from './components/perfect_circumference'
import ActionEvaluation from './components/action_evaluation'
import BodyComposition from './components/body_composition'
import FitnessAssessment from './components/fitness_assessment'
import StaticEvaluation from './components/static_evaluation'
import AthleticPerformance from './components/athletic_performance'

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
        }
    }
    // 显示对应的页面
    showPageFn(type: string) {
        const { params } = this.state.params
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
                return <BodyComposition params={params} />
            default:
                // 人体成分
                return <BodyComposition params={params} />
        }
    }
    componentDidMount() {
        disableBodyScroll(this.refs.reportContentBox) // 禁止body滚动
    }
    componentWillUnmount() {
        clearAllBodyScrollLocks() //释放body滚动
    }
    render() {
        const { type } = this.props.match.params
        console.log()
        const { userInfos } = this.props.reportStore
        return (
            <div className={ContrastStyle.App} ref='reportContentBox'>
                <UserInfos params={userInfos} />
                <div className={ContrastStyle.appContent}>{this.showPageFn(type)}</div>
            </div>
        )
    }
}
