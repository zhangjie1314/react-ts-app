import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import Html2canvas from 'html2canvas'
import _ from 'lodash'
import { callAppMenthd, callAppShareImgMenthd } from '@utils/index'
import QRCode from 'qrcode.react'
import { PhotoProvider, PhotoConsumer } from 'react-photo-view'
import AthleticPerformanceStyle from './index.module.scss'
import PosCharts from '@comps/pos_charts'
import PosCircleCharts from '@comps/pos_circle_charts'
import FiancoContrast from '@comps/fianco_contrast'
import DefUserAvatar from '@assets/img/normal.png'
import { ChartItemRules } from '@ctypes/components/pos_charts'
import { getActionPerformanceResult } from '@apis/report/bapp'
import Util from './util'

@inject('reportStore')
@observer
export default class AthleticPerformance extends Component<any, any> {
    state = {
        chartData: [],
        fiancoData: [],
        coachInfo: {},
        circleData: [],
        imgHandleing: false,
        shareBtnTxt: '分享报告图片',
        athleticPerformanceData: {},
        score: 0,
        creatTime: '',
        typesData: [],
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
        if (!_.isEqual(this.state.chartData, prevState.chartData) && !_.isEmpty(this.state.chartData)) {
            this.handleClickPointFunc(this.state.chartData[0])
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
            typesData: resultArr,
        })
    }

    render() {
        const { chartData, fiancoData, circleData, imgHandleing, shareBtnTxt, score, creatTime } = this.state
        const { isShare } = this.props.reportStore
        return (
            <div className={AthleticPerformanceStyle['wrapper']}>
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
                {/* 跳转按钮 */}
                <div className={AthleticPerformanceStyle['dump-box']}>
                    <div
                        className={`${AthleticPerformanceStyle['dump-inline-box']} ${AthleticPerformanceStyle['fixed-box']}`}
                    >
                        <div
                            className={`${AthleticPerformanceStyle['dib-item']} ${AthleticPerformanceStyle['active']}`}
                        >
                            <div className={AthleticPerformanceStyle['di-title']}>力量类</div>
                            <div className={AthleticPerformanceStyle['di-count']}>(8项)</div>
                        </div>
                        <div className={AthleticPerformanceStyle['dib-item']}>
                            <div className={AthleticPerformanceStyle['di-title']}>敏捷类</div>
                            <div className={AthleticPerformanceStyle['di-count']}>(8项)</div>
                        </div>
                        <div className={AthleticPerformanceStyle['dib-item']}>
                            <div className={AthleticPerformanceStyle['di-title']}>柔韧类</div>
                            <div className={AthleticPerformanceStyle['di-count']}>(8项)</div>
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
                {isShare === 1 ? null : (
                    <div className={AthleticPerformanceStyle['bottom-btn-box']}>
                        <div className={AthleticPerformanceStyle['qtc-btn']} onClick={this.gotoTcFun}>
                            去体测
                        </div>
                        <div
                            className={`${AthleticPerformanceStyle['share-report-btn']} ${
                                imgHandleing ? AthleticPerformanceStyle['dis'] : ''
                            }`}
                            onClick={this.toImg}
                        >
                            {shareBtnTxt}
                        </div>
                    </div>
                )}
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
