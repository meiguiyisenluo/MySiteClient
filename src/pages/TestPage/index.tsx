import React from 'react'
import styles from './index.module.scss'

import useOnline from '@/hooks/useOnline'
import useScreenSize from '@/hooks/useScreenSize'

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
