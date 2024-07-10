import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Slider, Dialog } from 'react-vant'
import { Arrow, ArrowLeft, PauseCircleO, PlayCircleO } from '@react-vant/icons'

import styles from './index.module.scss'
import lyric_nitingdedao from './nitingdedao.lrc'
import lyric_langmanshouji from './langmanshouji.lrc'
import lyric_xinyu from './xinyu.lrc'

// console.log(
//     lyric_xinyu.map((_) => {
//         const arr = _.time.split(':').map(Number).reverse()
//         let step = 1
//         const timestamp = arr.reduce((total, _) => {
//             const res = total + _ * step
//             step *= 60
//             return res
//         }, 0)
//         return {
//             ..._,
//             timestamp: timestamp
//         }
//     })
// )

import RatioWBox from '@/components/RatioWBox.tsx'

const sources = [
    {
        audioSrc: '/share/music/Jay/03.mp3',
        audioUrl: 'https://luoyisen.com/share/music/Jay/03.mp3',
        imgUrl: 'https://luoyisen.com/share/imgs/JayChou%40.1/6.png',
        name: '你听得到',
        author: '周杰伦',
        sign: 'J A Y',
        lyric: lyric_nitingdedao
    },
    {
        audioSrc: '/share/music/Jay/07.mp3',
        audioUrl: 'https://luoyisen.com/share/music/Jay/07.mp3',
        imgUrl: 'https://luoyisen.com/share/imgs/JayChou%40.1/10.png',
        name: '浪漫手机',
        author: '周杰伦',
        sign: 'J A Y',
        lyric: lyric_langmanshouji
    },
    {
        audioSrc: '/share/music/Jay/08.mp3',
        audioUrl: 'https://luoyisen.com/share/music/Jay/08.mp3',
        imgUrl: 'https://luoyisen.com/share/imgs/JayChou%40.1/12.png',
        name: '心雨',
        author: '周杰伦',
        sign: 'J A Y',
        lyric: lyric_xinyu
    }
]

const audio_ctx = new AudioContext()
const canAutoPlay = audio_ctx.state === 'running'
audio_ctx.close()

const Nitingdedao: React.FC = () => {
    const [srcIdx, setSrcIdx] = useState<number>(0)
    const srcObj = sources[srcIdx]

    const [playing, setPlaying] = useState<boolean>(false)
    const animationPlayState = playing ? 'running' : 'paused'
    const [draging, setDraging] = useState<boolean>(false)

    const [lrcIdx, setLrcIdx] = useState<number>(0)

    const [currentTime, setCurrentTime] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)
    const [progressValue, setProgressValue] = useState<number>(0)

    const audioRef = useRef<HTMLAudioElement>(null!)
    const canvasRef = useRef<HTMLCanvasElement>(null!)
    const ctx = useRef<CanvasRenderingContext2D>(null!)

    // 音频分析
    const mediaSource = useRef<MediaElementAudioSourceNode>(null!)
    const analyser = useRef<AnalyserNode>(null!)

    const switchSrc = (idx: number) => {
        audioRef.current.pause()

        if (idx < 0) setSrcIdx(sources.length + idx)
        else setSrcIdx(idx % sources.length)

        setLrcIdx(0)

        setTimeout(() => {
            audioRef.current.play()
        }, 1000)
    }

    const animationId = useRef<number | undefined>(undefined)
    const update = useCallback(() => {
        if (animationId.current) cancelAnimationFrame(animationId.current)
        animationId.current = requestAnimationFrame(update)
        if (!analyser.current) return
        const buffer = new Uint8Array(analyser.current.frequencyBinCount)
        analyser.current.getByteFrequencyData(buffer)
        const datas = Array.from({ length: buffer.length }, (v, k) => buffer[k])
        draw(datas)
    }, [])

    const togglePlaying = () => {
        if (playing) audioRef.current.pause()
        else audioRef.current.play()
    }

    const onTimeUpdate = () => {
        // 进度处理
        setCurrentTime(audioRef.current.currentTime)
        setDuration(audioRef.current.duration)
        if (!draging) setProgressValue((currentTime / duration) * 100)
        // 歌词处理
        // 快退
        if (audioRef.current.currentTime < srcObj.lyric[lrcIdx].timestamp) {
            let idx = 0
            while (idx <= srcObj.lyric.length - 1 && srcObj.lyric[idx].timestamp < currentTime) {
                idx += 1
            }
            setLrcIdx(idx)
        }
        // 快进
        else if (audioRef.current.currentTime > (srcObj.lyric[lrcIdx + 2]?.timestamp ?? 9999)) {
            let idx = 0
            while (idx <= srcObj.lyric.length - 1 && srcObj.lyric[idx].timestamp < currentTime) {
                idx += 1
            }
            setLrcIdx(idx)
        }
        // 正常播放
        else if (audioRef.current.currentTime > (srcObj.lyric[lrcIdx + 1]?.timestamp ?? 9999)) {
            setLrcIdx(lrcIdx + 1)
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

    const onChangeAfter = (value: number) => {
        audioRef.current.currentTime = (duration * value) / 100
    }

    const onChange = (val: number) => {
        setProgressValue(val)
    }

    const timeFormat = (s: number) => {
        s = Math.floor(s)
        const min = Math.floor(s / 60)
        s = s % 60
        return `${min < 10 ? 0 : ''}${min}:${s < 10 ? 0 : ''}${s}`
    }

    useEffect(() => {
        canvasRef.current.width = 500
        canvasRef.current.height = 122
        ctx.current = canvasRef.current.getContext('2d')!

        ctx.current.translate(0, canvasRef.current.height / 2)
    }, [])

    const initAudioCtx = useCallback(() => {
        if (!analyser.current) {
            const audioCtx = new AudioContext()
            mediaSource.current = audioCtx.createMediaElementSource(audioRef.current)
            analyser.current = audioCtx.createAnalyser()
            analyser.current.fftSize = 1024
            mediaSource.current.connect(analyser.current)
            analyser.current.connect(audioCtx.destination)
        }
        if (!animationId.current) {
            update()
        }
        audioRef.current?.play()
    }, [update])

    useEffect(() => {
        if (canAutoPlay) initAudioCtx()
        else {
            Dialog.confirm({
                title: '提示',
                message: '一些浏览器原因，需要你点点确认才能播放音频 ',
                onConfirm: () => initAudioCtx(),
                showCancelButton: false,
                theme: 'round-button'
            })
        }

        return () => {
            cancelAnimationFrame(animationId.current!)
            animationId.current = undefined
        }
    }, [initAudioCtx])

    return (
        <div className={`page ${styles.container}`} style={{ backgroundImage: `url(${srcObj.imgUrl})` }}>
            <audio
                ref={audioRef}
                src={srcObj.audioSrc}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onTimeUpdate={onTimeUpdate}
                onEnded={() => switchSrc(srcIdx + 1)}
            ></audio>
            <div className={styles.mask}></div>
            <RatioWBox wh_ratio={65}>
                <div className={styles.content}>
                    <div className={styles.lf}>
                        <div className={styles.avatar}>
                            <RatioWBox wh_ratio={100}>
                                <>
                                    <div className={styles.square} style={{ backgroundImage: `url(${srcObj.imgUrl})` }}></div>
                                    <div className={styles.circle} style={{ backgroundImage: `url(${srcObj.imgUrl})`, animationPlayState }}>
                                        <div className={styles.point}></div>
                                    </div>
                                </>
                            </RatioWBox>
                        </div>
                        <div className={styles.controls}>
                            <Slider
                                min={0}
                                max={100}
                                step={1}
                                value={progressValue}
                                activeColor={'#fffa'}
                                inactiveColor={'#fff6'}
                                button={<div className={styles.progress_btn}></div>}
                                onChangeAfter={onChangeAfter}
                                onDragStart={() => setDraging(true)}
                                onDragEnd={() => setDraging(false)}
                                onChange={onChange}
                            />
                            <div className={styles.times}>
                                <span>{timeFormat(currentTime)}</span>
                                <span>{timeFormat(duration)}</span>
                            </div>
                            <div className={styles.btns}>
                                <div>
                                    <ArrowLeft onClick={() => switchSrc(srcIdx - 1)} onPointerEnterCapture onPointerLeaveCapture />
                                </div>
                                <div onClick={togglePlaying}>
                                    {!playing ? (
                                        <PlayCircleO onPointerEnterCapture onPointerLeaveCapture />
                                    ) : (
                                        <PauseCircleO onPointerEnterCapture onPointerLeaveCapture />
                                    )}
                                </div>
                                <div>
                                    <Arrow onClick={() => switchSrc(srcIdx + 1)} onPointerEnterCapture onPointerLeaveCapture />
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
                        <div className={styles.word}>
                            {srcObj.lyric[lrcIdx].lyricText.split('').map((_, idx) => (
                                <span
                                    key={`${lrcIdx}-${idx}`}
                                    style={{
                                        animationDelay: `${Math.abs(srcObj.lyric[lrcIdx].lyricText.length / 2 - idx) / 10}s`,
                                        animationPlayState
                                    }}
                                >
                                    {_}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </RatioWBox>
            <div className={styles.mask}></div>
        </div>
    )
}

export const Component = Nitingdedao
