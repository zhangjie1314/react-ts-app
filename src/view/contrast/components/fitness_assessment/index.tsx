// 体适能评估
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import Html2canvas from 'html2canvas'
import { callAppMenthd, callAppShareImgMenthd } from '../../../../utils'
import QRCode from 'qrcode.react'
import FitnessAssessmentStyle from './index.module.scss'
import PosCharts from '@comps/pos_charts'
import FiancoContrast from '@comps/fianco_contrast'
import { ChartItemRules } from '@ctypes/components/pos_charts'
import { getfitnessAssessmentResult } from '@apis/report/bapp'

@inject('reportStore')
@observer
export default class FitnessAssessment extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            chartData: [],
            fiancoData: [],
            coachInfo: {},
            fitnessData: {},
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
    componentDidUpdate(prevProps: any, prevState: any) {
        const oldChartData = JSON.stringify(prevState.chartData)
        const newChartData = JSON.stringify(this.state.chartData)
        if (oldChartData !== newChartData && newChartData !== '[]') {
            const ln = this.state.chartData.length
            console.log(ln)
            ln > 0 && this.handleClickPointFunc(this.state.chartData[ln - 1])
        }
    }
    // 点击图表点
    handleClickPointFunc(item: ChartItemRules) {
        console.log(item)
        getfitnessAssessmentResult({
            wdId: item.id,
        }).then((res: any) => {
            this.handleDataFunc(res.data)
        })
    }
    // 处理数据
    handleDataFunc(data: any) {
        // 处理建议文字段落
        const proposalArr = data.gradeName.split('==')
        data.gradeName = ''
        proposalArr.forEach((itm: any) => {
            if (itm) {
                data.gradeName += `<p>${itm}</p>`
            }
        })
        // 处理进度条
        const listData = this.handleProgressData(data.memberSideTnViewOneList)
        data.memberSideTnViewOneList = listData
        this.setState({
            fitnessData: data,
        })
    }
    // 处理进度条
    handleProgressData(data: any[]): any[] {
        // 基础数据
        const baseData = {
            // 体脂率
            tzl_bz: [
                { txt: '偏低', selected: false },
                { txt: '标准', selected: false },
                { txt: '偏高', selected: false },
            ],
            // 卷腹
            jf_bz: [
                { txt: '较差', selected: false },
                { txt: '合格', selected: false },
                { txt: '优良', selected: false },
            ],
            // 俯卧撑
            fwc_bz: [
                { txt: '较差', selected: false },
                { txt: '合格', selected: false },
                { txt: '优良', selected: false },
            ],
            // 台阶测试
            tj_bz: [
                { txt: '较差', selected: false },
                { txt: '合格', selected: false },
                { txt: '优良', selected: false },
            ],
            // 坐位体前屈
            zlt_bz: [
                { txt: '较差', selected: false },
                { txt: '合格', selected: false },
                { txt: '优良', selected: false },
            ],
            // 心肺功能评级指数
            xfgn_bz: [
                { txt: '较差', selected: false },
                { txt: '合格', selected: false },
                { txt: '优良', selected: false },
            ],
            // 柔韧性测试
            rrx_bz: [
                { txt: '较差', selected: false },
                { txt: '合格', selected: false },
                { txt: '优良', selected: false },
            ],
        }
        console.log(data)
        data.map((itm: any) => {
            itm.memberSideTnViewTowList.map((item: any) => {
                if (item.name.startsWith('体脂率')) {
                    item = this.creatProgessData(baseData.tzl_bz, item)
                } else if (item.name.startsWith('卷腹')) {
                    item = this.creatProgessData(baseData.jf_bz, item)
                } else if (item.name.startsWith('俯卧撑')) {
                    item = this.creatProgessData(baseData.fwc_bz, item)
                } else if (item.name.startsWith('台阶测试')) {
                    item = this.creatProgessData(baseData.tj_bz, item)
                } else if (item.name.startsWith('坐位体前屈')) {
                    item = this.creatProgessData(baseData.zlt_bz, item)
                } else if (item.name.startsWith('心肺功能评级指数')) {
                    item = this.creatProgessData(baseData.xfgn_bz, item)
                } else if (item.name.startsWith('柔韧性测试')) {
                    item = this.creatProgessData(baseData.rrx_bz, item)
                }
                return item
            })
            return itm
        })
        return data
    }
    // 生成对应进度数据
    creatProgessData(proArr: any[], data: any) {
        let proArr1 = JSON.parse(JSON.stringify(proArr))
        proArr1.map((el: any) => {
            // 赋值合格合标准的范围值
            if (el.txt === '合格' || el.txt === '标准') {
                el.rang = data.fw ? data.fw : null
            }
            if (el.txt === data.pj) {
                el['selected'] = true
                el['curVal'] = data.value
                // 计算低位置
                if (data.pj === '偏低' || data.pj === '较差') {
                    el['curValPostion'] = data.fw ? ((data.value < 0 ? 0 : data.value) / data.fw[0]) * 100 : 50
                }
                // 计算合格位置
                if (data.pj === '标准' || data.pj === '合格') {
                    el['curValPostion'] = data.fw ? ((data.value - data.fw[0]) / (data.fw[1] - data.fw[0])) * 100 : 50
                }
                // 计算高位置
                if (data.pj === '偏高' || data.pj === '优良') {
                    el['curValPostion'] = 50
                }
            }
        })
        data['showArr'] = proArr1
        return data
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
    // 处理数据item
    handleItemBox(item: any, index: number, isShowDw: boolean) {
        return (
            <div className={FitnessAssessmentStyle['bottom-box']} key={index}>
                <div className={FitnessAssessmentStyle['level-title']}>
                    {item.name}
                    {isShowDw ? `（${item.dw}）` : ''}
                </div>
                <div className={FitnessAssessmentStyle['progress-block']}>
                    {item.showArr.map((itm: any, idx: number) => {
                        return (
                            <div className={FitnessAssessmentStyle['progress-item']} key={idx}>
                                <div
                                    className={`${FitnessAssessmentStyle['headbar']} ${
                                        itm.selected ? FitnessAssessmentStyle['headbar-color-' + (idx + 1)] : ''
                                    }`}
                                ></div>
                                <div
                                    className={`${FitnessAssessmentStyle['text']} ${
                                        itm.selected ? FitnessAssessmentStyle['text-seleced-' + (idx + 1)] : ''
                                    }`}
                                >
                                    <span className={FitnessAssessmentStyle['rang-start']}>
                                        {itm.rang && itm.rang[0]}
                                    </span>
                                    {itm.curVal ? (
                                        <span
                                            className={`${FitnessAssessmentStyle['cur-value']} ${
                                                itm.selected ? FitnessAssessmentStyle['cur-value-' + (idx + 1)] : ''
                                            }`}
                                            style={{ left: itm.curValPostion + '%' }}
                                        >
                                            {itm.curVal}
                                        </span>
                                    ) : null}
                                    {itm.txt}
                                    <span className={FitnessAssessmentStyle['rang-end']}>
                                        {itm.rang && itm.rang[1]}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={FitnessAssessmentStyle['level-dec']}>{item.sm}</div>
            </div>
        )
    }
    render() {
        const { chartData, fiancoData, fitnessData, coachInfo, imgHandleing, shareBtnTxt } = this.state
        const { isShare, userInfos } = this.props.reportStore
        return (
            <div className={FitnessAssessmentStyle['wrapper']}>
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
                <div className={FitnessAssessmentStyle['score-box']}>
                    <div className={FitnessAssessmentStyle['score']}>
                        <span className={FitnessAssessmentStyle['num']}>{fitnessData.grade || 0}</span>
                        <span className={FitnessAssessmentStyle['txt']}>分</span>
                    </div>
                    <div className={FitnessAssessmentStyle['beat']}>击败了{fitnessData.beat || '--%'}的地球人</div>
                </div>
                {/* 建议 */}
                <div className={FitnessAssessmentStyle['content-box']}>
                    <div className={FitnessAssessmentStyle['title']}>建议</div>
                    <div
                        className={FitnessAssessmentStyle['content']}
                        dangerouslySetInnerHTML={{ __html: fitnessData.gradeName }}
                    ></div>
                </div>
                {/* 体适能数据 */}
                <div className={FitnessAssessmentStyle['content-box']}>
                    <div className={FitnessAssessmentStyle['title']}>体适能数据</div>
                    <div className={FitnessAssessmentStyle['content']}>
                        {fitnessData.memberSideTnViewOneList &&
                            fitnessData.memberSideTnViewOneList.map((itm: any, idx: number) => {
                                return (
                                    <div className={FitnessAssessmentStyle['data-item']} key={idx}>
                                        <div className={FitnessAssessmentStyle['top-box']}>
                                            <div className={FitnessAssessmentStyle['pb-title']}>
                                                {itm.tile}
                                                {itm.memberSideTnViewTowList.length > 1
                                                    ? ''
                                                    : `（${itm.memberSideTnViewTowList[0].dw}）`}
                                            </div>
                                            <div className={FitnessAssessmentStyle['pb-tips']}>{itm.des}</div>
                                        </div>
                                        {itm.memberSideTnViewTowList.map((item: any, index: number) =>
                                            this.handleItemBox(item, index, itm.memberSideTnViewTowList.length > 1)
                                        )}
                                    </div>
                                )
                            })}
                    </div>
                </div>
                {/* 底部按钮 */}
                {isShare === 1 ? null : (
                    <div className={FitnessAssessmentStyle['bottom-btn-box']}>
                        <div className={FitnessAssessmentStyle['qtc-btn']} onClick={this.gotoTcFun}>
                            去体测
                        </div>
                        <div
                            className={`${FitnessAssessmentStyle['share-report-btn']} ${
                                imgHandleing ? FitnessAssessmentStyle.dis : ''
                            }`}
                            onClick={this.toImg}
                        >
                            {shareBtnTxt}
                        </div>
                    </div>
                )}
                {/* 分享图片 */}
                {isShare === 1 ? null : (
                    <div className={FitnessAssessmentStyle['share-box']} ref='fitShareBox'>
                        {/* 分享标题 */}
                        <div className={FitnessAssessmentStyle['share-title']}>人体成分报告</div>
                        {/* 用户信息 */}
                        <div className={FitnessAssessmentStyle['user-info-box']}>
                            <img className={FitnessAssessmentStyle['uib-avatar']} src={userInfos.headPath} alt='头像' />
                            <div className={FitnessAssessmentStyle['uib-name']}>{userInfos.name}</div>
                            <div className={FitnessAssessmentStyle['uib-time']}>测试时：{fitnessData.createTime}</div>
                        </div>
                        {/* 分数 */}
                        <div className={FitnessAssessmentStyle['score-box']}>
                            <div className={FitnessAssessmentStyle['score']}>
                                <span className={FitnessAssessmentStyle['num']}>{fitnessData.grade || 0}</span>
                                <span className={FitnessAssessmentStyle['txt']}>分</span>
                            </div>
                            <div className={FitnessAssessmentStyle['beat']}>
                                击败了{fitnessData.beat || '--%'}的地球人
                            </div>
                        </div>
                        {/* 建议 */}
                        <div className={FitnessAssessmentStyle['content-box']}>
                            <div className={FitnessAssessmentStyle['title']}>建议</div>
                            <div
                                className={FitnessAssessmentStyle['content']}
                                dangerouslySetInnerHTML={{ __html: fitnessData.gradeName }}
                            ></div>
                        </div>
                        {/* 体适能数据 */}
                        <div className={FitnessAssessmentStyle['content-box']}>
                            <div className={FitnessAssessmentStyle['title']}>体适能数据</div>
                            <div className={FitnessAssessmentStyle['content']}>
                                {fitnessData.memberSideTnViewOneList &&
                                    fitnessData.memberSideTnViewOneList.map((itm: any, idx: number) => {
                                        return (
                                            <div className={FitnessAssessmentStyle['data-item']} key={idx}>
                                                <div className={FitnessAssessmentStyle['top-box']}>
                                                    <div className={FitnessAssessmentStyle['pb-title']}>
                                                        {itm.tile}
                                                        {itm.memberSideTnViewTowList.length > 1
                                                            ? ''
                                                            : `（${itm.memberSideTnViewTowList[0].dw}）`}
                                                    </div>
                                                    <div className={FitnessAssessmentStyle['pb-tips']}>{itm.des}</div>
                                                </div>
                                                {itm.memberSideTnViewTowList.map((item: any, index: number) =>
                                                    this.handleItemBox(
                                                        item,
                                                        index,
                                                        itm.memberSideTnViewTowList.length > 1
                                                    )
                                                )}
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                        {/* 教练card */}
                        <div className={FitnessAssessmentStyle['coach-warp-box']}>
                            <div className={FitnessAssessmentStyle['coach-img-box']}>
                                <img src={coachInfo.headPath} alt='头像' />
                            </div>
                            <div className={FitnessAssessmentStyle['coach-info-box']}>
                                <div className={FitnessAssessmentStyle['coach-name-tag']}>
                                    <div className={FitnessAssessmentStyle['coach-name']}>{coachInfo.name || '--'}</div>
                                    <div className={FitnessAssessmentStyle['coach-tag']}>私人教练</div>
                                </div>
                                <div className={FitnessAssessmentStyle['coach-service']}>
                                    {coachInfo.coachType || '--'} 已服务{coachInfo.waiterCount || 0}人
                                </div>
                            </div>
                            <div className={FitnessAssessmentStyle['coach-qrcode']}>
                                <div className={FitnessAssessmentStyle['coach-qrcode-img']}>
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
