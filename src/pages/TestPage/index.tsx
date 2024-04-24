import React from 'react'
import styles from './index.module.scss'
import { test as testApi } from '@/resources/api-constants'

const TestPage: React.FC = () => {
    const test = () => {
        testApi()
    }
    return (
        <div className={styles.list}>
            <button onClick={test}>test</button>
        </div>
    )
}

export default TestPage
