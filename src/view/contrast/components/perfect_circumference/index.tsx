// 完美围度
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import _ from 'lodash'
import Dayjs from 'dayjs'
import { PhotoProvider, PhotoConsumer } from 'react-photo-view'
import { getPerfectCircumferenceResult } from '@apis/report/bapp'
import { handleHandImg } from '@utils/index'
import BarChart from './comps/bar_chart'
import PcStyle from './index.module.scss'
import NoImg from '@assets/img/no-img.png'

interface defProps {
    id1: string
    id2: string
}

@inject('reportStore')
@observer
export default class PerfectCircumference extends Component<defProps, any> {
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
                },
                two: {
                    grade: 0,
                    time: '',
                },
            },
            imgs: ['', ''],
            chartData: [],
            firstName: '',
        }
    }
    static defaultProps: defProps = {
        id1: '',
        id2: '',
    }
    static getDerivedStateFromProps(nextProps: defProps, prevState: any) {
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
        const info1 = await getPerfectCircumferenceResult({
            wdId: id1,
        })
        const info2 = await getPerfectCircumferenceResult({
            wdId: id2,
        })
        this.handleData(info1.data, info2.data)
    }
    // 数据处理
    handleData(info1: any, info2: any) {
        // 处理得分
        let grade = {
            one: {
                grade: 0,
                time: '',
            },
            two: {
                grade: 0,
                time: '',
            },
        }
        grade.one.grade = info1.memberSideWdAllDTO.grade
        grade.one.time = Dayjs(info1.memberSideWdAllDTO.createTime).format('YYYY.MM.DD HH:mm')
        grade.two.grade = info2.memberSideWdAllDTO.grade
        grade.two.time = Dayjs(info2.memberSideWdAllDTO.createTime).format('YYYY.MM.DD HH:mm')
        // 图片处理
        let imgs = ['', '']
        imgs[0] = info1.memberSideWdAllDTO.url1 ? handleHandImg(info1.memberSideWdAllDTO.url1, 0) : NoImg
        imgs[1] = info2.memberSideWdAllDTO.url1 ? handleHandImg(info2.memberSideWdAllDTO.url1, 0) : NoImg
        // 处理图表数据
        const info1Name = Dayjs(info1.memberSideWdAllDTO.createTime).format('MM月DD日HH时mm分数据')
        let info1Data = [
            {
                name: info1Name,
                xVal: '腰围\n（cm）',
                yVal: info1.memberSideWdAllDTO.waist,
            },
            {
                name: info1Name,
                xVal: '胸围\n（cm）',
                yVal: info1.memberSideWdAllDTO.xw,
            },
            {
                name: info1Name,
                xVal: '肩围\n（cm）',
                yVal: info1.memberSideWdAllDTO.jw ? info1.memberSideWdAllDTO.jw : '0.0',
            },
            {
                name: info1Name,
                xVal: '臀围\n（cm）',
                yVal: info1.memberSideWdAllDTO.hipline,
            },
            {
                name: info1Name,
                xVal: '大臂围\n（cm）',
                yVal: info1.memberSideWdAllDTO.dtunw,
            },
            {
                name: info1Name,
                xVal: '大腿围\n（cm）',
                yVal: info1.memberSideWdAllDTO.dtw,
            },
            {
                name: info1Name,
                xVal: '腰臀比\n（%）',
                yVal: info1.memberSideWdAllDTO.ytb ? info1.memberSideWdAllDTO.ytb.replace(/%/g, '') : 0,
            },
            {
                name: info1Name,
                xVal: '体脂率\n（%）',
                yVal: info1.memberSideWdAllDTO.tzl ? info1.memberSideWdAllDTO.tzl.replace(/%/g, '') : 0,
            },
            {
                name: info1Name,
                xVal: '基础代谢值\n（kcal）',
                yVal: info1.memberSideWdAllDTO.jcdx ? info1.memberSideWdAllDTO.jcdx.replace(/%/g, '') : 0,
            },
        ]
        const info2Name = Dayjs(info2.memberSideWdAllDTO.createTime).format('MM月DD日HH时mm分数据')
        let info2Data = [
            {
                name: info2Name,
                xVal: '腰围\n（cm）',
                yVal: info2.memberSideWdAllDTO.waist,
            },
            {
                name: info2Name,
                xVal: '胸围\n（cm）',
                yVal: info2.memberSideWdAllDTO.xw,
            },
            {
                name: info2Name,
                xVal: '肩围\n（cm）',
                yVal: info2.memberSideWdAllDTO.jw ? info2.memberSideWdAllDTO.jw : '0.0',
            },
            {
                name: info2Name,
                xVal: '臀围\n（cm）',
                yVal: info2.memberSideWdAllDTO.hipline,
            },
            {
                name: info2Name,
                xVal: '大臂围\n（cm）',
                yVal: info2.memberSideWdAllDTO.dtunw,
            },
            {
                name: info2Name,
                xVal: '大腿围\n（cm）',
                yVal: info2.memberSideWdAllDTO.dtw,
            },
            {
                name: info2Name,
                xVal: '腰臀比\n（%）',
                yVal: info2.memberSideWdAllDTO.ytb ? info2.memberSideWdAllDTO.ytb.replace(/%/g, '') : 0,
            },
            {
                name: info2Name,
                xVal: '体脂率\n（%）',
                yVal: info2.memberSideWdAllDTO.tzl ? info2.memberSideWdAllDTO.tzl.replace(/%/g, '') : 0,
            },
            {
                name: info2Name,
                xVal: '基础代谢值\n（kcal）',
                yVal: info2.memberSideWdAllDTO.jcdx ? info2.memberSideWdAllDTO.jcdx.replace(/%/g, '') : 0,
            },
        ]
        this.setState({
            grade,
            imgs,
            chartData: _.concat(info1Data, info2Data),
            firstName: info1Name,
        })
    }
    render() {
        const { chartData, grade, imgs, firstName } = this.state
        console.log(imgs)
        return (
            <div className={PcStyle['wrapper']}>
                <div className={PcStyle['title']}>完美围度得分</div>
                {/* 分数 */}
                <div className={PcStyle['grade-box']}>
                    <div className={PcStyle['grade-item']}>
                        <div className={PcStyle['grade']}>
                            <span className={PcStyle.num}>{grade.one.grade}</span>
                            <span className={PcStyle.unit}>分</span>
                        </div>
                        <div className={PcStyle.time}>{grade.one.time}</div>
                    </div>
                    <div className={PcStyle['grade-item']}>
                        <div className={PcStyle['grade']}>
                            <span className={PcStyle.num}>{grade.two.grade}</span>
                            <span className={PcStyle.unit}>分</span>
                        </div>
                        <div className={PcStyle.time}>{grade.two.time}</div>
                    </div>
                </div>
                {/* 照片 */}
                {imgs[0] ? <div className={PcStyle['title']}>照片对比</div> : ''}
                {imgs[0] ? (
                    <div className={PcStyle['photo-box']}>
                        <PhotoProvider photoClosable={true}>
                            <div className={PcStyle['photo-item']}>
                                <PhotoConsumer src={imgs[0]}>
                                    <img src={imgs[0]} alt='完美围度照片' />
                                </PhotoConsumer>
                            </div>
                            <div className={PcStyle['photo-item']}>
                                <PhotoConsumer src={imgs[1]} intro=''>
                                    <img src={imgs[1]} alt='完美围度照片' />
                                </PhotoConsumer>
                            </div>
                        </PhotoProvider>
                    </div>
                ) : (
                    ''
                )}
                <div className={PcStyle['title']}>数据对比</div>
                {/* 数据 */}
                <div className={PcStyle['data-box']}>
                    <BarChart barData={chartData} firstName={firstName} />
                </div>
            </div>
        )
    }
}
