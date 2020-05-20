// 静态评估
import React, { Component } from 'react'
import _ from 'lodash'
// import StaticDataJson from './data.json'
import Dayjs from 'dayjs'
import { getStaticEvaluationResult } from '@apis/report/bapp'
import SeStyle from './index.module.scss'
import bg from '@assets/img/time_bg.png'
import hd from './handleData'
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
            param: [],
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
        const info1 = await getStaticEvaluationResult({
            wdId: id1,
        })
        const info2 = await getStaticEvaluationResult({
            wdId: id2,
        })
        this.handleData(info1.data, info2.data)
    }
    // 处理分数
    private handleGrade(num: number) {
        let res = num > 92 ? '健康' : num > 87 ? '合格' : num > 65 ? '较差' : '危险'
        return res
    }

    // 处理列表数据
    private handleParams(d1: any, d2: any) {
        return [
            {
                title: '肩部倾斜',
                content: hd.handleJBQX(d1, d2),
            },
            {
                title: '内外八情况',
                content: hd.handleNWB(d1, d2),
            },
            {
                title: 'X/O型腿情况',
                content: hd.handleXOL(d1, d2),
            },
            {
                title: '髋部倾斜',
                content: hd.handleKBQX(d1, d2),
            },
            {
                title: '驼背情况',
                content: hd.handleTB(d1, d2),
            },
            {
                title: '头部倾斜',
                content: hd.handleTBQX(d1, d2),
            },
            {
                title: '下颚前伸情况',
                content: hd.handleXEQS(d1, d2),
            },
        ]
    }
    // 处理数据
    handleData(info1: any, info2: any) {
        console.log(info1, info2)
        let { staticGradeObj, time1, time2, param } = this.state
        const d1 = info1
        const d2 = info2
        staticGradeObj.push(
            { grade: d1.grade, time: Dayjs(d1.createTime).format('YYYY.MM.DD HH:mm'), tips: this.handleGrade(d1.grad) },
            { grade: d2.grade, time: Dayjs(d2.createTime).format('YYYY.MM.DD HH:mm'), tips: this.handleGrade(d2.grad) }
        )
        time1 = Dayjs(d1.createTime).format('MM月DD日HH:mm')
        time2 = Dayjs(d1.createTime).format('MM月DD日HH:mm')
        param = this.handleParams(d1, d2)
        this.setState({
            staticGradeObj,
            time1,
            time2,
            param,
        })
    }

    render() {
        const { staticGradeObj, time1, time2, param } = this.state
        return (
            <div className={SeStyle.wrapper}>
                {/* 静态评估得分 */}
                <div className={SeStyle.title}>静态评估得分</div>
                <div className={SeStyle.head}>
                    {staticGradeObj.length > 0
                        ? staticGradeObj.map((el: any, idx: number) => {
                              return (
                                  <div className={SeStyle.grade} key={idx}>
                                      <div className={SeStyle.hd}>
                                          <div className={SeStyle.gd}>{el.grade}</div>
                                          <div className={SeStyle.unit}>
                                              <p>{el.tips}</p>
                                              <p>分</p>
                                          </div>
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
                {param.length > 0 ? (
                    <div className={`${SeStyle.dataContrast}`}>
                        {/* <div className={SeStyle.mLine}></div> */}
                        {param.map((el: any, idx: number) => {
                            return (
                                <div key={idx} className={SeStyle.item}>
                                    <div className={el.content.length > 1 ? SeStyle.content1 : SeStyle.itmTitle}>
                                        {el.content.length > 1 ? (
                                            <div className={SeStyle.itmTitle}>{el.title}</div>
                                        ) : (
                                            el.title
                                        )}
                                    </div>
                                    {el.content.map((im: any, i: number) => {
                                        return (
                                            <div key={i} className={SeStyle.li}>
                                                <div className={SeStyle.span}>
                                                    <div>{im.t1.num}°</div>
                                                    <div>({im.t1.txt})</div>
                                                </div>
                                                {el.content.length > 1 ? (
                                                    <div className={SeStyle.desc}>{im.desc}</div>
                                                ) : (
                                                    ''
                                                )}
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
                ) : (
                    ''
                )}
            </div>
        )
    }
}
