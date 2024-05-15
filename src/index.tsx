import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import * as serviceWorker from './serviceWorker'

import { csrftoken } from '@/resources/api-constants'
import { SESSION_STORAGE } from '@/resources/constants'

const container = document.getElementById('root')
if (container) {
    csrftoken()
        .then((res) => {
            window.sessionStorage.setItem(SESSION_STORAGE.csrftoken, res.data.csrfToken)
        })
        .catch(console.error)
        .finally(() => {
            const root = createRoot(container) // createRoot(container!) if you use TypeScript
            root.render(<App />)
        })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
