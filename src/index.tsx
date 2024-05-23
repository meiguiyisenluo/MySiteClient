console.log(`                          x   x x  x   xxxxx
xxx x               xx
  x                x
x
x                     x             x
x                      x          x
xx                                                                    xxx
x                      x      x                                   xxxx
x                                                               xxx x
x                       x                                    x x    x
x                       x  x                               xxx     x
x                        xx                               xx       x              xx
x                        x                              xx         x          xxxx xx
xx                         x                           x           x         x x    x
x                      xx  x                         x             x    xx x       xx
xx                          x                       xx              xxxxx          xx
x                    x       x                   xxx                 xx            x
xx                  x          xx              x                                   xx
x               xx x            xxxx xx   x x                                       x
xx          x x                                                                      x
xxx xx  x                                                                           xxx
                                                                  xxx
                                                                    xxx x
                                                                      xxx`)

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
