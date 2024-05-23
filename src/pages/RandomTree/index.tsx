import React, { useEffect, useRef, useCallback } from 'react'
import { Button } from 'react-vant'
import styles from './index.module.scss'

const RandomTree: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null!)
    const ctx = useRef<CanvasRenderingContext2D>(null!)

    // 绘制树枝
    const drawBranch = useCallback((v0: [number, number], len: number, thick: number, angle: number) => {
        // if (thick < 3 && Math.random() < 0.3) return
        if (thick < 2) {
            ctx.current.arc(...v0, 10, 0, 2 * Math.PI)
            ctx.current.fillStyle = `#eee`
            ctx.current.fill()
            ctx.current.closePath()
            return
        }

        const v1: [number, number] = [v0[0] + len * Math.cos((angle / 180) * Math.PI), v0[1] + len * Math.sin((angle / 180) * Math.PI)]
        ctx.current.beginPath()
        ctx.current.moveTo(...v0)
        ctx.current.lineTo(...v1)
        ctx.current.strokeStyle = '#333'
        ctx.current.lineWidth = thick
        ctx.current.stroke()

        drawBranch(v1, len * (Math.random() * 0.05 + 0.75), thick * 0.75, angle + Math.random() * 30)
        drawBranch(v1, len * (Math.random() * 0.05 + 0.75), thick * 0.75, angle - Math.random() * 30)
    }, [])

    // 绘制背景
    const drawBgc = () => {
        ctx.current.beginPath()
        ctx.current.fillStyle = 'rgb(147,181,173)'
        ctx.current.arc(0, canvasRef.current.height / 2, canvasRef.current.height / 2.5, 0, 2 * Math.PI)
        ctx.current.fill()
        ctx.current.closePath()

        // 设置组合模式为 "source-in" 以保留交集部分
        ctx.current.globalCompositeOperation = 'source-atop'
        ctx.current.beginPath()
        ctx.current.fillStyle = 'rgb(37,77,68)'
        ctx.current.arc(0, -canvasRef.current.height / 6, canvasRef.current.height / 2, 0 * Math.PI, 2 * Math.PI)
        ctx.current.fill()
        ctx.current.closePath()

        ctx.current.globalCompositeOperation = 'destination-over'
        ctx.current.beginPath()
        ctx.current.fillStyle = 'rgb(255, 249, 233)'
        ctx.current.fillRect(-canvasRef.current.width / 2, 0, canvasRef.current.width, canvasRef.current.height)
        ctx.current.closePath()

        // 恢复默认的组合模式
        ctx.current.globalCompositeOperation = 'source-over'
    }

    // 重绘
    const reGrow = useCallback(() => {
        ctx.current.clearRect(-canvasRef.current.width / 2, 0, canvasRef.current.width, canvasRef.current.height)
        drawBgc()
        drawBranch([0, canvasRef.current.height / 4], 200, 20, 90)
    }, [drawBranch])

    // 初始化
    const init = () => {
        // 分辨率
        canvasRef.current.width = window.innerWidth * devicePixelRatio
        canvasRef.current.height = window.innerHeight * devicePixelRatio
        // 坐标轴
        ctx.current?.translate(canvasRef.current.width / 2, canvasRef.current.height)
        ctx.current?.scale(1, -1)
    }

    const onResize = useCallback(() => {
        init()
        reGrow()
    }, [reGrow])

    useEffect(() => {
        ctx.current = canvasRef.current.getContext('2d')!
        init()
        drawBgc()
        drawBranch([0, canvasRef.current.height / 4], 200, 20, 90)
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [drawBranch, onResize])
    return (
        <div className={`page ${styles.container}`}>
            <Button onClick={reGrow}>reGrow</Button>
            <canvas ref={canvasRef}></canvas>
        </div>
    )
}

export const Component = RandomTree
