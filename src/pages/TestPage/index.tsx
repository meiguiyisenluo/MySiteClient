import React from 'react'
import styles from './index.module.scss'

import useOnline from '@/hooks/useOnline'
import useScreenSize from '@/hooks/useScreenSize'

// const data = canvasCtx.current?.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height).data
// for (let i = 0; i < data!.length; i += 4) {
//     console.log(data![i + 0], data![i + 1], data![i + 2], data![i + 3])
// }

// import { testApi1 } from '@/resources/api-constants'
// testApi1()
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))

const TestPage: React.FC = () => {
    const isOnline = useOnline()
    const { windowInnerWidth, windowInnerHeight } = useScreenSize()
    return (
        <div className={`page ${styles.container}`}>
            <div>{isOnline ? 'true' : 'false'}</div>
            <div>{windowInnerWidth}</div>
            <div>{windowInnerHeight}</div>
        </div>
    )
}

export const Component = TestPage
