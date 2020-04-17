// 完美围度
import React from 'react'
// import PropTypes from 'prop-types'
import FiancoContrast from '../fianco_contrast//fianco_contrast'
import { FiancoRules } from '../../../../types/components/fianco_contrast/fianco_contrast'

export default class PerfectGirth extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            fiancoData: []
        }
    }
    // 获取体侧数据
    getFiancoContrastData = () => {
        const fiancoData: FiancoRules[] = [
            {
                id: '1',
                times: '2020年04月08日',
                score: '54',
                selected: 0
            },
            {
                id: '2',
                times: '2021年04月08日',
                score: '54',
                selected: 0
            },
            {
                id: '3',
                times: '2020年04月08日',
                score: '54',
                selected: 0
            },
            {
                id: '4',
                times: '2020年04月08日',
                score: '54',
                selected: 0
            },
            {
                id: '5',
                times: '2020年04月08日',
                score: '54',
                selected: 0
            },
            {
                id: '6',
                times: '2020年04月08日',
                score: '54',
                selected: 0
            },
            {
                id: '7',
                times: '2020年04月08日',
                score: '54',
                selected: 0
            },
            {
                id: '8',
                times: '2020年04月08日',
                score: '54',
                selected: 0
            },
            {
                id: '9',
                times: '2020年04月08日',
                score: '54',
                selected: 0
            }
        ]
        this.setState({ fiancoData })
        // fetchPost('/community/cpDynamicList', {
        //     cpAreaId: '473f8abe917448d98d993d806bd37666',
        //     pageSize: 10
        // })
        //     .then(res => {
        //         this.setState()
        //         console.log(res)
        //     })
        //     .catch(res => {
        //         console.log(res)
        //     })
    }
    render() {
        return (
            <div>
                <div></div>
                <FiancoContrast fiancoArr={this.state.fiancoData}></FiancoContrast>
            </div>
        )
    }
    componentDidMount() {
        this.getFiancoContrastData()
    }
}
