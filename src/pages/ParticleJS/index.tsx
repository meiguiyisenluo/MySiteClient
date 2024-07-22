import React, { useCallback, useEffect, useRef } from 'react'
import styles from './index.module.scss'

import { random } from '@/utility/functions'

import useScreenSize from '@/hooks/useScreenSize'

const particleMsg = {
    radius: 2,
    backgroundColor: '#fff'
}

const calcDistance = (a: Particle, b: Particle) => {
    const d1 = Math.abs(a.x - b.x)
    const d2 = Math.abs(a.y - b.y)
    return Math.sqrt(d1 ** 2 + d2 ** 2)
}

type Particle = { x: number; y: number; xdirection: boolean; ydirection: boolean; xspeed: number; yspeed: number }

const ParticleJS: React.FC = () => {
    const { windowInnerWidth, windowInnerHeight } = useScreenSize()
    const lineDistance = useRef(0)

    const canvasWidth = windowInnerWidth * devicePixelRatio
    const canvasHeight = windowInnerHeight * devicePixelRatio
    lineDistance.current = Math.sqrt(canvasWidth ** 2 + canvasHeight ** 2) / 10

    const particles = useRef<Array<Particle>>([])
    const canvasRef = useRef<HTMLCanvasElement>(null!)
    const canvasCtx = useRef<CanvasRenderingContext2D | null>(null)

    const render = useCallback(() => {
        canvasCtx.current?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

        // 点
        for (let i = 0; i < particles.current.length; i++) {
            const particle = particles.current[i]

            canvasCtx.current?.beginPath()
            canvasCtx.current?.arc(particle.x, particle.y, particleMsg.radius * devicePixelRatio, 0, 2 * Math.PI)
            canvasCtx.current!.fillStyle = particleMsg.backgroundColor
            canvasCtx.current?.fill()
            canvasCtx.current?.closePath()

            // 边界
            if (particle.xdirection) particle.x += particle.xspeed * devicePixelRatio
            else particle.x -= particle.xspeed * devicePixelRatio

            if (particle.ydirection) particle.y += particle.yspeed * devicePixelRatio
            else particle.y -= particle.yspeed * devicePixelRatio

            if (particle.x <= 0 + particleMsg.radius) particle.xdirection = true
            if (particle.x >= canvasRef.current.width - particleMsg.radius) particle.xdirection = false

            if (particle.y <= 0 + particleMsg.radius) particle.ydirection = true
            if (particle.y >= canvasRef.current.height - particleMsg.radius) particle.ydirection = false
        }

        // 线
        for (let i = 0; i < particles.current.length; i++) {
            for (let j = 0; j < particles.current.length; j++) {
                const a = particles.current[i]
                const b = particles.current[j]
                const dis = calcDistance(a, b)
                // 一定距离内才连线
                if (dis < lineDistance.current) {
                    canvasCtx.current?.beginPath()
                    canvasCtx.current?.moveTo(a.x, a.y)
                    canvasCtx.current?.lineTo(b.x, b.y)
                    const alpha = (lineDistance.current - dis) / lineDistance.current
                    canvasCtx.current!.globalAlpha = alpha
                    canvasCtx.current!.strokeStyle = particleMsg.backgroundColor
                    canvasCtx.current?.stroke()
                    canvasCtx.current?.closePath()
                }
            }
        }

        return requestAnimationFrame(render)
    }, [])

    useEffect(() => {
        canvasCtx.current = canvasRef.current.getContext('2d')
    }, [])

    // 造数据 & 开始动画
    useEffect(() => {
        for (let i = 0; i < 80; i++) {
            particles.current.push({
                x: random(0, canvasRef.current.width),
                y: random(0, canvasRef.current.height),
                xdirection: Math.random() > 0.5,
                ydirection: Math.random() > 0.5,
                xspeed: random(0.2, 0.25),
                yspeed: random(0.2, 0.25)
            })
        }
        render()

        return () => {
            particles.current = []
        }
    }, [render])

    return (
        <div className={`page ${styles.container}`}>
            <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>
        </div>
    )
}

export const Component = ParticleJS
