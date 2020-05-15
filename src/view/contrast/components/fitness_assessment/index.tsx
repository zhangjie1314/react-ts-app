// 体适能评估
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import _ from 'lodash'
import Dayjs from 'dayjs'
import FAStyle from './index.module.scss'
import { getfitnessAssessmentResult } from '@apis/report/bapp'

interface defProps {
    id1: string
    id2: string
}

@inject('reportStore')
@observer
export default class FitnessAssessment extends Component<defProps, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            id1: '',
            id2: '',
            pageInfo: {},
            grade: {
                one: {
                    grade: 0,
                    time: '',
                    time1: '',
                },
                two: {
                    grade: 0,
                    time: '',
                    time1: '',
                },
            },
            comparData: [],
        }
    }
    static defaultProps: defProps = {
        id1: '',
        id2: '',
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
    // 获取数据
    async getPageInfo() {
        const { id1, id2 } = this.state
        const info1 = await getfitnessAssessmentResult({
            wdId: id1,
        })
        const info2 = await getfitnessAssessmentResult({
            wdId: id2,
        })
        this.handleDataFunc(info1.data, info2.data)
    }
    // 处理数据
    handleDataFunc(info1: any, info2: any) {
        // 分数
        let grade = {
            one: {
                grade: 0,
                time: '',
                time1: '',
            },
            two: {
                grade: 0,
                time: '',
                time1: '',
            },
        }
        grade.one.grade = info1.grade
        grade.one.time = Dayjs(info1.createTime).format('YYYY.MM.DD HH:mm')
        grade.one.time1 = Dayjs(info1.createTime).format('MM月DD日HH:mm')
        grade.two.grade = info2.grade
        grade.two.time = Dayjs(info2.createTime).format('YYYY.MM.DD HH:mm')
        grade.two.time1 = Dayjs(info2.createTime).format('MM月DD日HH:mm')
        // 对比数据
        let comparData: any[] = []
        const info1Data = this.handleColData(info1.memberSideTnViewOneList)
        const info2Data = this.handleColData(info2.memberSideTnViewOneList)
        // 处理数据一的数据
        info1Data.forEach((item: any) => {
            const data: any = {
                title: item.title,
                sublist: [],
            }
            item.sublist.forEach((itm: any) => {
                data.sublist.push({
                    title: itm.title,
                    valStr: itm.valStr,
                    lModel: { value: itm.value, remark: itm.remark },
                    status: 0,
                })
            })
            comparData.push(data)
        })
        // 处理数据二的数据
        info2Data.forEach((item: any) => {
            const idx = comparData.findIndex((itm: any) => itm.title === item.title)
            // 判断是否存在 不存在则新增一条
            if (idx >= 0) {
                item.sublist.forEach((el: any) => {
                    let addNum: number = 0
                    comparData[idx].sublist.forEach((ele: any, index: number) => {
                        if (el.title === ele.title) {
                            addNum += 1
                            // 增加右边数据
                            comparData[idx].sublist[index].rModel = {
                                value: el.value,
                                remark: el.remark,
                            }
                            // 处理状态
                            const lv = comparData[idx].sublist[index].lModel.value
                            const rv = comparData[idx].sublist[index].rModel.value
                            // 0 降低 1 升高 -1 不显示
                            comparData[idx].sublist[index].status = lv > rv ? 0 : lv < rv ? 1 : -1
                        }
                    })
                    // 判断是否有增加数据没有增加则新增一条
                    if (addNum === 0) {
                        comparData[idx].sublist.push({
                            rModel: { value: el.value, remark: el.remark },
                            status: -1,
                            title: el.title,
                            valStr: el.valStr,
                        })
                    }
                })
            } else {
                const data: any = {
                    title: item.title,
                    sublist: [],
                }
                item.sublist.forEach((itm: any) => {
                    data.sublist.push({
                        title: itm.title,
                        valStr: itm.valStr,
                        rModel: { value: itm.value, remark: itm.remark },
                        status: -1,
                    })
                })
                comparData.push(data)
            }
        })
        this.setState({
            grade,
            comparData,
        })
    }
    // 处理单个数据
    handleColData(data: any[]): any[] {
        let resArr: any[] = []
        data.forEach((item: any) => {
            let obj: any = {}
            obj.title = item.tile
            let sublist: any[] = []
            item.memberSideTnViewTowList.forEach((el: any) => {
                let sublistItem: any = {}
                sublistItem.title = el.name
                sublistItem.value = el.value
                sublistItem.valStr = el.dw
                sublistItem.remark = el.pj
                sublist.push(sublistItem)
            })
            obj.sublist = sublist
            resArr.push(obj)
        })
        return resArr
    }
    render() {
        const { grade, comparData } = this.state
        return (
            <div className={FAStyle['wrapper']}>
                {/* 分数 */}
                <div className={FAStyle['title']}>体适能评估得分</div>
                <div className={FAStyle['grade-box']}>
                    <div className={FAStyle['grade-item']}>
                        <div className={FAStyle['grade']}>
                            <span className={FAStyle.num}>{grade.one.grade}</span>
                            <span className={FAStyle.unit}>分</span>
                        </div>
                        <div className={FAStyle.time}>{grade.one.time}</div>
                    </div>
                    <div className={FAStyle['grade-item']}>
                        <div className={FAStyle['grade']}>
                            <span className={FAStyle.num}>{grade.two.grade}</span>
                            <span className={FAStyle.unit}>分</span>
                        </div>
                        <div className={FAStyle.time}>{grade.two.time}</div>
                    </div>
                </div>
                {/* 数据对比 */}
                <div className={FAStyle['title']}>数据对比</div>
                <div className={FAStyle['data-compar-box']}>
                    <div className={FAStyle['time-box']}>
                        <div className={FAStyle['time-item']}>{grade.one.time1}</div>
                        <div className={FAStyle['time-item']}>{grade.two.time1}</div>
                    </div>
                    <div className={FAStyle['dcb-title']}>体适能</div>
                    <div className={FAStyle['dcb-category-box']}>
                        {comparData.map((item: any, index: number) => {
                            return (
                                <div className={FAStyle['dcb-item']} key={index}>
                                    <div className={FAStyle['di-title']}>{item.title}</div>
                                    <div className={FAStyle['di-list']}>
                                        {item.sublist.map((itm: any, idx: number) => {
                                            return (
                                                <div className={FAStyle['dl-item']} key={`${index}${idx}`}>
                                                    <div className={FAStyle['dli-left']}>
                                                        <div className={FAStyle['dl-text']}>
                                                            <div className={FAStyle['num-box']}>
                                                                {`${itm.lModel.value}${itm.valStr}`}
                                                            </div>
                                                            <div>（{itm.lModel.remark}）</div>
                                                        </div>
                                                    </div>
                                                    <div className={FAStyle['dli-line']}>
                                                        <div className={FAStyle['dli-title']}>{itm.title}</div>
                                                    </div>
                                                    <div className={FAStyle['dli-right']}>
                                                        <div className={FAStyle['dl-text']}>
                                                            <div className={FAStyle['num-box']}>
                                                                {`${itm.rModel.value}${itm.valStr}`}
                                                                {itm.status >= 0 ? (
                                                                    <span
                                                                        className={`${FAStyle['symbol']} ${
                                                                            itm.status === 0
                                                                                ? FAStyle['dow']
                                                                                : FAStyle['up']
                                                                        }`}
                                                                    ></span>
                                                                ) : null}
                                                            </div>
                                                            <div>（{itm.lModel.remark}）</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
