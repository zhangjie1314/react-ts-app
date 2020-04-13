import React from 'react'
import ReportStyle from './index.module.scss'
import Infos from './components/infos/infos'
import { InfosRules } from '../../types/components/infos'
import { withRouter } from 'react-router-dom'
import PosCharts from './components/pos_charts'

interface tabsTyps {
    name?: string
    id?: number
}

function selectComponents(type: number) {
    switch (type) {
        // 完美围度
        case 0:
            return <div>0</div>
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
class Report extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            infos: {
                // img: '',
                // name: '----',
                // birthday: '----/--/--',
                // sex: 0,
                // height: '--cm',
                // weight: '--kg'
            },
            tabs: [],
            tabsIndex: 0,
            chartData: [
                {
                    wdId: 'e9d5ec4160bc4880aa0f953868c935ec',
                    day: '2019年07月24日',
                    timeLong: 1563937272000,
                    time: '11时01分',
                    name: null,
                    headPath: null,
                    grade: 54,
                    gender: null,
                    type: 1,
                    ydId: null,
                    dtId: null,
                    tyId: null,
                    tnId: null,
                    cfId: null,
                    memberId: 'a1981a7429ed4257beaa7f8204b9a9d3',
                    count: null,
                    weight: null,
                    sort: 0,
                },
                {
                    wdId: 'f2c2c86cf40a4a1383c7e308eab48d5f',
                    day: '2019年07月16日',
                    timeLong: 1563264851000,
                    time: '12时14分',
                    name: null,
                    headPath: null,
                    grade: 22,
                    gender: null,
                    type: 1,
                    ydId: null,
                    dtId: null,
                    tyId: null,
                    tnId: null,
                    cfId: null,
                    memberId: 'a1981a7429ed4257beaa7f8204b9a9d3',
                    count: null,
                    weight: null,
                    sort: 1,
                },
                {
                    wdId: 'f2c2c86cf40a4a1383c7e308eab48d5f',
                    day: '2019年07月16日',
                    timeLong: 1563264853000,
                    time: '13时14分',
                    name: null,
                    headPath: null,
                    grade: 15,
                    gender: null,
                    type: 1,
                    ydId: null,
                    dtId: null,
                    tyId: null,
                    tnId: null,
                    cfId: null,
                    memberId: 'a1981a7429ed4257beaa7f8204b9a9d3',
                    count: null,
                    weight: null,
                    sort: 2,
                },
                {
                    wdId: 'f2c2c86cf40a4a1383c7e308eab48d5f',
                    day: '2019年07月16日',
                    timeLong: 1563264858003,
                    time: '14时14分',
                    name: null,
                    headPath: null,
                    grade: 10,
                    gender: null,
                    type: 1,
                    ydId: null,
                    dtId: null,
                    tyId: null,
                    tnId: null,
                    cfId: null,
                    memberId: 'a1981a7429ed4257beaa7f8204b9a9d3',
                    count: null,
                    weight: null,
                    sort: 3,
                },
                {
                    wdId: 'f2c2c86cf40a4a1383c7e308eab48d5f',
                    day: '2019年07月16日',
                    timeLong: 1563264858003,
                    time: '15时14分',
                    name: null,
                    headPath: null,
                    grade: 10,
                    gender: null,
                    type: 1,
                    ydId: null,
                    dtId: null,
                    tyId: null,
                    tnId: null,
                    cfId: null,
                    memberId: 'a1981a7429ed4257beaa7f8204b9a9d3',
                    count: null,
                    weight: null,
                    sort: 3,
                },
                {
                    wdId: 'f2c2c86cf40a4a1383c7e308eab48d5f',
                    day: '2019年07月16日',
                    timeLong: 1563264858003,
                    time: '16时14分',
                    name: null,
                    headPath: null,
                    grade: 10,
                    gender: null,
                    type: 1,
                    ydId: null,
                    dtId: null,
                    tyId: null,
                    tnId: null,
                    cfId: null,
                    memberId: 'a1981a7429ed4257beaa7f8204b9a9d3',
                    count: null,
                    weight: null,
                    sort: 3,
                },
                {
                    wdId: 'f2c2c86cf40a4a1383c7e308eab48d5f',
                    day: '2019年07月16日',
                    timeLong: 1563264858003,
                    time: '17时14分',
                    name: null,
                    headPath: null,
                    grade: 10,
                    gender: null,
                    type: 1,
                    ydId: null,
                    dtId: null,
                    tyId: null,
                    tnId: null,
                    cfId: null,
                    memberId: 'a1981a7429ed4257beaa7f8204b9a9d3',
                    count: null,
                    weight: null,
                    sort: 3,
                },
                {
                    wdId: 'f2c2c86cf40a4a1383c7e308eab48d5f',
                    day: '2019年07月16日',
                    timeLong: 1563264858003,
                    time: '18时14分',
                    name: null,
                    headPath: null,
                    grade: 10,
                    gender: null,
                    type: 1,
                    ydId: null,
                    dtId: null,
                    tyId: null,
                    tnId: null,
                    cfId: null,
                    memberId: 'a1981a7429ed4257beaa7f8204b9a9d3',
                    count: null,
                    weight: null,
                    sort: 3,
                },
                {
                    wdId: 'f2c2c86cf40a4a1383c7e308eab48d5f',
                    day: '2019年07月16日',
                    timeLong: 1563264858003,
                    time: '19时14分',
                    name: null,
                    headPath: null,
                    grade: 10,
                    gender: null,
                    type: 1,
                    ydId: null,
                    dtId: null,
                    tyId: null,
                    tnId: null,
                    cfId: null,
                    memberId: 'a1981a7429ed4257beaa7f8204b9a9d3',
                    count: null,
                    weight: null,
                    sort: 3,
                },
                {
                    wdId: 'f2c2c86cf40a4a1383c7e308eab48d5f',
                    day: '2019年07月16日',
                    timeLong: 1563264858003,
                    time: '20时14分',
                    name: null,
                    headPath: null,
                    grade: 10,
                    gender: null,
                    type: 1,
                    ydId: null,
                    dtId: null,
                    tyId: null,
                    tnId: null,
                    cfId: null,
                    memberId: 'a1981a7429ed4257beaa7f8204b9a9d3',
                    count: null,
                    weight: null,
                    sort: 3,
                },
                {
                    wdId: 'f2c2c86cf40a4a1383c7e308eab48d5f',
                    day: '2019年07月16日',
                    timeLong: 1563264858003,
                    time: '21时14分',
                    name: null,
                    headPath: null,
                    grade: 10,
                    gender: null,
                    type: 1,
                    ydId: null,
                    dtId: null,
                    tyId: null,
                    tnId: null,
                    cfId: null,
                    memberId: 'a1981a7429ed4257beaa7f8204b9a9d3',
                    count: null,
                    weight: null,
                    sort: 3,
                },
            ],
        }
    }
    changePage = () => {
        // let { history } = this.props
        // console.log(history)
        // history.push({ pathname: '/about' })
    }
    componentDidMount() {
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
    // handleClick = () => {
    //     fetchPost('/community/cpDynamicList', {
    //         cpAreaId: '473f8abe917448d98d993d806bd37666',
    //         pageSize: 10
    //     })
    //         .then(res => {
    //             this.setState()
    //             console.log(res)
    //         })
    //         .catch(res => {
    //             console.log(res)
    //         })
    // }
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
                <div className={ReportStyle.appContent}>
                    <PosCharts chartId='one-chart' chartData={chartData} />
                </div>
                {/* <div className={ReportStyle.appContent}>{selectComponents(this.state.tabsIndex)}</div> */}
                {/* <div className='classItems' onClick={this.changePage}>
                    {list.map((itm: ListType, idx: number) => {
                        return <ClassItem key={idx} name={itm.name} />
                    })}
                </div> */}
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
