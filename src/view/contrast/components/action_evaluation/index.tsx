// 动作评估
import React, { Component } from 'react'
import _ from 'lodash'

import { getActionEvaluationInfo } from '@apis/report/bapp'
import AeStyle from './index.module.scss'
import bg from '@assets/img/time_bg.png'

export default class ActionEvaluation extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            id1: '',
            id2: '',
            time1: '',
            time2: '',
            gdjh: [], // 过度激活
            jhbz: [], // 激活不足
            zlhl: [], // 指令混乱
        }
    }
    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        return {
            id1: nextProps.id1,
            id2: nextProps.id2,
        }
    }
    componentDidUpdate(prevProps: any, prevState: any) {
        if (!_.isEqual(prevState.id1, this.state.id1)) {
            this.getPageInfo()
        }
    }
    // 获取页面数据
    async getPageInfo() {
        const { id1, id2 } = this.state
        const info1 = await getActionEvaluationInfo({
            dtId: id1,
        })
        const info2 = await getActionEvaluationInfo({
            dtId: id2,
        })
        this.handleData(info1.data, info2.data)
    }
    // 循环数组
    private forArrFn(arr1: any, arr2: any) {
        let res: any = []
        arr1.forEach((el: any) => {
            res.push({ t1: el.tile, t2: '-' })
        })
        for (let x = 0; x < arr2.length; x++) {
            for (let y = 0; y < res.length; y++) {
                if (arr2[x].tile === res[y].t1) {
                    res[y].t2 = arr2[x].tile
                    break
                }
            }
            res.push({ t1: '-', t2: arr2[x].tile })
        }
        return res
    }
    // 数据处理
    handleData(info1: any, info2: any) {
        const r1 = info1
        const r2 = info2
        let { time1, time2, gdjh, jhbz, zlhl } = this.state
        time1 = r1.date.split('年')[1]
        time2 = r2.date.split('年')[1]
        gdjh = this.forArrFn(r1.jhgdDate, r2.jhgdDate)
        jhbz = this.forArrFn(r1.jhbzDate, r2.jhbzDate)
        zlhl = this.forArrFn(r1.jhhlDate, r2.jhhlDate)
        this.setState({ time1, time2, gdjh, jhbz, zlhl })
    }
    render() {
        const { time1, time2, gdjh, jhbz, zlhl } = this.state
        return (
            <div className={AeStyle.wrapper}>
                <div className={AeStyle.head}>动作评估报告</div>
                {/* <div className={AeStyle.title}>数据对比</div> */}
                <div className={AeStyle.time}>
                    <div className={AeStyle.tImg}>
                        <img src={bg} alt='' />
                        <span>{time1}</span>
                    </div>
                    <div className={AeStyle.tImg}>
                        <img src={bg} alt='' />
                        <span>{time2}</span>
                    </div>
                </div>
                {/* 过度激活 */}
                {gdjh.length > 0 ? (
                    <div className={`${AeStyle.list}`}>
                        <div className={`${AeStyle.h3} ${AeStyle.redBg}`}>过度激活</div>
                        <div className={`${AeStyle.content}`}>
                            <div className={AeStyle.mLine}></div>
                            {gdjh.map((el: any, idx: number) => {
                                return (
                                    <div key={idx} className={AeStyle.item}>
                                        <div className={el.t1 === '-' ? AeStyle.whiteLine : ''}>
                                            <span></span>
                                            {el.t1 === '-' ? '' : el.t1}
                                        </div>
                                        <div className={AeStyle.borderDashed}></div>
                                        <div className={el.t2 === '-' ? AeStyle.whiteLine : ''}>
                                            <span></span>
                                            {el.t2 === '-' ? '' : el.t2}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ) : (
                    ''
                )}
                {/* 激活不足 */}
                {jhbz.length > 0 ? (
                    <div className={`${AeStyle.list}`}>
                        <div className={`${AeStyle.h3} ${AeStyle.yellowBg}`}>激活不足</div>
                        <div className={`${AeStyle.content}`}>
                            <div className={AeStyle.mLine}></div>
                            {jhbz.map((el: any, idx: number) => {
                                return (
                                    <div key={idx} className={AeStyle.item}>
                                        <div className={el.t1 === '-' ? AeStyle.whiteLine : ''}>
                                            <span></span>
                                            {el.t1 === '-' ? '' : el.t1}
                                        </div>
                                        <div className={AeStyle.borderDashed}></div>
                                        <div className={el.t2 === '-' ? AeStyle.whiteLine : ''}>
                                            <span></span>
                                            {el.t2 === '-' ? '' : el.t2}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ) : (
                    ''
                )}
                {/* 指令混乱 */}
                {zlhl.length > 0 ? (
                    <div className={`${AeStyle.list}`}>
                        <div className={`${AeStyle.h3} ${AeStyle.orangeBg}`}>指令混乱</div>
                        <div className={`${AeStyle.content}`}>
                            <div className={AeStyle.mLine}></div>
                            {zlhl.map((el: any, idx: number) => {
                                return (
                                    <div key={idx} className={AeStyle.item}>
                                        <div className={el.t1 === '-' ? AeStyle.whiteLine : ''}>
                                            <span></span>
                                            {el.t1 === '-' ? '' : el.t1}
                                        </div>
                                        <div className={AeStyle.borderDashed}></div>
                                        <div className={el.t2 === '-' ? AeStyle.whiteLine : ''}>
                                            <span></span>
                                            {el.t2 === '-' ? '' : el.t2}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
        )
    }
}
