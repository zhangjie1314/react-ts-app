// 头部用户信息组件
import React from 'react'
import PropTypes from 'prop-types'
import InfoStyle from './index.module.scss'
import normel from '../../../assets/img/normal.png'
import male from '../../../assets/img/male.png'
import female from '../../../assets/img/female.png'

export default class UserInfo extends React.Component<any, any> {
    static defaultProps = {
        params: {},
    }
    static propTypes = {
        params: PropTypes.object,
    }
    handleName(str: string, gender: number) {
        let res = ''
        if (str && gender >= 0) {
            res = `${str.slice(0, 1)}${gender === 1 ? '男士' : '女士'}`
        } else {
            res = ''
        }
        return res
    }
    render() {
        const { params } = this.props
        return (
            <div className={InfoStyle.Infos}>
                <div className={InfoStyle.img}>
                    <img src={params.headPath ? params.headPath : normel} alt='头像' />
                </div>
                <div className={InfoStyle.text}>
                    <div className={InfoStyle.hd}>
                        <div className={`${InfoStyle.whiteColor} ${InfoStyle.fs36}`}>
                            {this.handleName(params.name, params.gender)}
                        </div>
                        <div className={`${InfoStyle.divSex}`}>
                            <img src={params.gender === 1 ? male : female} alt='性别' />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
