import React, { useEffect } from 'react'
import { Toast } from 'react-vant'
import { io, Socket } from 'socket.io-client'

const OmgTV: React.FC = () => {
    useEffect(() => {
        const urls = {
            test: 'http://localhost:15002',
            development: 'http://localhost:15002',
            production: 'http://154.201.80.6:15002'
        }
        const socket: Socket = io(urls[process.env.NODE_ENV])

        const onconnectHandler = () => {
            console.log(socket.id) // x8WIv7-mJelg7on_ALbx
            Toast('连接服务器成功')
        }

        const ondisconnectHandler = () => {
            console.log(socket.id) // undefined
            Toast('连接断开')
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
