// 动作评估
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import PosCharts from '../../../components/pos_charts'
import FiancoContrast from '../../../components/fianco_contrast'
import BodyFigure from './components/body_figure'
import { getActionEvaluationInfo } from '../../../../apis/report/bapp'
import AeStyle from './index.module.scss'
import { figureData } from './components/body_figure/figure_data'
// import { ChartItemRules } from '../../../../types/components/pos_charts'

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
    componentDidUpdate(prevProps: any, prevState: any) {
        const oldChartData = JSON.stringify(prevState.chartData)
        const newChartData = JSON.stringify(this.state.chartData)
        if (oldChartData !== newChartData) {
            this.handleClickPointFunc(this.state.chartData[0].id)
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
    handleBodyFigure = (request: any, data: any) => {
        let { tabsIdx } = this.state
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
    getBodyFigure = (request: any) => {
        let { params } = this.state
        const { upDomList, backDomList } = figureData
        params.front = this.handleBodyFigure(request, upDomList) // 正面数据
        params.back = this.handleBodyFigure(request, backDomList) // 背面数据
        this.setState({ params })
    }
    // 点击选中tabs
    selectTabsFn = (e: any, idx: number) => {
        this.setState({ tabsIdx: idx })
        // this.getBodyFigure(this.state.fblObj[])
    }
    // 点击图表点
    handleClickPointFunc(item: any) {
        // 获取对应人体数据
        getActionEvaluationInfo({ dtId: item }).then((res: any) => {
            let { fblObj, tabs, params } = this.state
            fblObj = res.data
            // tabs 数量
            tabs.forEach((el: any) => {
                if (el.type === 'jhgd') el.num = res.data.jhgdNum
                if (el.type === 'jhbz') el.num = res.data.jhbzNum
                if (el.type === 'jhhl') el.num = res.data.jhhlNum
            })
            this.getBodyFigure(res.data.jhgdDate)
            // params = res.data.jhgdDate
            this.setState({
                tabs,
                fblObj,
                params,
            })
        })
    }
    componentDidMount() {
        // this.getFiancoContrastData()
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
                <BodyFigure params={this.state.params}></BodyFigure>
                <div style={{ height: '300px' }}></div>
                <div className={AeStyle.footerBtn}>
                    <div className={AeStyle.goToTest}>去体侧</div>
                    <div className={AeStyle.shareBtn}>生成报告图片</div>
                </div>
            </div>
        )
    }
}
