import React, { Component } from 'react'
import PosCharts from '../../../components/pos_charts'
import FiancoContrast from '../../../components/fianco_contrast'
import PcStyle from './index.module.scss'
import { FiancoRules } from '../../../../types/components/fianco_contrast'

interface fblObjType {
    num?: number
    pj?: string
    bmi?: string
    jb?: number
    photo?: string
}
export default class PerfectCircumference extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            chartData: [],
            fiancoData: [],
            fblObj: {},
        }
    }
    // 获取体侧数据
    getFiancoContrastData = () => {
        const fiancoData: FiancoRules[] = [
            {
                id: '1',
                times: '2020年04月08日',
                score: '54',
                selected: 0,
            },
            {
                id: '2',
                times: '2021年04月08日',
                score: '54',
                selected: 0,
            },
            {
                id: '3',
                times: '2020年04月08日',
                score: '54',
                selected: 0,
            },
            {
                id: '4',
                times: '2020年04月08日',
                score: '54',
                selected: 0,
            },
            {
                id: '5',
                times: '2020年04月08日',
                score: '54',
                selected: 0,
            },
            {
                id: '6',
                times: '2020年04月08日',
                score: '54',
                selected: 0,
            },
            {
                id: '7',
                times: '2020年04月08日',
                score: '54',
                selected: 0,
            },
            {
                id: '8',
                times: '2020年04月08日',
                score: '54',
                selected: 0,
            },
            {
                id: '9',
                times: '2020年04月08日',
                score: '54',
                selected: 0,
            },
        ]
        const chartData = [
            {
                time: '04.14\n08:01',
                grade: 40,
                sort: 0,
                type: 2,
            },
            {
                time: '04.14\n08:02',
                grade: 56,
                sort: 1,
                type: 2,
            },
            {
                time: '04.14\n08:03',
                grade: 43,
                sort: 2,
                type: 2,
            },
            {
                time: '04.14\n08:04',
                grade: 60,
                sort: 3,
                type: 2,
            },
            {
                time: '04.14\n08:05',
                grade: 58,
                sort: 4,
                type: 2,
            },
            {
                time: '04.14\n08:06',
                grade: 50,
                sort: 5,
                type: 2,
            },
            {
                time: '04.14\n08:07',
                grade: 59,
                sort: 6,
                type: 2,
            },
            {
                time: '04.14\n08:08',
                grade: 80,
                sort: 7,
                type: 2,
            },
        ]
        const fblObj: fblObjType = {
            num: 80,
            pj: '较好',
            bmi: '22正常',
            jb: 90,
            photo: '',
        }
        this.setState({ fiancoData, chartData, fblObj })
        // fetchPost('/community/cpDynamicList', {
        //     cpAreaId: '473f8abe917448d98d993d806bd37666',
        //     pageSize: 10
        // })
        //     .then(res => {
        //         this.setState()
        //         console.log(res)
        //     })
        //     .catch(res => {
        //         console.log(res)
        //     })
    }
    render() {
        const { chartData, fblObj } = this.state
        return (
            <div className={PcStyle['wrapper']}>
                {/* 图表 */}
                <PosCharts chartId='perfect-circumference-chart' chartData={chartData} />
                {/* 体测对比 */}
                <FiancoContrast fiancoArr={this.state.fiancoData} />
                {/* 完美围度数据 */}
                <div className={PcStyle.fractionBox}>
                    <div className={PcStyle.fbLeft}>
                        <div className={PcStyle.fblNumBox}>
                            <span className={PcStyle.num}>{fblObj.num}</span>
                            <span className={PcStyle.util}>分</span>
                        </div>
                        <div className={PcStyle.fblTxt}>测试得分</div>
                    </div>
                    <div className={PcStyle.fbRight}>
                        <p>{fblObj.pj}</p>
                        <p>BMI：{fblObj.bmi}</p>
                        <p>{`击败了${fblObj.jb}%的地球人`}</p>
                    </div>
                </div>
                {fblObj.photo ? (
                    <div className={PcStyle.photo}>
                        <img src={fblObj.photo} alt='' />
                    </div>
                ) : (
                    ''
                )}
                <div className={PcStyle.FractionDetail}>
                    <div className={PcStyle.title}>完美围度数据</div>
                    <div className={PcStyle.content}>
                        <div className={PcStyle.itm}>
                            <div className={PcStyle.fs32}>腰围</div>
                            <div className={`${PcStyle.fs48} ${PcStyle.oc}`}>60cm</div>
                            <div className={`${PcStyle.fs24} ${PcStyle.gc}`}>还差10cm</div>
                            <div className={PcStyle.line}></div>
                            <div className={PcStyle.fs24}>理想值70cm</div>
                        </div>
                        <div className={PcStyle.itm}>
                            <div className={PcStyle.fs32}>胸围</div>
                            <div className={PcStyle.fs48}>60cm</div>
                            <div className={`${PcStyle.fs24} ${PcStyle.gc}`}>还差10cm</div>
                            <div className={PcStyle.line}></div>
                            <div className={PcStyle.fs24}>理想值70cm</div>
                        </div>
                        <div className={PcStyle.itm}>
                            <div className={PcStyle.fs32}>臀围</div>
                            <div className={PcStyle.fs48}>60cm</div>
                            <div className={`${PcStyle.fs24} ${PcStyle.gc}`}>还差10cm</div>
                            <div className={PcStyle.line}></div>
                            <div className={PcStyle.fs24}>理想值70cm</div>
                        </div>
                        <div className={PcStyle.itm}>
                            <div className={PcStyle.fs32}>大臂围</div>
                            <div className={PcStyle.fs48}>60cm</div>
                            <div className={`${PcStyle.fs24} ${PcStyle.gc}`}>还差10cm</div>
                            <div className={PcStyle.line}></div>
                            <div className={PcStyle.fs24}>理想值70cm</div>
                        </div>
                        <div className={PcStyle.itm}>
                            <div className={PcStyle.fs32}>腰臂比</div>
                            <div className={PcStyle.fs48}>60cm</div>
                            <div className={`${PcStyle.fs24} ${PcStyle.gc}`}>还差10cm</div>
                            <div className={PcStyle.line}></div>
                            <div className={PcStyle.fs24}>理想值70cm</div>
                        </div>
                        <div className={PcStyle.itm}>
                            <div className={PcStyle.fs32}>大腿围</div>
                            <div className={PcStyle.fs48}>60cm</div>
                            <div className={`${PcStyle.fs24} ${PcStyle.gc}`}>还差10cm</div>
                            <div className={PcStyle.line}></div>
                            <div className={PcStyle.fs24}>理想值70cm</div>
                        </div>
                        <div className={PcStyle.itm}>
                            <div className={PcStyle.fs32}>体脂率</div>
                            <div className={PcStyle.fs48}>60cm</div>
                            <div className={`${PcStyle.fs24} ${PcStyle.gc}`}>还差10cm</div>
                            <div className={PcStyle.line}></div>
                            <div className={PcStyle.fs24}>理想值70cm</div>
                        </div>
                        <div className={PcStyle.itm}>
                            <div className={PcStyle.fs32}>基础代谢率</div>
                            <div className={PcStyle.fs48}>60cm</div>
                            <div className={`${PcStyle.fs24} ${PcStyle.gc}`}>还差10cm</div>
                            <div className={PcStyle.line}></div>
                            <div className={PcStyle.fs24}>理想值70cm</div>
                        </div>
                    </div>
                </div>
                <div className={PcStyle.shareBtn}>分享报告图片</div>
            </div>
        )
    }
    componentDidMount() {
        this.getFiancoContrastData()
    }
}
