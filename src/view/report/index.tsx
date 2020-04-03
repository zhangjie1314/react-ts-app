import React from 'react'
import './index.scss'
import Infos from './components/infos/infos'
import { InfosRules } from '../../types/components/infos'
import { withRouter } from 'react-router-dom'

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
            }
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
        // const list: ListType[] = [
        //     {
        //         name: 'asdf',
        //         price: 0.1
        //     },
        //     {
        //         name: 'asdf',
        //         price: 0.1
        //     },
        //     {
        //         name: 'asdf',
        //         price: 0.1
        //     }
        // ]
        this.setState({
            infos
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
