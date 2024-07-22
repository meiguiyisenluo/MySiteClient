import React, { useCallback, useEffect, useRef } from 'react'
import styles from './index.module.scss'

import { random } from '@/utility/functions'

import useScreenSize from '@/hooks/useScreenSize'

let animationId = 0

const particleMsg = {
    radius: 2,
    backgroundColor: '#fff'
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

        // 点和点之间
        for (let i = 0; i < particles.current.length; i++) {
            for (let j = 0; j < particles.current.length; j++) {
                const a = particles.current[i]
                const b = particles.current[j]

                const dx = a.x - b.x
                const dy = a.y - b.y
                const dis = Math.sqrt(Math.abs(dx) ** 2 + Math.abs(dy) ** 2)

                // line
                canvasCtx.current?.beginPath()
                canvasCtx.current?.moveTo(a.x, a.y)
                canvasCtx.current?.lineTo(b.x, b.y)
                const alpha = Math.max((lineDistance.current - dis) / lineDistance.current, 0)
                canvasCtx.current!.globalAlpha = alpha
                canvasCtx.current!.strokeStyle = particleMsg.backgroundColor
                canvasCtx.current?.stroke()
                canvasCtx.current?.closePath()

                // act each other
                // const s1 = (lineDistance.current - Math.abs(dx)) / lineDistance.current / 100000
                // const s2 = (lineDistance.current - Math.abs(dy)) / lineDistance.current / 100000
            }
        }

        return (animationId = requestAnimationFrame(render))
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
                xspeed: 0.1,
                yspeed: 0.1
            })
        }
        render()

        return () => {
            particles.current = []
            cancelAnimationFrame(animationId)
        }
    }, [render])

    return (
        <div className={`page ${styles.container}`}>
            <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>
        </div>
    )
}

export const Component = ParticleJS
