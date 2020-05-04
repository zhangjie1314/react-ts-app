// 动作评估
import React, { Component } from 'react'

import { observer, inject } from 'mobx-react'
import PosCharts from '@comps/pos_charts'
import FiancoContrast from '@comps/fianco_contrast'
import BodyFigure from './components/body_figure'
import { getActionEvaluationInfo } from '../../../../apis/report/bapp'
import AeStyle from './index.module.scss'
import { figureData } from './components/body_figure/figure_data'

interface fblObjType {
    num?: number
    pj?: string
    bmi?: string
    jb?: number
    photo?: string
}

@inject('reportStore')
@observer
export default class ActionEvaluation extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            chartData: [],
            fiancoData: [],
            tabs: [
                { txt: '过度激活', num: 0, type: 'jhgd' },
                { txt: '激活不足', num: 0, type: 'jhbz' },
                { txt: '指令混乱', num: 0, type: 'jhhl' },
            ],
            tabsIdx: 0,
            fblObj: {},
            params: {}, // 肌肉点图
        }
    }
    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        return {
            chartData: nextProps.chartData,
            fiancoData: nextProps.fiancoData,
        }
    }
    bodyFigure: any = {}
    onRef = (ref: any) => {
        this.bodyFigure = ref
    }
    componentDidUpdate(prevProps: any, prevState: any) {
        const oldChartData = JSON.stringify(prevState.chartData)
        const newChartData = JSON.stringify(this.state.chartData)
        if (oldChartData !== newChartData) {
            let lg = this.state.chartData.length
            if (lg > 0) {
                this.handleClickPointFunc(this.state.chartData[lg - 1])
            }
        }
    }
    // 数据去重
    removeRepetiton(arr: any) {
        for (var x = 0; x < arr.length; x++) {
            for (var y = x + 1; y < arr.length; y++) {
                if (arr[x].className === arr[y].className) {
                    arr[x].imglist.push(...arr[y].imglist)
                    arr.splice(y, 1)
                }
            }
        }
    }
    // 获取肌肉图
    handleMuscleImg(data: any, isImg: string) {
        let res: any = {}
        data.forEach((item: any, idx: number) => {
            if (item.positionName === isImg) {
                res = item
            }
        })
        return res
    }
    // 处理数据
    handleBodyFigure = (request: any, data: any, tabsIdx: number) => {
        let arr: any = []
        data.forEach((el: any, idx: number) => {
            request.forEach((rim: any, ix: number) => {
                let initIsCent = rim.cnetent.replace(/[\r\n]/g, '')
                let isCnet = initIsCent ? initIsCent.split('  ')[1] : ''
                // 根据cnetent判断大类
                if (el.reportArrName.indexOf(isCnet) !== -1) {
                    arr.push({
                        position: el.position,
                        className: el.className,
                        imglist: [this.handleMuscleImg(el.imgList[tabsIdx], rim.tile)],
                    })
                }
            })
        })
        this.removeRepetiton(arr)
        return arr
    }
    // 获取人体显示点
    getBodyFigure = (request: any, idx: number) => {
        let { params } = this.state
        const { upDomList, backDomList } = figureData
        params.front = this.handleBodyFigure(request, upDomList, idx) // 正面数据
        params.back = this.handleBodyFigure(request, backDomList, idx) // 背面数据
        this.setState({ params })
    }
    // 点击选中tabs
    selectTabsFn = (e: any, idx: number) => {
        const { tabs, fblObj } = this.state
        let obj: any = null
        for (var x in fblObj) {
            if (fblObj[x] === tabs[idx].num) {
                obj = fblObj[`${x.split('Num')[0]}Date`]
            }
        }
        this.bodyFigure.clickCancelFn()
        this.getBodyFigure(obj, idx)
        this.setState({ tabsIdx: idx })
    }
    // 点击图表点
    handleClickPointFunc(item: any) {
        // 获取对应人体数据
        getActionEvaluationInfo({ dtId: item.id }).then((res: any) => {
            let { fblObj, tabs } = this.state
            fblObj = res.data
            // tabs 数量
            tabs.forEach((el: any) => {
                if (el.type === 'jhgd') el.num = res.data.jhgdNum
                if (el.type === 'jhbz') el.num = res.data.jhbzNum
                if (el.type === 'jhhl') el.num = res.data.jhhlNum
            })
            this.getBodyFigure(res.data.jhgdDate, 0)
            this.setState({
                tabs,
                fblObj,
            })
        })
    }

    render() {
        return (
            <div className={AeStyle.wrapper}>
                {/* 图表 */}
                {this.props.chartData.length > 0 && (
                    <PosCharts
                        chartId='perfect-circumference-chart'
                        chartData={this.props.chartData}
                        clickPointCallback={this.handleClickPointFunc.bind(this)}
                    />
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
                                onClick={(e) => this.selectTabsFn(e, idx)}
                            >
                                <p>{el.txt}</p>
                                <p>({el.num}项)</p>
                            </div>
                        )
                    })}
                </div>
                <BodyFigure onRef={this.onRef} params={this.state.params}></BodyFigure>
                <div style={{ height: '300px' }}></div>
            </div>
        )
    }
}
