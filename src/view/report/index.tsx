import React from 'react'
import './index.scss'
import Infos from './components/infos/infos'
import { InfosRules } from '../../types/components/infos'
import { withRouter } from 'react-router-dom'

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
            tabsIndex: 0
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
            weight: '120kg'
        }
        const tabs: tabsTyps[] = [
            { name: '完美围度', id: 0 },
            { name: '体适能评估', id: 1 },
            { name: '静态评估', id: 2 },
            { name: '运动评估', id: 3 },
            { name: '运动表现', id: 4 }
        ]
        this.setState({
            infos,
            tabs
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
        return (
            <div className='App'>
                <Infos params={this.state.infos}></Infos>
                <div className='tabsContain'>
                    <div className='tabs' onClick={this.changePage}>
                        {this.state.tabs.map((itm: tabsTyps, idx: number) => {
                            return (
                                <div className={`tab ${this.state.tabsIndex === idx ? 'active' : ''}`}>
                                    <p>{itm.name}</p>
                                    {this.state.tabsIndex === idx ? <p className='slip'></p> : null}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='appContent'>{selectComponents(this.state.tabsIndex)}</div>
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
