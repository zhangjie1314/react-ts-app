import React from 'react'
import { HashRouter, Route } from 'react-router-dom'

import Home from '../view/home/index'
import About from '../view/about/index'

export default class Routes extends React.Component {
    render() {
        return (
            <HashRouter>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
            </HashRouter>
        )
    }
}
