// 人体成分
import React, { Component } from 'react'
import { PhotoProvider, PhotoConsumer } from 'react-photo-view'
import 'react-photo-view/dist/index.css'
import { observer, inject } from 'mobx-react'
import _ from 'lodash'
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
            id1: '',
            id2: '',
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
        id1: '',
        id2: '',
    }
    static propType = {
        id1: PropTypes.string,
        id2: PropTypes.string,
    }

    // 计算两天相差天数
    private dateDiff(date1: any, date2: any) {
        let firstDate = new Date(date1.replace(/-/g, '/'))
        let secondDate = new Date(date2.replace(/-/g, '/'))
        let diff = Math.abs(firstDate.getTime() - secondDate.getTime())
        let result = parseInt(String(diff / (1000 * 60 * 60 * 24)), 10)
        return result
    }

    static getDerivedStateFromProps(nextProps: any) {
        return {
            id1: nextProps.id1,
            id2: nextProps.id2,
        }
    }
    componentDidUpdate(prevProps: any, prevState: any) {
        if (_.isEqual(prevState.id1, this.state.id1)) {
            this.getData()
        }
    }

    // 获取数据
    async getData() {
        const data1 = await getBodyCompositionResult({
            rtcfId: this.state.id1,
        })
        const data2 = await getBodyCompositionResult({
            rtcfId: this.state.id2,
        })
        this.handleData(data1, data2)

        // getBodyCompositionResult({
        //     rtcfId: item.id,
        // }).then((res: any) => {
        //     const { isFromStudio } = this.props.reportStore
        //     res.data.url1 = handleHandImg(res.data.url1, isFromStudio)
        //     res.data.url2 = handleHandImg(res.data.url2, isFromStudio)
        //     res.data.url3 = handleHandImg(res.data.url3, isFromStudio)
        //     this.setState({
        //         bodyCompositionData: res.data,
        //     })
        // })
    }

    // 处理数据
    handleData(data1: any, data2: any) {
        console.log(data1, data2)
        const res1 = data1.data
        const res2 = data2.data
        let { daysBetweenTwo } = this.state
        daysBetweenTwo = this.dateDiff(res1.createTime, res2.createTime) // 计算天数
        this.setState({ daysBetweenTwo })
    }
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
