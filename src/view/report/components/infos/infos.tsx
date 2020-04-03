import React from 'react'
import './infos.scss'
import { InfosRules } from '../../../../types/components/infos'

export default class Infos extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {}
    }
    static defaultProps = {
        params: {}
    }

    render() {
        return (
            <div className='Infos'>
                <div className='img'>
                    <img src={this.props.params.img} alt='' />
                </div>
                <div className='text'>
                    <div>
                        <div className='whiteColor fs18'>{this.props.params.name}</div>
                        <div className='grayColor fs15'>{this.props.params.sex === 0 ? '男' : 'nv'}</div>
                    </div>
                    <div className='grayColor fs15'>
                        <span>{this.props.params.birthday}</span>
                        <span>{this.props.params.height}</span>
                        <span>{this.props.params.weight}</span>
                    </div>
                </div>
            </div>
        )
    }
}
