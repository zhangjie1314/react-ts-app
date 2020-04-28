import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import Html2canvas from 'html2canvas'
import { callAppMenthd, callAppShareImgMenthd } from '../../../../utils'
import QRCode from 'qrcode.react'
import { PhotoProvider, PhotoConsumer } from 'react-photo-view'
import AthleticPerformanceStyle from './index.module.scss'
import PosCharts from '../../../components/pos_charts'
import PosCircleCharts from '../../../components/pos_circle_charts'
import FiancoContrast from '../../../components/fianco_contrast'
import DefUserAvatar from '../../../../assets/img/normal.png'

@inject('reportStore')
@observer
export default class AthleticPerformance extends Component<any, any> {
    state = {
        chartData: [],
        fiancoData: [],
        circleData: [],
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
    componentDidMount() {
        this.setState({
            circleData: [
                {
                    name: '力量',
                    val: 20,
                    index: 0,
                    bgColor: 'rgba(0,0,0,0.25)',
                    color: '#52dea4',
                },
                {
                    name: '敏捷',
                    val: 40,
                    index: 1,
                    bgColor: 'rgba(0,0,0,0.25)',
                    color: '#32a7e7',
                },
                {
                    name: '平衡',
                    val: 60,
                    index: 2,
                    bgColor: 'rgba(0,0,0,0.25)',
                    color: '#5260de',
                },
            ],
        })
    }
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
        const { chartData, fiancoData, circleData } = this.state
        return (
            <div className={AthleticPerformanceStyle['wrapper']}>
                {/* 图表 */}
                {chartData.length > 0 && <PosCharts chartId='athletic-performance-chart' chartData={chartData} />}
                {/* 对比 */}
                <FiancoContrast fiancoArr={fiancoData} />
                {/* 圆环图表 */}
                {circleData.length > 0 && (
                    <PosCircleCharts chartId='athletic-performance-circle-chart' chartData={circleData} />
                )}
                {/* 数据 */}
                <div className={AthleticPerformanceStyle['data-box']}>
                    <div className={AthleticPerformanceStyle['item']}>
                        <div className={AthleticPerformanceStyle['title']}>力量类</div>
                        <div className={AthleticPerformanceStyle['dbi-box']}>
                            <div className={AthleticPerformanceStyle['dbib-item']}>
                                <div className={AthleticPerformanceStyle['dbib-txt']}>最大肌耐力</div>
                                <div className={AthleticPerformanceStyle['dbib-progress-bar']}>
                                    <div
                                        className={AthleticPerformanceStyle['dpb-num']}
                                        style={{ width: '50%', backgroundColor: '#52DEA4' }}
                                    ></div>
                                </div>
                            </div>
                            <div className={AthleticPerformanceStyle['dbib-item']}>
                                <div className={AthleticPerformanceStyle['dbib-txt']}>最大肌力</div>
                                <div className={AthleticPerformanceStyle['dbib-progress-bar']}>
                                    <div
                                        className={AthleticPerformanceStyle['dpb-num']}
                                        style={{ width: '50%', backgroundColor: '#32A7E7' }}
                                    ></div>
                                </div>
                            </div>
                            <div className={AthleticPerformanceStyle['dbib-item']}>
                                <div className={AthleticPerformanceStyle['dbib-txt']}>爆发力</div>
                                <div className={AthleticPerformanceStyle['dbib-progress-bar']}>
                                    <div
                                        className={AthleticPerformanceStyle['dpb-num']}
                                        style={{ width: '50%', backgroundColor: '#5260DE' }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={AthleticPerformanceStyle['item']}>
                        <div className={AthleticPerformanceStyle['title']}>敏捷类</div>
                        <div className={AthleticPerformanceStyle['dbi-box']}>
                            <div className={AthleticPerformanceStyle['dbib-item']}>
                                <div className={AthleticPerformanceStyle['dbib-txt']}>协调能力</div>
                                <div className={AthleticPerformanceStyle['dbib-progress-bar']}>
                                    <div className={AthleticPerformanceStyle['dpb-num']} style={{ width: '50%' }}></div>
                                </div>
                            </div>
                            <div className={AthleticPerformanceStyle['dbib-item']}>
                                <div className={AthleticPerformanceStyle['dbib-txt']}>平衡能力</div>
                                <div className={AthleticPerformanceStyle['dbib-progress-bar']}>
                                    <div className={AthleticPerformanceStyle['dpb-num']} style={{ width: '50%' }}></div>
                                </div>
                            </div>
                            <div className={AthleticPerformanceStyle['dbib-item']}>
                                <div className={AthleticPerformanceStyle['dbib-txt']}>反应能力</div>
                                <div className={AthleticPerformanceStyle['dbib-progress-bar']}>
                                    <div className={AthleticPerformanceStyle['dpb-num']} style={{ width: '50%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={AthleticPerformanceStyle['item']}>
                        <div className={AthleticPerformanceStyle['title']}>柔韧类</div>
                        <div className={AthleticPerformanceStyle['dbi-box']}>
                            <div className={AthleticPerformanceStyle['dbib-item']}>
                                <div className={AthleticPerformanceStyle['dbib-txt']}>关节灵活度</div>
                                <div className={AthleticPerformanceStyle['dbib-progress-bar']}>
                                    <div className={AthleticPerformanceStyle['dpb-num']} style={{ width: '50%' }}></div>
                                </div>
                            </div>
                            <div className={AthleticPerformanceStyle['dbib-item']}>
                                <div className={AthleticPerformanceStyle['dbib-txt']}>柔韧性</div>
                                <div className={AthleticPerformanceStyle['dbib-progress-bar']}>
                                    <div className={AthleticPerformanceStyle['dpb-num']} style={{ width: '50%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 体适能数据 */}
                <div className={AthleticPerformanceStyle['content-box']}>
                    <div className={AthleticPerformanceStyle['title']}>最大肌耐力</div>
                    <div className={AthleticPerformanceStyle['sub-title']}>肌耐力是指人体对抗疲劳的能力</div>
                    <div className={AthleticPerformanceStyle['content']}>
                        <div className={AthleticPerformanceStyle['data-item']}>
                            <div className={AthleticPerformanceStyle['item-top-box']}>
                                <div className={AthleticPerformanceStyle['itb-title']}>腹部</div>
                                <div className={AthleticPerformanceStyle['itb-sub-title']}>腹部 20次</div>
                                <div className={AthleticPerformanceStyle['itb-inline-box']}>
                                    <div className={AthleticPerformanceStyle['itb-data-box']}>
                                        <div className={AthleticPerformanceStyle['itbd-line']}>
                                            <div className={AthleticPerformanceStyle['il-item']}>
                                                <div className={AthleticPerformanceStyle['ii-line']}>
                                                    <div className={AthleticPerformanceStyle['ii-cur-val']}></div>
                                                </div>
                                                <div className={AthleticPerformanceStyle['ii-txt']}>很差</div>
                                            </div>
                                            <div className={AthleticPerformanceStyle['il-item']}>
                                                <div className={AthleticPerformanceStyle['ii-line']}>
                                                    <div className={AthleticPerformanceStyle['ii-cur-val']}></div>
                                                </div>
                                                <div className={AthleticPerformanceStyle['ii-txt']}>较差</div>
                                            </div>
                                            <div
                                                className={`${AthleticPerformanceStyle['il-item']} ${AthleticPerformanceStyle['il-selected-zdu']}`}
                                            >
                                                <div className={AthleticPerformanceStyle['ii-line']}></div>
                                                <div className={AthleticPerformanceStyle['ii-txt']}>合格</div>
                                            </div>
                                            <div className={AthleticPerformanceStyle['il-item']}>
                                                <div className={AthleticPerformanceStyle['ii-line']}>
                                                    <div className={AthleticPerformanceStyle['ii-cur-val']}></div>
                                                </div>
                                                <div className={AthleticPerformanceStyle['ii-txt']}>较好</div>
                                            </div>
                                            <div className={AthleticPerformanceStyle['il-item']}>
                                                <div className={AthleticPerformanceStyle['ii-line']}>
                                                    <div className={AthleticPerformanceStyle['ii-cur-val']}></div>
                                                </div>
                                                <div className={AthleticPerformanceStyle['ii-txt']}>优秀</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={AthleticPerformanceStyle['item-bottom-box']}>
                                但是看了放假啦绝对是风口浪尖啊死了都快放假啊了
                            </div>
                        </div>
                        <div className={AthleticPerformanceStyle['data-item']}>
                            <div className={AthleticPerformanceStyle['item-top-box']}>
                                <div className={AthleticPerformanceStyle['itb-title']}>腹部</div>
                                <div className={AthleticPerformanceStyle['itb-sub-title']}>腹部 20次</div>
                                <div className={AthleticPerformanceStyle['itb-inline-box']}>
                                    <div className={AthleticPerformanceStyle['itb-data-box']}>
                                        <div className={AthleticPerformanceStyle['itbd-line']}>
                                            <div className={AthleticPerformanceStyle['il-item']}>
                                                <div className={AthleticPerformanceStyle['ii-line']}>
                                                    <div className={AthleticPerformanceStyle['ii-cur-val']}></div>
                                                </div>
                                                <div className={AthleticPerformanceStyle['ii-txt']}>很差</div>
                                            </div>
                                            <div className={AthleticPerformanceStyle['il-item']}>
                                                <div className={AthleticPerformanceStyle['ii-line']}>
                                                    <div className={AthleticPerformanceStyle['ii-cur-val']}></div>
                                                </div>
                                                <div className={AthleticPerformanceStyle['ii-txt']}>较差</div>
                                            </div>
                                            <div
                                                className={`${AthleticPerformanceStyle['il-item']} ${AthleticPerformanceStyle['il-selected-zdu']}`}
                                            >
                                                <div className={AthleticPerformanceStyle['ii-line']}></div>
                                                <div className={AthleticPerformanceStyle['ii-txt']}>合格</div>
                                            </div>
                                            <div className={AthleticPerformanceStyle['il-item']}>
                                                <div className={AthleticPerformanceStyle['ii-line']}>
                                                    <div className={AthleticPerformanceStyle['ii-cur-val']}></div>
                                                </div>
                                                <div className={AthleticPerformanceStyle['ii-txt']}>较好</div>
                                            </div>
                                            <div className={AthleticPerformanceStyle['il-item']}>
                                                <div className={AthleticPerformanceStyle['ii-line']}>
                                                    <div className={AthleticPerformanceStyle['ii-cur-val']}></div>
                                                </div>
                                                <div className={AthleticPerformanceStyle['ii-txt']}>优秀</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={AthleticPerformanceStyle['item-bottom-box']}>
                                但是看了放假啦绝对是风口浪尖啊死了都快放假啊了
                            </div>
                        </div>
                    </div>
                </div>
                {/* 底部按钮 */}
                <div className={AthleticPerformanceStyle['bottom-btn-box']}>
                    <div className={AthleticPerformanceStyle['qtc-btn']} onClick={this.gotoTcFun}>
                        去体测
                    </div>
                    <div className={AthleticPerformanceStyle['share-report-btn']} onClick={this.toImg}>
                        分享报告图片
                    </div>
                </div>
                {/* 分享图片 */}
                <div className={AthleticPerformanceStyle['share-box']} ref='fitShareBox'>
                    {/* 分享标题 */}
                    <div className={AthleticPerformanceStyle['share-title']}>人体成分报告</div>
                    {/* 用户信息 */}
                    <div className={AthleticPerformanceStyle['user-info-box']}>
                        <img className={AthleticPerformanceStyle['uib-avatar']} src={DefUserAvatar} alt='头像' />
                        <div className={AthleticPerformanceStyle['uib-name']}>哈哈</div>
                        <div className={AthleticPerformanceStyle['uib-time']}>测试时：2020-04-20 14:54:32</div>
                    </div>
                    {/* 分数 */}
                    <div className={AthleticPerformanceStyle['score-box']}>
                        <div className={AthleticPerformanceStyle['score']}>
                            <span className={AthleticPerformanceStyle['num']}>80</span>
                            <span className={AthleticPerformanceStyle['txt']}>分</span>
                        </div>
                        <div className={AthleticPerformanceStyle['beat']}>击败了90%的地球人</div>
                    </div>
                    {/* 图片 */}
                    <div className={AthleticPerformanceStyle['imgs-box']}>
                        <PhotoProvider photoClosable={true}>
                            <PhotoConsumer
                                src={
                                    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3491454693,907424556&fm=11&gp=0.jpg'
                                }
                                intro='正面照'
                            >
                                <div className={AthleticPerformanceStyle['img-item']}>
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
                                <div className={AthleticPerformanceStyle['img-item']}>
                                    <img
                                        src='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2974784464,2072557815&fm=15&gp=0.jpg'
                                        alt=''
                                    />
                                </div>
                            </PhotoConsumer>
                        </PhotoProvider>
                    </div>
                    {/* 体适能数据 */}
                    <div className={AthleticPerformanceStyle['content-box']}>
                        <div className={AthleticPerformanceStyle['title']}>重度(3项)</div>
                        <div className={AthleticPerformanceStyle['content']}>
                            <div className={AthleticPerformanceStyle['data-item']}>
                                <div className={AthleticPerformanceStyle['item-top-box']}>
                                    <div className={AthleticPerformanceStyle['itb-title']}>高低肩</div>
                                    <div className={AthleticPerformanceStyle['itb-inline-box']}>
                                        <img className={AthleticPerformanceStyle['comp-img']} src='' alt='' />
                                        <img className={AthleticPerformanceStyle['comp-img']} src='' alt='' />
                                        <div className={AthleticPerformanceStyle['itb-data-box']}>
                                            <div className={AthleticPerformanceStyle['itbd-line']}>
                                                <div className={AthleticPerformanceStyle['il-item']}>
                                                    <div className={AthleticPerformanceStyle['ii-line']}>
                                                        <div className={AthleticPerformanceStyle['ii-cur-val']}></div>
                                                    </div>
                                                    <div className={AthleticPerformanceStyle['ii-txt']}>轻度</div>
                                                </div>
                                                <div className={AthleticPerformanceStyle['il-item']}>
                                                    <div className={AthleticPerformanceStyle['ii-line']}>
                                                        <div className={AthleticPerformanceStyle['ii-cur-val']}></div>
                                                    </div>
                                                    <div className={AthleticPerformanceStyle['ii-txt']}>轻微</div>
                                                </div>
                                                <div
                                                    className={`${AthleticPerformanceStyle['il-item']} ${AthleticPerformanceStyle['il-selected-zdu']}`}
                                                >
                                                    <div className={AthleticPerformanceStyle['ii-line']}>
                                                        <div className={AthleticPerformanceStyle['ii-cur-val']}>
                                                            15°
                                                        </div>
                                                    </div>
                                                    <div className={AthleticPerformanceStyle['ii-txt']}>中度</div>
                                                </div>
                                                <div className={AthleticPerformanceStyle['il-item']}>
                                                    <div className={AthleticPerformanceStyle['ii-line']}>
                                                        <div className={AthleticPerformanceStyle['ii-cur-val']}></div>
                                                    </div>
                                                    <div className={AthleticPerformanceStyle['ii-txt']}>重度</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={AthleticPerformanceStyle['item-bottom-box']}>
                                    但是看了放假啦绝对是风口浪尖啊死了都快放假啊了
                                </div>
                            </div>
                            <div className={AthleticPerformanceStyle['data-item']}>
                                <div className={AthleticPerformanceStyle['item-top-box']}>
                                    <div className={AthleticPerformanceStyle['itb-title']}>高低肩</div>
                                    <div className={AthleticPerformanceStyle['itb-inline-box']}>
                                        <img className={AthleticPerformanceStyle['comp-img']} src='' alt='' />
                                        <img className={AthleticPerformanceStyle['comp-img']} src='' alt='' />
                                        <div className={AthleticPerformanceStyle['itb-data-box']}>
                                            <div className={AthleticPerformanceStyle['itbd-line']}>
                                                <div className={AthleticPerformanceStyle['il-item']}>
                                                    <div className={AthleticPerformanceStyle['ii-line']}>
                                                        <div className={AthleticPerformanceStyle['ii-cur-val']}></div>
                                                    </div>
                                                    <div className={AthleticPerformanceStyle['ii-txt']}>轻度</div>
                                                </div>
                                                <div className={AthleticPerformanceStyle['il-item']}>
                                                    <div className={AthleticPerformanceStyle['ii-line']}>
                                                        <div className={AthleticPerformanceStyle['ii-cur-val']}></div>
                                                    </div>
                                                    <div className={AthleticPerformanceStyle['ii-txt']}>轻微</div>
                                                </div>
                                                <div
                                                    className={`${AthleticPerformanceStyle['il-item']} ${AthleticPerformanceStyle['il-selected-zdu']}`}
                                                >
                                                    <div className={AthleticPerformanceStyle['ii-line']}>
                                                        <div className={AthleticPerformanceStyle['ii-cur-val']}>
                                                            15°
                                                        </div>
                                                    </div>
                                                    <div className={AthleticPerformanceStyle['ii-txt']}>中度</div>
                                                </div>
                                                <div className={AthleticPerformanceStyle['il-item']}>
                                                    <div className={AthleticPerformanceStyle['ii-line']}>
                                                        <div className={AthleticPerformanceStyle['ii-cur-val']}></div>
                                                    </div>
                                                    <div className={AthleticPerformanceStyle['ii-txt']}>重度</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={AthleticPerformanceStyle['item-bottom-box']}>
                                    但是看了放假啦绝对是风口浪尖啊死了都快放假啊了
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 教练card */}
                    <div className={AthleticPerformanceStyle['coach-warp-box']}>
                        <div className={AthleticPerformanceStyle['coach-img-box']}>
                            <img src='coachInfo.headPath' alt='头像' />
                        </div>
                        <div className={AthleticPerformanceStyle['coach-info-box']}>
                            <div className={AthleticPerformanceStyle['coach-name-tag']}>
                                <div className={AthleticPerformanceStyle['coach-name']}>教练名称</div>
                                <div className={AthleticPerformanceStyle['coach-tag']}>私人教练</div>
                            </div>
                            <div className={AthleticPerformanceStyle['coach-service']}>团课 已服务10人</div>
                        </div>
                        <div className={AthleticPerformanceStyle['coach-qrcode']}>
                            <div className={AthleticPerformanceStyle['coach-qrcode-img']}>
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
