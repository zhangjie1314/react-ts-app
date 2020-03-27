import React from 'react'
import { HashRouter, Route } from 'react-router-dom'

import Home from '../view/home/index'
import About from '../view/about/index'
import Report from '../view/report/index'

export default class Routes extends React.Component {
    render() {
        return (
            <HashRouter>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/report' component={Report} />
            </HashRouter>
        )
    }
}
