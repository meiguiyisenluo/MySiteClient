import React, { useState, useEffect, useRef, useCallback } from 'react'
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

    const leaveRoom = useCallback(() => {
        stopVideo()
        socket.current?.emit('leaveRoom')
    }, [])

    const startSignaling = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async (remoteOffer: any) => {
            peer.current = new RTCPeerConnection({
                iceServers: [
                    // { urls: 'stun:stun.l.google.com:19302' },
                    // { urls: 'stun:stun1.l.google.com:19302' },
                    // { urls: 'stun:stun2.l.google.com:19302' },
                    // { urls: 'stun:stun.services.mozilla.com' },
                    // { urls: 'stun:stun.stunprotocol.org:3478' },
                    // { urls: 'stun:stun.sipgate.net:3478' },
                    // { urls: 'stun:stun.ideasip.com:3478' },

                    { urls: 'stun:luoyisen.com:3478' },
                    {
                        urls: 'turn:luoyisen.com:3478',
                        username: 'lys',
                        credential: '123'
                    }
                ]
            })

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
                if (e?.streams) {
                    if (themVideo.current) {
                        themVideo.current.srcObject = null
                        themVideo.current.srcObject = e.streams[0]
                    }
                }
            }

            peer.current.onconnectionstatechange = function () {
                switch (peer.current?.connectionState) {
                    case 'new':
                        break
                    case 'connecting':
                        setStatus(2)
                        break
                    case 'connected':
                        setStatus(3)
                        break
                    case 'disconnected':
                    case 'closed':
                    case 'failed':
                        Toast('连线失败')
                        setTimeout(leaveRoom, 1000)
                        break
                    default:
                        break
                }
            }

            peer.current.onicecandidateerror = function (e) {
                console.log('onicecandidateerror', e.errorText)
                Toast('连线失败')
                setTimeout(leaveRoom, 1000)
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
        peer.current?.close()
        peer.current = null
        stream.current?.getTracks().forEach((track) => track.stop())
        stream.current = null
    }

    useEffect(() => {
        if (!window.RTCPeerConnection || !navigator.mediaDevices?.getUserMedia) {
            Toast.fail('浏览器不支持，请切换浏览器')
            return
        }

        const urls = {
            test: 'https://localhost:3000/OmgTV',
            // development: 'https://localhost:3000/OmgTV',
            production: 'https://luoyisen.com:3000/OmgTV',
            development: 'https://luoyisen.com:3000/OmgTV'
        }
        socket.current = io(urls[process.env.NODE_ENV])

        socket.current.on('connect', () => {
            Toast('连接服务器成功')
        })

        socket.current.on('connect_error', () => {
            // ...
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
            stopVideo()
            Toast('已离开房间')
            setStatus(0)
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
    }, [startSignaling])

    return (
        <div className={`page ${styles.container}`}>
            <div className={styles.videos}>
                <video autoPlay muted ref={themVideo} className="them"></video>
                <video autoPlay muted ref={meVideo} className={styles.me}></video>
            </div>
            <div className={styles.controls}>
                <div className="shower">
                    <p>在线人数：{userCount}</p>
                </div>
                <div className="btns">
                    <Button type="primary" disabled={status != 0} loading={status === 1} onClick={startMatch}>
                        开始匹配
                    </Button>
                    <Button type="danger" disabled={status < 2} onClick={leaveRoom}>
                        离开
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
