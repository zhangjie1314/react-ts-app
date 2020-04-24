import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Html2canvas from 'html2canvas'
import { callAppMenthd, callAppShareImgMenthd } from '../../../../utils'
import QRCode from 'qrcode.react'
import FitnessAssessmentStyle from './index.module.scss'
import PosCharts from '../../../components/pos_charts'
import FiancoContrast from '../../../components/fianco_contrast'
import DefUserAvatar from '../../../../assets/img/normal.png'

@inject('reportStore')
@observer
export default class FitnessAssessment extends Component<any, any> {
    state = {
        chartData: [],
        fiancoData: [],
    }
    componentDidMount() {
        this.setState({
            chartData: [
                {
                    time: '04.14\n08:01',
                    grade: 40,
                    sort: 0,
                    type: 2,
                },
                {
                    time: '04.14\n08:02',
                    grade: 56,
                    sort: 1,
                    type: 2,
                },
                {
                    time: '04.14\n08:03',
                    grade: 43,
                    sort: 2,
                    type: 2,
                },
                {
                    time: '04.14\n08:04',
                    grade: 60,
                    sort: 3,
                    type: 2,
                },
                {
                    time: '04.14\n08:05',
                    grade: 58,
                    sort: 4,
                    type: 2,
                },
                {
                    time: '04.14\n08:06',
                    grade: 50,
                    sort: 5,
                    type: 2,
                },
                {
                    time: '04.14\n08:07',
                    grade: 59,
                    sort: 6,
                    type: 2,
                },
                {
                    time: '04.14\n08:08',
                    grade: 81,
                    sort: 7,
                    type: 2,
                },
            ],
            fiancoData: [
                {
                    id: '1',
                    times: '2020年04月08日',
                    score: '54',
                    selected: 0,
                },
                {
                    id: '2',
                    times: '2021年04月08日',
                    score: '54',
                    selected: 0,
                },
                {
                    id: '3',
                    times: '2020年04月08日',
                    score: '54',
                    selected: 0,
                },
                {
                    id: '4',
                    times: '2020年04月08日',
                    score: '54',
                    selected: 0,
                },
                {
                    id: '5',
                    times: '2020年04月08日',
                    score: '54',
                    selected: 0,
                },
                {
                    id: '6',
                    times: '2020年04月08日',
                    score: '54',
                    selected: 0,
                },
                {
                    id: '7',
                    times: '2020年04月08日',
                    score: '54',
                    selected: 0,
                },
                {
                    id: '8',
                    times: '2020年04月08日',
                    score: '54',
                    selected: 0,
                },
                {
                    id: '9',
                    times: '2020年04月09日',
                    score: '54',
                    selected: 0,
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
        const { chartData, fiancoData } = this.state
        return (
            <div className={FitnessAssessmentStyle['wrapper']}>
                {/* 图表 */}
                <PosCharts chartId='fitness-assessment-chart' chartData={chartData} />
                {/* 对比 */}
                <FiancoContrast fiancoArr={fiancoData} />
                {/* 分数 */}
                <div className={FitnessAssessmentStyle['score-box']}>
                    <div className={FitnessAssessmentStyle['score']}>
                        <span className={FitnessAssessmentStyle['num']}>80</span>
                        <span className={FitnessAssessmentStyle['txt']}>分</span>
                    </div>
                    <div className={FitnessAssessmentStyle['beat']}>击败了90%的地球人</div>
                </div>
                {/* 建议 */}
                <div className={FitnessAssessmentStyle['content-box']}>
                    <div className={FitnessAssessmentStyle['title']}>建议</div>
                    <div className={FitnessAssessmentStyle['content']}>建议建议建议建议建议建议建议建议建议建议</div>
                </div>
                {/* 体适能数据 */}
                <div className={FitnessAssessmentStyle['content-box']}>
                    <div className={FitnessAssessmentStyle['title']}>体适能数据</div>
                    <div className={FitnessAssessmentStyle['content']}>
                        <div className={FitnessAssessmentStyle['data-item']}>
                            <div className={FitnessAssessmentStyle['top-box']}>
                                <div className={FitnessAssessmentStyle['pb-title']}>体脂率（%）</div>
                                <div className={FitnessAssessmentStyle['pb-tips']}>
                                    体脂率是指人体内脂肪重量在人体总体重中的占比
                                </div>
                            </div>
                            <div className={FitnessAssessmentStyle['bottom-box']}>
                                <div className={FitnessAssessmentStyle['level-title']}>卷腹（个）</div>
                                <div className={FitnessAssessmentStyle['progress-block']}>
                                    <div className={FitnessAssessmentStyle['progress-item']}>
                                        <div className={FitnessAssessmentStyle['headbar']}></div>
                                        <div className={FitnessAssessmentStyle['text']}>
                                            <span className={FitnessAssessmentStyle['rang-start']}></span>
                                            <span
                                                className={FitnessAssessmentStyle['cur-value']}
                                                style={{ left: '15%' }}
                                            >
                                                50
                                            </span>
                                            偏低
                                            <span className={FitnessAssessmentStyle['rang-end']}>29</span>
                                        </div>
                                    </div>
                                    <div className={FitnessAssessmentStyle['progress-item']}>
                                        <div className={FitnessAssessmentStyle['headbar']}></div>
                                        <div className={FitnessAssessmentStyle['text']}>
                                            <span className={FitnessAssessmentStyle['rang-start']}></span>
                                            <span
                                                className={FitnessAssessmentStyle['cur-value']}
                                                style={{ left: '15%' }}
                                            >
                                                50
                                            </span>
                                            偏低
                                            <span className={FitnessAssessmentStyle['rang-end']}>29</span>
                                        </div>
                                    </div>
                                    <div className={FitnessAssessmentStyle['progress-item']}>
                                        <div
                                            className={`${FitnessAssessmentStyle['headbar']} ${FitnessAssessmentStyle['headbar-color-1']}`}
                                        ></div>
                                        <div
                                            className={`${FitnessAssessmentStyle['text']} ${FitnessAssessmentStyle['text-seleced-1']}`}
                                        >
                                            <span className={FitnessAssessmentStyle['rang-start']}></span>
                                            <span
                                                className={`${FitnessAssessmentStyle['cur-value']} ${FitnessAssessmentStyle['cur-value-1']}`}
                                                style={{ left: '15%' }}
                                            >
                                                50
                                            </span>
                                            偏低
                                            <span className={FitnessAssessmentStyle['rang-end']}></span>
                                        </div>
                                    </div>
                                </div>
                                <div className={FitnessAssessmentStyle['level-dec']}>你的腹部肌肉还不错哦~</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 底部按钮 */}
                <div className={FitnessAssessmentStyle['bottom-btn-box']}>
                    <div className={FitnessAssessmentStyle['qtc-btn']} onClick={this.gotoTcFun}>
                        去体测
                    </div>
                    <div className={FitnessAssessmentStyle['share-report-btn']} onClick={this.toImg}>
                        分享报告图片
                    </div>
                </div>
                {/* 分享图片 */}
                <div className={FitnessAssessmentStyle['share-box']} ref='fitShareBox'>
                    {/* 分享标题 */}
                    <div className={FitnessAssessmentStyle['share-title']}>人体成分报告</div>
                    {/* 用户信息 */}
                    <div className={FitnessAssessmentStyle['user-info-box']}>
                        <img className={FitnessAssessmentStyle['uib-avatar']} src={DefUserAvatar} alt='头像' />
                        <div className={FitnessAssessmentStyle['uib-name']}>哈哈</div>
                        <div className={FitnessAssessmentStyle['uib-time']}>测试时：2020-04-20 14:54:32</div>
                    </div>
                    {/* 分数 */}
                    <div className={FitnessAssessmentStyle['score-box']}>
                        <div className={FitnessAssessmentStyle['score']}>
                            <span className={FitnessAssessmentStyle['num']}>80</span>
                            <span className={FitnessAssessmentStyle['txt']}>分</span>
                        </div>
                        <div className={FitnessAssessmentStyle['beat']}>击败了90%的地球人</div>
                    </div>
                    {/* 建议 */}
                    <div className={FitnessAssessmentStyle['content-box']}>
                        <div className={FitnessAssessmentStyle['title']}>建议</div>
                        <div className={FitnessAssessmentStyle['content']}>
                            建议建议建议建议建议建议建议建议建议建议
                        </div>
                    </div>
                    {/* 体适能数据 */}
                    <div className={FitnessAssessmentStyle['content-box']}>
                        <div className={FitnessAssessmentStyle['title']}>体适能数据</div>
                        <div className={FitnessAssessmentStyle['content']}>
                            <div className={FitnessAssessmentStyle['data-item']}>
                                <div className={FitnessAssessmentStyle['top-box']}>
                                    <div className={FitnessAssessmentStyle['pb-title']}>体脂率（%）</div>
                                    <div className={FitnessAssessmentStyle['pb-tips']}>
                                        体脂率是指人体内脂肪重量在人体总体重中的占比
                                    </div>
                                </div>
                                <div className={FitnessAssessmentStyle['bottom-box']}>
                                    <div className={FitnessAssessmentStyle['level-title']}>卷腹（个）</div>
                                    <div className={FitnessAssessmentStyle['progress-block']}>
                                        <div className={FitnessAssessmentStyle['progress-item']}>
                                            <div className={FitnessAssessmentStyle['headbar']}></div>
                                            <div className={FitnessAssessmentStyle['text']}>
                                                <span className={FitnessAssessmentStyle['rang-start']}></span>
                                                <span
                                                    className={FitnessAssessmentStyle['cur-value']}
                                                    style={{ left: '15%' }}
                                                >
                                                    50
                                                </span>
                                                偏低
                                                <span className={FitnessAssessmentStyle['rang-end']}>29</span>
                                            </div>
                                        </div>
                                        <div className={FitnessAssessmentStyle['progress-item']}>
                                            <div className={FitnessAssessmentStyle['headbar']}></div>
                                            <div className={FitnessAssessmentStyle['text']}>
                                                <span className={FitnessAssessmentStyle['rang-start']}></span>
                                                <span
                                                    className={FitnessAssessmentStyle['cur-value']}
                                                    style={{ left: '15%' }}
                                                >
                                                    50
                                                </span>
                                                偏低
                                                <span className={FitnessAssessmentStyle['rang-end']}>29</span>
                                            </div>
                                        </div>
                                        <div className={FitnessAssessmentStyle['progress-item']}>
                                            <div
                                                className={`${FitnessAssessmentStyle['headbar']} ${FitnessAssessmentStyle['headbar-color-1']}`}
                                            ></div>
                                            <div
                                                className={`${FitnessAssessmentStyle['text']} ${FitnessAssessmentStyle['text-seleced-1']}`}
                                            >
                                                <span className={FitnessAssessmentStyle['rang-start']}></span>
                                                <span
                                                    className={`${FitnessAssessmentStyle['cur-value']} ${FitnessAssessmentStyle['cur-value-1']}`}
                                                    style={{ left: '15%' }}
                                                >
                                                    50
                                                </span>
                                                偏低
                                                <span className={FitnessAssessmentStyle['rang-end']}></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={FitnessAssessmentStyle['level-dec']}>你的腹部肌肉还不错哦~</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 教练card */}
                    <div className={FitnessAssessmentStyle['coach-warp-box']}>
                        <div className={FitnessAssessmentStyle['coach-img-box']}>
                            <img src='coachInfo.headPath' alt='头像' />
                        </div>
                        <div className={FitnessAssessmentStyle['coach-info-box']}>
                            <div className={FitnessAssessmentStyle['coach-name-tag']}>
                                <div className={FitnessAssessmentStyle['coach-name']}>教练名称</div>
                                <div className={FitnessAssessmentStyle['coach-tag']}>私人教练</div>
                            </div>
                            <div className={FitnessAssessmentStyle['coach-service']}>团课 已服务10人</div>
                        </div>
                        <div className={FitnessAssessmentStyle['coach-qrcode']}>
                            <div className={FitnessAssessmentStyle['coach-qrcode-img']}>
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
