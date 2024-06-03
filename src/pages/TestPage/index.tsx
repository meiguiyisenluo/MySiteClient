import React from 'react'
import styles from './index.module.scss'

const TestPage: React.FC = () => {
    return <div className={`page ${styles.container}`}>test</div>
}

export const Component = TestPage
