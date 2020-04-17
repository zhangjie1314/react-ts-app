import React from 'react'
import { withRouter } from 'react-router-dom'

import ReportStyle from './index.module.scss'
import Infos from './components/infos/infos'
import PerfectGirth from './components/perfect_girth/perfect_girth'

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
                weight: '--kg'
            },
            tabs: [],
            tabsIndex: 0,
            chartData: [
                {
                    time: '04.14\n08:01',
                    grade: 40,
                    sort: 0,
                    type: 2,
                },
                {
                    time: '04.14\n08:02',
                    grade: 56,
                    sort: 1,
                    type: 2,
                },
                {
                    time: '04.14\n08:03',
                    grade: 43,
                    sort: 2,
                    type: 2,
                },
                {
                    time: '04.14\n08:04',
                    grade: 60,
                    sort: 3,
                    type: 2,
                },
                {
                    time: '04.14\n08:05',
                    grade: 58,
                    sort: 4,
                    type: 2,
                },
            ],
        }
    }
    // 选择组件tab
    selectComponents = (type: number) => {
        switch (type) {
            // 完美围度
            case 0:
                return <PerfectGirth></PerfectGirth>
            // 体适能评估
            case 1:
                return <div>1</div>
            case 2:
                return <div>2</div>
            case 3:
                return <div>3</div>
            case 4:
                return <div>4</div>
            default:
                return <div>没有这路由</div>
        }
    }
    changePage = () => {
        // let { history } = this.props
        // console.log(history)
        // history.push({ pathname: '/about' })
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
    render() {
        const { chartData } = this.state
        return (
            <div className={ReportStyle.App}>
                <Infos params={this.state.infos}></Infos>
                <div className={ReportStyle.tabsContain}>
                    <div className={ReportStyle.tabs} onClick={this.changePage}>
                        {this.state.tabs.map((itm: tabsTyps, idx: number) => {
                            return (
                                <div
                                    key={idx}
                                    className={`${ReportStyle.tab} ${
                                        this.state.tabsIndex === idx ? ReportStyle.active : ''
                                    }`}
                                >
                                    <p>{itm.name}</p>
                                    {this.state.tabsIndex === idx ? <p className={ReportStyle.slip}></p> : null}
                                </div>
                            )
                        })}
                    </div>
                </div>
<<<<<<< HEAD
                <div className={ReportStyle.appContent}>{this.selectComponents(this.state.tabsIndex)}</div>
=======
                <div className={ReportStyle.appContent}>
                    <PosCharts chartId='one-chart' chartData={chartData} />
                </div>
                {/* <div className={ReportStyle.appContent}>{selectComponents(this.state.tabsIndex)}</div> */}
                {/* <div className='classItems' onClick={this.changePage}>
                    {list.map((itm: ListType, idx: number) => {
                        return <ClassItem key={idx} name={itm.name} />
                    })}
                </div> */}
>>>>>>> cae16b6998eaeb9b639e42638d6686504b795ff4
                {/* <NavLink
                    to='/about'
                    activeStyle={{
                        fontWeight: 'bold',
                        color: 'green'
                    }}
                ></NavLink>
               <Prompt message='你确定要离开当前页面吗？' when={true}></Prompt>
               <Router>
                    <Route path='/about' component={About} />
                </Router> */}
            </div>
        )
    }
}

export default withRouter(Report)
