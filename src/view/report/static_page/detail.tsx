import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import StaticDetailPageStyle from './index.module.scss'

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
                <div className={StaticDetailPageStyle['data-item']}>
                    <div className={StaticDetailPageStyle['item-top-box']}>
                        <div className={StaticDetailPageStyle['itb-title']}>{item.partName}</div>
                        <div className={StaticDetailPageStyle['itb-inline-box']}>
                            {item.photoImg ? (
                                <img className={StaticDetailPageStyle['comp-img']} src={item.photoImg} alt='原图' />
                            ) : null}
                            <img className={StaticDetailPageStyle['comp-img']} src={item.img} alt='标准图' />
                            <div className={StaticDetailPageStyle['itb-data-box']}>
                                <div className={StaticDetailPageStyle['itbd-line']}>
                                    <div
                                        className={`${StaticDetailPageStyle['il-item']} ${
                                            pageData.level === '正常' ? StaticDetailPageStyle['il-selected-zc'] : ''
                                        }`}
                                    >
                                        <div className={StaticDetailPageStyle['ii-line']}>
                                            {pageData.level === '正常' ? (
                                                <div className={StaticDetailPageStyle['ii-cur-val']}>{item.angle}</div>
                                            ) : null}
                                        </div>
                                        <div className={StaticDetailPageStyle['ii-txt']}>正常</div>
                                    </div>
                                    <div
                                        className={`${StaticDetailPageStyle['il-item']} ${
                                            pageData.level === '轻微' ? StaticDetailPageStyle['il-selected-qw'] : ''
                                        }`}
                                    >
                                        <div className={StaticDetailPageStyle['ii-line']}>
                                            {pageData.level === '轻微' ? (
                                                <div className={StaticDetailPageStyle['ii-cur-val']}>{item.angle}</div>
                                            ) : null}
                                        </div>
                                        <div className={StaticDetailPageStyle['ii-txt']}>轻微</div>
                                    </div>
                                    <div
                                        className={`${StaticDetailPageStyle['il-item']} ${
                                            pageData.level === '中度' ? StaticDetailPageStyle['il-selected-zdu'] : ''
                                        }`}
                                    >
                                        <div className={StaticDetailPageStyle['ii-line']}>
                                            {pageData.level === '中度' ? (
                                                <div className={StaticDetailPageStyle['ii-cur-val']}>{item.angle}</div>
                                            ) : null}
                                        </div>
                                        <div className={StaticDetailPageStyle['ii-txt']}>中度</div>
                                    </div>
                                    <div
                                        className={`${StaticDetailPageStyle['il-item']} ${
                                            pageData.level === '重度' ? StaticDetailPageStyle['il-selected-zd'] : ''
                                        }`}
                                    >
                                        <div className={StaticDetailPageStyle['ii-line']}>
                                            {pageData.level === '重度' ? (
                                                <div className={StaticDetailPageStyle['ii-cur-val']}>{item.angle}</div>
                                            ) : null}
                                        </div>
                                        <div className={StaticDetailPageStyle['ii-txt']}>重度</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
