// 静态评估
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import Html2canvas from 'html2canvas'
import QRCode from 'qrcode.react'
import { PhotoProvider, PhotoConsumer } from 'react-photo-view'
import { callAppMenthd, callAppShareImgMenthd, handleHandImg } from '@utils/index'
import StaticEvaluationStyle from './index.module.scss'
import PosCharts from '@comps/pos_charts'
import FiancoContrast from '@comps/fianco_contrast'
import { ChartItemRules } from '@ctypes/components/pos_charts'
import { getStaticEvaluationResult } from '@apis/report/bapp'
import StaticDataJson from './data.json'
import leftOLeg from '@assets/img/static_evaluation_img/left_o_leg2.png'
import leftXLeg from '@assets/img/static_evaluation_img/left_x_leg2.png'
import leftInnerFoot from '@assets/img/static_evaluation_img/left_inner_foot2.png'
import leftOutFoot from '@assets/img/static_evaluation_img/left_out_foot2.png'
import pelvicBackS from '@assets/img/static_evaluation_img/pelvic_back_s2.png'
import pelvicHeadS from '@assets/img/static_evaluation_img/pelvic_head_s2.png'
import humpbackS from '@assets/img/static_evaluation_img/humpback_s2.png'
import lowerjawS from '@assets/img/static_evaluation_img/lowerjaw_s2.png'
import shoulderL from '@assets/img/static_evaluation_img/shoulder_l2.png'
import shoulderR from '@assets/img/static_evaluation_img/shoulder_r2.png'
import rightOS from '@assets/img/static_evaluation_img/right_o_leg2.png'
import rightXLeg from '@assets/img/static_evaluation_img/right_x_leg2.png'
import rightInnerFoot from '@assets/img/static_evaluation_img/right_inner_foot2.png'
import rightOutFoot from '@assets/img/static_evaluation_img/right_out_foot2.png'
import headL2 from '@assets/img/static_evaluation_img/head_l2.png'
import headR2 from '@assets/img/static_evaluation_img/head_r2.png'
import DataItem from './components/data_item'

@inject('reportStore')
@observer
class StaticEvaluation extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            chartData: [],
            fiancoData: [],
            coachInfo: {},
            imgHandleing: false,
            shareBtnTxt: '分享报告图片',
            staticEvaluationData: {},
            listData: [],
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
    // html转图片
    private toImg = () => {
        const shareRef = this.refs.fitShareBox as HTMLElement
        this.setState({
            imgHandleing: true,
            shareBtnTxt: '正在处理图片中...',
        })
        Html2canvas(shareRef, {
            useCORS: true,
            scale: 2,
        }).then((res: any) => {
            const ctx: any = res.getContext('2d')
            // 关闭抗锯齿
            ctx.mozImageSmoothingEnabled = false
            ctx.webkitImageSmoothingEnabled = false
            ctx.msImageSmoothingEnabled = false
            ctx.imageSmoothingEnabled = false
            const data = ctx.canvas.toDataURL('image/png')
            callAppShareImgMenthd(data, this.props.reportStore.tabsId)
            this.setState({
                imgHandleing: false,
                shareBtnTxt: '分享报告图片',
            })
        })
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
        const oldChartData = JSON.stringify(prevState.chartData)
        const newChartData = JSON.stringify(this.state.chartData)
        if (oldChartData !== newChartData && newChartData !== '[]') {
            const ln = this.state.chartData.length
            ln > 0 && this.handleClickPointFunc(this.state.chartData[ln - 1])
        }
    }
    // 点击图表点
    handleClickPointFunc(item: ChartItemRules) {
        getStaticEvaluationResult({
            wdId: item.id,
        }).then((res: any) => {
            this.handleDataFunc(res.data)
        })
    }
    // 处理数据
    handleDataFunc(res: any) {
        const { isFromStudio } = this.props.reportStore
        // 图片处理
        res.jbqxqkUrl = res.jbqxqkUrl ? handleHandImg(res.jbqxqkUrl, isFromStudio) : ''
        res.nwbqklUrl = res.nwbqklUrl ? handleHandImg(res.nwbqklUrl, isFromStudio) : ''
        res.nwbqkrUrl = res.nwbqkrUrl ? handleHandImg(res.nwbqkrUrl, isFromStudio) : ''
        res.qjqkxolUrl = res.qjqkxolUrl ? handleHandImg(res.qjqkxolUrl, isFromStudio) : ''
        res.qjqkxorUrl = res.qjqkxorUrl ? handleHandImg(res.qjqkxorUrl, isFromStudio) : ''
        res.sbqxqkUrl = res.sbqxqkUrl ? handleHandImg(res.sbqxqkUrl, isFromStudio) : ''
        res.tbqkUrl = res.tbqkUrl ? handleHandImg(res.tbqkUrl, isFromStudio) : ''
        res.tbqxqkUrl = res.tbqxqkUrl ? handleHandImg(res.tbqxqkUrl, isFromStudio) : ''
        res.url1 = res.url1 ? handleHandImg(res.url1, isFromStudio) : ''
        res.url2 = res.url2 ? handleHandImg(res.url2, isFromStudio) : ''
        res.xeqsqkUrl = res.xeqsqkUrl ? handleHandImg(res.xeqsqkUrl, isFromStudio) : ''
        // 处理列表数据
        const listData = this.handleListDataFunc(res)
        this.setState({
            staticEvaluationData: res,
            listData,
        })
    }
    // 处理列表item数据
    handleListDataFunc(data: any): any[] {
        const reslut: any[] = []
        const levelData: any = {
            // 重度
            levelObj0: {
                level: '重度',
                parts: [],
            },
            // 中度
            levelObj1: {
                level: '中度',
                parts: [],
            },
            // 轻微
            levelObj2: {
                level: '轻微',
                parts: [],
            },
            // 正常
            levelObj3: {
                level: '正常',
                parts: [],
            },
        }
        const jsonData: any = StaticDataJson
        // 肩部倾斜情况 (兼容旧版本数据不分左右)
        if (data.jbqxqkR) {
            const levelType: string = this.getDataTypeFun(data.jbqxqkR)
            levelData[levelType].parts.push({
                angle: `${data.jbqxqk}°`,
                img: shoulderL,
                photoImg: data.jbqxqkUrl,
                partName: jsonData.jbqxqk[data.jbqxqkR].partName,
                description: jsonData.jbqxqk[data.jbqxqkR].description,
                possibleConsequences: jsonData.jbqxqk[data.jbqxqkR].possibleConsequences,
                proposal: jsonData.jbqxqk[data.jbqxqkR].proposal,
            })
        }
        // 肩部倾斜情况 左
        if (data.jbqxqklR) {
            const levelType: string = this.getDataTypeFun(data.jbqxqklR)
            levelData[levelType].parts.push({
                angle: `${data.jbqxqkl2}°`,
                img: shoulderL,
                photoImg: data.jbqxqkUrl,
                partName: jsonData.jbqxqk[data.jbqxqklR].partName,
                description: jsonData.jbqxqk[data.jbqxqklR].description,
                possibleConsequences: jsonData.jbqxqk[data.jbqxqklR].possibleConsequences,
                proposal: jsonData.jbqxqk[data.jbqxqklR].proposal,
            })
        }
        // 肩部倾斜情况 右
        if (data.jbqxqkrR) {
            const levelType: string = this.getDataTypeFun(data.jbqxqkrR)
            levelData[levelType].parts.push({
                angle: `${data.jbqxqkr2}°`,
                img: shoulderR,
                photoImg: data.jbqxqkUrl,
                partName: jsonData.jbqxqk[data.jbqxqkrR].partName,
                description: jsonData.jbqxqk[data.jbqxqkrR].description,
                possibleConsequences: jsonData.jbqxqk[data.jbqxqkrR].possibleConsequences,
                proposal: jsonData.jbqxqk[data.jbqxqkrR].proposal,
            })
        }
        // 内外八情况 左
        if (data.nwbqklR) {
            const levelType: string = this.getDataTypeFun(data.nwbqklR)
            levelData[levelType].parts.push({
                angle: `${data.nwbqkl}°`,
                img: data.nwbqkl > 15 ? leftOutFoot : data.nwbqkl < -5 ? leftInnerFoot : leftOutFoot,
                photoImg: data.nwbqklUrl,
                partName:
                    data.nwbqkl > 15
                        ? jsonData.nwbqkl[data.nwbqklR].wpartName
                        : data.nwbqkl < -5
                        ? jsonData.nwbqkl[data.nwbqklR].npartName
                        : jsonData.nwbqkl[data.nwbqklR].wpartName,
                description: jsonData.nwbqkl[data.nwbqklR].description,
                possibleConsequences: jsonData.nwbqkl[data.nwbqklR].possibleConsequences,
                proposal: jsonData.nwbqkl[data.nwbqklR].proposal,
            })
        }
        // 内外八情况 右
        if (data.nwbqkrR) {
            const levelType: string = this.getDataTypeFun(data.nwbqkrR)
            levelData[levelType].parts.push({
                angle: `${data.nwbqkr}°`,
                img: data.nwbqkr > 15 ? rightOutFoot : data.nwbqkr < -5 ? rightInnerFoot : rightOutFoot,
                photoImg: data.nwbqkrUrl,
                partName:
                    data.nwbqkr > 15
                        ? jsonData.nwbqkr[data.nwbqkrR].wpartName
                        : data.nwbqkr < -5
                        ? jsonData.nwbqkr[data.nwbqkrR].npartName
                        : jsonData.nwbqkr[data.nwbqkrR].wpartName,
                description: jsonData.nwbqkr[data.nwbqkrR].description,
                possibleConsequences: jsonData.nwbqkr[data.nwbqkrR].possibleConsequences,
                proposal: jsonData.nwbqkr[data.nwbqkrR].proposal,
            })
        }
        // Q脚情况-X,O左边
        if (data.qjqkxolR) {
            const levelType: string = this.getDataTypeFun(data.qjqkxolR)
            levelData[levelType].parts.push({
                angle: `${data.qjqkxol}°`,
                img: data.qjqkxol < 177.01 ? leftXLeg : data.qjqkxol > 183 ? leftOLeg : leftXLeg,
                photoImg: data.qjqkxolUrl,
                partName:
                    data.qjqkxol < 177.01
                        ? jsonData.xoxtqkl[data.qjqkxolR].xpartName
                        : data.qjqkxol > 183
                        ? jsonData.xoxtqkl[data.qjqkxolR].opartName
                        : jsonData.xoxtqkl[data.qjqkxolR].partName,
                description:
                    data.qjqkxol < 177.01
                        ? jsonData.xoxtqkl[data.qjqkxolR].xdescription
                        : data.qjqkxol > 183
                        ? jsonData.xoxtqkl[data.qjqkxolR].odescription
                        : jsonData.xoxtqkl[data.qjqkxolR].description,
                possibleConsequences: jsonData.xoxtqkl[data.qjqkxolR].possibleConsequences,
                proposal: jsonData.xoxtqkl[data.qjqkxolR].proposal,
            })
        }
        // Q脚情况-X,O右边
        if (data.qjqkxorR) {
            const levelType: string = this.getDataTypeFun(data.qjqkxorR)
            levelData[levelType].parts.push({
                angle: `${data.qjqkxor}°`,
                img: data.qjqkxor < 177.01 ? rightXLeg : data.qjqkxor > 183 ? rightOS : rightXLeg,
                photoImg: data.qjqkxorUrl,
                partName:
                    data.qjqkxor < 177.01
                        ? jsonData.xoxtqkl[data.qjqkxorR].xpartName
                        : data.qjqkxor > 183
                        ? jsonData.xoxtqkl[data.qjqkxorR].opartName
                        : jsonData.xoxtqkl[data.qjqkxorR].partName,
                description:
                    data.qjqkxor < 177.01
                        ? jsonData.xoxtqkl[data.qjqkxorR].xdescription
                        : data.qjqkxor > 183
                        ? jsonData.xoxtqkl[data.qjqkxorR].odescription
                        : jsonData.xoxtqkl[data.qjqkxorR].description,
                possibleConsequences: jsonData.xoxtqkl[data.qjqkxorR].possibleConsequences,
                proposal: jsonData.xoxtqkl[data.qjqkxorR].proposal,
            })
        }
        // 髋部倾斜情况
        if (data.sbqxqkR) {
            const levelType: string = this.getDataTypeFun(data.sbqxqkR)
            levelData[levelType].parts.push({
                angle: `${data.sbqxqk}°`,
                img: data.sbqxqk < 176.01 ? pelvicHeadS : data.sbqxqk > 185 ? pelvicBackS : pelvicHeadS,
                photoImg: data.sbqxqkUrl,
                partName:
                    data.sbqxqk < 176.01
                        ? jsonData.kbqxqk['前倾'].partName
                        : data.sbqxqk > 185
                        ? jsonData.kbqxqk['后倾'].partName
                        : jsonData.kbqxqk['正常'].partName,
                description:
                    data.sbqxqk < 176.01
                        ? jsonData.kbqxqk['前倾'].description
                        : data.sbqxqk > 185
                        ? jsonData.kbqxqk['后倾'].description
                        : jsonData.kbqxqk['正常'].description,
                possibleConsequences:
                    data.sbqxqk < 176.01
                        ? jsonData.kbqxqk['前倾'].possibleConsequences
                        : data.sbqxqk > 185
                        ? jsonData.kbqxqk['后倾'].possibleConsequences
                        : jsonData.kbqxqk['正常'].possibleConsequences,
                proposal:
                    data.sbqxqk < 176.01
                        ? jsonData.kbqxqk['前倾'].proposal
                        : data.sbqxqk > 185
                        ? jsonData.kbqxqk['后倾'].proposal
                        : jsonData.kbqxqk['正常'].proposal,
            })
        }
        // 驼背情况
        if (data.tbqkR) {
            const levelType: string = this.getDataTypeFun(data.tbqkR)
            levelData[levelType].parts.push({
                angle: `${data.tbqk}°`,
                img: humpbackS,
                photoImg: data.tbqkUrl,
                partName: jsonData.tbqk[data.tbqkR].partName,
                description: jsonData.tbqk[data.tbqkR].description,
                possibleConsequences: jsonData.tbqk[data.tbqkR].possibleConsequences,
                proposal: jsonData.tbqk[data.tbqkR].proposal,
            })
        }
        // 头部倾斜情况 (兼容旧版本数据不分左右)
        if (data.tbqxqkR) {
            const levelType: string = this.getDataTypeFun(data.tbqxqkR)
            levelData[levelType].parts.push({
                angle: `${data.tbqxqk}°`,
                img: humpbackS,
                photoImg: data.tbqxqkUrl,
                partName: jsonData.tbqxqk[data.tbqxqkR].partName,
                description: jsonData.tbqxqk[data.tbqxqkR].description,
                possibleConsequences: jsonData.tbqxqk[data.tbqxqkR].possibleConsequences,
                proposal: jsonData.tbqxqk[data.tbqxqkR].proposal,
            })
        }
        // 头部倾斜情况 左
        if (data.tbqxqklR) {
            const levelType: string = this.getDataTypeFun(data.tbqxqklR)
            levelData[levelType].parts.push({
                angle: `${data.tbqxqkl2}°`,
                img: headL2,
                photoImg: data.tbqxqkUrl,
                partName: `${jsonData.tbqxqk[data.tbqxqklR].partName}（左）`,
                description: jsonData.tbqxqk[data.tbqxqklR].description,
                possibleConsequences: jsonData.tbqxqk[data.tbqxqklR].possibleConsequences,
                proposal: jsonData.tbqxqk[data.tbqxqklR].proposal,
            })
        }
        // 头部倾斜情况 右
        if (data.tbqxqkrR) {
            const levelType: string = this.getDataTypeFun(data.tbqxqkrR)
            levelData[levelType].parts.push({
                angle: `${data.tbqxqkr2}°`,
                img: headR2,
                photoImg: data.tbqxqkUrl,
                partName: `${jsonData.tbqxqk[data.tbqxqkrR].partName}（右）`,
                description: jsonData.tbqxqk[data.tbqxqkrR].description,
                possibleConsequences: jsonData.tbqxqk[data.tbqxqkrR].possibleConsequences,
                proposal: jsonData.tbqxqk[data.tbqxqkrR].proposal,
            })
        }
        // 下颚前伸情况
        if (data.xeqsqkR) {
            const levelType: string = this.getDataTypeFun(data.xeqsqkR)
            levelData[levelType].parts.push({
                angle: `${data.xeqsqk}°`,
                img: lowerjawS,
                photoImg: data.xeqsqkUrl,
                partName: jsonData.xeqsqk[data.xeqsqkR].partName,
                description: jsonData.xeqsqk[data.xeqsqkR].description,
                possibleConsequences: jsonData.xeqsqk[data.xeqsqkR].possibleConsequences,
                proposal: jsonData.xeqsqk[data.xeqsqkR].proposal,
            })
        }
        // 判断是否有值
        if (levelData.levelObj0.parts.length > 0) {
            reslut.push(levelData.levelObj0)
        }
        if (levelData.levelObj1.parts.length > 0) {
            reslut.push(levelData.levelObj1)
        }
        if (levelData.levelObj2.parts.length > 0) {
            reslut.push(levelData.levelObj2)
        }
        if (levelData.levelObj3.parts.length > 0) {
            reslut.push(levelData.levelObj3)
        }
        return reslut
    }
    // 创建列表内部数据
    getDataTypeFun(levelName: string): string {
        if (levelName === '重度') {
            return 'levelObj0'
        } else if (levelName === '中度') {
            return 'levelObj1'
        } else if (levelName === '轻微') {
            return 'levelObj2'
        } else if (levelName === '正常') {
            return 'levelObj3'
        }
        return ''
    }
    // 去详情
    gotoDetail(data: any, level: string) {
        this.props.history.push({
            pathname: '/report/static-detail',
            state: {
                data,
                level,
            },
        })
    }
    // 数据列表显示
    createrListDataDom(data: any, index: number) {
        return (
            <div key={index}>
                <div className={StaticEvaluationStyle['title']}>
                    {data.level}({data.parts.length}项)
                </div>
                <div className={StaticEvaluationStyle['content']}>
                    {data.parts.map((itm: any, idx: number) => (
                        <DataItem
                            level={data.level}
                            dataItem={itm}
                            key={idx}
                            from='list'
                            onClick={this.gotoDetail.bind(this, itm, data.level)}
                        />
                    ))}
                </div>
            </div>
        )
    }
    render() {
        const {
            chartData,
            fiancoData,
            coachInfo,
            imgHandleing,
            shareBtnTxt,
            staticEvaluationData,
            listData,
        } = this.state
        const { userInfos, isShare } = this.props.reportStore
        return (
            <div className={StaticEvaluationStyle['wrapper']}>
                {/* 图表 */}
                {chartData.length > 0 && (
                    <PosCharts
                        chartId='fitness-assessment-chart'
                        chartData={chartData}
                        clickPointCallback={this.handleClickPointFunc.bind(this)}
                    />
                )}
                {/* 对比 */}
                <FiancoContrast fiancoArr={fiancoData} />
                {/* 分数 */}
                <div className={StaticEvaluationStyle['score-box']}>
                    <div className={StaticEvaluationStyle['score']}>
                        <span className={StaticEvaluationStyle['num']}>{staticEvaluationData.grade}</span>
                        <span className={StaticEvaluationStyle['txt']}>分</span>
                    </div>
                    <div className={StaticEvaluationStyle['beat']}>
                        击败了{staticEvaluationData.beat || '--%'}的地球人
                    </div>
                </div>
                {/* 图片 */}
                {staticEvaluationData.url1 || staticEvaluationData.url2 ? (
                    <div className={StaticEvaluationStyle['imgs-box']}>
                        <PhotoProvider photoClosable={true}>
                            {staticEvaluationData.url1 ? (
                                <PhotoConsumer src={staticEvaluationData.url1} intro='正面示意图'>
                                    <div className={StaticEvaluationStyle['img-item']}>
                                        <img src={staticEvaluationData.url1} alt='正面示意图' />
                                    </div>
                                </PhotoConsumer>
                            ) : null}
                            {staticEvaluationData.url2 ? (
                                <PhotoConsumer src={staticEvaluationData.url2} intro='侧面示意图'>
                                    <div className={StaticEvaluationStyle['img-item']}>
                                        <img src={staticEvaluationData.url2} alt='侧面示意图' />
                                    </div>
                                </PhotoConsumer>
                            ) : null}
                        </PhotoProvider>
                    </div>
                ) : null}
                {/* 体适能数据 */}
                <div className={StaticEvaluationStyle['content-box']}>
                    {listData.map((item: any, index: number) => this.createrListDataDom(item, index))}
                </div>
                {/* 底部按钮 */}
                {isShare === 1 ? null : (
                    <div className={StaticEvaluationStyle['bottom-btn-box']}>
                        <div className={StaticEvaluationStyle['qtc-btn']} onClick={this.gotoTcFun}>
                            去体测
                        </div>
                        <div
                            className={`${StaticEvaluationStyle['share-report-btn']} ${
                                imgHandleing ? StaticEvaluationStyle.dis : ''
                            }`}
                            onClick={this.toImg}
                        >
                            {shareBtnTxt}
                        </div>
                    </div>
                )}
                {/* 分享图片 */}
                {isShare === 1 ? null : (
                    <div className={StaticEvaluationStyle['share-box']} ref='fitShareBox'>
                        {/* 分享标题 */}
                        <div className={StaticEvaluationStyle['share-title']}>静态评估报告</div>
                        {/* 用户信息 */}
                        <div className={StaticEvaluationStyle['user-info-box']}>
                            <img className={StaticEvaluationStyle['uib-avatar']} src={userInfos.headPath} alt='头像' />
                            <div className={StaticEvaluationStyle['uib-name']}>{userInfos.name}</div>
                            <div className={StaticEvaluationStyle['uib-time']}>
                                测试时：{staticEvaluationData.createTime}
                            </div>
                        </div>
                        {/* 分数 */}
                        <div className={StaticEvaluationStyle['score-box']}>
                            <div className={StaticEvaluationStyle['score']}>
                                <span className={StaticEvaluationStyle['num']}>{staticEvaluationData.grade}</span>
                                <span className={StaticEvaluationStyle['txt']}>分</span>
                            </div>
                            <div className={StaticEvaluationStyle['beat']}>
                                击败了{staticEvaluationData.beat || '--%'}的地球人
                            </div>
                        </div>
                        {/* 图片 */}
                        <div className={StaticEvaluationStyle['imgs-box']}>
                            <PhotoProvider photoClosable={true}>
                                <PhotoConsumer src={staticEvaluationData.url1} intro='正面示意图'>
                                    <div className={StaticEvaluationStyle['img-item']}>
                                        <img src={staticEvaluationData.url1} alt='正面示意图' />
                                    </div>
                                </PhotoConsumer>
                                <PhotoConsumer src={staticEvaluationData.url2} intro='侧面示意图'>
                                    <div className={StaticEvaluationStyle['img-item']}>
                                        <img src={staticEvaluationData.url2} alt='侧面示意图' />
                                    </div>
                                </PhotoConsumer>
                            </PhotoProvider>
                        </div>
                        {/* 体适能数据 */}
                        <div className={StaticEvaluationStyle['content-box']}>
                            {listData.map((item: any, index: number) => this.createrListDataDom(item, index))}
                        </div>
                        {/* 教练card */}
                        <div className={StaticEvaluationStyle['coach-warp-box']}>
                            <div className={StaticEvaluationStyle['coach-img-box']}>
                                <img src={coachInfo.headPath || ''} alt='头像' />
                            </div>
                            <div className={StaticEvaluationStyle['coach-info-box']}>
                                <div className={StaticEvaluationStyle['coach-name-tag']}>
                                    <div className={StaticEvaluationStyle['coach-name']}>{coachInfo.name || '--'}</div>
                                    <div className={StaticEvaluationStyle['coach-tag']}>私人教练</div>
                                </div>
                                <div className={StaticEvaluationStyle['coach-service']}>
                                    {coachInfo.coachType || '--'} 已服务{coachInfo.waiterCount || 0}人
                                </div>
                            </div>
                            <div className={StaticEvaluationStyle['coach-qrcode']}>
                                <div className={StaticEvaluationStyle['coach-qrcode-img']}>
                                    <QRCode value={coachInfo.qrCodeInfo || ''} />
                                </div>
                                <div className='coach-qrcode-text'>长按识别我的名片</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default withRouter(StaticEvaluation)
