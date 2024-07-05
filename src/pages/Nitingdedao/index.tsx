import React, { useRef, useState } from 'react'
import { PauseCircleO, PlayCircleO } from '@react-vant/icons'

import styles from './index.module.scss'

import RatioWBox from '@/components/RatioWBox.tsx'

const srcObj = {
    audioUrl: 'https://luoyisen.com/share/music/Jay/03.mp3',
    imgUrl: 'https://luoyisen.com/share/imgs/JayChou%40.1/6.png',
    name: '你听得到',
    author: '周杰伦',
    sign: 'J A Y'
}

const Nitingdedao: React.FC = () => {
    const [playing, setPlaying] = useState<boolean>(true)
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)

    const audioRef = useRef<HTMLAudioElement>(null!)

    const togglePlaying = () => {
        if (playing) audioRef.current.pause()
        else audioRef.current.play()
    }

    const onTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime)
        setDuration(audioRef.current.duration)
    }

    return (
        <div className={`page ${styles.container}`} style={{ backgroundImage: `url(${srcObj.imgUrl})` }}>
            <audio
                ref={audioRef}
                src={srcObj.audioUrl}
                autoPlay
                loop
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onTimeUpdate={onTimeUpdate}
            ></audio>
            <div className={styles.mask}></div>
            <RatioWBox wh_ratio={65}>
                <div className={styles.content}>
                    <div className={styles.lf}>
                        <div className={styles.avatar}>
                            <RatioWBox wh_ratio={100}>
                                <>
                                    <div className={styles.square} style={{ backgroundImage: `url(${srcObj.imgUrl})` }}></div>
                                    <div className={styles.circle} style={{ backgroundImage: `url(${srcObj.imgUrl})` }}>
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
                                        <PlayCircleO
                                            onPointerEnterCapture={() => {
                                                return
                                            }}
                                            onPointerLeaveCapture={() => {
                                                return
                                            }}
                                        />
                                    ) : (
                                        <PauseCircleO
                                            onPointerEnterCapture={() => {
                                                return
                                            }}
                                            onPointerLeaveCapture={() => {
                                                return
                                            }}
                                        />
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
                        <canvas></canvas>
                        <div className={styles.word}>有谁能比我知道</div>
                    </div>
                </div>
            </RatioWBox>
            <div className={styles.mask}></div>
        </div>
    )
}

export const Component = Nitingdedao
