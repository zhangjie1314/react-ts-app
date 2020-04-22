// 头部用户信息组件
import React from 'react'
import PropTypes from 'prop-types'
import InfoStyle from './index.module.scss'
import normel from '../../../assets/img/normal.png'
import male from '../../../assets/img/male.png'
import female from '../../../assets/img/female.png'

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
                    <img src={this.props.params.img ? this.props.params.img : normel} alt='' />
                </div>
                <div className={InfoStyle.text}>
                    <div className={InfoStyle.hd}>
                        <div className={`${InfoStyle.whiteColor} ${InfoStyle.fs36}`}>{this.props.params.name}</div>
                        <div className={`${InfoStyle.divSex}`}>
                            <img src={this.props.params.sex === 0 ? male : female} alt='' />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
