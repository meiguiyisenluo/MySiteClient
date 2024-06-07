import React from 'react'
import styles from './index.module.scss'
import { testApi1 } from '@/resources/api-constants'
testApi1()
    .then((res) => console.log(res))
    .catch((err) => console.log(err))

const TestPage: React.FC = () => {
    return <div className={`page ${styles.container}`}>test</div>
}

export const Component = TestPage
