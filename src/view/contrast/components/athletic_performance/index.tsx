// 静态评估
import React, { Component } from 'react'
import _ from 'lodash'
import Dayjs from 'dayjs'
import { getActionPerformanceResult } from '@apis/report/bapp'
import hd from './handleData'
import SeStyle from './index.module.scss'
import bg from '@assets/img/time_bg.png'
import up from '@assets/img/up_icon.png'
import down from '@assets/img/dow_icon.png'
export default class StaticEvaluation extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            id1: '',
            id2: '',
            staticGradeObj: [],
            time1: '',
            time2: '',
            paramsArr: [], // 包含 力量类 敏捷类 柔韧类 平衡类
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
        const info1 = await getActionPerformanceResult({
            wdId: id1,
        })
        const info2 = await getActionPerformanceResult({
            wdId: id2,
        })
        this.handleData(info1.data, info2.data)
    }

    // 处理列表数据
    private handleParams(type: string, d1: any, d2: any) {
        let list: any = []
        switch (type) {
            case '力量类':
                list = hd.handleStrength(d1, d2)
                break
            case '敏捷类':
                list = hd.handleQuick(d1, d2)
                break
            case '柔韧类':
                list = hd.handleFlexible(d1, d2)
                break
            case '平衡类':
                list = hd.handleBalance(d1, d2)
                break
        }
        return { title: type, list }
    }
    // 处理数据
    handleData(info1: any, info2: any) {
        let { staticGradeObj, time1, time2, paramsArr } = this.state
        const d1 = info1.ydbxVO
        const d2 = info2.ydbxVO
        staticGradeObj.push(
            { grade: d1.grade, time: Dayjs(d1.day).format('YYYY.MM.DD HH:mm') },
            { grade: d2.grade, time: Dayjs(d2.day).format('YYYY.MM.DD HH:mm') }
        )
        time1 = Dayjs(d1.day).format('MM月DD日HH:mm')
        time2 = Dayjs(d1.day).format('MM月DD日HH:mm')
        // 处理力量类数据
        let st = this.handleParams('力量类', d1, d2)
        if (st.list && !_.isEmpty(st.list)) paramsArr.push(st)
        // 处理敏捷类数据
        let qu = this.handleParams('敏捷类', d1, d2)
        if (qu.list && !_.isEmpty(qu.list)) paramsArr.push(qu)
        // 处理敏捷类数据
        let fl = this.handleParams('柔韧类', d1, d2)
        if (fl.list && !_.isEmpty(fl.list)) paramsArr.push(fl)
        // 处理平衡类数据
        let ba = this.handleParams('平衡类', d1, d2)
        if (ba.list && !_.isEmpty(ba.list)) paramsArr.push(ba)

        this.setState({ staticGradeObj, time1, time2, paramsArr })
    }

    render() {
        const { staticGradeObj, time1, time2, paramsArr } = this.state
        return (
            <div className={SeStyle.wrapper}>
                {/* 运动表现得分 */}
                <div className={SeStyle.title}>运动表现得分</div>
                <div className={SeStyle.head}>
                    {staticGradeObj.length > 0
                        ? staticGradeObj.map((el: any, idx: number) => {
                              return (
                                  <div className={SeStyle.grade} key={idx}>
                                      <div className={SeStyle.hd}>
                                          <div className={SeStyle.gd}>{el.grade}</div>
                                          <div className={SeStyle.unit}>分</div>
                                      </div>
                                      <div className={SeStyle.time}>{el.time}</div>
                                  </div>
                              )
                          })
                        : ''}
                </div>
                {/* 数据对比 */}
                <div className={SeStyle.title}>数据对比</div>
                <div className={SeStyle.times}>
                    <div className={SeStyle.tImg}>
                        <img src={bg} alt='' />
                        <span>{time1}</span>
                    </div>
                    <div className={SeStyle.tImg}>
                        <img src={bg} alt='' />
                        <span>{time2}</span>
                    </div>
                </div>
                {/* 一级 */}
                {paramsArr.map((item: any, index: number) => {
                    return (
                        <div key={index} className={`${SeStyle.dataContrast}`}>
                            <div className={SeStyle.itmTitle}>— {item.title} —</div>
                            <div className={SeStyle.item}>
                                {/* 二级 */}
                                {item.list.map((itm: any, idx: number) => {
                                    return (
                                        <div key={idx} className={SeStyle.li}>
                                            <div className={SeStyle.desc}>
                                                <div>{itm.desc}</div>
                                            </div>
                                            {/* 三级 */}
                                            {itm.subList.map((im: any, i: number) => {
                                                return (
                                                    <div key={i} className={SeStyle.spans}>
                                                        <div className={SeStyle.span}>
                                                            <div>
                                                                {im.t1.sufix ? im.t1.sufix : ''}
                                                                {im.t1.num}
                                                                {im.unit}
                                                            </div>
                                                            <div>({im.t1.txt})</div>
                                                        </div>
                                                        <div className={SeStyle.subTitle}>{im.subTitle}</div>
                                                        <div className={SeStyle.borderDashed}></div>
                                                        <div className={SeStyle.span}>
                                                            <div className={SeStyle.fiSpan}>
                                                                {im.t2.num}
                                                                {im.unit}
                                                                <img
                                                                    src={
                                                                        im.status > 0 ? up : im.status > -1 ? down : ''
                                                                    }
                                                                    alt=''
                                                                />
                                                            </div>
                                                            <div>({im.t2.txt})</div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
