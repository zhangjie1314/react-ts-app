// 对比结果页面
import React from 'react'
import { withRouter } from 'react-router-dom'

import ContrastStyle from './index.module.scss'

class Contrast extends React.Component<any, any> {
    render() {
        return <div className={ContrastStyle.App}>contrast</div>
    }
}

export default withRouter(Contrast)
