// 曲线图组件
import React from 'react'
import PropTypes from 'prop-types'
import F2 from '@antv/f2/lib/core'
import { ChartItemRules } from '@ctypes/components/pos_charts'
import PosChartStyle from './index.module.scss'

require('@antv/f2/lib/geom/line') // 只加载折线图
require('@antv/f2/lib/geom/point') // 只加载点图
require('@antv/f2/lib/geom/area') // 只加载点图
require('@antv/f2/lib/interaction/pan') // 加载平移
require('@antv/f2/lib/component/guide/point') // 加载guide point
require('@antv/f2/lib/component/guide/html') // 加载guide html
const ScrollBar = require('@antv/f2/lib/plugin/scroll-bar')
const Gesture = require('@antv/f2/lib/plugin/gesture')
const Tooltip = require('@antv/f2/lib/plugin/tooltip')
const Guide = require('@antv/f2/lib/plugin/guide')

export default class PosCharts extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            lineChart: null,
            lineChartXTicks: [],
            lineChartYTicks: [],
            chartTooltipText: '',
            pointsObj: null,
            listData: [],
            curPoint: {},
        }
    }
    static defaultProps = {
        chartData: [],
        chartId: '',
        clickPointCallback: (res: any) => {},
    }
    static propTypes = {
        chartData: PropTypes.array,
        chartId: PropTypes.string,
        clickPointCallback: PropTypes.func,
    }
    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        const newData = JSON.stringify(nextProps.chartData)
        const oldData = JSON.stringify(prevState.listData)
        if (newData !== oldData) {
            let arr = nextProps.chartData.reverse()
            arr.map((el: any, idx: number) => (el.sort = idx)) // 处理数据显示折线图
            return {
                listData: arr,
            }
        }
        return null
    }
    componentDidUpdate(prevProps: any, prevState: any) {
        const cpData = JSON.stringify(prevState.curPoint)
        const ncpData = JSON.stringify(this.state.curPoint)
        if (ncpData && cpData !== ncpData && cpData !== '{}') {
            this.moveShowPoint()
        }
    }
    componentDidMount() {
        this.handleChartData(this.state.listData)
    }
    // 处理图表数据
    handleChartData(data: ChartItemRules[]) {
        let lcxt: string[] = []
        let lcyt: any[] = []
        let { chartId } = this.props
        let chart = null
        this.state.listData.forEach((el: any, idx: number) => {
            lcxt.push(el.time)
            lcyt.push(el.grade)
        })
        // 判断是否存在linechart 对象 无则 创建一个
        if (this.state.lineChart) {
            this.state.lineChart.clear()
        }
        const wVal = document.body.offsetWidth
        chart = new F2.Chart({
            id: chartId,
            height: (220 / 375) * wVal,
            pixelRatio: window.devicePixelRatio,
            plugins: [ScrollBar, Tooltip, Gesture, Guide],
            padding: [40, 30, 'auto', 30],
        })
        this.setState(
            {
                lineChartXTicks: lcxt,
                lineChartYTicks: lcyt,
                lineChart: chart ? chart : this.state.lineChart,
                curPoint: data[data.length - 1],
            },
            () => {
                this.changeMainChart()
            }
        )
    }

    changeMainChart() {
        let { lineChart, curPoint } = this.state
        let chartData: ChartItemRules[] = this.state.listData
        lineChart.source(chartData, {
            sort: {
                min: 0,
                max: 6,
            },
        })
        // 设置折线样式
        lineChart.line({ sortable: false }).position('sort*grade').shape('smooth').color('#5CDC75')
        // 设置分数轴的样式
        lineChart.axis('grade', {
            grid: {
                stroke: '#48494c',
                lineDash: [2, 2],
                lineWidth: 1,
            },
            line: null,
        })
        // 设置时间轴的样式
        lineChart.axis('sort', {
            line: {
                lineWidth: 1,
                stroke: '#292929',
                top: true,
            },
            grid: null,
            label(text: string, index: number, total: any) {
                return {
                    fontSize: 12,
                    // 在这里将横坐标显示为 time
                    text: chartData[index] ? chartData[index].time : '',
                }
            },
        })
        // 设置点击等事件处理
        lineChart.pluginGesture({
            gesture: {
                tap: (data: any) => {
                    this.setState({
                        curPoint: data[0],
                    })
                    this.props.clickPointCallback(data[0])
                },
            },
        })
        // 图表平移
        lineChart.interaction('pan')
        // 定义进度条
        lineChart.scrollBar({
            mode: 'x',
            xStyle: {
                offsetY: -5,
            },
        })
        lineChart.tooltip(false)
        // 显示当前选择的点
        const linePoint = lineChart.guide().point({
            top: true,
            position: [curPoint.sort, curPoint.grade],
            limitInPlot: true,
            style: {
                fill: '#fff',
                lineWidth: 10,
                strokeStyle: '#fff',
                strokeOpacity: 0.2,
            },
        })
        // 创建当前显示的提示框
        const lineTips = lineChart.guide().html({
            position: [curPoint.sort, curPoint.grade],
            html: this.creatPointHtml(curPoint),
            limitInPlot: true,
        })
        // 渲染
        lineChart.render()
        // 设置数据
        this.setState({
            pointsObj: {
                linePoint,
                lineTips,
            },
        })
    }
    /**
     * 移动显示点提示
     */
    moveShowPoint() {
        let { curPoint, pointsObj } = this.state
        pointsObj.linePoint.position = [curPoint.sort, curPoint.grade]
        pointsObj.linePoint.repaint()
        pointsObj.lineTips.position = [curPoint.sort, curPoint.grade]
        pointsObj.lineTips.html = this.creatPointHtml(curPoint)
        pointsObj.lineTips.repaint()
    }
    /**
     * 生成提示boxhtml
     */
    creatPointHtml(data: any) {
        return `<div
        style="line-height:24px;background:#fff;text-align:center;border-radius:24px;white-space:nowrap;width:46px;margin-top:-26px;color:#0c0c0c;font-size:12px;">
            ${data.grade}${data.type === 6 ? 'kg' : '分'}
            <div style="position: absolute;bottom:-4px;left:50%;border-top: 5px solid #fff;border-left: 5px solid transparent;border-right: 5px solid transparent;transform: translateX(-50%);"></div>
        </div>`
    }
    componentWillUnmount() {
        if (this.state.lineChart) {
            this.state.lineChart.clear()
        }
    }
    render() {
        let { chartId } = this.props
        return (
            <div className={PosChartStyle['charts-wrapper']}>
                <canvas id={chartId} style={{ width: '100%' }}></canvas>
            </div>
        )
    }
}
