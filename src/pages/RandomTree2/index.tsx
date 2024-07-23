import React, { useCallback, useEffect, useRef, useState } from 'react'

import styles from './index.module.scss'

import useScreenSize from '@/hooks/useScreenSize'

let animationId = 0

const RandomTree2: React.FC = () => {
    const now = useRef(Date.now())
    const fc = useRef(0)
    const [fps, setFps] = useState(60)

    const canvasRef = useRef<HTMLCanvasElement>(null!)

    const { windowInnerWidth, windowInnerHeight } = useScreenSize()

    const canvasWidth = windowInnerWidth * devicePixelRatio
    const canvasHeight = windowInnerHeight * devicePixelRatio

    const render = useCallback(() => {
        const newnow = Date.now()
        fc.current += 1
        if (newnow - now.current >= 1000) {
            now.current = newnow
            setFps(fc.current)
            fc.current = 0
        }
        return (animationId = requestAnimationFrame(render))
    }, [])

    useEffect(() => {
        render()
        return () => {
            cancelAnimationFrame(animationId)
        }
    }, [render])

    return (
        <div className={`page ${styles.container}`}>
            <div style={{ position: 'fixed', right: '0', top: '0', color: '#fff' }}>fps: {fps}</div>
            <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>
        </div>
    )
}

export const Component = RandomTree2
