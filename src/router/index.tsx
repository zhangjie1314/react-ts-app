import React from 'react'
import { HashRouter, Route } from 'react-router-dom'

import Nothing from '../view/nothing/index'
import Contrast from '../view/contrast/index'
import Report from '../view/report/index'

export default class Routes extends React.Component {
    render() {
        return (
            <HashRouter>
                <Route exact path='/contrast' component={Contrast} />
                <Route exact path='/report' component={Report} />
                <Route exact path='*' component={Nothing} />
            </HashRouter>
        )
    }
}
