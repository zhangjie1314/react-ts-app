import React, { Component } from 'react'
import { PhotoProvider, PhotoConsumer } from 'react-photo-view'
import 'react-photo-view/dist/index.css'
import Html2canvas from 'html2canvas'
import { observer, inject } from 'mobx-react'
import QRCode from 'qrcode.react'
import PropTypes from 'prop-types'
import { callAppMenthd, callAppShareImgMenthd, handleHandImg } from '@utils/index'
import { getBodyCompositionResult } from '@apis/report/bapp'
import PosCharts from '@comps/pos_charts'
import FiancoContrast from '@comps/fianco_contrast'
import BodyCompositionStyle from './index.module.scss'
import { ChartItemRules } from '@ctypes/components/pos_charts'

@inject('reportStore')
@observer
export default class BodyComposition extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            chartData: [],
            fiancoData: [],
            bodyCompositionData: {},
            imgHandleing: false,
            shareBtnTxt: '分享报告图片',
            coachInfo: {},
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
            let lg = this.state.chartData.length
            this.handleClickPointFunc(this.state.chartData[lg - 1])
        }
    }
    // 点击图表点
    handleClickPointFunc(item: ChartItemRules) {
        getBodyCompositionResult({
            rtcfId: item.id,
        }).then((res: any) => {
            const { isFromStudio } = this.props.reportStore
            res.data.url1 = handleHandImg(res.data.url1, isFromStudio)
            res.data.url2 = handleHandImg(res.data.url2, isFromStudio)
            res.data.url3 = handleHandImg(res.data.url3, isFromStudio)
            this.setState({
                bodyCompositionData: res.data,
            })
        })
    }
    render() {
        const { chartData, bodyCompositionData, coachInfo, shareBtnTxt, imgHandleing } = this.state
        const { isShare, userInfos } = this.props.reportStore
        return (
            <div className={BodyCompositionStyle['wrapper']} ref='bodyComposition'>
                {/* 图表 */}
                {chartData.length > 0 && (
                    <PosCharts
                        chartId='body-composition-chart'
                        chartData={chartData}
                        clickPointCallback={this.handleClickPointFunc.bind(this)}
                    />
                )}
                {/* 对比 */}
                <FiancoContrast fiancoArr={this.state.fiancoData} />
                {/* 人体成分数据 */}
                <div className={BodyCompositionStyle['content-box']}>
                    <div className={BodyCompositionStyle['title']}>人体成分数据</div>
                    <div className={BodyCompositionStyle['special-data-box']}>
                        <div className={BodyCompositionStyle['item']}>
                            <div className={BodyCompositionStyle['num']}>{bodyCompositionData.tzl || '--'}%</div>
                            <div className={BodyCompositionStyle['txt']}>体脂率</div>
                        </div>
                        <div className={BodyCompositionStyle['line']}></div>
                        <div className={BodyCompositionStyle['item']}>
                            <div className={BodyCompositionStyle['num']}>{bodyCompositionData.weight || '--'}kg</div>
                            <div className={BodyCompositionStyle['txt']}>体重</div>
                        </div>
                        <div className={BodyCompositionStyle['line']}></div>
                        <div className={BodyCompositionStyle['item']}>
                            <div className={BodyCompositionStyle['num']}>{bodyCompositionData.bmi || '--'}</div>
                            <div className={BodyCompositionStyle['txt']}>BMI</div>
                        </div>
                    </div>
                    <div className={BodyCompositionStyle['data-box']}>
                        <div className={BodyCompositionStyle['txt-item']}>
                            <div className={BodyCompositionStyle['num']}>{bodyCompositionData.jrl || '--'}kg</div>
                            <div className={BodyCompositionStyle['txt']}>肌肉量</div>
                        </div>
                        <div className={BodyCompositionStyle['txt-item']}>
                            <div className={BodyCompositionStyle['num']}>{bodyCompositionData.qztz || '--'}kg</div>
                            <div className={BodyCompositionStyle['txt']}>去脂体重</div>
                        </div>
                        <div className={BodyCompositionStyle['txt-item']}>
                            <div className={BodyCompositionStyle['num']}>{bodyCompositionData.tizl || '--'}kg</div>
                            <div className={BodyCompositionStyle['txt']}>体脂量</div>
                        </div>
                    </div>
                    <div className={BodyCompositionStyle['data-box']}>
                        <div className={BodyCompositionStyle['txt-item']}>
                            <div className={BodyCompositionStyle['num']}>{bodyCompositionData.nzzf || '--'}</div>
                            <div className={BodyCompositionStyle['txt']}>内脏脂肪</div>
                        </div>
                        <div className={BodyCompositionStyle['txt-item']}>
                            <div className={BodyCompositionStyle['num']}>{bodyCompositionData.ytb || '--'}</div>
                            <div className={BodyCompositionStyle['txt']}>腰臀比</div>
                        </div>
                        <div className={BodyCompositionStyle['txt-item']}>
                            <div className={BodyCompositionStyle['num']}>{bodyCompositionData.jcdx || '--'}kcal</div>
                            <div className={BodyCompositionStyle['txt']}>基础代谢值</div>
                        </div>
                    </div>
                </div>
                {/* 照片展示 */}
                {bodyCompositionData.url1 || bodyCompositionData.url2 ? (
                    <div className={BodyCompositionStyle['content-box']}>
                        <div className={BodyCompositionStyle['title']}>照片展示</div>
                        <PhotoProvider photoClosable={true}>
                            <div className={BodyCompositionStyle['photo-box']}>
                                {bodyCompositionData.url1 ? (
                                    <div className={BodyCompositionStyle['img-box']}>
                                        <PhotoConsumer src={bodyCompositionData.url1} intro='正面照'>
                                            <div className={BodyCompositionStyle['img']}>
                                                <img src={bodyCompositionData.url1} alt='正面照' />
                                            </div>
                                        </PhotoConsumer>
                                        <div className={BodyCompositionStyle['txt']}>正面照</div>
                                    </div>
                                ) : null}
                                {bodyCompositionData.url2 ? (
                                    <div className={BodyCompositionStyle['img-box']}>
                                        <PhotoConsumer src={bodyCompositionData.url2} intro='侧面照'>
                                            <div className={BodyCompositionStyle['img']}>
                                                <img src={bodyCompositionData.url2} alt='侧面照' />
                                            </div>
                                        </PhotoConsumer>
                                        <div className={BodyCompositionStyle['txt']}>侧面照</div>
                                    </div>
                                ) : null}
                            </div>
                        </PhotoProvider>
                    </div>
                ) : null}
                {/* 报告图片 */}
                {bodyCompositionData.url3 ? (
                    <div className={BodyCompositionStyle['content-box']}>
                        <div className={BodyCompositionStyle['title']}>人体成分报告</div>
                        <div className={BodyCompositionStyle['one-photo-box']}>
                            <PhotoProvider photoClosable={true}>
                                <PhotoConsumer src={bodyCompositionData.url3} intro='人体成分报告图片'>
                                    <div className={BodyCompositionStyle['img-box']}>
                                        <img src={bodyCompositionData.url3} alt='人体成分报告图片' />
                                    </div>
                                </PhotoConsumer>
                            </PhotoProvider>
                        </div>
                    </div>
                ) : null}
                {/* 底部按钮 */}
                {isShare === 1 ? null : (
                    <div className={BodyCompositionStyle['bottom-btn-box']}>
                        <div className={BodyCompositionStyle['qtc-btn']} onClick={this.gotoTcFun}>
                            去体测
                        </div>
                        <div
                            className={`${BodyCompositionStyle['share-report-btn']} ${
                                imgHandleing ? BodyCompositionStyle['dis'] : ''
                            }`}
                            onClick={this.toImg}
                        >
                            {shareBtnTxt}
                        </div>
                    </div>
                )}
                {/* 分享图片html */}
                {isShare === 1 ? null : (
                    <div className={BodyCompositionStyle['share-box']} ref='bodyShareBox'>
                        {/* 分享标题 */}
                        <div className={BodyCompositionStyle['share-title']}>人体成分报告</div>
                        {/* 用户信息 */}
                        <div className={BodyCompositionStyle['user-info-box']}>
                            <img className={BodyCompositionStyle['uib-avatar']} src={userInfos.headPath} alt='头像' />
                            <div className={BodyCompositionStyle['uib-name']}>{userInfos.name}</div>
                            <div className={BodyCompositionStyle['uib-time']}>
                                测试时：{bodyCompositionData.createTime}
                            </div>
                        </div>
                        {/* 人体成分数据 */}
                        <div className={BodyCompositionStyle['content-box']}>
                            <div className={BodyCompositionStyle['title']}>人体成分数据</div>
                            <div className={BodyCompositionStyle['special-data-box']}>
                                <div className={BodyCompositionStyle['item']}>
                                    <div className={BodyCompositionStyle['num']}>
                                        {bodyCompositionData.tzl || '--'}%
                                    </div>
                                    <div className={BodyCompositionStyle['txt']}>体脂率</div>
                                </div>
                                <div className={BodyCompositionStyle['line']}></div>
                                <div className={BodyCompositionStyle['item']}>
                                    <div className={BodyCompositionStyle['num']}>
                                        {bodyCompositionData.weight || '--'}kg
                                    </div>
                                    <div className={BodyCompositionStyle['txt']}>体重</div>
                                </div>
                                <div className={BodyCompositionStyle['line']}></div>
                                <div className={BodyCompositionStyle['item']}>
                                    <div className={BodyCompositionStyle['num']}>{bodyCompositionData.bmi || '--'}</div>
                                    <div className={BodyCompositionStyle['txt']}>BMI</div>
                                </div>
                            </div>
                            <div className={BodyCompositionStyle['data-box']}>
                                <div className={BodyCompositionStyle['txt-item']}>
                                    <div className={BodyCompositionStyle['num']}>
                                        {bodyCompositionData.jrl || '--'}kg
                                    </div>
                                    <div className={BodyCompositionStyle['txt']}>肌肉量</div>
                                </div>
                                <div className={BodyCompositionStyle['txt-item']}>
                                    <div className={BodyCompositionStyle['num']}>
                                        {bodyCompositionData.qztz || '--'}kg
                                    </div>
                                    <div className={BodyCompositionStyle['txt']}>去脂体重</div>
                                </div>
                                <div className={BodyCompositionStyle['txt-item']}>
                                    <div className={BodyCompositionStyle['num']}>
                                        {bodyCompositionData.tizl || '--'}kg
                                    </div>
                                    <div className={BodyCompositionStyle['txt']}>体脂量</div>
                                </div>
                            </div>
                            <div className={BodyCompositionStyle['data-box']}>
                                <div className={BodyCompositionStyle['txt-item']}>
                                    <div className={BodyCompositionStyle['num']}>
                                        {bodyCompositionData.nzzf || '--'}
                                    </div>
                                    <div className={BodyCompositionStyle['txt']}>内脏脂肪</div>
                                </div>
                                <div className={BodyCompositionStyle['txt-item']}>
                                    <div className={BodyCompositionStyle['num']}>{bodyCompositionData.ytb || '--'}</div>
                                    <div className={BodyCompositionStyle['txt']}>腰臀比</div>
                                </div>
                                <div className={BodyCompositionStyle['txt-item']}>
                                    <div className={BodyCompositionStyle['num']}>
                                        {bodyCompositionData.jcdx || '--'}kcal
                                    </div>
                                    <div className={BodyCompositionStyle['txt']}>基础代谢值</div>
                                </div>
                            </div>
                        </div>
                        {/* 照片展示 */}
                        {bodyCompositionData.url1 || bodyCompositionData.url2 ? (
                            <div className={BodyCompositionStyle['content-box']}>
                                <div className={BodyCompositionStyle['title']}>照片展示</div>
                                <div className={BodyCompositionStyle['photo-box']}>
                                    {bodyCompositionData.url1 ? (
                                        <div className={BodyCompositionStyle['img-box']}>
                                            <div className={BodyCompositionStyle['img']}>
                                                <img src={bodyCompositionData.url1} alt='正面照' />
                                            </div>
                                            <div className={BodyCompositionStyle['txt']}>正面照</div>
                                        </div>
                                    ) : null}
                                    {bodyCompositionData.url2 ? (
                                        <div className={BodyCompositionStyle['img-box']}>
                                            <div className={BodyCompositionStyle['img']}>
                                                <img src={bodyCompositionData.url2} alt='侧面照' />
                                            </div>
                                            <div className={BodyCompositionStyle['txt']}>侧面照</div>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        ) : null}
                        {/* 报告图片 */}
                        {bodyCompositionData.url3 ? (
                            <div className={BodyCompositionStyle['content-box']}>
                                <div className={BodyCompositionStyle['title']}>人体成分报告</div>
                                <div className={BodyCompositionStyle['one-photo-box']}>
                                    <div className={BodyCompositionStyle['img-box']}>
                                        <img src={bodyCompositionData.url3} alt='人体成分报告图片' />
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        {/* 教练card */}
                        <div className={BodyCompositionStyle['coach-warp-box']}>
                            <div className={BodyCompositionStyle['coach-img-box']}>
                                <img src={coachInfo.headPath || ''} alt='头像' />
                            </div>
                            <div className={BodyCompositionStyle['coach-info-box']}>
                                <div className={BodyCompositionStyle['coach-name-tag']}>
                                    <div className={BodyCompositionStyle['coach-name']}>{coachInfo.name || '--'}</div>
                                    <div className={BodyCompositionStyle['coach-tag']}>私人教练</div>
                                </div>
                                <div className={BodyCompositionStyle['coach-service']}>
                                    {coachInfo.coachType || '--'} 已服务{coachInfo.waiterCount || 0}人
                                </div>
                            </div>
                            <div className={BodyCompositionStyle['coach-qrcode']}>
                                <div className={BodyCompositionStyle['coach-qrcode-img']}>
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
