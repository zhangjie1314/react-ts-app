import React from 'react'
import { ClassItemRules } from '../../../types/components/classItem'
import '../classItem/index.scss'
// import { BrowserRouter as Router, Route } from 'react-router-dom'

export default class ClassItem extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {}
    }
    static defaultProps: ClassItemRules = {
        name: '',
        price: 0
    }

    render() {
        return (
            <div className='classItem'>
                <div className='name'>{this.props.name}</div>
                <div className='price'>{this.props.price}</div>
            </div>
        )
    }
}
