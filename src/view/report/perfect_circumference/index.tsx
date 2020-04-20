import React, { Component } from 'react'
import PosCharts from '../components/pos_charts'
import PerfectGirth from '../components/perfect_girth/perfect_girth'
import PerfectCircumferenceStyle from './index.module.scss'

export default class PerfectCircumference extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            chartData: [
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
            ],
        }
    }
    render() {
        const { chartData } = this.state
        return (
            <div className={PerfectCircumferenceStyle['wrapper']}>
                {/* 图表 */}
                <PosCharts chartId='body-composition-chart' chartData={chartData} />
                {/* 对比 */}
                <PerfectGirth />
                {/* 完美围度数据 */}
                <div className={PerfectCircumferenceStyle['fraction-box']}>
                    <div className={PerfectCircumferenceStyle['fb-left']}>
                        <div className={PerfectCircumferenceStyle['fbl-num-box']}>
                            <span className={PerfectCircumferenceStyle['num']}>80</span>
                            <span className={PerfectCircumferenceStyle['util']}>分</span>
                        </div>
                        <div className={PerfectCircumferenceStyle['fbl-txt']}>测试得分</div>
                    </div>
                    <div className={PerfectCircumferenceStyle['fb-right']}>
                        <p>较好</p>
                        <p>BMI：22正常</p>
                        <p>击败了90%的地球人</p>
                    </div>
                </div>
                <div className={PerfectCircumferenceStyle['photo']}></div>
            </div>
        )
    }
}
