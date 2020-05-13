// 体测对比
import React from 'react'
import { withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import FCStyle from './index.module.scss'
import { Toast } from 'antd-mobile'
// import PropTypes from 'prop-types'
import { delFiancoContrast } from '@apis/report/bapp'
import { FiancoRules } from '@ctypes/components/fianco_contrast'

@inject('reportStore')
@observer
class FiancoContrast extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            isShow: false,
            fiancoArr: [],
            selected: [],
        }
    }
    static defaultProps = {
        // fiancoArr: []
    }
    static propType = {
        // fiancoArr: PropTypes.array
    }
    // 操作体侧对比
    handleDialogFn = () => {
        let isShow = this.state.isShow
        if (isShow) {
        }
        this.setState({
            isShow: !isShow,
        })
    }
    // 选中
    selectFn(e: any, idx: number) {
        let { selected } = this.state
        if (selected.indexOf(idx) === -1) {
            selected.push(idx)
            if (selected.length > 2) selected.shift()
        } else {
            selected.splice(selected.indexOf(idx), 1)
        }
        this.setState({ selected })
    }
    // 删除
    removeFn() {
        const { fiancoArr, selected } = this.state
        let arr: any[] = []
        selected.forEach((el: any, idx: number) => {
            arr.push(fiancoArr[el])
        })
        if (arr.length === 1) {
            delFiancoContrast({
                types: arr[0].type,
                id: arr[0].id,
            }).then((res) => {
                if (res.code !== 0) return
                // 处理本地数据
                Toast.info(`删除成功！`, 2)
                window.location.reload()
            })
        } else {
            Toast.info(`请勾选一项数据进行操作`, 1.5)
        }
    }
    // 开始对比
    beginContrast() {
        const { fiancoArr, selected } = this.state
        let arr: any[] = []
        selected.forEach((el: any, idx: number) => {
            arr.push(fiancoArr[el])
        })
        if (arr.length === 2) {
            this.props.history.push({
                pathname: `/contrast/${this.props.reportStore.tabsId}${this.props.location.search}&id1=${arr[0].id}&id2=${arr[1].id}`,
            })
        } else {
            Toast.info(`请勾选两项数据进行操作`, 1.5)
        }
    }
    // 页面渲染之前 将父的props传个子的state
    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        return {
            fiancoArr: nextProps.fiancoArr,
        }
    }

    render() {
        let lg: number = this.state.fiancoArr.length
        let arr: FiancoRules[] = this.state.fiancoArr
        let { selected } = this.state
        let times = arr.length > 0 ? arr[lg - 1].times : ''
        return (
            <div className={FCStyle.App}>
                <div className={FCStyle.head}>
                    <div className={FCStyle.text}>
                        <p>{`最近体测时间：${times}；`}</p>
                        <p>{`共${lg}次体测`}</p>
                    </div>
                    <div className={FCStyle.btn} onClick={this.handleDialogFn}>
                        体测对比
                    </div>
                </div>
                <div
                    className={`${FCStyle.dialogMask}  ${this.state.isShow ? FCStyle.isShow : ''}`}
                    onClick={this.handleDialogFn}
                ></div>
                <div className={`${FCStyle.dialogContent} ${this.state.isShow ? FCStyle.upward : FCStyle.downward}`}>
                    <div className={FCStyle.hd}>
                        <span>{`选择对比的体侧数据（限${lg}组）`}</span>
                        <span className={FCStyle.closeBtn} onClick={this.handleDialogFn}>
                            x
                        </span>
                    </div>
                    <div className={FCStyle.bd}>
                        {this.state.fiancoArr.map((itm: FiancoRules, idx: number) => {
                            return (
                                <div key={idx} className={FCStyle.itm}>
                                    <div>{itm.times}</div>
                                    <div>
                                        体侧：<span className={FCStyle.fs40}>{itm.score}</span>分
                                    </div>
                                    <input
                                        onChange={(e) => this.selectFn(e, idx)}
                                        className={FCStyle.checkboxs}
                                        type='checkbox'
                                        checked={selected.indexOf(idx) !== -1 ? true : false}
                                    />
                                </div>
                            )
                        })}
                        <div className={FCStyle.empBlock}></div>
                    </div>
                    <div className={FCStyle.footer}>
                        <div className={FCStyle.remove} onClick={this.removeFn.bind(this)}>
                            删除
                        </div>
                        <div className={FCStyle.confirm} onClick={this.beginContrast.bind(this)}>
                            开始对比
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(FiancoContrast)
