// 头部用户信息组件
import React from 'react'
import PropTypes from 'prop-types'
import InfoStyle from './index.module.scss'

export default class UserInfo extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {}
    }
    static defaultProps = {
        params: {}
    }
    static propTypes = {
        params: PropTypes.object
    }

    render() {
        return (
            <div className={InfoStyle.Infos}>
                <div className={InfoStyle.img}>
                    <img src={this.props.params.img} alt='' />
                </div>
                <div className={InfoStyle.text}>
                    <div className={`${InfoStyle.flex} ${InfoStyle.hd}`}>
                        <div className={`${InfoStyle.whiteColor} ${InfoStyle.fs36}`}>{this.props.params.name}</div>
                        <div className={`${InfoStyle.grayColor} ${InfoStyle.fs15} ${InfoStyle.divSex}`}>
                            {this.props.params.sex === 0 ? '男' : 'nv'}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
