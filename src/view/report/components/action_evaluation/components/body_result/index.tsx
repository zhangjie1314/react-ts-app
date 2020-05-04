// 动作评估详情组件
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BrStyle from './index.module.scss'
import down from '@assets/img/down.png'

export default class BodyResult extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {}
    }
    static defaultProps = { params: {} }
    static propType = { params: PropTypes.object }
    // 点击节点
    clickDomFn(e: any, obj: any, idx: number, type: string) {
        e.stopPropagation()
        const { bodyResultData } = this.props
        // let { frontIdx, backIdx, mascles, masclesIdx, isShow } = this.state

        // this.setState({ frontIdx, backIdx, mascles, masclesIdx, isShow })
    }
    // 点击取消
    clickCancelFn = () => {
        // this.setState({ isShow: null, frontIdx: null, backIdx: null, masclesIdx: 0, mascles: [] })
    }
    componentDidMount() {
        this.props.onRef('bodyResult', this)
    }
    render() {
        const { bodyResultData } = this.props
        return bodyResultData.length > 0 ? (
            <div className={BrStyle.resultBox}>
                <div className={BrStyle.h1}>{bodyResultData.length}处肌肉可能激活过度，需放松</div>
                <div className={BrStyle.content}>
                    {bodyResultData.map((el: any, idx: number) => {
                        return (
                            <div key={idx} className={BrStyle.el} onClick={() => this.clickDomFn}>
                                <div className={BrStyle.title}>
                                    <div className={BrStyle.lf}>
                                        <p className={BrStyle.dot}></p>
                                        <p>{el.tile}</p>
                                    </div>
                                    <img className={BrStyle.arrow} src={down} alt='' />
                                </div>
                                <div className={BrStyle.text}>
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
