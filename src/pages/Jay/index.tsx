import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Dialog } from 'react-vant'
import UAParser from 'ua-parser-js'

const result = new UAParser().getResult()
const isMobile = result.device.type === 'mobile'

import styles from './index.module.scss'

const isProd = process.env.NODE_ENV === 'production'

gsap.registerPlugin(ScrollTrigger)

// 图片
const imgsBaseUrl = 'https://luoyisen.com/share/JayChou@.1/'
const imgkeys = [
    '1.png',
    '2.png',
    '3.jpg',
    '4.png',
    '5.jpg',
    '6.png',
    '7.jpg',
    '8.PNG',
    '9.jpg',
    '10.png',
    '11.jpg',
    '12.png',
    '13.jpg',
    '14.png',
    '15.PNG',
    '16.jpg',
    '17.png',
    '18.PNG',
    '19.jpg',
    '20.png',
    '21.png',
    '22.jpg',
    '23.jpg',
    '24.jpg',
    '25.png',
    '26.png',
    '27.jpg',
    '28.jpg',
    '29.jpg',
    '30.png',
    '31.png',
    '32.jpg',
    '33.jpg',
    '34.jpg',
    '35.jpg',
    '36.jpg',
    '37.jpg',
    '38.jpg',
    '39.jpg',
    '40.png'
]

// 音源
import musicSources from './musicSource.json'
const musicSourcesRes = musicSources.filter((_) => _.active)
let musicIdx = 0

// 关键高度
const stackHeight = window.innerHeight * 0.2

// 音频分析
let analyser: AnalyserNode | null = null
let buffer: Uint8Array | null = null

// canvas渲染
let animationId: number | undefined = undefined
const update = (cb: (arr: Array<number>) => void) => {
    if (animationId) cancelAnimationFrame(animationId)
    animationId = requestAnimationFrame(() => update(cb))
    if (!analyser) return
    if (!buffer) return
    analyser.getByteFrequencyData(buffer)
    const offset = Math.floor((buffer.length * 2) / 3)
    const datas = new Array(offset * 2)
    for (let i = 0; i < offset; i++) {
        datas[i] = datas[datas.length - i - 1] = buffer[i]
    }
    cb(datas)
}

const Jay: React.FC = () => {
    // scrolltrigger 相关dom
    const cards = useRef<Array<HTMLElement | null>>([])
    const endTrigger = useRef<HTMLDivElement | null>(null)
    // 音频分析相关dom
    const audioEl = useRef<HTMLAudioElement | null>(null)
    const cvs = useRef<HTMLCanvasElement | null>(null)

    // scrolltrigger init
    useEffect(() => {
        if (isMobile) return
        cards.current.forEach((card, i) => {
            if (!card) return
            gsap.fromTo(
                card,
                {
                    scale: 1,
                    transformOrigin: 'center top',
                    filter: 'blur(0px)'
                },
                {
                    y: gsap.utils.mapRange(1, cards.current.length, -20, -stackHeight + 20, cards.current.length - i),
                    scale: gsap.utils.mapRange(1, cards.current.length, 0.4, 0.9, i),
                    filter: 'blur(' + gsap.utils.mapRange(1, cards.current.length, 4, 25, cards.current.length - i) + 'px)',
                    scrollTrigger: {
                        trigger: card,
                        markers: !isProd,
                        scrub: true,
                        start: 'top ' + stackHeight,
                        end: '+=' + window.innerHeight * 2
                    }
                }
            )

            ScrollTrigger.create({
                trigger: card,
                scrub: true,
                pin: true,
                markers: !isProd,
                start: 'top ' + stackHeight,
                endTrigger: endTrigger.current, // when the last card finishes its animation, unpin everything
                end: 'top ' + window.innerHeight,
                pinSpacing: false
            })
        })
    }, [])

    // 音频相关 init
    useEffect(() => {
        Dialog.confirm({
            title: '提示',
            message: '即将播放音频了喔',
            onConfirm: () => audioEl.current?.play(),
            showCancelButton: false,
            theme: 'round-button'
        })

        const nextMusic = () => {
            if (!audioEl.current) return
            musicIdx += 1
            musicIdx = musicIdx % musicSourcesRes.length
            audioEl.current.src = musicSourcesRes[musicIdx].src
            audioEl.current.play()
        }

        const onPlay = () => {
            if (analyser) return
            if (!audioEl.current) return
            const audioCtx = new AudioContext()
            const source = audioCtx.createMediaElementSource(audioEl.current)
            analyser = audioCtx.createAnalyser()
            analyser.fftSize = 512
            buffer = new Uint8Array(analyser.frequencyBinCount)
            source.connect(analyser)
            analyser.connect(audioCtx.destination)
            update(draw)
        }

        let temp_cvs = cvs.current
        temp_cvs!.width = window.innerWidth
        temp_cvs!.height = stackHeight / 2
        const ctx = temp_cvs?.getContext('2d')

        const gradient: CanvasGradient = ctx!.createLinearGradient(0, 0, 0, temp_cvs!.height)
        gradient?.addColorStop(0, 'rgba(0, 0, 255, .4)')
        gradient?.addColorStop(0.1, 'rgba(0, 255, 0, .6)')
        gradient?.addColorStop(0.2, 'rgba(255, 0, 0, .8)')

        const draw = (arr: Array<number>) => {
            if (!ctx) return
            ctx.clearRect(0, 0, temp_cvs?.width ?? 0, temp_cvs?.height ?? 0)
            const rw = temp_cvs!.width / arr.length
            for (let i = 0; i < arr.length; i++) {
                const rh = arr[i] / 10

                // 设置填充颜色
                // ctx.fillStyle = `rgba(${(i / arr.length) * 255},${(i / arr.length) * 255},${(i / arr.length) * 255},${(i / arr.length) * 255})`
                ctx.fillStyle = gradient
                // 绘制矩形
                ctx.fillRect(i * rw, 0, rw, rh)
            }
        }

        audioEl.current!.addEventListener('play', onPlay)
        audioEl.current!.addEventListener('ended', nextMusic)

        let temp_audioEl: HTMLAudioElement | null = audioEl.current
        return () => {
            temp_audioEl?.removeEventListener('play', onPlay)
            temp_audioEl?.removeEventListener('ended', nextMusic)
            temp_audioEl = null
            temp_cvs = null
            cancelAnimationFrame(animationId!)
        }
    }, [])

    return (
        <div className={`page ${styles.container}`}>
            <div className={styles.start_content}>Welcome to Jay</div>
            {imgkeys.map((item, idx) => (
                <div key={idx} ref={(el) => (cards.current[idx] = el)} className={styles.card} style={{ backgroundImage: `url(${imgsBaseUrl + item})` }}></div>
            ))}
            <div ref={endTrigger}></div>
            <div className={styles.end_content}>Thanks for watching</div>

            {/* 放最后 层级最高 */}
            <canvas ref={cvs}></canvas>
            <audio ref={audioEl} src={musicSourcesRes[musicIdx].src}></audio>
        </div>
    )
}

export const Component = Jay
