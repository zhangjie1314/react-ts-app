// 动作评估详情组件
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BrStyle from './index.module.scss'
import down from '@assets/img/down.png'
import _ from 'lodash'

export default class BodyResult extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            params: [],
        }
    }
    static defaultProps = { bodyResultData: [] }
    static propType = { bodyResultData: PropTypes.array }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        if (!_.isEqual(nextProps.bodyResultData, prevState.params)) {
            return {
                params: nextProps.bodyResultData,
            }
        }
        return null
    }
    componentDidUpdate() {}
    // 点击节点
    clickDomFn(e: any, i: number) {
        let { params } = this.state
        params[i].isShow = !params[i].isShow
        this.setState({ params })
    }
    // 点击取消
    clickCancelFn = () => {}
    componentDidMount() {
        this.props.onRef('bodyResult', this)
    }
    render() {
        const { params } = this.state
        return params.length > 0 ? (
            <div className={BrStyle.resultBox}>
                <div className={BrStyle.h1}>{params.length}处肌肉可能激活过度，需放松</div>
                <div className={BrStyle.content}>
                    {params.map((el: any, idx: number) => {
                        return (
                            <div key={idx} className={BrStyle.el} onClick={(e) => this.clickDomFn(e, idx)}>
                                <div className={BrStyle.title}>
                                    <div className={BrStyle.lf}>
                                        <p className={BrStyle.dot}></p>
                                        <p>{el.tile}</p>
                                    </div>
                                    <img
                                        className={`${BrStyle.arrow} ${el.isShow === true ? BrStyle.down : BrStyle.up}`}
                                        src={down}
                                        alt=''
                                    />
                                </div>
                                <div className={`${BrStyle.text} ${el.isShow === true ? BrStyle.h100 : BrStyle.h0}`}>
                                    <p className={BrStyle.lf}>{el.cnetent.split('  ')[0]}</p>
                                    <p className={BrStyle.line}></p>
                                    <p className={BrStyle.rg}>{el.cnetent.split('  ')[1]}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        ) : (
            ''
        )
    }
}
