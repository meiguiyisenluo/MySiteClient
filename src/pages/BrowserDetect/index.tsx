import React, { useEffect, useRef } from 'react'
import JSONFormatter from 'json-formatter-js'
import { useAppSelector } from '@/store/reducers/store'

const BrowserDetect: React.FC = () => {
    const browserInfo = useAppSelector((state) => state.data.browserInfo)
    const container = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const formatter = new JSONFormatter(browserInfo)
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
