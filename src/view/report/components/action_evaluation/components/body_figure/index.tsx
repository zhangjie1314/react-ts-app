// 动作评估
import React, { Component } from 'react'
import BfStyle from './index.module.scss'

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
            tabs: [
                {
                    txt: '过度激活',
                    num: 0,
                },
                {
                    txt: '激活不足',
                    num: 0,
                },
                {
                    txt: '指令混乱',
                    num: 0,
                },
            ],
            fblObj: {},
        }
    }

    render() {
        return <div>1111</div>
    }
    componentDidMount() {}
}
