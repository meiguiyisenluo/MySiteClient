import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'

const TestPage: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null!)
    const ctx = useRef<CanvasRenderingContext2D>(null!)

    useEffect(() => {
        canvasRef.current.width = window.innerWidth * devicePixelRatio
        canvasRef.current.height = window.innerHeight * devicePixelRatio
        ctx.current = canvasRef.current.getContext('2d')!

        ctx.current.fillStyle = 'red'
        ctx.current.fillRect(10, 10, 500, 500)

        ctx.current.globalCompositeOperation = 'source-atop'

        ctx.current.fillStyle = 'blue'
        ctx.current.fillRect(400, 400, 500, 500)

        ctx.current.globalCompositeOperation = 'destination-over'

        ctx.current.fillStyle = 'orange'
        ctx.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)

        ctx.current.globalCompositeOperation = 'source-over'

    }, [])
    return (
        <div className={`page ${styles.container}`}>
            <canvas ref={canvasRef}></canvas>
        </div>
    )
}

export const Component = TestPage
