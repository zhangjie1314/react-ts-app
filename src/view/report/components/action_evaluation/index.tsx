// 动作评估
import React, { Component } from 'react'
import PosCharts from '@comps/pos_charts'
import FiancoContrast from '@comps/fianco_contrast'
import BodyFigure from './components/body_figure'
import AeStyle from './index.module.scss'
import { FiancoRules } from '@ctypes/components/fianco_contrast'

interface fblObjType {
    num?: number
    pj?: string
    bmi?: string
    jb?: number
    photo?: string
}
export default class ActionEvaluation extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            chartData: [],
            fiancoData: [],
            tabs: [
                { txt: '过度激活', num: 0 },
                { txt: '激活不足', num: 0 },
                { txt: '指令混乱', num: 0 },
            ],
            tabsIdx: 0,
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
        this.setState({ fiancoData, chartData })
        // 获取人体图数据
    }
    // 点击选中tabs
    selectTabsFn = (e: any, idx: number) => {
        this.setState({
            tabsIdx: idx,
        })
    }
    componentDidMount() {
        this.getFiancoContrastData()
    }
    render() {
        console.log(this.props)
        return (
            <div className={AeStyle.wrapper}>
                {/* 图表 */}
                {this.props.chartData.length > 0 && (
                    <PosCharts chartId='perfect-circumference-chart' chartData={this.props.chartData} />
                )}

                {/* 体测对比 */}
                <FiancoContrast fiancoArr={this.props.fiancoData} />
                {/* 动作评估 */}
                <div className={AeStyle.tabs}>
                    {this.state.tabs.map((el: any, idx: number) => {
                        return (
                            <div
                                key={idx}
                                className={`${AeStyle.tab} ${idx === this.state.tabsIdx ? AeStyle.selectBg : ''}`}
                                onClick={e => this.selectTabsFn(e, idx)}
                            >
                                <p>{el.txt}</p>
                                <p>({el.num}项)</p>
                            </div>
                        )
                    })}
                </div>
                <BodyFigure params={''}></BodyFigure>
                <div className={AeStyle.footerBtn}>
                    <div className={AeStyle.goToTest}>去体侧</div>
                    <div className={AeStyle.shareBtn}>生成报告图片</div>
                </div>
            </div>
        )
    }
}
