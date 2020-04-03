import React from 'react'
// import { fetchPost } from '../../utils/request'
// import logo from '../../logo.svg'
import ReportStyle from './index.module.scss'
import ClassItem from '../components/classItem'
// import { BrowserRouter as Router, Route, NavLink, Prompt } from 'react-router-dom'
// import About from '../../view/about/index'
import { withRouter } from 'react-router-dom'
interface ListType {
    name?: string
    price?: number
}

class Home extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            list: []
        }
    }
    changePage = () => {
        let { history } = this.props
        console.log(history)
        history.push({ pathname: '/about' })
    }
    componentDidMount() {
        const list: ListType[] = [
            {
                name: 'asdf',
                price: 0.1
            },
            {
                name: 'asdf',
                price: 0.1
            },
            {
                name: 'asdf',
                price: 0.1
            }
        ]
        this.setState({
            list: list
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
        let list = this.state.list
        return (
            <div className={ReportStyle.App}>
                <div className={ReportStyle.ClassItems} onClick={this.changePage}>
                    {list.map((itm: ListType, idx: number) => {
                        return <ClassItem key={idx} name={itm.name} />
                    })}
                </div>
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

export default withRouter(Home)
