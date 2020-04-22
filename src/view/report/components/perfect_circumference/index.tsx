import React, { Component } from 'react'
import PosCharts from '../../../components/pos_charts'
import FiancoContrast from '../../../components/fianco_contrast'
import PcStyle from './index.module.scss'
import { FiancoRules } from '../../../../types/components/fianco_contrast'
export default class PerfectCircumference extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            chartData: [],
            fiancoData: []
        }
    }
    // 获取体侧数据
    getFiancoContrastData = () => {
        const fiancoData: FiancoRules[] = [
            {
                id: '1',
                times: '2020年04月08日',
                score: '54',
                selected: 0
            },
            {
                id: '2',
                times: '2021年04月08日',
                score: '54',
                selected: 0
            },
            {
                id: '3',
                times: '2020年04月08日',
                score: '54',
                selected: 0
            },
            {
                id: '4',
                times: '2020年04月08日',
                score: '54',
                selected: 0
            },
            {
                id: '5',
                times: '2020年04月08日',
                score: '54',
                selected: 0
            },
            {
                id: '6',
                times: '2020年04月08日',
                score: '54',
                selected: 0
            },
            {
                id: '7',
                times: '2020年04月08日',
                score: '54',
                selected: 0
            },
            {
                id: '8',
                times: '2020年04月08日',
                score: '54',
                selected: 0
            },
            {
                id: '9',
                times: '2020年04月08日',
                score: '54',
                selected: 0
            }
        ]
        const chartData = [
            {
                time: '04.14\n08:01',
                grade: 40,
                sort: 0,
                type: 2
            },
            {
                time: '04.14\n08:02',
                grade: 56,
                sort: 1,
                type: 2
            },
            {
                time: '04.14\n08:03',
                grade: 43,
                sort: 2,
                type: 2
            },
            {
                time: '04.14\n08:04',
                grade: 60,
                sort: 3,
                type: 2
            },
            {
                time: '04.14\n08:05',
                grade: 58,
                sort: 4,
                type: 2
            },
            {
                time: '04.14\n08:06',
                grade: 50,
                sort: 5,
                type: 2
            },
            {
                time: '04.14\n08:07',
                grade: 59,
                sort: 6,
                type: 2
            },
            {
                time: '04.14\n08:08',
                grade: 80,
                sort: 7,
                type: 2
            }
        ]
        this.setState({ fiancoData, chartData })
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
        const { chartData } = this.state
        return (
            <div className={PcStyle['wrapper']}>
                {/* 图表 */}
                <PosCharts chartId='body-composition-chart' chartData={chartData} />
                {/* 体测对比 */}
                <FiancoContrast fiancoArr={this.state.fiancoData} />
                {/* 完美围度数据 */}
                <div className={PcStyle['fraction-box']}>
                    <div className={PcStyle['fb-left']}>
                        <div className={PcStyle['fbl-num-box']}>
                            <span className={PcStyle['num']}>80</span>
                            <span className={PcStyle['util']}>分</span>
                        </div>
                        <div className={PcStyle['fbl-txt']}>测试得分</div>
                    </div>
                    <div className={PcStyle['fb-right']}>
                        <p>较好</p>
                        <p>BMI：22正常</p>
                        <p>击败了90%的地球人</p>
                    </div>
                </div>
                <div className={PcStyle['photo']}></div>
            </div>
        )
    }
    componentDidMount() {
        this.getFiancoContrastData()
    }
}
