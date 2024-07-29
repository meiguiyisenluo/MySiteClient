import React, { useCallback, useEffect, useRef, useState } from 'react'

import styles from './index.module.scss'

import useScreenSize from '@/hooks/useScreenSize'

const treeMsg = {
    growStep: 0.5
}

const RandomTree2: React.FC = () => {
    const animationId = useRef(0)
    const now = useRef(Date.now())
    const fc = useRef(0)
    const [fps, setFps] = useState(60)

    const canvasRef = useRef<HTMLCanvasElement>(null!)
    const canvasCtx = useRef<CanvasRenderingContext2D | null>(null)

    const { windowInnerWidth, windowInnerHeight } = useScreenSize()

    const canvasWidth = windowInnerWidth * devicePixelRatio
    const canvasHeight = windowInnerHeight * devicePixelRatio

    const tree = useRef([100])

    const render = useCallback(() => {
        const newnow = Date.now()
        fc.current += 1
        if (newnow - now.current >= 1000) {
            now.current = newnow
            setFps(fc.current)
            fc.current = 0
        }

        canvasCtx.current?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

        // canvasCtx.current?.moveTo(0, 0)
        // canvasCtx.current?.lineTo(0, canvasRef.current.height / 2)
        // canvasCtx.current!.strokeStyle = '#fff'
        // canvasCtx.current!.lineWidth = 5
        // canvasCtx.current?.stroke()

        for (let i = 0; i < tree.current.length; i++) {
            const w = tree.current[i]
            const h = treeMsg.growStep
            const x = -(w / 2)
            const y = i * treeMsg.growStep

            canvasCtx.current?.beginPath()
            canvasCtx.current?.moveTo(x, y)
            canvasCtx.current!.fillStyle = '#fff'
            canvasCtx.current?.fillRect(x, y, w, h)
            canvasCtx.current?.closePath()
        }

        if (tree.current[tree.current.length - 1] > tree.current[0] / 3) tree.current.push(tree.current[tree.current.length - 1] - 0.01)

        return (animationId.current = requestAnimationFrame(render))
    }, [])

    useEffect(() => {
        canvasCtx.current = canvasRef.current.getContext('2d')
        // 坐标轴
        canvasCtx.current?.translate(canvasRef.current.width / 2, canvasRef.current.height)
        canvasCtx.current?.scale(1, -1)
    }, [])

    useEffect(() => {
        render()
        return () => {
            cancelAnimationFrame(animationId.current)
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
