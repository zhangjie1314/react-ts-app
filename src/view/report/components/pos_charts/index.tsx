import React from 'react'
import PropTypes from 'prop-types'
import F2 from '@antv/f2'
import ChartItemObj from '../../../../types/components/pos_charts'
import './index.module.scss'

const ScrollBar = require('@antv/f2/lib/plugin/scroll-bar')
const Gesture = require('@antv/f2/lib/plugin/gesture')
const Tooltip = require('@antv/f2/lib/plugin/tooltip')

export default class PosCharts extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            chartObj: null,
            lineChartXTicks: [],
        }
    }
    static defaultProps = {
        chartData: [],
        chartId: '',
    }
    static propTypes = {
        chartData: PropTypes.array,
        chartId: PropTypes.string,
    }

    componentWillReceiveProps(nextProps: any) {
        // 处理数据
        this.handleChartData(nextProps.chartData)
    }
    // 处理图表数据
    handleChartData(data: ChartItemObj[]) {
        console.log(data)
        let lcxt: string[] = []
        data.map(el => {
            lcxt.push(el.time)
        })
        this.setState(
            {
                lineChartXTicks: lcxt,
            },
            () => {
                this.changeMainChart()
            },
        )
    }

    changeMainChart() {
        let { chartObj, lineChartXTicks } = this.state
        let chartData: ChartItemObj[] = this.props.chartData
        let { chartId } = this.props
        chartObj = new F2.Chart({
            id: chartId,
            pixelRatio: window.devicePixelRatio,
            animate: true,
            plugins: [ScrollBar, Gesture, Tooltip],
        })
        // 设置数据
        chartObj.source(chartData, {
            time: {
                type: 'cat',
                range: [0, 1],
                values: lineChartXTicks,
            },
        })
        // 设置不显示y轴积分轴
        chartObj.axis('grade', false)
        // 设置x轴时间轴样式
        chartObj.axis('time', {
            line: null,
            grid: {
                stroke: '#48494c',
                lineDash: [2, 2],
                lineWidth: 1,
            },
        })
        // 设置折线样式
        chartObj.line({ sortable: false }).position('time*grade').shape('smooth').color('#83848f')
        // 设置折线上点的样式
        chartObj.point().position('time*grade').shape('smooth').color('#fff').style({ stroke: '#fff', lineWidth: 1 })
        // 设置渐变区域显示样式
        chartObj.area().position('time*grade').shape('smooth').style({
            fillStyle: 'l(90) 0:#ffffff 1:#1f2122',
            fillOpacity: 0.2,
        })
        // chartObj.interaction('pan')
        // 设置滚动条样式
        chartObj.scrollBar({
            mode: 'x',
            xStyle: {
                backgroundColor: 'transparent',
                fillerColor: '#fff',
                offsetY: -5,
            },
        })
        // 设置点击等事件处理
        chartObj.pluginGesture({
            gesture: {
                tap(data: any, event: any) {
                    console.log('tap', data, event)
                },
            },
        })
        // 渲染
        chartObj.render()
        this.setState({
            chartObj,
        })
    }

    componentWillUnmount() {
        this.state.chartObj.clear()
    }

    render() {
        let { chartId } = this.props
        return <canvas id={chartId} style={{ width: '100%' }}></canvas>
    }
}
