import React from 'react'
import styles from './index.module.scss'

import useOnline from '@/hooks/useOnline'

// import { testApi1 } from '@/resources/api-constants'
// testApi1()
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))

// const reg = /(?<!\d)\d{11}(?!\d)/
// alert(reg.test('0123456789012'))

const TestPage: React.FC = () => {
    const isOnline = useOnline()
    return (
        <div className={`page ${styles.container}`}>
            <div>{isOnline?'true':'false'}</div>
        </div>
    )
}

export const Component = TestPage
