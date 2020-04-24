import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('reportStore')
@observer
export default class FitnessAssessment extends Component<any, any> {
    render() {
        return <div>FitnessAssessment</div>
    }
}
