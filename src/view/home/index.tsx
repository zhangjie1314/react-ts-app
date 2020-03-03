import React from 'react'
import { fetchPost } from '../../utils/request'
import logo from '../../logo.svg'
import './index.scss'

export default class Home extends React.Component {
    handleClick = () => {
        fetchPost('/community/cpDynamicList', {
            cpAreaId: '473f8abe917448d98d993d806bd37666',
            pageSize: 10,
        })
            .then(res => {
                console.log(res)
            })
            .catch(res => {
                console.log(res)
            })
    }
    render() {
        return (
            <div className='App'>
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='logo' />
                    <p onClick={this.handleClick}>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
                        Learn React
                    </a>
                </header>
            </div>
        )
    }
}
