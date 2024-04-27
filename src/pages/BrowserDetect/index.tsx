import React, { useEffect, useRef } from 'react'
import UAParser from 'ua-parser-js'
import JSONFormatter from 'json-formatter-js'

const result = new UAParser().getResult()
const formatter = new JSONFormatter(result)

const BrowserDetect: React.FC = () => {
    const container = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        container.current?.appendChild(formatter.render())
        formatter.openAtDepth(2)

        let containerCurrent = container.current
        return () => {
            if (containerCurrent) containerCurrent.innerHTML = ''
            containerCurrent = null
        }
    })
    return <div ref={container}></div>
}

export default BrowserDetect
