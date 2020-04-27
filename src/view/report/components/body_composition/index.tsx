import React, { Component } from 'react'
import { PhotoProvider, PhotoConsumer } from 'react-photo-view'
import 'react-photo-view/dist/index.css'
import Html2canvas from 'html2canvas'
import { observer, inject } from 'mobx-react'
import QRCode from 'qrcode.react'
import PropTypes from 'prop-types'
import { callAppMenthd, callAppShareImgMenthd } from '../../../../utils'
import PosCharts from '../../../components/pos_charts'
import FiancoContrast from '../../../components/fianco_contrast'
import BodyCompositionStyle from './index.module.scss'
import NoImg from '../../../../assets/img/no-img.png'

@inject('reportStore')
@observer
export default class BodyComposition extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            chartData: [],
            fiancoData: [],
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
    // html转图片
    private toImg = () => {
        const shareRef = this.refs.bodyShareBox as HTMLElement
        Html2canvas(shareRef, {
            useCORS: true,
            scale: 2,
        }).then(res => {
            const ctx: any = res.getContext('2d')
            // 关闭抗锯齿
            ctx.mozImageSmoothingEnabled = false
            ctx.webkitImageSmoothingEnabled = false
            ctx.msImageSmoothingEnabled = false
            ctx.imageSmoothingEnabled = false
            const data = ctx.canvas.toDataURL('image/png')
            callAppShareImgMenthd(data, this.props.reportStore.tabsId)
        })
    }
    // 去体测
    private gotoTcFun = () => {
        const { userInfo } = this.props.reportStore
        callAppMenthd('gotoTestTool', {
            age: userInfo.age,
            birthday: userInfo.birthday,
            gender: userInfo.gender,
            height: userInfo.height,
            memberId: userInfo.memberId,
            name: userInfo.name,
            weight: userInfo.weight,
            headPath: userInfo.headPath,
        })
    }
    render() {
        const { chartData } = this.state
        const { isShare } = this.props.reportStore
        console.log(chartData)
        return (
            <div className={BodyCompositionStyle['wrapper']} ref='bodyComposition'>
                {/* 图表 */}
                {chartData.length > 0 ? <PosCharts chartId='body-composition-chart' chartData={chartData} /> : null}
                {/* 对比 */}
                <FiancoContrast fiancoArr={this.state.fiancoData} />
                {/* 人体成分数据 */}
                <div className={BodyCompositionStyle['content-box']}>
                    <div className={BodyCompositionStyle['title']}>人体成分数据</div>
                    <div className={BodyCompositionStyle['special-data-box']}>
                        <div className={BodyCompositionStyle['item']}>
                            <div className={BodyCompositionStyle['num']}>25%</div>
                            <div className={BodyCompositionStyle['txt']}>体脂率</div>
                        </div>
                        <div className={BodyCompositionStyle['line']}></div>
                        <div className={BodyCompositionStyle['item']}>
                            <div className={BodyCompositionStyle['num']}>25kg</div>
                            <div className={BodyCompositionStyle['txt']}>体重</div>
                        </div>
                        <div className={BodyCompositionStyle['line']}></div>
                        <div className={BodyCompositionStyle['item']}>
                            <div className={BodyCompositionStyle['num']}>25.25</div>
                            <div className={BodyCompositionStyle['txt']}>BMI</div>
                        </div>
                    </div>
                    <div className={BodyCompositionStyle['data-box']}>
                        <div className={BodyCompositionStyle['txt-item']}>
                            <div className={BodyCompositionStyle['num']}>25.25kg</div>
                            <div className={BodyCompositionStyle['txt']}>肌肉量</div>
                        </div>
                        <div className={BodyCompositionStyle['txt-item']}>
                            <div className={BodyCompositionStyle['num']}>25.25kg</div>
                            <div className={BodyCompositionStyle['txt']}>去脂体重</div>
                        </div>
                        <div className={BodyCompositionStyle['txt-item']}>
                            <div className={BodyCompositionStyle['num']}>25.25kg</div>
                            <div className={BodyCompositionStyle['txt']}>体脂量</div>
                        </div>
                    </div>
                    <div className={BodyCompositionStyle['data-box']}>
                        <div className={BodyCompositionStyle['txt-item']}>
                            <div className={BodyCompositionStyle['num']}>25.25</div>
                            <div className={BodyCompositionStyle['txt']}>内脏脂肪</div>
                        </div>
                        <div className={BodyCompositionStyle['txt-item']}>
                            <div className={BodyCompositionStyle['num']}>25.25</div>
                            <div className={BodyCompositionStyle['txt']}>腰臀比</div>
                        </div>
                        <div className={BodyCompositionStyle['txt-item']}>
                            <div className={BodyCompositionStyle['num']}>25.25kcal</div>
                            <div className={BodyCompositionStyle['txt']}>基础代谢值</div>
                        </div>
                    </div>
                </div>
                {/* 照片展示 */}
                <div className={BodyCompositionStyle['content-box']}>
                    <div className={BodyCompositionStyle['title']}>照片展示</div>
                    <PhotoProvider photoClosable={true}>
                        <div className={BodyCompositionStyle['photo-box']}>
                            <div className={BodyCompositionStyle['img-box']}>
                                <PhotoConsumer src={NoImg} intro='正面照'>
                                    <div className={BodyCompositionStyle['img']}>
                                        <img src={NoImg} alt='' />
                                    </div>
                                </PhotoConsumer>
                                <div className={BodyCompositionStyle['txt']}>正面照</div>
                            </div>
                            <div className={BodyCompositionStyle['img-box']}>
                                <PhotoConsumer src={NoImg} intro='侧面照'>
                                    <div className={BodyCompositionStyle['img']}>
                                        <img src={NoImg} alt='' />
                                    </div>
                                </PhotoConsumer>
                                <div className={BodyCompositionStyle['txt']}>侧面照</div>
                            </div>
                        </div>
                    </PhotoProvider>
                </div>
                {/* 报告图片 */}
                <div className={BodyCompositionStyle['content-box']}>
                    <div className={BodyCompositionStyle['title']}>人体成分报告</div>
                    <div className={BodyCompositionStyle['one-photo-box']}>
                        <PhotoProvider photoClosable={true}>
                            <PhotoConsumer src={NoImg} intro='人体成分报告图片'>
                                <div className={BodyCompositionStyle['img-box']}>
                                    <img src={NoImg} alt='' />
                                </div>
                            </PhotoConsumer>
                        </PhotoProvider>
                    </div>
                </div>
                {/* 底部按钮 */}
                {isShare === 1 ? null : (
                    <div className={BodyCompositionStyle['bottom-btn-box']}>
                        <div className={BodyCompositionStyle['qtc-btn']} onClick={this.gotoTcFun}>
                            去体测
                        </div>
                        <div className={BodyCompositionStyle['share-report-btn']} onClick={this.toImg}>
                            分享报告图片
                        </div>
                    </div>
                )}
                {/* 分享图片html */}
                <div className={BodyCompositionStyle['share-box']} ref='bodyShareBox'>
                    {/* 分享标题 */}
                    <div className={BodyCompositionStyle['share-title']}>人体成分报告</div>
                    {/* 用户信息 */}
                    <div className={BodyCompositionStyle['user-info-box']}>
                        <img className={BodyCompositionStyle['uib-avatar']} src={NoImg} alt='头像' />
                        <div className={BodyCompositionStyle['uib-name']}>哈哈</div>
                        <div className={BodyCompositionStyle['uib-time']}>测试时：2020-04-20 14:54:32</div>
                    </div>
                    {/* 人体成分数据 */}
                    <div className={BodyCompositionStyle['content-box']}>
                        <div className={BodyCompositionStyle['title']}>人体成分数据</div>
                        <div className={BodyCompositionStyle['special-data-box']}>
                            <div className={BodyCompositionStyle['item']}>
                                <div className={BodyCompositionStyle['num']}>25%</div>
                                <div className={BodyCompositionStyle['txt']}>体脂率</div>
                            </div>
                            <div className={BodyCompositionStyle['line']}></div>
                            <div className={BodyCompositionStyle['item']}>
                                <div className={BodyCompositionStyle['num']}>25kg</div>
                                <div className={BodyCompositionStyle['txt']}>体重</div>
                            </div>
                            <div className={BodyCompositionStyle['line']}></div>
                            <div className={BodyCompositionStyle['item']}>
                                <div className={BodyCompositionStyle['num']}>25.25</div>
                                <div className={BodyCompositionStyle['txt']}>BMI</div>
                            </div>
                        </div>
                        <div className={BodyCompositionStyle['data-box']}>
                            <div className={BodyCompositionStyle['txt-item']}>
                                <div className={BodyCompositionStyle['num']}>25.25kg</div>
                                <div className={BodyCompositionStyle['txt']}>肌肉量</div>
                            </div>
                            <div className={BodyCompositionStyle['txt-item']}>
                                <div className={BodyCompositionStyle['num']}>25.25kg</div>
                                <div className={BodyCompositionStyle['txt']}>去脂体重</div>
                            </div>
                            <div className={BodyCompositionStyle['txt-item']}>
                                <div className={BodyCompositionStyle['num']}>25.25kg</div>
                                <div className={BodyCompositionStyle['txt']}>体脂量</div>
                            </div>
                        </div>
                        <div className={BodyCompositionStyle['data-box']}>
                            <div className={BodyCompositionStyle['txt-item']}>
                                <div className={BodyCompositionStyle['num']}>25.25</div>
                                <div className={BodyCompositionStyle['txt']}>内脏脂肪</div>
                            </div>
                            <div className={BodyCompositionStyle['txt-item']}>
                                <div className={BodyCompositionStyle['num']}>25.25</div>
                                <div className={BodyCompositionStyle['txt']}>腰臀比</div>
                            </div>
                            <div className={BodyCompositionStyle['txt-item']}>
                                <div className={BodyCompositionStyle['num']}>25.25kcal</div>
                                <div className={BodyCompositionStyle['txt']}>基础代谢值</div>
                            </div>
                        </div>
                    </div>
                    {/* 照片展示 */}
                    <div className={BodyCompositionStyle['content-box']}>
                        <div className={BodyCompositionStyle['title']}>照片展示</div>
                        <PhotoProvider photoClosable={true}>
                            <div className={BodyCompositionStyle['photo-box']}>
                                <div className={BodyCompositionStyle['img-box']}>
                                    <PhotoConsumer src={NoImg} intro='正面照'>
                                        <div className={BodyCompositionStyle['img']}>
                                            <img src={NoImg} alt='' />
                                        </div>
                                    </PhotoConsumer>
                                    <div className={BodyCompositionStyle['txt']}>正面照</div>
                                </div>
                                <div className={BodyCompositionStyle['img-box']}>
                                    <PhotoConsumer src={NoImg} intro='侧面照'>
                                        <div className={BodyCompositionStyle['img']}>
                                            <img src={NoImg} alt='' />
                                        </div>
                                    </PhotoConsumer>
                                    <div className={BodyCompositionStyle['txt']}>侧面照</div>
                                </div>
                            </div>
                        </PhotoProvider>
                    </div>
                    {/* 报告图片 */}
                    <div className={BodyCompositionStyle['content-box']}>
                        <div className={BodyCompositionStyle['title']}>人体成分报告</div>
                        <div className={BodyCompositionStyle['one-photo-box']}>
                            <PhotoProvider photoClosable={true}>
                                <PhotoConsumer src={NoImg} intro='人体成分报告图片'>
                                    <div className={BodyCompositionStyle['img-box']}>
                                        <img src={NoImg} alt='' />
                                    </div>
                                </PhotoConsumer>
                            </PhotoProvider>
                        </div>
                    </div>
                    {/* 教练card */}
                    <div className={BodyCompositionStyle['coach-warp-box']}>
                        <div className={BodyCompositionStyle['coach-img-box']}>
                            <img src='coachInfo.headPath' alt='头像' />
                        </div>
                        <div className={BodyCompositionStyle['coach-info-box']}>
                            <div className={BodyCompositionStyle['coach-name-tag']}>
                                <div className={BodyCompositionStyle['coach-name']}>教练名称</div>
                                <div className={BodyCompositionStyle['coach-tag']}>私人教练</div>
                            </div>
                            <div className={BodyCompositionStyle['coach-service']}>团课 已服务10人</div>
                        </div>
                        <div className={BodyCompositionStyle['coach-qrcode']}>
                            <div className={BodyCompositionStyle['coach-qrcode-img']}>
                                <QRCode value='https://img-dev-club.ejoyst.com/promotion' />
                            </div>
                            <div className='coach-qrcode-text'>长按识别我的名片</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
