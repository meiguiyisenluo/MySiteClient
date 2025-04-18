import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
// import * as serviceWorker from './serviceWorker'

import { csrftoken } from '@/resources/api-constants'
import { SESSION_STORAGE } from '@/resources/constants'

import { isDebug } from '@/utility/env'

// import { report } from '@/resources/api-constants'

// eslint-disable-next-line @typescript-eslint/no-empty-function
if (!isDebug) console.log = () => {}

// report({ event: 'total_pv' })

const container = document.getElementById('root')
if (container) {
    csrftoken()
        .then((res) => {
            window.sessionStorage.setItem(SESSION_STORAGE.csrftoken, res.data.csrfToken)
        })
        .catch(console.error)
        .finally(() => {
            const root = createRoot(container) // createRoot(container!) if you use TypeScript
            root.render(
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            )
        })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register()

// document.addEventListener('keydown', function (event) {
//     if ((event.ctrlKey || event.metaKey) && (event.key === '+' || event.key === '-' || event.key === '0')) {
//         event.preventDefault()
//     }
// })
// document.addEventListener(
//     'wheel',
//     function (event) {
//         if (event.ctrlKey) {
//             event.preventDefault()
//         }
//     },
//     { passive: false }
// )

window._githubSrc = 'https://github.com/meiguiyisenluo/MySiteClient'
// if (window.Notification) {
//     Notification.requestPermission().then(function (permission) {
//         if (permission === 'granted') {
//             const notification = new Notification('Hi!', {
//                 body: 'This code is open source in ' + window._githubSrc
//             })
//             notification.addEventListener('click', () => {
//                 window.open(window._githubSrc)
//             })
//         }
//     })
// }
