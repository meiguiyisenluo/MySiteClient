import React from 'react'
import styles from './index.module.scss'
import { testApi1 } from '@/resources/api-constants'
testApi1()
    .then((res) => console.log(res))
    .catch((err) => console.log(err))

const TestPage: React.FC = () => {
    return (
        <div className={`page ${styles.container}`}>
            <div className={styles.wbox}>
                <div className={styles.hbox}>
                    <div className={`${styles.content} ${styles.center}`}>包含块</div>
                </div>
            </div>
            <div className={`${styles.cssbox} ${styles.center}`}>aspect-ratio</div>
        </div>
    )
}

export const Component = TestPage
