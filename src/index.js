import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { AppWrapper } from './context/state'
import { Web3Provider } from './context/web3connect'

ReactDOM.render(
    <React.StrictMode>
        <AppWrapper>
            <Web3Provider>
                <App />
            </Web3Provider>
        </AppWrapper>
    </React.StrictMode>,
    document.getElementById('root')
)
