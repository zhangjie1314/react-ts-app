import React from 'react'
import logo from '../../logo.svg'
import './index.scss'
import { NavLink } from 'react-router-dom'
function About() {
    return (
        <div className='App'>
            <NavLink
                to='/about'
                activeStyle={{
                    fontWeight: 'bold',
                    color: 'green'
                }}
            >
                11111111111
            </NavLink>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
                    Learn React
                </a>
            </header>
        </div>
    )
}

export default About
