import React, { useEffect, useRef } from 'react'
import UAParser from 'ua-parser-js'
import JSONFormatter from 'json-formatter-js'

const BrowserDetect: React.FC = () => {
    const result = useRef(new UAParser().getResult())
    const formatter = useRef(new JSONFormatter(result.current))

    const container = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        container.current?.appendChild(formatter.current.render())
        formatter.current.openAtDepth(2)

        let containerCurrent = container.current
        return () => {
            if (containerCurrent) containerCurrent.innerHTML = ''
            containerCurrent = null
        }
    })
    return <div ref={container}></div>
}

export default BrowserDetect
