import React, { useEffect, useRef, useState } from 'react'
import { PauseCircleO, PlayCircleO } from '@react-vant/icons'

import styles from './index.module.scss'
import lyric from './nitingdedao.lrc'

// console.log(
//     lyric.map((_) => {
//         const arr = _.time.split(':').map(Number).reverse()
//         let step = 1
//         const timestamp = arr.reduce((total, _) => {
//             const res = total + _ * step
//             step *= 60
//             return res
//         }, 0)
//         return {
//             ..._,
//             timestamp: timestamp - 3
//         }
//     })
// )

import RatioWBox from '@/components/RatioWBox.tsx'

const srcObj = {
    audioSrc: '/share/music/Jay/03.mp3',
    audioUrl: 'https://luoyisen.com/share/music/Jay/03.mp3',
    imgUrl: 'https://luoyisen.com/share/imgs/JayChou%40.1/6.png',
    name: '你听得到',
    author: '周杰伦',
    sign: 'J A Y'
}

const Nitingdedao: React.FC = () => {
    const [playing, setPlaying] = useState<boolean>(false)

    const [lrcIdx, setLrcIdx] = useState<number>(0)

    const [currentTime, setCurrentTime] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)

    const audioRef = useRef<HTMLAudioElement>(null!)
    const canvasRef = useRef<HTMLCanvasElement>(null!)
    const ctx = useRef<CanvasRenderingContext2D>(null!)

    // 音频分析
    const analyser = useRef<AnalyserNode>(null!)
    const buffer = useRef<Uint8Array>(null!)

    const animationId = useRef<number | undefined>(undefined)
    const update = () => {
        if (animationId.current) cancelAnimationFrame(animationId.current)
        animationId.current = requestAnimationFrame(update)
        if (!analyser.current) return
        if (!buffer.current) return
        analyser.current.getByteFrequencyData(buffer.current)
        const offset = buffer.current.length
        const datas = new Array(offset)
        for (let i = 0; i < offset; i++) {
            datas[i] = buffer.current[i]
        }
        draw(datas)
    }

    const togglePlaying = () => {
        if (playing) audioRef.current.pause()
        else audioRef.current.play()
    }

    const onTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime)
        setDuration(audioRef.current.duration)
        if (audioRef.current.currentTime > (lyric[lrcIdx + 1]?.timestamp ?? 9999)) {
            setLrcIdx(lrcIdx + 1)
        }
        // 切歌 或 单曲循环第二次开始播放
        else if (audioRef.current.currentTime < 1) {
            setLrcIdx(0)
        }
    }

    const draw = (arr: Array<number>) => {
        if (!canvasRef.current) return
        ctx.current.clearRect(0, -canvasRef.current.height / 2, canvasRef.current.width, canvasRef.current.height)
        const rw = canvasRef.current.width / arr.length
        for (let i = 0; i < arr.length; i++) {
            const rh = arr[i] / 10

            // 设置填充颜色
            ctx.current.fillStyle = '#fff'
            // 绘制矩形
            ctx.current.fillRect(i * rw, 0, rw, rh)
            ctx.current.fillRect(i * rw, -rh, rw, rh)
        }
    }

    const onPlay = () => {
        setPlaying(true)

        if (!analyser.current) {
            const audioCtx = new AudioContext()
            const source = audioCtx.createMediaElementSource(audioRef.current)
            analyser.current = audioCtx.createAnalyser()
            analyser.current.fftSize = 1024
            buffer.current = new Uint8Array(analyser.current.frequencyBinCount)
            source.connect(analyser.current)
            analyser.current.connect(audioCtx.destination)
        }
        if (!animationId.current) {
            update()
        }
    }

    useEffect(() => {
        canvasRef.current.width = 500
        canvasRef.current.height = 122
        ctx.current = canvasRef.current.getContext('2d')!

        ctx.current.translate(0, canvasRef.current.height / 2)

        return () => {
            cancelAnimationFrame(animationId.current!)
            animationId.current = undefined
        }
    }, [])

    return (
        <div className={`page ${styles.container}`} style={{ backgroundImage: `url(${srcObj.imgUrl})` }}>
            <audio ref={audioRef} src={srcObj.audioSrc} autoPlay loop onPlay={onPlay} onPause={() => setPlaying(false)} onTimeUpdate={onTimeUpdate}></audio>
            <div className={styles.mask}></div>
            <RatioWBox wh_ratio={65}>
                <div className={styles.content}>
                    <div className={styles.lf}>
                        <div className={styles.avatar}>
                            <RatioWBox wh_ratio={100}>
                                <>
                                    <div className={styles.square} style={{ backgroundImage: `url(${srcObj.imgUrl})` }}></div>
                                    <div
                                        className={styles.circle}
                                        style={{ backgroundImage: `url(${srcObj.imgUrl})`, animationPlayState: playing ? 'running' : 'paused' }}
                                    >
                                        <div className={styles.point}></div>
                                    </div>
                                </>
                            </RatioWBox>
                        </div>
                        <div className={styles.controls}>
                            <div className={styles.progress}>
                                <div className={styles.bar} style={{ width: `${(currentTime / duration) * 100}%` }}></div>
                            </div>
                            <div className={styles.btns}>
                                <div onClick={togglePlaying}>
                                    {!playing ? (
                                        <PlayCircleO onPointerEnterCapture onPointerLeaveCapture />
                                    ) : (
                                        <PauseCircleO onPointerEnterCapture onPointerLeaveCapture />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={styles.sign}>J A Y</div>
                    </div>
                    <div className={styles.rt}>
                        <div>
                            <h2>{srcObj.name}</h2>
                            <h3>{srcObj.author}</h3>
                        </div>
                        <canvas ref={canvasRef}></canvas>
                        <div className={styles.word}>{lyric[lrcIdx].lyric}</div>
                    </div>
                </div>
            </RatioWBox>
            <div className={styles.mask}></div>
        </div>
    )
}

export const Component = Nitingdedao
