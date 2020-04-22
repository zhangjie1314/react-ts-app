// 404页面
import React from 'react'
import { withRouter } from 'react-router-dom'

import NothingStyle from './index.module.scss'

class Nothing extends React.Component<any, any> {
    render() {
        return <div className={NothingStyle.App}>404</div>
    }
}

export default withRouter(Nothing)
