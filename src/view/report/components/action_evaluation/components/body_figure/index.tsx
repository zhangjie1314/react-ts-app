// 人体图组件
import React, { Component } from 'react'
import BfStyle from './index.module.scss'
import frontImg from '../../../../../../assets/img/front3.0.png'
import backImg from '../../../../../../assets/img/back3.0.png'
interface fblObjType {
    num?: number
    pj?: string
    bmi?: string
    jb?: number
    photo?: string
}
export default class BodyFigure extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            chartData: [],
            fiancoData: [],
            fblObj: {},
        }
    }

    render() {
        return (
            <div className={BfStyle.figureBox}>
                <div className={`${BfStyle.front} ${BfStyle.modules}`}>
                    <div className={BfStyle.figureImg}>
                        <img src={frontImg} alt='人体图前' />
                    </div>
                </div>
                <div className={`${BfStyle.back} ${BfStyle.modules}`}>
                    <div className={BfStyle.figureImg}>
                        <img src={backImg} alt='人体图后' />
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount() {}
}
