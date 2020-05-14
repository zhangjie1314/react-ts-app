import React, { Component } from 'react'
import _ from 'lodash'
import F2 from '@antv/f2'

interface defProps {
    barData: any[]
    firstName: string
}

export default class BarChart extends Component<defProps, any> {
    constructor(props: defProps) {
        super(props)
        this.state = {
            chartObj: null,
            barData: [],
            firstName: '',
        }
    }
    static defaultProps: defProps = {
        barData: [],
        firstName: '',
    }
    static getDerivedStateFromProps(nextProps: defProps, prevState: any) {
        return {
            barData: nextProps.barData,
            firstName: nextProps.firstName,
        }
    }
    componentDidUpdate(prevProps: defProps, prevState: any) {
        const { barData } = this.state
        if (!_.isEqual(prevProps.barData, barData)) {
            this.drawChart()
        }
    }
    componentDidMount() {
        const wVal = document.body.offsetWidth
        const chart = new F2.Chart({
            id: 'container',
            pixelRatio: window.devicePixelRatio,
            height: (500 / 375) * wVal,
            padding: ['auto', 30, 'auto', 70],
        })
        this.setState({
            chartObj: chart,
        })
    }
    // 绘制图表
    drawChart() {
        const { chartObj, barData, firstName } = this.state
        chartObj.source(barData)
        chartObj.coord({
            transposed: true,
        })
        // 禁止图例点击
        chartObj.legend({
            clickable: false,
        })
        // 设置y轴
        chartObj.axis('xVal', {
            grid: null,
            tickLine: null,
            label: {
                textAlign: 'center',
                textBaseline: 'middle',
                fontSize: 12,
            },
            labelOffset: 35,
        })
        // 设置x轴
        chartObj.axis('yVal', {
            grid: {
                stroke: '#48494c',
                lineDash: [2, 2],
                lineWidth: 1,
            },
            line: null,
            label: null,
        })
        // 设置条状图
        chartObj
            .interval()
            .position('xVal*yVal')
            .color('name', (name: string) => {
                if (name !== firstName) {
                    return '#f75944'
                } else {
                    return '#ffc701'
                }
            })
            .adjust({
                type: 'dodge',
                marginRatio: 0.01, // 设置分组间柱子的间距
            })
            .size(5)
        // 坐标系翻转
        chartObj.coord({
            transposed: true,
        })
        // 关闭提示
        chartObj.tooltip(null)
        // 渲染
        chartObj.render()
        // 绘制条状图后边的文字
        this.drawChartNumber()
    }
    // 绘制条状图后边的文字
    drawChartNumber() {
        const { chartObj, barData, firstName } = this.state
        const canvas = chartObj.get('canvas')
        const group = canvas.addGroup()
        barData.forEach((el: any) => {
            const point = chartObj.getPosition(el)
            let x = point.x + 20
            let y = point.y - 4
            if (el.name === firstName) {
                y = point.y + 11
            }
            group.addShape('text', {
                attrs: {
                    x: x,
                    y: y,
                    text: el['yVal'],
                    textAlign: 'center',
                    textBaseline: 'center',
                    fontWeight: 'bold',
                    fill: '#fff',
                },
            })
        })
    }
    render() {
        return <canvas id='container' style={{ width: '100%' }}></canvas>
    }
}
