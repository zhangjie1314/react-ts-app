import React, { Component } from 'react'
import ReportStyle from './index.module.scss'
import UserInfos from '../components/user_info'
import PerfectCircumference from './components/perfect_circumference'
import { InfosRules } from '../../types/components/infos'
import BodyComposition from './components/body_composition'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

interface tabsTyps {
    name?: string
    id: number
}
export default class Report extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            infos: {
                img: '',
                name: '----',
                birthday: '----/--/--',
                sex: 0,
                height: '--cm',
                weight: '--kg'
            },
            tabs: [],
            tabsId: 0,
            circleData: [
                { name: '平衡', val: 100, index: 0, bgColor: '#242630', color: '#21b8c5' },
                { name: '敏捷', val: 100, index: 1, bgColor: '#242630', color: '#eab807' },
                { name: '力量', val: 50, index: 2, bgColor: '#242630', color: '#fe5d47' }
            ]
        }
    }
    /**
     * 切换tab
     */
    changePage = (id: number) => {
        console.log(id)
        this.setState({ tabsId: id })
    }
    componentDidMount() {
        disableBodyScroll(this.refs.reportContentBox) // 禁止body滚动
        // 获取路由参数
        const tabsId = Number(this.props.match.params.type) === 99 ? 6 : Number(this.props.match.params.type)
        // 赋值用户信息
        const infos: InfosRules = {
            img: '',
            name: 'wayman',
            birthday: '1995/02/15',
            sex: 0,
            height: '175cm',
            weight: '120kg'
        }
        const tabs: tabsTyps[] = [
            { name: '人体成分', id: 6 },
            { name: '完美围度', id: 0 },
            { name: '体适能评估', id: 1 },
            { name: '静态评估', id: 2 },
            { name: '运动评估', id: 3 },
            { name: '运动表现', id: 4 }
        ]
        this.setState({
            infos,
            tabs,
            tabsId
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
                return <div>1</div>
            case 2:
                return <div>2</div>
            case 3:
                return <div>3</div>
            case 4:
                return <div>4</div>
            case 6:
                return <BodyComposition />
        }
    }
    componentWillUnmount() {
        clearAllBodyScrollLocks() //释放body滚动
    }
    render() {
        const { tabsId } = this.state
        return (
            <div className={ReportStyle.App}>
                <UserInfos params={this.state.UserInfos} />
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
