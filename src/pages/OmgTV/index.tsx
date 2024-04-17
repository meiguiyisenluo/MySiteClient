import React, { useState, useEffect, useRef } from 'react'
import { Toast, Button } from 'react-vant'
import { io, Socket } from 'socket.io-client'
import styles from './index.module.scss'

const OmgTV: React.FC = () => {
    /**
     * 0：初始状态
     * 1：匹配中
     * 2：匹配成功，连线中
     * 3：连线成功
     */
    const [status, setStatus] = useState<number>(0)
    const [userCount, setUserCount] = useState<number>(0)
    const socket = useRef<Socket | null>(null)
    const roomId = useRef<string>('')
    const peer = useRef<RTCPeerConnection | null>(null)
    const stream = useRef<MediaStream | null>(null)

    const themVideo = useRef<HTMLVideoElement | null>(null)
    const meVideo = useRef<HTMLVideoElement | null>(null)

    const startMatch = () => {
        socket.current?.emit('match')
    }

    const leaveRoom = () => {
        socket.current?.emit('leaveRoom')
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const startSignaling = async (remoteOffer: any) => {
        peer.current = new RTCPeerConnection()
        stream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        if (meVideo.current) {
            meVideo.current.srcObject = null
            meVideo.current.srcObject = stream.current
        }
        stream.current.getTracks().forEach((track) => {
            peer.current?.addTrack(track, stream.current as MediaStream)
        })

        peer.current.onicecandidate = (e) => {
            if (e.candidate) {
                socket.current?.emit('webrtc signaling', { type: 'candidate', payload: e.candidate })
            }
        }

        peer.current.ontrack = (e) => {
            console.log('ontrack')
            if (e && e.streams) {
                console.log(e.streams)
                if (themVideo.current) {
                    console.log(themVideo.current)
                    themVideo.current.srcObject = null
                    themVideo.current.srcObject = e.streams[0]
                }
                setStatus(3)
            }
        }

        if (!remoteOffer) {
            const offer = await peer.current?.createOffer()
            peer.current.setLocalDescription(offer)
            socket.current?.emit('webrtc signaling', { type: 'offer', payload: offer })
        } else {
            await peer.current.setRemoteDescription(remoteOffer)
            const answer = await peer.current.createAnswer()
            peer.current.setLocalDescription(answer)
            socket.current?.emit('webrtc signaling', { type: 'answer', payload: answer })
        }
    }

    const stopVideo = () => {
        if (meVideo.current) meVideo.current.srcObject = null
        if (themVideo.current) themVideo.current.srcObject = null
        peer.current?.close()
        stream.current?.getTracks().forEach((track) => track.stop())
    }

    useEffect(() => {
        if (!window.RTCPeerConnection || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            Toast.fail('浏览器不支持，请切换浏览器')
            return
        }

        const urls = {
            test: 'https://localhost:15002/OmgTV',
            // development: 'https://localhost:15002/OmgTV',
            production: 'https://luoyisen.com:15002/OmgTV',
            development: 'https://luoyisen.com:15002/OmgTV'
        }
        socket.current = io(urls[process.env.NODE_ENV])

        socket.current.on('connect', () => {
            Toast('连接服务器成功')
        })

        socket.current.on('connect_error', () => {
            // ...
            console.log('connect_error')
        })

        socket.current.on('disconnect', () => {
            Toast('连接断开')
        })

        socket.current.on('userCount', setUserCount)

        socket.current.on('match success', (id, start) => {
            setStatus(2)
            roomId.current = id
            if (start) startSignaling(false)
        })

        socket.current.on('match waiting', () => {
            setStatus(1)
        })

        socket.current.on('leaveRoom', () => {
            setStatus(0)
            stopVideo()
        })

        socket.current.on('webrtc signaling', (data) => {
            switch (data.type) {
                case 'offer':
                    startSignaling(data.payload)
                    break
                case 'answer':
                    peer.current?.setRemoteDescription(data.payload)
                    break
                case 'candidate':
                    if (peer.current?.remoteDescription) peer.current?.addIceCandidate(data.payload)
                    break
                default:
                    break
            }
        })

        return () => {
            socket.current?.disconnect()
            stopVideo()
        }
    }, [])

    return (
        <div className={`page ${styles.container}`}>
            <div className={styles.videos}>
                <video muted autoPlay ref={themVideo} className="them"></video>
                <video muted autoPlay ref={meVideo} className={styles.me}></video>
            </div>
            <div className={styles.controls}>
                <div className="shower">
                    <p>在线人数：{userCount}</p>
                </div>
                <div className="btns">
                    <Button type="primary" disabled={status != 0} loading={status === 1} onClick={startMatch}>
                        开始匹配
                    </Button>
                    <Button type="danger" disabled={status !== 3} onClick={leaveRoom}>
                        离开
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default OmgTV
