import React, { useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

const OmgTV: React.FC = () => {
    useEffect(() => {
        const socket: Socket = io('http://localhost:15002')

        const onconnectHandler = () => {
            console.log(socket.id) // x8WIv7-mJelg7on_ALbx
        }

        const ondisconnectHandler = () => {
            console.log(socket.id) // undefined
        }

        socket.on('connect', onconnectHandler)
        socket.on('disconnect', ondisconnectHandler)

        return () => {
            socket.disconnect()
            socket.off('connect', onconnectHandler)
            socket.off('disconnect', ondisconnectHandler)
        }
    })

    return <div>OmgTV开发中。。。，别催</div>
}

export default OmgTV
