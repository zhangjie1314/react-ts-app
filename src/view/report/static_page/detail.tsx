import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import StaticDetailPageStyle from './index.module.scss'
import DataItem from '../components/static_evaluation/components/data_item'

class StaticDetail extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            pageData: {},
        }
    }
    componentDidMount() {
        // 获取本地数据(刷新页面使用)
        const localPageData = sessionStorage.getItem('staticDetailData')
            ? JSON.parse(sessionStorage.getItem('staticDetailData') as string)
            : ''
        if (!localPageData) {
            // 获取 路由 state 参数
            const pageData = this.props.location.state
            // 存储一份到本地
            sessionStorage.setItem('staticDetailData', JSON.stringify(pageData))
            // 存储到 state
            this.setState({
                pageData,
            })
        } else {
            // 存储到 state
            this.setState({
                pageData: localPageData,
            })
        }
    }
    componentWillUnmount() {
        sessionStorage.removeItem('staticDetailData')
    }
    render() {
        const { pageData } = this.state
        const item = pageData.data ? pageData.data : {}
        return (
            <div className={StaticDetailPageStyle['detail-box']}>
                <DataItem level={pageData.level} dataItem={item} from='detail' />
                <div className={StaticDetailPageStyle['title']}>问题描述</div>
                <div className={StaticDetailPageStyle['content']}>{item.description || '无'}</div>
                <div className={StaticDetailPageStyle['title']}>导致问题</div>
                <div className={StaticDetailPageStyle['content']}>{item.possibleConsequences || '无'}</div>
                <div className={StaticDetailPageStyle['title']}>建议</div>
                <div className={StaticDetailPageStyle['content']}>{item.proposal || '无'}</div>
            </div>
        )
    }
}

export default withRouter(StaticDetail)
