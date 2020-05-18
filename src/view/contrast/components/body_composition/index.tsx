// 人体成分
import React, { Component } from 'react'
import { PhotoProvider, PhotoConsumer } from 'react-photo-view'
import 'react-photo-view/dist/index.css'
import { observer, inject } from 'mobx-react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { callAppMenthd, callAppShareImgMenthd, handleHandImg } from '@utils/index'
import { getBodyCompositionResult } from '@apis/report/bapp'
import up from '@assets/img/up_icon.png'
import down from '@assets/img/dow_icon.png'

import BCStyle from './index.module.scss'

@inject('reportStore')
@observer
export default class BodyComposition extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            id1: '',
            id2: '',
            imgHandleing: false,
            daysBetweenTwo: 0, // 两次间隔天数
            weightChange: 0, // 体重变化
            fatChange: 0, // 脂肪变化
            tableList: [], // 对比数据
            imgArr: [], // 三维图
        }
    }
    static defaultProps = {
        id1: '',
        id2: '',
    }
    static propType = {
        id1: PropTypes.string,
        id2: PropTypes.string,
    }

    // 计算相差天数
    private dateDiff(date1: any, date2: any) {
        let firstDate = new Date(date1.replace(/-/g, '/'))
        let secondDate = new Date(date2.replace(/-/g, '/'))
        let diff = Math.abs(firstDate.getTime() - secondDate.getTime())
        let result = parseInt(String(diff / (1000 * 60 * 60 * 24)), 10)
        return result
    }
    // 计算相差体重
    private weightDiff(weight1: any, weight2: any) {
        const wv = weight1 - weight2
        let result = `${wv > 0 ? '-' : '+'}${Math.abs(wv).toFixed(1)}kg`
        return result
    }
    // 计算相差脂肪
    private fatDiff(fat1: any, fat2: any) {
        const fv = fat1 - fat2
        let result = `${fv > 0 ? '-' : '+'}${Math.abs(fv).toFixed(1)}kg`
        return result
    }
    // 计算变化
    private diffFn(type: string, p1: any, p2: any) {
        if (type === 'num') {
            return parseFloat(Math.abs(p1 - p2).toFixed(1))
        }
        if (type === 'icon') {
            return p1 - p2 < 0 ? up : down
        }
    }
    private handleImg(d1: any, d2: any) {
        const isFromStudio = 0
        d1.url1 = handleHandImg(d1.url1, isFromStudio)
        d1.url2 = handleHandImg(d1.url2, isFromStudio)
        d1.url3 = handleHandImg(d1.url3, isFromStudio)

        d2.url1 = handleHandImg(d2.url1, isFromStudio)
        d2.url2 = handleHandImg(d2.url2, isFromStudio)
        d2.url3 = handleHandImg(d2.url3, isFromStudio)
    }
    static getDerivedStateFromProps(nextProps: any) {
        return {
            id1: nextProps.id1,
            id2: nextProps.id2,
        }
    }
    componentDidUpdate(prevState: any) {
        if (!_.isEqual(prevState.id1, this.state.id1)) {
            this.getPageInfo()
        }
    }

    // 获取数据
    async getPageInfo() {
        const data1 = await getBodyCompositionResult({
            rtcfId: this.state.id1,
        })
        const data2 = await getBodyCompositionResult({
            rtcfId: this.state.id2,
        })

        this.handleData(data1.data, data2.data)
    }

    // 处理数据
    handleData(d1: any, d2: any) {
        let { daysBetweenTwo, weightChange, fatChange, tableList, imgArr } = this.state
        daysBetweenTwo = this.dateDiff(d1.createTime, d2.createTime) // 计算天数
        weightChange = this.weightDiff(d1.weight, d2.weight) // 体重变化
        fatChange = this.fatDiff(d1.tizl, d2.tizl) // 脂肪变化
        // 列表数据
        tableList = [
            { name: '指标', p1: d1.createTime, p2: d2.createTime, diff: '变化', state: '' },
            {
                name: '体重',
                p1: `${d1.weight}kg`,
                p2: `${d2.weight}kg`,
                diff: this.diffFn('num', d1.weight, d2.weight),
                state: this.diffFn('icon', d1.weight, d2.weight),
            },
            {
                name: '体脂率',
                p1: `${d1.tzl}%`,
                p2: `${d2.tzl}%`,
                diff: this.diffFn('num', d1.tzl, d2.tzl),
                state: this.diffFn('icon', d1.tzl, d2.tzl),
            },
            {
                name: 'BMI',
                p1: d1.bmi,
                p2: d2.bmi,
                diff: this.diffFn('num', d1.bmi, d2.bmi),
                state: this.diffFn('icon', d1.bmi, d2.bmi),
            },
            {
                name: '去脂体重',
                p1: `${d1.qztz}kg`,
                p2: `${d2.qztz}kg`,
                diff: this.diffFn('num', d1.qztz, d2.qztz),
                state: this.diffFn('icon', d1.qztz, d2.qztz),
            },
            {
                name: '肌肉量',
                p1: `${d1.jrl}kg`,
                p2: `${d2.jrl}kg`,
                diff: this.diffFn('num', d1.jrl, d2.jrl),
                state: this.diffFn('icon', d1.jrl, d2.jrl),
            },
            {
                name: '体肌量',
                p1: `${d1.tizl}kg`,
                p2: `${d2.tizl}kg`,
                diff: this.diffFn('num', d1.tizl, d2.tizl),
                state: this.diffFn('icon', d1.tizl, d2.tizl),
            },
            {
                name: '腰臀比',
                p1: d1.ytb,
                p2: d2.ytb,
                diff: this.diffFn('num', d1.ytb, d2.ytb),
                state: this.diffFn('icon', d1.ytb, d2.ytb),
            },
            {
                name: '内脏脂肪级别',
                p1: d1.nzzf,
                p2: d2.nzzf,
                diff: this.diffFn('num', d1.nzzf, d2.nzzf),
                state: this.diffFn('icon', d1.nzzf, d2.nzzf),
            },
            {
                name: '基础代谢量',
                p1: `${d1.jcdx}kcal`,
                p2: `${d2.jcdx}kcal`,
                diff: this.diffFn('num', d1.jcdx, d2.jcdx),
                state: this.diffFn('icon', d1.jcdx, d2.jcdx),
            },
        ]
        // 三维图
        let dt1 = '',
            dt2 = ''
        if (d1 && d1.createTime) {
            dt1 = d1.createTime.split(' ')[0]
            dt2 = d2.createTime.split(' ')[0]
        }
        this.handleImg(d1, d2)
        imgArr = [
            {
                title: '正面照',
                img: [
                    { time: dt1, url: d1.url1 },
                    { time: dt2, url: d2.url1 },
                ],
            },
            {
                title: '侧面照',
                img: [
                    { time: dt1, url: d1.url2 },
                    { time: dt2, url: d2.url2 },
                ],
            },
            {
                title: '人体成分报告',
                img: [
                    { time: dt1, url: d1.url3 },
                    { time: dt2, url: d2.url3 },
                ],
            },
        ]
        this.setState({ daysBetweenTwo, weightChange, fatChange, tableList, imgArr })
    }
    render() {
        const { daysBetweenTwo, weightChange, fatChange, tableList, imgArr } = this.state
        return (
            <div className={BCStyle.wrapper}>
                {/* 总览 */}
                <div className={BCStyle.headText}>
                    <div className={BCStyle.item}>
                        <div className={BCStyle.num}>{daysBetweenTwo}</div>
                        <div>天数</div>
                    </div>
                    <div className={BCStyle.item}>
                        <div className={BCStyle.num}>{weightChange}</div>
                        <div>体重变化</div>
                    </div>
                    <div className={BCStyle.item}>
                        <div className={BCStyle.num}>{fatChange}</div>
                        <div>脂肪变化</div>
                    </div>
                </div>
                {/* 列表数据 */}
                <div className={BCStyle.bodyText}>
                    {tableList.map((el: any, idx: number) => {
                        return (
                            <div className={BCStyle.item} key={idx}>
                                <div>{el.name}</div>
                                <div>{el.p1}</div>
                                <div>{el.p2}</div>
                                <div>
                                    <span>{el.diff}</span>
                                    {el.state ? <img src={el.state} alt='' /> : null}
                                </div>
                            </div>
                        )
                    })}
                </div>
                {/* 图片 */}
                {imgArr.map((el: any, idx: number) => {
                    return (
                        <div className={BCStyle.tdImgs} key={idx}>
                            <div className={BCStyle.title}>{el.title}</div>
                            {el.img.map((itm: any, ix: number) => {
                                return (
                                    <div className={BCStyle.img} key={ix}>
                                        <img src={itm.url} alt='' />
                                        <p>{itm.time}</p>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}
