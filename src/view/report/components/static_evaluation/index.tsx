import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import Html2canvas from 'html2canvas'
import { callAppMenthd, callAppShareImgMenthd } from '../../../../utils'
import QRCode from 'qrcode.react'
import { PhotoProvider, PhotoConsumer } from 'react-photo-view'
import StaticEvaluationStyle from './index.module.scss'
import PosCharts from '../../../components/pos_charts'
import FiancoContrast from '../../../components/fianco_contrast'
import DefUserAvatar from '../../../../assets/img/normal.png'

@inject('reportStore')
@observer
export default class StaticEvaluation extends Component<any, any> {
    state = {
        chartData: [],
        fiancoData: [],
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
    componentDidMount() {}
    // html转图片
    private toImg = () => {
        const shareRef = this.refs.fitShareBox as HTMLElement
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
        const { chartData, fiancoData } = this.state
        return (
            <div className={StaticEvaluationStyle['wrapper']}>
                {/* 图表 */}
                {chartData.length > 0 && <PosCharts chartId='fitness-assessment-chart' chartData={chartData} />}
                {/* 对比 */}
                <FiancoContrast fiancoArr={fiancoData} />
                {/* 分数 */}
                <div className={StaticEvaluationStyle['score-box']}>
                    <div className={StaticEvaluationStyle['score']}>
                        <span className={StaticEvaluationStyle['num']}>80</span>
                        <span className={StaticEvaluationStyle['txt']}>分</span>
                    </div>
                    <div className={StaticEvaluationStyle['beat']}>击败了90%的地球人</div>
                </div>
                {/* 图片 */}
                <div className={StaticEvaluationStyle['imgs-box']}>
                    <PhotoProvider photoClosable={true}>
                        <PhotoConsumer
                            src={
                                'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3491454693,907424556&fm=11&gp=0.jpg'
                            }
                            intro='正面照'
                        >
                            <div className={StaticEvaluationStyle['img-item']}>
                                <img
                                    src='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3491454693,907424556&fm=11&gp=0.jpg'
                                    alt=''
                                />
                            </div>
                        </PhotoConsumer>
                        <PhotoConsumer
                            src={
                                'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2974784464,2072557815&fm=15&gp=0.jpg'
                            }
                            intro='侧面照'
                        >
                            <div className={StaticEvaluationStyle['img-item']}>
                                <img
                                    src='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2974784464,2072557815&fm=15&gp=0.jpg'
                                    alt=''
                                />
                            </div>
                        </PhotoConsumer>
                    </PhotoProvider>
                </div>
                {/* 体适能数据 */}
                <div className={StaticEvaluationStyle['content-box']}>
                    <div className={StaticEvaluationStyle['title']}>重度(3项)</div>
                    <div className={StaticEvaluationStyle['content']}>
                        <div className={StaticEvaluationStyle['data-item']}>
                            <div className={StaticEvaluationStyle['item-top-box']}>
                                <div className={StaticEvaluationStyle['itb-title']}>高低肩</div>
                                <div className={StaticEvaluationStyle['itb-inline-box']}>
                                    <img className={StaticEvaluationStyle['comp-img']} src='' alt='' />
                                    <img className={StaticEvaluationStyle['comp-img']} src='' alt='' />
                                    <div className={StaticEvaluationStyle['itb-data-box']}>
                                        <div className={StaticEvaluationStyle['itbd-line']}>
                                            <div className={StaticEvaluationStyle['il-item']}>
                                                <div className={StaticEvaluationStyle['ii-line']}>
                                                    <div className={StaticEvaluationStyle['ii-cur-val']}></div>
                                                </div>
                                                <div className={StaticEvaluationStyle['ii-txt']}>轻度</div>
                                            </div>
                                            <div className={StaticEvaluationStyle['il-item']}>
                                                <div className={StaticEvaluationStyle['ii-line']}>
                                                    <div className={StaticEvaluationStyle['ii-cur-val']}></div>
                                                </div>
                                                <div className={StaticEvaluationStyle['ii-txt']}>轻微</div>
                                            </div>
                                            <div
                                                className={`${StaticEvaluationStyle['il-item']} ${StaticEvaluationStyle['il-selected-zdu']}`}
                                            >
                                                <div className={StaticEvaluationStyle['ii-line']}>
                                                    <div className={StaticEvaluationStyle['ii-cur-val']}>15°</div>
                                                </div>
                                                <div className={StaticEvaluationStyle['ii-txt']}>中度</div>
                                            </div>
                                            <div className={StaticEvaluationStyle['il-item']}>
                                                <div className={StaticEvaluationStyle['ii-line']}>
                                                    <div className={StaticEvaluationStyle['ii-cur-val']}></div>
                                                </div>
                                                <div className={StaticEvaluationStyle['ii-txt']}>重度</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={StaticEvaluationStyle['item-bottom-box']}>
                                但是看了放假啦绝对是风口浪尖啊死了都快放假啊了
                            </div>
                        </div>
                        <div className={StaticEvaluationStyle['data-item']}>
                            <div className={StaticEvaluationStyle['item-top-box']}>
                                <div className={StaticEvaluationStyle['itb-title']}>高低肩</div>
                                <div className={StaticEvaluationStyle['itb-inline-box']}>
                                    <img className={StaticEvaluationStyle['comp-img']} src='' alt='' />
                                    <img className={StaticEvaluationStyle['comp-img']} src='' alt='' />
                                    <div className={StaticEvaluationStyle['itb-data-box']}>
                                        <div className={StaticEvaluationStyle['itbd-line']}>
                                            <div className={StaticEvaluationStyle['il-item']}>
                                                <div className={StaticEvaluationStyle['ii-line']}>
                                                    <div className={StaticEvaluationStyle['ii-cur-val']}></div>
                                                </div>
                                                <div className={StaticEvaluationStyle['ii-txt']}>轻度</div>
                                            </div>
                                            <div className={StaticEvaluationStyle['il-item']}>
                                                <div className={StaticEvaluationStyle['ii-line']}>
                                                    <div className={StaticEvaluationStyle['ii-cur-val']}></div>
                                                </div>
                                                <div className={StaticEvaluationStyle['ii-txt']}>轻微</div>
                                            </div>
                                            <div
                                                className={`${StaticEvaluationStyle['il-item']} ${StaticEvaluationStyle['il-selected-zdu']}`}
                                            >
                                                <div className={StaticEvaluationStyle['ii-line']}>
                                                    <div className={StaticEvaluationStyle['ii-cur-val']}>15°</div>
                                                </div>
                                                <div className={StaticEvaluationStyle['ii-txt']}>中度</div>
                                            </div>
                                            <div className={StaticEvaluationStyle['il-item']}>
                                                <div className={StaticEvaluationStyle['ii-line']}>
                                                    <div className={StaticEvaluationStyle['ii-cur-val']}></div>
                                                </div>
                                                <div className={StaticEvaluationStyle['ii-txt']}>重度</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={StaticEvaluationStyle['item-bottom-box']}>
                                但是看了放假啦绝对是风口浪尖啊死了都快放假啊了
                            </div>
                        </div>
                    </div>
                </div>
                {/* 底部按钮 */}
                <div className={StaticEvaluationStyle['bottom-btn-box']}>
                    <div className={StaticEvaluationStyle['qtc-btn']} onClick={this.gotoTcFun}>
                        去体测
                    </div>
                    <div className={StaticEvaluationStyle['share-report-btn']} onClick={this.toImg}>
                        分享报告图片
                    </div>
                </div>
                {/* 分享图片 */}
                <div className={StaticEvaluationStyle['share-box']} ref='fitShareBox'>
                    {/* 分享标题 */}
                    <div className={StaticEvaluationStyle['share-title']}>人体成分报告</div>
                    {/* 用户信息 */}
                    <div className={StaticEvaluationStyle['user-info-box']}>
                        <img className={StaticEvaluationStyle['uib-avatar']} src={DefUserAvatar} alt='头像' />
                        <div className={StaticEvaluationStyle['uib-name']}>哈哈</div>
                        <div className={StaticEvaluationStyle['uib-time']}>测试时：2020-04-20 14:54:32</div>
                    </div>
                    {/* 分数 */}
                    <div className={StaticEvaluationStyle['score-box']}>
                        <div className={StaticEvaluationStyle['score']}>
                            <span className={StaticEvaluationStyle['num']}>80</span>
                            <span className={StaticEvaluationStyle['txt']}>分</span>
                        </div>
                        <div className={StaticEvaluationStyle['beat']}>击败了90%的地球人</div>
                    </div>
                    {/* 图片 */}
                    <div className={StaticEvaluationStyle['imgs-box']}>
                        <PhotoProvider photoClosable={true}>
                            <PhotoConsumer
                                src={
                                    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3491454693,907424556&fm=11&gp=0.jpg'
                                }
                                intro='正面照'
                            >
                                <div className={StaticEvaluationStyle['img-item']}>
                                    <img
                                        src='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3491454693,907424556&fm=11&gp=0.jpg'
                                        alt=''
                                    />
                                </div>
                            </PhotoConsumer>
                            <PhotoConsumer
                                src={
                                    'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2974784464,2072557815&fm=15&gp=0.jpg'
                                }
                                intro='侧面照'
                            >
                                <div className={StaticEvaluationStyle['img-item']}>
                                    <img
                                        src='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2974784464,2072557815&fm=15&gp=0.jpg'
                                        alt=''
                                    />
                                </div>
                            </PhotoConsumer>
                        </PhotoProvider>
                    </div>
                    {/* 体适能数据 */}
                    <div className={StaticEvaluationStyle['content-box']}>
                        <div className={StaticEvaluationStyle['title']}>重度(3项)</div>
                        <div className={StaticEvaluationStyle['content']}>
                            <div className={StaticEvaluationStyle['data-item']}>
                                <div className={StaticEvaluationStyle['item-top-box']}>
                                    <div className={StaticEvaluationStyle['itb-title']}>高低肩</div>
                                    <div className={StaticEvaluationStyle['itb-inline-box']}>
                                        <img className={StaticEvaluationStyle['comp-img']} src='' alt='' />
                                        <img className={StaticEvaluationStyle['comp-img']} src='' alt='' />
                                        <div className={StaticEvaluationStyle['itb-data-box']}>
                                            <div className={StaticEvaluationStyle['itbd-line']}>
                                                <div className={StaticEvaluationStyle['il-item']}>
                                                    <div className={StaticEvaluationStyle['ii-line']}>
                                                        <div className={StaticEvaluationStyle['ii-cur-val']}></div>
                                                    </div>
                                                    <div className={StaticEvaluationStyle['ii-txt']}>轻度</div>
                                                </div>
                                                <div className={StaticEvaluationStyle['il-item']}>
                                                    <div className={StaticEvaluationStyle['ii-line']}>
                                                        <div className={StaticEvaluationStyle['ii-cur-val']}></div>
                                                    </div>
                                                    <div className={StaticEvaluationStyle['ii-txt']}>轻微</div>
                                                </div>
                                                <div
                                                    className={`${StaticEvaluationStyle['il-item']} ${StaticEvaluationStyle['il-selected-zdu']}`}
                                                >
                                                    <div className={StaticEvaluationStyle['ii-line']}>
                                                        <div className={StaticEvaluationStyle['ii-cur-val']}>15°</div>
                                                    </div>
                                                    <div className={StaticEvaluationStyle['ii-txt']}>中度</div>
                                                </div>
                                                <div className={StaticEvaluationStyle['il-item']}>
                                                    <div className={StaticEvaluationStyle['ii-line']}>
                                                        <div className={StaticEvaluationStyle['ii-cur-val']}></div>
                                                    </div>
                                                    <div className={StaticEvaluationStyle['ii-txt']}>重度</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={StaticEvaluationStyle['item-bottom-box']}>
                                    但是看了放假啦绝对是风口浪尖啊死了都快放假啊了
                                </div>
                            </div>
                            <div className={StaticEvaluationStyle['data-item']}>
                                <div className={StaticEvaluationStyle['item-top-box']}>
                                    <div className={StaticEvaluationStyle['itb-title']}>高低肩</div>
                                    <div className={StaticEvaluationStyle['itb-inline-box']}>
                                        <img className={StaticEvaluationStyle['comp-img']} src='' alt='' />
                                        <img className={StaticEvaluationStyle['comp-img']} src='' alt='' />
                                        <div className={StaticEvaluationStyle['itb-data-box']}>
                                            <div className={StaticEvaluationStyle['itbd-line']}>
                                                <div className={StaticEvaluationStyle['il-item']}>
                                                    <div className={StaticEvaluationStyle['ii-line']}>
                                                        <div className={StaticEvaluationStyle['ii-cur-val']}></div>
                                                    </div>
                                                    <div className={StaticEvaluationStyle['ii-txt']}>轻度</div>
                                                </div>
                                                <div className={StaticEvaluationStyle['il-item']}>
                                                    <div className={StaticEvaluationStyle['ii-line']}>
                                                        <div className={StaticEvaluationStyle['ii-cur-val']}></div>
                                                    </div>
                                                    <div className={StaticEvaluationStyle['ii-txt']}>轻微</div>
                                                </div>
                                                <div
                                                    className={`${StaticEvaluationStyle['il-item']} ${StaticEvaluationStyle['il-selected-zdu']}`}
                                                >
                                                    <div className={StaticEvaluationStyle['ii-line']}>
                                                        <div className={StaticEvaluationStyle['ii-cur-val']}>15°</div>
                                                    </div>
                                                    <div className={StaticEvaluationStyle['ii-txt']}>中度</div>
                                                </div>
                                                <div className={StaticEvaluationStyle['il-item']}>
                                                    <div className={StaticEvaluationStyle['ii-line']}>
                                                        <div className={StaticEvaluationStyle['ii-cur-val']}></div>
                                                    </div>
                                                    <div className={StaticEvaluationStyle['ii-txt']}>重度</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={StaticEvaluationStyle['item-bottom-box']}>
                                    但是看了放假啦绝对是风口浪尖啊死了都快放假啊了
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 教练card */}
                    <div className={StaticEvaluationStyle['coach-warp-box']}>
                        <div className={StaticEvaluationStyle['coach-img-box']}>
                            <img src='coachInfo.headPath' alt='头像' />
                        </div>
                        <div className={StaticEvaluationStyle['coach-info-box']}>
                            <div className={StaticEvaluationStyle['coach-name-tag']}>
                                <div className={StaticEvaluationStyle['coach-name']}>教练名称</div>
                                <div className={StaticEvaluationStyle['coach-tag']}>私人教练</div>
                            </div>
                            <div className={StaticEvaluationStyle['coach-service']}>团课 已服务10人</div>
                        </div>
                        <div className={StaticEvaluationStyle['coach-qrcode']}>
                            <div className={StaticEvaluationStyle['coach-qrcode-img']}>
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
