// 完美围度
import React, { Component } from 'react'
import PosCharts from '../../../components/pos_charts'
import FiancoContrast from '../../../components/fianco_contrast'
import PropTypes from 'prop-types'
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
    static defaultProps = {
        chartData: [],
        fiancoData: [],
    }
    static propType = {
        chartData: PropTypes.array,
        fiancoData: PropTypes.array,
    }
    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        return {
            chartData: nextProps.chartData,
            fiancoData: nextProps.fiancoData,
        }
    }
    // 获取体侧数据
    getFiancoContrastData = () => {
        const fblObj: fblObjType = {
            num: 80,
            pj: '较好',
            bmi: '22正常',
            jb: 90,
            photo: '',
        }
        this.setState({ fblObj })
    }
    render() {
        const { chartData, fblObj } = this.state
        return (
            <div className={PcStyle['wrapper']}>
                {/* 图表 */}
                {chartData.length > 0 && <PosCharts chartId='perfect-circumference-chart' chartData={chartData} />}
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
                <div className={PcStyle.footerBtn}>
                    <div className={PcStyle.goToTest}>去体侧</div>
                    <div className={PcStyle.shareBtn}>分享报告图片</div>
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.getFiancoContrastData()
    }
}
