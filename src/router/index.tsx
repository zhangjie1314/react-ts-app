import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import Nothing from '../view/nothing/index'
import Contrast from '../view/contrast/index'
import Report from '../view/report/index'

export default class Routes extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path='/contrast' component={Contrast} />
                    <Route path='/report' component={Report} />
                    <Route component={Nothing} />
                </Switch>
            </HashRouter>
        )
    }
}
