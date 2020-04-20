import React from 'react'
import { withRouter } from 'react-router-dom'

import ReportStyle from './index.module.scss'
import Infos from './components/infos/infos'
import PerfectCircumference from './perfect_circumference'
import { InfosRules } from '../../types/components/infos/infos'

interface tabsTyps {
    name?: string
    id?: number
}
class Report extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            infos: {
                img: '',
                name: '----',
                birthday: '----/--/--',
                sex: 0,
                height: '--cm',
                weight: '--kg',
            },
            tabs: [],
            tabsIndex: 0,
            circleData: [
                { name: '平衡', val: 100, index: 0, bgColor: '#242630', color: '#21b8c5' },
                { name: '敏捷', val: 100, index: 1, bgColor: '#242630', color: '#eab807' },
                { name: '力量', val: 50, index: 2, bgColor: '#242630', color: '#fe5d47' },
            ],
        }
    }
    /**
     * 切换tab
     */
    changePage = (idx: number) => {
        console.log(idx)
    }
    componentDidMount() {
        // 赋值用户信息
        const infos: InfosRules = {
            img: '',
            name: 'wayman',
            birthday: '1995/02/15',
            sex: 0,
            height: '175cm',
            weight: '120kg',
        }
        const tabs: tabsTyps[] = [
            { name: '完美围度', id: 0 },
            { name: '体适能评估', id: 1 },
            { name: '静态评估', id: 2 },
            { name: '运动评估', id: 3 },
            { name: '运动表现', id: 4 },
        ]
        this.setState({
            infos,
            tabs,
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
        }
    }
    render() {
        const { tabsIndex } = this.state
        return (
            <div className={ReportStyle.App}>
                <Infos params={this.state.infos}></Infos>
                <div className={ReportStyle.tabsContain}>
                    <div className={ReportStyle.tabs}>
                        {this.state.tabs.map((itm: tabsTyps, idx: number) => {
                            return (
                                <div
                                    key={idx}
                                    className={`${ReportStyle.tab} ${tabsIndex === idx ? ReportStyle.active : ''}`}
                                    onClick={this.changePage.bind(this, idx)}
                                >
                                    <p>{itm.name}</p>
                                    {tabsIndex === idx ? <p className={ReportStyle.slip}></p> : null}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={ReportStyle.appContent}>{this.showPageFun(tabsIndex)}</div>
            </div>
        )
    }
}

export default withRouter(Report)
