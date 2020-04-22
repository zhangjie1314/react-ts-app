// 体测对比
import React from 'react'
import FCStyle from './index.module.scss'
// import PropTypes from 'prop-types'

import { FiancoRules } from '../../../types/components/fianco_contrast'

export default class FiancoContrast extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            isShow: false,
            fiancoArr: []
        }
    }
    static defaultProps = {
        // fiancoArr: []
    }
    static propType = {
        // fiancoArr: PropTypes.array
    }
    // 操作体侧对比
    handleDialogFn = () => {
        let isShow = this.state.isShow
        if (isShow) {
        }
        this.setState({
            isShow: !isShow
        })
    }
    // 选中
    selectFn(e: any, idx: number) {
        let fiancoArr: FiancoRules[] = this.state.fiancoArr
        let arr: any[] = []
        fiancoArr.forEach((el, idx) => {
            if (el.selected === 1) arr.push(String(idx))
        })
        if (arr.length > 1) {
            fiancoArr[Number(arr[0])].selected = 0
        }
        fiancoArr[idx].selected = fiancoArr[idx].selected === 1 ? 0 : 1
        this.setState({
            fiancoArr
        })
    }
    // 删除
    removeFn = () => {}
    // 开始对比
    beginContrast = () => {}
    // 页面渲染之前 将父的props传个子的state
    componentWillReceiveProps = (nextProps: any) => {
        this.setState({
            fiancoArr: nextProps.fiancoArr
        })
    }

    render() {
        let lg: number = this.state.fiancoArr.length
        let arr: FiancoRules[] = this.state.fiancoArr
        let times = arr.length > 0 ? arr[lg - 1].times : ''
        return (
            <div className={FCStyle.App}>
                <div className={FCStyle.head}>
                    <div className={FCStyle.text}>{`共${lg}次体测；最近体测时间：${times}`}</div>
                    <div className={FCStyle.btn} onClick={this.handleDialogFn}>
                        体测对比
                    </div>
                </div>
                <div
                    className={`${FCStyle.dialogMask}  ${this.state.isShow ? FCStyle.isShow : ''}`}
                    onClick={this.handleDialogFn}
                ></div>
                <div className={`${FCStyle.dialogContent} ${this.state.isShow ? FCStyle.upward : FCStyle.downward}`}>
                    <div className={FCStyle.hd}>
                        <span>{`选择对比的体侧数据（限${lg}组）`}</span>
                        <span className={FCStyle.closeBtn} onClick={this.handleDialogFn}>
                            x
                        </span>
                    </div>
                    <div className={FCStyle.bd}>
                        {this.state.fiancoArr.map((itm: FiancoRules, idx: number) => {
                            return (
                                <div key={idx} className={FCStyle.itm}>
                                    <div>{itm.times}</div>
                                    <div>
                                        体侧：<span className={FCStyle.fs40}>{itm.score}</span>分
                                    </div>
                                    <input
                                        onChange={(e) => this.selectFn(e, idx)}
                                        className={FCStyle.checkboxs}
                                        type='checkbox'
                                        checked={itm.selected === 0 ? false : true}
                                    />
                                </div>
                            )
                        })}
                        <div className={FCStyle.empBlock}></div>
                    </div>
                    <div className={FCStyle.footer}>
                        <div className={FCStyle.remove} onClick={this.removeFn}>
                            删除
                        </div>
                        <div className={FCStyle.confirm} onClick={this.beginContrast}>
                            开始对比
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
