import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DataItemStyle from './index.module.scss'

export default class DataItem extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {}
    }
    static defaultProps = {
        dataItem: {},
        level: '',
        from: '',
        isShare: 0,
        onClick: () => {},
    }
    static propType = {
        dataItem: PropTypes.object,
        level: PropTypes.string,
        from: PropTypes.string,
        isShare: PropTypes.number,
        onClick: PropTypes.func,
    }
    render() {
        const { dataItem, level, from, isShare, onClick } = this.props
        return (
            <div className={DataItemStyle['data-item']} onClick={onClick}>
                <div className={DataItemStyle['item-top-box']}>
                    <div className={DataItemStyle['itb-title']}>{dataItem.partName}</div>
                    <div className={DataItemStyle['itb-inline-box']}>
                        {dataItem.photoImg ? (
                            <img className={DataItemStyle['comp-img']} src={dataItem.photoImg} alt='原图' />
                        ) : null}
                        <img className={DataItemStyle['comp-img']} src={dataItem.img} alt='标准图' />
                        <div className={DataItemStyle['itb-data-box']}>
                            <div className={DataItemStyle['itbd-line']}>
                                <div
                                    className={`${DataItemStyle['il-item']} ${
                                        level === '正常' ? DataItemStyle['il-selected-zc'] : ''
                                    }`}
                                >
                                    <div className={DataItemStyle['ii-line']}>
                                        {level === '正常' ? (
                                            <div className={DataItemStyle['ii-cur-val']}>{dataItem.angle}</div>
                                        ) : null}
                                    </div>
                                    <div className={DataItemStyle['ii-txt']}>正常</div>
                                </div>
                                <div
                                    className={`${DataItemStyle['il-item']} ${
                                        level === '轻微' ? DataItemStyle['il-selected-qw'] : ''
                                    }`}
                                >
                                    <div className={DataItemStyle['ii-line']}>
                                        {level === '轻微' ? (
                                            <div className={DataItemStyle['ii-cur-val']}>{dataItem.angle}</div>
                                        ) : null}
                                    </div>
                                    <div className={DataItemStyle['ii-txt']}>轻微</div>
                                </div>
                                <div
                                    className={`${DataItemStyle['il-item']} ${
                                        level === '中度' ? DataItemStyle['il-selected-zdu'] : ''
                                    }`}
                                >
                                    <div className={DataItemStyle['ii-line']}>
                                        {level === '中度' ? (
                                            <div className={DataItemStyle['ii-cur-val']}>{dataItem.angle}</div>
                                        ) : null}
                                    </div>
                                    <div className={DataItemStyle['ii-txt']}>中度</div>
                                </div>
                                <div
                                    className={`${DataItemStyle['il-item']} ${
                                        level === '重度' ? DataItemStyle['il-selected-zd'] : ''
                                    }`}
                                >
                                    <div className={DataItemStyle['ii-line']}>
                                        {level === '重度' ? (
                                            <div className={DataItemStyle['ii-cur-val']}>{dataItem.angle}</div>
                                        ) : null}
                                    </div>
                                    <div className={DataItemStyle['ii-txt']}>重度</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {from === 'list' ? (
                    <div
                        className={`${DataItemStyle['item-bottom-box']} ${
                            isShare === 1 ? '' : DataItemStyle['show-two-line']
                        }`}
                    >
                        {dataItem.description}
                    </div>
                ) : null}
            </div>
        )
    }
}
