// 完美围度
import React, { Component } from 'react'
import PosCharts from '@comps/pos_charts'
import FiancoContrast from '@comps/fianco_contrast'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import { PhotoProvider, PhotoConsumer } from 'react-photo-view'
import QRCode from 'qrcode.react'
import Html2canvas from 'html2canvas'
import PcStyle from './index.module.scss'
import { ChartItemRules } from '@ctypes/components/pos_charts'
import { getPerfectCircumferenceResult } from '@apis/report/bapp'
import { handleHandImg, callAppShareImgMenthd, callAppMenthd } from '@utils/index'

interface fblObjType {
    num?: number
    pj?: string
    bmi?: string
    jb?: number
    photo?: string
}

interface perfectDataTypes {
    title: string
    value: string
    diffValue: string
    idealValue: string
    status: number
    unit?: string
}

@inject('reportStore')
@observer
export default class PerfectCircumference extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            chartData: [],
            fiancoData: [],
            resultData: {},
            standardData: {},
            perfectData: [],
            coachInfo: {},
            imgHandleing: false,
            shareBtnTxt: '分享报告图片',
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
        const shareRef = this.refs.bodyShareBox as HTMLElement
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
    gotoTcFun() {
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
        getPerfectCircumferenceResult({
            wdId: item.id,
        }).then((res: any) => {
            this.handleDataFunc(res)
        })
    }
    // 处理数据
    handleDataFunc(data: any) {
        const { isFromStudio } = this.props.reportStore
        // 图片路径处理
        data.data.memberSideWdAllDTO.url1 = data.data.memberSideWdAllDTO.url1
            ? handleHandImg(data.data.memberSideWdAllDTO.url1, isFromStudio)
            : ''
        const resultData = data.data.memberSideWdAllDTO
        const standardData = data.data.memberSideWddateDTO
        // 完美数据处理
        const perfectData: perfectDataTypes[] = []
        // 腰围
        // status 0 超出 1 正常 2 还差
        perfectData.push({
            title: '腰围',
            value: `${resultData.waist.toFixed(1)}cm`,
            diffValue: `${Math.abs(resultData.waistV).toFixed(1)}cm`,
            idealValue: `${standardData.waist.toFixed(1)}cm`,
            status: resultData.waistV === 0 ? 1 : resultData.waistV > 0 ? 0 : 2,
        })
        // 胸围
        perfectData.push({
            title: '胸围',
            value: `${resultData.xw.toFixed(1)}cm`,
            diffValue: `${Math.abs(resultData.xwV).toFixed(1)}cm`,
            idealValue: `${standardData.xw.toFixed(1)}cm`,
            status: resultData.xwV === 0 ? 1 : resultData.xwV > 0 ? 0 : 2,
        })
        // 肩围（可能没有）
        if (standardData.jw && resultData.jw) {
            perfectData.push({
                title: '胸围',
                value: `${resultData.jw.toFixed(1)}cm`,
                diffValue: `${Math.abs(resultData.jwV).toFixed(1)}cm`,
                idealValue: `${standardData.jw.toFixed(1)}cm`,
                status: resultData.jwV === 0 ? 1 : resultData.jwV > 0 ? 0 : 2,
            })
        }
        // 臀围
        perfectData.push({
            title: '臀围',
            value: `${resultData.hipline.toFixed(1)}cm`,
            diffValue: `${Math.abs(resultData.hiplineV).toFixed(1)}cm`,
            idealValue: `${standardData.hipline.toFixed(1)}cm`,
            status: resultData.hiplineV === 0 ? 1 : resultData.hiplineV > 0 ? 0 : 2,
        })
        // 大臀围
        perfectData.push({
            title: '大臀围',
            value: `${resultData.dtunw.toFixed(1)}cm`,
            diffValue: `${Math.abs(resultData.dtunwV).toFixed(1)}cm`,
            idealValue: `${standardData.dtunw.toFixed(1)}cm`,
            status: resultData.dtunwV === 0 ? 1 : resultData.dtunwV > 0 ? 0 : 2,
        })
        // 大腿围
        perfectData.push({
            title: '大腿围',
            value: `${resultData.dtw.toFixed(1)}cm`,
            diffValue: `${Math.abs(resultData.dtwV).toFixed(1)}cm`,
            idealValue: `${standardData.dtw.toFixed(1)}cm`,
            status: resultData.dtwV === 0 ? 1 : resultData.dtwV > 0 ? 0 : 2,
        })
        // 腰臀比（可能没有）
        if (resultData.ytb) {
            perfectData.push({
                title: '腰臀比',
                value: resultData.ytb,
                diffValue: Math.abs(resultData.ytbV).toString(),
                idealValue: resultData.ytbS,
                status: resultData.ytbV === 0 ? 1 : resultData.ytbV > 0 ? 0 : 2,
            })
        }
        // 体脂率
        perfectData.push({
            title: '体脂率',
            value: resultData.tzl,
            diffValue: Math.abs(resultData.tzlV).toString(),
            idealValue: resultData.tzlS,
            status: resultData.tzlV === 0 ? 1 : resultData.tzlV > 0 ? 0 : 2,
        })
        // 基础代谢值
        perfectData.push({
            title: '基础代谢值',
            unit: 'kcal',
            value: resultData.jcdx,
            diffValue: Math.abs(resultData.jcdxV).toFixed(1),
            idealValue: resultData.jcdxS,
            status: resultData.jcdxV === 0 ? 1 : resultData.jcdxV > 0 ? 0 : 2,
        })
        // 赋值
        this.setState({
            resultData,
            standardData,
            perfectData,
        })
    }
    render() {
        const { chartData, perfectData, resultData, coachInfo, imgHandleing, shareBtnTxt } = this.state
        const { isShare, userInfos } = this.props.reportStore
        return (
            <div className={PcStyle['wrapper']}>
                {/* 图表 */}
                {chartData.length > 0 && (
                    <PosCharts
                        chartId='perfect-circumference-chart'
                        chartData={chartData}
                        clickPointCallback={this.handleClickPointFunc.bind(this)}
                    />
                )}
                {/* 体测对比 */}
                <FiancoContrast fiancoArr={this.state.fiancoData} />
                {/* 完美围度数据 */}
                <div className={PcStyle.fractionBox}>
                    <div className={PcStyle.fbLeft}>
                        <div className={PcStyle.fblNumBox}>
                            <span className={PcStyle.num}>{resultData.grade || 0}</span>
                            <span className={PcStyle.util}>分</span>
                        </div>
                        <div className={PcStyle.fblTxt}>测试得分</div>
                    </div>
                    <div className={PcStyle.fbRight}>
                        <p>
                            BMI：{resultData.bmi || '--'}
                            {resultData.bmiS || '--'}
                        </p>
                        <p>{`击败了${resultData.beat || '--%'}的地球人`}</p>
                    </div>
                </div>
                {resultData.url1 ? (
                    <PhotoProvider photoClosable={true}>
                        <PhotoConsumer src={resultData.url1} intro='正面照'>
                            <div className={PcStyle.photo}>
                                <img src={resultData.url1} alt='正面照' />
                            </div>
                        </PhotoConsumer>
                    </PhotoProvider>
                ) : null}
                <div className={PcStyle.FractionDetail}>
                    <div className={PcStyle.title}>完美围度数据</div>
                    <div className={PcStyle.content}>
                        {perfectData.map((itm: perfectDataTypes, idx: number) => {
                            return (
                                <div className={PcStyle.itm} key={idx}>
                                    <div className={PcStyle.fs32}>{itm.title}</div>
                                    <div className={`${PcStyle.fs48} ${itm.status === 0 ? PcStyle.oc : ''}`}>
                                        {itm.value || '--'}
                                    </div>
                                    <div className={`${PcStyle.fs24} ${PcStyle.gc}`}>
                                        {itm.status === 0 ? '超出' : itm.status === 1 ? '正常' : '还差'}
                                        {itm.status !== 1 ? itm.diffValue : ''}
                                    </div>
                                    <div className={PcStyle.line}></div>
                                    <div className={PcStyle.fs24}>理想值{itm.idealValue}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/* 按钮 */}
                {isShare === 1 ? null : (
                    <div className={PcStyle.footerBtn}>
                        <div className={PcStyle.goToTest} onClick={this.gotoTcFun.bind(this)}>
                            去体侧
                        </div>
                        <div className={`${PcStyle.shareBtn} ${imgHandleing ? PcStyle.dis : ''}`} onClick={this.toImg}>
                            {shareBtnTxt}
                        </div>
                    </div>
                )}
                {/* 分享图片html */}
                {isShare === 1 ? null : (
                    <div className={PcStyle['share-box']} ref='bodyShareBox'>
                        {/* 分享标题 */}
                        <div className={PcStyle['share-title']}>完美围度报告</div>
                        {/* 用户信息 */}
                        <div className={PcStyle['user-info-box']}>
                            <img className={PcStyle['uib-avatar']} src={userInfos.headPath} alt='头像' />
                            <div className={PcStyle['uib-name']}>{userInfos.name}</div>
                            <div className={PcStyle['uib-time']}>测试时：{resultData.createTime}</div>
                        </div>
                        {/* 完美围度数据 */}
                        <div className={PcStyle.fractionBox}>
                            <div className={PcStyle.fbLeft}>
                                <div className={PcStyle.fblNumBox}>
                                    <span className={PcStyle.num}>{resultData.grade || 0}</span>
                                    <span className={PcStyle.util}>分</span>
                                </div>
                                <div className={PcStyle.fblTxt}>测试得分</div>
                            </div>
                            <div className={PcStyle.fbRight}>
                                <p>
                                    BMI：{resultData.bmi || '--'}
                                    {resultData.bmiS || '--'}
                                </p>
                                <p>{`击败了${resultData.beat || '--%'}的地球人`}</p>
                            </div>
                        </div>
                        {resultData.url1 ? (
                            <PhotoProvider photoClosable={true}>
                                <PhotoConsumer src={resultData.url1} intro='正面照'>
                                    <div className={PcStyle.photo}>
                                        <img src={resultData.url1} alt='正面照' />
                                    </div>
                                </PhotoConsumer>
                            </PhotoProvider>
                        ) : null}
                        <div className={PcStyle.FractionDetail}>
                            <div className={PcStyle.title}>完美围度数据</div>
                            <div className={PcStyle.content}>
                                {perfectData.map((itm: perfectDataTypes, idx: number) => {
                                    return (
                                        <div className={PcStyle.itm} key={idx}>
                                            <div className={PcStyle.fs32}>{itm.title}</div>
                                            <div className={`${PcStyle.fs48} ${itm.status === 0 ? PcStyle.oc : ''}`}>
                                                {itm.value || '--'}
                                            </div>
                                            <div className={`${PcStyle.fs24} ${PcStyle.gc}`}>
                                                {itm.status === 0 ? '超出' : itm.status === 1 ? '正常' : '还差'}
                                                {itm.status !== 1 ? itm.diffValue : ''}
                                            </div>
                                            <div className={PcStyle.line}></div>
                                            <div className={PcStyle.fs24}>理想值{itm.idealValue}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        {/* 教练card */}
                        <div className={PcStyle['coach-warp-box']}>
                            <div className={PcStyle['coach-img-box']}>
                                <img src={coachInfo.headPath || ''} alt='头像' />
                            </div>
                            <div className={PcStyle['coach-info-box']}>
                                <div className={PcStyle['coach-name-tag']}>
                                    <div className={PcStyle['coach-name']}>{coachInfo.name || '--'}</div>
                                    <div className={PcStyle['coach-tag']}>私人教练</div>
                                </div>
                                <div className={PcStyle['coach-service']}>
                                    {coachInfo.coachType || '--'} 已服务{coachInfo.waiterCount || 0}人
                                </div>
                            </div>
                            <div className={PcStyle['coach-qrcode']}>
                                <div className={PcStyle['coach-qrcode-img']}>
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
