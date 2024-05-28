console.log(`L                         L
L                         LLL              LLLL                        LLLLLLLLL
L                           LLL          LLL                        LLLL
L                             LLL     LLLL                          L
L                               LL  LLL                              LL
L                                LLLL                                  LLLLLL
L                                  L                                        LLLL
L                                  L                                           L
LL       LLLLLLLL                  L                                           L
  LLLLLLL                          LL                                         LL
                                   LL                              LL      LLLL
                                   L                                LLLLLLLL
                                   L
                                   L`)

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
serviceWorker.unregister()

document.addEventListener('keydown', function (event) {
    if ((event.ctrlKey || event.metaKey) && (event.key === '+' || event.key === '-' || event.key === '0')) {
        event.preventDefault()
    }
})
document.addEventListener(
    'wheel',
    function (event) {
        if (event.ctrlKey) {
            event.preventDefault()
        }
    },
    { passive: false }
)
