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

type Particle = { x: number; y: number; xd: boolean; yd: boolean; speed: number }

const ParticleJS: React.FC = () => {
    const { windowInnerWidth, windowInnerHeight } = useScreenSize()
    const lineDistance = useRef(0)

    const particles = useRef<Array<Particle>>([])
    const canvasRef = useRef<HTMLCanvasElement>(null!)
    const canvasCtx = useRef<CanvasRenderingContext2D | null>(null)

    const render = useCallback(() => {
        canvasCtx.current?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

        for (let i = 0; i < particles.current.length; i++) {
            const particle = particles.current[i]

            canvasCtx.current?.beginPath()
            canvasCtx.current?.arc(particle.x, particle.y, particleMsg.radius * devicePixelRatio, 0, 2 * Math.PI)
            canvasCtx.current!.fillStyle = particleMsg.backgroundColor
            canvasCtx.current?.fill()
            canvasCtx.current?.closePath()

            if (particle.xd) particle.x += particle.speed * devicePixelRatio
            else particle.x -= particle.speed * devicePixelRatio

            if (particle.yd) particle.y += particle.speed * devicePixelRatio
            else particle.y -= particle.speed * devicePixelRatio

            if (particle.x <= 0 + particleMsg.radius || particle.x >= canvasRef.current.width - particleMsg.radius) particle.xd = !particle.xd
            if (particle.y <= 0 + particleMsg.radius || particle.y >= canvasRef.current.height - particleMsg.radius) particle.yd = !particle.yd
        }

        for (let i = 0; i < particles.current.length; i++) {
            for (let j = 0; j < particles.current.length; j++) {
                const a = particles.current[i]
                const b = particles.current[j]
                const dis = calcDistance(a, b)
                if (dis < lineDistance.current) {
                    canvasCtx.current?.beginPath()
                    canvasCtx.current?.moveTo(a.x, a.y)
                    canvasCtx.current?.lineTo(b.x, b.y)
                    const alpha = (lineDistance.current - dis) / lineDistance.current
                    canvasCtx.current!.strokeStyle = `rgba(255, 255, 255, ${alpha})`
                    canvasCtx.current?.stroke()
                    canvasCtx.current?.closePath()
                }
            }
        }

        return requestAnimationFrame(render)
    }, [])

    useEffect(() => {
        canvasRef.current.width = windowInnerWidth * devicePixelRatio
        canvasRef.current.height = windowInnerHeight * devicePixelRatio
        lineDistance.current = Math.sqrt(canvasRef.current.width ** 2 + canvasRef.current.height ** 2) / 10
    }, [windowInnerWidth, windowInnerHeight])

    useEffect(() => {
        canvasCtx.current = canvasRef.current.getContext('2d')
    }, [])

    useEffect(() => {
        for (let i = 0; i < 50; i++) {
            particles.current.push({
                x: random(0, canvasRef.current.width),
                y: random(0, canvasRef.current.height),
                xd: Math.random() > 0.5,
                yd: Math.random() > 0.5,
                speed: random(0.14, 0.15)
            })
        }
        render()
    }, [render])

    return (
        <div className={`page ${styles.container}`}>
            <canvas ref={canvasRef} width={windowInnerWidth * devicePixelRatio} height={windowInnerHeight * devicePixelRatio}></canvas>
        </div>
    )
}

export const Component = ParticleJS
