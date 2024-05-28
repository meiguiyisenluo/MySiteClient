import React from 'react'
import styles from './index.module.scss'

const TestPage: React.FC = () => {
    return (
        <div className={`page ${styles.container}`}>
            <div className={styles.test}></div>
            <div className={styles.ball}>
                <div className={styles.bd}>
                    <div className={styles.bg}></div>
                    <div className={styles.content}>
                        <span>更多精彩尽在这里</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const Component = TestPage
