import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { streamVideo } from '@/resources/api-constants'

const TestPage: React.FC = () => {
    const [src, setSrc] = useState('')
    useEffect(() => {
        streamVideo().then(({ data }) => setSrc(URL.createObjectURL(data)))
    }, [])

    return (
        <div className={`page`}>
            <video className={`${styles.videoEl}`} src={src} controls autoPlay muted></video>
        </div>
    )
}

export const Component = TestPage
