import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Toast, Button, NoticeBar } from 'react-vant'
import { io, Socket } from 'socket.io-client'
import styles from './index.module.scss'
import iceServers from './iceServers'

const ctx = new AudioContext()
const canAutoPlay = ctx.state === 'running'
ctx.close()

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

    const leaveRoom = useCallback(() => {
        socket.current?.emit('leaveRoom')
    }, [])

    const startSignaling = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async (remoteOffer: any) => {
            peer.current = new RTCPeerConnection({
                iceServers
            })

            const tempStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true }).catch(() => {
                Toast.fail('打开摄像头失败')
                setTimeout(leaveRoom, 1000)
                return null
            })
            if (!tempStream) return
            stream.current = tempStream
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
                if (e?.streams) {
                    if (themVideo.current) {
                        themVideo.current.srcObject = null
                        themVideo.current.srcObject = e.streams[0]
                    }
                }
            }

            // peer.current.onconnectionstatechange = function () {
            //     console.log('onconnectionstatechange', peer.current?.connectionState)
            //     switch (peer.current?.connectionState) {
            //         case 'new':
            //             break
            //         case 'connecting':
            //             setStatus(2)
            //             break
            //         case 'connected':
            //             setStatus(3)
            //             break
            //         case 'disconnected':
            //             Toast.fail('disconnected, please wait...')
            //             break
            //         case 'failed':
            //             Toast.fail('failed')
            //             setTimeout(leaveRoom, 1000)
            //             break
            //         case 'closed':
            //             break
            //         default:
            //             break
            //     }
            // }

            peer.current.oniceconnectionstatechange = function () {
                console.log('oniceconnectionstatechange', peer.current?.iceConnectionState)
                switch (peer.current?.iceConnectionState) {
                    case 'new':
                        break
                    case 'checking':
                        break
                    case 'connected':
                        break
                    case 'completed':
                        setStatus(3)
                        break
                    case 'disconnected':
                        Toast.fail('disconnected, please wait...')
                        break
                    case 'failed':
                        Toast.fail('failed')
                        setTimeout(leaveRoom, 1000)
                        break
                    case 'closed':
                        break
                    default:
                        break
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
        },
        [leaveRoom]
    )

    const stopVideo = () => {
        if (meVideo.current) meVideo.current.srcObject = null
        if (themVideo.current) themVideo.current.srcObject = null
        stream.current?.getTracks().forEach((track) => track.stop())
        stream.current = null
    }

    const closePeer = () => {
        peer.current?.close()
        peer.current = null
    }

    const unMuted = () => {
        if (meVideo.current) meVideo.current.muted = false
        if (themVideo.current) themVideo.current.muted = false
    }

    useEffect(() => {
        if (!window.RTCPeerConnection || !navigator.mediaDevices?.getUserMedia) {
            Toast.fail('浏览器不支持，请切换浏览器')
            return
        }

        const urls = {
            test: 'https://localhost:3000/OmgTV',
            // development: 'https://localhost:3000/OmgTV',
            production: 'https://bytedance-me.zone.id:3000/OmgTV',
            development: 'https://bytedance-me.zone.id:3000/OmgTV'
        }
        socket.current = io(urls[process.env.NODE_ENV])

        socket.current.on('connect', () => {
            Toast('连接服务器成功')
        })

        socket.current.on('connect_error', () => {
            closePeer()
            stopVideo()
        })

        socket.current.on('disconnect', () => {
            Toast('连接断开')
            closePeer()
            stopVideo()
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
            closePeer()
            stopVideo()
            Toast('已离开房间')
            setStatus(0)
        })

        socket.current.on('connectFailed', () => {
            Toast.fail('连线失败')
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
            closePeer()
            stopVideo()
        }
    }, [startSignaling])

    return (
        <div className={`page ${styles.container}`}>
            <NoticeBar text="此功能由纯webrtc实现，配合socket.io作为信令服务器以及coturn作为stun/turn服务器，由于一些浏览器的原因，可能需要你手动打开声音" />
            <div className={styles.videos}>
                <video playsInline autoPlay muted={!canAutoPlay} ref={themVideo} className="them"></video>
                <video playsInline autoPlay muted={!canAutoPlay} ref={meVideo} className={styles.me}></video>
            </div>
            <div className={styles.controls}>
                <div className="shower">
                    <p>在线人数：{userCount}</p>
                </div>
                <div className="btns">
                    <Button type="primary" disabled={status != 0} loading={status === 1} onClick={startMatch}>
                        开始匹配
                    </Button>
                    <Button type="danger" onClick={leaveRoom}>
                        离开
                    </Button>
                    <Button type="danger" onClick={unMuted}>
                        打开声音
                    </Button>
                    <br />
                    {status === 0 && <span>请开始匹配</span>}
                    {status === 1 && <span>匹配中...</span>}
                    {status === 2 && <span>匹配成功，连线中,请稍等...</span>}
                    {status === 3 && <span>连线成功</span>}
                </div>
            </div>
        </div>
    )
}

export const Component = OmgTV
