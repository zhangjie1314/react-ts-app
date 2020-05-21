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
            strength: {}, // 力量类
            quick: {}, // 敏捷类
            flexible: {}, // 柔韧类
            balance: {}, //平衡类
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
        console.log(info1, info2)
        let { staticGradeObj, time1, time2, strength, quick, flexible, balance } = this.state
        const d1 = info1.ydbxVO
        const d2 = info2.ydbxVO
        staticGradeObj.push(
            { grade: d1.grade, time: Dayjs(d1.day).format('YYYY.MM.DD') },
            { grade: d2.grade, time: Dayjs(d2.day).format('YYYY.MM.DD') }
        )
        time1 = Dayjs(d1.day).format('MM月DD日')
        time2 = Dayjs(d1.day).format('MM月DD日')
        // 处理力量类数据
        let st = this.handleParams('力量类', d1, d2)
        strength = st.list.length > 0 ? st : []
        // 处理敏捷类数据
        let qu = this.handleParams('敏捷类', d1, d2)
        quick = qu.list.length > 0 ? qu : []
        // 处理敏捷类数据
        let fl = this.handleParams('柔韧类', d1, d2)
        flexible = fl.list.length > 0 ? fl : []
        // 处理平衡类数据
        let ba = this.handleParams('平衡类', d1, d2)
        balance = ba.list.length > 0 ? ba : []
        console.log(strength, quick, flexible, balance)
        this.setState({ staticGradeObj, time1, time2, strength, quick, flexible, balance })
    }

    render() {
        const { staticGradeObj, time1, time2, strength } = this.state
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
                {/* 力量类 */}
                {strength.list && strength.list.length > 0 ? (
                    <div className={`${SeStyle.dataContrast}`}>
                        <div className={SeStyle.itmTitle}>— {strength.title} —</div>
                        <div className={SeStyle.item}>
                            {strength.list.map((itm: any, idx: number) => {
                                return (
                                    <div key={idx} className={SeStyle.li}>
                                        <div className={SeStyle.desc}>{itm.desc}</div>
                                        {itm.subList.map((im: any, i: number) => {
                                            return (
                                                <div key={i}>
                                                    <div className={SeStyle.span}>
                                                        <div>{im.t1.num}°</div>
                                                        <div>({im.t1.txt})</div>
                                                    </div>

                                                    <div className={SeStyle.subTitle}>{im.subTitle}</div>

                                                    <div className={SeStyle.borderDashed}></div>
                                                    <div className={SeStyle.span}>
                                                        <div className={SeStyle.fiSpan}>
                                                            {im.t2.num}°
                                                            <img src={im.status > 0 ? up : down} alt='' />
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
                ) : (
                    ''
                )}
            </div>
        )
    }
}
