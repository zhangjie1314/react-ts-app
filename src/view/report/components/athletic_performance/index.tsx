import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { callAppMenthd } from '@utils/index'
import AthleticPerformanceStyle from './index.module.scss'
import PosCharts from '@comps/pos_charts'
import PosCircleCharts from '@comps/pos_circle_charts'
import FiancoContrast from '@comps/fianco_contrast'
import { ChartItemRules } from '@ctypes/components/pos_charts'
import { getActionPerformanceResult } from '@apis/report/bapp'
import Util from './util'

@inject('reportStore')
@observer
export default class AthleticPerformance extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            chartData: [],
            fiancoData: [],
            coachInfo: {},
            circleData: [],
            athleticPerformanceData: {},
            score: 0,
            creatTime: '',
            listData: [],
            typesData: [],
            countCompany: [
                //测试描述单位:1:次数,2:距离,3:时间,4:角度
                '无',
                '次',
                'cm',
                '秒',
                '度',
                'kg',
            ],
            dumpFixed: false,
            curSelectTabIdx: 0,
        }
    }
    static defaultProps = {
        chartData: [],
        fiancoData: [],
        coachInfo: {},
    }
    static propType = {
        chartData: PropTypes.array,
        fiancoData: PropTypes.array,
        coachInfo: PropTypes.object,
    }
    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        return {
            chartData: nextProps.chartData,
            fiancoData: nextProps.fiancoData,
            coachInfo: nextProps.coachInfo,
        }
    }
    // 去体测
    private gotoTcFun = () => {
        const { userInfos } = this.props.reportStore
        callAppMenthd('gotoTestTool', {
            age: userInfos.age,
            birthday: userInfos.birthday,
            gender: userInfos.gender,
            height: userInfos.height,
            memberId: userInfos.memberId,
            name: userInfos.name,
            weight: userInfos.weight,
            headPath: userInfos.headPath,
        })
    }
    componentDidUpdate(prevProps: any, prevState: any) {
        if (!_.isEqual(this.state.chartData, prevState.chartData) && !_.isEmpty(this.state.chartData)) {
            const ln = this.state.chartData.length
            ln > 0 && this.handleClickPointFunc(this.state.chartData[ln - 1])
        }
    }
    // 点击图表点
    handleClickPointFunc(item: ChartItemRules) {
        getActionPerformanceResult({
            wdId: item.id,
        }).then((res: any) => {
            const circleData = res.data.ydAllSunDataVo.ldDataVo
            circleData.map((item: any, index: number) => {
                if (index === 0) {
                    item.color = '#5260de'
                } else if (index === 1) {
                    item.color = '#32a7e7'
                } else if (index === 2) {
                    item.color = '#52dea4'
                }
                item.percent = item.val
                item.bgColor = '#242630'
                return item
            })
            this.setState(
                {
                    athleticPerformanceData: res.data,
                    circleData,
                    score: res.data.ydAllSunDataVo.grade,
                    creatTime: res.data.ydbxVO.day,
                },
                () => {
                    // 处理类型展示数据（版本兼容）
                    this.handleTypesShowData(res.data)
                },
            )
        })
    }
    // 处理类型展示数据（版本兼容）
    handleTypesShowData(data: any) {
        const { circleData } = this.state
        const baseData = data.ydbxVO
        let resultArr = []
        // 倒序数据使其能匹配另个对象的数据顺序
        const typesObj = circleData.reverse()
        // 处理类别条目数据
        let typesArr = Util.handleTypesListFunc(data.ldDataVo, typesObj)
        // 处理版本兼容
        if (baseData.ver) {
            const verArr = baseData.ver.split('.')
            //版本号第一位
            if (verArr[0] === '3') {
                //版本号第二位
                if (verArr[1] === '1') {
                    resultArr = Util.handleOldDataFunc(baseData, typesObj)
                } else {
                    //版本号第一位为 3的版本规则
                    resultArr = Util.handleNewDataFunc(baseData, typesObj)
                }
            } else {
                //最新的版本规则
                resultArr = Util.handleNewDataFunc(baseData, typesObj)
            }
        } else {
            //最老版本的规则
            resultArr = Util.handleOldDataFunc(baseData, typesObj)
        }
        this.setState({
            typesData: typesArr,
            listData: resultArr,
        })
    }
    // 页面滚动
    // 最外层盒子
    atchleticBox: any | null = null
    // 需要浮动的盒子
    dumpRefBox: any | null = null
    pageScrollFunc() {
        const scrollTopVal = this.atchleticBox.scrollTop
        const domTopVal = this.dumpRefBox.offsetTop - this.atchleticBox.offsetTop
        this.setState({
            dumpFixed: scrollTopVal >= domTopVal,
        })
        this.handleFixedBtn(scrollTopVal)
    }
    // 处理滚动按钮样式
    handleFixedBtn(scrollTopVal: number) {
        let showIdx: number = 0
        // 标题节点
        const title1 = this.refs.title_0 as HTMLElement
        const title2 = this.refs.title_1 as HTMLElement
        const title3 = this.refs.title_2 as HTMLElement
        // 标题距离顶部距离
        const title1TopVal = title1.offsetTop - this.atchleticBox.offsetTop - this.dumpRefBox.offsetHeight
        const title2TopVal = title2.offsetTop - this.atchleticBox.offsetTop - this.dumpRefBox.offsetHeight
        const title3TopVal = title3.offsetTop - this.atchleticBox.offsetTop - this.dumpRefBox.offsetHeight
        // 判断选中哪个按钮
        if (scrollTopVal >= title1TopVal) {
            showIdx = 0
        }
        if (scrollTopVal >= title2TopVal) {
            showIdx = 1
        }
        if (scrollTopVal >= title3TopVal) {
            showIdx = 2
        }
        this.setState({
            curSelectTabIdx: showIdx,
        })
    }
    // 处理点击tab按钮事件
    handleTabClick(idx: number) {
        const stVal: number =
            (this.refs[`title_${idx}`] as HTMLElement).offsetTop -
            this.atchleticBox.offsetTop -
            this.dumpRefBox.offsetHeight
        this.atchleticBox.scrollTop = stVal
        this.setState({
            curSelectTabIdx: idx,
        })
    }
    // 列表内数据
    listInlineDomFunc(itm: any, idx: number) {
        const { countCompany } = this.state
        return (
            <div key={idx}>
                {itm.title ? <div className={AthleticPerformanceStyle['title']}>{itm.title}</div> : null}
                {itm.warning ? <div className={AthleticPerformanceStyle['sub-title']}>{itm.warning}</div> : null}
                <div className={AthleticPerformanceStyle['content']}>
                    <div className={AthleticPerformanceStyle['data-item']}>
                        <div className={AthleticPerformanceStyle['item-top-box']}>
                            <div className={AthleticPerformanceStyle['itb-title']}>{itm.content}</div>
                            <div className={AthleticPerformanceStyle['itb-sub-title']}>
                                {itm.zl ? `${itm.zl}kg ` : ''}
                                {`${itm.count.number}${countCompany[itm.count.type]}`}
                            </div>
                            <div className={AthleticPerformanceStyle['itb-inline-box']}>
                                <div className={AthleticPerformanceStyle['itb-data-box']}>
                                    <div className={AthleticPerformanceStyle['itbd-line']}>
                                        <div
                                            className={`${AthleticPerformanceStyle['il-item']} ${
                                                itm.level === '很差' ? AthleticPerformanceStyle['active'] : ''
                                            }`}
                                        >
                                            <div className={AthleticPerformanceStyle['ii-line']}>
                                                <div className={AthleticPerformanceStyle['ii-cur-val']}></div>
                                            </div>
                                            <div className={AthleticPerformanceStyle['ii-txt']}>很差</div>
                                        </div>
                                        <div
                                            className={`${AthleticPerformanceStyle['il-item']} ${
                                                itm.level === '较差' ? AthleticPerformanceStyle['active'] : ''
                                            }`}
                                        >
                                            <div className={AthleticPerformanceStyle['ii-line']}>
                                                <div className={AthleticPerformanceStyle['ii-cur-val']}></div>
                                            </div>
                                            <div className={AthleticPerformanceStyle['ii-txt']}>较差</div>
                                        </div>
                                        <div
                                            className={`${AthleticPerformanceStyle['il-item']} ${
                                                itm.level === '合格' ? AthleticPerformanceStyle['active'] : ''
                                            }`}
                                        >
                                            <div className={AthleticPerformanceStyle['ii-line']}></div>
                                            <div className={AthleticPerformanceStyle['ii-txt']}>合格</div>
                                        </div>
                                        <div
                                            className={`${AthleticPerformanceStyle['il-item']} ${
                                                itm.level === '较好' ? AthleticPerformanceStyle['active'] : ''
                                            }`}
                                        >
                                            <div className={AthleticPerformanceStyle['ii-line']}>
                                                <div className={AthleticPerformanceStyle['ii-cur-val']}></div>
                                            </div>
                                            <div className={AthleticPerformanceStyle['ii-txt']}>较好</div>
                                        </div>
                                        <div
                                            className={`${AthleticPerformanceStyle['il-item']} ${
                                                itm.level === '优秀' ? AthleticPerformanceStyle['active'] : ''
                                            }`}
                                        >
                                            <div className={AthleticPerformanceStyle['ii-line']}>
                                                <div className={AthleticPerformanceStyle['ii-cur-val']}></div>
                                            </div>
                                            <div className={AthleticPerformanceStyle['ii-txt']}>优秀</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={AthleticPerformanceStyle['item-bottom-box']}>{itm.desc}</div>
                    </div>
                </div>
            </div>
        )
    }
    // 列表
    listDomFunc(item: any, idx: number) {
        return (
            <div className={AthleticPerformanceStyle['c-inline-box']} key={idx}>
                <div className={AthleticPerformanceStyle['big-title']} ref={`title_${idx}`}>
                    {item.name}类
                </div>
                {item.list.map((itm: any, idx: number) => {
                    return this.listInlineDomFunc(itm, idx)
                })}
            </div>
        )
    }
    render() {
        const {
            chartData,
            fiancoData,
            circleData,
            score,
            creatTime,
            listData,
            typesData,
            dumpFixed,
            curSelectTabIdx,
        } = this.state
        const { isShare } = this.props.reportStore
        return (
            <div
                className={AthleticPerformanceStyle['wrapper']}
                ref={c => (this.atchleticBox = c)}
                onScrollCapture={this.pageScrollFunc.bind(this)}
            >
                <div className={AthleticPerformanceStyle['inline-wrapper']}>
                    {/* 图表 */}
                    {chartData.length > 0 && (
                        <PosCharts
                            chartId='athletic-performance-chart'
                            chartData={chartData}
                            clickPointCallback={this.handleClickPointFunc.bind(this)}
                        />
                    )}
                    {/* 对比 */}
                    <FiancoContrast fiancoArr={fiancoData} />
                    {/* 圆环图表 */}
                    {circleData.length > 0 && (
                        <PosCircleCharts
                            chartId='athletic-performance-circle-chart'
                            chartData={circleData}
                            score={score}
                            creatTime={creatTime}
                        />
                    )}
                    {/* 数据 */}
                    <div className={AthleticPerformanceStyle['data-box']}>
                        {typesData.map((item: any, idx: number) => {
                            return (
                                <div className={AthleticPerformanceStyle['item']} key={idx}>
                                    <div className={AthleticPerformanceStyle['title']} style={{ color: item.color }}>
                                        {item.name}类
                                    </div>
                                    <div className={AthleticPerformanceStyle['dbi-box']}>
                                        {item.list.map((itm: any, index: number) => {
                                            return (
                                                <div
                                                    className={AthleticPerformanceStyle['dbib-item']}
                                                    key={`${idx}${index}`}
                                                >
                                                    <div className={AthleticPerformanceStyle['dbib-txt']}>
                                                        {itm.name}
                                                    </div>
                                                    <div className={AthleticPerformanceStyle['dbib-progress-bar']}>
                                                        <div
                                                            className={AthleticPerformanceStyle['dpb-num']}
                                                            style={{
                                                                width: `${
                                                                    (itm.val / 100) * 100 > 100
                                                                        ? 100
                                                                        : (itm.val / 100) * 100 < 0
                                                                        ? 0
                                                                        : (itm.val / 100) * 100
                                                                }%`,
                                                                backgroundColor: item.color,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {/* 跳转按钮 */}
                    <div className={AthleticPerformanceStyle['dump-box']} ref={c => (this.dumpRefBox = c)}>
                        <div
                            className={`${AthleticPerformanceStyle['dump-inline-box']} ${
                                dumpFixed ? AthleticPerformanceStyle['fixed-box'] : ''
                            }`}
                        >
                            {listData.map((item: any, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        className={`${AthleticPerformanceStyle['dib-item']} ${
                                            curSelectTabIdx === index ? AthleticPerformanceStyle['active'] : ''
                                        }`}
                                        onClick={this.handleTabClick.bind(this, index)}
                                        style={{
                                            background:
                                                curSelectTabIdx === 0 && curSelectTabIdx === index
                                                    ? listData[0].color
                                                    : curSelectTabIdx === 1 && curSelectTabIdx === index
                                                    ? listData[1].color
                                                    : curSelectTabIdx === 2 && curSelectTabIdx === index
                                                    ? listData[2].color
                                                    : '',
                                        }}
                                    >
                                        <div className={AthleticPerformanceStyle['di-title']}>{item.name}类</div>
                                        <div className={AthleticPerformanceStyle['di-count']}>
                                            ({item.list.length}项)
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {/* 体适能数据 */}
                    <div className={AthleticPerformanceStyle['content-box']}>
                        {listData.map((item: any, index: number) => {
                            return this.listDomFunc(item, index)
                        })}
                    </div>
                    {/* 底部按钮 */}
                    {isShare === 1 ? null : (
                        <div className={AthleticPerformanceStyle['bottom-btn-box']}>
                            <div className={AthleticPerformanceStyle['qtc-btn']} onClick={this.gotoTcFun}>
                                去体测
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
