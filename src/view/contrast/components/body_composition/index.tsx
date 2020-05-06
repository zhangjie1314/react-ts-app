// 人体成分
import React, { Component } from 'react'
import { PhotoProvider, PhotoConsumer } from 'react-photo-view'
import 'react-photo-view/dist/index.css'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import { callAppMenthd, callAppShareImgMenthd, handleHandImg } from '@utils/index'
import { getBodyCompositionResult } from '@apis/report/bapp'

import BCStyle from './index.module.scss'

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
            daysBetweenTwo: 0, // 两次间隔天数
            weightChange: 0, // 体重变化
            fatChange: 0, // 脂肪变化
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
    // 计算两天相差天数
    private dateDiff(date1: any, date2: any) {
        let firstDate = new Date(date1.replace(/-/g, '/'))
        let secondDate = new Date(date2.replace(/-/g, '/'))
        let diff = Math.abs(firstDate.getTime() - secondDate.getTime())
        let result = parseInt(String(diff / (1000 * 60 * 60 * 24)), 10)
        return result
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
    componentDidUpdate(prevProps: any, prevState: any) {}

    render() {
        const { daysBetweenTwo, weightChange, fatChange } = this.state
        return (
            <div className={BCStyle.wrapper}>
                <div className={BCStyle.headText}>
                    <div className={BCStyle.item}>
                        <div className={BCStyle.num}>{daysBetweenTwo}</div>
                        <div>天数</div>
                    </div>
                    <div className={BCStyle.item}>
                        <div className={BCStyle.num}>{weightChange}</div>
                        <div>体重变化</div>
                    </div>
                    <div className={BCStyle.item}>
                        <div className={BCStyle.num}>{fatChange}</div>
                        <div>脂肪变化</div>
                    </div>
                </div>
            </div>
        )
    }
}
