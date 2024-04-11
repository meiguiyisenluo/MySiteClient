import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { ConfigProvider } from 'react-vant'

const container = document.getElementById('root')
if (container) {
    const root = createRoot(container) // createRoot(container!) if you use TypeScript
    root.render(
        <ConfigProvider style={{ width: '100%', height: '100%' }}>
            <App />
        </ConfigProvider>
    )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
