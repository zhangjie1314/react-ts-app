// 环形图组件
import React from 'react'
import PropTypes from 'prop-types'
import F2 from '@antv/f2'
import { circleItem } from '@ctypes/components/pos_circle_charts'
import PosCircleChartsStyle from './index.module.scss'
import './index.scss'
import _ from 'lodash'

export default class PosCircleCharts extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            circleChart: null,
            circleData: [],
        }
    }
    static defaultProps = {
        chartData: [],
        chartId: '',
        score: 0,
        creatTime: '',
    }
    static propTypes = {
        chartData: PropTypes.array,
        chartId: PropTypes.string,
        score: PropTypes.number,
        creatTime: PropTypes.string,
    }
    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        const newData = JSON.stringify(nextProps.chartData)
        const oldData = JSON.stringify(prevState.circleData)
        if (newData !== oldData) {
            return {
                circleData: nextProps.chartData,
            }
        }
        return null
    }
    componentDidUpdate(prevProps: any, prevState: any) {
        if (!_.isEqual(prevState.circleData, this.state.circleData)) {
            this.initChart(this.state.circleData)
        }
    }
    componentDidMount() {
        this.initChart(this.state.circleData)
    }
    /**
     * 实例化图表
     * @param data 图表数据
     */
    initChart(data: circleItem[]) {
        let { chartId } = this.props
        let chart: any = null
        // 判断是否存在circleChart 对象 无则 创建一个
        if (!this.state.circleChart) {
            const wVal = document.body.offsetWidth
            chart = new F2.Chart({
                id: chartId,
                width: wVal,
                height: (280 / 375) * wVal,
                pixelRatio: window.devicePixelRatio,
            })
        }
        this.setState(
            {
                circleChart: chart ? chart : this.state.circleChart,
            },
            () => {
                if (chart) {
                    // 绘制圆环图表
                    this.drawChart(data)
                } else {
                    this.state.circleChart.clear()
                    this.drawChart(data)
                }
            },
        )
    }
    /**
     * 绘制圆环图表
     */
    drawChart(data: circleItem[]) {
        const { Shape, Util, Global, G, Animate } = F2
        const { Vector2 } = G
        const { circleChart } = this.state
        // 自定义形状
        Shape.registerShape('interval', 'tick', {
            draw: function (cfg: any, container: any) {
                const points = this.parsePoints(cfg.points)
                const style = Util.mix(
                    {
                        stroke: cfg.color,
                    },
                    Global.shape.interval,
                    cfg.style,
                )
                if (cfg.isInCircle) {
                    let newPoints = points.slice(0)
                    if (this._coord.transposed) {
                        newPoints = [points[0], points[3], points[2], points[1]]
                    }

                    const _cfg$center = cfg.center,
                        x = _cfg$center.x,
                        y = _cfg$center.y

                    const v = [1, 0]
                    const v0 = [newPoints[0].x - x, newPoints[0].y - y]
                    const v1 = [newPoints[1].x - x, newPoints[1].y - y]
                    const v2 = [newPoints[2].x - x, newPoints[2].y - y]

                    let startAngle = Vector2.angleTo(v, v1)
                    let endAngle = Vector2.angleTo(v, v2)
                    const r0 = Vector2.length(v0)
                    const r = Vector2.length(v1)
                    if (startAngle >= 1.5 * Math.PI) {
                        startAngle = startAngle - 2 * Math.PI
                    }

                    if (endAngle >= 1.5 * Math.PI) {
                        endAngle = endAngle - 2 * Math.PI
                    }

                    const lineWidth = r - r0
                    const newRadius = r - lineWidth / 2

                    return container.addShape('Arc', {
                        className: 'interval',
                        attrs: Util.mix(
                            {
                                x,
                                y,
                                startAngle,
                                endAngle,
                                r: newRadius,
                                lineWidth,
                                lineCap: 'round',
                                shadowColor: 'rgba(0, 0, 0, 0.6)',
                                shadowOffsetX: 0,
                                shadowOffsetY: -5,
                                shadowBlur: 50,
                            },
                            style,
                        ),
                    })
                }
            },
        })
        // 自定义动画
        Animate.registerAnimation('waveIn', function (shape: any, animateCfg: any) {
            const startAngle = shape.attr('startAngle')
            const endAngle = shape.attr('endAngle')
            shape.attr('endAngle', startAngle)
            shape.animate().to(
                Util.mix(
                    {
                        attrs: {
                            endAngle,
                        },
                    },
                    animateCfg,
                ),
            )
        })
        // 数据
        circleChart.source(data, {
            val: {
                max: 100,
            },
        })
        circleChart.coord('polar', {
            transposed: true,
            innerRadius: 0.48,
            radius: 1,
        })
        circleChart.axis(false)
        circleChart
            .interval()
            .position('name*val')
            .color('color', function (val: any) {
                return val
            })
            .shape('tick')
            .size(18)
            .animate({
                appear: {
                    animation: 'waveIn',
                    duration: 1500,
                    easing: 'elasticOut',
                },
                update: {
                    duration: 1500,
                    easing: 'elasticOut',
                },
            })
        circleChart.tooltip(false)
        data.forEach(function (obj) {
            // 背景
            circleChart.guide().arc({
                start: [obj.name, 0],
                end: [obj.name, 99.98],
                top: false,
                style: {
                    lineWidth: 18,
                    stroke: obj.bgColor,
                },
            })
        })
        // 图例
        circleChart.legend(false)
        // 积分和时间
        this.addScoreTime()
        // 渲染
        circleChart.render()
    }
    addScoreTime() {
        const { score, creatTime } = this.props
        const { circleChart } = this.state
        // 添加中间总分数
        circleChart.guide().html({
            position: ['50%', '50%'],
            html: `<div class='circle-chart-number-box'><span class='number'>${score}</span><span class='util'>分</span></div>`,
        })
        // 添加时间
        circleChart.guide().html({
            position: ['50%', '110%'],
            html: `<div class='circle-chart-time-box'>${creatTime}</div>`,
        })
    }
    render() {
        const { chartId } = this.props
        return (
            <div className={PosCircleChartsStyle['charts-wrapper']}>
                <canvas id={chartId}></canvas>
            </div>
        )
    }
}
