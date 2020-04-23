import React from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import Nothing from '../view/nothing/index'
import Contrast from '../view/contrast/index'
import Report from '../view/report/index'

export default class Routes extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path='/contrast/:type' component={Contrast} />
                    <Route exact path='/report/:type' component={Report} />
                    <Route exact component={Nothing} />
                </Switch>
            </HashRouter>
        )
    }
}
