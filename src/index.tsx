import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import stores from './store'
import Routes from './router/index'
import './index.css'
import * as serviceWorker from './serviceWorker'

import 'lib-flexible'

ReactDOM.render(
    <Provider {...stores}>
        <Routes />
    </Provider>,
    document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
